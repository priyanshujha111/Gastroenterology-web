import { Link } from 'react-router-dom'
import SectionHeading, { Eyebrow } from '../components/SectionHeading.jsx'
import Reveal from '../components/Reveal.jsx'
import StatStrip from '../components/StatStrip.jsx'
import ValuesSection from '../components/ValuesSection.jsx'
import { RibbonTrace, RibbonPattern } from '../components/RibbonArt.jsx'
import CourseFeedState from '../components/CourseFeedState.jsx'
import { staggerDelay } from '../hooks/useReveal.js'
import { useGastroCourses } from '../api/lms.js'
import {
  specialties,
  offerings,
  recognitions,
  approach,
  learningModes,
} from '../data/about.js'

const focusRing = 'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary'
const onDarkFocusRing = 'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white'

function Icon({ path, className = 'h-6 w-6' }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={path} />
    </svg>
  )
}

/**
 * Soft rounded icon tile. Default = Home's IconTile hover-fill (tealTileHover below): teal icon
 * on primary/10, and inside a `group` the tile fills with the teal gradient and the icon turns
 * white. Pass `className` for tiles on teal cards (e.g. bg-white/15 text-white).
 */
function IconTile({ path, className = tealTileHover }) {
  return (
    <span className={`inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${className}`}>
      <Icon path={path} />
    </span>
  )
}

const arrow = (
  <svg viewBox="0 0 20 20" className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M4 10h12 M11 5l5 5-5 5" />
  </svg>
)

const clockPath = 'M12 20a8 8 0 100-16 8 8 0 000 16z M12 8v4l3 2'
const heartPath = 'M12 20s-7-4.4-7-9.5A4 4 0 0112 8a4 4 0 017 2.5C19 15.6 12 20 12 20z'

// Same hover-fill as Home's "Why MGA" tiles: teal icon on primary/10 (5.48:1); inside a
// `group`, the tile fills with the teal gradient and the icon turns white (6.35:1+).
const tealTileHover =
  'bg-primary/10 text-primary transition duration-300 ease-out motion-reduce:transition-none group-hover:bg-linear-to-br group-hover:from-primary group-hover:to-primary-dark group-hover:text-white'

// Decorative icons for the programme cards, reused from this page's own data; rotated by index.
const courseIcons = [...approach, ...learningModes].map((item) => item.icon)

const promiseChips =['Trusted', 'Accredited', 'Career focused']

// Same-height card base used across the page: no stagger, no gaps, content fills the card.
const cardBase = 'rounded-3xl p-8 md:p-10'

export default function About() {
  const { status, courses, error, retry } = useGastroCourses()

  return (
    <>
      <title>About | GastroenterologyNow by Medical Global Academy</title>
      <meta
        name="description"
        content="About Medical Global Academy: CPD & ACTD accredited PG Diplomas, Fellowships and Certificates, including Gastroenterology programmes with flexible learning for working doctors."
      />

      {/* 1 ── Hero: title row, then a bento that tiles with no gaps.
             Left two columns hold the story; the tall teal card on the right holds the offerings. */}
      <section className="relative isolate overflow-hidden">
        <div aria-hidden="true" className="pointer-events-none absolute -top-32 -left-32 -z-10 h-96 w-96 rounded-full bg-support blur-3xl" />
        <div aria-hidden="true" className="pointer-events-none absolute top-1/3 -right-32 -z-10 h-96 w-96 rounded-full bg-primary-light/15 blur-3xl" />
        <RibbonTrace className="-z-10 text-primary-light opacity-40" />

        <div className="mx-auto max-w-7xl px-4 pt-12 pb-16 sm:px-5 md:pb-20 lg:px-6">
          <Reveal className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <Eyebrow>About Us</Eyebrow>
              <h1 className="mt-6 font-display text-4xl leading-[1.05] font-normal tracking-tight text-text sm:text-5xl md:text-6xl">
                About Medical
                <strong className="block font-semibold text-primary">Global Academy</strong>
              </h1>
            </div>
            <ul aria-label="Our promise" className="flex flex-wrap gap-2">
              {promiseChips.map((label) => (
                <li
                  key={label}
                  className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-secondary shadow-soft ring-1 ring-primary/10"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M5 12.5l4.5 4.5L19 7.5" />
                  </svg>
                  {label}
                </li>
              ))}
            </ul>
          </Reveal>

          <div className="mt-10 grid gap-6 md:mt-12 md:gap-8 lg:grid-cols-3">
            {/* Lead story (verified MGA copy). */}
            <Reveal
              delay={100}
              className={`relative bg-white shadow-soft ring-1 ring-primary/10 lg:col-span-2 ${cardBase}`}
            >
              <span aria-hidden="true" className="pointer-events-none absolute -top-4 left-8 select-none font-display text-7xl leading-none text-primary/20">
                &ldquo;
              </span>
              <p className="text-lg leading-relaxed text-text md:text-xl">
                Medical Global Academy (MGA) is an online medical education platform designed for practising doctors who
                want to continue learning while managing their professional responsibilities. Serving doctors since 2020,
                every programme is <strong className="font-semibold text-primary">CPD &amp; ACTD accredited</strong>.
              </p>
            </Reveal>

            {/* Offerings: tall teal card. The list stretches to fill it, so there is no empty space.
                Rows are primary-dark/40 (darker than the card, not lighter) so white/90 sublines
                keep ≥5.6:1 (the corner glow is navy, so it only darkens); the old white/75 on white/10 was 3.2–3.6:1. */}
            <Reveal
              as="aside"
              delay={150}
              className={`relative isolate flex flex-col overflow-hidden bg-linear-to-br from-primary to-primary-dark text-white shadow-soft-lg lg:col-start-3 lg:row-span-3 lg:row-start-1 ${cardBase}`}
            >
              <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-gold-light/70 to-transparent" />
              <div aria-hidden="true" className="pointer-events-none absolute -right-20 -bottom-20 -z-10 h-56 w-56 rounded-full bg-secondary/40 blur-3xl" />
              <h2 className="font-display text-2xl font-medium md:text-3xl">What we offer</h2>
              <ul className="mt-6 flex flex-1 flex-col gap-3">
                {offerings.map((item) => (
                  <li key={item.title} className="flex flex-1">
                    <Link
                      to="/courses"
                      className={`group flex w-full items-center gap-4 rounded-2xl bg-primary-dark/40 p-4 transition duration-300 ease-out hover:bg-primary-dark/60 ${onDarkFocusRing}`}
                    >
                      <IconTile path={item.icon} className="bg-white/15 text-white" />
                      <span className="min-w-0 flex-1">
                        <span className="flex flex-wrap items-center gap-x-2 gap-y-1">
                          <span className="font-display text-base font-semibold text-white">{item.title}</span>
                          {/* Amber pill with navy text: 7.11:1 (amber TEXT on teal would fail). */}
                          {item.badge && (
                            <span className="rounded-full bg-gold-light px-2.5 py-0.5 text-[0.6875rem] font-semibold tracking-wide text-secondary uppercase">
                              {item.badge}
                            </span>
                          )}
                        </span>
                        <span className="mt-1 block text-sm leading-snug text-white/90">{item.line}</span>
                        {item.count && (
                          <span className="mt-2 block text-xs font-semibold tracking-wider text-white uppercase">{item.count}</span>
                        )}
                      </span>
                      <span className="shrink-0 text-white/60 transition duration-300 group-hover:translate-x-1 group-hover:text-white">
                        <Icon path="M9 6l6 6-6 6" className="h-4 w-4" />
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
              <Link
                to="/courses"
                className={`group mt-6 inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-white px-8 text-sm font-semibold text-primary-dark shadow-soft transition duration-300 ease-out hover:-translate-y-0.5 hover:bg-support hover:shadow-soft-lg ${onDarkFocusRing}`}
              >
                Explore Courses {arrow}
              </Link>
            </Reveal>

            {/* Programmes paragraph with the specialties chips */}
            <Reveal
              delay={200}
              className={`bg-linear-to-br from-support to-support/40 shadow-soft ring-1 ring-primary/10 lg:col-span-2 ${cardBase}`}
            >
              <p className="text-base leading-relaxed text-text/75 md:text-lg">
                We offer a diverse range of programs, including{' '}
                <strong className="font-semibold text-text">PG Diplomas</strong>,{' '}
                <strong className="font-semibold text-text">Fellowships</strong>, and{' '}
                <strong className="font-semibold text-text">Certificates</strong>, designed to meet the professional
                development needs of healthcare practitioners. Our course catalog spans 300+ programs
                covering specialties such as{' '}
                {specialties.join(', ')}, and many more. Here, our focus is Gastroenterology: programmes for doctors who
                want to understand digestive and liver disease more deeply and manage it with greater confidence.
              </p>
              <ul aria-label="Specialties" className="mt-6 flex flex-wrap gap-2">
                {specialties.map((name, i) => (
                  <li
                    key={name}
                    className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm shadow-soft ${
                      i === 0 ? 'bg-primary font-semibold text-white' : 'bg-white text-text/80'
                    }`}
                  >
                    <span aria-hidden="true" className={`h-1.5 w-1.5 rounded-full ${i === 0 ? 'bg-white' : 'bg-secondary'}`} />
                    {name}
                  </li>
                ))}
              </ul>
            </Reveal>

            {/* Two half-width cards finish the row, so the grid ends flush on both sides */}
            <Reveal delay={250} className="group flex flex-col rounded-3xl bg-white p-8 shadow-soft ring-1 ring-primary/10 transition duration-300 ease-out hover:-translate-y-1 hover:shadow-soft-lg">
              <IconTile path={clockPath} />
              <p className="mt-6 text-base leading-relaxed text-text/75">
                <strong className="font-semibold text-text">Live when you can, recorded when you can&rsquo;t.</strong>{' '}
                Attend classes in real time, or catch up after a shift. Your rota sets the pace, not the timetable.
              </p>
            </Reveal>

            <Reveal delay={300} className="group flex flex-col rounded-3xl bg-white p-8 shadow-soft ring-1 ring-primary/10 transition duration-300 ease-out hover:-translate-y-1 hover:shadow-soft-lg">
              <IconTile path={heartPath} />
              <p className="mt-6 text-base leading-relaxed text-text/75">
                <strong className="font-semibold text-text">Built to change what you do in clinic.</strong> Every module
                ends in a decision you will face with real patients, so what you learn shows up in your next clinic, not
                just in your next exam.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 2 ── Stat strip: shared component, single data source (src/data/stats.js) */}
      <StatStrip />

      {/* 3 ── Who we are: text and credibility card, same height, card pinned to the bottom edge */}
      <section className="relative isolate overflow-hidden">
        <div aria-hidden="true" className="pointer-events-none absolute top-1/4 -left-48 -z-10 h-96 w-96 rounded-full bg-support blur-3xl" />
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 py-16 sm:px-5 md:py-20 lg:grid-cols-2 lg:gap-14 lg:px-6">
          <Reveal className="flex flex-col justify-center lg:order-2">
            <SectionHeading
              eyebrow="Who We Are"
              title={
                <>
                  Advancing Gastroenterology Education for <strong>Modern Healthcare</strong>
                </>
              }
            />
            <p className="mt-6 text-base leading-relaxed text-text/75 md:text-lg">
              Medical Global Academy was founded on a commitment to clinical excellence, helping practising doctors
              deepen their expertise in digestive and liver disease.
            </p>
            <p className="mt-4 text-base leading-relaxed text-text/75 md:text-lg">
              <strong className="font-semibold text-text">What we do.</strong> We offer Certificate Courses, Fellowships
              and PG Diploma programmes across a wide range of specialities. Our programmes combine structured online
              learning, live faculty-led sessions and programme-specific training where applicable.
            </p>
            <p className="mt-4 text-base leading-relaxed text-text/75 md:text-lg">
              <strong className="font-semibold text-text">Our journey.</strong> Since 2020, MGA has been helping doctors
              from all over the world upgrade their clinical knowledge and grow in their careers.
            </p>
            <p className="mt-4 text-base leading-relaxed text-text/75 md:text-lg">
              <strong className="font-semibold text-text">Learning formats.</strong> Choose between attending and
              non-attending options, so you can study at your own convenience without compromising on quality.
            </p>
          </Reveal>

          <Reveal delay={120} className="relative h-full lg:order-1">
            <div className="relative isolate flex h-full flex-col overflow-hidden rounded-3xl bg-linear-to-br from-primary to-primary-dark p-8 text-white shadow-soft-lg md:p-10">
              <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-gold-light/70 to-transparent" />
              <div aria-hidden="true" className="pointer-events-none absolute -right-20 -bottom-20 -z-10 h-56 w-56 rounded-full bg-secondary/40 blur-3xl" />
              <RibbonPattern />
              <IconTile path="M3 21h18 M5 21V10 M19 21V10 M9 21V10 M15 21V10 M2 10l10-6 10 6" className="bg-white/15 text-white" />
              <h3 className="mt-8 font-display text-2xl font-medium md:text-3xl">Credibility &amp; Recognition</h3>
              <p className="mt-4 text-base leading-relaxed text-white/85 md:text-lg">
                Our programmes are accredited by CPD and ACTD, supporting the quality and credibility of your continuing
                professional development.
              </p>
              <ul className="mt-auto flex flex-wrap gap-2 pt-8">
                {recognitions.map((r) => (
                  <li
                    key={r}
                    className="inline-flex items-center gap-2 rounded-full bg-primary-dark/40 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white"
                  >
                    <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 text-white" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M3 8.5l3.5 3.5 6.5-7" />
                    </svg>
                    {r}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 4 ── Values: generic shared component */}
      <ValuesSection />

      {/* 5 ── How it works: four same-height enrolment steps. The step number is a real sequence,
             and a progress bar along the bottom edge grows from step to step. */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-5 md:py-20 lg:px-6">
        <Reveal>
          <SectionHeading
            align="center"
            eyebrow="How It Works"
            title={
              <>
                From enrolment to certification in <strong>four simple steps.</strong>
              </>
            }
          />
        </Reveal>
        <ol className="mt-10 grid gap-5 sm:grid-cols-2 md:mt-12 md:gap-6 lg:grid-cols-4">
          {approach.map((step, i) => (
            <Reveal
              as="li"
              key={step.title}
              delay={staggerDelay(i)}
              className="group relative flex flex-col overflow-hidden rounded-3xl bg-white p-7 pb-9 shadow-soft ring-1 ring-primary/10 transition duration-300 ease-out hover:-translate-y-1 hover:shadow-soft-lg"
            >
              <div className="flex items-start justify-between gap-4">
                <IconTile path={step.icon} />
                <span aria-hidden="true" className="font-display text-5xl leading-none font-medium text-primary/15">
                  {String(i + 1).padStart(2, '0')}
                </span>
              </div>
              <h3 className="mt-6 font-display text-xl leading-snug font-medium text-primary">{step.title}</h3>
              <p className="mt-2 text-base leading-relaxed text-text/70">{step.line}</p>
              <span
                aria-hidden="true"
                className="absolute bottom-0 left-0 h-1.5 rounded-r-full bg-linear-to-r from-primary to-secondary"
                style={{ width: `${((i + 1) / approach.length) * 100}%` }}
              />
            </Reveal>
          ))}
        </ol>
      </section>

      {/* 6 ── Programme areas: every Gastroenterology course from the live LMS feed (same hook as Home),
             not capped. Icons rotate through the page's decorative set; they make no per-course claim. */}
      <section className="relative isolate overflow-hidden bg-linear-to-b from-transparent via-support/60 to-transparent">
        <div aria-hidden="true" className="pointer-events-none absolute top-1/3 -right-40 -z-10 h-96 w-96 rounded-full bg-primary-light/15 blur-3xl" />
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-5 md:py-20 lg:px-6">
          <Reveal>
            <SectionHeading
              align="center"
              eyebrow="Programs"
              title={
                <>
                  Gastroenterology <strong>Programme Areas</strong>
                </>
              }
            />
          </Reveal>

          <div className="mt-10 md:mt-12">
            {status === 'ready' ? (
              <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:gap-6 lg:grid-cols-3">
                {courses.map((c, i) => (
                  <Reveal
                    as="li"
                    key={c.id}
                    delay={staggerDelay(i)}
                    className="group flex rounded-3xl bg-white shadow-soft ring-1 ring-primary/10 transition duration-300 ease-out hover:-translate-y-1 hover:shadow-soft-lg"
                  >
                    <Link to={c.url} className={`flex w-full flex-col rounded-3xl p-8 ${focusRing}`}>
                      <IconTile path={courseIcons[i % courseIcons.length]} />
                      <h3 className="mt-6 font-display text-xl font-medium text-primary">{c.name}</h3>
                      {c.description && (
                        <p className="mt-2 line-clamp-3 text-base leading-relaxed text-text/75">{c.description}</p>
                      )}
                      <span className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-semibold text-primary">
                        View course {arrow}
                      </span>
                    </Link>
                  </Reveal>
                ))}
              </ul>
            ) : (
              <CourseFeedState status={status} error={error} onRetry={retry} skeletonCount={3} />
            )}
          </div>

          <div className="mt-10 text-center">
            <Link
              to="/courses"
              className={`group inline-flex h-12 items-center gap-2 rounded-xl font-semibold text-primary transition-colors hover:text-primary-dark ${focusRing}`}
            >
              Browse all gastroenterology courses {arrow}
            </Link>
          </div>
        </div>
      </section>

      {/* 7 ── Why MGA: one rounded panel, heading on the left, the four benefits on the right.
             The rows stretch to the heading's height, so neither side has empty space. */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-5 md:py-20 lg:px-6">
        <div className="relative isolate overflow-hidden rounded-[2rem] bg-linear-to-br from-support to-support/40 p-8 shadow-soft ring-1 ring-primary/10 md:p-12">
          <div aria-hidden="true" className="pointer-events-none absolute inset-x-10 top-0 h-0.5 rounded-full bg-linear-to-r from-transparent via-gold-light to-transparent" />
          <div aria-hidden="true" className="pointer-events-none absolute -top-32 -right-32 -z-10 h-80 w-80 rounded-full bg-primary-light/15 blur-3xl" />
          <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-14">
            <Reveal className="flex flex-col justify-center">
              {/* Intro: "mentorship" dropped from the old copy, since it is not in the verified Why MGA list. */}
              <SectionHeading
                eyebrow="Why MGA"
                title={
                  <>
                    Flexible learning for <strong>working doctors.</strong>
                  </>
                }
                intro="We know doctors don’t have time to step away from practice. Our programmes combine live sessions and recorded lectures so you can build expertise in gastroenterology on a schedule that works around your shifts."
              />
            </Reveal>

            <ul className="flex flex-col gap-3">
              {learningModes.map((m, i) => (
                <Reveal as="li" key={m.title} delay={staggerDelay(i)} className="group flex flex-1">
                  <div className="flex w-full items-center gap-4 rounded-2xl bg-white p-5 shadow-soft ring-1 ring-primary/10 transition duration-300 ease-out group-hover:-translate-y-0.5 group-hover:shadow-soft-lg motion-reduce:transition-none">
                    <IconTile path={m.icon} />
                    <span className="min-w-0">
                      <span className="block font-display text-lg font-medium text-text">{m.title}</span>
                      <span className="mt-0.5 block text-sm leading-relaxed text-text/70">{m.line}</span>
                    </span>
                  </div>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 8 ── Our Faculty: short text block linking to the Doctors page. */}
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-5 md:pb-20 lg:px-6">
        <Reveal className="flex flex-col gap-6 border-t border-primary/10 pt-10 md:flex-row md:items-end md:justify-between md:pt-12">
          <SectionHeading
            eyebrow="Our Faculty"
            title={
              <>
                Learn from <strong>experienced medical professionals.</strong>
              </>
            }
            intro="Our programmes are delivered with experienced medical professionals and specialists who bring practical clinical perspectives into teaching."
          />
          <Link
            to="/doctors"
            className={`group inline-flex h-12 shrink-0 items-center gap-2 rounded-xl font-semibold text-primary transition-colors hover:text-primary-dark ${focusRing}`}
          >
            Meet our faculty {arrow}
          </Link>
        </Reveal>
      </section>

      {/* 9 ── Mission & Vision banner */}
      <section className="relative isolate overflow-hidden bg-linear-to-br from-primary to-primary-dark py-16 text-white md:py-20">
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-gold-light/70 to-transparent" />
        <div aria-hidden="true" className="pointer-events-none absolute -top-40 -right-24 -z-10 h-96 w-96 rounded-full bg-secondary/40 blur-3xl" />
        <div aria-hidden="true" className="pointer-events-none absolute -bottom-48 -left-32 -z-10 h-96 w-96 rounded-full bg-primary-dark/40 blur-3xl" />
        <RibbonTrace className="-z-10 text-white opacity-15" />

        <Reveal className="mx-auto max-w-5xl px-4 text-center sm:px-6">
          {/* Chip is primary-dark/70 so the small white label keeps ≥4.5:1 (white on the old white/15
              chip was 3.9:1 under the former light glow). */}
          <p className="inline-flex items-center gap-2 rounded-full bg-primary-dark/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-white">
            <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-gold-light" />
            Mission &amp; Vision
          </p>
          <h2 className="mx-auto mt-6 max-w-3xl font-display text-3xl leading-[1.1] font-normal tracking-tight sm:text-4xl md:text-5xl">
            Why we exist, <strong className="font-semibold">and where we&rsquo;re headed.</strong>
          </h2>
          {/* Panels are primary-dark/50 (darker than the banner) so white/90 body text stays ≥5.5:1. */}
          <div className="mt-10 grid gap-4 text-left md:grid-cols-2 md:gap-6">
            {[
              {
                label: 'Our Mission',
                text: 'To bridge the gap in healthcare education by providing accessible, flexible and high-quality learning opportunities. Through specialised programmes, we help medical professionals gain new skills, advance their careers and improve patient care.',
              },
              {
                label: 'Our Vision',
                text: 'To be the most trusted destination for continuing medical education worldwide, empowering every healthcare professional to learn, grow and lead.',
              },
            ].map((block) => (
              <div key={block.label} className="relative isolate overflow-hidden rounded-3xl bg-primary-dark/50 p-6 ring-1 ring-white/10 md:p-8">
                <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-gold-light/60 to-transparent" />
                <div aria-hidden="true" className="pointer-events-none absolute -right-16 -bottom-16 -z-10 h-40 w-40 rounded-full bg-secondary/40 blur-3xl" />
                <h3 className="flex items-center gap-3 font-display text-xl font-medium text-white">
                  <span aria-hidden="true" className="h-5 w-1 rounded-full bg-gold-light" />
                  {block.label}
                </h3>
                <p className="mt-3 text-base leading-relaxed text-white/90">{block.text}</p>
              </div>
            ))}
          </div>
          <Link
            to="/courses"
            className="group mt-10 inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-white px-8 font-semibold text-primary-dark shadow-lg shadow-text/10 transition duration-300 ease-out hover:-translate-y-0.5 hover:bg-support hover:shadow-xl hover:shadow-text/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Enroll Today {arrow}
          </Link>
        </Reveal>
      </section>
    </>
  )
}
