import { Hero } from "../components/Hero";
import { TrustLogos } from "../components/TrustLogos";
import { Statistics } from "../components/Statistics";
import { Services } from "../components/Services";
import { HowWePartner } from "../components/HowWePartner";
import { WorkProcess } from "../components/WorkProcess";
import { Industries } from "../components/Industries";
import { Technologies } from "../components/Technologies";
import { Architecture } from "../components/Architecture";
import { Portfolio } from "../components/Portfolio";
import { Testimonials } from "../components/Testimonials";
import { Blog } from "../components/Blog";
import { Founder } from "../components/Founder";
import { About } from "../components/About";
import { Contact } from "../components/Contact";

export function Home() {
  return (
    <main>
      <Hero />
      <TrustLogos />
      <Statistics />
      <Services />
      <HowWePartner />
      <WorkProcess />
      <Industries />
      <Technologies />
      <Architecture />
      <Portfolio />
      <Testimonials />
      <Blog />
      <Founder />
      <About />
      <Contact />
    </main>
  );
}
