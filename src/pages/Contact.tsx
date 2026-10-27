import { useState } from 'react'
import Button from '../components/Button'

const infoItems = [
  {
    label: 'Our address',
    value: '2415 Bronx Park East, Bronx, NY 10467',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M12 21s7-6.1 7-12a7 7 0 1 0-14 0c0 5.9 7 12 7 12Z" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="12" cy="9" r="2.5" />
      </svg>
    ),
  },
  {
    label: 'Phone number',
    value: '+1 (718) 555-0142',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M4 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L14 13l5 2v4a2 2 0 0 1-2 2C9.5 21 3 14.5 3 6a2 2 0 0 1 1-2Z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: 'Email address',
    value: 'hello@delizioso.com',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M3 6h18v12H3z" strokeLinecap="round" strokeLinejoin="round" />
        <path d="m3 7 9 6 9-6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: 'Opening hours',
    value: 'Mon–Sun · 11:00am – 09:00pm',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3.5 2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
]

export default function Contact() {
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', subject: '', message: '' })

  const handleChange = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((f) => ({ ...f, [key]: e.target.value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div>
      <div className="container-x py-16 sm:py-20">
        <div className="max-w-2xl mx-auto text-center">
          <span className="section-eyebrow">Get in touch</span>
          <h1 className="font-display font-bold text-4xl sm:text-5xl mt-4">Contact us</h1>
          <p className="text-muted mt-4">
            We love hearing from our customers. Feel free to share your experience or ask any
            questions you may have — our team usually replies within a day.
          </p>
        </div>

        <div className="grid lg:grid-cols-[340px_1fr] gap-8 mt-14 items-start">
          {/* Info card */}
          <div className="bg-cream-2 rounded-3xl p-8 space-y-7">
            {infoItems.map((item) => (
              <div key={item.label} className="flex items-start gap-4">
                <span className="w-11 h-11 shrink-0 rounded-full bg-primary text-white flex items-center justify-center">
                  {item.icon}
                </span>
                <div className="min-w-0">
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted">{item.label}</p>
                  <p className="font-medium mt-1 break-words">{item.value}</p>
                </div>
              </div>
            ))}

            <div className="flex items-center gap-3 pt-2">
              {['facebook', 'instagram', 'twitter'].map((s) => (
                <span
                  key={s}
                  className="w-9 h-9 rounded-full bg-white dark:bg-[#1e1e1e] text-primary flex items-center justify-center text-xs font-bold uppercase shadow-sm"
                  aria-hidden
                >
                  {s[0]}
                </span>
              ))}
            </div>
          </div>

          {/* Form card */}
          <div className="bg-white dark:bg-[#1e1e1e] rounded-3xl p-6 sm:p-10 shadow-sm">
            {submitted ? (
              <div className="text-center py-10">
                <span className="w-16 h-16 mx-auto rounded-full bg-sage flex items-center justify-center text-success">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <path d="m5 13 4 4 10-10" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <p className="font-display font-bold text-2xl mt-5">Thanks for reaching out!</p>
                <p className="text-muted mt-2">We'll get back to you within 1–2 business days.</p>
                <button onClick={() => setSubmitted(false)} className="text-primary text-sm font-semibold mt-5">
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <h2 className="font-display font-bold text-2xl">Send us a message</h2>
                <div className="grid sm:grid-cols-2 gap-5">
                  <input required placeholder="First name" value={form.firstName} onChange={handleChange('firstName')} className="input-field" />
                  <input required placeholder="Last name" value={form.lastName} onChange={handleChange('lastName')} className="input-field" />
                </div>
                <div className="grid sm:grid-cols-2 gap-5">
                  <input required type="email" placeholder="Email address" value={form.email} onChange={handleChange('email')} className="input-field" />
                  <input placeholder="Subject" value={form.subject} onChange={handleChange('subject')} className="input-field" />
                </div>
                <textarea
                  required
                  placeholder="Message"
                  rows={6}
                  value={form.message}
                  onChange={handleChange('message')}
                  className="input-field resize-none"
                />
                <div className="pt-2">
                  <Button type="submit" size="lg" full>Submit</Button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>

      <div className="container-x pb-20">
        <div className="h-80 sm:h-[26rem] rounded-[2.5rem] overflow-hidden">
          <iframe
            title="Delizioso Restaurant location"
            className="w-full h-full border-0"
            loading="lazy"
            src="https://www.google.com/maps?q=Bronx,NY,10463&output=embed"
          />
        </div>
      </div>
    </div>
  )
}
