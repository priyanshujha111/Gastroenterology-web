import { useCallback, useEffect, useState } from 'react'

export const COURSE_API_URL =
  import.meta.env.VITE_COURSE_API_URL || 'https://24x7.medicalglobalacademy.com/api/course-list'

const API_ORIGIN = new URL(COURSE_API_URL, 'https://24x7.medicalglobalacademy.com').origin

// The API returns only the file name (e.g. "fellowship-in-gi-surgery.jpg"), not the folder.
// Verified 2026-11-09: files are served from /storage/uploads/course/ on the LMS origin
// (all 13 GI course images return 200 image/jpeg there; /storage/courses/ etc. are 404).
const rawImageBase = import.meta.env.VITE_COURSE_IMAGE_BASE || `${API_ORIGIN}/storage/uploads/course/`
export const COURSE_IMAGE_BASE = rawImageBase.endsWith('/') ? rawImageBase : `${rawImageBase}/`

/** Bare filename → full URL. A full http(s) URL from the API is used as is. */
export function courseImageUrl(image) {
  if (!image || typeof image !== 'string') return ''
  if (/^https?:\/\//i.test(image)) return image
  return `${COURSE_IMAGE_BASE}${encodeURIComponent(image.replace(/^\/+/, ''))}`
}

export const COUNSELLOR_PHONE_DISPLAY = '+91 92899 94218'
export const COUNSELLOR_PHONE_HREF = 'tel:+919289994218'
export const COUNSELLOR_WHATSAPP = '919289994218'

// Any of these inside department / category / name / slug marks a course as Gastroenterology.
const SPECIALTY_KEYWORDS = ['gastro']

/* ------------------------------ formatters ------------------------------ */
export function formatMoney(value) {
  const n = Number(value)
  if (!n || Number.isNaN(n)) return ''
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(n)
}

export function formatDate(value) {
  if (!value) return ''
  const d = new Date(value)
  if (Number.isNaN(d.getTime())) return ''
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })
}

/* ------------------------------ mapping ------------------------------ */
// `department` arrives as a JSON string like '["Medicine"]', or null.
function parseDepartments(raw) {
  if (Array.isArray(raw)) return raw
  if (typeof raw !== 'string' || !raw.trim()) return []
  try {
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export function matchesGastroenterology(raw) {
  const haystack = [...parseDepartments(raw.department), raw.category?.name, raw.name, raw.slug]
    .filter(Boolean)
    .join(' ')
    .toLowerCase()
  return SPECIALTY_KEYWORDS.some((k) => haystack.includes(k))
}

function mapCourse(raw) {
  const months = Number(raw.duration) || 0
  return {
    id: raw.id,
    slug: raw.slug,
    name: raw.name,
    type: raw.type || '',
    description: (raw.description || '').replace(/\s*\r?\n\s*/g, ' ').trim(),
    durationMonths: months,
    durationLabel: months ? `${months} ${months === 1 ? 'month' : 'months'}` : '',
    startDate: raw.start_date || '',
    fee: Number(raw.fee) || 0,
    totalFee: Number(raw.total_fee) || 0,
    image: raw.image || '',
    imageUrl: courseImageUrl(raw.image),
    imageAlt: raw.image_alt || raw.name,
    popular: Number(raw.top_courses) === 1,
    departments: parseDepartments(raw.department),
  }
}

/* ------------------------------ fetching ------------------------------ */
// One shared request, so Home, Courses and CourseDetail never fetch twice.
let cache = null
let inflight = null

function loadCourses(force = false) {
  if (!force && cache) return Promise.resolve(cache)
  if (!force && inflight) return inflight

  inflight = fetch(COURSE_API_URL, { headers: { Accept: 'application/json' } })
    .then((res) => {
      if (!res.ok) throw new Error(`Course API returned HTTP ${res.status}`)
      return res.json()
    })
    .then((data) => {
      const list = Array.isArray(data) ? data : data?.data || data?.courses || []
      const courses = list.filter(matchesGastroenterology).map(mapCourse)
      if (import.meta.env.DEV) {
        console.info(`[courses] total: ${list.length}, matched Gastroenterology: ${courses.length}`)
      }
      cache = { courses }
      return cache
    })
    .finally(() => {
      inflight = null
    })

  return inflight
}

/* ------------------------------ single course details ------------------------------ */
// GET {origin}/api/course-details/{slug}  (by slug only; /{id} returns {})
// Adds to the list fields: what_you_learn[{heading, description}], highlight[{highlight}],
// workshop{title, subtitle, parts[{title, subtitle, key_points[{content}]}]},
// module[{module, sessions[{title}]}]. No FAQs, eligibility, outcomes, audience or lock flags.
const COURSE_DETAILS_URL = `${API_ORIGIN}/api/course-details/`

const cleanText = (s) => (typeof s === 'string' ? s.replace(/\s*\r?\n\s*/g, ' ').replace(/\s{2,}/g, ' ').trim() : '')
const arr = (v) => (Array.isArray(v) ? v : [])

export function mapCourseDetails(raw) {
  const workshopParts = arr(raw?.workshop?.parts)
    .map((p) => ({
      id: p.id,
      title: cleanText(p.title),
      subtitle: cleanText(p.subtitle),
      points: arr(p.key_points).map((k) => cleanText(k.content)).filter(Boolean),
    }))
    .filter((p) => p.title || p.points.length)

  return {
    highlights: arr(raw?.highlight).map((h) => cleanText(h.highlight)).filter(Boolean),
    whatYouLearn: arr(raw?.what_you_learn)
      .map((w) => ({ id: w.id, heading: cleanText(w.heading), description: cleanText(w.description) }))
      .filter((w) => w.heading || w.description),
    workshop: workshopParts.length
      ? { title: cleanText(raw.workshop.title), intro: cleanText(raw.workshop.subtitle), parts: workshopParts }
      : null,
    modules: arr(raw?.module)
      .map((m) => ({
        id: m.id,
        title: cleanText(m.module),
        lessons: arr(m.sessions).map((s) => cleanText(s.title)).filter(Boolean),
      }))
      .filter((m) => m.title),
  }
}

const detailsCache = new Map() // slug → Promise<details>

function loadCourseDetails(slug, force = false) {
  if (!force && detailsCache.has(slug)) return detailsCache.get(slug)
  const p = fetch(`${COURSE_DETAILS_URL}${encodeURIComponent(slug)}`, { headers: { Accept: 'application/json' } })
    .then((res) => {
      if (!res.ok) throw new Error(`Course details API returned HTTP ${res.status}`)
      return res.json()
    })
    .then(mapCourseDetails)
    .catch((err) => {
      detailsCache.delete(slug)
      throw err
    })
  detailsCache.set(slug, p)
  return p
}

/**
 * Extra per-course content. status: 'loading' | 'ready' | 'error'.
 * The page still renders from list data while this loads or if it fails; sections just stay hidden.
 */
export function useCourseDetails(slug) {
  const [state, setState] = useState({ status: 'loading', details: null })

  useEffect(() => {
    if (!slug) return undefined
    let cancelled = false
    setState({ status: 'loading', details: null })
    loadCourseDetails(slug)
      .then((details) => !cancelled && setState({ status: 'ready', details }))
      .catch((error) => {
        if (cancelled) return
        console.error('[course-details] failed to load', error)
        setState({ status: 'error', details: null })
      })
    return () => {
      cancelled = true
    }
  }, [slug])

  return state
}

/** status: 'loading' | 'ready' | 'empty' | 'error' */
export function useCourseList() {
  const [state, setState] = useState({ status: 'loading', courses: [], error: null })

  const run = useCallback((force = false) => {
    let cancelled = false
    setState((s) => ({ ...s, status: 'loading', error: null }))
    loadCourses(force)
      .then(({ courses }) => {
        if (cancelled) return
        setState({ status: courses.length ? 'ready' : 'empty', courses, error: null })
      })
      .catch((error) => {
        if (cancelled) return
        console.error('[courses] failed to load', error)
        setState({ status: 'error', courses: [], error })
      })
    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => run(), [run])

  return { ...state, retry: () => run(true) }
}