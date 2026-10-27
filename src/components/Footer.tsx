import { Link } from 'react-router-dom'
import Logo from './Logo'

const pageLinks = [
  { to: '/', label: 'Home' },
  { to: '/menu', label: 'Menu' },
  { to: '/order', label: 'Order online' },
  { to: '/order', label: 'Catering' },
  { to: '/reservation', label: 'Reservation' },
]

const infoLinks = [
  { to: '/about', label: 'About us' },
  { to: '/about#testimonial', label: 'Testimonial' },
  { to: '/about#event', label: 'Event' },
]

const socials = [
  { label: 'Twitter', href: '#', path: 'M22 5.9c-.7.3-1.5.5-2.3.6.8-.5 1.4-1.3 1.7-2.3-.8.5-1.7.8-2.6 1a4.1 4.1 0 0 0-7 3.7A11.6 11.6 0 0 1 3.4 4.6a4.1 4.1 0 0 0 1.3 5.4c-.6 0-1.3-.2-1.8-.5v.1c0 2 1.4 3.6 3.3 4a4.1 4.1 0 0 1-1.8.1c.5 1.6 2 2.8 3.8 2.8A8.2 8.2 0 0 1 2 18.4a11.6 11.6 0 0 0 6.3 1.8c7.5 0 11.7-6.3 11.7-11.7v-.5c.8-.6 1.5-1.3 2-2.1z' },
  { label: 'Instagram', href: '#', path: 'M12 2c2.7 0 3 0 4.1.06 1.1.05 1.8.2 2.4.45a4.9 4.9 0 0 1 1.8 1.15 4.9 4.9 0 0 1 1.15 1.8c.25.6.4 1.3.45 2.4.06 1.1.06 1.4.06 4.1s0 3-.06 4.1c-.05 1.1-.2 1.8-.45 2.4a4.9 4.9 0 0 1-1.15 1.8 4.9 4.9 0 0 1-1.8 1.15c-.6.25-1.3.4-2.4.45-1.1.06-1.4.06-4.1.06s-3 0-4.1-.06c-1.1-.05-1.8-.2-2.4-.45a4.9 4.9 0 0 1-1.8-1.15 4.9 4.9 0 0 1-1.15-1.8c-.25-.6-.4-1.3-.45-2.4C2 15 2 14.7 2 12s0-3 .06-4.1c.05-1.1.2-1.8.45-2.4a4.9 4.9 0 0 1 1.15-1.8A4.9 4.9 0 0 1 5.46 2.5c.6-.25 1.3-.4 2.4-.45C8.96 2 9.3 2 12 2zm0 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 8.2a3.2 3.2 0 1 1 0-6.4 3.2 3.2 0 0 1 0 6.4zm5.2-8.4a1.2 1.2 0 1 1-2.4 0 1.2 1.2 0 0 1 2.4 0z' },
  { label: 'Facebook', href: '#', path: 'M13.5 21v-7.5h2.5l.4-3H13.5V8.4c0-.9.3-1.5 1.6-1.5h1.7V4.2C16.5 4.1 15.6 4 14.5 4c-2.3 0-3.9 1.4-3.9 4v2.5H8v3h2.6V21h2.9z' },
]

export default function Footer() {
  return (
    <footer className="bg-brown-dark text-white/85">
      <div className="container-x py-16 grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo light />
          <p className="mt-5 text-sm leading-relaxed max-w-xs text-white/60">
            Viverra gravida morbi egestas facilisis tortor netus non duis tempor.
          </p>
          <div className="flex items-center gap-3 mt-6">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                className="w-9 h-9 rounded-full bg-white text-brown-dark flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                  <path d={s.path} />
                </svg>
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-primary font-semibold mb-4">Page</h4>
          <ul className="space-y-3 text-sm text-white/70">
            {pageLinks.map((l) => (
              <li key={l.label}>
                <Link to={l.to} className="hover:text-white transition-colors">{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-primary font-semibold mb-4">Information</h4>
          <ul className="space-y-3 text-sm text-white/70">
            {infoLinks.map((l) => (
              <li key={l.label}>
                <Link to={l.to} className="hover:text-white transition-colors">{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-primary font-semibold mb-4">Get in touch</h4>
          <ul className="space-y-3 text-sm text-white/70">
            <li>3247 Johnson Ave, Bronx, NY 10463, Amerika Serikat</li>
            <li>delizioso@gmail.com</li>
            <li>+123 4567 8901</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 py-6 text-center text-xs text-white/50">
        Copyright © {new Date().getFullYear()} Delizioso
      </div>
    </footer>
  )
}
