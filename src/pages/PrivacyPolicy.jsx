import { Link } from 'react-router-dom'

// TODO: policy jab bhi update ho, ye date badalna. Page ke top par dikhti hai.
const LAST_UPDATED = 'November 2026'

const EMAIL = 'support@medicalglobalacademy.com'

/* ============================================================================
 * Policy content. Block types:
 *   { type: 'p',  text }                 paragraph
 *   { type: 'h',  text }                 small sub-heading
 *   { type: 'ul', items: [string | { label, text }] }   bullet list
 * Any occurrence of EMAIL inside a text is turned into a mailto link.
 * ========================================================================== */
const sections = [
  {
    title: '1. Who We Are',
    blocks: [
      {
        type: 'p',
        text: 'Medical Global Academy (“MGA”, “we”, “us”, “our”) operates medicalglobalacademy.com and associated learning platforms.',
      },
      {
        type: 'p',
        text: 'This Privacy Policy explains how we collect, use, store and share information when you use our services.',
      },
      {
        type: 'p',
        text: `For questions about this policy, contact us at ${EMAIL}.`,
      },
    ],
  },
  {
    title: '2. Information We Collect',
    blocks: [
      { type: 'h', text: 'Information You Provide' },
      {
        type: 'ul',
        items: [
          'Name, email address and phone number.',
          'Professional details such as medical registration number, qualification and speciality when required.',
          'Payment information processed securely by our payment partners.',
          'Support messages, feedback and other communications.',
        ],
      },
      { type: 'h', text: 'Information Collected Automatically' },
      {
        type: 'ul',
        items: [
          'IP address, browser and device information.',
          'Pages visited and general website usage.',
          'Cookies and similar technologies.',
        ],
      },
    ],
  },
  {
    title: '3. How We Use Your Information',
    blocks: [
      {
        type: 'ul',
        items: [
          'To process enrolments and provide our programmes.',
          'To manage accounts, assessments and certifications.',
          'To send programme updates and relevant educational content.',
          'To improve our website and learning platform.',
          'To meet legal and regulatory requirements.',
        ],
      },
    ],
  },
  {
    title: '4. Sharing Your Information',
    blocks: [
      {
        type: 'p',
        text: 'We do not sell your personal data to third parties. Information may be shared when necessary with:',
      },
      {
        type: 'ul',
        items: [
          { label: 'Service providers', text: 'Payment processors, email services and hosting providers.' },
          { label: 'Faculty or partners', text: 'Where required for programme coordination.' },
          { label: 'Legal authorities', text: 'When disclosure is required by law or legal process.' },
        ],
      },
    ],
  },
  {
    title: '5. Data Retention',
    blocks: [
      {
        type: 'p',
        text: 'We retain personal information for as long as necessary to provide our services and meet legal obligations.',
      },
      {
        type: 'p',
        text: 'Programme records and certifications may be retained for the period required by applicable obligations. You may request deletion of your account data, subject to legal requirements.',
      },
    ],
  },
  {
    title: '6. Cookies',
    blocks: [
      {
        type: 'p',
        text: 'We use cookies to maintain sessions, remember preferences and understand how visitors use our website.',
      },
      {
        type: 'p',
        text: 'You can control cookies through your browser settings. Disabling certain cookies may affect website functionality.',
      },
      {
        type: 'p',
        text: 'We may use analytics services such as Google Analytics to understand general website usage.',
      },
    ],
  },
  {
    title: '7. Your Rights',
    blocks: [
      { type: 'p', text: 'You may have the right to:' },
      {
        type: 'ul',
        items: [
          'Access the personal information we hold about you.',
          'Request correction of inaccurate information.',
          'Request deletion of your information, where applicable.',
          'Opt out of marketing communications.',
          'Raise a complaint with the relevant authority.',
        ],
      },
      {
        type: 'p',
        text: `To exercise your rights, contact us at ${EMAIL}.`,
      },
    ],
  },
  {
    title: '8. Changes to This Policy',
    blocks: [
      {
        type: 'p',
        text: 'We may update this Privacy Policy from time to time. Material changes may be communicated through email or a notice on our website.',
      },
      {
        type: 'p',
        text: 'The date shown at the top of this page indicates when the policy was most recently updated.',
      },
    ],
  },
  {
    title: '9. Mobile Application',
    blocks: [
      {
        type: 'p',
        text: 'This Privacy Policy also applies to the MGA Academy mobile application and its employee attendance features. The information we collect depends on the features you use.',
      },
    ],
  },
  {
    title: '10. Employee Attendance and Location',
    blocks: [
      {
        type: 'p',
        text: 'The MGA Academy app uses foreground location access to verify an employee’s proximity to their assigned workplace for check-in and check-out.',
      },
      {
        type: 'p',
        text: 'Location is accessed only while the employee uses the check-in or check-out feature. Location coordinates are used to calculate the distance to the assigned workplace and are not stored beyond what is required for attendance records.',
      },
      {
        type: 'p',
        text: 'Attendance records include employee identification, check-in and check-out times, attendance status and, where retained, location information. These records are accessible only to authorized personnel and service providers who require access for attendance administration.',
      },
      {
        type: 'p',
        text: 'You can disable location permission through your device settings. Doing so may prevent location-based check-in and check-out. Unrelated app features do not require attendance location access.',
      },
    ],
  },
  {
    title: '11. Mobile App Permissions',
    blocks: [
      { type: 'p', text: 'Depending on the features you use, the app may request:' },
      {
        type: 'ul',
        items: [
          { label: 'Location', text: 'To verify workplace proximity for employee check-in and check-out.' },
          {
            label: 'Camera and Photos',
            text: 'To capture or select images for supported profile, work-update or document-submission features.',
          },
          {
            label: 'Notifications',
            text: 'To deliver relevant reminders, account notifications and service updates.',
          },
        ],
      },
      {
        type: 'p',
        text: 'You can manage permissions through your device settings. Disabling a permission may limit the related feature.',
      },
    ],
  },
  {
    title: '12. Mobile Service Providers',
    blocks: [
      {
        type: 'p',
        text: 'We use third-party service providers for authentication, hosting, storage and notifications. These providers process the information necessary to deliver their services and are required to provide appropriate protection for personal information.',
      },
      {
        type: 'p',
        text: 'Where analytics or advertising services receive personal information, we disclose the information shared, its purpose and applicable consent choices. If no such services are used, this sentence does not apply.',
      },
    ],
  },
  {
    title: '13. Retention and Account Deletion',
    blocks: [
      {
        type: 'p',
        text: 'We retain attendance records and stored location information for the period required to administer attendance and meet legal obligations.',
      },
      {
        type: 'p',
        text: `You can initiate account deletion within the app through the account settings menu. For assistance, contact ${EMAIL}.`,
      },
      {
        type: 'p',
        text: 'Requests are processed within a reasonable timeframe. Associated personal information is deleted unless retention is required by law. Any retained records are limited to the applicable legal purpose and retention period.',
      },
    ],
  },
  {
    title: '14. Security and Data Processing',
    blocks: [
      {
        type: 'p',
        text: 'We use appropriate technical and organizational security measures to protect personal information against unauthorized access, disclosure, alteration and loss.',
      },
      {
        type: 'p',
        text: 'Personal information may be stored or processed in the countries or regions where our service providers operate. Where international transfers occur, we apply safeguards required by applicable law.',
      },
    ],
  },
  {
    title: '15. Payments on Different Platforms',
    blocks: [
      {
        type: 'p',
        text: 'Programme payments may be available through our website and processed by our payment partners. Course purchases and payment checkout are not available within the MGA Academy iOS app.',
      },
    ],
  },
]

const sectionId = (i) => `section-${i + 1}`

const focusRing = 'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary'

const emailLinkClass = `rounded font-medium text-primary underline decoration-primary/30 underline-offset-4 transition-colors hover:text-primary-dark hover:decoration-primary ${focusRing}`

/** Turns every occurrence of the support email inside a string into a mailto link. */
function RichText({ text }) {
  const parts = text.split(EMAIL)
  return parts.map((part, i) => (
    <span key={i}>
      {part}
      {i < parts.length - 1 && (
        <a href={`mailto:${EMAIL}`} className={emailLinkClass}>
          {EMAIL}
        </a>
      )}
    </span>
  ))
}

function Block({ block }) {
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
                    <strong className="font-semibold text-text">{item.label}:</strong> {item.text}
                  </>
                ) : (
                  item
                )}
              </span>
            </li>
          )
        })}
      </ul>
    )
  }

  return (
    <p className="mt-4 text-base leading-relaxed text-text/80 first:mt-0">
      <RichText text={block.text} />
    </p>
  )
}

export default function PrivacyPolicy() {
  return (
    <>
      <title>Privacy Policy | GastroenterologyNow</title>
      <meta
        name="description"
        content="How Medical Global Academy collects, uses, stores and shares your information across its websites and mobile app."
      />

      {/* Header band */}
      <section className="relative isolate overflow-hidden bg-linear-to-b from-support to-transparent">
        <div aria-hidden="true" className="pointer-events-none absolute -top-32 -right-32 -z-10 h-96 w-96 rounded-full bg-primary-light/15 blur-3xl" />
        <div className="mx-auto max-w-7xl px-4 pt-16 pb-10 sm:px-5 md:pt-24 md:pb-14 lg:px-6">
          <nav aria-label="Breadcrumb" className="text-sm text-text/60">
            <Link to="/" className={`rounded transition-colors hover:text-primary ${focusRing}`}>
              Home
            </Link>
            <span aria-hidden="true" className="mx-2">/</span>
            <span aria-current="page" className="text-text/80">Privacy Policy</span>
          </nav>

          <p className="mt-6 text-xs font-semibold tracking-[0.2em] text-secondary uppercase">Legal</p>
          <h1 className="mt-3 font-display text-4xl leading-tight font-medium text-primary md:text-5xl">
            Privacy Policy
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-text/70 md:text-lg">
            How Medical Global Academy collects, uses, stores and shares your information.
          </p>
          <p className="mt-5 inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-sm font-medium text-text/70 shadow-soft ring-1 ring-primary/10">
            Last updated: <time>{LAST_UPDATED}</time>
          </p>
        </div>
      </section>

      {/* Body: contents list + policy text */}
      <div className="mx-auto grid max-w-7xl gap-10 px-4 pt-6 pb-24 sm:px-5 md:pb-32 lg:grid-cols-[18rem_minmax(0,1fr)] lg:gap-14 lg:px-6">
        <aside className="lg:sticky lg:top-28 lg:self-start">
          <nav
            aria-label="Privacy policy contents"
            className="rounded-3xl bg-white p-6 shadow-soft ring-1 ring-primary/10"
          >
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
                <h2
                  id={`${sectionId(i)}-title`}
                  className="font-display text-2xl leading-snug font-medium text-primary"
                >
                  {s.title}
                </h2>
                <div className="mt-4">
                  {s.blocks.map((b, j) => (
                    <Block key={j} block={b} />
                  ))}
                </div>
              </section>
            ))}
          </div>

          {/* Contact card */}
          <div className="mt-10 rounded-3xl bg-linear-to-b from-support to-support/40 p-6 ring-1 ring-primary/10 sm:p-8">
            <p className="font-display text-xl font-medium text-primary">Questions about this policy?</p>
            <p className="mt-2 text-base leading-relaxed text-text/75">
              Write to us and we will get back to you.
            </p>
            <a
              href={`mailto:${EMAIL}`}
              className={`mt-5 inline-flex h-12 items-center justify-center rounded-xl bg-primary px-6 font-semibold text-white shadow-soft transition duration-300 ease-out hover:-translate-y-0.5 hover:bg-primary-dark hover:shadow-soft-lg ${focusRing}`}
            >
              {EMAIL}
            </a>
          </div>
        </article>
      </div>
    </>
  )
}