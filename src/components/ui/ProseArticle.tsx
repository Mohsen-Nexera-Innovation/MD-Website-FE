type ProseArticleProps = {
  paragraphs: string[];
};

export default function ProseArticle({ paragraphs }: ProseArticleProps) {
  return (
    <div className="prose-article">
      {paragraphs.map((p, i) => (
        <p key={i}>{p}</p>
      ))}
    </div>
  );
}
