type ProductDownloadProps = {
  label: string;
  url?: string;
};

/** Renders a download link when URL is set; otherwise a disabled placeholder. */
export default function ProductDownload({ label, url }: ProductDownloadProps) {
  if (url) {
    return (
      <a
        href={url}
        className="md-btn md-btn-ghost md-btn-full product-download-btn"
        target="_blank"
        rel="noopener noreferrer"
        download
      >
        {label}
      </a>
    );
  }

  return (
    <button
      type="button"
      className="md-btn md-btn-disabled md-btn-full product-download-btn"
      title="Document available after CMS publish — register for early access"
      disabled
    >
      {label}
    </button>
  );
}
