export function SectionHeader({ title, description }: { title: string; description: string }) {
  return (
    <div className="mb-4">
      <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
      <p className="text-sm text-slate-500">{description}</p>
    </div>
  );
}
