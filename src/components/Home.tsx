import Link from 'next/link';
import { journeyMeta } from '@/content/journey';
import Spine from '@/components/Spine';
import JourneyProgress from '@/components/journey/JourneyProgress';
import HeroAuthority from '@/components/journey/HeroAuthority';
import OurStoryTimeline from '@/components/journey/OurStoryTimeline';
import ProductsShowcase from '@/components/journey/ProductsShowcase';
import PartnersShowcase from '@/components/journey/PartnersShowcase';
import ReachShowcase from '@/components/journey/ReachShowcase';
import PromiseShowcase from '@/components/journey/PromiseShowcase';
import FaqSection from '@/components/journey/FaqSection';
import GetInTouch from '@/components/journey/GetInTouch';

export default function Home() {
  return (
    <>
      <JourneyProgress />
      <Spine />

      <HeroAuthority />

      <OurStoryTimeline />

      <PartnersShowcase meta={journeyMeta('partners')} />

      <ReachShowcase meta={journeyMeta('reach')} />

      <ProductsShowcase />

      <PromiseShowcase meta={journeyMeta('promise')} />

      <FaqSection />

      <GetInTouch />
    </>
  );
}
