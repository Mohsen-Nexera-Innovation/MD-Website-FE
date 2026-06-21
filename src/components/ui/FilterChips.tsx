type FilterChipsProps = {
  chips: { key: string; label: string }[];
  onRemove: (key: string) => void;
  onClearAll?: () => void;
};

export default function FilterChips({ chips, onRemove, onClearAll }: FilterChipsProps) {
  if (!chips.length) return null;

  return (
    <div className="catalog-chips" aria-label="Active filters">
      {chips.map((chip) => (
        <button
          key={chip.key}
          type="button"
          className="catalog-chip"
          onClick={() => onRemove(chip.key)}
        >
          {chip.label}
          <span aria-hidden>×</span>
        </button>
      ))}
      {onClearAll ? (
        <button type="button" className="catalog-chip-clear" onClick={onClearAll}>
          Clear all
        </button>
      ) : null}
    </div>
  );
}
