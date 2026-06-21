import Link from 'next/link';
import Image from 'next/image';
import type { Article } from '@/content/articles';
import { formatArticleDate } from '@/content/articles';

type ArticleCardProps = {
  article: Article;
};

export default function ArticleCard({ article }: ArticleCardProps) {
  return (
    <Link href={`/articles/${article.slug}`} className="article-card article-card--link">
      <div className="article-card-media">
        <Image
          src={article.image}
          alt={article.imageAlt}
          width={400}
          height={240}
          className="article-card-img"
          sizes="(max-width: 600px) 100vw, 320px"
        />
      </div>
      <div className="article-card-body">
        <span className="article-card-tag">{article.specialty}</span>
        <h3>{article.title}</h3>
        <p className="article-card-excerpt">{article.excerpt}</p>
        <div className="article-card-meta">
          {formatArticleDate(article.publishedAt)} · {article.readingTimeMinutes} min read
        </div>
      </div>
    </Link>
  );
}
