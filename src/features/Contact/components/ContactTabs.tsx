"use client";

import { useState } from "react";
import { Mail, Lightbulb, TriangleAlert, Store, Lock } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MainContactForm from "../forms/MainContactForm";
import { ContactType } from "@prisma/client/index-browser";

const contactForms = [
  {
    value: ContactType.GENERAL,
    label: "General enquiry",
    icon: Mail,
    eyebrow: "GENERAL ENQUIRY",
    title: "Send us a message",
    description:
      "If you have a question, need more information or just want to get in touch, fill in the form and we'll get back to you as soon as we can.",
  },
  {
    value: ContactType.SUGGESTION,
    label: "Suggest an idea",
    icon: Lightbulb,
    eyebrow: "YOUR IDEAS",
    title: "Share your ideas",
    description:
      "Have an idea for improving Tamworth Hub? We'd love to hear your suggestions.",
  },
  {
    value: ContactType.BUG,
    label: "Report a problem",
    icon: TriangleAlert,
    eyebrow: "REPORT A PROBLEM",
    title: "Help us fix something",
    description:
      "Spotted something that isn't working correctly? Let us know so we can investigate.",
  },
  {
    value: ContactType.LISTING,
    label: "Listing support",
    icon: Store,
    eyebrow: "LISTING SUPPORT",
    title: "Need help with a listing?",
    description:
      "Get help with an existing business, event or job listing on Tamworth Hub.",
  },
  {
    value: ContactType.ACCOUNT,
    label: "Account enquiry",
    icon: Lock,
    eyebrow: "ACCOUNT ENQUIRY",
    title: "Account Problem",
    description:
      "If you have a question, need more information or have an issue with your account.",
  },
] as const;

function ContactForm({ type }: { type: ContactType }) {
  return <MainContactForm mode={type} />;
}

export default function ContactTabs() {
  const [activeTab, setActiveTab] = useState<ContactType>("GENERAL");

  return (
    <Tabs
      value={activeTab}
      onValueChange={(value) => setActiveTab(value as ContactType)}
      className="w-full gap-0"
    >
      {/* Tabs navigation */}

      <TabsList
        className="
    grid! h-auto! w-full! grid-cols-2!
    gap-0! rounded-none! p-0!
    border border-border bg-muted/40
    lg:grid-cols-5!
  "
      >
        {contactForms.map((item) => {
          const Icon = item.icon;

          return (
            <TabsTrigger
              key={item.value}
              value={item.value}
              className="
          relative h-full! min-h-16! w-full!
          rounded-none! border-0! shadow-none!
          flex items-center justify-center gap-2
          px-3 py-4
          font-semibold text-foreground
          bg-transparent transition-colors

          hover:bg-muted

          data-[state=active]:bg-red-50
          data-[state=active]:text-foreground
          data-[state=active]:shadow-none

          after:absolute after:inset-x-0
          after:bottom-0 after:h-0.75
          after:bg-transparent

          data-[state=active]:after:bg-primary

          dark:data-[state=active]:bg-primary/10
        "
            >
              <Icon className="size-5 shrink-0" />
              <span className="text-xs sm:text-sm">{item.label}</span>
            </TabsTrigger>
          );
        })}
      </TabsList>

      {/* Form panels */}
      {contactForms.map((item) => (
        <TabsContent
          key={item.value}
          value={item.value}
          className="
            mt-0 border-x border-b
            border-border bg-card p-5
            sm:p-7 lg:p-8
          "
        >
          <div className="grid gap-8 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.35fr)]">
            {/* Left introduction */}
            <div>
              <p className="text-category mb-2">{item.eyebrow}</p>

              <h2 className="font-heading text-3xl font-black leading-tight sm:text-4xl">
                {item.title}
              </h2>

              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                {item.description}
              </p>

              <div className="mt-8 flex gap-4 bg-muted p-5">
                <Mail className="mt-1 size-6 shrink-0 text-primary" />

                <div>
                  <h3 className="font-sans text-sm font-bold">Response time</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    We aim to reply within 1–2 working days.
                  </p>
                </div>
              </div>
            </div>

            {/* Right form */}
            <ContactForm type={item.value} />
          </div>
        </TabsContent>
      ))}
    </Tabs>
  );
}
