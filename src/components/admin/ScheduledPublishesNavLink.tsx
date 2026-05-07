/**
 * Sidebar nav link to the custom Scheduled Publishes view.
 * Coupling surfaces: Payload's `afterNavLinks` slot and `--theme-*` CSS vars.
 */
import Link from 'next/link'

const ScheduledPublishesNavLink = () => {
  return (
    <Link
      href="/admin/scheduled"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 'calc(var(--base) * 0.5)',
        padding: 'calc(var(--base) * 0.5) calc(var(--base) * 1)',
        margin: 'calc(var(--base) * 0.25) 0',
        borderRadius: 'var(--style-radius-s)',
        color: 'var(--theme-elevation-800)',
        fontSize: '0.95rem',
        textDecoration: 'none',
      }}
    >
      <span aria-hidden style={{ fontSize: '0.85rem', opacity: 0.6 }}>◷</span>
      Scheduled
    </Link>
  )
}

export default ScheduledPublishesNavLink
