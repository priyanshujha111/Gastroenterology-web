import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import Breadcrumb from '../components/Breadcrumb.jsx'
import { useCourseList } from '../api/courseList.js'
import { doctors } from '../data/doctors.js'

/* ============================================================================
 * HTML sitemap (/sitemap). Static pages are listed below; courses come live from the
 * LMS feed (same hook as the Courses page) and doctors from data/doctors.js, so new
 * courses and doctors appear here automatically.
 * Jab bhi naya page bane, usse yahan `staticGroups` me add karna.
 * ========================================================================== */
const staticGroups = [
  {
    title: 'Main pages',
    links: [
      { to: '/', label: 'Home' },
      { to: '/about', label: 'About us' },
      { to: '/courses', label: 'All courses' },
      { to: '/doctors', label: 'Our doctors' },
    ],
  },
  {
    title: 'Course types',
    links: [
      { to: '/courses?type=Certificate', label: 'Certificate courses' },
      { to: '/courses?type=Fellowship', label: 'Fellowship' },
      { to: '/courses?type=Pg Diploma', label: 'PG Diploma' },
    ],
  },
  {
    title: 'Help & legal',
    links: [
      { to: '/support', label: 'Support' },
      { to: '/privacy-policy', label: 'Privacy Policy' },
      { to: '/terms', label: 'Terms & Conditions' },
      { to: '/refund-policy', label: 'Refund & Cancellation Policy' },
    ],
  },
]

const focusRing = 'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary'
const linkClass = `group inline-flex items-start gap-2 rounded text-base text-text/80 transition-colors hover:text-primary ${focusRing}`

function LinkList({ links }) {
  return (
    <ul className="mt-4 grid gap-2.5">
      {links.map((l) => (
        <li key={l.to}>
          <Link to={l.to} className={linkClass}>
            <span aria-hidden="true" className="mt-[0.6rem] h-1.5 w-1.5 shrink-0 rounded-full bg-secondary transition-transform group-hover:scale-125" />
            <span className="group-hover:underline group-hover:decoration-primary/40 group-hover:underline-offset-4">{l.label}</span>
          </Link>
        </li>
      ))}
    </ul>
  )
}

function Card({ title, children }) {
  return (
    <section className="rounded-3xl bg-white p-6 shadow-soft ring-1 ring-primary/10 sm:p-8">
      <h2 className="font-display text-2xl leading-snug font-medium text-primary">{title}</h2>
      {children}
    </section>
  )
}

function CoursesCard() {
  const { status, courses, retry } = useCourseList()

  // Group by course type (Certificate, Fellowship, …); untyped courses go under "Other".
  const groups = useMemo(() => {
    const byType = new Map()
    for (const c of courses) {
      const type = c.type || 'Other'
      if (!byType.has(type)) byType.set(type, [])
      byType.get(type).push({ to: `/courses/${c.slug}`, label: c.name })
    }
    return [...byType.entries()].map(([type, links]) => ({
      type,
      links: links.sort((a, b) => a.label.localeCompare(b.label)),
    }))
  }, [courses])

  return (
    <Card title="Courses">
      {status === 'loading' && (
        <div className="mt-4 grid gap-2.5" aria-busy="true" aria-label="Loading courses">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="h-5 w-3/4 animate-pulse rounded bg-support" />
          ))}
        </div>
      )}

      {status === 'error' && (
        <p className="mt-4 text-base text-text/70">
          We couldn’t load the course list right now.{' '}
          <button type="button" onClick={retry} className={`font-medium text-primary underline underline-offset-4 ${focusRing}`}>
            Try again
          </button>
        </p>
      )}

      {(status === 'empty' || status === 'not-configured') && (
        <p className="mt-4 text-base text-text/70">
          Our Gastroenterology programmes will appear here shortly. See{' '}
          <Link to="/courses" className={`font-medium text-primary underline underline-offset-4 ${focusRing}`}>
            all courses
          </Link>
          .
        </p>
      )}

      {status === 'ready' &&
        groups.map((g) => (
          <div key={g.type} className="mt-6 first:mt-4">
            <h3 className="text-xs font-semibold tracking-[0.15em] text-secondary uppercase">{g.type}</h3>
            <LinkList links={g.links} />
          </div>
        ))}
    </Card>
  )
}

export default function Sitemap() {
  const doctorLinks = doctors.map((d) => ({ to: `/doctors/${d.id}`, label: d.name }))

  return (
    <>
      <title>Sitemap | GastroenterologyNow</title>
      <meta
        name="description"
        content="Every page on GastroenterologyNow by Medical Global Academy: courses, doctors, support and legal pages."
      />

      {/* Header band (same pattern as the legal pages) */}
      <section className="relative isolate overflow-hidden bg-linear-to-b from-support to-transparent">
        <div aria-hidden="true" className="pointer-events-none absolute -top-32 -right-32 -z-10 h-96 w-96 rounded-full bg-primary-light/15 blur-3xl" />
        <div className="mx-auto max-w-7xl px-4 pt-16 pb-10 sm:px-5 md:pt-24 md:pb-14 lg:px-6">
          <Breadcrumb items={[{ label: 'Sitemap' }]} />
          <p className="mt-6 text-xs font-semibold tracking-[0.2em] text-secondary uppercase">Navigate</p>
          <h1 className="mt-3 font-display text-4xl leading-tight font-medium text-primary md:text-5xl">Sitemap</h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-text/70 md:text-lg">
            Every page on our website in one place: courses, faculty, support and policies.
          </p>
        </div>
      </section>

      {/* 375px: 1 column · 768px: 2 columns · 1024px+: 3 columns */}
      <div className="mx-auto grid max-w-7xl items-start gap-6 px-4 pt-6 pb-24 sm:px-5 md:grid-cols-2 md:pb-32 lg:grid-cols-3 lg:px-6">
        {staticGroups.slice(0, 2).map((g) => (
          <Card key={g.title} title={g.title}>
            <LinkList links={g.links} />
          </Card>
        ))}
        <Card title="Doctors">
          <LinkList links={doctorLinks} />
        </Card>
        <div className="md:col-span-2">
          <CoursesCard />
        </div>
        <Card title={staticGroups[2].title}>
          <LinkList links={staticGroups[2].links} />
        </Card>
      </div>
    </>
  )
}
