import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import LoginModal from './LoginModal.jsx'
import SignUpModal from './SignUpModal.jsx'

// Shared Medical Global Academy parent logo (real asset, not placeholder content).
const LOGO_URL = 'https://medicalglobalacademy.com/wp-content/uploads/2026/08/logo_new.png'

const SCROLL_THRESHOLD = 8 // px scrolled before the bar's shadow deepens
const LG_QUERY = '(min-width: 64rem)' // Tailwind's lg breakpoint

const NAV_LINKS = [
  { to: '/', label: 'Home', end: true },
  { to: '/about', label: 'About' },
  { to: '/courses', label: 'Courses' },
  { to: '/doctors', label: 'Doctors' },
]

const focusRing =
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary'

// Thin primary underline: slides in from the left on hover, stays on the active link.
const desktopLinkClass = ({ isActive }) =>
  `relative py-2 text-sm font-medium tracking-wider transition-colors ${focusRing}
   after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:origin-left after:rounded-full after:bg-primary
   after:transition-transform after:duration-300 after:ease-out ${
     isActive
       ? 'text-primary after:scale-x-100'
       : 'text-text/80 after:scale-x-0 hover:text-primary hover:after:scale-x-100'
   }`

const mobileLinkClass = ({ isActive }) =>
  `flex items-center justify-between py-4 text-base font-medium tracking-wide transition-colors ${focusRing} ${
    isActive ? 'text-primary' : 'text-text/85 hover:text-primary'
  }`

/**
 * Clean, solid navbar used on every route.
 * Always white with a thin support-colour bottom border; scrolling only deepens the shadow.
 */
export default function Navbar() {
  const { pathname } = useLocation()

  const [scrolled, setScrolled] = useState(false)
  // The menu is "open for a path", so it closes automatically on route change.
  const [menuPath, setMenuPath] = useState(null)
  const menuOpen = menuPath === pathname
  const [modal, setModal] = useState(null) // null | 'login' | 'signup'
  const [logoFailed, setLogoFailed] = useState(false)
  const toggleRef = useRef(null)
  const headerRef = useRef(null)

  const closeMenu = () => setMenuPath(null)
  const toggleMenu = () => setMenuPath((p) => (p === pathname ? null : pathname))
  const openModal = (kind) => {
    closeMenu()
    setModal(kind)
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > SCROLL_THRESHOLD)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // While the mobile menu is open: lock body scroll; close on Escape (focus
  // returns to the hamburger), on a tap outside the header, or past lg.
  useEffect(() => {
    if (!menuOpen) return

    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const onKey = (e) => {
      if (e.key === 'Escape') {
        setMenuPath(null)
        toggleRef.current?.focus()
      }
    }
    const onPointer = (e) => {
      if (!headerRef.current?.contains(e.target)) setMenuPath(null)
    }
    const mq = window.matchMedia(LG_QUERY)
    const onBreakpoint = (e) => {
      if (e.matches) setMenuPath(null)
    }

    window.addEventListener('keydown', onKey)
    document.addEventListener('pointerdown', onPointer)
    mq.addEventListener('change', onBreakpoint)
    return () => {
      document.body.style.overflow = prevOverflow
      window.removeEventListener('keydown', onKey)
      document.removeEventListener('pointerdown', onPointer)
      mq.removeEventListener('change', onBreakpoint)
    }
  }, [menuOpen])

  return (
    <>
      <header
        ref={headerRef}
        className={`sticky top-0 z-50 border-b border-support bg-white transition-shadow duration-300 ${
          scrolled ? 'shadow-md shadow-primary/5' : 'shadow-sm shadow-primary/5'
        }`}
      >
        <nav
          aria-label="Main"
          className="mx-auto flex max-w-7xl items-center gap-10 px-4 py-4 sm:px-5 md:py-5 lg:px-6"
        >
          {/* Logo + wordmark */}
          <Link to="/" className={`flex min-w-0 shrink-0 items-center gap-3 rounded-md ${focusRing}`}>
            {logoFailed ? (
              <span
                aria-hidden="true"
                className="flex h-10 items-center rounded-md bg-primary px-2.5 font-display text-lg font-semibold text-white"
              >
                MGA
              </span>
            ) : (
              <img src={LOGO_URL} alt="" onError={() => setLogoFailed(true)} className="h-10 w-auto" />
            )}
            <span className="flex min-w-0 flex-col leading-none">
              <span className="truncate font-display text-base font-semibold text-text sm:text-lg">
                Medical Global Academy
              </span>
              <span className="mt-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-secondary">
                Gastroenterology
              </span>
            </span>
          </Link>

          {/* Desktop links: centred in the space between the logo and the auth buttons */}
          <ul className="hidden flex-1 items-center justify-center gap-8 lg:flex">
            {NAV_LINKS.map((l) => (
              <li key={l.to}>
                <NavLink to={l.to} end={l.end} className={desktopLinkClass}>
                  {l.label}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Desktop auth: Login text link + Sign Up anchor button */}
          <div className="ml-auto hidden items-center gap-6 lg:flex">
            {/* Styled as a text link; it's a <button> because it opens a modal, not a page. */}
            <button
              type="button"
              onClick={() => openModal('login')}
              className={`rounded-md py-2 text-sm font-medium tracking-wider text-text transition-colors hover:text-primary ${focusRing}`}
            >
              Login
            </button>
            <button
              type="button"
              onClick={() => openModal('signup')}
              className={`rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold tracking-wide text-white transition hover:bg-primary-dark ${focusRing}`}
            >
              Sign Up
            </button>
          </div>

          {/* Mobile hamburger: three clean lines, no background */}
          <button
            ref={toggleRef}
            type="button"
            onClick={toggleMenu}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            className={`-mr-1 ml-auto rounded-md p-1 text-text transition-colors hover:text-primary lg:hidden ${focusRing}`}
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" aria-hidden="true">
              {menuOpen ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </nav>

        {/* Mobile menu: full-width continuation of the bar, square corners,
            slides down (grid-rows trick animates to content height). Positioned
            absolutely so it overlays the page instead of pushing it down. */}
        <div
          id="mobile-menu"
          inert={!menuOpen}
          className={`absolute inset-x-0 top-full grid bg-white transition-[grid-template-rows] duration-300 ease-out lg:hidden ${
            menuOpen ? 'grid-rows-[1fr] border-b border-support shadow-md shadow-primary/5' : 'grid-rows-[0fr]'
          }`}
        >
          <div className="overflow-hidden">
            <div className="max-h-[calc(100dvh-5rem)] overflow-y-auto border-t border-support px-4 pb-6 sm:px-5">
              <ul className="divide-y divide-support">
                {NAV_LINKS.map((l) => (
                  <li key={l.to}>
                    <NavLink to={l.to} end={l.end} onClick={closeMenu} className={mobileLinkClass}>
                      {({ isActive }) => (
                        <>
                          {l.label}
                          {isActive && <span aria-hidden="true" className="h-0.5 w-6 rounded-full bg-primary" />}
                        </>
                      )}
                    </NavLink>
                  </li>
                ))}
              </ul>
              <div className="mt-4 flex flex-col gap-3 border-t border-support pt-5">
                <button
                  type="button"
                  onClick={() => openModal('login')}
                  className={`w-full rounded-lg border border-secondary/40 px-5 py-3 font-medium tracking-wide text-secondary transition-colors hover:border-secondary hover:bg-secondary/5 ${focusRing}`}
                >
                  Login
                </button>
                <button
                  type="button"
                  onClick={() => openModal('signup')}
                  className={`w-full rounded-lg bg-primary px-5 py-3 font-semibold tracking-wide text-white transition hover:bg-primary-dark ${focusRing}`}
                >
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {modal === 'login' && (
        <LoginModal open onClose={() => setModal(null)} onSwitchToSignUp={() => setModal('signup')} />
      )}
      {modal === 'signup' && (
        <SignUpModal open onClose={() => setModal(null)} onSwitchToLogin={() => setModal('login')} />
      )}
    </>
  )
}
