import Link from 'next/link';
import type { Article } from '@/content/articles';
import { formatArticleDate, getRelatedArticles } from '@/content/articles';
import { getRelatedProducts } from '@/content/products';
import ProseArticle from '@/components/ui/ProseArticle';
import ShareButtons from '@/components/ui/ShareButtons';
import ArticleCard from '@/components/ui/ArticleCard';
import ProductCard from '@/components/ui/ProductCard';
import Arrow from '@/components/journey/Arrow';

type ArticleDetailViewProps = {
  article: Article;
  canonicalUrl: string;
};

export default function ArticleDetailView({ article, canonicalUrl }: ArticleDetailViewProps) {
  const relatedProducts = getRelatedProducts(article.relatedProductIds);
  const relatedArticles = getRelatedArticles(article.relatedArticleSlugs);

  return (
    <article className="article-detail reveal">
      <nav className="inner-breadcrumb article-detail-breadcrumb" aria-label="Breadcrumb">
        <Link href="/">Home</Link>
        <span aria-hidden>/</span>
        <Link href="/articles">MD Community</Link>
        <span aria-hidden>/</span>
        <span>{article.title}</span>
      </nav>

      <header className="article-detail-header">
        <div className="article-detail-tags">
          <span className="article-card-tag">{article.specialty}</span>
          <span className="article-detail-type">{article.contentTypeLabel}</span>
          {article.brand ? (
            <Link href={`/partners/${article.brandSlug}`} className="article-detail-brand">
              {article.brand}
            </Link>
          ) : null}
        </div>
        <h1>{article.title}</h1>
        <p className="article-detail-excerpt">{article.excerpt}</p>
        <div className="article-detail-meta">
          <span>{article.author}</span>
          <span>{formatArticleDate(article.publishedAt)}</span>
          <span>{article.readingTimeMinutes} min read</span>
        </div>
        <ShareButtons title={article.title} url={canonicalUrl} />
      </header>

      <div className="article-detail-layout">
        <div className="article-detail-main">
          <ProseArticle paragraphs={article.body} />

          {relatedProducts.length > 0 ? (
            <section className="article-related-products">
              <h2>Related products</h2>
              <div className="catalog-grid catalog-grid--related">
                {relatedProducts.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </section>
          ) : null}

          <section className="article-bottom-cta">
            <h2>Browse products mentioned in this guide</h2>
            <Link href="/products" className="md-btn md-btn-primary">
              View product catalog <Arrow />
            </Link>
          </section>
        </div>

        {relatedArticles.length > 0 ? (
          <aside className="article-detail-sidebar" aria-label="Related articles">
            <h2>Related articles</h2>
            <div className="article-sidebar-list">
              {relatedArticles.map((a) => (
                <ArticleCard key={a.slug} article={a} />
              ))}
            </div>
          </aside>
        ) : null}
      </div>
    </article>
  );
}
