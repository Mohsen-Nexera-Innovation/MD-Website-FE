type EmptyStateProps = {
  title: string;
  message: string;
  actionLabel?: string;
  onAction?: () => void;
};

export default function EmptyState({ title, message, actionLabel, onAction }: EmptyStateProps) {
  return (
    <div className="catalog-empty reveal">
      <h2>{title}</h2>
      <p>{message}</p>
      {actionLabel && onAction ? (
        <button type="button" className="md-btn md-btn-ghost" onClick={onAction}>
          {actionLabel}
        </button>
      ) : null}
    </div>
  );
}
