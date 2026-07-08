import type { Metadata } from "next";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHeader } from "@/components/ui/PageHeader";
import { blogPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Writing by Babawale Al-Ameen on full-stack development, UI craft, product thinking, and lessons from building production-ready web and mobile applications.",
};

export default function BlogPage() {
  return (
    <PageLayout>
      <PageHeader
        label="Blog"
        title="Thoughts on design and building"
        description="Notes on process, craft, and lessons from shipping real work."
      />
      <div className="py-16">
        <div className="mx-auto max-w-6xl px-6">
          <div className="space-y-6">
            {blogPosts.map((post) => (
              <article
                key={post.slug}
                className="rounded-2xl border border-border bg-card p-6 transition-shadow hover:shadow-md"
              >
                <div className="flex flex-wrap items-center gap-3 text-sm text-muted">
                  <time dateTime={post.date}>
                    {new Date(post.date).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </time>
                  <span>·</span>
                  <span>{post.readTime}</span>
                </div>
                <h2 className="mt-3 text-xl font-semibold text-foreground">
                  {post.title}
                </h2>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-foreground-muted">
                  {post.excerpt}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
