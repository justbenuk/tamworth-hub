"use client";

import { useState } from "react";
import {
  Mail,
  Lightbulb,
  TriangleAlert,
  Store,
  ArrowRight,
} from "lucide-react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const contactTypes = [
  {
    value: "general",
    label: "General enquiry",
    icon: Mail,
    eyebrow: "GENERAL ENQUIRY",
    title: "Send us a message",
    description:
      "If you have a question, need more information or just want to get in touch, fill in the form and we'll get back to you as soon as we can.",
  },
  {
    value: "suggestion",
    label: "Suggest an idea",
    icon: Lightbulb,
    eyebrow: "YOUR IDEAS",
    title: "Share your ideas",
    description:
      "Have an idea for improving Tamworth Hub? We'd love to hear your suggestions.",
  },
  {
    value: "bug",
    label: "Report a problem",
    icon: TriangleAlert,
    eyebrow: "REPORT A PROBLEM",
    title: "Help us fix something",
    description:
      "Spotted something that isn't working correctly? Let us know so we can investigate.",
  },
  {
    value: "listing",
    label: "Listing support",
    icon: Store,
    eyebrow: "LISTING SUPPORT",
    title: "Need help with a listing?",
    description:
      "Get help with an existing business, event or job listing on Tamworth Hub.",
  },
] as const;

type ContactType = (typeof contactTypes)[number]["value"];

function ContactForm({ type }: { type: ContactType }) {
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        // Connect to your server action here.
      }}
      className="space-y-5"
    >
      <input type="hidden" name="type" value={type} />

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor={`${type}-name`}>
            Your name <span className="text-primary">*</span>
          </Label>
          <Input
            id={`${type}-name`}
            name="name"
            placeholder="Enter your name"
            required
            className="h-11 rounded-sm"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor={`${type}-email`}>
            Email address <span className="text-primary">*</span>
          </Label>
          <Input
            id={`${type}-email`}
            name="email"
            type="email"
            placeholder="Enter your email address"
            required
            className="h-11 rounded-sm"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor={`${type}-subject`}>
          Subject <span className="text-primary">*</span>
        </Label>
        <Input
          id={`${type}-subject`}
          name="subject"
          placeholder="What is your message about?"
          required
          className="h-11 rounded-sm"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor={`${type}-message`}>
          Message <span className="text-primary">*</span>
        </Label>
        <Textarea
          id={`${type}-message`}
          name="message"
          placeholder="Type your message here..."
          rows={6}
          required
          className="min-h-36 resize-y rounded-sm"
        />
      </div>

      <Button
        type="submit"
        size="lg"
        className="h-12 rounded-sm px-7 font-semibold"
      >
        Send message
        <ArrowRight className="ml-2 size-4" />
      </Button>
    </form>
  );
}

export default function ContactTabs() {
  const [activeTab, setActiveTab] = useState<ContactType>("general");

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
    lg:grid-cols-4!
  "
      >
        {contactTypes.map((item) => {
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
      {contactTypes.map((item) => (
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
