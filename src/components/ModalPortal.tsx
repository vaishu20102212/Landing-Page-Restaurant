import { createPortal } from 'react-dom'

// Renders children directly into document.body. Full-screen `fixed` modal
// pages (reservation confirm/confirmed/cancel) must use this instead of a
// plain wrapper div: Layout's <main> has a page-transition `transform`
// (animate-page-in), and any transform on an ancestor turns `position: fixed`
// descendants into being positioned relative to that ancestor instead of the
// viewport. A portal sidesteps that entirely.
export default function ModalPortal({ children }: { children: React.ReactNode }) {
  return createPortal(children, document.body)
}
