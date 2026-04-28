import { Hero } from "@/components/sections/Hero";
import { MarqueeBand } from "@/components/sections/MarqueeBand";
import { Manifesto } from "@/components/sections/Manifesto";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { HorizontalWork } from "@/components/sections/HorizontalWork";
import { Stats } from "@/components/sections/Stats";
import { PinnedStory } from "@/components/sections/PinnedStory";
import { LogoWall } from "@/components/sections/LogoWall";
import { ImageStack } from "@/components/sections/ImageStack";
import { AboutBlock } from "@/components/sections/AboutBlock";
import { ContactSection } from "@/components/sections/ContactSection";
import { WorkList } from "@/components/sections/WorkList";

export default function HomePage() {
  return (
    <>
      <Hero />
      <LogoWall />
      <MarqueeBand />
      <AboutBlock />
      <ImageStack />
      <Manifesto />
      <ServicesGrid />
      <PinnedStory />
      <HorizontalWork />
      <WorkList />
      <Stats />
      <ContactSection />
    </>
  );
}
