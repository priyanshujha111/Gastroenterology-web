import { Eyebrow as PillEyebrow } from './SectionHeading.jsx'

/**
 * Flexible hero.
 *
 * variant="asymmetric" — Home: oversized left-weighted headline (7/12 cols) with an
 *   `aside` dropped lower on the right, over soft blurred colour blobs. Leaves extra
 *   bottom padding so a following block (e.g. the stat strip) can overlap it.
 *   Wrap the key word of `title` in <strong> for semibold teal emphasis.
 * variant="page" (default) — inner pages: left-aligned title band on soft sage.
 *
 * Props: eyebrow, title, intro, actions (node), aside (node, asymmetric only), children.
 */
export default function Hero({ variant = 'page', eyebrow, title, intro, actions, aside, children }) {
  if (variant === 'asymmetric') {
    return (
      <section className="relative isolate overflow-hidden">
        {/* Soft colour mesh: large blurred blobs bleeding off the edges */}
        <div aria-hidden="true" className="pointer-events-none absolute -top-48 -right-40 -z-10 h-[40rem] w-[40rem] rounded-full bg-support/80 blur-3xl" />
        <div aria-hidden="true" className="pointer-events-none absolute top-48 right-1/4 -z-10 h-80 w-80 rounded-full bg-primary-light/15 blur-3xl" />
        <div aria-hidden="true" className="pointer-events-none absolute -bottom-48 -left-48 -z-10 h-[32rem] w-[32rem] rounded-full bg-primary/10 blur-3xl" />

        <div className="mx-auto grid max-w-7xl gap-12 px-4 pt-12 pb-24 sm:px-5 lg:grid-cols-12 lg:gap-8 lg:px-6 lg:pt-20 lg:pb-32">
          <div className="lg:col-span-7">
            {eyebrow && <PillEyebrow>{eyebrow}</PillEyebrow>}
            <h1 className="mt-6 font-display text-4xl leading-[1.05] font-normal tracking-tight text-text sm:text-5xl md:text-6xl [&_strong]:font-semibold [&_strong]:text-primary">
              {title}
            </h1>
            {intro && <p className="mt-8 max-w-xl text-lg leading-relaxed text-text/70 md:text-xl">{intro}</p>}
            {actions && <div className="mt-10 flex flex-wrap items-center gap-4">{actions}</div>}
          </div>
          {aside && <div className="lg:col-span-5 lg:pt-32">{aside}</div>}
        </div>
      </section>
    )
  }

  return (
    <section className="relative overflow-hidden border-b border-primary/10 bg-support/60">
      <div
        aria-hidden="true"
        className="absolute -top-20 -right-20 h-72 w-72 rounded-full border-[32px] border-primary-light/10"
      />
      <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-5 lg:px-6 lg:py-20">
        {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
        <h1 className="max-w-3xl font-display text-4xl leading-tight font-medium tracking-tight text-primary lg:text-5xl">
          {title}
        </h1>
        {intro && <p className="mt-5 max-w-2xl text-lg leading-relaxed text-text/75">{intro}</p>}
        {actions && <div className="mt-8 flex flex-wrap gap-3">{actions}</div>}
        {children}
      </div>
    </section>
  )
}

// Original line-style eyebrow, still used by the "page" variant (inner pages).
function Eyebrow({ children }) {
  return (
    <p className="mb-5 inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-secondary">
      <span aria-hidden="true" className="h-px w-8 bg-secondary" />
      {children}
    </p>
  )
}
