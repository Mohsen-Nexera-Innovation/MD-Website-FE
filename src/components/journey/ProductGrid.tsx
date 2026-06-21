'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import {
  PRODUCT_TABS,
  type ProductTabId,
  productsForTab,
} from '@/content/productGrid';
import Arrow from '@/components/journey/Arrow';

export default function ProductGrid() {
  const [activeTab, setActiveTab] = useState<ProductTabId>(PRODUCT_TABS[0].id);
  const products = productsForTab(activeTab);

  return (
    <div className="product-grid-block">
      <div className="product-tab-bar reveal" role="tablist" aria-label="Product categories">
        {PRODUCT_TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={activeTab === tab.id}
            className={`product-tab${activeTab === tab.id ? ' is-active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="product-grid reveal build-group" role="tabpanel">
        {products.map((product) => (
          <Link key={product.id} href={product.href} className="product-grid-card build">
            <div className="product-grid-card-media">
              <Image
                src={product.image}
                alt={product.imageAlt}
                fill
                sizes="(max-width: 640px) 50vw, 25vw"
                className="product-grid-card-img"
              />
            </div>
            <div className="product-grid-card-body">
              <span className="product-grid-brand">{product.brand}</span>
              <h3>{product.name}</h3>
              <p>{product.blurb}</p>
              <span className="product-grid-link" aria-hidden>
                <Arrow />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
