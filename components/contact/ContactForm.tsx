"use client";

import { FormEvent } from "react";
import { budgetRanges, projectTypes } from "@/lib/contact";

const inputClassName =
  "w-full rounded-[10px] border border-[#c9cdd2] bg-surface px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted focus:border-foreground/30";

const labelClassName = "text-sm font-medium text-foreground";

export function ContactForm() {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full flex-1 flex-col gap-6 rounded-3xl border border-border bg-transparent p-8 md:p-10"
    >
      <div className="flex flex-col gap-4 md:flex-row">
        <label className="flex flex-1 flex-col gap-2">
          <span className={labelClassName}>Name</span>
          <input
            type="text"
            name="name"
            placeholder="Jane Smith"
            className={inputClassName}
            required
          />
        </label>
        <label className="flex flex-1 flex-col gap-2">
          <span className={labelClassName}>Email</span>
          <input
            type="email"
            name="email"
            placeholder="jane@example.com"
            className={inputClassName}
            required
          />
        </label>
      </div>

      <label className="flex flex-col gap-2">
        <span className={labelClassName}>Project type</span>
        <select name="projectType" required defaultValue="" className={inputClassName}>
          <option value="" disabled>
            Select…
          </option>
          {projectTypes.map((type) => (
            <option key={type.value} value={type.value}>
              {type.label}
            </option>
          ))}
        </select>
      </label>

      <label className="flex flex-col gap-2">
        <span className={labelClassName}>Budget range</span>
        <select name="budget" required defaultValue="" className={inputClassName}>
          <option value="" disabled>
            Select…
          </option>
          {budgetRanges.map((range) => (
            <option key={range.value} value={range.value}>
              {range.label}
            </option>
          ))}
        </select>
      </label>

      <label className="flex flex-col gap-2">
        <span className={labelClassName}>Message</span>
        <textarea
          name="message"
          rows={5}
          placeholder="Tell me about your project..."
          className={`${inputClassName} resize-none`}
          required
        />
      </label>

      <button
        type="submit"
        className="w-full rounded-[10px] border border-[#121218] bg-linear-to-b from-[#24242a] to-[#121218] px-6 py-3.5 text-sm font-medium text-white shadow-[inset_0_2px_0_0_#44454c,0_2px_4px_-2px_#61646b,0_4px_8px_-4px_#61646b] transition-opacity hover:opacity-90"
      >
        Send message
      </button>
    </form>
  );
}
