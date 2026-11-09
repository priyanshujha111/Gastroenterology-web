/* ============================================================================
 * About-page content.
 * Items marked COMPANY-WIDE are shared Medical Global Academy content.
 * Items marked TODO / DRAFT need confirmation.
 * icon = SVG path(s) on a 24x24 grid, drawn as a stroke icon (decorative only).
 * ========================================================================== */

// Decorative icon paths, shared by the arrays below.
const icons = {
  certificate: 'M6 3h9l4 4v14H6z M14 3v5h5 M9 13h7 M9 17h5',
  medal: 'M12 15a4 4 0 100-8 4 4 0 000 8z M9 14.5L8 21l4-2 4 2-1-6.5',
  cap: 'M12 3L2 8l10 5 10-5-10-5z M6 10.5V16c0 1.5 2.7 3 6 3s6-1.5 6-3v-5.5',
  clipboard: 'M9 4h6v3H9z M7 5H5v15h14V5h-2 M9 12h6 M9 16h4',
  liveClass: 'M3 5h18v11H3z M8 20h8 M12 16v4 M10 8.5v4l3.5-2-3.5-2z',
  award: 'M12 15a6 6 0 100-12 6 6 0 000 12z M8.2 13.9L7 22l5-3 5 3-1.2-8.1',
  clock: 'M12 21a9 9 0 100-18 9 9 0 000 18z M12 7v5l3 2',
  people:
    'M16 19v-1a4 4 0 00-4-4H7a4 4 0 00-4 4v1 M9.5 10a3 3 0 100-6 3 3 0 000 6z M21 19v-1a4 4 0 00-3-3.87 M16 4.13a3 3 0 010 5.74',
  globe:
    'M12 21a9 9 0 100-18 9 9 0 000 18z M3 12h18 M12 3c2.5 2.5 3.8 5.5 3.8 9s-1.3 6.5-3.8 9c-2.5-2.5-3.8-5.5-3.8-9S9.5 5.5 12 3z',
}

// COMPANY-WIDE: specialties MGA teaches. Gastroenterology is listed first on this site.
export const specialties = [
  'Gastroenterology',
  'Cardiology',
  'Medicine',
  'Oncology',
  'Nephrology',
  'Neurology',
  'Orthopedics',
  'Obstetrics & Gynecology',
]

// COMPANY-WIDE: hero "What we offer" tiles, with MGA-wide programme counts.
// badge is optional (shown as a small pill next to the title).
export const offerings = [
  {
    title: 'Certificate Courses',
    line: 'Short, focused programmes for professional learning and skill development.',
    count: '41+ programmes',
    icon: icons.certificate,
  },
  {
    title: 'Fellowship Programmes',
    line: 'Speciality-focused learning with experienced faculty.',
    count: '203+ programmes',
    badge: 'Most Popular',
    icon: icons.medal,
  },
  {
    title: 'PG Diploma Programmes',
    line: 'In-depth postgraduate-level learning to strengthen your clinical knowledge in your chosen speciality.',
    count: '64+ programmes',
    icon: icons.cap,
  },
]

// COMPANY-WIDE
export const recognitions = ['CPD Accredited', 'ACTD Accredited', 'Global Recognition']

// COMPANY-WIDE: "How it works" enrolment steps.
export const approach = [
  {
    title: 'Choose your programme',
    line: 'Browse Certificate, Fellowship and PG Diploma programmes by speciality.',
    icon: icons.clipboard,
  },
  {
    title: 'Enrol online',
    line: 'Pick the attending or non-attending format that suits your schedule.',
    icon: icons.certificate,
  },
  {
    title: 'Learn your way',
    line: 'Online learning, live faculty-led sessions and recorded sessions where available.',
    icon: icons.liveClass,
  },
  {
    title: 'Get certified',
    line: 'Complete your programme and receive your certification.',
    icon: icons.award,
  },
]

// COMPANY-WIDE: "Why MGA" learning benefits.
export const learningModes = [
  { title: 'Flexible', line: 'Learn around your professional schedule.', icon: icons.clock },
  { title: 'Accessible', line: 'Access online learning and available recorded sessions.', icon: icons.liveClass },
  { title: 'Faculty-led', line: 'Learn from experienced medical professionals.', icon: icons.people },
  { title: 'Anywhere', line: 'Access the online learning component from anywhere.', icon: icons.globe },
]

// DRAFT COPY: generic organisational values for ValuesSection (no factual claims).
// Confirm or replace with MGA's official values before launch.
export const values = [
  {
    title: 'Clinical relevance',
    line: 'Teaching anchored in what doctors actually see in clinic and on the ward.',
    icon: 'M12 21s-7-4.5-7-10a4 4 0 017-2.6A4 4 0 0119 11c0 5.5-7 10-7 10z M9 11h2l1-2 1.5 4 1-2H16',
  },
  {
    title: 'Accuracy first',
    line: 'Content that aims to be accurate, referenced and kept current.',
    icon: 'M9 12l2 2 4-4 M12 3l7 3v5c0 4.5-3 8.5-7 10-4-1.5-7-5.5-7-10V6z',
  },
  {
    title: 'Access for working doctors',
    line: 'Formats that fit around clinical rotas, wherever you practise.',
    icon: icons.globe,
  },
  {
    title: 'Learner support',
    line: 'Guidance from enquiry to certificate, so you always know your next step.',
    icon: 'M21 12a8 8 0 01-11.6 7.1L4 20l1-4.6A8 8 0 1121 12z M8.5 12h.01 M12 12h.01 M15.5 12h.01',
  },
]
