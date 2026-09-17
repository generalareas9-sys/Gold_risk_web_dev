import { Link } from 'react-router-dom'
import type { ReactNode } from 'react'
import { useLanguage } from '../../i18n/useLanguage'
import { paths } from '../../routes/paths'

/**
 * Premium announcement ticker shown to visitors between the header and the
 * page content. Seamless translateX(-50%) loop over two identical groups,
 * streams left-to-right in LTR and rightward in RTL, and collapses to a
 * static stacked list when the user prefers reduced motion.
 *
 * The two "CTA" cells are real links (React Router <Link> to the register /
 * login pages) and the whole cell is clickable, not just the trailing label.
 */
export function AnnouncementMarquee() {
  const { t } = useLanguage()

  const cells: ReactNode[] = [
    <span key="welcome" className="marquee-item">
      {t('marquee.welcome')}
    </span>,
    <span key="tagline" className="marquee-item">
      {t('marquee.tagline')}
    </span>,
    <Link key="new-user" to={paths.register} className="marquee-cta">
      <span className="marquee-item">{t('marquee.newUsers')}</span>
      <span className="marquee-link">
        {t('auth.createAccount')}
        <span className="arrow-flip" aria-hidden="true">
          →
        </span>
      </span>
    </Link>,
    <Link key="existing-user" to={paths.login} className="marquee-cta">
      <span className="marquee-item">{t('marquee.existingUsers')}</span>
      <span className="marquee-link">
        {t('navigation.login')}
        <span className="arrow-flip" aria-hidden="true">
          →
        </span>
      </span>
    </Link>,
    <span key="slogan" className="marquee-item">
      {t('marquee.slogan')}
    </span>,
  ]

  function renderGroup(hidden: boolean, prefix: string) {
    const nodes: ReactNode[] = []
    cells.forEach((cell, index) => {
      nodes.push(
        <li key={`${prefix}c${index}`} className="marquee-cell">
          {cell}
        </li>,
        <li key={`${prefix}s${index}`} aria-hidden="true" className="marquee-sep">
          ◆
        </li>,
      )
    })
    return (
      <ul
        className={`marquee-group${hidden ? ' marquee-duplicate' : ''}`}
        aria-hidden={hidden || undefined}
        inert={hidden}
      >
        {nodes}
      </ul>
    )
  }

  return (
    <div role="region" aria-label={t('marquee.label')} className="marquee">
      <div className="marquee-track">
        {renderGroup(false, 'a-')}
        {renderGroup(true, 'b-')}
      </div>
    </div>
  )
}