/** Global manufacturer partners — hub + detail (SRS CONTENT-008/009). */

import {
  ACADEMIC_PARTNERS,
  DENTAL_ACADEMIES,
} from '@/content/pathCards';
import type { FlagCode } from '@/content/flagArt';
import { MANUFACTURERS } from '@/content/home';
import { PARTNER_STOPS } from '@/content/partnerStops';

export const PARTNERS_INTRO = {
  eyebrow: 'Partners',
  title: 'Our network',
  lead: 'Eight global brands and Egypt’s academic partners.',
};

export const GLOBAL_PARTNERS_SECTION = {
  title: 'Global partners',
};

export const LOCAL_PARTNERS_SECTION = {
  title: 'Local partners',
};

export type PartnerBrand = {
  slug: string;
  name: string;
  country: string;
  region: string;
  excerpt: string;
  story: string[];
  specialties: string[];
  productCount: string;
  image: string;
  imageAlt: string;
  certifications: string[];
  founded?: string;
  flag?: FlagCode;
};

export type LocalPartner = {
  id: string;
  name: string;
  type: 'university' | 'academy';
  excerpt: string;
  city?: string;
};

const partnerData: Record<string, Omit<PartnerBrand, 'slug' | 'name' | 'country' | 'flag'>> = {
  aditek: {
    region: 'South America',
    excerpt: 'Orthodontic brackets, archwires and chairside systems from Brazil.',
    story: [
      'Aditek is a Brazilian orthodontic manufacturer known for precision bracket systems and efficient treatment mechanics.',
      'MD Dental is the exclusive distributor in Egypt, supplying field support, clinical education, and authentic inventory nationwide.',
    ],
    specialties: ['Orthodontics'],
    productCount: '90+ SKUs',
    image: '/partners/aditek.png',
    imageAlt: 'Aditek orthodontic bracket systems — exclusive distribution in Egypt',
    certifications: ['CE', 'ISO 13485'],
    founded: 'Brazil',
  },
  bms: {
    region: 'Europe',
    excerpt: 'Restorative composites, bonding agents and finishing systems from Italy.',
    story: [
      'BMS delivers shade-stable composites and adhesive systems trusted in daily anterior and posterior restorative workflows.',
      'Through MD Dental, Egyptian clinics receive factory-direct materials with published specifications and IFU documentation.',
    ],
    specialties: ['Restorative'],
    productCount: '120+ SKUs',
    image: '/partners/bms.png',
    imageAlt: 'BMS restorative composites and dental materials',
    certifications: ['CE', 'ISO 13485'],
    founded: 'Italy',
  },
  heydent: {
    region: 'Europe',
    excerpt: 'Zirconia discs, polish systems and digital restorative solutions from Germany.',
    story: [
      'Heydent specializes in high-strength zirconia and finishing systems for monolithic and layered restorations.',
      'MD Dental supports labs and clinics with technical guidance on milling, sintering, and aesthetic finishing protocols.',
    ],
    specialties: ['Restorative', 'Prosthodontics'],
    productCount: '70+ SKUs',
    image: '/partners/heydent.png',
    imageAlt: 'Heydent zirconia discs and polish systems',
    certifications: ['CE', 'ISO 13485'],
    founded: 'Germany',
  },
  sin: {
    region: 'South America',
    excerpt: 'Endodontic rotary files, sealers and obturation from Brazil.',
    story: [
      'SIN manufactures nickel-titanium rotary systems and bioceramic sealers for predictable endodontic treatment.',
      'MD Dental distributes SIN products with clinical training on canal shaping and single-use instrument protocols.',
    ],
    specialties: ['Endodontics'],
    productCount: '60+ SKUs',
    image: '/partners/sin.png',
    imageAlt: 'SIN endodontic rotary files and sealers',
    certifications: ['CE', 'ISO 13485'],
    founded: 'Brazil',
  },
  centrix: {
    region: 'North America',
    excerpt: 'Impression materials, temporization and VPS solutions from the USA.',
    story: [
      'Centrix is a leading US manufacturer of impression and temporary crown materials for prosthodontic workflows.',
      'MD Dental ensures authentic Centrix supply with nationwide delivery to clinics and dental laboratories.',
    ],
    specialties: ['Impressions & Lab', 'Restorative'],
    productCount: '55+ SKUs',
    image: '/partners/centrix.png',
    imageAlt: 'Centrix impression materials and dental consumables',
    certifications: ['CE', 'FDA'],
    founded: 'USA',
  },
  profa: {
    region: 'Asia',
    excerpt: 'Sterilization pouches and clinical consumables from China.',
    story: [
      'PROFA supplies medical-grade sterilization packaging and infection control consumables for daily clinic reprocessing.',
      'MD Dental pairs PROFA products with education on audit-ready sterilization documentation.',
    ],
    specialties: ['Infection Control'],
    productCount: '50+ SKUs',
    image: '/partners/profa.png',
    imageAlt: 'PROFA sterilization pouches and infection control products',
    certifications: ['CE', 'ISO 13485'],
    founded: 'China',
  },
  topglove: {
    region: 'Asia',
    excerpt: 'Powder-free nitrile examination gloves from Malaysia.',
    story: [
      'TopGlove is one of the world\'s largest glove manufacturers, producing powder-free nitrile gloves for clinical barrier protection.',
      'MD Dental distributes TopGlove across Egypt with reliable stock for high-volume practices.',
    ],
    specialties: ['Infection Control'],
    productCount: '40+ SKUs',
    image: '/partners/topglove.png',
    imageAlt: 'TopGlove nitrile examination gloves',
    certifications: ['CE', 'ISO 13485'],
    founded: 'Malaysia',
  },
  wbt: {
    region: 'Asia',
    excerpt: 'Orthodontic bracket kits, wires and ligatures from South Korea.',
    story: [
      'WBT provides complete orthodontic kits engineered for chairside efficiency and consistent torque delivery.',
      'MD Dental supports WBT users with bracket inventory planning and wire sequencing guidance.',
    ],
    specialties: ['Orthodontics'],
    productCount: '45+ SKUs',
    image: '/partners/wbt.png',
    imageAlt: 'WBT orthodontic bracket and wire systems',
    certifications: ['CE'],
    founded: 'South Korea',
  },
};

export function getFlagForPartner(slug: string): FlagCode | undefined {
  for (const stop of PARTNER_STOPS) {
    if (stop.brands.some((brand) => brand.slug === slug)) {
      return stop.flag;
    }
  }
  return undefined;
}

export const PARTNER_BRANDS: readonly PartnerBrand[] = MANUFACTURERS.map((m) => ({
  slug: m.slug,
  name: m.name,
  country: m.country,
  flag: getFlagForPartner(m.slug),
  ...partnerData[m.slug],
}));

const UNIVERSITY_CITIES: Record<string, string> = {
  'Cairo University': 'Cairo',
  'Ain Shams University': 'Cairo',
  'Al-Azhar University': 'Cairo',
  'Alexandria University': 'Alexandria',
  'Tanta University': 'Tanta',
  'Assiut University': 'Assiut',
  'Mansoura University': 'Mansoura',
  MUST: 'Cairo',
  'MSA University': 'Cairo',
  'Future University': 'Cairo',
  'British University': 'Cairo',
  'Al Salam University': 'Cairo',
  'BADR University': 'Cairo',
  'Delta University': 'Mansoura',
  'New Giza University': 'Giza',
};

export const LOCAL_PARTNERS: readonly LocalPartner[] = [
  ...ACADEMIC_PARTNERS.map((name) => ({
    id: `uni-${name.toLowerCase().replace(/\s+/g, '-')}`,
    name,
    type: 'university' as const,
    city: UNIVERSITY_CITIES[name],
    excerpt: 'Teaching hospital and dental faculty partner for authentic clinical supplies.',
  })),
  ...DENTAL_ACADEMIES.map((name) => ({
    id: `acad-${name.toLowerCase().replace(/\s+/g, '-')}`,
    name,
    type: 'academy' as const,
    excerpt: 'Official training partner for continuing education and professional development.',
  })),
];

export function getPartnerBySlug(slug: string): PartnerBrand | undefined {
  return PARTNER_BRANDS.find((p) => p.slug === slug);
}

export function partnerMonogram(name: string): string {
  const words = name.replace(/University|Academy|Institute|Association|Center/gi, '').trim().split(/\s+/);
  if (words.length >= 2) {
    return `${words[0][0] ?? ''}${words[1][0] ?? ''}`.toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
}
