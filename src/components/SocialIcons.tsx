import { SOCIAL_LINKS } from '@/content/nav';

const SOCIAL_PATHS: Record<string, string> = {
  facebook:
    'M13.5 21v-7h2.4l.4-2.8h-2.8V9.4c0-.8.2-1.4 1.4-1.4h1.5V5.5c-.3 0-1.2-.1-2.2-.1-2.2 0-3.7 1.3-3.7 3.8v2H8.2V14h2.3v7h3z',
  instagram:
    'M12 8.1A3.9 3.9 0 1 0 12 15.9 3.9 3.9 0 0 0 12 8.1zm0 6.4A2.5 2.5 0 1 1 12 9.5a2.5 2.5 0 0 1 0 5zM16 7a.9.9 0 1 0 0 1.8A.9.9 0 0 0 16 7zm3.4 2.3a4.8 4.8 0 0 0-1.3-3.4 4.8 4.8 0 0 0-3.4-1.3C13.4 4.5 13 4.5 12 4.5s-1.4 0-2.7.1a4.8 4.8 0 0 0-3.4 1.3A4.8 4.8 0 0 0 4.6 9.3C4.5 10.6 4.5 11 4.5 12s0 1.4.1 2.7a4.8 4.8 0 0 0 1.3 3.4 4.8 4.8 0 0 0 3.4 1.3c1.3.1 1.7.1 2.7.1s1.4 0 2.7-.1a4.8 4.8 0 0 0 3.4-1.3 4.8 4.8 0 0 0 1.3-3.4c.1-1.3.1-1.7.1-2.7s0-1.4-.1-2.7zm-1.6 7.3a2.6 2.6 0 0 1-1.5 1.5c-1 .4-3.5.3-4.6.3s-3.6.1-4.6-.3a2.6 2.6 0 0 1-1.5-1.5c-.4-1-.3-3.5-.3-4.6s-.1-3.6.3-4.6A2.6 2.6 0 0 1 7.4 6.2c1-.4 3.5-.3 4.6-.3s3.6-.1 4.6.3a2.6 2.6 0 0 1 1.5 1.5c.4 1 .3 3.5.3 4.6s.1 3.6-.3 4.6z',
  linkedin:
    'M6.9 8.6H4.2V20h2.7V8.6zM5.5 4.2a1.6 1.6 0 1 0 0 3.2 1.6 1.6 0 0 0 0-3.2zM20 13.4c0-2.6-1.4-3.8-3.3-3.8-1.5 0-2.2.8-2.6 1.4V8.6H8.7c0 .8 0 11.4 0 11.4h2.7v-6.4c0-.3 0-.7.1-1 .3-.7.9-1.4 1.9-1.4 1.3 0 1.9.8 1.9 2.4V20H18v-6.6z',
};

type SocialIconsProps = {
  className?: string;
  linkClassName?: string;
};

export default function SocialIcons({ className = '', linkClassName = '' }: SocialIconsProps) {
  return (
    <div className={className} role="list" aria-label="Social media">
      {SOCIAL_LINKS.map((s) => (
        <a
          key={s.icon}
          href={s.href}
          className={linkClassName}
          aria-label={s.label}
          target="_blank"
          rel="noopener noreferrer"
          role="listitem"
        >
          <svg viewBox="0 0 24 24" aria-hidden focusable="false">
            <path d={SOCIAL_PATHS[s.icon]} />
          </svg>
        </a>
      ))}
    </div>
  );
}
