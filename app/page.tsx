import { Hero } from "@/components/hero";
import { TrustedBy } from "@/components/trusted-by";
import { Problems } from "@/components/problems";
import { Solutions } from "@/components/solutions";
import { HowItWorks } from "@/components/how-it-works";
import { Results } from "@/components/results";
import { Testimonials } from "@/components/testimonials";
import { Pricing } from "@/components/pricing";
import { FAQ } from "@/components/faq";
import { Contact } from "@/components/contact";
import { FinalCTA } from "@/components/final-cta";

export default function Home() {
  return (
    <>
      <Hero />
      <TrustedBy />
      <Problems />
      <Solutions />
      <HowItWorks />
      <Results />
      <Testimonials />
      <Pricing />
      <FAQ />
      <Contact />
      <FinalCTA />
    </>
  );
}
