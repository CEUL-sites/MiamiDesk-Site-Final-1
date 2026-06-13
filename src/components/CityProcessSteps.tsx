interface ProcessStep {
  label: string;
  text: string;
}

export function CityProcessSteps({ steps }: { steps: ProcessStep[] }) {
  return (
    <div className="space-y-px border border-white/10">
      {steps.map((step, i) => (
        <div
          key={step.label}
          className="group flex items-start gap-5 bg-navy p-5 transition-colors hover:bg-white/[0.03]"
        >
          <span className="font-serif text-2xl leading-none text-gold/20 flex-shrink-0 w-8 mt-0.5 select-none">
            {String(i + 1).padStart(2, "0")}
          </span>
          <div className="min-w-0">
            <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-gold/70 mb-1.5">{step.label}</p>
            <p className="font-sans text-sm text-white/65">{step.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
