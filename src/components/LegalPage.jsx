import { Link } from 'react-router-dom'
import Breadcrumb from './Breadcrumb.jsx'

/**
 * Shared layout for legal pages (Privacy Policy, Terms & Conditions, …). One implementation, so
 * every legal page has the same header band, sticky contents list, section cards and contact card.
 *
 * Props:
 *   title          page title (also the breadcrumb label), e.g. 'Terms & Conditions'
 *   intro          short paragraph under the title
 *   lastUpdated    display string, e.g. 'September 25, 2026'
 *   sections       [{ title, blocks: [...] }]   (see block types below)
 *   contentsLabel  accessible name of the contents list, e.g. 'Terms contents'
 *   contactTitle   heading of the contact card at the end, e.g. 'Questions about these terms?'
 *   email          address used in the contact card button
 *   links          strings inside the text that become links: [{ text, href }] (href starting
 *                  with "/" = internal route, "mailto:"/"http" = normal link). Longest match wins,
 *                  so an email containing the domain is linked as the email, not the domain.
 *
 * Block types:
 *   { type: 'p',  text }                                  paragraph
 *   { type: 'h',  text }                                  small sub-heading
 *   { type: 'ul', items: [string | { label, text }] }     bullet list
 *   { type: 'lines', lines: [string] }                    short address-style lines (first line bold)
 */

const focusRing = 'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary'
const inlineLinkClass = `rounded font-medium text-primary underline decoration-primary/30 underline-offset-4 transition-colors hover:text-primary-dark hover:decoration-primary ${focusRing}`

const escapeRegExp = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

/** Splits text on the configured link strings and renders each match as a link. */
function RichText({ text, links }) {
  if (!links.length) return text
  const pattern = new RegExp(
    `(${[...links].sort((a, b) => b.text.length - a.text.length).map((l) => escapeRegExp(l.text)).join('|')})`,
  )
  return text.split(pattern).map((part, i) => {
    const link = i % 2 === 1 ? links.find((l) => l.text === part) : null
    if (!link) return <span key={i}>{part}</span>
    if (link.href.startsWith('/')) {
      return (
        <Link key={i} to={link.href} className={inlineLinkClass}>
          {part}
        </Link>
      )
    }
    const external = link.href.startsWith('http')
    return (
      <a
        key={i}
        href={link.href}
        className={inlineLinkClass}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {part}
      </a>
    )
  })
}

function Block({ block, links }) {
  if (block.type === 'h') {
    return <h3 className="mt-6 font-display text-lg font-medium text-primary first:mt-0">{block.text}</h3>
  }

  if (block.type === 'ul') {
    return (
      <ul className="mt-4 grid gap-3 first:mt-0">
        {block.items.map((item, i) => {
          const isLabelled = typeof item === 'object'
          return (
            <li key={i} className="flex gap-3 text-base leading-relaxed text-text/80">
              <span aria-hidden="true" className="mt-[0.6rem] h-1.5 w-1.5 shrink-0 rounded-full bg-secondary" />
              <span>
                {isLabelled ? (
                  <>
                    <strong className="font-semibold text-text">{item.label}:</strong>{' '}
                    <RichText text={item.text} links={links} />
                  </>
                ) : (
                  <RichText text={item} links={links} />
                )}
              </span>
            </li>
          )
        })}
      </ul>
    )
  }

  if (block.type === 'lines') {
    return (
      <address className="mt-4 grid gap-1 rounded-2xl bg-support px-5 py-4 text-base leading-relaxed text-text/80 not-italic first:mt-0">
        {block.lines.map((line, i) => (
          <span key={i} className={i === 0 ? 'font-semibold text-text' : undefined}>
            <RichText text={line} links={links} />
          </span>
        ))}
      </address>
    )
  }

  return (
    <p className="mt-4 text-base leading-relaxed text-text/80 first:mt-0">
      <RichText text={block.text} links={links} />
    </p>
  )
}

const sectionId = (i) => `section-${i + 1}`

export default function LegalPage({
  title,
  intro,
  lastUpdated,
  sections,
  contentsLabel = `${title} contents`,
  contactTitle,
  email,
  links = [],
}) {
  return (
    <>
      {/* Header band */}
      <section className="relative isolate overflow-hidden bg-linear-to-b from-support to-transparent">
        <div aria-hidden="true" className="pointer-events-none absolute -top-32 -right-32 -z-10 h-96 w-96 rounded-full bg-primary-light/15 blur-3xl" />
        <div className="mx-auto max-w-7xl px-4 pt-16 pb-10 sm:px-5 md:pt-24 md:pb-14 lg:px-6">
          <Breadcrumb items={[{ label: title }]} />

          <p className="mt-6 text-xs font-semibold tracking-[0.2em] text-secondary uppercase">Legal</p>
          <h1 className="mt-3 font-display text-4xl leading-tight font-medium text-primary md:text-5xl">{title}</h1>
          {intro && <p className="mt-4 max-w-2xl text-base leading-relaxed text-text/70 md:text-lg">{intro}</p>}
          {lastUpdated && (
            <p className="mt-5 inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-sm font-medium text-text/70 shadow-soft ring-1 ring-primary/10">
              Last updated: <time>{lastUpdated}</time>
            </p>
          )}
        </div>
      </section>

      {/* Body: contents list + text. 375/768px: stacked · 1024px+: sticky 18rem contents column. */}
      <div className="mx-auto grid max-w-7xl gap-10 px-4 pt-6 pb-24 sm:px-5 md:pb-32 lg:grid-cols-[18rem_minmax(0,1fr)] lg:gap-14 lg:px-6">
        <aside className="lg:sticky lg:top-28 lg:self-start">
          <nav aria-label={contentsLabel} className="rounded-3xl bg-white p-6 shadow-soft ring-1 ring-primary/10">
            <p className="font-display text-base font-medium text-primary">Contents</p>
            <ol className="mt-4 grid gap-1 lg:max-h-[calc(100vh-14rem)] lg:overflow-y-auto">
              {sections.map((s, i) => (
                <li key={s.title}>
                  <a
                    href={`#${sectionId(i)}`}
                    className={`block rounded-lg px-3 py-1.5 text-sm text-text/70 transition-colors hover:bg-support hover:text-primary ${focusRing}`}
                  >
                    {s.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </aside>

        <article className="min-w-0">
          <div className="grid gap-6">
            {sections.map((s, i) => (
              <section
                key={s.title}
                id={sectionId(i)}
                aria-labelledby={`${sectionId(i)}-title`}
                className="scroll-mt-28 rounded-3xl bg-white p-6 shadow-soft ring-1 ring-primary/10 sm:p-8"
              >
                <h2 id={`${sectionId(i)}-title`} className="font-display text-2xl leading-snug font-medium text-primary">
                  {s.title}
                </h2>
                <div className="mt-4">
                  {s.blocks.map((b, j) => (
                    <Block key={j} block={b} links={links} />
                  ))}
                </div>
              </section>
            ))}
          </div>

          {/* Contact card */}
          {email && (
            <div className="mt-10 rounded-3xl bg-linear-to-b from-support to-support/40 p-6 ring-1 ring-primary/10 sm:p-8">
              <p className="font-display text-xl font-medium text-primary">{contactTitle}</p>
              <p className="mt-2 text-base leading-relaxed text-text/75">Write to us and we will get back to you.</p>
              <a
                href={`mailto:${email}`}
                className={`mt-5 inline-flex h-12 items-center justify-center rounded-xl bg-primary px-6 font-semibold text-white shadow-soft transition duration-300 ease-out hover:-translate-y-0.5 hover:bg-primary-dark hover:shadow-soft-lg ${focusRing}`}
              >
                {email}
              </a>
            </div>
          )}
        </article>
      </div>
    </>
  )
}
