import Link from 'next/link';
import InnerPage from '@/components/InnerPage';
import { ARTICLES_PREVIEW } from '@/content/home';

export default function ArticlesPage() {
  return (
    <InnerPage
      eyebrow="Educational Hub"
      title="Articles"
      lead="Clinical knowledge organized by specialty and brand — organic traffic driver for dentists."
      journeyFrom="proof"
    >
      <div className="g3">
        {ARTICLES_PREVIEW.map((a) => (
          <Link key={a.slug} href={`/articles/${a.slug}`} className="content-card content-card--link">
            <span className="tag">{a.tag}</span>
            <h3>{a.title}</h3>
            <div className="meta">{a.date}</div>
          </Link>
        ))}
      </div>
    </InnerPage>
  );
}
