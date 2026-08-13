import { IconType } from "react-icons";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedinIn,
  FaSnapchat,
  FaTiktok,
  FaWhatsapp,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { SITE_WHATSAPP } from "@/app/constants/site";

export type SocialLinkKey =
  | "whatsapp"
  | "instagram"
  | "x"
  | "facebook"
  | "snapchat"
  | "tiktok";

export interface SocialLink {
  key: SocialLinkKey;
  href: string;
  icon: IconType;
  gold?: boolean;
}

// Default launch profiles. https://wa.me/<number> is derived from the confirmed
// WhatsApp number in config/site.ts; replace the placeholder handles with the
// client's confirmed accounts before launch.
export const SOCIAL_LINKS: readonly SocialLink[] = [
  {
    key: "whatsapp",
    href: `https://wa.me/${SITE_WHATSAPP}`,
    gold: true,
    icon: FaWhatsapp,
  },
  {
    key: "instagram",
    href: "https://instagram.com/masarah_hr",
    icon: FaInstagram,
  },
  { key: "x", href: "https://x.com/masarah_hr", icon: FaXTwitter },
  {
    key: "snapchat",
    href: "https://snapchat.com/add/masarah_hr",
    icon: FaSnapchat,
  },
  {
    key: "facebook",
    href: "https://www.facebook.com/profile.php?id=61592799287002",
    icon: FaFacebook,
  },

  { key: "tiktok", href: "https://tiktok.com/@masarah_hr", icon: FaTiktok },
];
