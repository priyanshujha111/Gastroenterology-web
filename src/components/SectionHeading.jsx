/**
 * Section heading: one type scale for every section.
 *
 * Mixed-weight emphasis: wrap the key word(s) of `title` in <strong> and they
 * render semibold in primary teal; the rest of the headline stays regular weight.
 *   title={<>Featured <strong>Gastroenterology</strong> courses</>}
 */
export default function SectionHeading({ eyebrow, title, intro, align = 'left', className = '' }) {
  const centered = align === 'center'
  return (
    <div className={`${centered ? 'mx-auto text-center' : ''} max-w-3xl ${className}`}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2 className="mt-4 font-display text-3xl leading-[1.1] font-normal tracking-tight text-text md:text-5xl [&_strong]:font-semibold [&_strong]:text-primary">
        {title}
      </h2>
      {intro && (
        <p className={`mt-6 max-w-2xl text-base leading-relaxed text-text/70 md:text-lg ${centered ? 'mx-auto' : ''}`}>
          {intro}
        </p>
      )}
    </div>
  )
}

/** Small pill label above headings. */
export function Eyebrow({ children, className = '' }) {
  return (
    <p
      className={`inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-primary ${className}`}
    >
      <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-secondary" />
      {children}
    </p>
  )
}
