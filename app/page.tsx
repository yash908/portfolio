import Hero from "@/components/Hero/Hero";
import CurrentRole from "@/components/Sections/CurrentRole";
import About from "@/components/Sections/About";
import Skills from "@/components/Sections/Skills";
import Projects from "@/components/Sections/Projects";
import Contact from "@/components/Sections/Contact";
import Subscribe from "@/components/Sections/Subscribe";

import ThemeToggle from "@/components/UI/ThemeToggle";
import MouseGlow from "@/components/UI/MouseGlow";
import SectionDots from "@/components/UI/SectionDots";

export default function Home() {
  return (
    <>
      <ThemeToggle />
      <MouseGlow />
      <SectionDots />

      <Hero />
      <CurrentRole />
      <About />
      <Skills />
      <Projects />
      <Contact />
      <Subscribe />
    </>
  );
}
