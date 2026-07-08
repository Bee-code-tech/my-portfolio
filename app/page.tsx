import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { Expertise } from "@/components/sections/Expertise";
import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";
import { TechStack } from "@/components/sections/TechStack";
import { Testimonials } from "@/components/sections/Testimonials";
import { ThoughtProcess } from "@/components/sections/ThoughtProcess";
import { WhyMe } from "@/components/sections/WhyMe";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Projects />
        <Expertise />
        <TechStack />
        <WhyMe />
        <ThoughtProcess />
        <Testimonials />
      </main>
      <Footer />
    </>
  );
}
