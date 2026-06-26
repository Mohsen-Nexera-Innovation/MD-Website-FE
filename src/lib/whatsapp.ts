/** MD Dental WhatsApp customer care — persistent FAB handoff. */

import { HUB_CONTACT } from '@/content/coverageCities';

const DEFAULT_MESSAGE = 'Hello MD Dental — I would like help with an order or product question.';

/** Digits-only E.164 without + for wa.me links. */
export const WHATSAPP_PHONE =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/\D/g, '') ??
  HUB_CONTACT.phone?.replace(/\D/g, '') ??
  '201012345678';

export function getWhatsAppUrl(message = DEFAULT_MESSAGE): string {
  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;
}

export const WHATSAPP_FAB = {
  title: 'WhatsApp — MD Dental Customer Care',
  ariaLabel: 'WhatsApp customer care',
} as const;
