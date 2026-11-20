/* ============================================================================
 * Stats: the single shared source for every stat strip
 * (rendered by components/StatStrip.jsx on Home and About).
 *
 * CONFIRMED figures supplied by MGA; STATS_ARE_PLACEHOLDERS is off, so no
 * "placeholder" tag is shown. Set it back to true if any figure needs
 * re-verifying.
 *
 * value  = the number as displayed; suffix = what follows it ('+', '%').
 * icon   = SVG path(s) on a 24x24 grid, drawn as a stroke icon.
 * ========================================================================== */

export const STATS_ARE_PLACEHOLDERS = false

export const stats = [
  {
    label: 'Happy Students',
    value: '12,500',
    suffix: '+',
    // Graduation cap
    icon: 'M12 3L2 8l10 5 10-5-10-5z M6 10.5V16c0 1.5 2.7 3 6 3s6-1.5 6-3v-5.5',
  },
  {
    label: 'Years Combined Faculty Experience',
    value: '25',
    suffix: '+',
    // Calendar
    icon: 'M7 3v3 M17 3v3 M4 9h16 M5 5h14a1 1 0 011 1v13a1 1 0 01-1 1H5a1 1 0 01-1-1V6a1 1 0 011-1z M9 14l2 2 4-4',
  },
  {
    label: 'Expert Doctors',
    value: '15',
    suffix: '+',
    // Stethoscope
    icon: 'M6 3v6a4 4 0 008 0V3 M10 13v3a5 5 0 0010 0v-2 M20 14a2 2 0 100-4 2 2 0 000 4z',
  },
  {
    label: 'Success Rate',
    value: '98',
    suffix: '%',
    // Award ribbon
    icon: 'M12 15a6 6 0 100-12 6 6 0 000 12z M8.2 13.9L7 22l5-3 5 3-1.2-8.1 M10 9l1.5 1.5L14.5 7.5',
  },
]
