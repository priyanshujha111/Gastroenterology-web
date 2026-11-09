import { useEffect, useState } from 'react'
import { courseImageUrl } from './courseList.js'

/* ============================================================================
 * MGA LMS: Gastroenterology course feed
 * ----------------------------------------------------------------------------
 * GET https://24x7.medicalglobalacademy.com/api/course-list
 *
 * Observed response (inspected 2026-11-06):
 *   - A plain top-level ARRAY of course objects (321 at inspection), ~578 KB.
 *   - NO server-side filtering: ?category=, ?category_id=, ?department=,
 *     ?specialty=, ?search=, ?filter= are all ignored. We filter client-side.
 *   - Per course: id, name, slug, type ('Fellowship' | 'Pg Diploma' | 'Certificate'),
 *     category ({ id, name, … } or null), category_id, department (JSON array
 *     *as a string*, or null), description (plain text, hard-wrapped with \r\n),
 *     fee, total_fee, online_cpd, hybrid_cpd, duration (6 | 12, no unit),
 *     start_date, image (bare filename), image_alt, top_courses (0 | 1), actd, …
 *   - No `mode` field and no course URL field.
 * ========================================================================== */

export const LMS_CONFIG = {
  baseUrl: 'https://24x7.medicalglobalacademy.com',
  endpoint: '/api/course-list',
}

/* ── Which courses belong on this site ─────────────────────────────────────── */

const SPECIALTY = 'gastroenterology'

/**
 * Explicit allowlist for GI courses the category rule can't catch.
 *   203  Fellowship in Pediatric Gastroenterology: its category is "Pediatrics"
 *        (Gastroenterology appears only in its department list), so the category
 *        rule misses it, but it's a gastroenterology programme and belongs here.
 * Deliberately NOT included (decided with the MGA team):
 *   55   Fellowship in GI Surgery (belongs to the Surgery vertical)
 *   91   Fellowship in GI Oncology, 322 Fellowship in Clinical Nutrition
 */
const EXTRA_COURSE_IDS = new Set([203])

/**
 * A course is Gastroenterology when:
 *   - its category name is "Gastroenterology" (case-insensitive), OR
 *   - it has NO category and its name contains "Gastroenterology"
 *     (e.g. id 225 "Certificate In Gastroenterology", which is uncategorised), OR
 *   - its id is in EXTRA_COURSE_IDS.
 */
export function matchesGastroenterology(raw) {
  if (EXTRA_COURSE_IDS.has(raw?.id)) return true
  const categoryName = raw?.category?.name
  if (categoryName) return categoryName.trim().toLowerCase() === SPECIALTY
  return typeof raw?.name === 'string' && raw.name.toLowerCase().includes(SPECIALTY)
}

/* ── Response → app shape ──────────────────────────────────────────────────── */

/** The endpoint returns a top-level array. Anything else means the API changed. */
function extractCourseList(json) {
  if (Array.isArray(json)) return json
  throw new Error('Unexpected LMS response: expected a top-level array (see src/api/lms.js).')
}

// TODO: Confirm with LMS team whether online_cpd/hybrid_cpd are full program prices
// and whether currency is always INR. Until then we show only `fee`, labelled
// "Registration Fee", formatted as INR.
const inr = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 })

/** Description is hard-wrapped with \r\n mid-sentence; join it back into flowing text. */
const cleanText = (s) => (typeof s === 'string' ? s.replace(/\s*\r?\n\s*/g, ' ').replace(/\s{2,}/g, ' ').trim() : '')

/**
 * Mode is derived (the API has no mode field):
 *   both online_cpd and hybrid_cpd > 0 → "Online · Hybrid"
 *   only one > 0                       → that one alone
 *   both 0 (certificates)              → undefined, so no mode badge is shown
 */
function deriveMode(raw) {
  const online = raw.online_cpd > 0
  const hybrid = raw.hybrid_cpd > 0
  if (online && hybrid) return 'Online · Hybrid'
  if (online) return 'Online'
  if (hybrid) return 'Hybrid'
  return undefined
}

/**
 * Normalised course used by CourseCard / Courses / CourseDetail:
 *   { id, slug, name, type, description, duration, durationMonths, fee, feeLabel,
 *     mode, startDate, featured, url, imageUrl, imageAlt }
 */
export function mapCourse(raw) {
  const months = Number.isFinite(raw.duration) && raw.duration > 0 ? raw.duration : undefined
  return {
    id: raw.id,
    slug: raw.slug,
    name: cleanText(raw.name),
    imageUrl: courseImageUrl(raw.image), // raw.image is a bare filename
    imageAlt: raw.image_alt || cleanText(raw.name),
    type: raw.type || undefined,
    description: cleanText(raw.description),
    durationMonths: months,
    duration: months ? `${months} months` : undefined, // unit assumed: months
    fee: raw.fee > 0 ? inr.format(raw.fee) : undefined,
    feeLabel: 'Registration Fee',
    mode: deriveMode(raw),
    startDate: raw.start_date || undefined,
    featured: raw.top_courses === 1,
    // Detail route is /courses/:slug (CourseDetail looks courses up by slug, same as Courses.jsx).
    url: raw.slug ? `/courses/${raw.slug}` : `/courses/${raw.id}`,
  }
}

/* ── Fetching (one shared request for the whole app) ───────────────────────── */

let coursesPromise = null

/**
 * Fetches the full list once (≈578 KB, several seconds) and shares the result,
 * so Home, Courses and CourseDetail don't each download it. A failed request
 * clears the cache so "Try again" really retries.
 */
export function fetchGastroCourses() {
  if (!coursesPromise) {
    const url = new URL(LMS_CONFIG.endpoint, LMS_CONFIG.baseUrl)
    coursesPromise = fetch(url, { headers: { Accept: 'application/json' } })
      .then((res) => {
        if (!res.ok) throw new Error(`LMS request failed: ${res.status} ${res.statusText}`)
        return res.json()
      })
      .then((json) => {
        const all = extractCourseList(json)
        const matched = all.filter(matchesGastroenterology)
        if (import.meta.env.DEV) {
          console.info(`[lms] ${all.length} courses from API, ${matched.length} matched Gastroenterology`)
        }
        // Courses flagged top_courses first, otherwise keep API order.
        return matched.map(mapCourse).sort((a, b) => Number(b.featured) - Number(a.featured))
      })
      .catch((err) => {
        coursesPromise = null
        throw err
      })
  }
  return coursesPromise
}

/**
 * React hook around fetchGastroCourses.
 * status: 'loading' | 'ready' | 'empty' | 'error'
 * ('empty' = the API answered but nothing matched; pages show "listings on their way".)
 */
export function useGastroCourses() {
  const [state, setState] = useState({ status: 'loading', courses: [], error: null })
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    let active = true
    fetchGastroCourses()
      .then((courses) => {
        if (active) setState({ status: courses.length ? 'ready' : 'empty', courses, error: null })
      })
      .catch((error) => {
        if (active) setState({ status: 'error', courses: [], error })
      })
    return () => {
      active = false
    }
  }, [attempt])

  const retry = () => {
    setState((s) => ({ ...s, status: 'loading' }))
    setAttempt((n) => n + 1)
  }

  return { ...state, retry }
}
