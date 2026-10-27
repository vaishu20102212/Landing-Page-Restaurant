import { useState } from 'react'
import { NavLink, Link, useNavigate } from 'react-router-dom'
import Logo from './Logo'
import Button from './Button'
import MiniCart from './MiniCart'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import { useTheme } from '../context/ThemeContext'

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/menu', label: 'Menu' },
  { to: '/about', label: 'About us' },
  { to: '/order', label: 'Order online' },
  { to: '/reservation', label: 'Reservation' },
  { to: '/contact', label: 'Contact us' },
]

function ThemeToggle({ className = '' }: { className?: string }) {
  const { theme, toggleTheme } = useTheme()
  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle dark mode"
      className={`w-9 h-9 shrink-0 rounded-full border border-ink/15 dark:border-white/15 flex items-center justify-center text-ink hover:bg-cream-2 transition-colors ${className}`}
    >
      {theme === 'dark' ? (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <circle cx="12" cy="12" r="4.5" />
          <path d="M12 2.5v2M12 19.5v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M2.5 12h2M19.5 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" strokeLinecap="round" />
        </svg>
      ) : (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M20 14.5A8.5 8.5 0 1 1 9.5 4a7 7 0 0 0 10.5 10.5z" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </button>
  )
}

export default function Header() {
  const [open, setOpen] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  const { count, clearCart } = useCart()
  const { isLoggedIn, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    clearCart()
    setOpen(false)
    setCartOpen(false)
    navigate('/')
  }

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-[#121212]/95 backdrop-blur border-b border-black/5 dark:border-white/10">
      <div className="container-x flex items-center justify-between h-20">
        <Logo />

        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `nav-link text-sm font-medium ${isActive ? 'text-primary is-active' : 'text-ink/80'}`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-5">
          <div className="relative">
            <button onClick={() => setCartOpen((v) => !v)} className="relative" aria-label="Cart">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M3 4h2l2.4 12.2a2 2 0 0 0 2 1.8h7.2a2 2 0 0 0 2-1.6L21 8H6" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="10" cy="21" r="1.3" />
                <circle cx="18" cy="21" r="1.3" />
              </svg>
              {count > 0 && (
                <span className="absolute -top-2 -right-2 bg-danger text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {count}
                </span>
              )}
            </button>
            {cartOpen && <MiniCart onClose={() => setCartOpen(false)} />}
          </div>
          <ThemeToggle />
          {isLoggedIn ? (
            <Button variant="success" size="sm" onClick={handleLogout}>Log out</Button>
          ) : (
            <Link to="/login">
              <Button variant="success" size="sm">Log in</Button>
            </Link>
          )}
        </div>

        <div className="flex items-center gap-3 lg:hidden">
          <ThemeToggle />
          <div className="relative">
            <button onClick={() => setCartOpen((v) => !v)} className="relative p-1" aria-label="Cart">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M3 4h2l2.4 12.2a2 2 0 0 0 2 1.8h7.2a2 2 0 0 0 2-1.6L21 8H6" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="10" cy="21" r="1.3" />
                <circle cx="18" cy="21" r="1.3" />
              </svg>
              {count > 0 && (
                <span className="absolute -top-1 -right-1 bg-danger text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {count}
                </span>
              )}
            </button>
            {cartOpen && <MiniCart onClose={() => setCartOpen(false)} />}
          </div>

          <button
            className="p-2 -mr-2"
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
          >
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              {open ? (
                <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
              ) : (
                <path d="M3 6h18M3 12h18M3 18h18" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden border-t border-black/5 dark:border-white/10 bg-white dark:bg-[#121212]">
          <nav className="container-x py-4 flex flex-col gap-4">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `nav-link text-sm font-medium ${isActive ? 'text-primary is-active' : 'text-ink/80'}`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <div className="pt-2">
              {isLoggedIn ? (
                <Button variant="success" size="sm" full onClick={handleLogout}>Log out</Button>
              ) : (
                <Link to="/login" onClick={() => setOpen(false)}>
                  <Button variant="success" size="sm" full>Log in</Button>
                </Link>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
