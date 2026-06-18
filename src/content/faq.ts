/** Figma — Frequently Asked Questions (node 115-500). */

export const FAQ_INTRO = {
  eyebrow: 'FAQ',
  heading: 'Frequently Asked Questions',
};

export type FaqItem = {
  id: string;
  question: string;
  answer: string;
};

export const FAQ_ITEMS: readonly FaqItem[] = [
  {
    id: 'order',
    question: 'How do I place an order?',
    answer:
      'Register your clinic, browse authentic SKUs with published specs, and submit your request. Our team confirms stock and delivery within one business day.',
  },
  {
    id: 'track',
    question: 'How do I track my order?',
    answer:
      'After confirmation you receive SMS and email updates. Nationwide Bosta delivery typically arrives in 3–5 business days across all 27 governorates.',
  },
  {
    id: 'warranty',
    question: 'What is the warranty on equipment?',
    answer:
      'Manufacturer warranties apply per brand. MD Dental provides documentation, registration support, and after-sales service for eligible devices.',
  },
  {
    id: 'shipping',
    question: 'What is your shipping policy?',
    answer:
      'We ship nationwide via Bosta logistics. Cairo and Delta hubs dispatch daily; Upper Egypt and coastal routes follow scheduled weekly runs.',
  },
  {
    id: 'authentic',
    question: 'How do you guarantee product authenticity?',
    answer:
      'MD Dental is the exclusive distributor for eight global partners. Every SKU is factory-direct with traceable batch documentation.',
  },
];
