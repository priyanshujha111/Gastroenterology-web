import { useState } from 'react'
import { Link } from 'react-router-dom'
import Breadcrumb from '../components/Breadcrumb.jsx'
import Reveal from '../components/Reveal.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import { FaqItem } from '../components/FaqSection.jsx'
import { staggerDelay } from '../hooks/useReveal.js'
import { COUNSELLOR_PHONE_HREF, COUNSELLOR_WHATSAPP } from '../api/courseList.js'

/*
 * Support page (/support). All copy as supplied by MGA.
 * Contact details: same phone/WhatsApp number as the Footer and course pages (+91 9289994218).
 */

const EMAIL = 'support@medicalglobalacademy.com'
const PHONE_DISPLAY = '+91 9289994218'
const HOURS = 'Mon–Sat, 10:00 AM – 6:00 PM IST'
const WHATSAPP_HREF = `https://wa.me/${COUNSELLOR_WHATSAPP}`
const DELETE_REQUEST_HREF = `mailto:${EMAIL}?subject=${encodeURIComponent('Account Deletion Request')}`

const focusRing = 'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary'
const primaryButton = `inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-primary px-6 font-semibold text-white shadow-soft transition duration-300 ease-out hover:-translate-y-0.5 hover:bg-primary-dark hover:shadow-soft-lg motion-reduce:transition-none motion-reduce:hover:translate-y-0 ${focusRing}`

const icons = {
  mail: 'M4 6h16v12H4z M4 7l8 6 8-6',
  phone: 'M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z',
  clock: 'M12 21a9 9 0 100-18 9 9 0 000 18z M12 7v5l3 2',
  user: 'M12 12a4 4 0 100-8 4 4 0 000 8z M4 21a8 8 0 0116 0',
  key: 'M15 9a4 4 0 10-3.9 4.9L9 16H7v2H5v2H3v-2.6l6.1-6.1A4 4 0 0015 9z M15.5 8.5h.01',
  clipboard: 'M9 4h6v3H9z M7 5H5v15h14V5h-2 M9 12h6 M9 16h4',
  lock: 'M6 11h12v10H6z M8 11V7a4 4 0 018 0v4',
  video: 'M3 7h12v10H3z M15 10l6-3v10l-6-3',
  card: 'M3 6h18v12H3z M3 10h18 M7 15h4',
  award: 'M12 15a6 6 0 100-12 6 6 0 000 12z M8.2 13.9L7 22l5-3 5 3-1.2-8.1',
  wrench: 'M14.5 6.5a4 4 0 00-5.3 5.3L4 17l3 3 5.2-5.2a4 4 0 005.3-5.3l-2.5 2.5-2.5-.5-.5-2.5z',
  chat: 'M21 12a8 8 0 01-11.6 7.1L4 20l1-4.6A8 8 0 1121 12z M8.5 12h.01 M12 12h.01 M15.5 12h.01',
  trash: 'M4 7h16 M9 7V4h6v3 M6 7l1 13h10l1-13 M10 11v6 M14 11v6',
  check: 'M5 12.5l4.5 4.5L19 7.5',
  archive: 'M3 5h18v4H3z M5 9v10h14V9 M10 13h4',
  phoneApp: 'M8 2h8a1 1 0 011 1v18a1 1 0 01-1 1H8a1 1 0 01-1-1V3a1 1 0 011-1z M11 18h2',
  link: 'M10 14a4 4 0 005.7 0l3-3a4 4 0 00-5.7-5.7l-1 1 M14 10a4 4 0 00-5.7 0l-3 3a4 4 0 005.7 5.7l1-1',
}

const contactItems = [
  { label: 'Support Email', value: EMAIL, href: `mailto:${EMAIL}`, icon: icons.mail },
  { label: 'Phone / WhatsApp', value: PHONE_DISPLAY, href: COUNSELLOR_PHONE_HREF, icon: icons.phone },
  { label: 'Support Hours', value: HOURS, icon: icons.clock },
]

const helpTopics = [
  { title: 'Login & Account Issues', text: 'Trouble signing in, wrong credentials or problems with your profile details.', icon: icons.user },
  { title: 'Password Reset', text: 'Forgot your password or unable to reset it? We will help you regain access.', icon: icons.key },
  { title: 'Course Enrollment', text: 'Questions about eligibility, enrolling in a program and batch start dates.', icon: icons.clipboard },
  { title: 'Course Access Issues', text: 'Cannot see your course, modules are locked or content is not loading.', icon: icons.lock },
  { title: 'Live Class & Video Issues', text: 'Problems joining live classes, video buffering or audio and playback errors.', icon: icons.video },
  { title: 'Payment & Refund Queries', text: 'Payment not reflected, failed transactions, invoices and refund requests.', icon: icons.card },
  { title: 'Certificate Issues', text: 'Certificate not received, name correction or verification questions.', icon: icons.award },
  { title: 'Technical Support', text: 'App crashes, slow performance, installation or update problems.', icon: icons.wrench },
  { title: 'General App Issues', text: 'Any other question or feedback about the Medical Global Academy app.', icon: icons.chat },
]

// TODO(MGA): answers for the last four questions were not supplied. Only questions with an answer are
// shown on the page; add the `answer` text here and each one appears automatically.
const faqs = [
  {
    question: 'How do I log in?',
    answer:
      'Open the app and sign in with the email address or phone number you registered with, along with your password. If you do not have an account yet, tap Sign up and create one.',
  },
  { question: 'How do I enroll in a course?', answer: '' },
  { question: 'How do I reset my password?', answer: '' },
  { question: 'How do I contact support?', answer: '' },
  { question: 'How do I request a refund?', answer: '' },
]
const answeredFaqs = faqs.filter((f) => f.answer)

const deletionSteps = [
  <>
    Email us at <a href={DELETE_REQUEST_HREF} className={`rounded font-semibold text-primary hover:underline ${focusRing}`}>{EMAIL}</a>{' '}
    with the subject “Account Deletion Request”, or message us on{' '}
    <a href={WHATSAPP_HREF} target="_blank" rel="noopener noreferrer" className={`rounded font-semibold text-primary hover:underline ${focusRing}`}>
      WhatsApp
    </a>
    .
  </>,
  'Include your registered name, email address and phone number so we can verify your account.',
  'We will confirm your request and complete the deletion within 30 days of verification.',
]
const deletedData = [
  'Your account and profile information (name, email address, phone number)',
  'Your login credentials and saved app preferences',
  'Your course progress and activity linked to your account',
]
const retainedData = [
  'Payment and transaction records, which we may need to keep for accounting, tax and legal compliance',
  'Certificate issuance records, where required to verify certificates already issued',
]

// An entry with neither `to` nor `href` shows as "Coming soon" instead of a dead link.
const usefulLinks = [
  { label: 'Privacy Policy', to: '/privacy-policy' },
  { label: 'Terms & Conditions', to: '/terms' },
  { label: 'Refund & Cancellation Policy', to: '/refund-policy' },
  { label: 'Contact Us', href: '#contact' },
]

const appInfo = [
  { label: 'App Name', value: 'Medical Global Academy' },
  { label: 'Platform', value: 'Android & iOS' },
]

function Icon({ path, className = 'h-6 w-6' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={path} />
    </svg>
  )
}

/** Teal icon tile with the site's hover-fill (inside a `group`). */
function IconTile({ path }) {
  return (
    <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary transition duration-300 ease-out motion-reduce:transition-none group-hover:bg-linear-to-br group-hover:from-primary group-hover:to-primary-dark group-hover:text-white">
      <Icon path={path} />
    </span>
  )
}

export default function Support() {
  const [openFaq, setOpenFaq] = useState(0)

  return (
    <>
      <title>Support | GastroenterologyNow by Medical Global Academy</title>
      <meta
        name="description"
        content="Get help with the Medical Global Academy app: account access, enrolment, courses, live classes, payments, certificates and account deletion."
      />

      {/* 1 ── Header band (same pattern as the Privacy Policy page) */}
      <section className="relative isolate overflow-hidden bg-linear-to-b from-support to-transparent">
        <div aria-hidden="true" className="pointer-events-none absolute -top-32 -right-32 -z-10 h-96 w-96 rounded-full bg-primary-light/15 blur-3xl" />
        <div className="mx-auto max-w-7xl px-4 pt-12 pb-10 sm:px-5 md:pt-16 md:pb-14 lg:px-6">
          <Breadcrumb items={[{ label: 'Support' }]} />
          <p className="mt-6 text-xs font-semibold tracking-[0.2em] text-secondary uppercase">Support</p>
          <h1 className="mt-3 font-display text-4xl leading-tight font-medium text-primary md:text-5xl">
            Medical Global Academy Support
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-text/70 md:text-lg">
            Need help with the Medical Global Academy app? You are in the right place.
          </p>
        </div>
      </section>

      {/* 2 ── About + Contact information. 375/768px: stacked · 1024px+: 7/5 columns. */}
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-5 md:pb-20 lg:px-6">
        <div className="grid items-start gap-8 lg:grid-cols-[7fr_5fr] lg:gap-12">
          <Reveal className="min-w-0 rounded-3xl bg-white p-8 shadow-soft ring-1 ring-primary/10 md:p-10">
            <h2 className="font-display text-2xl font-medium text-primary md:text-3xl">About</h2>
            <p className="mt-4 text-base leading-relaxed text-text/80 md:text-lg">
              Medical Global Academy is an online learning platform for doctors and healthcare professionals. Through
              our Android and iOS app, you can enrol in certificate, fellowship and PG diploma programs, access course
              content, attend live classes and earn certificates while continuing your clinical work.
            </p>
            <p className="mt-4 text-base leading-relaxed text-text/80 md:text-lg">
              Our support team helps you with account access, enrolment, course and live class issues, payments,
              certificates and any technical problem you face in the app.
            </p>
          </Reveal>

          {/* Contact card. id="contact" is the target of "Contact Us" under Useful Links.
              Amber only on navy (gold-light on secondary 7.11:1); body white/85 on navy ≈ 12:1. */}
          <Reveal
            as="aside"
            id="contact"
            delay={120}
            className="relative isolate min-w-0 scroll-mt-28 overflow-hidden rounded-3xl bg-secondary p-8 text-white shadow-soft-lg md:p-10"
          >
            <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-gold-light/70 to-transparent" />
            <div aria-hidden="true" className="pointer-events-none absolute -top-24 -right-24 -z-10 h-64 w-64 rounded-full bg-primary/40 blur-3xl" />
            <h2 className="font-display text-2xl font-medium md:text-3xl">Contact Information</h2>
            <dl className="mt-6 grid gap-5">
              {contactItems.map((c) => (
                <div key={c.label} className="flex items-start gap-4">
                  <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/10 text-gold-light ring-1 ring-white/15">
                    <Icon path={c.icon} className="h-5 w-5" />
                  </span>
                  <div className="min-w-0">
                    <dt className="text-xs font-semibold tracking-wider text-white/70 uppercase">{c.label}</dt>
                    <dd className="mt-1 text-base leading-relaxed break-words text-white">
                      {c.href ? (
                        <a href={c.href} className="rounded font-medium underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
                          {c.value}
                        </a>
                      ) : (
                        c.value
                      )}
                    </dd>
                  </div>
                </div>
              ))}
            </dl>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={WHATSAPP_HREF}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-white px-6 font-semibold text-secondary shadow-soft transition duration-300 ease-out hover:-translate-y-0.5 hover:bg-support motion-reduce:transition-none motion-reduce:hover:translate-y-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                <Icon path={icons.chat} className="h-5 w-5" /> Chat on WhatsApp
              </a>
              <a
                href={`mailto:${EMAIL}`}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-white/10 px-6 font-semibold text-white ring-1 ring-white/25 transition duration-300 ease-out hover:-translate-y-0.5 hover:bg-white/15 motion-reduce:transition-none motion-reduce:hover:translate-y-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                <Icon path={icons.mail} className="h-5 w-5" /> Email Support
              </a>
            </div>
            <p className="mt-6 border-t border-white/15 pt-5 text-sm text-white/85">
              <span className="font-semibold text-white">Response Time:</span> We usually respond within 24–48 business
              hours.
            </p>
          </Reveal>
        </div>
      </section>

      {/* 3 ── How we can help: 9 topics. 375px: 1 col · 640px: 2 · 1024px+: 3. */}
      <section className="relative isolate overflow-hidden bg-linear-to-b from-transparent via-support/60 to-transparent">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-5 md:py-20 lg:px-6">
          <Reveal>
            <SectionHeading align="center" eyebrow="Help Topics" title={<>How We Can <strong>Help</strong></>} />
          </Reveal>
          <ul className="mt-10 grid gap-5 sm:grid-cols-2 md:mt-12 md:gap-6 lg:grid-cols-3">
            {helpTopics.map((t, i) => (
              <Reveal
                as="li"
                key={t.title}
                delay={staggerDelay(i)}
                className="group flex items-start gap-4 rounded-3xl bg-white p-6 shadow-soft ring-1 ring-primary/10 transition duration-300 ease-out hover:-translate-y-1 hover:shadow-soft-lg"
              >
                <IconTile path={t.icon} />
                <div className="min-w-0">
                  <h3 className="font-display text-lg leading-snug font-semibold text-primary">{t.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-text/75">{t.text}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* 4 ── FAQs: same accordion as the Home page (FaqItem). Only answered questions are shown. */}
      {answeredFaqs.length > 0 && (
        <section className="mx-auto max-w-4xl px-4 py-16 sm:px-5 md:py-20 lg:px-6">
          <Reveal>
            <SectionHeading align="center" eyebrow="FAQ" title={<>Frequently Asked <strong>Questions (FAQs)</strong></>} />
          </Reveal>
          <Reveal delay={120} className="mt-10 flex flex-col gap-4 md:mt-12">
            {answeredFaqs.map((f, i) => (
              <FaqItem
                key={f.question}
                id={`support-faq-${i}`}
                index={i}
                question={f.question}
                answer={f.answer}
                open={openFaq === i}
                onToggle={() => setOpenFaq(openFaq === i ? null : i)}
              />
            ))}
          </Reveal>
        </section>
      )}

      {/* 5 ── Delete account request. Steps full width; deleted / retained data side by side from 768px. */}
      <section id="delete-account" className="mx-auto max-w-7xl scroll-mt-28 px-4 py-16 sm:px-5 md:py-20 lg:px-6">
        <Reveal className="rounded-[2rem] bg-white p-6 shadow-soft ring-1 ring-primary/10 sm:p-8 md:p-12">
          <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
            <div className="max-w-2xl">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <Icon path={icons.trash} />
              </span>
              <h2 className="mt-5 font-display text-2xl font-medium text-primary md:text-3xl">Delete Account Request</h2>
              <p className="mt-3 text-base leading-relaxed text-text/75 md:text-lg">
                You can request deletion of your Medical Global Academy account at any time by contacting our support
                team.
              </p>
            </div>
            <a href={DELETE_REQUEST_HREF} className={`shrink-0 self-start ${primaryButton}`}>
              Request Account Deletion
            </a>
          </div>

          <h3 className="mt-10 font-display text-xl font-medium text-text">How to request deletion</h3>
          <ol className="mt-4 grid gap-3">
            {deletionSteps.map((step, i) => (
              <li key={i} className="flex items-start gap-4 text-base leading-relaxed text-text/80">
                <span aria-hidden="true" className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-secondary font-sans text-sm font-semibold text-gold-light tabular-nums">
                  {i + 1}
                </span>
                <span className="min-w-0 pt-1">{step}</span>
              </li>
            ))}
          </ol>

          <div className="mt-10 grid gap-5 md:grid-cols-2">
            <div className="rounded-2xl bg-support p-6">
              <h3 className="flex items-center gap-2 font-display text-lg font-semibold text-primary">
                <Icon path={icons.trash} className="h-5 w-5" /> Data that will be deleted
              </h3>
              <ul className="mt-4 grid gap-3">
                {deletedData.map((d) => (
                  <li key={d} className="flex items-start gap-3 text-sm leading-relaxed text-text/80 md:text-base">
                    <span aria-hidden="true" className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Icon path={icons.check} className="h-3 w-3" />
                    </span>
                    {d}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl bg-support p-6">
              <h3 className="flex items-center gap-2 font-display text-lg font-semibold text-secondary">
                <Icon path={icons.archive} className="h-5 w-5" /> Data that may be retained
              </h3>
              <ul className="mt-4 grid gap-3">
                {retainedData.map((d) => (
                  <li key={d} className="flex items-start gap-3 text-sm leading-relaxed text-text/80 md:text-base">
                    <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-secondary" />
                    {d}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <p className="mt-6 text-sm leading-relaxed text-text/70">
            Retained records are kept only for as long as required by law and are not used for any other purpose.
          </p>
        </Reveal>
      </section>

      {/* 6 ── Useful links + App information. 375px: stacked · 768px+: side by side. */}
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-5 md:pb-20 lg:px-6">
        <div className="grid gap-6 md:grid-cols-2 md:gap-8">
          <Reveal className="rounded-3xl bg-white p-8 shadow-soft ring-1 ring-primary/10">
            <h2 className="flex items-center gap-3 font-display text-xl font-medium text-primary">
              <Icon path={icons.link} className="h-5 w-5" /> Useful Links
            </h2>
            <ul className="mt-5 grid gap-3">
              {usefulLinks.map((l) => (
                <li key={l.label}>
                  {l.to ? (
                    <Link to={l.to} className={`inline-flex items-center gap-2 rounded font-semibold text-primary hover:text-primary-dark hover:underline ${focusRing}`}>
                      {l.label} <span aria-hidden="true">→</span>
                    </Link>
                  ) : l.href ? (
                    <a href={l.href} className={`inline-flex items-center gap-2 rounded font-semibold text-primary hover:text-primary-dark hover:underline ${focusRing}`}>
                      {l.label} <span aria-hidden="true">→</span>
                    </a>
                  ) : (
                    <span className="inline-flex items-center gap-2 font-semibold text-text/60">
                      {l.label}
                      <span className="rounded-full bg-support px-2.5 py-0.5 text-xs font-medium text-text/70">Coming soon</span>
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={120} className="rounded-3xl bg-white p-8 shadow-soft ring-1 ring-primary/10">
            <h2 className="flex items-center gap-3 font-display text-xl font-medium text-primary">
              <Icon path={icons.phoneApp} className="h-5 w-5" /> App Information
            </h2>
            <dl className="mt-5 grid gap-4 sm:grid-cols-2">
              {appInfo.map((a) => (
                <div key={a.label} className="rounded-2xl bg-support px-5 py-4">
                  <dt className="text-xs font-semibold tracking-wider text-text/70 uppercase">{a.label}</dt>
                  <dd className="mt-1 font-semibold text-secondary">{a.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>
    </>
  )
}
