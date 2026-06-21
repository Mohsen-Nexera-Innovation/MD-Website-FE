import { MD_LOGO_PATH, MD_LOGO_VIEWBOX } from '@/content/mdLogoPath';

type MdLogoProps = {
  variant?: 'brand' | 'light';
  className?: string;
  priority?: boolean;
};

/**
 * Official MD Dental wordmark — true vector (traced from the Company Profile 2024 logo).
 * `brand` = brand blue on light surfaces, `light` = white on dark surfaces.
 * Color is driven by `fill`, so it stays razor-sharp at any size.
 */
export default function MdLogo({ variant = 'brand', className = '' }: MdLogoProps) {
  const fill = variant === 'light' ? '#ffffff' : '#3050A0';

  return (
    <svg
      className={className}
      viewBox={MD_LOGO_VIEWBOX}
      role="img"
      aria-label="MD Dental"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d={MD_LOGO_PATH} fill={fill} fillRule="evenodd" />
    </svg>
  );
}
