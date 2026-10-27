import { Link } from 'react-router-dom'

export default function Logo({ light = false, iconOnly = false }: { light?: boolean; iconOnly?: boolean }) {
  return (
    <Link to="/" className="flex items-center gap-2 shrink-0">
      <span className="w-9 h-9 rounded-full bg-primary text-white flex items-center justify-center font-display font-bold text-lg">
        D
      </span>
      {!iconOnly && (
        <span className={`font-semibold text-lg ${light ? 'text-white' : 'text-ink'}`}>
          Delizi<span className="text-primary">oso</span>
        </span>
      )}
    </Link>
  )
}
