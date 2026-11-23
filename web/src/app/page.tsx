import { Nav } from "@/components/Nav";
import { Footer, Hero, Limits, Problem, Skill, Tools } from "@/components/Sections";
import { Reveal } from "@/components/motion/Reveal";

export default function Page() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Reveal>
          <Problem />
        </Reveal>
        <Tools />
        <Reveal>
          <Skill />
        </Reveal>
        <Reveal>
          <Limits />
        </Reveal>
      </main>
      <Footer />
    </>
  );
}
