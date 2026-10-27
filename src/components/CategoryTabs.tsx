interface CategoryTabsProps {
  categories: readonly string[]
  active: string
  onChange: (c: string) => void
}

export default function CategoryTabs({ categories, active, onChange }: CategoryTabsProps) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      {categories.map((c) => (
        <button
          key={c}
          onClick={() => onChange(c)}
          className={`px-5 py-2.5 rounded-full text-sm font-medium transition-colors ${
            active === c ? 'bg-[#2b1c10] text-white' : 'bg-cream-2 text-ink/70 hover:bg-cream-2/70'
          }`}
        >
          {c}
        </button>
      ))}
    </div>
  )
}
