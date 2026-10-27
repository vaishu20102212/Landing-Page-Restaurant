interface PaginationProps {
  page: number
  totalPages: number
  onChange: (page: number) => void
}

export default function Pagination({ page, totalPages, onChange }: PaginationProps) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

  return (
    <div className="flex items-center justify-center gap-2 mt-10">
      <button
        aria-label="Previous page"
        disabled={page === 1}
        onClick={() => onChange(Math.max(1, page - 1))}
        className="w-9 h-9 rounded-full bg-[#2b1c10] text-white flex items-center justify-center disabled:opacity-40"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {pages.map((p) => (
        <button
          key={p}
          onClick={() => onChange(p)}
          className={`w-9 h-9 rounded-full text-sm font-medium transition-colors ${
            p === page ? 'bg-primary text-white' : 'bg-primary-light text-primary hover:bg-primary/20'
          }`}
        >
          {p}
        </button>
      ))}
      <button
        aria-label="Next page"
        disabled={page === totalPages}
        onClick={() => onChange(Math.min(totalPages, page + 1))}
        className="w-9 h-9 rounded-full bg-[#2b1c10] text-white flex items-center justify-center disabled:opacity-40"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </div>
  )
}
