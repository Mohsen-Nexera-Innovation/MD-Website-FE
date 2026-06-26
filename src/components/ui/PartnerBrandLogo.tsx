import Image from 'next/image';
import { getBrandLogo } from '@/content/mdMedia';

type PartnerBrandLogoProps = {
  slug: string;
  name: string;
  className?: string;
  priority?: boolean;
};

export default function PartnerBrandLogo({
  slug,
  name,
  className = '',
  priority = false,
}: PartnerBrandLogoProps) {
  const src = getBrandLogo(slug);
  if (!src) return null;

  return (
    <Image
      src={src}
      alt={`${name} logo`}
      width={160}
      height={48}
      className={`partner-brand-logo ${className}`.trim()}
      sizes="160px"
      priority={priority}
    />
  );
}
