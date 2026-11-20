import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import Breadcrumb from '../components/Breadcrumb.jsx'
import CourseFeedState from '../components/CourseFeedState.jsx'
import CTASection from '../components/CTASection.jsx'
import CourseImage from '../components/CourseImage.jsx'
import { COUNSELLOR_PHONE_DISPLAY, useCourseList } from '../api/courseList.js'

const focusRing = 'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary'

export default function Courses() {
  const { status, courses, error, retry } = useCourseList()
  const [activeType, setActiveType] = useState('All')

  const types = useMemo(() => ['All', ...new Set(courses.map((c) => c.type).filter(Boolean))], [courses])
  const visible = activeType === 'All' ? courses : courses.filter((c) => c.type === activeType)

  return (
    <>
      <title>Gastroenterology Courses | GastroenterologyNow by MGA</title>
      <meta
        name="description"
        content="Explore Gastroenterology certificate, fellowship and PG diploma programmes for doctors from Medical Global Academy."
      />

      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-linear-to-br from-[#0B1F3A] via-[#0C2A44] to-[#0A3B47] text-white">
        <div aria-hidden="true" className="pointer-events-none absolute -top-32 -right-24 -z-10 h-96 w-96 rounded-full bg-[#14B8A6]/25 blur-3xl" />
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-5 lg:px-6 lg:py-20">
          <Breadcrumb tone="dark" items={[{ label: 'Courses' }]} />
          <h1 className="mt-5 font-display text-3xl leading-tight font-medium sm:text-4xl lg:text-5xl">
            Gastroenterology programmes for doctors
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg">
            Certificate, fellowship and PG diploma programmes from Medical Global Academy, built around your clinical work.
          </p>
        </div>
      </section>

      {/* Listing */}
      <section className="bg-linear-to-b from-[#F4FBFA] via-white to-white">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-5 lg:px-6 lg:py-20">
          <p className="mb-8 max-w-3xl border-l-2 border-primary/30 pl-3 text-xs leading-relaxed text-pretty text-text/60">
            Please Note: This is not a 2-year Government PG Diploma program. The course is a professional
            upskilling/certification 1-Year program designed for eligible medical professionals.
          </p>
          {status !== 'ready' ? (
            <CourseFeedState status={status} error={error} onRetry={retry} />
          ) : (
            <>
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div role="group" aria-label="Filter by programme type" className="flex flex-wrap gap-2">
                  {types.map((t) => {
                    const active = t === activeType
                    return (
                      <button
                        key={t}
                        type="button"
                        aria-pressed={active}
                        onClick={() => setActiveType(t)}
                        className={`h-10 rounded-full px-5 text-sm font-semibold transition ${focusRing} ${
                          active
                            ? 'bg-primary text-white shadow-soft'
                            : 'bg-white text-secondary ring-1 ring-primary/15 hover:bg-[#F4FBFA]'
                        }`}
                      >
                        {t}
                      </button>
                    )
                  })}
                </div>
                <p className="text-sm text-text/70">
                  {visible.length} {visible.length === 1 ? 'programme' : 'programmes'}
                </p>
              </div>

              <ul className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
                {visible.map((course) => (
                  <li key={course.id ?? course.slug}>
                    <CourseListCard course={course} />
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </section>

      <CTASection
        title="Not sure which programme fits you?"
        text={`Talk to our counsellor on ${COUNSELLOR_PHONE_DISPLAY} and we will help you choose.`}
        buttonLabel="Book a Seat"
        compact
      />
    </>
  )
}

function ClockIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  )
}

function CourseListCard({ course }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-soft ring-1 ring-black/5 transition duration-300 ease-out hover:-translate-y-1 hover:shadow-soft-lg motion-reduce:transition-none motion-reduce:hover:translate-y-0">
      {/* Image + type badge */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <CourseImage
          course={course}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105 motion-reduce:transition-none"
        />
        <div className="absolute top-3 left-3 flex flex-wrap gap-2">
          {course.type && (
            <span className="rounded-full bg-[#1E5BB8] px-3.5 py-1 text-xs font-semibold text-white shadow-soft">
              {course.type}
            </span>
          )}
          {course.popular && (
            <span className="rounded-full bg-gold-light px-3.5 py-1 text-xs font-semibold text-secondary">
              Popular
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        {/* Pills */}
        <div className="flex flex-wrap gap-2">
          {course.durationLabel && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#EEF2F7] px-3 py-1.5 text-xs font-semibold text-[#0B1F3A]">
              <ClockIcon />
              {course.durationLabel}
            </span>
          )}
          <span className="inline-flex items-center rounded-full bg-[#EEF2F7] px-3 py-1.5 text-xs font-semibold text-text/60">
            All levels
          </span>
        </div>

        <h2 className="mt-4 text-xl leading-snug font-bold text-[#0B1F3A]">{course.name}</h2>

        {course.description && (
          <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-text/70">{course.description}</p>
        )}

        <Link
          to={`/courses/${course.slug}`}
          className={`mt-auto inline-flex items-center gap-1.5 self-start rounded pt-5 text-sm font-bold text-[#F26B3A] transition hover:gap-2.5 ${focusRing}`}
        >
          View program <span aria-hidden="true">→</span>
        </Link>
      </div>
    </article>
  )
}