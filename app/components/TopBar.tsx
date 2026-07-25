import { Mail, MapPin } from 'lucide-react'

const EMAIL = 'juan.velez@beyondgroup.co'
const US_ADDRESS = '405 Lakeview Dr. Unit 103, Weston, FL 33326, U.S.A.'

export default function TopBar() {
  return (
    <div className="show-mobile" style={{
      position: 'fixed',
      top: 0, left: 0, right: 0,
      zIndex: 101,
      background: 'var(--red)',
      color: '#fff',
      fontSize: '11px',
      fontFamily: 'var(--font-figtree), sans-serif',
    }}>
      <div className="container" style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px 28px',
        padding: '8px max(16px, calc((100vw - 1320px)/2 + 24px))',
      }}>
        <a href={`mailto:${EMAIL}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '7px', color: '#fff', textDecoration: 'none', opacity: 0.95 }}>
          <Mail size={13} strokeWidth={2} />
          {EMAIL}
        </a>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '7px', opacity: 0.95 }}>
          <MapPin size={13} strokeWidth={2} />
          {US_ADDRESS}
        </span>
      </div>
    </div>
  )
}
