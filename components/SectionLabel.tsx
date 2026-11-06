export default function SectionLabel({ left, right }: { left: string; right: string }) {
  return (
    <div className="mb-8 flex items-center gap-4">
      <div
        data-mc="type"
        className="flex items-center gap-2 whitespace-nowrap font-display text-xs uppercase tracking-[0.2em] text-fg/60"
      >
        <span className="text-fg/40">©</span>
        <span className="text-fg/80">{left}</span>
        <span className="text-fg/30">|</span>
        <span className="text-fg/50">{right}</span>
      </div>
      <span data-mc="line" className="h-px flex-1 bg-fg/20" />
    </div>
  );
}
