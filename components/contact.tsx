import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { CalendlyEmbed } from "@/components/calendly-embed";
import { ContactForm } from "@/components/contact-form";

export function Contact() {
  return (
    <section id="contact" className="scroll-mt-20 py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Get Started"
          title="Book Your Free Consultation"
          description="Pick a time that works for you, or send us a message and we'll get back to you within one business day."
        />

        <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <CalendlyEmbed />
          <ContactForm />
        </div>
      </Container>
    </section>
  );
}
