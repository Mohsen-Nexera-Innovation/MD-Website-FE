/** Careers page — static content (nav / Figma; no SRS epic). */

export const CAREERS_INTRO = {
  eyebrow: 'Join the team',
  title: 'Careers at MD Dental',
  lead:
    'Help build Egypt\'s dental supply knowledge platform — across field sales, clinical support, logistics, and digital.',
};

export const CAREERS_METRICS = [
  { value: '27', label: 'Governorates served' },
  { value: '8', label: 'Global brand partners' },
  { value: '2019', label: 'Founded' },
] as const;

export const CORE_VALUES = [
  {
    title: 'Innovation',
    desc: 'Bringing cutting-edge global brands to Egyptian dentists first.',
    image: '/vision/value-innovation.png',
    imageAlt: 'Innovation in dental technology and digital tools',
  },
  {
    title: 'Customer centricity',
    desc: 'Your practice success drives every product and service decision.',
    image: '/vision/value-transparency.png',
    imageAlt: 'Customer-centric dental support and service',
  },
  {
    title: 'Integrity',
    desc: 'Authentic, CE-certified products — no shortcuts, no grey market.',
    image: '/vision/value-integrity.png',
    imageAlt: 'Integrity and authentic dental product supply',
  },
  {
    title: 'Teamwork',
    desc: 'Field reps, clinical support, and logistics working as one team.',
    image: '/careers/teamwork.png',
    imageAlt: 'MD Dental team collaboration across Egypt',
  },
  {
    title: 'Excellence',
    desc: 'Professional standards in every interaction with clinics and partners.',
    image: '/vision/value-excellence.png',
    imageAlt: 'Excellence in clinical service standards',
  },
] as const;

export type JobRole = {
  id: string;
  title: string;
  location: string;
  type: 'Field' | 'Office' | 'Hybrid';
  description: string;
  image: string;
  imageAlt: string;
};

export const OPEN_ROLES: readonly JobRole[] = [
  {
    id: 'field-sales-rep',
    title: 'Field Sales Representative',
    location: 'Multiple governorates',
    type: 'Field',
    description:
      'Support dentists in your territory with product education, inventory planning, and relationship management.',
    image: '/careers/role-field.png',
    imageAlt: 'Field sales representative visiting a dental clinic in Egypt',
  },
  {
    id: 'clinical-support',
    title: 'Clinical Support Specialist',
    location: 'Cairo',
    type: 'Office',
    description:
      'Guide clinics on product protocols, troubleshooting, and clinical education content.',
    image: '/careers/role-clinical.png',
    imageAlt: 'Clinical support specialist guiding a dentist',
  },
  {
    id: 'logistics-coordinator',
    title: 'Logistics Coordinator',
    location: 'Cairo',
    type: 'Office',
    description:
      'Coordinate Bosta deliveries and warehouse operations for nationwide clinic supply.',
    image: '/careers/role-logistics.png',
    imageAlt: 'Logistics coordinator managing dental supply deliveries',
  },
  {
    id: 'digital-marketing',
    title: 'Digital Marketing Associate',
    location: 'Cairo / Hybrid',
    type: 'Hybrid',
    description:
      'Grow MD Community content, events promotion, and the informative website experience.',
    image: '/careers/role-digital.png',
    imageAlt: 'Digital marketing professional working on MD Dental content',
  },
];

export const CAREERS_CONTACT = {
  email: 'careers@mddental.com',
  hint: 'Send your CV and a short note about how you\'d like to contribute.',
};
