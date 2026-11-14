import { Link } from 'react-router-dom'
import SectionHeading, { Eyebrow } from '../components/SectionHeading.jsx'
import Reveal from '../components/Reveal.jsx'
import Breadcrumb from '../components/Breadcrumb.jsx'
import StatStrip from '../components/StatStrip.jsx'
import { RibbonTrace, RibbonPattern } from '../components/RibbonArt.jsx'
import CourseFeedState from '../components/CourseFeedState.jsx'
import { staggerDelay } from '../hooks/useReveal.js'
import { useGastroCourses } from '../api/lms.js'
import {
  specialties,
  specialtyIcons,
  offerings,
  recognitions,
  approach,
  learningModes,
  values,
} from '../data/about.js'

/*
 * About page.
 * Layout rule for this file: every structural layout is a plain grid or flex with an explicit
 * responsive breakdown. `absolute` is only used for decorative glows / hairlines / ribbon art.
 * Every section uses py-16 md:py-20 (the hero keeps pt-12 because it sits under the navbar; the
 * Faculty strip uses pb only because it shares a divider with the Why MGA section above it).
 */

const focusRing = 'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary'
const onDarkFocusRing = 'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white'

// Shared buttons (same styles as Home / Doctors).
const primaryButton = `group inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-primary px-7 font-semibold text-white shadow-soft transition duration-300 ease-out hover:-translate-y-0.5 hover:bg-primary-dark hover:shadow-soft-lg motion-reduce:transition-none motion-reduce:hover:translate-y-0 ${focusRing}`
const secondaryButton = `group inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-white px-6 font-semibold text-secondary shadow-soft ring-1 ring-secondary/20 transition duration-300 ease-out hover:-translate-y-0.5 hover:shadow-soft-lg motion-reduce:transition-none motion-reduce:hover:translate-y-0 ${focusRing}`

function Icon({ path, className = 'h-6 w-6', strokeWidth = 1.5 }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
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

// Same hover-fill as Home's "Why MGA" tiles: teal icon on primary/10 (5.48:1); inside a
// `group`, the tile fills with the teal gradient and the icon turns white (6.35:1+).
const tealTileHover =
  'bg-primary/10 text-primary transition duration-300 ease-out motion-reduce:transition-none group-hover:bg-linear-to-br group-hover:from-primary group-hover:to-primary-dark group-hover:text-white'

// Decorative icons used only on this page.
const icons = {
  check: 'M5 12.5l4.5 4.5L19 7.5',
  shieldCheck: 'M12 3l7 3v5c0 4.5-3 8.5-7 10-4-1.5-7-5.5-7-10V6l7-3z M9 12l2 2 4-4',
  clipboard: 'M9 4h6v3H9z M7 5H5v15h14V5h-2 M9 12h6 M9 16h4',
  rocket: 'M5 15c-1.5 1.5-2 5-2 5s3.5-.5 5-2 M9 15l-3-3c1-4 4.5-8 12-9-1 7.5-5 11-9 12z M14.5 9.5a1 1 0 100-2 1 1 0 000 2z',
  laptop: 'M4 6h16v10H4z M2 19h20',
  target: 'M12 21a9 9 0 100-18 9 9 0 000 18z M12 17a5 5 0 100-10 5 5 0 000 10z M12 13a1 1 0 100-2 1 1 0 000 2z',
  eye: 'M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z M12 15a3 3 0 100-6 3 3 0 000 6z',
  building: 'M3 21h18 M5 21V10 M19 21V10 M9 21V10 M15 21V10 M2 10l10-6 10 6',
}

// How It Works: copied verbatim from Home.jsx's pathwayNodes / pathwayConnectors so both step sections
// share one design language. Nodes warm teal → dark teal → navy → amber towards certification.
// Contrast (measured on Home): white on primary 6.35, white on primary-dark 9.42, gold-light on
// secondary 7.11, secondary on gold-light 7.11 (all pass AA).
const pathwayNodes = [
  'bg-primary text-white shadow-soft-lg',
  'bg-primary-dark text-white shadow-soft-lg',
  'bg-secondary text-gold-light shadow-soft-lg',
  'bg-gold-light text-secondary shadow-lg shadow-gold-light/50',
]
// Connector after step i blends that node's colour into the next one's.
const pathwayConnectors = [
  'from-primary/40 to-primary-dark/40',
  'from-primary-dark/40 to-secondary/50',
  'from-secondary/50 to-gold-light/80',
]

// Decorative icons for the programme cards, reused from this page's own data; rotated by index.
const courseIcons = [...approach, ...learningModes].map((item) => item.icon)

const promiseChips =['Trusted', 'Accredited', 'Career focused']

// Hero visual: right-hand part of the MGA About banner (GI illustration + doctor), cropped so
// none of the banner's baked-in text is included. 1126 x 630.
const HERO_IMAGE = { src: '/about-hero-visual.jpg', width: 1126, height: 630 }

// Who We Are: the three company facts as compact icon blocks (copy unchanged).
const whoWeAreFacts = [
  {
    label: 'What we do.',
    icon: icons.clipboard,
    text: 'We offer Certificate Courses, Fellowships and PG Diploma programmes across a wide range of specialities. Our programmes combine structured online learning, live faculty-led sessions and programme-specific training where applicable.',
  },
  {
    label: 'Our journey.',
    icon: icons.rocket,
    text: 'Since 2020, MGA has been helping doctors from all over the world upgrade their clinical knowledge and grow in their careers.',
  },
  {
    label: 'Learning formats.',
    icon: icons.laptop,
    text: 'Choose between attending and non-attending options, so you can study at your own convenience without compromising on quality.',
  },
]

// Credibility: CPD and ACTD as the two headline badges; any other recognitions stay as small chips.
const headlineBadges = [
  { short: 'CPD', name: 'CPD Accredited' },
  { short: 'ACTD', name: 'ACTD Accredited' },
]
const otherRecognitions = recognitions.filter((r) => !headlineBadges.some((b) => b.name === r))

const missionVision = [
  {
    label: 'Our Mission',
    icon: icons.target,
    text: 'To bridge the gap in healthcare education by providing accessible, flexible and high-quality learning opportunities. Through specialised programmes, we help medical professionals gain new skills, advance their careers and improve patient care.',
  },
  {
    label: 'Our Vision',
    icon: icons.eye,
    text: 'To be the most trusted destination for continuing medical education worldwide, empowering every healthcare professional to learn, grow and lead.',
  },
]

export default function About() {
  const { status, courses, error, retry } = useGastroCourses()

  return (
    <>
      <title>About | GastroenterologyNow by Medical Global Academy</title>
      <meta
        name="description"
        content="About Medical Global Academy: CPD & ACTD accredited PG Diplomas, Fellowships and Certificates, including Gastroenterology programmes with flexible learning for working doctors."
      />

      {/* 1 ── Hero: 2-column grid. Text left, rounded image right.
             375px: one column, image below text · 768px: same, wider · 1024px+: two equal columns. */}
      <section className="relative isolate overflow-hidden">
        <div aria-hidden="true" className="pointer-events-none absolute -top-32 -left-32 -z-10 h-96 w-96 rounded-full bg-support blur-3xl" />
        <div aria-hidden="true" className="pointer-events-none absolute top-1/3 -right-32 -z-10 h-96 w-96 rounded-full bg-primary-light/15 blur-3xl" />
        <RibbonTrace className="-z-10 text-primary-light opacity-40" />

        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 pt-12 pb-16 sm:px-5 md:pb-20 lg:grid-cols-2 lg:gap-14 lg:px-6">
          <div className="min-w-0">
            <Reveal>
              <Breadcrumb items={[{ label: 'About Us' }]} />

              <Eyebrow className="mt-6">About Us</Eyebrow>
              <h1 className="mt-6 font-display text-4xl leading-[1.05] font-normal tracking-tight text-text sm:text-5xl md:text-6xl">
                About Medical
                <strong className="block font-semibold text-primary">Global Academy</strong>
              </h1>
              <ul aria-label="Our promise" className="mt-8 flex flex-wrap gap-2">
                {promiseChips.map((label) => (
                  <li
                    key={label}
                    className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-secondary shadow-soft ring-1 ring-primary/10"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d={icons.check} />
                    </svg>
                    {label}
                  </li>
                ))}
              </ul>
            </Reveal>

            {/* Lead story (verified MGA copy). */}
            <Reveal delay={100} className="relative mt-10 rounded-3xl bg-white p-8 shadow-soft ring-1 ring-primary/10 md:p-10">
              <span aria-hidden="true" className="pointer-events-none absolute -top-4 left-8 select-none font-display text-7xl leading-none text-primary/20">
                &ldquo;
              </span>
              <p className="text-lg leading-relaxed text-text md:text-xl">
                Medical Global Academy (MGA) is an online medical education platform designed for practising doctors who
                want to continue learning while managing their professional responsibilities. Serving doctors since 2020,
                every programme is <strong className="font-semibold text-primary">CPD &amp; ACTD accredited</strong>.
              </p>
            </Reveal>
          </div>

          <Reveal delay={150} className="min-w-0">
            <img
              src={HERO_IMAGE.src}
              alt="A doctor with a stethoscope beside an illustration of the digestive system"
              width={HERO_IMAGE.width}
              height={HERO_IMAGE.height}
              fetchPriority="high"
              className="block h-auto w-full rounded-3xl object-cover shadow-soft-lg ring-1 ring-primary/10"
            />
          </Reveal>
        </div>
      </section>

      {/* 2 ── Stat strip: shared component, single data source (src/data/stats.js) */}
      <StatStrip />

      {/* 3 ── What we offer: 2-column grid. Text + button left, three offering cards right.
             375px: stacked, cards 1 per row · 768px: stacked, cards 3 across · 1024px+: 1/3 text, 2/3 cards. */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-5 md:py-20 lg:px-6">
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_2fr] lg:gap-14">
          <Reveal className="min-w-0">
            <SectionHeading eyebrow="Programmes" title={<>What we <strong>offer</strong></>} />
            <p className="mt-6 text-base leading-relaxed text-text/75 md:text-lg">
              We offer a diverse range of programs, including{' '}
              <strong className="font-semibold text-text">PG Diplomas</strong>,{' '}
              <strong className="font-semibold text-text">Fellowships</strong>, and{' '}
              <strong className="font-semibold text-text">Certificates</strong>, designed to meet the professional
              development needs of healthcare practitioners.
            </p>
            <Link to="/courses" className={`mt-8 ${primaryButton}`}>
              Explore Courses {arrow}
            </Link>
          </Reveal>

          <ul className="grid min-w-0 gap-5 md:grid-cols-3 md:gap-6">
            {offerings.map((item, i) => (
              <Reveal as="li" key={item.title} delay={staggerDelay(i)} className="h-full min-w-0">
                <Link
                  to="/courses"
                  className={`group flex h-full flex-col rounded-3xl bg-white p-6 shadow-soft ring-1 ring-primary/10 transition duration-300 ease-out hover:-translate-y-1 hover:shadow-soft-lg motion-reduce:transition-none motion-reduce:hover:translate-y-0 ${focusRing}`}
                >
                  {/* flex-wrap: at 1024px a card is ~140px inside, so the pill drops under the icon instead of overflowing. */}
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <IconTile path={item.icon} />
                    {/* Amber pill with navy text: 7.11:1. */}
                    {item.badge && (
                      <span className="rounded-full bg-gold-light px-2.5 py-0.5 text-[0.6875rem] font-semibold tracking-wide whitespace-nowrap text-secondary uppercase">
                        {item.badge}
                      </span>
                    )}
                  </div>
                  <h3 className="mt-5 font-display text-lg leading-snug font-semibold text-primary">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-text/75">{item.line}</p>
                  {item.count && (
                    <p className="mt-auto pt-5 text-xs font-semibold tracking-wider text-secondary uppercase">{item.count}</p>
                  )}
                </Link>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* 4 ── Gastroenterology and More: 2-column grid. Text + button left, specialty tiles in a card right.
             Tiles are a centred flex-wrap row of fixed-width (w-32) items, so they wrap instead of overflowing
             and any short last row stays centred under the others.
             375px: stacked, 2 tiles per row · 768px: stacked, 4 + 4 · 1024px: side by side (5/7), 3 + 3 + 2
             · 1280px+: 4 + 4. */}
      <section className="relative isolate overflow-hidden bg-linear-to-b from-transparent via-support/60 to-transparent">
        <div aria-hidden="true" className="pointer-events-none absolute top-1/4 -right-40 -z-10 h-96 w-96 rounded-full bg-primary-light/15 blur-3xl" />
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-5 md:py-20 lg:grid-cols-[5fr_7fr] lg:gap-14 lg:px-6">
          <Reveal className="min-w-0">
            <SectionHeading eyebrow="Specialties" title={<>Gastroenterology <strong>and More</strong></>} />
            <p className="mt-6 text-base leading-relaxed text-text/75 md:text-lg">
              Our course catalog spans 300+ programs covering specialties such as {specialties.join(', ')}, and many
              more. Here, our focus is Gastroenterology: programmes for doctors who want to understand digestive and
              liver disease more deeply and manage it with greater confidence.
            </p>
            <Link to="/courses" className={`mt-8 ${secondaryButton}`}>
              View All Courses {arrow}
            </Link>
          </Reveal>

          {/* Contained panel, same surface as the "What we offer" cards. Each tile is w-32 (128px): wide
              enough for the longest single word ("Gastroenterology" ≈ 120px at text-sm semibold).
              Tile hover = the site's IconTile pattern: teal circle on primary/10 fills with the teal
              gradient and the icon turns white; label shifts to primary-dark; soft lift + shadow.
              Gastroenterology (the site's focus) is permanently in that filled state.
              The hover lives on an inner div, not on the Reveal <li>, so it never fights Reveal's translate. */}
          <div className="min-w-0 rounded-3xl bg-linear-to-br from-white to-support/50 p-4 shadow-soft ring-1 ring-primary/10 sm:p-6 xl:p-8">
            <ul aria-label="Specialties" className="flex flex-wrap justify-center gap-3">
              {specialties.map((name, i) => {
                const featured = i === 0
                return (
                  <Reveal as="li" key={name} delay={staggerDelay(i)} className="w-32">
                    <div
                      className={`group flex h-full flex-col items-center rounded-2xl px-2 py-4 text-center transition duration-300 ease-out hover:-translate-y-0.5 hover:bg-white hover:shadow-soft motion-reduce:transition-none motion-reduce:hover:translate-y-0 ${
                        featured ? 'bg-white shadow-soft ring-1 ring-primary/15' : ''
                      }`}
                    >
                      <span
                        className={`inline-flex h-14 w-14 items-center justify-center rounded-full transition duration-300 ease-out motion-reduce:transition-none ${
                          featured
                            ? 'bg-linear-to-br from-primary to-primary-dark text-white'
                            : 'bg-primary/10 text-primary group-hover:bg-linear-to-br group-hover:from-primary group-hover:to-primary-dark group-hover:text-white'
                        }`}
                      >
                        <Icon path={specialtyIcons[name] ?? specialtyIcons.Medicine} className="h-7 w-7" strokeWidth={1.75} />
                      </span>
                      <span
                        className={`mt-3 text-sm leading-snug transition-colors duration-300 ${
                          featured ? 'font-semibold text-primary-dark' : 'font-medium text-text/80 group-hover:text-primary-dark'
                        }`}
                      >
                        {name}
                      </span>
                    </div>
                  </Reveal>
                )
              })}
            </ul>
          </div>
        </div>
      </section>

      {/* 6 ── Who we are: 2-column grid. Heading, GI paragraph and "Learn More" (→ #credibility) left;
             the three company facts as a vertical stack of icon rows right.
             375px / 768px: stacked · 1024px+: side by side. */}
      <section className="relative isolate overflow-hidden">
        <div aria-hidden="true" className="pointer-events-none absolute top-1/4 -left-48 -z-10 h-96 w-96 rounded-full bg-support blur-3xl" />
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-5 md:py-20 lg:grid-cols-2 lg:gap-14 lg:px-6">
          <Reveal className="min-w-0">
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
            <a href="#credibility" className={`mt-8 ${primaryButton}`}>
              Learn More {arrow}
            </a>
          </Reveal>

          <ul className="flex min-w-0 flex-col gap-4">
            {whoWeAreFacts.map((f, i) => (
              <Reveal
                as="li"
                key={f.label}
                delay={staggerDelay(i)}
                className="group flex items-start gap-4 rounded-3xl bg-white p-6 shadow-soft ring-1 ring-primary/10 transition duration-300 ease-out hover:-translate-y-0.5 hover:shadow-soft-lg"
              >
                <IconTile path={f.icon} />
                <div className="min-w-0">
                  <h3 className="font-display text-lg font-semibold text-primary">{f.label}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-text/75 md:text-base">{f.text}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* 7 ── Credibility & Recognition + Our Values: 2-column grid, equal height (grid stretch + h-full).
             375px / 768px: stacked · 1024px+: side by side. id="credibility" is the "Learn More" target. */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-5 md:py-20 lg:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
          <Reveal
            id="credibility"
            className="relative isolate flex h-full min-w-0 scroll-mt-28 flex-col overflow-hidden rounded-3xl bg-linear-to-br from-primary to-primary-dark p-8 text-white shadow-soft-lg md:p-10"
          >
            <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-gold-light/70 to-transparent" />
            <div aria-hidden="true" className="pointer-events-none absolute -right-20 -bottom-20 -z-10 h-56 w-56 rounded-full bg-secondary/40 blur-3xl" />
            <RibbonPattern />
            <IconTile path={icons.building} className="bg-white/15 text-white" />
            <h2 className="mt-6 font-display text-2xl font-medium md:text-3xl">Credibility &amp; Recognition</h2>
            <p className="mt-4 text-base leading-relaxed text-white/85 md:text-lg">
              Our programmes are accredited by CPD and ACTD, supporting the quality and credibility of your continuing
              professional development.
            </p>
            {/* Headline badges: white tiles, navy text (15:1). 1 column at 375px (2 columns would leave
                ~43px for "ACTD"), 2 columns from 640px up (≥188px each). */}
            <ul aria-label="Accreditations" className="mt-8 grid gap-4 sm:grid-cols-2">
              {headlineBadges.map((b) => (
                <li key={b.short} className="flex min-w-0 items-center gap-3 rounded-2xl bg-white px-4 py-4 shadow-soft">
                  <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-secondary text-gold-light">
                    <Icon path={icons.shieldCheck} className="h-5 w-5" />
                  </span>
                  <span className="min-w-0">
                    <span className="block font-display text-2xl leading-none font-semibold text-secondary">{b.short}</span>
                    <span className="mt-1 block text-xs font-semibold tracking-wider text-text/70 uppercase">Accredited</span>
                  </span>
                </li>
              ))}
            </ul>
            {otherRecognitions.length > 0 && (
              <ul className="mt-auto flex flex-wrap gap-2 pt-6">
                {otherRecognitions.map((r) => (
                  <li
                    key={r}
                    className="inline-flex items-center gap-2 rounded-full bg-primary-dark/40 px-4 py-2 text-xs font-semibold tracking-wider text-white uppercase"
                  >
                    <Icon path={icons.check} className="h-3.5 w-3.5" />
                    {r}
                  </li>
                ))}
              </ul>
            )}
          </Reveal>

          <Reveal delay={120} className="flex h-full min-w-0 flex-col rounded-3xl bg-white p-8 shadow-soft ring-1 ring-primary/10 md:p-10">
            <IconTile path={icons.shieldCheck} />
            <h2 className="mt-6 font-display text-2xl font-medium text-text md:text-3xl">Our Values</h2>
            <p className="mt-3 text-base leading-relaxed text-text/75">
              What we stand for — the principles behind how every Medical Global Academy programme is built.
            </p>
            <ul className="mt-8 grid gap-4">
              {values.map((v) => (
                <li key={v.title} className="flex items-center gap-3 text-base font-medium text-text">
                  <span aria-hidden="true" className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Icon path={icons.check} className="h-4 w-4" />
                  </span>
                  {v.title}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* 8 ── How it works: the same pathway pattern as Home.jsx section 7 (pathwayNodes / pathwayConnectors),
             inside one contained panel. Numbered nodes warm teal → dark teal → navy → amber towards
             certification; the last node shows a check. Each node/connector is positioned inside its own
             <li> exactly as on Home (absolute within the step only, never across the section).
             375px / 768px: vertical stepper, nodes on the left, connector runs down between them
             · 1024px+: 4 steps in a row, connector runs right from each node to the next. */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-5 md:py-20 lg:px-6">
        <div className="relative isolate overflow-hidden rounded-[2rem] bg-support px-5 py-12 shadow-soft ring-1 ring-primary/10 sm:px-8 md:px-12 md:py-14">
          <div aria-hidden="true" className="pointer-events-none absolute inset-x-10 top-0 h-0.5 rounded-full bg-linear-to-r from-transparent via-gold-light to-transparent" />
          <div aria-hidden="true" className="pointer-events-none absolute -top-32 -right-32 -z-10 h-80 w-80 rounded-full bg-primary-light/15 blur-3xl" />

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

          <ol className="mt-10 grid gap-0 md:mt-14 lg:grid-cols-4 lg:gap-8">
            {approach.map((step, i) => {
              const isLast = i === approach.length - 1
              return (
                <Reveal as="li" key={step.title} delay={staggerDelay(i)} className="relative pb-10 pl-16 last:pb-0 lg:pt-20 lg:pb-0 lg:pl-0">
                  {/* Connector to the next step (Home's pathwayConnectors) */}
                  {!isLast && (
                    <span
                      aria-hidden="true"
                      className={`absolute top-12 bottom-0 left-6 w-px bg-linear-to-b lg:top-6 lg:bottom-auto lg:left-12 lg:h-px lg:w-[calc(100%-1rem)] lg:bg-linear-to-r ${pathwayConnectors[i]}`}
                    />
                  )}
                  {/* Node (Home's pathwayNodes). ring-support = the panel colour, as Home uses ring-bg on its page bg. */}
                  <span
                    aria-hidden="true"
                    className={`absolute top-0 left-0 flex h-12 w-12 items-center justify-center rounded-full font-display text-lg font-medium ring-4 ring-support ${pathwayNodes[i]}`}
                  >
                    {isLast ? (
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d={icons.check} />
                      </svg>
                    ) : (
                      i + 1
                    )}
                  </span>

                  <div
                    className={`h-full rounded-2xl p-6 ring-1 transition duration-300 ease-out hover:-translate-y-1 hover:bg-white hover:shadow-soft-lg motion-reduce:transition-none motion-reduce:hover:translate-y-0 ${
                      isLast ? 'ring-secondary/40' : 'ring-primary/15'
                    }`}
                  >
                    <p className="text-xs font-semibold tracking-[0.18em] text-text/70 uppercase">Step {i + 1}</p>
                    <h3 className="mt-2 font-display text-xl leading-snug font-medium text-primary">{step.title}</h3>
                    <p className="mt-2 text-base leading-relaxed text-text/75">{step.line}</p>
                  </div>
                </Reveal>
              )
            })}
          </ol>

          <div className="mt-12 flex justify-center">
            <Link to="/courses" className={primaryButton}>
              Get Started {arrow}
            </Link>
          </div>
        </div>
      </section>

      {/* 9 ── Programme areas: every Gastroenterology course from the live LMS feed (same hook as Home),
             not capped. Icons rotate through the page's decorative set; they make no per-course claim.
             375px: 1 per row · 640px: 2 · 1024px+: 3. */}
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

      {/* 10 ── Why MGA: one rounded panel, heading on the left, the four benefits on the right.
             375px / 768px: stacked · 1024px+: side by side. */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-5 md:py-20 lg:px-6">
        <div className="relative isolate overflow-hidden rounded-[2rem] bg-linear-to-br from-support to-support/40 p-8 shadow-soft ring-1 ring-primary/10 md:p-12">
          <div aria-hidden="true" className="pointer-events-none absolute inset-x-10 top-0 h-0.5 rounded-full bg-linear-to-r from-transparent via-gold-light to-transparent" />
          <div aria-hidden="true" className="pointer-events-none absolute -top-32 -right-32 -z-10 h-80 w-80 rounded-full bg-primary-light/15 blur-3xl" />
          <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-14">
            <Reveal className="flex min-w-0 flex-col justify-center">
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

            <ul className="flex min-w-0 flex-col gap-3">
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

      {/* 11 ── Our Faculty: short text block linking to the Doctors page.
             pb only: it shares a divider line with the Why MGA section directly above.
             375px: stacked · 768px+: text left, link right. */}
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

      {/* 12 ── Mission & Vision: one navy banner, one grid.
             375px: everything stacked · 768px: heading full width, Mission | Vision, button full width
             · 1024px+: heading | Mission | Vision | button in one row (button column sized to content).
             Amber only on navy (gold-light on secondary 7.11:1); body text white/85 on navy ≈ 12:1. */}
      <section className="px-4 py-16 sm:px-5 md:py-20 lg:px-6">
        <div className="relative isolate mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-secondary px-6 py-10 text-white shadow-soft-lg sm:px-10 md:py-12">
          <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-gold-light/70 to-transparent" />
          <div aria-hidden="true" className="pointer-events-none absolute -top-40 -right-24 -z-10 h-96 w-96 rounded-full bg-primary/40 blur-3xl" />
          <div aria-hidden="true" className="pointer-events-none absolute -bottom-48 -left-32 -z-10 h-96 w-96 rounded-full bg-primary-dark/40 blur-3xl" />

          <Reveal className="grid items-center gap-8 md:grid-cols-2 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)_minmax(0,1fr)_auto] lg:gap-10">
            <div className="min-w-0 md:col-span-2 lg:col-span-1">
              <p className="inline-flex items-center gap-3 text-xs font-semibold tracking-[0.22em] whitespace-nowrap text-gold-light uppercase">
                <span aria-hidden="true" className="h-px w-8 bg-gold-light" />
                Mission &amp; Vision
              </p>
              <h2 className="mt-4 font-display text-2xl leading-tight font-medium md:text-3xl">
                Why we exist, <strong className="font-semibold">and where we&rsquo;re headed.</strong>
              </h2>
            </div>

            {missionVision.map((block) => (
              <div key={block.label} className="flex min-w-0 items-start gap-4 self-start">
                <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/10 text-gold-light ring-1 ring-white/15">
                  <Icon path={block.icon} className="h-5 w-5" />
                </span>
                <div className="min-w-0">
                  <h3 className="font-display text-lg font-medium text-white">{block.label}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-white/85">{block.text}</p>
                </div>
              </div>
            ))}

            <div className="md:col-span-2 lg:col-span-1">
              <Link
                to="/courses"
                className={`group inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-white px-7 font-semibold whitespace-nowrap text-primary-dark shadow-lg shadow-text/10 transition duration-300 ease-out hover:-translate-y-0.5 hover:bg-support hover:shadow-xl hover:shadow-text/20 motion-reduce:transition-none motion-reduce:hover:translate-y-0 ${onDarkFocusRing}`}
              >
                Enroll Today {arrow}
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
