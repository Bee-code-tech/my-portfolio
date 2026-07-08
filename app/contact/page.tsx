import type { Metadata } from "next";
import { ContactForm } from "@/components/contact/ContactForm";
import { ContactSidebar } from "@/components/contact/ContactSidebar";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHeader } from "@/components/ui/PageHeader";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Babawale Al-Ameen — full stack engineer open to remote full-time and contract roles. React, Next.js, TypeScript, and end-to-end product builds.",
};

export default function ContactPage() {
  return (
    <PageLayout>
      <PageHeader
        label="Contact"
        title="Let's build something together"
        description="Open to remote full-time and contract work. Share a few details and I'll get back within 24 hours."
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
