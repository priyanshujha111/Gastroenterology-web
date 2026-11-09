import { useState } from 'react'
import { COUNSELLOR_WHATSAPP } from '../api/courseList.js'

const focusRing = 'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary'

const QUALIFICATIONS = ['MBBS', 'MD', 'MS', 'DNB', 'BDS', 'Other']

const inputClass =
  'mt-1 h-11 w-full rounded-xl border border-primary/20 bg-white px-3.5 text-sm text-text placeholder:text-text/40 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20'

/* ============================================================================
 * APPLY FORM
 * No lead-capture API is known yet, so submitting opens WhatsApp with the details
 * pre-filled for the counsellor. TODO: replace onSubmit with a POST to your lead API.
 * ========================================================================== */
export function ApplyForm({ course, onSubmitted }) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    country: 'India',
    qualification: '',
  })

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))

  const onSubmit = (e) => {
    e.preventDefault()
    const message = [
      `Hello MGA, I would like to apply for "${course.name}".`,
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      `Mobile: ${form.phone}`,
      `Country: ${form.country}`,
      `Highest qualification: ${form.qualification}`,
    ].join('\n')
    window.open(
      `https://wa.me/${COUNSELLOR_WHATSAPP}?text=${encodeURIComponent(message)}`,
      '_blank',
      'noopener,noreferrer',
    )
    onSubmitted?.(form)
  }

  return (
    <form onSubmit={onSubmit} className="mt-5 grid gap-4">
      <label className="block text-sm font-semibold text-secondary">
        Doctor full name *
        <input required value={form.name} onChange={set('name')} placeholder="e.g. Dr. Rajesh Kumar" className={inputClass} />
      </label>
      <label className="block text-sm font-semibold text-secondary">
        Email *
        <input required type="email" value={form.email} onChange={set('email')} placeholder="Email address" className={inputClass} />
      </label>
      <label className="block text-sm font-semibold text-secondary">
        Mobile number *
        <input required type="tel" inputMode="tel" value={form.phone} onChange={set('phone')} placeholder="+91 Mobile no." className={inputClass} />
      </label>
      <label className="block text-sm font-semibold text-secondary">
        Country *
        <input required value={form.country} onChange={set('country')} className={inputClass} />
      </label>
      <label className="block text-sm font-semibold text-secondary">
        Course programme
        <input readOnly value={course.name} className={`${inputClass} bg-[#F4FBFA] text-text/70`} />
      </label>
      <label className="block text-sm font-semibold text-secondary">
        Highest qualification *
        <select required value={form.qualification} onChange={set('qualification')} className={inputClass}>
          <option value="" disabled>Select qualification</option>
          {QUALIFICATIONS.map((q) => (
            <option key={q} value={q}>{q}</option>
          ))}
        </select>
      </label>

      <button
        type="submit"
        className={`mt-1 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-linear-to-r from-[#14B8A6] to-[#0F7F86] px-6 font-semibold text-white shadow-lg shadow-primary/25 transition duration-300 ease-out hover:-translate-y-0.5 hover:from-[#0FA796] hover:to-[#0B6E75] motion-reduce:transition-none motion-reduce:hover:translate-y-0 ${focusRing}`}
      >
        Submit application <span aria-hidden="true">→</span>
      </button>
      <p className="text-xs text-text/60">Submitting opens WhatsApp with your details ready to send to our counsellor.</p>
    </form>
  )
}

/* ============================================================================
 * SMALL PIECES
 * ========================================================================== */
export function Block({ title, children }) {
  return (
    <div>
      <h2 className="mb-5 flex items-center gap-3 font-display text-2xl font-medium text-primary">
        <span aria-hidden="true" className="h-6 w-1 rounded-full bg-linear-to-b from-[#14B8A6] to-[#0F7F86]" />
        {title}
      </h2>
      {children}
    </div>
  )
}

export function CheckIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12.5l4.5 4.5L19 7.5" />
    </svg>
  )
}

export function CheckDot() {
  return (
    <span aria-hidden="true" className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#D9F3EF] text-[#0F9D8F]">
      <CheckIcon size={12} />
    </span>
  )
}