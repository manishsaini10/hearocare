"use client";

import { useState } from "react";
import { FAQS, FAQItem } from "@/data/siteData";
import { ChevronDown, HelpCircle } from "lucide-react";

export default function FAQAccordion({ items = FAQS }: { items?: FAQItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="space-y-4 max-w-3xl mx-auto">
      {items.map((item, idx) => {
        const isOpen = openIndex === idx;
        return (
          <div
            key={idx}
            className={`border rounded-2xl transition-all duration-200 overflow-hidden ${
              isOpen
                ? "bg-white border-pink-500 shadow-md ring-1 ring-pink-500/20"
                : "bg-white/80 border-slate-200 hover:border-slate-300"
            }`}
          >
            <button
              onClick={() => toggle(idx)}
              className="w-full px-6 py-5 flex items-center justify-between text-left gap-4 font-bold text-slate-900 text-base sm:text-lg focus:outline-none"
            >
              <div className="flex items-center gap-3">
                <HelpCircle className={`w-5 h-5 shrink-0 ${isOpen ? "text-pink-600" : "text-slate-400"}`} />
                <span>{item.question}</span>
              </div>
              <ChevronDown
                className={`w-5 h-5 text-slate-500 transition-transform duration-200 shrink-0 ${
                  isOpen ? "rotate-180 text-pink-600" : ""
                }`}
              />
            </button>

            {isOpen && (
              <div className="px-6 pb-6 pt-1 text-slate-600 text-sm sm:text-base leading-relaxed border-t border-slate-100">
                {item.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
