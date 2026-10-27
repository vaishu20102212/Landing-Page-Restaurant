import { Link } from 'react-router-dom'
import { useState } from 'react'
import Button from '../components/Button'
import FoodCard from '../components/FoodCard'
import CategoryTabs from '../components/CategoryTabs'
import Pagination from '../components/Pagination'
import { menuItems, chefs, testimonials, categoryFilters } from '../data/menu'

export default function Home() {
  const [category, setCategory] = useState<string>('All catagory')
  const [page, setPage] = useState(1)
  const [activeTestimonial, setActiveTestimonial] = useState<string | null>(null)
  const popular = (category === 'All catagory' ? menuItems : menuItems.filter((m) => m.category === category)).slice(0, 6)

  return (
    <div>
      {/* Hero */}
      <section className="container-x pt-12 lg:pt-16 pb-16">
        <div className="flex flex-col md:flex-row gap-8 md:gap-8 lg:gap-10 items-center">
          <div className="min-w-0 w-full md:w-1/2">
            <span className="section-eyebrow">Restaurant</span>
            <h1 className="font-display font-bold text-4xl sm:text-5xl md:text-5xl lg:text-6xl leading-[1.1] mt-3">
              Italian<br />Cuisine
            </h1>
            <p className="text-muted mt-5 max-w-md leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sodales senectus dictum arcu sit tristique
              donec eget.
            </p>
            <div className="flex flex-wrap gap-4 mt-8">
              <Link to="/order"><Button size="lg">Order now</Button></Link>
              <Link to="/reservation"><Button variant="success" size="lg">Reservation</Button></Link>
            </div>
          </div>
          <div className="relative flex justify-center w-full md:w-1/2">
            <div className="w-full max-w-[280px] sm:max-w-sm md:max-w-none aspect-square md:w-80 md:h-80 lg:w-140 lg:h-140 overflow-hidden rounded-3xl">
              <img src="/images/hero-spaghetti.png" alt="Italian spaghetti dish" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Welcome */}
      <section className="bg-sage">
        <div className="container-x py-16 grid md:grid-cols-2 gap-8 md:gap-8 lg:gap-10 items-center">
          <div className="order-2 md:order-1 overflow-hidden rounded-3xl aspect-[4/3] md:aspect-square lg:aspect-auto lg:h-full max-w-[240px] mx-auto sm:max-w-xs md:max-w-none">
            <img
              src="/images/welcome.png"
              alt="Fresh salad bowl"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="order-1 md:order-2">
            <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl">
              Welcome to <span className="text-primary">delizioso</span>
            </h2>
            <p className="text-muted mt-5 max-w-md leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed lobortis wisi ariacus id
              tempus tortor sed tempus urna. Congue consectetur.
            </p>
            <Link to="/menu" className="inline-block mt-7">
              <Button>See our menu</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Popular menu */}
      <section className="container-x  py-20">
        <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-center">Our popular menu</h2>
        <div className="mt-8">
          <CategoryTabs categories={categoryFilters} active={category} onChange={setCategory} />
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-10">
          {popular.map((item) => (
            <FoodCard key={item.id} item={item} />
          ))}
        </div>
        <Pagination page={page} totalPages={3} onChange={setPage} />
      </section>

      {/* Reserve a table */}
      <section className="bg-cream py-20  overflow-hidden">
        <div className="container-x grid grid-cols-2 gap-4 xs:gap-6 sm:gap-8 lg:gap-10 items-center">
          <div className="relative flex justify-center py-4 xs:py-10">
            <div className="relative w-[85%] aspect-square max-w-80 rounded-full bg-primary-light flex items-center justify-center">
              <div className="w-[78%] aspect-square rounded-full overflow-hidden shadow-lg">
                <img
                  src="../../images/res 3.png"
                  alt="Table set for dinner"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -top-[6%] -right-[6%] w-[30%] aspect-square rounded-full bg-primary-light p-1.5 xs:p-2 shadow-md">
                <div className="w-full h-full rounded-full overflow-hidden">
                  <img
                    src="../../images/res 1.png"
                    alt="Restaurant interior"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="absolute -bottom-[6%] -left-[6%] w-[30%] aspect-square rounded-full bg-primary-light p-1.5 xs:p-2 shadow-md">
                <div className="w-full h-full rounded-full overflow-hidden">
                  <img
                    src="../../images/res 2.png"
                    alt="Table setting"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
          <div>
            <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl">
              Let's reserve<br /><span className="text-primary">a table</span>
            </h2>
            <p className="text-muted mt-5 max-w-md leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Facilisis ultricies at eleifend
              proin. Congue nibh nulla malesuada ultricies nec quam
            </p>
            <Link to="/reservation" className="inline-block mt-7">
              <Button>Reservation</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Chefs */}
      <section className="container-x pb-20 pt-20 text-center">
        <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl">Our greatest chef</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 lg:gap-10 pt-10 mt-10 max-w-3xl mx-auto">
          {chefs.map((chef) => (
            <div key={chef.id}>
              <div className={`rounded-3xl overflow-hidden aspect-[1/2] ${chef.bg ?? 'bg-cream-2'}`}>
                <img src={chef.image} alt={chef.name} className="w-full h-full object-cover" />
              </div>
              <h3 className="font-semibold mt-4">{chef.name}</h3>
              <p className="text-sm text-muted mt-1">{chef.role}</p>
            </div>
          ))}
          {/* Mobile-only 4th chef card (reuses first chef's photo) */}
          <div className="block md:hidden">
            <div className={`rounded-3xl overflow-hidden aspect-[1/2] ${chefs[0].bg ?? 'bg-cream-2'}`}>
              <img src={chefs[0].image} alt={chefs[0].name} className="w-full h-full object-cover" />
            </div>
            <h3 className="font-semibold mt-4">{chefs[0].name}</h3>
            <p className="text-sm text-muted mt-1">{chefs[0].role}</p>
          </div>
        </div>
        <Link to="/about" className="inline-block mt-10">
          <Button>View all</Button>
        </Link>
      </section>

      {/* Testimonials */}
      <section className="bg-cream-2 relative">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* decorative dots */}
          <span className="absolute left-[8%] top-[8%] w-5 h-5 sm:w-8 sm:h-8 lg:w-11 lg:h-11 rounded-full bg-[#c8e6b9]" />
          <span className="absolute right-[10%] top-[14%] w-3 h-3 sm:w-4 sm:h-4 lg:w-6 lg:h-6 rounded-full bg-[#454844]" />
          <span className="absolute left-[22%] top-[26%] w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 lg:w-5 lg:h-5 rounded-full bg-[#cfe6f7]" />
          <span className="absolute right-[26%] top-[42%] w-5 h-5 sm:w-8 sm:h-8 lg:w-11 lg:h-11 rounded-full bg-[#8ce491]" />
          <span className="absolute right-[2%] top-[48%] w-4 h-4 sm:w-7 sm:h-7 lg:w-10 lg:h-10 rounded-full bg-[#f0c9f2]" />
          <span className="absolute left-[5%] top-[52%] w-4 h-4 sm:w-6 sm:h-6 lg:w-9 lg:h-9 rounded-full bg-primary" />
          <span className="absolute left-[16%] bottom-[10%] w-3.5 h-3.5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 rounded-full bg-[#b7b7b7]" />
          <span className="absolute right-[22%] bottom-[8%] w-4 h-4 sm:w-6 sm:h-6 lg:w-9 lg:h-9 rounded-full bg-[#646e5f]" />
        </div>

        <div className="container-x py-20 text-center relative">
          <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl">Our customers say</h2>
          <div className="max-w-xl mx-auto mt-10 relative">
            <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-35 lg:h-35 rounded-full overflow-hidden mx-auto bg-black/15">
              <img src={testimonials[0].avatar} alt={testimonials[0].name} className="w-full h-full object-cover" />
            </div>
            <h4 className="font-semibold mt-4">{testimonials[0].name}</h4>
            <p className="text-xm text-muted mt-1">{testimonials[0].role}</p>
            <div className="mt-5 relative">
              <p className="text-lg sm:text-xl lg:text-2xl leading-relaxed">
                <span className="font-display text-4xl text-ink/80 leading-none">&ldquo; </span>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Facilisis ultricies at eleifend proin. Congue nibh nulla malesuada ultricies nec quam
                <span className="font-display text-4xl text-ink/80 leading-none">&rdquo; </span>
              </p>
            </div>
          </div>

          {/* avatar cluster */}
          <div className="flex flex-wrap items-end justify-center gap-3 sm:gap-4 lg:gap-5 max-w-2xl mx-auto mt-10 pb-1">
            {[
              { t: testimonials[3], size: 'w-9 h-9 sm:w-12 sm:h-12 lg:w-14 lg:h-14', margin: 'mb-4 sm:mb-6 lg:mb-8' },
              { t: testimonials[4], size: 'w-10 h-10 sm:w-14 sm:h-14 lg:w-16 lg:h-16', margin: '' },
              { t: testimonials[2], size: 'w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20', margin: 'mb-1' },
              { t: testimonials[7], size: 'w-16 h-16 sm:w-24 sm:h-24 lg:w-30 lg:h-30', margin: '', center: true },
              { t: testimonials[1], size: 'w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20', margin: 'mb-1' },
              { t: testimonials[5], size: 'w-10 h-10 sm:w-14 sm:h-14 lg:w-16 lg:h-16', margin: '' },
              { t: testimonials[6], size: 'w-9 h-9 sm:w-12 sm:h-12 lg:w-14 lg:h-14', margin: 'mb-4 sm:mb-6 lg:mb-8' },
            ].map((item, i) => (
              <div key={item.t?.id ?? i} className={`relative group ${item.size} ${item.margin} shrink-0`}>
                <div className={item.center ? 'w-full h-full rounded-full bg-primary-light p-1 sm:p-1.5' : 'w-full h-full'}>
                  <div
                    className="w-full h-full rounded-full overflow-hidden cursor-pointer"
                    onClick={() => item.t && setActiveTestimonial((cur) => (cur === item.t!.id ? null : item.t!.id))}
                  >
                    <img src={item.t?.avatar} alt={item.t?.name ?? 'Customer'} className="w-full h-full object-cover" />
                  </div>
                </div>

                {item.t && (
                  <div
                    className={`pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-56 scale-95 transition-all duration-150 z-30 group-hover:opacity-100 group-hover:scale-100 ${activeTestimonial === item.t.id ? 'opacity-100 scale-100' : 'opacity-0'}`}
                  >
                    <div className="bg-white dark:bg-[#1e1e1e] text-left rounded-xl shadow-lg p-4">
                      <p className="font-semibold text-sm">{item.t.name}</p>
                      <p className="text-[11px] text-primary font-medium mt-0.5">{item.t.role}</p>
                      <p className="text-xs text-muted mt-2 leading-relaxed line-clamp-3">{item.t.quote}</p>
                    </div>
                    <div className="w-3 h-3 bg-white dark:bg-[#1e1e1e] rotate-45 mx-auto -mt-1.5" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open hours CTA */}
      <section className="container-x py-20 ">
        <div className="relative rounded-[2.5rem] overflow-hidden">
          <img
            src="../../images/open 1.png"
            alt="Restaurant table at night"
            className="w-full h-64 sm:h-72 md:h-80 lg:h-96 object-cover"
          />
          <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-center px-6">
            <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-white">we are open from</h2>
            <p className="text-white font-semibold text-lg mt-2">Monday–Sunday</p>
            <div className="mt-3 text-white/80 text-sm space-y-1">
              <p>Launch : Mon–Sun : 11:00am–02:00pm</p>
              <p>Dinner : Sunday : 04:00pm–08:00pm</p>
              <p>04:00pm–09:00pm</p>
            </div>
            <div className="flex flex-wrap gap-4 mt-6 justify-center">
              <Link to="/order"><Button>Order now</Button></Link>
              <Link to="/reservation"><Button variant="white">Reservation</Button></Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}