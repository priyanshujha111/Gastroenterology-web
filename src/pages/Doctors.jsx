import { Link } from 'react-router-dom'
import SectionHeading, { Eyebrow } from '../components/SectionHeading.jsx'
import Breadcrumb from '../components/Breadcrumb.jsx'
import DoctorCard from '../components/DoctorCard.jsx'
import CTASection from '../components/CTASection.jsx'
import Reveal from '../components/Reveal.jsx'
import { staggerDelay } from '../hooks/useReveal.js'
import { doctors } from '../data/doctors.js'

/*
 * Faculty page (/doctors).
 * Doctor data comes only from src/data/doctors.js. Names are confirmed; credentials, focus and
 * bios are draft, so nothing on this page calls them "verified". The draft note under the grid
 * hides itself once FACULTY_CONFIRMED is true.
 */

// TODO: set to true once each doctor's credentials are confirmed by the academic team.
const FACULTY_CONFIRMED = false

const focusRing = 'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary'

/* ============================================================================
 * HERO: ONE full-width image, same technique as the Home hero (Home.jsx section 1).
 * File: public/doctors-hero-v2.jpg (1896 x 830, no baked-in navbar or logo, so no crop).
 * The heading, intro and "Explore Our Faculty" button are drawn inside the image, so:
 *  - the real <h1> + intro are in the page but visually hidden (sr-only)
 *  - one transparent link sits exactly over the drawn button
 * ========================================================================== */
const HERO_BG_SRC = '/doctors-hero-v2.jpg'
// 1x1 transparent GIF used as the below-lg <picture> source, so small screens never fetch the hero JPG.
const BLANK_PIXEL = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'

// Hit-area for the drawn "Explore Our Faculty" button, as % of the image size.
// Measured from the image: button pixels x 75–488, y 634–718 of 1896 x 830.
const heroFacultyArea = { left: '4.0%', top: '76.4%', width: '21.8%', height: '10.2%' }

// Breadcrumb overlay position, as % of the image size: clear space above the "Our Faculty" badge.
const heroBreadcrumbPos = { left: '3.7%', top: '4%' }

// Section 3: how faculty support learning (copy as supplied).
const supportFeatures = [
  {
    title: 'Live Interactive Classes',
    text: 'Learn through structured sessions and interactive discussions.',
    icon: 'M3 5h18v11H3z M8 20h8 M12 16v4 M10 8.5v4l3.5-2-3.5-2z',
  },
  {
    title: 'Case-Based Learning',
    text: 'Understand clinical scenarios and practical decision-making.',
    icon: 'M9 4h6v3H9z M7 5H5v15h14V5h-2 M9 12h6 M9 16h4',
  },
  {
    title: 'Personal Mentorship',
    text: 'Get academic guidance and support throughout the learning journey.',
    icon: 'M16 19v-1a4 4 0 00-4-4H7a4 4 0 00-4 4v1 M9.5 10a3 3 0 100-6 3 3 0 000 6z M21 19v-1a4 4 0 00-3-3.87 M16 4.13a3 3 0 010 5.74',
  },
  {
    title: 'Dedicated Academic Support',
    text: 'Get assistance with learning resources, course queries and academic guidance.',
    icon: 'M21 12a8 8 0 01-11.6 7.1L4 20l1-4.6A8 8 0 1121 12z M8.5 12h.01 M12 12h.01 M15.5 12h.01',
  },
]

// Section 4: teaching approach. DRAFT COPY: descriptive, no factual claims; confirm with the academic team.
const teachingApproach = [
  {
    title: 'Practical Clinical Knowledge',
    text: 'Teaching built around the GI presentations doctors meet in practice, from abnormal liver tests to endoscopy findings, and the decisions that follow.',
  },
  {
    title: 'Evidence-Based Learning',
    text: 'Content grounded in current clinical guidance, so what you learn reflects how gastroenterology is practised today.',
  },
  {
    title: 'Continuous Academic Guidance',
    text: 'Support from enrolment to certification, with faculty and the academic team on hand for questions along the way.',
  },
]

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

export default function Doctors() {
  return (
    <>
      <title>Faculty | GastroenterologyNow by MGA</title>
      <meta
        name="description"
        content="Meet the faculty who teach Medical Global Academy's Gastroenterology programmes, and how they support your learning."
      />

      {/* 1 ── Hero (Home pattern). Two presentations of ONE set of content.
             - Below lg: a real text hero (breadcrumb, badge, h1, intro, button) on the soft teal base.
             - lg and up: ONE full-width image (heading, intro and button drawn in it) with the
               breadcrumb overlaid and a transparent link over the drawn "Explore Our Faculty" button.
             - The single <h1> + intro are shared: visible below lg, `lg:sr-only` from lg up
               (where the image carries them visually), so there is only ever one h1. */}
      <section aria-label="Our faculty" className="relative isolate overflow-hidden bg-[#F4FBFA]">
        {/* Soft teal glows for the text hero only (the image has its own background). */}
        <div aria-hidden="true" className="pointer-events-none absolute -top-32 -right-32 -z-10 h-80 w-80 rounded-full bg-primary-light/15 blur-3xl lg:hidden" />
        <div aria-hidden="true" className="pointer-events-none absolute -bottom-40 -left-32 -z-10 h-80 w-80 rounded-full bg-support/80 blur-3xl lg:hidden" />

        <div className="mx-auto max-w-3xl px-4 pt-8 pb-16 sm:px-5 md:pt-10 md:pb-20 lg:max-w-none lg:p-0">
          <Breadcrumb items={[{ label: 'Doctors' }]} className="mb-8 lg:hidden" />
          <Eyebrow className="lg:hidden">Our Faculty</Eyebrow>
          <h1 className="mt-5 font-display text-4xl leading-[1.08] font-normal tracking-tight text-text sm:text-5xl md:text-6xl lg:sr-only">
            Learn from Experts. <strong className="font-semibold text-primary">Grow with Confidence.</strong>
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-text/70 sm:text-lg lg:sr-only">
            Good teaching turns knowledge into judgement. Our faculty bring clinical experience into every session,
            helping you understand not just what to do in gastroenterology, but why.
          </p>
          <a
            href="#faculty"
            className={`mt-8 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-primary px-7 font-semibold text-white shadow-soft transition duration-300 ease-out hover:-translate-y-0.5 hover:bg-primary-dark hover:shadow-soft-lg motion-reduce:transition-none motion-reduce:hover:translate-y-0 sm:w-auto lg:hidden ${focusRing}`}
          >
            Explore Our Faculty
          </a>
        </div>

        <div className="relative mx-auto hidden max-w-[1920px] lg:block">
          {/* <picture> + a 1px placeholder source below lg stops phones downloading the large
              hero JPG they never show. From lg up the browser uses the <img> exactly as before. */}
          <picture>
            <source media="(max-width: 1023.98px)" srcSet={BLANK_PIXEL} />
            <img
              src={HERO_BG_SRC}
              alt="Our Faculty: learn from expert specialists at Medical Global Academy"
              width={1896}
              height={830}
              fetchPriority="high"
              className="block h-auto w-full select-none"
              draggable={false}
            />
          </picture>

          {/* Breadcrumb overlaid on the image's light top-left area, above the drawn "Our Faculty"
              badge (badge starts ~y 138 of 830). Left edge lines up with the badge (x 70 of 1896).
              A soft white pill keeps it legible wherever the photo is lighter or busier. */}
          <div className="absolute" style={heroBreadcrumbPos}>
            <Breadcrumb
              items={[{ label: 'Doctors' }]}
              className="rounded-full bg-white/75 px-3 py-1 shadow-sm shadow-primary/5 ring-1 ring-primary/10 backdrop-blur-sm"
            />
          </div>

          {/* Transparent hit-area over the button drawn in the image */}
          <a
            href="#faculty"
            aria-label="Explore Our Faculty"
            style={heroFacultyArea}
            className="absolute rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            <span className="sr-only">Explore Our Faculty</span>
          </a>
        </div>
      </section>

      {/* 2 ── Meet our faculty: the existing DoctorCard, unchanged. Each card is wrapped in a Link
             to /doctors/:id here, so DoctorCard itself (also used on Home) stays as it is. */}
      <section id="faculty" className="relative isolate scroll-mt-24 overflow-hidden border-t border-primary/10">
        <div aria-hidden="true" className="pointer-events-none absolute top-24 -right-32 -z-10 h-96 w-96 rounded-full bg-support/70 blur-3xl" />
        <div aria-hidden="true" className="pointer-events-none absolute bottom-0 -left-32 -z-10 h-96 w-96 rounded-full bg-primary-light/10 blur-3xl" />

        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-5 md:py-20 lg:px-6">
          <Reveal>
            <SectionHeading
              align="center"
              eyebrow="Faculty"
              title={
                <>
                  Meet Our <strong>Expert Faculty</strong>
                </>
              }
              intro="The clinicians who teach on our Gastroenterology programmes. Select a doctor to view their full profile."
            />
          </Reveal>

          <ul className="mt-10 grid gap-6 sm:grid-cols-2 md:mt-12 md:gap-8 lg:grid-cols-4">
            {doctors.map((d, i) => (
              <Reveal as="li" key={d.id} delay={staggerDelay(i)} className="h-full">
                <Link
                  to={`/doctors/${d.id}`}
                  aria-label={`View profile: ${d.name}`}
                  className={`block h-full rounded-3xl ${focusRing}`}
                >
                  <DoctorCard doctor={d} />
                </Link>
              </Reveal>
            ))}
          </ul>

          {!FACULTY_CONFIRMED && (
            <p className="mx-auto mt-10 max-w-2xl text-center text-sm leading-relaxed text-text/60">
              Faculty profiles are being finalised. Qualifications and focus areas shown are subject to confirmation.
            </p>
          )}
        </div>
      </section>

      {/* 3 ── How our faculty support learning: ONE light, contained panel (not the navy treatment).
             Left (narrower): eyebrow pill, two-tone headline, intro, pill CTA.
             Right (wider): the four supportFeatures as a plain 2×2 icon + text list (no cards).
             Contrast on the wash (measured, worst point = mint corner under the glow): navy 11.3:1,
             teal 4.7:1, text/75 5.5:1; the gradient headline runs teal → navy, so it never drops below
             the teal end. Icons (teal on primary/10) 4.1–5.0:1, above the 3:1 needed for graphics. */}
      <section className="px-4 py-16 sm:px-5 md:py-20 lg:px-6">
        <div className="relative isolate mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-linear-to-br from-support via-white to-primary-light/15 px-5 py-12 shadow-soft ring-1 ring-primary/10 sm:px-10 md:px-12 md:py-14">
          <div aria-hidden="true" className="pointer-events-none absolute -top-32 -right-32 -z-10 h-96 w-96 rounded-full bg-primary-light/15 blur-3xl" />
          <div aria-hidden="true" className="pointer-events-none absolute -bottom-40 -left-32 -z-10 h-80 w-80 rounded-full bg-support blur-3xl" />

          <div className="grid items-center gap-10 lg:grid-cols-[5fr_7fr] lg:gap-14">
            {/* Left column */}
            <Reveal>
              <Eyebrow>Faculty Support</Eyebrow>
              <h2 className="mt-4 font-display text-3xl leading-[1.1] font-normal tracking-tight md:text-5xl">
                <span className="text-secondary">How our faculty</span>{' '}
                <span className="box-decoration-clone bg-linear-to-r from-primary to-secondary bg-clip-text font-semibold text-transparent">
                  support your learning
                </span>
              </h2>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-text/75 md:text-lg">
                From the first session to certification, you learn with people who know the specialty and want you to
                succeed in it.
              </p>
              <Link
                to="/courses"
                className={`mt-8 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary px-7 font-semibold text-white shadow-soft transition duration-300 ease-out hover:-translate-y-0.5 hover:bg-primary-dark hover:shadow-soft-lg motion-reduce:transition-none motion-reduce:hover:translate-y-0 ${focusRing}`}
              >
                Start Learning Today <span aria-hidden="true">→</span>
              </Link>
            </Reveal>

            {/* Right column: plain feature list, 2×2 from sm up */}
            <ul className="grid gap-x-8 gap-y-8 sm:grid-cols-2 sm:gap-y-10">
              {supportFeatures.map((f, i) => (
                <Reveal as="li" key={f.title} delay={staggerDelay(i)} className="flex items-start gap-4">
                  <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Icon path={f.icon} />
                  </span>
                  <div className="min-w-0">
                    <h3 className="font-display text-lg leading-snug font-semibold text-secondary">{f.title}</h3>
                    <p className="mt-1.5 text-base leading-relaxed text-text/75">{f.text}</p>
                  </div>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 4 ── Teaching approach: navy panel (Home's accreditation-panel style), three numbered blocks.
             Amber is only used on navy here (gold-light on secondary 7.11:1). */}
      <section className="px-4 py-16 sm:px-5 md:py-20 lg:px-6">
        <div className="relative isolate mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-secondary px-5 py-12 text-white shadow-soft-lg sm:px-10 md:py-16">
          <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-gold-light/70 to-transparent" />
          <div aria-hidden="true" className="pointer-events-none absolute -top-40 -right-24 -z-10 h-96 w-96 rounded-full bg-primary/40 blur-3xl" />
          <div aria-hidden="true" className="pointer-events-none absolute -bottom-48 -left-32 -z-10 h-96 w-96 rounded-full bg-primary-dark/40 blur-3xl" />

          <Reveal className="max-w-3xl">
            <p className="inline-flex items-center gap-3 text-xs font-semibold tracking-[0.22em] whitespace-nowrap text-gold-light uppercase">
              <span aria-hidden="true" className="h-px w-8 bg-gold-light" />
              Our Teaching Approach
            </p>
            <h2 className="mt-5 font-display text-3xl leading-tight font-medium md:text-4xl">
              Clinical depth, taught with care
            </h2>
          </Reveal>

          <ol className="mt-10 grid gap-4 md:mt-12 md:grid-cols-3 md:gap-6">
            {teachingApproach.map((t, i) => (
              <Reveal
                as="li"
                key={t.title}
                delay={staggerDelay(i)}
                className="flex flex-col rounded-3xl bg-white/5 p-6 ring-1 ring-white/10 transition duration-300 ease-out hover:-translate-y-1 hover:bg-white/10 hover:ring-gold-light/40 md:p-7"
              >
                <span aria-hidden="true" className="font-display text-sm font-semibold tracking-[0.18em] text-gold-light">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-4 font-display text-xl leading-snug font-medium text-white">{t.title}</h3>
                <p className="mt-3 text-base leading-relaxed text-white/80">{t.text}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* 5 ── Final CTA (shared band) */}
      <CTASection
        title={
          <>
            Take the Next Step in Your <strong>Medical Learning Journey.</strong>
          </>
        }
        text="Explore our Gastroenterology programmes and learn through structured medical education."
        buttonLabel="Explore Courses"
        to="/courses"
        compact
      />
    </>
  )
}
