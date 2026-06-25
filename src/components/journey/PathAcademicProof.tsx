import AcademicPartnerHoverGrid from '@/components/journey/AcademicPartnerHoverGrid';
import {
  ACADEMIC_PARTNERS_HEADING,
  ACADEMIC_PARTNERS_LEAD,
  ACADEMY_PARTNERS,
  ACADEMY_PARTNERS_LEAD,
  DENTAL_ACADEMIES_HEADING,
  UNIVERSITY_PARTNERS,
} from '@/content/universities';

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
          <AcademicPartnerHoverGrid
            partners={UNIVERSITY_PARTNERS}
            variant="university"
            gridClassName="path-uni-grid build-group"
            tileClassName="path-uni-tile"
          />
        </section>

        <div className="path-academic-divider" aria-hidden />

        <section className="path-academic-block" aria-labelledby="dental-academies-title">
          <header className="path-academic-head">
            <span className="path-academic-eyebrow path-academic-eyebrow--gold">Professional bodies</span>
            <h3 id="dental-academies-title" className="path-academic-title">
              {DENTAL_ACADEMIES_HEADING}
            </h3>
            <p className="path-academic-lead">{ACADEMY_PARTNERS_LEAD}</p>
          </header>
          <AcademicPartnerHoverGrid
            partners={ACADEMY_PARTNERS}
            variant="academy"
            gridClassName="path-academy-grid build-group"
            tileClassName="path-academy-tile"
          />
        </section>
      </div>
    </div>
  );
}
