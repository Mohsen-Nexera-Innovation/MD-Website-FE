/** Primary navigation — aligned to the Figma reference structure. */
export const NAV_LINKS = [
  { label: 'About MD', href: '/about' },
  { label: 'Products', href: '/products' },
  { label: 'Careers', href: '/careers' },
  { label: 'MD Community', href: '/articles' },
  { label: 'Partners', href: '/partners' },
  { label: 'Events', href: '/events' },
] as const;

export const SOCIAL_LINKS = [
  { label: 'Facebook', href: 'https://facebook.com', icon: 'facebook' },
  { label: 'Instagram', href: 'https://instagram.com', icon: 'instagram' },
  { label: 'LinkedIn', href: 'https://linkedin.com', icon: 'linkedin' },
] as const;

export const FOOTER_GROUPS = [
  {
    title: 'Company',
    links: [
      { label: 'About MD', href: '/about' },
      { label: 'Careers', href: '/careers' },
      { label: 'Why MD Dental', href: '/why-md-dental' },
      { label: 'Coverage Map', href: '/coverage' },
    ],
  },
  {
    title: 'MD Community',
    links: [
      { label: 'Articles', href: '/articles' },
      { label: 'Events', href: '/events' },
      { label: 'Products', href: '/products' },
    ],
  },
  {
    title: 'Partners',
    links: [
      { label: 'Aditek', href: '/partners/aditek' },
      { label: 'BMS', href: '/partners/bms' },
      { label: 'Heydent', href: '/partners/heydent' },
    ],
  },
] as const;
