'use client';

import Link from 'next/link';
import { useState } from 'react';
import { FAQ_ITEMS, FAQ_INTRO, FAQ_SHOP_CTA } from '@/content/faq';
import Arrow from '@/components/journey/Arrow';
import SecHead from '@/components/SecHead';
import { SHOP_BASE_URL } from '@/lib/shop';

export default function FaqSection() {
  const [openId, setOpenId] = useState<string | null>(FAQ_ITEMS[0]?.id ?? null);

  return (
    <section id="faq" className="sec sec-faq">
      <div className="wrap">
        <SecHead
          className="sec-head--center"
          eyebrow={FAQ_INTRO.eyebrow}
          h2={FAQ_INTRO.heading}
          p={FAQ_INTRO.lead}
        />

        <div className="faq-shop-band reveal">
          <div className="faq-shop-band-copy">
            <strong>Shop authentic dental stock online</strong>
            <p>
              Filter by specialty, read published specs, then checkout on MD shop with Bosta delivery
              to your clinic door.
            </p>
          </div>
          <a
            href={SHOP_BASE_URL}
            className="md-btn md-btn-primary faq-shop-band-cta"
            target="_blank"
            rel="noopener noreferrer"
          >
            Shop now
          </a>
        </div>

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
                  <span className="faq-trigger-icon" aria-hidden>
                    {open ? '−' : '+'}
                  </span>
                </button>
                {open ? (
                  <div className="faq-answer">
                    <p>{item.answer}</p>
                    {item.action ? (
                      <div className="faq-answer-action">
                        {item.action.external ? (
                          <a
                            href={item.action.href}
                            className="faq-answer-link"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {item.action.label} <Arrow />
                          </a>
                        ) : (
                          <Link href={item.action.href} className="faq-answer-link">
                            {item.action.label} <Arrow />
                          </Link>
                        )}
                      </div>
                    ) : null}
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>

        <div className="faq-cta-band reveal" aria-labelledby="faq-shop-heading">
          <h3 id="faq-shop-heading">{FAQ_SHOP_CTA.heading}</h3>
          <p>{FAQ_SHOP_CTA.body}</p>
          <div className="faq-cta-band-actions">
            <a
              href={SHOP_BASE_URL}
              className="md-btn md-btn-primary"
              target="_blank"
              rel="noopener noreferrer"
            >
              {FAQ_SHOP_CTA.primaryLabel} <Arrow />
            </a>
            <Link href={FAQ_SHOP_CTA.secondaryHref} className="md-btn md-btn-ghost">
              {FAQ_SHOP_CTA.secondaryLabel}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
