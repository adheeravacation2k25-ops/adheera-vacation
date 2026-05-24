import { HeroSection } from '../components/sections/HeroSection';
import { PopularDestinations } from '../components/sections/PopularDestinations';
import { FeaturedPackages } from '../components/sections/FeaturedPackages';
import { WhyChooseUs } from '../components/sections/WhyChooseUs';
import { Testimonials } from '../components/sections/Testimonials';
import { StatsSection } from '../components/sections/StatsSection';
import { FAQSection } from '../components/sections/FAQSection';

export function HomePage() {
  return (
    <main>
      <HeroSection />
      <PopularDestinations />
      <FeaturedPackages />
      <WhyChooseUs />
      <StatsSection />
      <Testimonials />
      <FAQSection />
    </main>
  );
}
