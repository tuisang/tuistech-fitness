import Link from "next/link";
import Logo from "@/components/Logo";
import { siteConfig } from "@/lib/config";
import {
  InstagramIcon,
  TikTokIcon,
  YouTubeIcon,
  FacebookIcon,
  XIcon,
} from "@/components/icons/SocialIcons";

const socialLinks = [
  { href: siteConfig.instagram, label: "Instagram", Icon: InstagramIcon },
  { href: siteConfig.tiktok, label: "TikTok", Icon: TikTokIcon },
  { href: siteConfig.youtube, label: "YouTube", Icon: YouTubeIcon },
  { href: siteConfig.facebook, label: "Facebook", Icon: FacebookIcon },
  { href: siteConfig.x, label: "X", Icon: XIcon },
].filter((s) => s.href);

export default function Footer() {
  return (
    <footer className="border-t border-steel-line bg-ink text-paper">
      <div className="container-x grid gap-12 py-16 md:grid-cols-4">
        <div className="md:col-span-2">
          <Logo variant="dark" />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-paper/60">
            Coached strength, weight-loss and family fitness programs, built
            in Nairobi for real schedules and real kitchens. Train on video,
            book a consult, or work with a program written for you.
          </p>
          <p className="text-mono-label mt-6 text-[11px] text-sage">
            Stronger body. Healthier mind. Better life.
          </p>
          <p className="text-mono-label mt-2 text-[11px] text-paper/40">
            Nairobi, Kenya
          </p>
        </div>

        <div>
          <h3 className="text-mono-label text-xs text-green">Train</h3>
          <ul className="mt-4 space-y-3 text-sm text-paper/70">
            <li><Link href="/programs" className="hover:text-paper">Programs</Link></li>
            <li><Link href="/videos" className="hover:text-paper">Video library</Link></li>
            <li><Link href="/shop" className="hover:text-paper">Ebooks</Link></li>
            <li><Link href="/shop#equipment" className="hover:text-paper">Equipment</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-mono-label text-xs text-green">Work with us</h3>
          <ul className="mt-4 space-y-3 text-sm text-paper/70">
            <li><Link href="/consulting" className="hover:text-paper">Book a consult</Link></li>
            <li><Link href="/about" className="hover:text-paper">About the coach</Link></li>
            <li><Link href="/contact" className="hover:text-paper">Contact</Link></li>
          </ul>
        </div>
      </div>

      <div className="container-x flex flex-col gap-5 border-t border-paper/10 py-6 text-xs text-paper/40 md:flex-row md:items-center md:justify-between">
        <p>(c) {new Date().getFullYear()} Tuistech Fitness. All rights reserved.</p>
        {socialLinks.length > 0 && (
          <div className="flex items-center gap-4">
            {socialLinks.map(({ href, label, Icon }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="text-paper/50 transition-colors hover:text-green">
                <Icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        )}
        <p>Programs are informational and not a substitute for medical advice.</p>
      </div>
    </footer>
  );
}
