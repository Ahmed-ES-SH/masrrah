# CI/CD Deployment — Masarrah HR

This document describes the one-time VPS preparation, the deploy pipeline, and the rollback procedure. It is the operational companion to `CI-CD-PLAN.md`.

## How deploys work

Every push to `main` triggers GitHub Actions, which SSHes into the VPS, hard-resets the repo to the pushed commit, rebuilds the Docker image, recreates the container, and verifies it is running:

```
git push origin main
   ↓
GitHub Actions (.github/workflows/deploy.yml)
   ↓
SSH into VPS (appleboy/ssh-action, strict host-key verification)
   ↓
git fetch + git reset --hard origin/main
   ↓
docker compose up -d --build
   ↓
docker compose ps — verified Up
```

- `git reset --hard origin/main` (not `git pull`) avoids merge conflicts from drifted local state. Safe because `.env` is gitignored and never touched.
- The VPS builds the image itself — no image registry involved.
- Concurrency guard: one deploy at a time; a second push waits its turn.

## One-time VPS preparation

1. **Install prerequisites** on the VPS:
   ```bash
   sudo apt update
   sudo apt install -y git
   # docker + compose plugin — follow the official instructions for your distro;
   # verify: docker compose version
   ```

2. **Create a deploy user** (non-root, scoped to the app dir):
   ```bash
   sudo useradd -m -s /bin/bash deploy
   ```

3. **Generate a CI key pair** (locally, dedicated to CI — never reuse a personal key):
   ```bash
   ssh-keygen -t ed25519 -C "github-actions-deploy" -f ci_deploy_key -N ""
   ```

4. **Authorize the public key** on the VPS:
   ```bash
   sudo -u deploy mkdir -p ~deploy/.ssh
   sudo -u deploy sh -c 'echo "<PUBLIC KEY>" >> ~/.ssh/authorized_keys'
   chmod 700 ~deploy/.ssh && chmod 600 ~deploy/.ssh/authorized_keys
   ```

5. **Clone the repo**:
   ```bash
   sudo mkdir -p /opt/masrahh
   sudo chown deploy:deploy /opt/masrahh
   sudo -u deploy git clone git@github.com:<owner>/masrahh.git /opt/masrahh
   ```

6. **Private-repo auth on the VPS**: add a read-only **deploy key** (GitHub → repo → Settings → Deploy keys, paste the public half of a fresh key pair) so the VPS can `git fetch` private repos. The CI SSH key and the repo deploy key are two different keys — do not mix them up.

7. **Create the app's env file on the server** (never committed):
   ```bash
   sudo -u deploy cp /opt/masrahh/.env.example /opt/masrahh/.env
   # fill in real values:
   #   RESEND_API_KEY, ADMIN_EMAIL, EMAIL_FROM, APP_URL, NEXT_PUBLIC_SITE_URL
   ```

8. **Verify SSH access** from your local machine:
   ```bash
   ssh -i ci_deploy_key deploy@<VPS_HOST> "cd /opt/masrahh && docker compose version"
   ```

## GitHub configuration

Settings → Secrets and variables → Actions (repo level):

| Secret | Value |
|---|---|
| `VPS_HOST` | VPS IP or hostname |
| `VPS_USER` | SSH user, e.g. `deploy` |
| `VPS_SSH_KEY` | Private half of `ci_deploy_key` (ed25519, no passphrase) |
| `VPS_PORT` | Only if non-default SSH port |

| Variable | Value |
|---|---|
| `VPS_APP_DIR` | `/opt/masrahh` (or wherever the repo lives) |

Never put real values in the repo. All app secrets live only in the VPS's `.env`.

## Verifying a deploy

- Watch the workflow run in GitHub Actions after pushing to `main` — both steps must pass.
- On the VPS:
  ```bash
  docker compose ps
  docker inspect masrahh-app --format '{{.Image}}'
  curl -I http://localhost:3000        # expect HTTP 200
  curl -I http://localhost:3000/api/request
  ```
- Workflow logs show command output only — if any key material appears, stop and rotate the key.

## Rollback

```bash
# on the VPS
cd /opt/masrahh
git fetch origin main
git reset --hard <previous-good-sha>
docker compose up -d --build
docker compose ps
```

Container volumes and `.env` are untouched by rollback. Fix forward on `main` afterward.

## Notes & caveats

- `NEXT_PUBLIC_SITE_URL` is a build-time arg: compose passes it from the VPS's `.env` into the Docker build. The app has a fallback, so an empty value still builds.
- `docker image prune -f` after each deploy keeps old build layers from filling the disk.
- The standalone output flag (`output: "standalone"` in `next.config.ts`) is required — the Dockerfile's runner stage copies `/app/.next/standalone`.

## Optional hardening (not wired in)

- Wrap the deploy job in a GitHub **Environment** (`production`) with required reviewers to gate deploys.
- Add a `ci.yml` (lint + type-check + build) on all pushes/PRs as a pre-deploy gate.
- Enable **Dependabot** for `github-actions` so `appleboy/ssh-action@v1` gets patched automatically.
