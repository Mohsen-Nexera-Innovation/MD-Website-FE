/** Homepage FAQ — e-commerce ordering, delivery, and shop handoff. */

import { SHOP_BASE_URL } from '@/lib/shop';

export const FAQ_INTRO = {
  eyebrow: 'Shop FAQ',
  heading: 'Ordering from MD Dental',
  lead: 'Browse specs and specialties here, then checkout on MD shop — authentic stock, delivered nationwide.',
};

export const FAQ_SHOP_CTA = {
  heading: 'Ready to order?',
  body: 'Every SKU in our catalog links straight to MD shop. CE-certified products from eight global partners, shipped to all 27 governorates.',
  primaryLabel: 'Shop now',
  secondaryLabel: 'Browse products',
  secondaryHref: '/products',
};

export type FaqAction = {
  label: string;
  href: string;
  external?: boolean;
};

export type FaqItem = {
  id: string;
  question: string;
  answer: string;
  action?: FaqAction;
};

export const FAQ_ITEMS: readonly FaqItem[] = [
  {
    id: 'how-to-shop',
    question: 'How do I shop on MD Dental?',
    answer:
      'Use this site to compare specs, filter by specialty or brand, and read technical details. When you are ready to buy, click Shop now on any product — you will go to shop.mddental.com to add items to cart and complete checkout.',
    action: { label: 'Open MD shop', href: SHOP_BASE_URL, external: true },
  },
  {
    id: 'register',
    question: 'Do I need to register before ordering?',
    answer:
      'You can browse the full product catalog without an account. Register your clinic on MD shop for verified trade access, saved order history, and faster repeat purchases. Registration takes a few minutes and our team confirms within one business day.',
    action: { label: 'Register your clinic', href: '/register' },
  },
  {
    id: 'delivery',
    question: 'How fast is delivery across Egypt?',
    answer:
      'Orders ship nationwide through Bosta logistics. Most deliveries arrive in 3–5 business days across all 27 governorates. Cairo and Delta hubs dispatch daily; Upper Egypt and coastal routes follow scheduled weekly runs. You receive SMS and email updates after your order is confirmed.',
    action: { label: 'See coverage map', href: '/coverage' },
  },
  {
    id: 'authentic',
    question: 'How do I know products are authentic?',
    answer:
      'MD Dental is the exclusive distributor for eight global manufacturing partners. Every SKU on MD shop is factory-direct with traceable batch documentation and CE certification — not grey-market imports.',
    action: { label: 'Why MD Dental', href: '/why-md-dental' },
  },
  {
    id: 'specs-vs-shop',
    question: 'What is the difference between this site and the shop?',
    answer:
      'This informative site is your spec library — published technical data, specialty filters, partner profiles, and clinical articles. MD shop is where you place orders, track shipments, and manage your clinic account. Think: research here, buy there.',
    action: { label: 'Browse product specs', href: '/products' },
  },
  {
    id: 'help',
    question: 'Can I get help choosing the right product?',
    answer:
      'Yes. Filter by dental specialty on the products page, read key specs on each product detail page, or reach out to your area representative. For urgent stock questions, contact customer care and we will point you to the right SKU on MD shop.',
    action: { label: 'Contact us', href: '/#contact' },
  },
];
