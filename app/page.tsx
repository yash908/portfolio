import Hero from "@/components/Hero/Hero";
import CurrentRole from "@/components/Sections/CurrentRole";
import ThemeToggle from "@/components/UI/ThemeToggle";
import MouseGlow from "@/components/UI/MouseGlow";
import Starfield from "@/components/Effects/Starfield";
import SectionDots from "@/components/UI/SectionDots";

export default function Home() {
  return (
    <>
      <ThemeToggle />
      <MouseGlow />
      <Starfield />
      <SectionDots />

      <Hero />
      <CurrentRole />
    </>
  );
}
