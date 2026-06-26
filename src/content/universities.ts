/**
 * Academic partners + brand supply — from MD Data / _الجامعات.xlsx
 */

export type UniversityBrand = {
  /** Partner slug when listed in global catalog; null = display name only */
  slug: string | null;
  label: string;
};

export type UniversityPartner = {
  id: string;
  name: string;
  nameAr?: string;
  city?: string;
  brands: readonly UniversityBrand[];
  /** Google Drive folder for campus events / photos */
  eventUrl?: string;
};

export type AcademicPartner = UniversityPartner;

const BRAND_LOOKUP: Record<string, UniversityBrand> = {
  bms: { slug: 'bms', label: 'BMS' },
  heydent: { slug: 'heydent', label: 'Heydent' },
  profa: { slug: 'profa', label: 'PROFA' },
  aditek: { slug: 'aditek', label: 'Aditek' },
  'md dam': { slug: null, label: 'MD DAM' },
  tristar: { slug: null, label: 'Tristar' },
  centrix: { slug: 'centrix', label: 'Centrix' },
};

function parseBrands(raw: string): UniversityBrand[] {
  return raw
    .split(/[/,]/)
    .map((part) => part.trim())
    .filter(Boolean)
    .map((part) => {
      const key = part.toLowerCase();
      return BRAND_LOOKUP[key] ?? { slug: null, label: part };
    });
}

/** Source-of-truth list — sheet rows + legacy faculties without brand data. */
export const UNIVERSITY_PARTNERS: readonly UniversityPartner[] = [
  {
    id: 'ain-shams',
    name: 'Ain Shams University',
    city: 'Cairo',
    brands: parseBrands('BMS / Heydent / Profa'),
    eventUrl:
      'https://drive.google.com/drive/folders/1xnRXMSSNw1ebYtelt5gRCb7aMvo7SSWV?usp=drive_link',
  },
  {
    id: 'al-azhar',
    name: 'Al-Azhar University',
    city: 'Cairo',
    brands: parseBrands('Aditek'),
  },
  {
    id: 'miu',
    name: 'MIU',
    nameAr: 'جامعة مصر الدولية',
    city: 'Cairo',
    brands: parseBrands('BMS / MD DAM / Aditek'),
  },
  {
    id: 'delta',
    name: 'Delta University',
    city: 'Mansoura',
    brands: parseBrands('Aditek'),
  },
  {
    id: 'must',
    name: 'MUST',
    city: 'Cairo',
    brands: parseBrands('Aditek / Heydent'),
  },
  {
    id: 'nahda',
    name: 'Nahda University',
    city: 'Cairo',
    brands: parseBrands('Aditek'),
  },
  {
    id: 'future',
    name: 'Future University',
    city: 'Cairo',
    brands: parseBrands('BMS / Profa / Aditek'),
  },
  {
    id: 'bue',
    name: 'BUE',
    nameAr: 'الجامعة البريطانية',
    city: 'Cairo',
    brands: parseBrands('Aditek / Tristar / Heydent'),
    eventUrl:
      'https://drive.google.com/drive/folders/19iyMu6EAUit-cPtnBi1MP4IU-idKIDdC?usp=drive_link',
  },
  {
    id: 'minufiya-dental',
    name: 'Dental School — Shibin El Kom',
    nameAr: 'كلية طب الأسنان — شبين الكوم',
    city: 'Menofia',
    brands: parseBrands('Heydent'),
    eventUrl:
      'https://drive.google.com/drive/folders/1PByeEdY9BV0ZCVxoIoA9JcCgA2_1jtba?usp=drive_link',
  },
  {
    id: 'alamein',
    name: 'Alamein International University',
    nameAr: 'جامعة العلمين الدولية',
    city: 'Alamein',
    brands: parseBrands('Profa'),
    eventUrl:
      'https://drive.google.com/drive/folders/1ce9uEoodMke61Rd5RQYWJrnMP0TrnMvJ?usp=drive_link',
  },
  {
    id: 'msa',
    name: 'MSA University',
    city: 'Cairo',
    brands: parseBrands('Heydent'),
  },
  // Legacy partners — authentic supply, brand list pending
  { id: 'cairo-university', name: 'Cairo University', city: 'Cairo', brands: [] },
  { id: 'alexandria-university', name: 'Alexandria University', city: 'Alexandria', brands: [] },
  { id: 'tanta-university', name: 'Tanta University', city: 'Tanta', brands: [] },
  { id: 'assiut-university', name: 'Assiut University', city: 'Assiut', brands: [] },
  { id: 'mansoura-university', name: 'Mansoura University', city: 'Mansoura', brands: [] },
  { id: 'al-salam', name: 'Al Salam University', city: 'Cairo', brands: [] },
  { id: 'badr', name: 'BADR University', city: 'Cairo', brands: [] },
  { id: 'new-giza', name: 'New Giza University', city: 'Giza', brands: [] },
];

/** Training academies — curated MD brand supply (representative catalog). */
export const ACADEMY_PARTNERS: readonly AcademicPartner[] = [
  {
    id: 'egyptian-dental-association',
    name: 'Egyptian Dental Association',
    brands: parseBrands('BMS / Aditek / Centrix / PROFA'),
  },
  {
    id: 'cairo-dental-academy',
    name: 'Cairo Dental Academy',
    brands: parseBrands('Aditek / Heydent / BMS'),
  },
  {
    id: 'alexandria-dental-institute',
    name: 'Alexandria Dental Institute',
    brands: parseBrands('BMS / Heydent / Centrix'),
  },
  {
    id: 'modern-dentistry-academy',
    name: 'Modern Dentistry Academy',
    brands: parseBrands('Aditek / SIN / Centrix'),
  },
  {
    id: 'advanced-dental-training-center',
    name: 'Advanced Dental Training Center',
    brands: parseBrands('PROFA / TopGlove / Centrix'),
  },
  {
    id: 'egyptian-implant-academy',
    name: 'Egyptian Implant Academy',
    brands: parseBrands('Heydent / BMS / Centrix'),
  },
];

export function universityById(id: string): UniversityPartner | undefined {
  return UNIVERSITY_PARTNERS.find((u) => u.id === id);
}

/** Universities with brand data from the sheet (shown first in the grid). */
export const UNIVERSITIES_WITH_BRANDS = UNIVERSITY_PARTNERS.filter((u) => u.brands.length > 0);

export const ACADEMIC_PARTNERS_HEADING = 'Academic Partners';
export const ACADEMIC_PARTNERS_LEAD =
  'Egypt’s leading dental faculties choose MD Dental — click any partner to see supplied brands and shop authentic stock.';

export const ACADEMY_PARTNERS_LEAD =
  'Professional bodies we equip for hands-on training — click to explore the brands they rely on from MD.';

export const DENTAL_ACADEMIES_HEADING = 'Continuous Dental Academies';
