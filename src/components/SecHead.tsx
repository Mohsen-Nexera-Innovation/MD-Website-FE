type SecHeadProps = {
  eyebrow?: string;
  h2: string;
  p?: string;
  light?: boolean;
};

export default function SecHead({ eyebrow, h2, p, light }: SecHeadProps) {
  return (
    <div className={`sec-head${light ? ' light' : ''}`}>
      {eyebrow ? <div className="eyebrow">{eyebrow}</div> : null}
      <h2>{h2}</h2>
      {p ? <p>{p}</p> : null}
    </div>
  );
}
