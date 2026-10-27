import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Menu from './pages/Menu'
import About from './pages/About'
import Contact from './pages/Contact'
import OrderOnline from './pages/OrderOnline'
import Checkout from './pages/Checkout'
import Reservation from './pages/Reservation'
import ReservationConfirm from './pages/ReservationConfirm'
import ReservationConfirmed from './pages/ReservationConfirmed'
import ReservationCancel from './pages/ReservationCancel'
import Login from './pages/Login'
import Signup from './pages/Signup'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/order" element={<OrderOnline />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/reservation" element={<Reservation />} />
        <Route path="/reservation/confirm" element={<ReservationConfirm />} />
        <Route path="/reservation/confirmed" element={<ReservationConfirmed />} />
        <Route path="/reservation/cancel" element={<ReservationCancel />} />
        <Route path="*" element={<NotFound />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<Login initialForgotModal />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  )
}
