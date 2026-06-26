/**
 * "Our Story" timeline — milestones from founding to today.
 */
import { STORY_IMAGES } from '@/content/mdMedia';

export type StoryMilestone = {
  year: string;
  title: string;
  body: string;
  image: string;
  imageAlt: string;
  stat?: { value: string; label: string };
};

export const STORY_INTRO = {
  eyebrow: 'Our Story',
  heading: 'From Al Maard Al Daem to Egypt’s trusted dental partner',
};

export const STORY_MILESTONES: readonly StoryMilestone[] = [
  {
    year: '2019',
    title: 'The foundation',
    body: 'MD Dental is founded in Cairo as Al Maard Al Daem, supplying authentic dental materials to local clinics with a promise of integrity over grey-market shortcuts.',
    image: STORY_IMAGES['2019'] ?? '/vision/story-2019.png',
    imageAlt: 'MD Dental supply house founded in Cairo, 2019',
    stat: { value: '1', label: 'Cairo supply house' },
  },
  {
    year: '2020',
    title: 'First exclusive partnerships',
    body: 'We secure our first exclusive distribution agreements with global manufacturers, bringing factory-direct, CE-certified products to Egyptian dentists.',
    image: STORY_IMAGES['2020'] ?? '/vision/story-2020.png',
    imageAlt: 'First exclusive global dental brand partnerships, 2020',
    stat: { value: '3', label: 'Exclusive brands' },
  },
  {
    year: '2021',
    title: 'Going nationwide',
    body: 'Field representatives and Bosta-powered logistics extend delivery beyond Cairo into the Delta and Upper Egypt, reaching clinics in new governorates.',
    image: STORY_IMAGES['2021'] ?? '/vision/story-2021.png',
    imageAlt: 'Nationwide dental supply delivery across Egypt, 2021',
    stat: { value: '12', label: 'Governorates reached' },
  },
  {
    year: '2022',
    title: 'Scientific support',
    body: 'An Egypt-based clinical team launches educational content, clinical guides and product training — the first step toward a true knowledge platform.',
    image: STORY_IMAGES['2022'] ?? '/vision/story-2022.png',
    imageAlt: 'Clinical education and scientific support for dentists, 2022',
    stat: { value: '50+', label: 'Clinical guides' },
  },
  {
    year: '2023',
    title: 'The partner network grows',
    body: 'Our exclusive portfolio expands to eight world-class manufacturers across Brazil, Germany, the USA, Malaysia, China, South Korea and Italy, covering seven dental specialties.',
    image: STORY_IMAGES['2023'] ?? '/vision/story-2023.png',
    imageAlt: 'Global partner network across eight manufacturers, 2023',
    stat: { value: '8', label: 'Global partners' },
  },
  {
    year: '2024',
    title: 'A trusted platform',
    body: 'MD Dental serves 2,500+ clinics across 15 strategic markets, combining authentic supply, nationwide reach and a growing dental knowledge community.',
    image: STORY_IMAGES['2024'] ?? '/vision/story-2024.png',
    imageAlt: 'Trusted dental knowledge platform serving thousands of clinics, 2024',
    stat: { value: '2,500+', label: 'Clinics served' },
  },
];
