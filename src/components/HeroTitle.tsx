import { Fragment, type ReactNode } from "react";

// Two-line hero headline used on the city seller pages: a white statement line
// and a gold italic payoff line. The wording is passed in unchanged; this
// component only controls presentation.
//
// Layout rules (checked at 360, 390, 768, 1024, 1440 and 1800 px):
// - each line is balanced (text-wrap: balance), so a wrapped line splits evenly
// - the place name (`keep`) and the last words of each line are locked
//   together, so no single word is ever orphaned on its own line
// - "®" is set small and tight to the word before it
// - the payoff is a step smaller than the statement, so the eye reads the
//   statement first

interface HeroTitleProps {
  lead: string;
  payoff: string;
  /** Phrases that must never break across lines, e.g. the city name. */
  keep?: string[];
  /** How many trailing words of each line to lock together. */
  tailWords?: { lead?: number; payoff?: number };
}

function registered(text: string): ReactNode {
  const parts = text.split("®");
  return parts.map((part, i) => (
    <Fragment key={i}>
      {part}
      {i < parts.length - 1 && (
        <span className="not-italic" style={{ fontSize: "0.5em", verticalAlign: "0.85em", marginLeft: "0.04em", marginRight: "-0.1em" }}>
          ®
        </span>
      )}
    </Fragment>
  ));
}

function nowrap(text: string, key?: string | number): ReactNode {
  return (
    <span key={key} className="whitespace-nowrap">
      {registered(text)}
    </span>
  );
}

/** Renders `text` with the `keep` phrases and the last `tail` words locked against line breaks. */
function locked(text: string, keep: string[], tail: number): ReactNode {
  const words = text.trim().split(/\s+/);
  const tailCount = Math.min(tail, words.length);
  const headText = words.slice(0, words.length - tailCount).join(" ");
  const tailText = words.slice(words.length - tailCount).join(" ");

  const head: ReactNode[] = [];
  let rest = headText;
  let k = 0;
  while (rest.length) {
    const hits = keep.map((p) => ({ p, i: rest.indexOf(p) })).filter((h) => h.i >= 0).sort((a, b) => a.i - b.i);
    if (!hits.length) {
      head.push(<Fragment key={k++}>{registered(rest)}</Fragment>);
      break;
    }
    const { p, i } = hits[0];
    if (i > 0) head.push(<Fragment key={k++}>{registered(rest.slice(0, i))}</Fragment>);
    head.push(nowrap(p, k++));
    rest = rest.slice(i + p.length);
  }

  return (
    <>
      {head}
      {headText ? " " : null}
      {nowrap(tailText)}
    </>
  );
}

export function HeroTitle({ lead, payoff, keep = [], tailWords = {} }: HeroTitleProps) {
  return (
    <h1 className="mx-auto mt-6 max-w-6xl font-serif text-white" style={{ lineHeight: 1.1, letterSpacing: "-0.01em" }}>
      <span className="block text-balance" style={{ fontSize: "clamp(1.7rem, 3.7vw, 3.15rem)" }}>
        {locked(lead, keep, tailWords.lead ?? 3)}
      </span>
      <em className="mt-2 block text-balance italic text-gold" style={{ fontSize: "clamp(1.35rem, 3.1vw, 2.65rem)" }}>
        {locked(payoff, keep, tailWords.payoff ?? 2)}
      </em>
    </h1>
  );
}
