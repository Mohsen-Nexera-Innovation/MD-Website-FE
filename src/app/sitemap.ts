import type { MetadataRoute } from 'next';
import { ARTICLES } from '@/content/articles';
import { EVENTS } from '@/content/events';
import { PARTNER_BRANDS } from '@/content/partners';
import { CATALOG_PRODUCTS } from '@/content/products';
import { SITE_URL } from '@/lib/site';

const STATIC_ROUTES = [
  '',
  '/about',
  '/why-md-dental',
  '/coverage',
  '/partners',
  '/products',
  '/articles',
  '/events',
  '/careers',
  '/login',
  '/register',
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency: path === '' ? 'weekly' : 'monthly',
    priority: path === '' ? 1 : 0.7,
  }));

  const productEntries: MetadataRoute.Sitemap = CATALOG_PRODUCTS.map((p) => ({
    url: `${SITE_URL}/products/${p.id}`,
    lastModified: new Date(p.publishedAt),
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  const partnerEntries: MetadataRoute.Sitemap = PARTNER_BRANDS.map((p) => ({
    url: `${SITE_URL}/partners/${p.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  const articleEntries: MetadataRoute.Sitemap = ARTICLES.map((a) => ({
    url: `${SITE_URL}/articles/${a.slug}`,
    lastModified: new Date(a.publishedAt),
    changeFrequency: 'monthly',
    priority: 0.5,
  }));

  const eventEntries: MetadataRoute.Sitemap = EVENTS.map((e) => ({
    url: `${SITE_URL}/events/${e.id}`,
    lastModified: new Date(e.startDate),
    changeFrequency: 'weekly',
    priority: 0.5,
  }));

  return [
    ...staticEntries,
    ...productEntries,
    ...partnerEntries,
    ...articleEntries,
    ...eventEntries,
  ];
}
