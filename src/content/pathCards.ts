/** Choose Your Path — Figma homepage (value pillars + academic proof). */

export const PATH_INTRO = {
  headingLead: 'You are the doctor.',
  headingAccent: 'We are right behind you.',
  lead:
    'Your success is our mission. Every product, every service, every support — designed to empower your practice.',
};

export type PathValueIcon = 'education' | 'support' | 'partnership' | 'solutions';

export type PathValueCard = {
  id: string;
  title: string;
  description: string;
  href: string;
  icon: PathValueIcon;
  image: string;
  imageAlt: string;
};

/** One-click destinations — no nested CTAs inside cards. */
export const PATH_VALUE_CARDS: readonly PathValueCard[] = [
  {
    id: 'education',
    title: 'Education',
    description: 'Continuous learning through workshops, seminars, and training programs.',
    href: '/articles',
    icon: 'education',
    image: '/path/education.png',
    imageAlt: 'Dentist leading a clinical education workshop for dental professionals',
  },
  {
    id: 'support',
    title: 'Technical Support',
    description: '24/7 expert assistance for product guidance and troubleshooting.',
    href: '/why-md-dental',
    icon: 'support',
    image: '/path/support.png',
    imageAlt: 'Technical support specialist guiding a dentist with dental equipment',
  },
  {
    id: 'partnership',
    title: 'Partnership',
    description: 'Building long-term relationships based on trust and mutual growth.',
    href: '/why-md-dental',
    icon: 'partnership',
    image: '/path/partnership.png',
    imageAlt: 'Handshake between dentist and distribution partner in a modern clinic',
  },
  {
    id: 'solutions',
    title: 'Latest Solutions',
    description: 'First access to innovative products and cutting-edge technologies.',
    href: '/products',
    icon: 'solutions',
    image: '/path/solutions.png',
    imageAlt: 'Advanced dental digital scanner and innovative clinical products on display',
  },
];

export const ACADEMIC_PARTNERS_HEADING = 'Trusted by Academic Partner';
export const ACADEMIC_PARTNERS_LEAD =
  'Egypt’s leading dental faculties and teaching hospitals choose MD Dental for authentic supplies and clinical education.';

export const ACADEMIC_PARTNERS: readonly string[] = [
  'Cairo University',
  'Ain Shams University',
  'Al-Azhar University',
  'Alexandria University',
  'Tanta University',
  'Assiut University',
  'Mansoura University',
  'MUST',
  'MSA University',
  'Future University',
  'British University',
  'Al Salam University',
  'BADR University',
  'Delta University',
  'New Giza University',
];

export const DENTAL_ACADEMIES_HEADING = 'Supporting Dental Academies';
export const DENTAL_ACADEMIES_LEAD =
  'Official training partners and professional bodies we support nationwide.';

export const DENTAL_ACADEMIES: readonly string[] = [
  'Egyptian Dental Association',
  'Cairo Dental Academy',
  'Alexandria Dental Institute',
  'Modern Dentistry Academy',
  'Advanced Dental Training Center',
  'Egyptian Implant Academy',
];

export const PATH_CTAS = {
  partner: { label: 'Be our Partner', href: '/why-md-dental' },
  products: { label: 'View Our Products', href: '/products' },
} as const;
