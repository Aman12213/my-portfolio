import Reveal from "./Reveal";

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mb-14 text-center">
      <Reveal>
        <span className="inline-block rounded-full glass px-4 py-1.5 font-display text-xs tracking-[0.25em] text-fg/70">
          {eyebrow}
        </span>
      </Reveal>
      <Reveal delay={1}>
        <h2 className="mt-5 font-display text-4xl font-bold tracking-tight text-fg sm:text-5xl">
          {title}
        </h2>
      </Reveal>
      {subtitle && (
        <Reveal delay={2}>
          <p className="mx-auto mt-4 max-w-xl text-fg/55">{subtitle}</p>
        </Reveal>
      )}
    </div>
  );
}
