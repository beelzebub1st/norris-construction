import Link from "next/link";
import type { ReactNode } from "react";

type BlogBodyProps = {
  content: string;
};

function renderInline(text: string, keyPrefix: string) {
  const parts: ReactNode[] = [];
  const pattern = /(\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*)/g;
  let last = 0;
  let match: RegExpExecArray | null;
  let i = 0;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > last) {
      parts.push(text.slice(last, match.index));
    }
    if (match[2] && match[3]) {
      const href = match[3];
      const label = match[2];
      if (href.startsWith("/")) {
        parts.push(
          <Link
            key={`${keyPrefix}-a-${i++}`}
            href={href}
            className="font-semibold text-[var(--color-orange)] underline-offset-2 hover:underline"
          >
            {label}
          </Link>,
        );
      } else {
        parts.push(
          <a
            key={`${keyPrefix}-a-${i++}`}
            href={href}
            className="font-semibold text-[var(--color-orange)] underline-offset-2 hover:underline"
            rel="noopener noreferrer"
          >
            {label}
          </a>,
        );
      }
    } else if (match[4]) {
      parts.push(
        <strong key={`${keyPrefix}-b-${i++}`} className="font-semibold text-[var(--color-cream)]">
          {match[4]}
        </strong>,
      );
    }
    last = match.index + match[0].length;
  }

  if (last < text.length) parts.push(text.slice(last));
  return parts;
}

export function BlogBody({ content }: BlogBodyProps) {
  const lines = content.replace(/\r\n/g, "\n").split("\n");
  const blocks: ReactNode[] = [];
  let listItems: string[] = [];
  let paragraph: string[] = [];
  let key = 0;

  const flushParagraph = () => {
    if (paragraph.length === 0) return;
    const text = paragraph.join(" ").trim();
    paragraph = [];
    if (!text) return;
    blocks.push(
      <p key={`p-${key++}`} className="text-[var(--color-cream)]/80 leading-relaxed">
        {renderInline(text, `p-${key}`)}
      </p>,
    );
  };

  const flushList = () => {
    if (listItems.length === 0) return;
    const items = listItems;
    listItems = [];
    blocks.push(
      <ul
        key={`ul-${key++}`}
        className="my-2 list-disc space-y-2 pl-5 text-[var(--color-cream)]/80"
      >
        {items.map((item, idx) => (
          <li key={`li-${key}-${idx}`}>{renderInline(item, `li-${key}-${idx}`)}</li>
        ))}
      </ul>,
    );
  };

  for (const raw of lines) {
    const line = raw.trimEnd();
    const trimmed = line.trim();

    if (trimmed.startsWith("- ")) {
      flushParagraph();
      listItems.push(trimmed.slice(2));
      continue;
    }

    flushList();

    if (trimmed.startsWith("### ")) {
      flushParagraph();
      blocks.push(
        <h3
          key={`h3-${key++}`}
          className="mt-10 font-display text-xl text-[var(--color-cream)] sm:text-2xl"
        >
          {trimmed.slice(4)}
        </h3>,
      );
      continue;
    }

    if (trimmed.startsWith("## ")) {
      flushParagraph();
      blocks.push(
        <h2
          key={`h2-${key++}`}
          className="mt-12 font-display text-2xl text-[var(--color-cream)] sm:text-3xl"
        >
          {trimmed.slice(3)}
        </h2>,
      );
      continue;
    }

    if (trimmed === "") {
      flushParagraph();
      continue;
    }

    if (/^\d+\.\s/.test(trimmed)) {
      flushParagraph();
      listItems.push(trimmed.replace(/^\d+\.\s/, ""));
      continue;
    }

    paragraph.push(trimmed);
  }

  flushList();
  flushParagraph();

  return <div className="space-y-4">{blocks}</div>;
}
