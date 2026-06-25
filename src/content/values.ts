/** Vision, Mission & Core Values — About MD "Who We Are" section. */

export const VISION_MISSION_INTRO = {
  eyebrow: 'Who We Are',
  heading: 'Driven by purpose, guided by values',
  lead: 'More than a distributor — a knowledge platform built on a clear vision, a focused mission and the values that shape every decision.',
};

export const VISION = {
  label: 'Our Vision',
  statement:
    'To be the most trusted dental supply and knowledge platform in Egypt and the Arab world.',
  aim: 'Where we\u2019re headed',
  image: '/vision/vision.png',
  imageAlt: 'Dental professionals across Egypt connected through trusted supply and knowledge',
};

export const MISSION = {
  label: 'Our Mission',
  statement:
    'To empower dental professionals with authentic products, scientific knowledge and reliable nationwide delivery — strategically growing for them.',
  aim: 'How we get there',
  image: '/vision/mission.png',
  imageAlt: 'Nationwide delivery and clinical support empowering dental professionals',
};

export const VALUES_HEADING = {
  title: 'Core Values',
  lead: 'Four principles behind every product choice, partnership, and decision we make.',
};

export type CoreValue = {
  title: string;
  desc: string;
  outcome: string;
  image: string;
  imageAlt: string;
};

export const CORE_VALUES: readonly CoreValue[] = [
  {
    title: 'Innovation',
    desc: 'Bringing cutting-edge dental technology and digital infrastructure to every clinic we serve.',
    outcome: 'Clinics equipped with modern, digital-first tools',
    image: '/vision/value-innovation.png',
    imageAlt: 'Modern digital dental technology in a contemporary clinic',
  },
  {
    title: 'Integrity',
    desc: 'Authentic, factory-direct products only — integrity over grey-market shortcuts, always.',
    outcome: '100% authentic, traceable products',
    image: '/vision/value-integrity.png',
    imageAlt: 'Verified authentic dental products with traceable supply chain',
  },
  {
    title: 'Transparency',
    desc: 'Published specifications and honest pricing, so professionals make confident decisions.',
    outcome: 'Confident, well-informed purchasing',
    image: '/vision/value-transparency.png',
    imageAlt: 'Clear product specifications and honest pricing for dental professionals',
  },
  {
    title: 'Excellence',
    desc: 'Scientific support and service standards that hold up to the expectations of modern dentistry.',
    outcome: 'Service that meets clinical standards',
    image: '/vision/value-excellence.png',
    imageAlt: 'Clinical training and premium service standards in modern dentistry',
  },
];
