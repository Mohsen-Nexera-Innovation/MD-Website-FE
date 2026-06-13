export const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Partners', href: '/partners' },
  { label: 'Products', href: '/products' },
  { label: 'Articles', href: '/articles' },
  { label: 'Events', href: '/events' },
] as const;

export const FOOTER_GROUPS = [
  {
    title: 'Company',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Why MD Dental', href: '/why-md-dental' },
      { label: 'Coverage Map', href: '/coverage' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Products', href: '/products' },
      { label: 'Articles', href: '/articles' },
      { label: 'Events', href: '/events' },
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
