"use client";

import { About } from "@/components/services/About";
import { Projects } from "@/components/services/Projects";
import { TechnologyGraph } from "@/components/services/TechnologyGraph";
import { Lab } from "@/components/services/Lab";
import { LearningPath } from "@/components/services/LearningPath";
import { Certifications } from "@/components/services/Certifications";
import { GitHub } from "@/components/services/GitHub";
import { Terminal } from "@/components/services/Terminal";
import { Contact } from "@/components/services/Contact";
import { Footer } from "@/components/services/Footer";
import { Gateway } from "@/components/services/Gateway";

export default function Page() {
  return (
    <>
      <Gateway />
      <main className="relative z-10">
        <About />
        <Projects />
        <TechnologyGraph />
        <Lab />
        <LearningPath />
        <Certifications />
        <GitHub />
        <Terminal />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
