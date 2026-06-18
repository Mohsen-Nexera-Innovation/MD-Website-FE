import type { Metadata } from 'next';
import { Suspense } from 'react';
import PageHero from '@/components/layout/PageHero';
import ArticlesCatalog from '@/components/catalog/ArticlesCatalog';
import { ARTICLES_INTRO } from '@/content/articles';

export const metadata: Metadata = {
  title: 'MD Community — Articles | MD Dental',
  description:
    'Clinical articles and guides from MD Dental — education organized by specialty and global partner brand.',
};

export default function ArticlesPage() {
  return (
    <div className="inner-page inner-page--faq inner-page--catalog">
      <div className="wrap">
        <PageHero
          breadcrumbLabel="MD Community"
          eyebrow={ARTICLES_INTRO.eyebrow}
          title={ARTICLES_INTRO.title}
          lead={ARTICLES_INTRO.lead}
        />

        <Suspense fallback={<p className="catalog-loading">Loading articles…</p>}>
          <ArticlesCatalog />
        </Suspense>
      </div>
    </div>
  );
}
