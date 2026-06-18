import { CONTACT_DETAILS, CONTACT_INTRO } from '@/content/contact';
import ContactForm from '@/components/forms/ContactForm';
import SecHead from '@/components/SecHead';

export default function GetInTouch() {
  return (
    <section id="contact" className="sec sec-contact">
      <div className="wrap">
        <SecHead
          className="sec-head--center sec-head--light"
          eyebrow={CONTACT_INTRO.eyebrow}
          h2={CONTACT_INTRO.heading}
          p={CONTACT_INTRO.lead}
          light
        />
        <div className="contact-layout reveal">
          <div className="contact-details">
            {CONTACT_DETAILS.map((item) => (
              <article key={item.id} className="contact-detail-card">
                <span className="contact-detail-label">{item.label}</span>
                <strong className="contact-detail-value">{item.value}</strong>
                <span className="contact-detail-hint">{item.hint}</span>
              </article>
            ))}
          </div>
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
