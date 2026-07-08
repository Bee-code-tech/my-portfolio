import type { Metadata } from "next";
import { ContactForm } from "@/components/contact/ContactForm";
import { ContactSidebar } from "@/components/contact/ContactSidebar";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHeader } from "@/components/ui/PageHeader";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Babawale Al-Ameen to discuss full-stack development, product design, Web3 builds, or your next SaaS, mobile, or web application.",
};

export default function ContactPage() {
  return (
    <PageLayout>
      <PageHeader
        label="Contact"
        title="Let's talk about your next project"
        description="Have a brand, website or product idea in mind? Share a few details and I'll get back to you soon."
      />
      <div className="pb-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex flex-col gap-6 lg:flex-row">
            <ContactForm />
            <ContactSidebar />
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
