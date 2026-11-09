// src/pages/CourseDetail.jsx
import { useId, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import CourseFeedState from '../components/CourseFeedState.jsx'
import CTASection from '../components/CTASection.jsx'
import CourseImage from '../components/CourseImage.jsx'
import { ApplyForm, Block, CheckDot, CheckIcon } from '../components/CourseDetailParts.jsx'
import {
  COUNSELLOR_PHONE_DISPLAY,
  COUNSELLOR_PHONE_HREF,
  formatMoney,
  useCourseDetails,
  useCourseList,
} from '../api/courseList.js'

/*
 * Everything course-specific comes from the LMS:
 *   /api/course-list               → name, type, description, fee, dates, image
 *   /api/course-details/{slug}     → highlights, what you'll learn, workshop parts, curriculum modules
 * The API has no FAQs, eligibility, learning outcomes or target audience, so no such sections are shown.
 * Any section whose data is empty for a course is hidden.
 */

const focusRing = 'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary'
const onDarkFocusRing = 'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white'

/**
 * Lead-gen gate for the curriculum. The API has no lock flag, so this is a site rule
 * (agreed with the MGA team): the first FREE_MODULES modules are open, the rest are
 * locked until the visitor submits the apply form on this page.
 */
const FREE_MODULES = 4
const unlockKey = (slug) => `mga-curriculum-unlocked:${slug}`

function readUnlocked(slug) {
  try {
    return window.localStorage.getItem(unlockKey(slug)) === '1'
  } catch {
    return false
  }
}

function saveUnlocked(slug) {
  try {
    window.localStorage.setItem(unlockKey(slug), '1')
  } catch {
    /* storage blocked: the unlock still applies for this visit */
  }
}

/** Cut a long text at a sentence end. */
function shortSummary(text, max = 240) {
  if (!text || text.length <= max) return text
  const cut = text.slice(0, max)
  const end = cut.lastIndexOf('. ')
  if (end > 80) return cut.slice(0, end + 1)
  return `${cut.replace(/\s+\S*$/, '')}…`
}

function scrollToApplyForm() {
  const el = document.getElementById('apply')
  if (!el) return
  el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  el.querySelector('input')?.focus({ preventScroll: true })
}

export default function CourseDetail() {
  const { slug } = useParams()
  const { status, courses, error, retry } = useCourseList()

  if (status !== 'ready') {
    return (
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-5 lg:px-6">
        <CourseFeedState status={status} error={error} onRetry={retry} />
      </section>
    )
  }

  // Match by slug; also accept a numeric id so old /courses/77 links keep working.
  const course = courses.find((c) => c.slug === slug) || courses.find((c) => String(c.id) === slug)

  // Unknown course: send the visitor to the full course list instead of a dead-end page.
  if (!course) return <Navigate to="/courses" replace />

  return <CourseDetailView key={course.slug} course={course} />
}

function CourseDetailView({ course }) {
  const { details } = useCourseDetails(course.slug)
  const [unlocked, setUnlocked] = useState(() => readUnlocked(course.slug))

  const fee = formatMoney(course.fee)
  const totalFee = formatMoney(course.totalFee)

  const glance = [
    { label: 'Duration', value: course.durationLabel },
    { label: 'Programme type', value: course.type },
    { label: 'Registration fee', value: fee },
  ].filter((g) => g.value)

  const onApplied = () => {
    saveUnlocked(course.slug)
    setUnlocked(true)
  }

  return (
    <>
      <title>{`${course.name} | GastroenterologyNow by MGA`}</title>
      <meta name="description" content={shortSummary(course.description, 155)} />

      {/* ── Hero ── */}
      <section className="relative isolate overflow-hidden bg-linear-to-br from-[#0B1F3A] via-[#0C2A44] to-[#0A3B47] text-white">
        <div aria-hidden="true" className="pointer-events-none absolute -top-32 -right-24 -z-10 h-96 w-96 rounded-full bg-[#14B8A6]/25 blur-3xl" />
        <div aria-hidden="true" className="pointer-events-none absolute -bottom-40 -left-24 -z-10 h-96 w-96 rounded-full bg-[#0F7F86]/30 blur-3xl" />

        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-12 sm:px-5 lg:grid-cols-[7fr_5fr] lg:gap-14 lg:px-6 lg:py-16">
          <div>
            <nav aria-label="Breadcrumb" className="text-sm text-white/70">
              <ol className="flex flex-wrap items-center gap-2">
                <li>
                  <Link to="/" className={`rounded hover:text-white ${onDarkFocusRing}`}>Home</Link>
                </li>
                <li aria-hidden="true">/</li>
                <li>
                  <Link to="/courses" className={`rounded hover:text-white ${onDarkFocusRing}`}>Courses</Link>
                </li>
              </ol>
            </nav>

            <div className="mt-5 flex flex-wrap gap-2">
              {course.type && (
                <span className="rounded-full bg-white/15 px-3.5 py-1 text-sm font-semibold backdrop-blur-sm">
                  {course.type}
                </span>
              )}
              {course.durationLabel && (
                <span className="rounded-full bg-white/15 px-3.5 py-1 text-sm font-semibold backdrop-blur-sm">
                  {course.durationLabel}
                </span>
              )}
              {course.popular && (
                <span className="rounded-full bg-gold-light px-3.5 py-1 text-sm font-semibold text-secondary">
                  Popular
                </span>
              )}
            </div>

            <h1 className="mt-4 font-display text-3xl leading-tight font-medium sm:text-4xl lg:text-5xl">
              {course.name}
            </h1>

            {course.description && (
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg">
                {shortSummary(course.description)}
              </p>
            )}

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#apply"
                className={`inline-flex h-13 items-center justify-center gap-2 rounded-full bg-linear-to-r from-[#14B8A6] to-[#0F7F86] px-8 text-lg font-semibold text-white shadow-lg shadow-primary/30 transition duration-300 ease-out hover:-translate-y-0.5 ${onDarkFocusRing}`}
              >
                Apply now <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-md lg:max-w-none">
            <div className="aspect-4/3 overflow-hidden rounded-3xl bg-linear-to-br from-[#D9F3EF] via-[#B6E9E2] to-[#5EEAD4]/60 shadow-2xl ring-1 ring-white/20">
              <CourseImage course={course} className="h-full w-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* ── Body: content + sticky apply card ── */}
      <section className="relative isolate bg-linear-to-b from-[#F4FBFA] via-white to-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-5 lg:grid-cols-[7fr_5fr] lg:gap-12 lg:px-6 lg:py-20">
          {/* Left column */}
          <div className="grid min-w-0 gap-12">
            {glance.length > 0 && (
              <dl className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                {glance.map((g) => (
                  <div key={g.label} className="rounded-2xl bg-white p-4 shadow-soft ring-1 ring-primary/10">
                    <dt className="text-xs font-semibold tracking-wider text-text/50 uppercase">{g.label}</dt>
                    <dd className="mt-1 text-base font-semibold text-secondary">{g.value}</dd>
                  </div>
                ))}
              </dl>
            )}

            {course.description && (
              <Block title="Overview">
                <ExpandableText text={course.description} max={420} />
              </Block>
            )}

            {details?.highlights.length > 0 && (
              <Block title="Program highlights">
                <ul className="grid gap-3 rounded-2xl bg-white p-6 shadow-soft ring-1 ring-primary/10 sm:grid-cols-2">
                  {details.highlights.map((h, i) => (
                    <li key={`${i}-${h}`} className="flex items-start gap-3 text-base leading-relaxed text-text/80">
                      <CheckDot />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </Block>
            )}

            {details?.whatYouLearn.length > 0 && (
              <Block title="What you'll learn">
                <div className="grid gap-4 sm:grid-cols-2">
                  {details.whatYouLearn.map((w, i) => (
                    <article
                      key={w.id ?? i}
                      className="relative overflow-hidden rounded-2xl bg-white p-6 shadow-soft ring-1 ring-primary/10 transition duration-300 ease-out hover:-translate-y-0.5 hover:shadow-soft-lg motion-reduce:transition-none motion-reduce:hover:translate-y-0"
                    >
                      <span aria-hidden="true" className="absolute inset-x-0 top-0 h-1 bg-linear-to-r from-[#14B8A6] to-[#0F7F86]" />
                      <span
                        aria-hidden="true"
                        className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-secondary font-display text-sm font-semibold text-gold-light"
                      >
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      {w.heading && (
                        <h3 className="mt-4 font-display text-lg leading-snug font-semibold text-primary">{w.heading}</h3>
                      )}
                      {w.description && <p className="mt-2 text-base leading-relaxed text-text/80">{w.description}</p>}
                    </article>
                  ))}
                </div>
              </Block>
            )}

            {details?.modules.length > 0 && (
              <Block title="Curriculum">
                <Curriculum modules={details.modules} unlocked={unlocked} onUnlockClick={scrollToApplyForm} />
              </Block>
            )}

            {details?.workshop && (
              <Block title={details.workshop.title || 'Workshops'}>
                {details.workshop.intro && (
                  <div className="mb-5">
                    <ExpandableText text={details.workshop.intro} max={220} />
                  </div>
                )}
                <div className={`grid gap-4 ${details.workshop.parts.length > 1 ? 'md:grid-cols-2' : ''}`}>
                  {details.workshop.parts.map((p, i) => (
                    <WorkshopPanel key={p.id ?? i} part={p} index={i} />
                  ))}
                </div>
              </Block>
            )}

            <Block title="Accreditation">
              <div className="rounded-2xl bg-secondary p-6 text-white">
                <p className="text-base leading-relaxed text-white/85">
                  Medical Global Academy holds Dual CPD &amp; Provider of Training Excellence status with The CPD
                  Standards Office, and is an accredited professional training institution with the American Council
                  of Training and Development.
                </p>
                <ul className="mt-4 flex flex-wrap gap-3">
                  {['CPD Accredited', 'ACTD Accredited'].map((label) => (
                    <li
                      key={label}
                      className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-sm font-semibold text-secondary"
                    >
                      <CheckIcon size={14} />
                      {label}
                    </li>
                  ))}
                </ul>
              </div>
            </Block>
          </div>

          {/* Right column: fees + apply form (sticky on large screens) */}
          <aside className="lg:sticky lg:top-28 lg:self-start" id="apply">
            <div className="overflow-hidden rounded-3xl bg-white shadow-soft-lg ring-1 ring-primary/10">
              <div className="bg-linear-to-br from-[#0B1F3A] to-[#0A3B47] p-6 text-white">
                <p className="text-xs font-semibold tracking-[0.18em] text-[#5EEAD4] uppercase">Registration fee</p>
                <p className="mt-1 font-display text-4xl font-medium">{fee || 'On request'}</p>
                {totalFee && <p className="mt-2 text-sm text-white/75">Total programme cost {totalFee}</p>}
              </div>

              <div className="p-6">
                <h2 className="font-display text-xl font-medium text-primary">Apply for this programme</h2>
                <p className="mt-1 text-sm text-text/70">
                  Fill the form and our team will contact you with course details, batch dates and eligibility.
                </p>
                <ApplyForm course={course} onSubmitted={onApplied} />

                <a
                  href={COUNSELLOR_PHONE_HREF}
                  className={`mt-5 block rounded-xl bg-[#F4FBFA] px-4 py-3 text-center text-sm font-semibold text-primary transition hover:bg-[#E6F7F5] ${focusRing}`}
                >
                  Or call {COUNSELLOR_PHONE_DISPLAY}
                </a>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <CTASection
        title={
          <>
            Ready to start <strong>{course.name}</strong>?
          </>
        }
        text="Reserve your place for the current intake."
        buttonLabel="Book a Seat"
        compact
      />
    </>
  )
}

/* ============================================================================
 * SECTION PIECES
 * ========================================================================== */

/** Short excerpt with a Read more / Read less toggle; plain paragraph when the text is short. */
function ExpandableText({ text, max = 420 }) {
  const [expanded, setExpanded] = useState(false)
  const id = useId()
  const excerpt = shortSummary(text, max)
  const isLong = excerpt !== text

  return (
    <div>
      <p id={id} className="text-base leading-relaxed text-text/80">
        {expanded || !isLong ? text : excerpt}
      </p>
      {isLong && (
        <button
          type="button"
          aria-expanded={expanded}
          aria-controls={id}
          onClick={() => setExpanded((v) => !v)}
          className={`mt-3 inline-flex items-center gap-1.5 rounded-full text-sm font-semibold text-[#0F7F86] hover:text-primary ${focusRing}`}
        >
          {expanded ? 'Read less' : 'Read more'}
          <Chevron className={`transition-transform duration-300 motion-reduce:transition-none ${expanded ? 'rotate-180' : ''}`} />
        </button>
      )}
    </div>
  )
}

function Curriculum({ modules, unlocked, onUnlockClick }) {
  const [open, setOpen] = useState(0)
  const lockedCount = unlocked ? 0 : Math.max(0, modules.length - FREE_MODULES)
  const totalLessons = modules.reduce((n, m) => n + m.lessons.length, 0)

  return (
    <div>
      <p className="mb-4 text-sm font-semibold text-text/60">
        {modules.length} modules · {totalLessons} lessons
      </p>

      <ol className="grid gap-3">
        {modules.map((m, i) => {
          const locked = !unlocked && i >= FREE_MODULES
          const isOpen = !locked && open === i
          const panelId = `module-${m.id ?? i}`
          const lessonLabel = `${m.lessons.length} ${m.lessons.length === 1 ? 'lesson' : 'lessons'}`

          const number = (
            <span
              aria-hidden="true"
              className={`inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full font-display text-sm font-semibold ${
                locked ? 'bg-text/10 text-text/50' : 'bg-secondary text-gold-light'
              }`}
            >
              {i + 1}
            </span>
          )

          if (locked) {
            return (
              <li
                key={panelId}
                aria-disabled="true"
                className="flex items-center gap-4 rounded-2xl bg-white/60 px-5 py-4 opacity-60 ring-1 ring-text/10"
              >
                {number}
                <span className="min-w-0 flex-1">
                  <span className="block font-display text-base leading-snug font-medium text-text/70">{m.title}</span>
                  <span className="mt-0.5 block text-xs font-semibold text-text/50">{lessonLabel}</span>
                </span>
                <span className="inline-flex shrink-0 items-center gap-1.5 text-xs font-semibold tracking-wider text-text/60 uppercase">
                  <LockIcon /> Locked
                </span>
              </li>
            )
          }

          return (
            <li
              key={panelId}
              className={`overflow-hidden rounded-2xl ring-1 transition duration-300 motion-reduce:transition-none ${
                isOpen ? 'bg-support/40 shadow-soft-lg ring-secondary/30' : 'bg-white shadow-soft ring-primary/10'
              }`}
            >
              <h3>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpen(isOpen ? null : i)}
                  className={`flex w-full items-center gap-4 rounded-2xl px-5 py-4 text-left ${focusRing}`}
                >
                  {number}
                  <span className="min-w-0 flex-1">
                    <span className="block font-display text-base leading-snug font-medium text-primary">{m.title}</span>
                    <span className="mt-0.5 block text-xs font-semibold text-text/60">{lessonLabel}</span>
                  </span>
                  <span
                    aria-hidden="true"
                    className={`inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-white transition duration-300 motion-reduce:transition-none ${
                      isOpen ? 'rotate-180 bg-secondary' : 'bg-primary'
                    }`}
                  >
                    <Chevron />
                  </span>
                </button>
              </h3>
              {isOpen && m.lessons.length > 0 && (
                <ul id={panelId} className="grid gap-2.5 px-5 pb-5 pl-[4.25rem]">
                  {m.lessons.map((lesson, j) => (
                    <li key={`${j}-${lesson}`} className="flex items-start gap-2.5 text-sm leading-relaxed text-text/80">
                      <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#14B8A6]" />
                      <span>{lesson}</span>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          )
        })}
      </ol>

      {lockedCount > 0 && (
        <div className="mt-4 flex flex-col items-start gap-3 rounded-2xl border border-dashed border-gold-light bg-gold-light/15 p-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="flex items-center gap-2.5 text-sm font-semibold text-secondary">
            <LockIcon />
            {lockedCount} more {lockedCount === 1 ? 'module is' : 'modules are'} locked. Fill the form to unlock.
          </p>
          <button
            type="button"
            onClick={onUnlockClick}
            className={`inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-full bg-linear-to-r from-[#14B8A6] to-[#0F7F86] px-5 text-sm font-semibold text-white shadow-soft transition duration-300 ease-out hover:-translate-y-0.5 motion-reduce:transition-none motion-reduce:hover:translate-y-0 ${focusRing}`}
          >
            Unlock full curriculum <span aria-hidden="true">→</span>
          </button>
        </div>
      )}
    </div>
  )
}

function WorkshopPanel({ part, index }) {
  const dark = index % 2 === 1
  return (
    <div
      className={`rounded-2xl p-6 ring-1 ${
        dark ? 'bg-secondary text-white ring-secondary' : 'bg-white shadow-soft ring-primary/10'
      }`}
    >
      <p className={`text-xs font-semibold tracking-[0.18em] uppercase ${dark ? 'text-gold-light' : 'text-[#0F7F86]'}`}>
        Part {index + 1}
      </p>
      {part.title && (
        <h3 className={`mt-1 font-display text-xl font-medium ${dark ? 'text-white' : 'text-primary'}`}>{part.title}</h3>
      )}
      {part.subtitle && (
        <p className={`mt-2 text-sm leading-relaxed ${dark ? 'text-white/80' : 'text-text/70'}`}>{part.subtitle}</p>
      )}
      {part.points.length > 0 && (
        <ul className="mt-4 grid gap-2.5">
          {part.points.map((pt, j) => (
            <li key={`${j}-${pt}`} className={`flex items-start gap-2.5 text-sm leading-relaxed ${dark ? 'text-white/90' : 'text-text/80'}`}>
              <span
                aria-hidden="true"
                className={`mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                  dark ? 'bg-white/15 text-gold-light' : 'bg-[#D9F3EF] text-[#0F9D8F]'
                }`}
              >
                <CheckIcon size={12} />
              </span>
              <span>{pt}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

function Chevron({ className = '' }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className}>
      <path d="M6 9l6 6 6-6" />
    </svg>
  )
}

function LockIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="5" y="11" width="14" height="10" rx="2" />
      <path d="M8 11V7a4 4 0 018 0v4" />
    </svg>
  )
}
