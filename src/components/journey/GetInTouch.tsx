import { CONTACT_DETAILS, CONTACT_INTRO } from '@/content/contact';
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
          <form className="contact-form" action="#" method="post">
            <label className="contact-field">
              <span>Full Name</span>
              <input type="text" name="name" required placeholder="Dr. Ahmed Hassan" />
            </label>
            <label className="contact-field">
              <span>Email Address</span>
              <input type="email" name="email" required placeholder="clinic@example.com" />
            </label>
            <label className="contact-field">
              <span>Your Message</span>
              <textarea name="message" rows={5} required placeholder="How can we help your practice?" />
            </label>
            <button type="submit" className="md-btn md-btn-primary contact-submit">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
