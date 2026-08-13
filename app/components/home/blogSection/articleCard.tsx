import { FiArrowUpRight } from "react-icons/fi";
import type { BlogPost } from "@/app/constants/blog";

interface ArticleCardProps {
  post: BlogPost;
  onOpen: () => void;
}

export default function ArticleCard({ post, onOpen }: ArticleCardProps) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="group relative flex h-full w-full min-h-[24rem] flex-col overflow-hidden rounded-lg border border-embassy/15 bg-marble text-start hover:border-embassy/40 motion-safe:transition-all motion-safe:duration-150 motion-safe:hover:-translate-y-0.5 motion-safe:hover:shadow-float focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-court-gold"
    >
      <span
        className="pointer-events-none absolute -top-5 start-2 select-none font-headline text-[9rem] font-bold leading-[0.8] text-embassy/[0.05]"
        aria-hidden="true"
      >
        {post.initial}
      </span>

      <div className="relative z-10 flex min-h-10 items-center gap-xs border-b border-embassy/15 px-md">
        <span className="text-embassy" aria-hidden="true">
          ◆
        </span>
        <span className="text-label font-label uppercase tracking-[0.1em] text-ink-soft">
          {post.category}
        </span>
        <span className="ms-auto text-label leading-5 text-ink-soft/75">
          {post.date}
        </span>
      </div>

      <div className="relative z-10 flex flex-1 flex-col p-md sm:p-lg">
        <h3 className="font-headline text-headline font-bold leading-snug text-ink-deep">
          {post.title}
        </h3>

        <p className="mb-md mt-sm text-body leading-7 text-ink-soft">
          {post.excerpt}
        </p>

        <div className="mt-auto flex items-center gap-xs border-t border-embassy/15 pt-md">
          <span className="text-label leading-5 text-ink-soft/80">
            {post.readTime}
          </span>
          <span
            className="ms-auto flex h-9 w-9 items-center justify-center rounded-md border border-embassy/20 text-embassy motion-safe:transition-transform motion-safe:duration-200 motion-safe:group-hover:-translate-y-0.5 motion-safe:group-hover:translate-x-0.5 motion-safe:rtl:group-hover:-translate-x-0.5"
            aria-hidden="true"
          >
            <FiArrowUpRight className="h-4 w-4 rtl:scale-x-[-1]" />
          </span>
        </div>
      </div>
    </button>
  );
}
