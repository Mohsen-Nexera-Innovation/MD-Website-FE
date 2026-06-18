import {
  ACADEMIC_PARTNERS,
  ACADEMIC_PARTNERS_HEADING,
  ACADEMIC_PARTNERS_LEAD,
  DENTAL_ACADEMIES,
  DENTAL_ACADEMIES_HEADING,
  DENTAL_ACADEMIES_LEAD,
} from '@/content/pathCards';

function initials(name: string): string {
  const words = name.replace(/University|Academy|Institute|Association|Center/gi, '').trim().split(/\s+/);
  if (words.length >= 2) {
    return `${words[0][0] ?? ''}${words[1][0] ?? ''}`.toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
}

function AcademyIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <path d="M22 10v6M2 10l10-5 10 5-10 5-10-5z" />
      <path d="M6 12v5c0 1.1 2.7 3 6 3s6-1.9 6-3v-5" />
    </svg>
  );
}

export default function PathAcademicProof() {
  return (
    <div className="path-academic reveal">
      <div className="path-academic-panel">
        <section className="path-academic-block" aria-labelledby="academic-partners-title">
          <header className="path-academic-head">
            <span className="path-academic-eyebrow">Academic network</span>
            <h3 id="academic-partners-title" className="path-academic-title">
              {ACADEMIC_PARTNERS_HEADING}
            </h3>
            <p className="path-academic-lead">{ACADEMIC_PARTNERS_LEAD}</p>
          </header>
          <ul className="path-uni-grid build-group">
            {ACADEMIC_PARTNERS.map((name, index) => (
              <li
                key={name}
                className="path-uni-tile build"
                style={{ ['--uni-i' as string]: index }}
              >
                <span className="path-uni-mark" aria-hidden>{initials(name)}</span>
                <span className="path-uni-name">{name}</span>
              </li>
            ))}
          </ul>
        </section>

        <div className="path-academic-divider" aria-hidden />

        <section className="path-academic-block" aria-labelledby="dental-academies-title">
          <header className="path-academic-head">
            <span className="path-academic-eyebrow path-academic-eyebrow--gold">Professional bodies</span>
            <h3 id="dental-academies-title" className="path-academic-title">
              {DENTAL_ACADEMIES_HEADING}
            </h3>
            <p className="path-academic-lead">{DENTAL_ACADEMIES_LEAD}</p>
          </header>
          <ul className="path-academy-grid build-group">
            {DENTAL_ACADEMIES.map((name, index) => (
              <li
                key={name}
                className="path-academy-tile build"
                style={{ ['--acad-i' as string]: index }}
              >
                <span className="path-academy-icon" aria-hidden>
                  <AcademyIcon />
                </span>
                <span className="path-academy-name">{name}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
