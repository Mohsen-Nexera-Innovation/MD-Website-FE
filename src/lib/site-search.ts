import { ARTICLES } from '@/content/articles';
import { EVENTS } from '@/content/events';
import { NAV_LINKS } from '@/content/nav';
import { PARTNER_BRANDS } from '@/content/partners';
import { CATALOG_PRODUCTS } from '@/content/products';
import { UNIVERSITY_PARTNERS } from '@/content/universities';

export type SiteSearchCategory = 'Product' | 'Event' | 'Article' | 'Partner' | 'Page';

export type SiteSearchItem = {
  id: string;
  title: string;
  subtitle: string;
  href: string;
  category: SiteSearchCategory;
  haystack: string;
};

const STATIC_PAGES: readonly Omit<SiteSearchItem, 'id' | 'haystack'>[] = [
  {
    title: 'Why MD Dental',
    subtitle: 'Exclusive distribution & nationwide support',
    href: '/why-md-dental',
    category: 'Page',
  },
  {
    title: 'Coverage Map',
    subtitle: 'Field reps & Bosta delivery across Egypt',
    href: '/coverage',
    category: 'Page',
  },
  {
    title: 'Register your clinic',
    subtitle: 'Create an MD Dental account',
    href: '/register',
    category: 'Page',
  },
  {
    title: 'Login',
    subtitle: 'Sign in to your MD Dental account',
    href: '/login',
    category: 'Page',
  },
];

function buildHaystack(parts: (string | undefined)[]): string {
  return parts.filter(Boolean).join(' ').toLowerCase();
}

function buildIndex(): SiteSearchItem[] {
  const items: SiteSearchItem[] = [];

  for (const link of NAV_LINKS) {
    items.push({
      id: `page:${link.href}`,
      title: link.label,
      subtitle: 'Browse section',
      href: link.href,
      category: 'Page',
      haystack: buildHaystack([link.label, link.href, 'page section']),
    });
  }

  for (const page of STATIC_PAGES) {
    items.push({
      id: `page:${page.href}`,
      ...page,
      haystack: buildHaystack([page.title, page.subtitle, page.href, 'page']),
    });
  }

  for (const product of CATALOG_PRODUCTS) {
    items.push({
      id: `product:${product.id}`,
      title: product.name,
      subtitle: `${product.brand} · ${product.specialty}`,
      href: `/products/${product.id}`,
      category: 'Product',
      haystack: buildHaystack([
        product.name,
        product.brand,
        product.brandSlug,
        product.specialty,
        product.specialtySlug,
        product.subcategory,
        product.keySpec,
        product.description,
      ]),
    });
  }

  for (const event of EVENTS) {
    items.push({
      id: `event:${event.id}`,
      title: event.title,
      subtitle: `${event.typeLabel} · ${event.location}`,
      href: `/events/${event.id}`,
      category: 'Event',
      haystack: buildHaystack([
        event.title,
        event.typeLabel,
        event.type,
        event.location,
        event.excerpt,
        event.specialty,
        ...event.description,
      ]),
    });
  }

  for (const article of ARTICLES) {
    items.push({
      id: `article:${article.slug}`,
      title: article.title,
      subtitle: `${article.contentTypeLabel} · ${article.specialty}`,
      href: `/articles/${article.slug}`,
      category: 'Article',
      haystack: buildHaystack([
        article.title,
        article.excerpt,
        article.specialty,
        article.specialtySlug,
        article.brand,
        article.brandSlug,
        article.contentTypeLabel,
        article.author,
        ...article.body,
      ]),
    });
  }

  for (const partner of PARTNER_BRANDS) {
    items.push({
      id: `partner:${partner.slug}`,
      title: partner.name,
      subtitle: `${partner.country} · ${partner.specialties.join(', ')}`,
      href: `/partners/${partner.slug}`,
      category: 'Partner',
      haystack: buildHaystack([
        partner.name,
        partner.slug,
        partner.country,
        partner.region,
        partner.excerpt,
        ...partner.specialties,
        ...partner.story,
      ]),
    });
  }

  for (const uni of UNIVERSITY_PARTNERS) {
    items.push({
      id: `partner:uni:${uni.id}`,
      title: uni.name,
      subtitle: `Academic partner${uni.city ? ` · ${uni.city}` : ''}`,
      href: '/partners#promise',
      category: 'Partner',
      haystack: buildHaystack([
        uni.name,
        uni.nameAr,
        uni.city,
        'university academic partner',
        ...uni.brands.map((b) => b.label),
      ]),
    });
  }

  return items;
}

export const SITE_SEARCH_INDEX: readonly SiteSearchItem[] = buildIndex();

function scoreItem(item: SiteSearchItem, query: string): number {
  const title = item.title.toLowerCase();
  const subtitle = item.subtitle.toLowerCase();

  if (title === query) return 100;
  if (title.startsWith(query)) return 85;
  if (title.includes(query)) return 70;
  if (subtitle.includes(query)) return 55;
  if (item.haystack.includes(query)) return 40;
  return 0;
}

export function searchSite(query: string, limit = 16): SiteSearchItem[] {
  const q = query.trim().toLowerCase();
  if (q.length < 2) return [];

  return SITE_SEARCH_INDEX.map((item) => ({ item, score: scoreItem(item, q) }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score || a.item.title.localeCompare(b.item.title))
    .slice(0, limit)
    .map(({ item }) => item);
}

export const SITE_SEARCH_SUGGESTIONS = [
  'BMS composite',
  'Endodontic rotary',
  'Workshop Cairo',
  'Coverage map',
  'Register clinic',
] as const;
