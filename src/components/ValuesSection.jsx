import Reveal from './Reveal.jsx'
import SectionHeading from './SectionHeading.jsx'
import { staggerDelay } from '../hooks/useReveal.js'
import { values as defaultValues } from '../data/about.js'

/**
 * Generic values grid, not specialty-specific. Any page can reuse it.
 * Props: eyebrow, title (node; <strong> for emphasis), intro, values [{ title, line, icon }]
 */
export default function ValuesSection({
  eyebrow = 'Our Values',
  title = (
    <>
      What we <strong>stand for</strong>
    </>
  ),
  intro = 'The principles behind how every Medical Global Academy programme is built and taught.',
  values = defaultValues,
}) {
  return (
    <section className="relative isolate overflow-hidden bg-linear-to-b from-transparent via-support/60 to-transparent">
      <div aria-hidden="true" className="pointer-events-none absolute top-1/4 -right-40 -z-10 h-96 w-96 rounded-full bg-primary-light/15 blur-3xl" />
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-5 md:py-20 lg:px-6">
        <Reveal>
          <SectionHeading align="center" eyebrow={eyebrow} title={title} intro={intro} />
        </Reveal>
        <ul className="mt-10 grid gap-6 sm:grid-cols-2 md:mt-12 md:gap-8 lg:grid-cols-4">
          {values.map((v, i) => (
            <Reveal
              as="li"
              key={v.title}
              delay={staggerDelay(i)}
              className="group rounded-3xl bg-white p-8 shadow-soft ring-1 ring-primary/10 transition duration-300 ease-out hover:-translate-y-1 hover:shadow-soft-lg"
            >
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary transition duration-300 ease-out motion-reduce:transition-none group-hover:bg-linear-to-br group-hover:from-primary group-hover:to-primary-dark group-hover:text-white">
                <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d={v.icon} />
                </svg>
              </span>
              <h3 className="mt-8 font-display text-xl leading-snug font-medium text-primary">{v.title}</h3>
              <p className="mt-2 text-base leading-relaxed text-text/75">{v.line}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
