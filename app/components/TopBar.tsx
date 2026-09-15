import { Mail, MapPin } from 'lucide-react'

const EMAIL = 'juan.velez@beyondgroup.co'
const CO_ADDRESS_PRE = 'Carrera 62 # 17 B - 69, '
const CO_CITY = 'Bogotá DC'
const CO_ADDRESS_POST = ', Colombia'
const US_ADDRESS_PRE = '405 Lakeview Dr. Unit 103, '
const US_CITY = 'Weston'
const US_ADDRESS_POST = ', FL 33326, U.S.A.'

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
        flexDirection: 'column',
        alignItems: 'center',
        gap: '6px',
        padding: '8px max(16px, calc((100vw - 1320px)/2 + 24px))',
      }}>
        <a href={`mailto:${EMAIL}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '7px', color: '#fff', textDecoration: 'none', opacity: 0.95 }}>
          <Mail size={13} strokeWidth={2} />
          {EMAIL}
        </a>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '7px', opacity: 0.95 }}>
            <MapPin size={13} strokeWidth={2} />
            {CO_ADDRESS_PRE}<strong style={{ fontWeight: 700 }}>{CO_CITY}</strong>{CO_ADDRESS_POST}
          </span>
          <span style={{ opacity: 0.6 }}>|</span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '7px', opacity: 0.95 }}>
            <MapPin size={13} strokeWidth={2} />
            {US_ADDRESS_PRE}<strong style={{ fontWeight: 700 }}>{US_CITY}</strong>{US_ADDRESS_POST}
          </span>
        </div>
      </div>
    </div>
  )
}
