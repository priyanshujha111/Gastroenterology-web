import { Link } from 'react-router-dom'

/**
 * Site-wide breadcrumb. One implementation for every inner page.
 *
 *   <Breadcrumb items={[{ label: 'Doctors', to: '/doctors' }, { label: doctor.name }]} />
 *
 * - "Home" (→ /) is always added as the first crumb, so pages pass only what comes after it.
 * - Every crumb except the last is a link (pass `to`). The last crumb is the current page:
 *   plain text with aria-current="page", never a link, and truncated with an ellipsis if long
 *   (full text in the title tooltip), so a long course name can't break the layout.
 * - tone="light" (default) for light backgrounds; tone="dark" for the navy/teal heroes.
 *   Contrast: light = primary links 5.7:1+, navy current page 13:1+;
 *             dark  = white/80 links, white current page on navy 10:1+.
 */
const tones = {
  light: {
    link: 'font-medium text-primary hover:text-primary-dark hover:underline',
    separator: 'text-text/40',
    current: 'font-semibold text-secondary',
    focus: 'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary',
  },
  dark: {
    link: 'font-medium text-white/80 hover:text-white hover:underline',
    separator: 'text-white/40',
    current: 'font-semibold text-white',
    focus: 'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white',
  },
}

export default function Breadcrumb({ items = [], tone = 'light', className = '' }) {
  const t = tones[tone] ?? tones.light
  const crumbs = [{ label: 'Home', to: '/' }, ...items]

  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm">
        {crumbs.map((crumb, i) => {
          const isCurrent = i === crumbs.length - 1
          return (
            <li key={`${i}-${crumb.label}`} className="flex min-w-0 items-center gap-2">
              {i > 0 && (
                <span aria-hidden="true" className={t.separator}>
                  ›
                </span>
              )}
              {isCurrent ? (
                <span
                  aria-current="page"
                  title={crumb.label}
                  className={`block max-w-[14rem] truncate sm:max-w-sm md:max-w-md ${t.current}`}
                >
                  {crumb.label}
                </span>
              ) : (
                <Link to={crumb.to} className={`rounded ${t.link} ${t.focus}`}>
                  {crumb.label}
                </Link>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
