/** Approved United Realty Group asset. The inverted treatment is used only on dark backgrounds. */
export function UrgLogo({
  className = "",
  inverted = false,
}: {
  className?: string;
  inverted?: boolean;
}) {
  return (
    <img
      src="/images/urg-logo-original.webp"
      alt="United Realty Group"
      width="2176"
      height="723"
      className={`${className} object-contain ${inverted ? "brightness-0 invert" : ""}`}
    />
  );
}
