import { Link } from 'react-router-dom'

/**
 * Final call-to-action band. White button on the blue band: the band itself is the brand colour, so the action is the contrasting surface.
 * `title` accepts a node; wrap key words in <strong> for semibold emphasis.
 * Top padding is left to the preceding section so the rhythm doesn't double up.
 */
export default function CTASection({
  title = 'Ready to deepen your expertise in gastroenterology?',
  text,
  buttonLabel = 'Enroll Now',
  to = '/courses',
  compact = false, // tighter vertical rhythm (Home)
}) {
  return (
    <section className={`px-4 sm:px-5 lg:px-6 ${compact ? 'pb-16 md:pb-20' : 'pb-24 md:pb-32'}`}>
      <div
        className={`relative isolate mx-auto max-w-7xl overflow-hidden rounded-3xl bg-linear-to-br from-primary to-primary-dark shadow-soft-lg ${
          compact ? 'px-6 py-12 sm:px-10 md:px-14 md:py-16' : 'px-8 py-16 sm:px-12 md:px-16 md:py-20'
        }`}
      >
        {/* Brass hairline along the top edge, matching the Home accreditation panel */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-gold-light/70 to-transparent" />
        <div aria-hidden="true" className="pointer-events-none absolute -top-32 -right-24 -z-10 h-96 w-96 rounded-full bg-primary-light/40 blur-3xl" />
        <div aria-hidden="true" className="pointer-events-none absolute -bottom-40 left-1/4 -z-10 h-80 w-80 rounded-full bg-secondary/30 blur-3xl" />

        <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <h2 className="font-display text-3xl leading-[1.1] font-normal tracking-tight text-white md:text-5xl [&_strong]:font-semibold">
              {title}
            </h2>
            {text && <p className="mt-6 text-base leading-relaxed text-white/80 md:text-lg">{text}</p>}
          </div>
          <Link
            to={to}
            className="inline-flex h-12 shrink-0 items-center justify-center gap-2 self-start rounded-xl bg-white px-8 font-semibold text-primary-dark shadow-lg shadow-text/10 hover:bg-support transition duration-300 ease-out hover:-translate-y-0.5 hover:shadow-xl hover:shadow-text/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white lg:self-center"
          >
            {buttonLabel} <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  )
}
