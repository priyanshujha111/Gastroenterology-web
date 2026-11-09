import { Link } from 'react-router-dom'
import CourseImage from './CourseImage.jsx'

const focusRing = 'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary'

/**
 * Course card. Expects the normalised shape from mapCourse() in src/api/lms.js:
 *   { name, type, mode, duration, fee, feeLabel, url, imageUrl, imageAlt }
 * The image comes from the LMS (`image` filename → imageUrl); CourseImage shows a
 * placeholder only if the URL is empty or fails to load.
 * Missing fields are omitted, never shown as "unknown".
 */
export default function CourseCard({ course }) {
  const { name, type, mode, duration, fee, feeLabel = 'Fee', url } = course

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl bg-white shadow-soft transition duration-300 ease-out hover:-translate-y-1 hover:shadow-soft-lg">
      <div className="relative aspect-[16/10] overflow-hidden">
        <CourseImage
          course={course}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105 motion-reduce:transition-none"
        />
        {type && (
          <span className="absolute top-3 left-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary shadow-soft">
            {type}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-8">
      <h3 className="font-display text-xl leading-snug font-medium text-primary">{name}</h3>

      {mode && (
        <p className="mt-2 text-xs font-semibold uppercase tracking-wider text-secondary">{mode}</p>
      )}

      {/* auto-fit: two columns when the card is wide enough, stacked when it is narrow
          (e.g. the 4-up Home grid), so long labels like "Registration fee" never overflow. */}
      <dl className="mt-6 grid grid-cols-[repeat(auto-fit,minmax(6.5rem,1fr))] gap-4 rounded-2xl bg-bg p-4 text-sm">
        <div>
          <dt className="text-xs uppercase tracking-wider text-text/70">Duration</dt>
          <dd className="mt-1 font-medium text-text">{duration ?? '—'}</dd>
        </div>
        <div>
          <dt className="text-xs uppercase tracking-wider text-text/70">{feeLabel}</dt>
          <dd className="mt-1 font-medium text-text">{fee ?? '—'}</dd>
        </div>
      </dl>

      <div className="mt-auto pt-8">
        {url ? (
          <Link
            to={url}
            className={`inline-flex h-12 items-center gap-2 rounded-xl bg-primary px-6 text-sm font-semibold text-white shadow-soft transition duration-300 ease-out hover:-translate-y-0.5 hover:bg-primary-dark hover:shadow-soft-lg ${focusRing}`}
          >
            View details
            <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-0.5">→</span>
          </Link>
        ) : (
          <span className="inline-flex h-12 cursor-not-allowed items-center rounded-xl bg-primary/40 px-6 text-sm font-semibold text-white">
            Details coming soon
          </span>
        )}
      </div>
      </div>
    </article>
  )
}

/** Generic course icon (certificate / ribbon), same for every course. Exported for CourseDetail. */
export function CourseIcon({ className = 'h-12 w-12' }) {
  return (
    <span className={`inline-flex shrink-0 items-center justify-center rounded-2xl bg-secondary/10 text-secondary ${className}`}>
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M6 3h9l4 4v8 M14 3v5h5 M6 3v16h7 M9 11h6 M9 14h4" />
        <circle cx="17.5" cy="17" r="2.5" />
        <path d="M16.3 19.2L15.5 22l2-1 2 1-.8-2.8" />
      </svg>
    </span>
  )
}
