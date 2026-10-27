import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import { useAuth } from '../context/AuthContext'

const times = ['12:00 pm', '01:00 pm', '02:00 pm', '04:30 pm', '06:00 pm', '07:30 pm', '09:00 pm']
const partySizes = ['1 person', '2 people (Standard seating)', '3-4 people', '5-8 people', '8+ people (Group)']

export default function Reservation() {
  const navigate = useNavigate()
  const { isLoggedIn } = useAuth()
  const today = new Date().toISOString().slice(0, 10)
  const [date, setDate] = useState(today)
  const [time, setTime] = useState('')
  const [partySize, setPartySize] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!isLoggedIn) {
      navigate('/login', { state: { from: '/reservation' } })
      return
    }
    navigate('/reservation/confirm', { state: { date, time, partySize } })
  }

  return (
    <div className="container-x py-10 min-[500px]:py-14">
      <div className="grid min-[500px]:grid-cols-2 gap-8 min-[500px]:gap-10 lg:gap-12 items-center">
        <div className="relative w-full max-w-xs min-[500px]:max-w-md mx-auto aspect-square">
          <div className="absolute inset-0 rounded-full bg-cream-2 scale-110" />
          <div className="relative w-full h-full rounded-full overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=800&fit=crop"
              alt="Table set for reservation"
              className="w-full h-full object-fill"
            />
          </div>
        </div>

        <div>
          <h1 className="font-display font-bold text-3xl sm:text-4xl">Book a table</h1>
          <form onSubmit={handleSubmit} className="mt-8 space-y-5 max-w-sm">
            <div>
              <label className="text-xs font-semibold text-muted block mb-1.5">Date</label>
              <input
                type="date"
                required
                value={date}
                min={today}
                onChange={(e) => setDate(e.target.value)}
                className="input-field"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-muted block mb-1.5">Time</label>
              <select required value={time} onChange={(e) => setTime(e.target.value)} className="input-field appearance-none">
                <option value="" disabled>Select a time</option>
                {times.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold text-muted block mb-1.5">Party size</label>
              <select required value={partySize} onChange={(e) => setPartySize(e.target.value)} className="input-field appearance-none">
                <option value="" disabled>Select party size</option>
                {partySizes.map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>
            <Button type="submit" full size="lg">Book now</Button>
          </form>
        </div>
      </div>
    </div>
  )
}
