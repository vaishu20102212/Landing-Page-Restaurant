import { useMemo, useState } from 'react'
import FoodCard from '../components/FoodCard'
import CategoryTabs from '../components/CategoryTabs'
import Pagination from '../components/Pagination'
import CartPanel from '../components/CartPanel'
import { menuItems, categoryFilters } from '../data/menu'

const PAGE_SIZE = 6

export default function Menu() {
  const [category, setCategory] = useState<string>('All catagory')
  const [page, setPage] = useState(1)

  const filtered = useMemo(
    () => (category === 'All catagory' ? menuItems : menuItems.filter((m) => m.category === category)),
    [category],
  )
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  const handleCategory = (c: string) => {
    setCategory(c)
    setPage(1)
  }

  return (
    <div className="container-x py-14">
      <h1 className="font-display font-bold text-4xl sm:text-5xl text-center">Menu</h1>

      <div className="mt-10">
        <CategoryTabs categories={categoryFilters} active={category} onChange={handleCategory} />
      </div>

      <div className="grid lg:grid-cols-[1fr_340px] gap-10 mt-12 items-start">
        <div>
          {paged.length === 0 ? (
            <p className="text-center text-muted mt-16">No dishes found in this category yet.</p>
          ) : (
            <div className="grid sm:grid-cols-2 gap-6">
              {paged.map((item) => (
                <FoodCard key={item.id} item={item} />
              ))}
            </div>
          )}

          <Pagination page={page} totalPages={totalPages} onChange={setPage} />
        </div>

        <CartPanel />
      </div>
    </div>
  )
}
