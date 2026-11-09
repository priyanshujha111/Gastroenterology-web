// src/components/Footer.jsx
import { Link } from 'react-router-dom'
import Placeholder from './Placeholder.jsx'

// Read once at load (not during render) for the copyright line
const YEAR = new Date().getFullYear()

// Khali ('') rahe to placeholder dikhega.
const EMAIL = 'support@medicalglobalacademy.com'
const PHONE_DISPLAY = '+91 9289994218'
const PHONE_HREF = 'tel:+919289994218'

const socials = [
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/medicalglobalacademy/',
    color: '#f472b6',
    icon: 'instagram',
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/company/medical-global-academy/posts/?feedView=all',
    color: '#60a5fa',
    icon: 'linkedin',
  },
  {
    label: 'X',
    href: 'https://x.com/MGA_Courses',
    color: '#ffffff',
    icon: 'x',
  },
  {
    label: 'YouTube',
    href: 'https://www.youtube.com/@MedicalGlobalAcademy',
    color: '#f87171',
    icon: 'youtube',
  },
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/medicalglobalacademy1',
    color: '#60a5fa',
    icon: 'facebook',
  },
]

// TODO: routes apne router ke hisaab se check kar lena (about/courses/doctors pehle se hain)
const linkGroups = [
  {
    heading: 'Explore',
    links: [
      { to: '/', label: 'Home' },
      { to: '/about', label: 'About' },
      { to: '/courses', label: 'Courses' },
      { to: '/doctors', label: 'Doctors' },
    ],
  },
  {
    heading: 'Courses types',
    links: [
      { to: '/courses?type=Certificate', label: 'Certificate courses' },
      { to: '/courses?type=Fellowship', label: 'Fellowship' },
      { to: '/courses?type=Pg Diploma', label: 'PG Diploma' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { to: '/about', label: 'About us' },
      { to: '/support', label: 'Support' },
      { to: '/privacy-policy', label: 'Privacy policy' },
      { to: '/terms', label: 'Terms & Conditions' },
      { to: '/refund-policy', label: 'Refund & Cancellation Policy' },
      { to: '/sitemap', label: 'Sitemap' },
    ],
  },
]

/* ============================================================================
 * COLOURS (same palette as the new hero)
 *   navy   #0B1F3A   base background
 *   teal   #14B8A6 / #0F7F86   buttons, glows
 *   mint   #5EEAD4   links on hover, accents (high contrast on navy)
 *   soft   #D9F3EF   light mint for small highlights
 * Hex values are used directly so the footer looks right even if the theme tokens differ.
 * ========================================================================== */

const focusRing =
  'rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5EEAD4] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B1F3A]'

const linkClass = `${focusRing} group inline-flex items-center gap-1.5 text-sm text-white/70 transition-all duration-200 hover:translate-x-0.5 hover:text-[#5EEAD4] motion-reduce:transition-none motion-reduce:hover:translate-x-0`

const headingClass = 'mb-6 font-display text-sm font-semibold tracking-wide text-white'

const iconProps = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': 'true',
  focusable: 'false',
}

function MailIcon() {
  return (
    <svg {...iconProps} className="h-4 w-4">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  )
}

function PhoneIcon() {
  return (
    <svg {...iconProps} className="h-4 w-4">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  )
}

/** Faint medical "+" mark, decoration only (same motif as the hero). */
function PlusMark({ className = '' }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M9 2h6v7h7v6h-7v7H9v-7H2V9h7V2z" />
    </svg>
  )
}

function SocialIcon({ name }) {
  switch (name) {
    case 'instagram':
      return (
        <svg {...iconProps} className="h-[16px] w-[16px]">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
        </svg>
      )
    case 'linkedin':
      return (
        <svg {...iconProps} className="h-[16px] w-[16px]">
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
          <rect x="2" y="9" width="4" height="12" />
          <circle cx="4" cy="4" r="2" />
        </svg>
      )
    case 'x':
      return (
        <svg {...iconProps} className="h-[16px] w-[16px]">
          <path d="M4 4l11.733 16h4.267l-11.733-16z" />
          <path d="M4 20l6.768-6.768m2.46-2.46l6.772-6.772" />
        </svg>
      )
    case 'youtube':
      return (
        <svg {...iconProps} className="h-[16px] w-[16px]">
          <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
          <path d="m10 15 5-3-5-3z" />
        </svg>
      )
    case 'facebook':
      return (
        <svg {...iconProps} className="h-[16px] w-[16px]">
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
        </svg>
      )
    default:
      return null
  }
}

export default function Footer() {
  return (
    <footer className="relative isolate overflow-hidden bg-linear-to-br from-[#0B1F3A] via-[#0C2A44] to-[#0A3B47] font-body text-[15px] leading-normal text-white">
      {/* Decorative background: teal hairline on top, soft teal glows, dotted pattern, plus marks.
          All purely visual (aria-hidden, pointer-events-none). */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-[#14B8A6]/70 to-transparent"
      />
      <div aria-hidden="true" className="pointer-events-none absolute -top-40 -right-32 -z-10 h-96 w-96 rounded-full bg-[#14B8A6]/20 blur-3xl" />
      <div aria-hidden="true" className="pointer-events-none absolute -bottom-48 -left-32 -z-10 h-96 w-96 rounded-full bg-[#0F7F86]/25 blur-3xl" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-16 left-0 -z-10 hidden h-48 w-24 opacity-40 md:block"
        style={{
          backgroundImage: 'radial-gradient(circle, #5EEAD4 1.2px, transparent 1.6px)',
          backgroundSize: '14px 14px',
          maskImage: 'linear-gradient(to right, black, transparent)',
          WebkitMaskImage: 'linear-gradient(to right, black, transparent)',
        }}
      />
      <PlusMark className="pointer-events-none absolute right-8 bottom-20 -z-10 hidden h-12 w-12 text-[#5EEAD4]/15 md:block" />
      <PlusMark className="pointer-events-none absolute top-24 right-1/3 -z-10 hidden h-7 w-7 text-[#5EEAD4]/10 lg:block" />

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-5 pt-14 pb-10 sm:grid-cols-2 sm:px-7 lg:grid-cols-[minmax(0,1.5fr)_repeat(3,minmax(0,1fr))] lg:gap-8 lg:px-6 lg:pt-16 lg:pb-12">
        {/* Left: brand, description, contact, socials */}
        <div className="sm:col-span-2 lg:col-span-1">
          <Link
            to="/"
            aria-label="GastroenterologyNow — Home"
            className={`${focusRing} inline-block font-display text-2xl font-bold text-white`}
          >
            Gastroenterology
            <span className="bg-linear-to-r from-[#5EEAD4] to-[#14B8A6] bg-clip-text text-transparent">Now</span>
          </Link>

          <p className="mt-4 max-w-[320px] text-[13px] leading-relaxed text-white/65">
            Certificate and fellowship programs that let practising doctors specialise without
            stepping away from clinical work.
          </p>

          <ul className="mt-6 grid gap-3.5 text-[13px] text-white/90">
            <li className="flex items-center gap-3">
              <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#14B8A6]/15 text-[#5EEAD4] ring-1 ring-[#14B8A6]/30">
                <MailIcon />
              </span>
              {EMAIL ? (
                <a href={`mailto:${EMAIL}`} className={`${focusRing} break-all transition-colors hover:text-[#5EEAD4]`}>
                  {EMAIL}
                </a>
              ) : (
                <Placeholder>[Contact email pending]</Placeholder>
              )}
            </li>
            <li className="flex items-center gap-3">
              <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#14B8A6]/15 text-[#5EEAD4] ring-1 ring-[#14B8A6]/30">
                <PhoneIcon />
              </span>
              {PHONE_DISPLAY ? (
                <a href={PHONE_HREF} className={`${focusRing} transition-colors hover:text-[#5EEAD4]`}>
                  {PHONE_DISPLAY}
                </a>
              ) : (
                <Placeholder>[Phone / WhatsApp pending]</Placeholder>
              )}
            </li>
          </ul>

          <ul className="mt-6 flex flex-wrap gap-2.5">
            {socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`GastroenterologyNow on ${s.label}`}
                  style={{ color: s.color }}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/10 backdrop-blur-sm transition duration-200 hover:-translate-y-0.5 hover:border-[#5EEAD4] hover:bg-white/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5EEAD4] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B1F3A] motion-reduce:transition-none motion-reduce:hover:translate-y-0"
                >
                  <SocialIcon name={s.icon} />
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Link columns */}
        {linkGroups.map((group) => (
          <nav key={group.heading} aria-label={group.heading}>
            <h2 className={headingClass}>
              {group.heading}
              <span aria-hidden="true" className="mt-2 block h-0.5 w-8 rounded-full bg-linear-to-r from-[#14B8A6] to-transparent" />
            </h2>
            <ul className="grid gap-3.5">
              {group.links.map((l) => (
                <li key={l.label}>
                  <Link
                    to={l.to}
                    className={
                      l.highlight
                        ? `${focusRing} text-sm font-medium text-amber-400 transition-colors hover:text-amber-300 motion-reduce:transition-none`
                        : linkClass
                    }
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      {/* Bottom bar: centered copyright */}
      <div className="border-t border-white/10 bg-black/10">
        <p className="mx-auto max-w-7xl px-5 py-4 pb-[max(16px,env(safe-area-inset-bottom))] text-center text-sm text-white/60">
          © {YEAR} Medical Global Academy. All rights reserved.
        </p>
      </div>
    </footer>
  )
}