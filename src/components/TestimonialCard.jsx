import Placeholder from './Placeholder.jsx'

/** testimonial: { quote, name, role } */
export default function TestimonialCard({ testimonial }) {
  const { quote, name, role } = testimonial
  return (
    <figure className="flex h-full flex-col rounded-3xl bg-white p-8 shadow-soft transition duration-300 ease-out hover:-translate-y-1 hover:shadow-soft-lg">
      <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary/10 text-secondary">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M9 7H6a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h2v1a3 3 0 0 1-3 3M19 7h-3a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h2v1a3 3 0 0 1-3 3" />
        </svg>
      </span>
      <blockquote className="mt-6 flex-1 text-base leading-relaxed text-text/80 md:text-lg">
        <Placeholder>{quote}</Placeholder>
      </blockquote>
      <figcaption className="mt-8">
        <p className="font-semibold text-text">
          <Placeholder>{name}</Placeholder>
        </p>
        <p className="mt-1 text-sm text-text/60">
          <Placeholder>{role}</Placeholder>
        </p>
      </figcaption>
    </figure>
  )
}
