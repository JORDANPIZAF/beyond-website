'use client'

import { Fragment } from 'react'
import Reveal from '../components/Reveal'
import Link from 'next/link'
import Image from 'next/image'
import TextReveal from '../components/TextReveal'
import SpotlightCard from '../components/SpotlightCard'
import { useLanguage } from '../context/LanguageContext'

const capabilityImgs = [
  '/images/service/beyond_carpinteria.webp',
  '/images/service/beyond_metalmecanica.webp',
  '/images/service/beyond_impresion.webp',
  '/images/service/beyond_acrilicos.webp',
  '/images/service/baners_instalacion_beyond.jpg',
  '/images/service/beyond_logistica_tegnologia.webp',
]

export default function CapacidadesPage() {
  const { t } = useLanguage()
  const cap = t.capacidades

  return (
    <>
      {/* Hero */}
      <section style={{ paddingTop: '180px', paddingBottom: '100px', background: 'var(--white)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '3px', background: 'var(--accent)' }} />
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'linear-gradient(rgba(0,0,0,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.04) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }} />
        <div className="container" style={{ position: 'relative' }}>
          <Reveal>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
              <div style={{ width: '32px', height: '2px', background: 'var(--accent)' }} />
              <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--accent)' }}>{cap.tag}</span>
            </div>
            <TextReveal as="h1" style={{
              fontFamily: 'var(--font-barlow), sans-serif',
              fontWeight: 800,
              fontSize: 'clamp(48px, 8vw, 96px)',
              lineHeight: 0.9,
              letterSpacing: '-0.02em',
              textTransform: 'uppercase',
              color: 'var(--text)',
              marginBottom: '32px',
              display: 'block',
            }}>
              {cap.heroTitle1}<br />
              <span style={{ color: 'var(--accent)' }}>{cap.heroAccent}</span><br />
              {cap.heroTitle2}
            </TextReveal>
            <TextReveal as="p" delay={0.15} style={{ fontSize: '18px', lineHeight: 1.8, color: 'var(--text-muted)', maxWidth: '560px', display: 'block' }}>
              {cap.heroBody}
            </TextReveal>
          </Reveal>
        </div>
      </section>

      {/* Capabilities detail */}
      <section style={{ padding: '100px 0', background: 'var(--bg)', borderTop: '1px solid var(--border)' }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '32px',
          }} className="grid-cap-cards">
            {cap.items.map((item, i) => (
              <Reveal key={item.num} delay={i * 0.08} className="cap-card-reveal">
                <Link href={item.href} className="cap-card-link">
                  <SpotlightCard style={{ background: 'var(--white)' }}>
                    <div style={{ position: 'relative', aspectRatio: '4 / 3', overflow: 'hidden', flexShrink: 0 }}>
                      <Image
                        src={capabilityImgs[i]}
                        alt={item.title}
                        fill
                        style={{ objectFit: 'cover' }}
                      />
                    </div>
                    <div style={{ padding: '24px 24px 28px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                      <span style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--accent)' }}>{item.subtitle}</span>
                      <h2 style={{
                        fontFamily: 'var(--font-barlow), sans-serif',
                        fontWeight: 800,
                        fontSize: '22px',
                        lineHeight: 1.1,
                        letterSpacing: '-0.01em',
                        textTransform: 'uppercase',
                        color: 'var(--text)',
                        margin: '8px 0 12px',
                      }}>{item.title}</h2>
                      <p style={{
                        fontSize: '14px', lineHeight: 1.7, color: 'var(--text-muted)', marginBottom: '16px',
                        display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden',
                      }}>{item.desc}</p>
                      <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--accent)', letterSpacing: '0.06em', display: 'inline-flex', alignItems: 'center', gap: '6px', marginTop: 'auto' }}>
                        {cap.seeMore} →
                      </span>
                    </div>
                  </SpotlightCard>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '120px 0', background: 'var(--accent)', position: 'relative', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'linear-gradient(rgba(0,0,0,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.12) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }} />
        <div className="container" style={{ position: 'relative', textAlign: 'center' }}>
          <Reveal>
            <TextReveal as="h2" style={{
              fontFamily: 'var(--font-barlow), sans-serif',
              fontWeight: 800,
              fontSize: 'clamp(36px, 6vw, 80px)',
              lineHeight: 0.95,
              letterSpacing: '-0.02em',
              textTransform: 'uppercase',
              color: '#fff',
              marginBottom: '32px',
              display: 'block',
            }}>
              {cap.ctaTitle.split('\n').map((line, i, arr) => (
                <Fragment key={i}>{line}{i < arr.length - 1 && <br />}</Fragment>
              ))}
            </TextReveal>
            <TextReveal as="p" delay={0.15} style={{ fontSize: '18px', color: 'rgba(255,255,255,0.85)', marginBottom: '48px', maxWidth: '480px', margin: '0 auto 48px', display: 'block' }}>
              {cap.ctaBody}
            </TextReveal>
            <Link href="/contacto" style={{
              textDecoration: 'none',
              display: 'inline-flex', alignItems: 'center', gap: '12px',
              background: '#fff',
              color: 'var(--red)',
              padding: '20px 48px',
              fontSize: '14px',
              fontWeight: 800,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
            }}>
              {cap.ctaBtn}
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  )
}
