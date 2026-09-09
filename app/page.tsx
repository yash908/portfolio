import Hero from "@/components/Hero/Hero";
import CurrentRole from "@/components/Sections/CurrentRole";
import About from "@/components/Sections/About";
import Skills from "@/components/Sections/Skills";
import Projects from "@/components/Sections/Projects";
import Contact from "@/components/Sections/Contact";
import Subscribe from "@/components/Sections/Subscribe";

import SmoothScroll from "@/components/motion/SmoothScroll";
import GalaxyCurtain from "@/components/Effects/GalaxyCurtain";
import MouseGlow from "@/components/UI/MouseGlow";
import SectionDots from "@/components/UI/SectionDots";
import ScrollProgress from "@/components/UI/ScrollProgress";

export default function Home() {
  return (
    <SmoothScroll>
      <ScrollProgress />
      <MouseGlow />
      <SectionDots />

      <main className="relative z-10">
        <GalaxyCurtain>
          <Hero />
        </GalaxyCurtain>

        <CurrentRole />
        <About />
        <Skills />
        <Projects />
        <Contact />
        <Subscribe />
      </main>
    </SmoothScroll>
  );
}
