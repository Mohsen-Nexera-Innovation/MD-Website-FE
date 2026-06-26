/** Events module — MD Dental photo archive (2020–2026). */

import type { DentalSpecialtySlug } from '@/content/products';
import { MD_MEDIA_EVENTS } from '@/content/mdMedia';

export const EVENTS_INTRO = {
  eyebrow: 'Community',
  title: 'Events & clinical days',
  lead:
    'Workshops, conferences, and partner showcases across Egypt — real photos from MD Dental activities in 2020–2026.',
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

function inferLocation(title: string): string {
  if (/fue|endodontic/i.test(title)) return 'Cairo, Egypt';
  if (/idex|sidc|conference|مؤتمر|مركز|نقابه|جامعه/i.test(title)) return 'Egypt';
  return 'Egypt';
}

function buildEvent(entry: (typeof MD_MEDIA_EVENTS)[number], index: number): CatalogEvent {
  const month = String((index % 12) + 1).padStart(2, '0');
  const day = String((index % 27) + 1).padStart(2, '0');
  const startDate = `${entry.year}-${month}-${day}`;

  return {
    id: entry.id,
    title: entry.title,
    type: entry.type as EventType,
    typeLabel: entry.typeLabel,
    startDate,
    endDate: startDate,
    timeLabel: 'Photo archive',
    location: inferLocation(entry.title),
    isVirtual: false,
    excerpt: `${entry.typeLabel} — ${entry.imageCount} photos from MD Dental activities.`,
    description: [
      `Photo archive from ${entry.title}.`,
      `${entry.imageCount} images captured during this ${entry.typeLabel.toLowerCase()}.`,
    ],
    status: 'PAST',
    speakers: [],
    relatedProductIds: [],
    relatedArticleSlugs: [],
    galleryImages: entry.galleryImages,
    image: entry.image,
    imageAlt: `${entry.title} — MD Dental ${entry.typeLabel.toLowerCase()} photo`,
  };
}

export const EVENTS: readonly CatalogEvent[] = MD_MEDIA_EVENTS.map(buildEvent);

export const EVENTS_PREVIEW = EVENTS.slice(0, 3).map((e) => ({
  id: e.id,
  title: e.title,
  type: e.typeLabel,
  date: formatEventDate(e.startDate),
  location: e.location,
}));

export function formatEventDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export function getEventById(rawId: string): CatalogEvent | undefined {
  const id = decodeURIComponent(rawId).normalize('NFC').replace(/\p{M}/gu, '');
  return EVENTS.find((event) => event.id.normalize('NFC').replace(/\p{M}/gu, '') === id);
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
