"use client";

import React from "react";
import { Bold, Italic, Heading2, Heading3, List, Quote, Link as LinkIcon, Code } from "lucide-react";

interface TextFormatToolbarProps {
  value: string;
  onChange: (newValue: string) => void;
  id?: string;
}

export default function TextFormatToolbar({
  value,
  onChange,
  id,
}: TextFormatToolbarProps) {
  const insertText = (prefix: string, suffix: string = "") => {
    const textarea = document.getElementById(id || "") as HTMLTextAreaElement;
    if (!textarea) {
      onChange(`${value}\n${prefix}Text${suffix}`);
      return;
    }

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = value.substring(start, end) || "Text";
    const replacement = `${prefix}${selected}${suffix}`;
    const newValue = value.substring(0, start) + replacement + value.substring(end);
    onChange(newValue);

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(
        start + prefix.length,
        start + prefix.length + selected.length
      );
    }, 50);
  };

  return (
    <div className="flex items-center gap-1 bg-slate-950 p-2 rounded-t-xl border border-b-0 border-slate-800 text-slate-300 text-xs font-semibold overflow-x-auto">
      <span className="text-[10px] text-slate-500 font-extrabold uppercase px-2">Format:</span>
      
      <button
        type="button"
        onClick={() => insertText("**", "**")}
        className="p-1.5 rounded hover:bg-slate-800 hover:text-white transition-colors"
        title="Bold"
      >
        <Bold className="w-4 h-4" />
      </button>

      <button
        type="button"
        onClick={() => insertText("*", "*")}
        className="p-1.5 rounded hover:bg-slate-800 hover:text-white transition-colors"
        title="Italic"
      >
        <Italic className="w-4 h-4" />
      </button>

      <button
        type="button"
        onClick={() => insertText("\n## ", "\n")}
        className="p-1.5 rounded hover:bg-slate-800 hover:text-white transition-colors"
        title="Heading 2"
      >
        <Heading2 className="w-4 h-4" />
      </button>

      <button
        type="button"
        onClick={() => insertText("\n### ", "\n")}
        className="p-1.5 rounded hover:bg-slate-800 hover:text-white transition-colors"
        title="Heading 3"
      >
        <Heading3 className="w-4 h-4" />
      </button>

      <button
        type="button"
        onClick={() => insertText("\n- ", "\n")}
        className="p-1.5 rounded hover:bg-slate-800 hover:text-white transition-colors"
        title="Bullet List"
      >
        <List className="w-4 h-4" />
      </button>

      <button
        type="button"
        onClick={() => insertText("\n> ", "\n")}
        className="p-1.5 rounded hover:bg-slate-800 hover:text-white transition-colors"
        title="Quote"
      >
        <Quote className="w-4 h-4" />
      </button>

      <button
        type="button"
        onClick={() => insertText("[", "](https://example.com)")}
        className="p-1.5 rounded hover:bg-slate-800 hover:text-white transition-colors"
        title="Insert Link"
      >
        <LinkIcon className="w-4 h-4" />
      </button>

      <button
        type="button"
        onClick={() => insertText("`", "`")}
        className="p-1.5 rounded hover:bg-slate-800 hover:text-white transition-colors"
        title="Code Snippet"
      >
        <Code className="w-4 h-4" />
      </button>
    </div>
  );
}
