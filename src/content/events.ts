/** Events module — static seed (SRS EVENT-001/002 prototype). */

import type { DentalSpecialtySlug } from '@/content/products';

export const EVENTS_INTRO = {
  eyebrow: 'Community',
  title: 'Events & clinical days',
  lead:
    'Workshops, webinars, and partner showcases across Egypt — proof that MD Dental is an active market leader.',
};

export type EventType = 'WORKSHOP' | 'WEBINAR' | 'CONFERENCE' | 'COURSE' | 'NETWORKING';

export type EventStatus = 'OPEN' | 'CLOSED' | 'SOLD_OUT' | 'PAST';

export type EventSpeaker = {
  name: string;
  title: string;
  organization: string;
};

export type CatalogEvent = {
  id: string;
  title: string;
  type: EventType;
  typeLabel: string;
  startDate: string;
  endDate: string;
  timeLabel: string;
  location: string;
  isVirtual: boolean;
  specialty?: string;
  specialtySlug?: DentalSpecialtySlug;
  excerpt: string;
  description: string[];
  status: EventStatus;
  registrationUrl?: string;
  capacity?: number;
  speakers: EventSpeaker[];
  relatedProductIds: string[];
  relatedArticleSlugs: string[];
  galleryImages?: string[];
  attendeeCount?: number;
  recap?: string;
  image: string;
  imageAlt: string;
};

const events: CatalogEvent[] = [
  {
    id: 'clinical-day-cairo',
    title: 'MD Dental Clinical Day — Cairo',
    type: 'WORKSHOP',
    typeLabel: 'Workshop',
    startDate: '2026-07-12',
    endDate: '2026-07-12',
    timeLabel: '10:00 AM – 4:00 PM EET',
    location: 'Cairo, Egypt',
    isVirtual: false,
    specialty: 'Restorative',
    specialtySlug: 'RESTORATIVE',
    excerpt: 'Hands-on composite and bonding workshops with BMS clinical educators.',
    description: [
      'Join MD Dental and BMS for a full-day clinical program covering shade selection, layering techniques, and troubleshooting common composite challenges.',
      'Limited seats include hands-on stations, CE documentation, and lunch. Materials provided by MD Dental partner brands.',
    ],
    status: 'OPEN',
    registrationUrl: 'https://forms.example.com/clinical-day-cairo',
    capacity: 60,
    speakers: [
      { name: 'Dr. Nadia El-Sayed', title: 'Restorative Specialist', organization: 'MD Dental Clinical Team' },
      { name: 'Marco Bianchi', title: 'Product Educator', organization: 'BMS' },
    ],
    relatedProductIds: ['bms-composite-kit', 'bms-bonding-agent'],
    relatedArticleSlugs: ['ce-certified-composites', 'composite-shade-protocol'],
    image: '/events/clinical-day-cairo.png',
    imageAlt: 'MD Dental clinical workshop in Cairo with dentists training',
  },
  {
    id: 'digital-webinar-series',
    title: 'Digital Dentistry Webinar Series',
    type: 'WEBINAR',
    typeLabel: 'Webinar',
    startDate: '2026-08-28',
    endDate: '2026-08-28',
    timeLabel: '7:00 PM – 8:30 PM EET',
    location: 'Online',
    isVirtual: true,
    specialty: 'Restorative',
    specialtySlug: 'RESTORATIVE',
    excerpt: 'Three-part webinar on digital workflows from scan to mill.',
    description: [
      'Explore digital restorative workflows with Heydent educators — zirconia selection, milling parameters, and finishing protocols.',
      'Live Q&A with MD Dental clinical support. Recording shared to registered attendees within 48 hours.',
    ],
    status: 'OPEN',
    registrationUrl: 'https://forms.example.com/digital-webinar',
    speakers: [
      { name: 'Dr. Amr Farouk', title: 'Digital Dentistry Lead', organization: 'MD Dental' },
    ],
    relatedProductIds: ['heydent-zirconia-disc', 'heydent-polish-system'],
    relatedArticleSlugs: ['heydent-zirconia-workflow'],
    image: '/events/digital-webinar-series.png',
    imageAlt: 'Digital dentistry webinar on screen with dental professional',
  },
  {
    id: 'alex-partner-showcase',
    title: 'Alexandria Partner Showcase',
    type: 'CONFERENCE',
    typeLabel: 'Conference',
    startDate: '2026-09-10',
    endDate: '2026-09-10',
    timeLabel: '11:00 AM – 6:00 PM EET',
    location: 'Alexandria, Egypt',
    isVirtual: false,
    excerpt: 'Meet MD Dental partner brands and explore new product lines on the Mediterranean coast.',
    description: [
      'Regional showcase for dentists and lab technicians — live demos from Aditek, SIN, Centrix, and TopGlove.',
      'Network with field representatives and register for governorates-specific delivery programs.',
    ],
    status: 'OPEN',
    registrationUrl: 'https://forms.example.com/alex-showcase',
    capacity: 120,
    speakers: [
      { name: 'Ahmed Rashid', title: 'Regional Director', organization: 'MD Dental' },
    ],
    relatedProductIds: ['aditek-bracket-system', 'sin-endo-file-set', 'topglove-exam-gloves'],
    relatedArticleSlugs: ['md-dental-nationwide-delivery'],
    image: '/events/alex-partner-showcase.png',
    imageAlt: 'Partner showcase event in Alexandria with dental brands',
  },
  {
    id: 'endo-masterclass-2025',
    title: 'Endodontic Masterclass — Upper Egypt',
    type: 'COURSE',
    typeLabel: 'Course',
    startDate: '2025-11-08',
    endDate: '2025-11-08',
    timeLabel: '9:00 AM – 3:00 PM EET',
    location: 'Minya, Egypt',
    isVirtual: false,
    specialty: 'Endodontics',
    specialtySlug: 'ENDODONTICS',
    excerpt: 'Rotary instrumentation and obturation workshop with SIN clinical trainers.',
    description: [
      'Past event — full-day endodontic program covering canal access, rotary shaping, and bioceramic obturation.',
    ],
    status: 'PAST',
    attendeeCount: 48,
    recap: 'Participants rated hands-on rotary sequences and sealer technique demos highest. Materials kits distributed to all attendees.',
    speakers: [
      { name: 'Dr. Youssef Amin', title: 'Endodontist', organization: 'MD Dental Clinical Team' },
    ],
    relatedProductIds: ['sin-endo-file-set', 'sin-sealer-kit'],
    relatedArticleSlugs: ['endo-rotary-selection', 'obturation-best-practices'],
    galleryImages: ['/events/endo-masterclass-2025.png'],
    image: '/events/endo-masterclass-2025.png',
    imageAlt: 'Endodontic masterclass hands-on training in Upper Egypt',
  },
  {
    id: 'infection-control-roundtable',
    title: 'Infection Control Roundtable',
    type: 'NETWORKING',
    typeLabel: 'Networking',
    startDate: '2025-10-15',
    endDate: '2025-10-15',
    timeLabel: '6:00 PM – 8:00 PM EET',
    location: 'Cairo, Egypt',
    isVirtual: false,
    specialty: 'Infection Control',
    specialtySlug: 'INFECTION_CONTROL',
    excerpt: 'Clinic managers shared sterilization audit templates and pouch protocols.',
    description: ['Past networking session for practice managers and infection control leads.'],
    status: 'PAST',
    attendeeCount: 32,
    recap: 'Roundtable produced a shared audit checklist now available to registered MD Dental clinics.',
    speakers: [
      { name: 'Dr. Hana Rizk', title: 'Clinical Quality Lead', organization: 'MD Dental' },
    ],
    relatedProductIds: ['profa-sterilization-pouch', 'topglove-exam-gloves'],
    relatedArticleSlugs: ['sterilization-audit-checklist'],
    image: '/events/infection-control-roundtable.png',
    imageAlt: 'Infection control roundtable for dental clinic managers',
  },
];

export const EVENTS: readonly CatalogEvent[] = events;

export const EVENTS_PREVIEW = EVENTS.filter((e) => e.status === 'OPEN').slice(0, 3).map((e) => ({
  id: e.id,
  title: e.title,
  type: e.typeLabel,
  date: formatEventDate(e.startDate),
  location: e.isVirtual ? 'Online' : e.location,
}));

export function formatEventDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export function getEventById(id: string): CatalogEvent | undefined {
  return EVENTS.find((e) => e.id === id);
}

export function isEventPast(event: CatalogEvent): boolean {
  return event.status === 'PAST' || new Date(event.endDate) < new Date();
}

export function getUpcomingEvents(): CatalogEvent[] {
  return EVENTS.filter((e) => !isEventPast(e)).sort((a, b) => a.startDate.localeCompare(b.startDate));
}

export function getPastEvents(): CatalogEvent[] {
  return EVENTS.filter((e) => isEventPast(e)).sort((a, b) => b.startDate.localeCompare(a.startDate));
}
