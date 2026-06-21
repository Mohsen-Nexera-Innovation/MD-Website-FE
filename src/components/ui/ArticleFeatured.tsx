import Link from 'next/link';
import Image from 'next/image';
import Arrow from '@/components/journey/Arrow';
import type { Article } from '@/content/articles';
import { formatArticleDate } from '@/content/articles';

type ArticleFeaturedProps = {
  article: Article;
};

export default function ArticleFeatured({ article }: ArticleFeaturedProps) {
  return (
    <Link href={`/articles/${article.slug}`} className="article-featured article-featured--link reveal">
      <div className="article-featured-media">
        <Image
          src={article.image}
          alt={article.imageAlt}
          width={720}
          height={400}
          className="article-featured-img"
          sizes="(max-width: 900px) 100vw, 720px"
          priority
        />
        <div className="article-featured-ribbon" aria-hidden />
      </div>
      <div className="article-featured-body">
        <span className="article-featured-label">Featured</span>
        <span className="article-card-tag">{article.contentTypeLabel}</span>
        <h2>{article.title}</h2>
        <p>{article.excerpt}</p>
        <div className="article-card-meta">
          {article.author} · {formatArticleDate(article.publishedAt)} · {article.readingTimeMinutes} min
        </div>
        <span className="article-featured-cta">
          Read article <Arrow />
        </span>
      </div>
    </Link>
  );
}
