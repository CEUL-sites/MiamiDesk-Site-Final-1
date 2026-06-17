import { ArrowRight, Camera, Globe2, MessagesSquare, Radar } from "lucide-react";

// Homepage services section — makes the listing offer concrete. The network
// stats sections say WHO Carlos is connected to; this says WHAT a seller
// actually receives, step by step, which is the deciding question for a
// homeowner comparing listing agents.

const PILLARS = [
  {
    icon: Camera,
    step: "01",
    title: "Media that earns the click",
    body:
      "Pro photography, cinematic video, and staging direction — approved before launch. Buyers screen online first; your home wins on the first frame.",
  },
  {
    icon: Globe2,
    step: "02",
    title: "Distribution beyond the MLS",
    body:
      "Into the Miami MLS that 93,000 agents search daily — then syndicated to major U.S. portals and 200+ international channels in 19 languages.",
  },
  {
    icon: Radar,
    step: "03",
    title: "Buyer-agent activation",
    body:
      "Direct outreach to the agents working buyers in your price band — local, relocation, and international — so your home is shown, not just listed.",
  },
  {
    icon: MessagesSquare,
    step: "04",
    title: "Weekly reporting, real strategy",
    body:
      "Showings, feedback, and analytics every week by WhatsApp or email — with pricing moves recommended from the data, not guesswork.",
  },
];

export function ListingSystem() {
  return (
    <section className="bg-navy-deep py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">The Listing System</p>
        <div className="mt-5 flex flex-wrap items-end justify-between gap-6">
          <h2 className="max-w-2xl font-serif text-3xl leading-tight text-white md:text-4xl">
            What actually happens when your home lists with Carlos.
          </h2>
          <p className="max-w-md font-sans text-sm leading-relaxed text-white/55">
            Not a sign in the yard and a prayer. A documented marketing sequence, run the same
            disciplined way for a Kendall townhome or a Weston estate.
          </p>
        </div>

        <div className="mt-12 grid gap-px border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {PILLARS.map(({ icon: Icon, step, title, body }) => (
            <div key={step} className="group relative bg-navy-deep p-7 transition-colors duration-300 hover:bg-white/[0.03]">
              <div className="flex items-center justify-between">
                <span className="font-serif text-[2.6rem] leading-none text-gold/90">{step}</span>
                <Icon size={20} className="text-gold/45 transition-colors duration-300 group-hover:text-gold" />
              </div>
              <div className="mt-5 h-px w-10 bg-gold/40 transition-all duration-300 group-hover:w-16" />
              <h3 className="mt-5 font-serif text-lg leading-snug text-white">{title}</h3>
              <p className="mt-3 font-sans text-[13px] leading-relaxed text-white/55">{body}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-5">
          <a
            href="/sell-south-florida#contact"
            className="group inline-flex items-center gap-2.5 bg-gold px-8 py-4 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-navy-deep transition-opacity hover:opacity-90"
          >
            Get My Home Value
            <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
          </a>
          <a
            href="/home-value"
            className="font-mono text-[10px] uppercase tracking-[0.18em] text-gold/70 underline underline-offset-4 transition-colors hover:text-gold"
          >
            Or start with your home's value →
          </a>
        </div>
      </div>
    </section>
  );
}
