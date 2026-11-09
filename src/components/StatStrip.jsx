import Reveal from './Reveal.jsx'
import { PlaceholderTag } from './Placeholder.jsx'
import { staggerDelay } from '../hooks/useReveal.js'
import { stats, STATS_ARE_PLACEHOLDERS } from '../data/stats.js'

/**
 * Shared stat strip (Home, About). Reads the single source in src/data/stats.js.
 * Pass className for page-specific positioning, e.g. "-mt-20" to overlap a hero.
 */
export default function StatStrip({ className = '' }) {
  return (
    <section aria-label="At a glance" className={`relative z-10 px-4 sm:px-5 lg:px-6 ${className}`}>
      <div className="mx-auto max-w-7xl">
        <dl className="grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={staggerDelay(i)} className="rounded-3xl bg-white p-6 shadow-soft ring-1 ring-primary/10 md:p-8">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary/10 text-secondary">
                <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d={s.icon} />
                </svg>
              </span>
              <div className="mt-6 flex flex-col-reverse">
                <dt className="mt-1 text-sm leading-snug text-text/60">{s.label}</dt>
                <dd className="font-display text-3xl font-semibold tracking-tight text-primary md:text-5xl">
                  {s.value}
                  <span className="font-normal">{s.suffix}</span>
                </dd>
              </div>
            </Reveal>
          ))}
        </dl>
        {STATS_ARE_PLACEHOLDERS && (
          <div className="mt-6 text-center text-text/50">
            <PlaceholderTag>Placeholder figures, replace before launch</PlaceholderTag>
          </div>
        )}
      </div>
    </section>
  )
}
