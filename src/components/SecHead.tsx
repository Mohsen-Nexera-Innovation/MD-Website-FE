type SecHeadProps = {
  eyebrow?: string;
  h2: string;
  p?: string;
  light?: boolean;
  className?: string;
};

export default function SecHead({ eyebrow, h2, p, light, className }: SecHeadProps) {
  const classes = ['sec-head', light ? 'light' : '', className ?? ''].filter(Boolean).join(' ');
  return (
    <div className={classes}>
      {eyebrow ? <div className="eyebrow">{eyebrow}</div> : null}
      <h2>{h2}</h2>
      {p ? <p>{p}</p> : null}
    </div>
  );
}
