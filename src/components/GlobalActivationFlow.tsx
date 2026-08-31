import { useEffect, useMemo, useRef, useState } from "react";
import { scalePoint } from "d3-scale";
import { curveMonotoneX, curveMonotoneY, line } from "d3-shape";

export type ActivationStage = {
  title: string;
  shortTitle: string[];
  detail: string;
};

type Props = {
  stages: ActivationStage[];
  ariaLabel: string;
  selectedLabel: string;
};

function useMeasuredWidth() {
  const ref = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(960);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const update = () => setWidth(Math.max(320, Math.round(node.getBoundingClientRect().width)));
    update();
    const observer = new ResizeObserver(update);
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return { ref, width };
}

export function GlobalActivationFlow({ stages, ariaLabel, selectedLabel }: Props) {
  const { ref, width } = useMeasuredWidth();
  const [selected, setSelected] = useState(1);
  const mobile = width < 720;
  const height = mobile ? 570 : 250;

  const geometry = useMemo(() => {
    if (mobile) {
      const y = scalePoint<number>().domain(stages.map((_, index) => index)).range([54, 500]);
      const points = stages.map((_, index) => ({ x: 52, y: y(index) ?? 0 }));
      const path = line<{ x: number; y: number }>()
        .x((d) => d.x)
        .y((d) => d.y)
        .curve(curveMonotoneY)(points) ?? "";
      return { points, path };
    }

    const x = scalePoint<number>()
      .domain(stages.map((_, index) => index))
      .range([74, width - 74]);
    const points = stages.map((_, index) => ({ x: x(index) ?? 0, y: 76 }));
    const path = line<{ x: number; y: number }>()
      .x((d) => d.x)
      .y((d) => d.y)
      .curve(curveMonotoneX)(points) ?? "";
    return { points, path };
  }, [mobile, stages, width]);

  const activate = (index: number) => setSelected(index);

  return (
    <div ref={ref} className="w-full">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        width="100%"
        height={height}
        role="group"
        aria-label={ariaLabel}
        className="block overflow-visible"
      >
        <title>{ariaLabel}</title>
        <path
          d={geometry.path}
          fill="none"
          stroke="#B08D57"
          strokeWidth="1.25"
          strokeDasharray="5 7"
          vectorEffect="non-scaling-stroke"
        />

        {geometry.points.map((point, index) => {
          const active = selected === index;
          const labelX = mobile ? 94 : point.x;
          const labelY = mobile ? point.y - 7 : 132;
          return (
            <g
              key={stages[index].title}
              role="button"
              tabIndex={0}
              aria-label={`${index + 1}. ${stages[index].title}. ${stages[index].detail}`}
              aria-pressed={active}
              onClick={() => activate(index)}
              onFocus={() => activate(index)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  activate(index);
                }
              }}
              className="cursor-pointer outline-none"
            >
              <rect
                x={point.x - 28}
                y={point.y - 28}
                width="56"
                height="56"
                fill="transparent"
              />
              <circle
                cx={point.x}
                cy={point.y}
                r={active ? 23 : 19}
                fill={active ? "#0B1E3F" : "#FFFFFF"}
                stroke={active ? "#0B1E3F" : "#B08D57"}
                strokeWidth={active ? 2 : 1.25}
                vectorEffect="non-scaling-stroke"
              />
              <text
                x={point.x}
                y={point.y + 4}
                textAnchor="middle"
                fontFamily="JetBrains Mono, monospace"
                fontSize="11"
                fontWeight="700"
                fill={active ? "#FFFFFF" : "#0B1E3F"}
              >
                {String(index + 1).padStart(2, "0")}
              </text>

              <text
                x={labelX}
                y={labelY}
                textAnchor={mobile ? "start" : "middle"}
                fontFamily="Raleway, system-ui, sans-serif"
                fontSize={mobile ? "13" : "11.5"}
                fontWeight="700"
                fill="#0B1E3F"
              >
                {stages[index].shortTitle.map((lineText, lineIndex) => (
                  <tspan key={lineText} x={labelX} dy={lineIndex === 0 ? 0 : mobile ? 18 : 16}>
                    {lineText}
                  </tspan>
                ))}
              </text>
            </g>
          );
        })}
      </svg>

      <div
        aria-live="polite"
        className="mx-auto -mt-4 max-w-3xl border-t border-bone pt-5 text-center md:-mt-7"
      >
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-gold-ink">
          {selectedLabel} {selected + 1} / {stages.length}
        </p>
        <p className="mt-2 font-sans text-sm leading-relaxed text-navy/75 md:text-base">
          {stages[selected].detail}
        </p>
      </div>

      <ol className="sr-only">
        {stages.map((stage) => (
          <li key={stage.title}>{stage.title}: {stage.detail}</li>
        ))}
      </ol>
    </div>
  );
}
