/** Product categories — homepage "Our Products" discovery grid. */

import { getMdProductImage } from '@/content/mdMedia';

export const PRODUCT_INTRO = {
  eyebrow: 'Our Products',
  heading: 'Authentic products across every specialty',
  lead: 'Factory-direct, CE-certified instruments and materials from eight global partners — organized by the way you practice.',
};

export type ProductCategory = {
  name: string;
  blurb: string;
  count: string;
  href: string;
  featured: string;
  image: string;
  imageAlt: string;
};

const categoryImage = (brandSlug: string, file: string, fallback: string) =>
  getMdProductImage(brandSlug, file) ?? fallback;

export const PRODUCT_CATEGORIES: readonly ProductCategory[] = [
  {
    name: 'Restorative',
    blurb: 'Composites, bonding systems, cements and finishing materials.',
    count: '120+ SKUs',
    href: '/products?specialty=RESTORATIVE',
    featured: 'BMS FILLBEST · Heydent Hey-TEC',
    image: categoryImage('bms', 'FILLBEST.JPG', '/products/cat-restorative.png'),
    imageAlt: 'BMS FILLBEST composite and Heydent restorative materials',
  },
  {
    name: 'Endodontics',
    blurb: 'Rotary files, spreaders and obturation systems for predictable treatment.',
    count: '60+ SKUs',
    href: '/products?specialty=ENDODONTICS',
    featured: 'PROFA T-Blue · Eli-Gold',
    image: categoryImage('profa', 'T-blue 30.4.png', '/products/cat-endodontics.png'),
    imageAlt: 'PROFA T-Blue rotary endodontic files',
  },
  {
    name: 'Orthodontics & Implants',
    blurb: 'Bracket systems, archwires and orthodontic accessories.',
    count: '90+ SKUs',
    href: '/products?specialty=ORTHODONTICS',
    featured: 'Aditek EasyClip+ · Safira',
    image: categoryImage('aditek', 'EasyClip+.JPG', '/products/cat-ortho-implants.png'),
    imageAlt: 'Aditek EasyClip+ orthodontic bracket system',
  },
  {
    name: 'Prosthodontics',
    blurb: 'Temporary cements, core build-up and lab consumables.',
    count: '70+ SKUs',
    href: '/products?specialty=IMPRESSIONS',
    featured: 'Centrix SuperCure · NoMix',
    image: categoryImage('centrix', 'SuperCure Original.png', '/products/cat-prosthodontics.png'),
    imageAlt: 'Centrix SuperCure core buildup material',
  },
  {
    name: 'Preventive',
    blurb: 'Fluoride varnish, caries indicators and preventive solutions.',
    count: '50+ SKUs',
    href: '/products?specialty=PREVENTIVE',
    featured: 'Centrix FluoroDose · Expose',
    image: categoryImage('centrix', 'Fluorodose.png', '/products/cat-infection-control.png'),
    imageAlt: 'Centrix FluoroDose preventive varnish',
  },
  {
    name: 'Aesthetics & Bleaching',
    blurb: 'Composites, bleaching and veneer cements from Heydent.',
    count: '40+ SKUs',
    href: '/products?brand=heydent',
    featured: 'Heydent Cem Veneer · JW NEXT',
    image: categoryImage('heydent', 'Cem Veneer.jpg', '/products/cat-equipment.png'),
    imageAlt: 'Heydent aesthetic and bleaching products',
  },
];
