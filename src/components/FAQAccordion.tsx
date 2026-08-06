"use client";

import { useCMS } from "@/lib/cmsContext";
import { FAQItem } from "@/data/siteData";
import { HelpCircle } from "lucide-react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

export default function FAQAccordion({ items }: { items?: FAQItem[] }) {
  const { data } = useCMS();
  const faqList = items || data.faqs;
  return (
    <Accordion type="single" collapsible defaultValue="0" className="w-full max-w-3xl mx-auto space-y-3">
      {faqList.map((item, idx) => (
        <AccordionItem
          key={idx}
          value={String(idx)}
          className="border border-slate-200 rounded-2xl bg-white/80 data-[state=open]:border-pink-500 data-[state=open]:shadow-md px-6"
        >
          <AccordionTrigger className="flex items-center gap-3 [&>svg]:hidden">
            <span className="flex items-center gap-3">
              <HelpCircle className="w-5 h-5 text-pink-500 shrink-0" />
              <span>{item.question}</span>
            </span>
          </AccordionTrigger>
          <AccordionContent className="text-slate-600 text-base leading-relaxed">
            {item.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
