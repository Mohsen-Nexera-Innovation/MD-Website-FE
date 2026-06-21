'use client';

import { useState } from 'react';
import { FAQ_ITEMS, FAQ_INTRO } from '@/content/faq';
import SecHead from '@/components/SecHead';

export default function FaqSection() {
  const [openId, setOpenId] = useState<string | null>(FAQ_ITEMS[0]?.id ?? null);

  return (
    <section id="faq" className="sec sec-faq">
      <div className="wrap">
        <SecHead className="sec-head--center" eyebrow={FAQ_INTRO.eyebrow} h2={FAQ_INTRO.heading} />
        <div className="faq-list reveal">
          {FAQ_ITEMS.map((item) => {
            const open = openId === item.id;
            return (
              <div key={item.id} className={`faq-item${open ? ' is-open' : ''}`}>
                <button
                  type="button"
                  className="faq-trigger"
                  aria-expanded={open}
                  onClick={() => setOpenId(open ? null : item.id)}
                >
                  <span>{item.question}</span>
                  <span className="faq-trigger-icon" aria-hidden>{open ? '−' : '+'}</span>
                </button>
                {open ? (
                  <div className="faq-answer">
                    <p>{item.answer}</p>
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
