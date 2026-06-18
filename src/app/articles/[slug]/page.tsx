import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ArticleDetailView from '@/components/catalog/ArticleDetailView';
import { getArticleBySlug } from '@/content/articles';

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return { title: 'Article | MD Dental' };
  return {
    title: `${article.title} | MD Dental`,
    description: article.excerpt,
  };
}

export default async function ArticleDetailPage({ params }: Props) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const canonicalUrl = `https://mddental.com/articles/${article.slug}`;

  return (
    <div className="inner-page inner-page--faq inner-page--catalog">
      <div className="wrap">
        <ArticleDetailView article={article} canonicalUrl={canonicalUrl} />
      </div>
    </div>
  );
}
