import type { MenuItem } from '../types'
import StarRating from './StarRating'
import { useCart } from '../context/CartContext'

interface FoodCardProps {
  item: MenuItem
}

export default function FoodCard({ item }: FoodCardProps) {
  const { addItem } = useCart()

  return (
    <div
      className={`group rounded-3xl p-5 flex flex-col items-center text-center border-2 border-transparent transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:border-primary ${
        item.featured ? 'bg-primary text-white' : 'bg-cream-2 text-ink'
      }`}
    >
      <div className="w-36 h-36 sm:w-40 sm:h-40 rounded-full overflow-hidden bg-white/40 mb-4">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          loading="lazy"
        />
      </div>
      <h3
        className={`font-display font-semibold text-lg transition-colors duration-300 ${
          item.featured ? '' : 'group-hover:text-primary'
        }`}
      >
        {item.name}
      </h3>
      <div className="mt-1"><StarRating rating={item.rating} /></div>
      <p className={`text-xs mt-2 leading-relaxed line-clamp-2 ${item.featured ? 'text-white/80' : 'text-muted'}`}>
        {item.description}
      </p>
      <div className="mt-4 flex items-center gap-3 w-full justify-center">
        <span className="font-semibold">${item.price.toFixed(2)}</span>
        <button
          onClick={() => addItem(item)}
          className={`text-xs font-semibold rounded-full px-4 py-2 transition-colors ${
            item.featured
              ? 'bg-white text-primary hover:bg-white/90'
              : 'bg-primary text-white hover:bg-primary-dark'
          }`}
        >
          Order now
        </button>
      </div>
    </div>
  )
}
