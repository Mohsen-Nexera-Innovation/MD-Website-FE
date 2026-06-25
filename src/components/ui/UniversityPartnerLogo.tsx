import { getUniversityLogo } from '@/content/universityLogos';

type UniversityPartnerLogoProps = {
  id: string;
  name: string;
  className?: string;
};

export default function UniversityPartnerLogo({
  id,
  name,
  className = '',
}: UniversityPartnerLogoProps) {
  const src = getUniversityLogo(id);
  if (!src) return null;

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={`${name} logo`}
      className={`path-uni-logo ${className}`.trim()}
      loading="lazy"
      decoding="async"
    />
  );
}
