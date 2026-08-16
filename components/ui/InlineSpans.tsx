import Link from "next/link";
import type { InlineSpan } from "@/content/legal/types";

export function InlineSpans({ spans }: { spans: readonly InlineSpan[] }) {
  return (
    <>
      {spans.map((span, index) => {
        if (!span.href) {
          return <span key={index}>{span.text}</span>;
        }
        const external = span.href.startsWith("http") || span.href.startsWith("mailto:");
        if (external) {
          return (
            <a
              key={index}
              href={span.href}
              className="font-semibold text-navy underline decoration-orange decoration-2 underline-offset-3 hover:text-orange-dark"
              {...(span.href.startsWith("http")
                ? { rel: "noopener noreferrer", target: "_blank" }
                : {})}
            >
              {span.text}
            </a>
          );
        }
        return (
          <Link
            key={index}
            href={span.href}
            className="font-semibold text-navy underline decoration-orange decoration-2 underline-offset-3 hover:text-orange-dark"
          >
            {span.text}
          </Link>
        );
      })}
    </>
  );
}
