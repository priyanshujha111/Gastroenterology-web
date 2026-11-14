import LegalPage from '../components/LegalPage.jsx'

// TODO: policy jab bhi update ho, ye date badalna. Page ke top par dikhti hai.
const LAST_UPDATED = 'November 2026'

const EMAIL = 'support@medicalglobalacademy.com'

/* ============================================================================
 * Policy content. Block types:
 *   { type: 'p',  text }                 paragraph
 *   { type: 'h',  text }                 small sub-heading
 *   { type: 'ul', items: [string | { label, text }] }   bullet list
 * Rendered by components/LegalPage.jsx. Any occurrence of EMAIL inside a text becomes a mailto link.
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

export default function PrivacyPolicy() {
  return (
    <>
      <title>Privacy Policy | GastroenterologyNow</title>
      <meta
        name="description"
        content="How Medical Global Academy collects, uses, stores and shares your information across its websites and mobile app."
      />
      <LegalPage
        title="Privacy Policy"
        intro="How Medical Global Academy collects, uses, stores and shares your information."
        lastUpdated={LAST_UPDATED}
        sections={sections}
        contentsLabel="Privacy policy contents"
        contactTitle="Questions about this policy?"
        email={EMAIL}
        links={[{ text: EMAIL, href: `mailto:${EMAIL}` }]}
      />
    </>
  )
}
