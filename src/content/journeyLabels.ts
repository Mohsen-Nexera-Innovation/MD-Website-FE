/** Human-readable homepage chapter labels for inner-page journey links. */
export const JOURNEY_CHAPTER_LABELS: Record<string, string> = {
  authority: 'Hero',
  story: 'Our Story',
  vision: 'Vision & Values',
  partners: 'Global Partners',
  reach: 'National Reach',
  products: 'Products',
  promise: 'Choose Your Path',
  faq: 'FAQ',
  contact: 'Contact',
};

export function journeyChapterLabel(id: string): string {
  return JOURNEY_CHAPTER_LABELS[id] ?? id;
}
