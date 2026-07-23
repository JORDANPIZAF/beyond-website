'use client'

import { useState } from 'react'
import Reveal from '../components/Reveal'
import { useLanguage } from '../context/LanguageContext'
import TextReveal from '../components/TextReveal'
import SocialLinks from '../components/SocialLinks'

const initialForm = { nombre: '', empresa: '', email: '', telefono: '', proyecto: '', presupuesto: '' }

function FieldLabel({ label, htmlFor }: { label: string; htmlFor: string }) {
  const required = label.endsWith(' *')
  const text = required ? label.slice(0, -2) : label
  return (
    <label htmlFor={htmlFor} className="form-label">
      {text}
      {required && <span className="form-required">*</span>}
    </label>
  )
}

export default function ContactoPage() {
  const [form, setForm] = useState(initialForm)
  const [sent, setSent] = useState(false)
  const { t } = useLanguage()
  const c = t.contacto
  const fieldById = (id: string) => c.fields.find(f => f.id === id)!

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSent(true)
  }

  const handleClear = () => setForm(initialForm)

  return (
    <>
      {/* Hero */}
      <section style={{ paddingTop: '180px', paddingBottom: '80px', background: 'var(--white)', position: 'relative', overflow: 'hidden' }}>
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
              <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--accent)' }}>{c.tag}</span>
            </div>
            <TextReveal as="h1" style={{
              fontFamily: 'var(--font-barlow), sans-serif',
              fontWeight: 800,
              fontSize: 'clamp(48px, 8vw, 96px)',
              lineHeight: 0.9,
              letterSpacing: '-0.02em',
              textTransform: 'uppercase',
              color: 'var(--text)',
              marginBottom: '24px',
              display: 'block',
            }}>
              {c.heroTitle1}<br />
              <span style={{ color: 'var(--accent)' }}>{c.heroAccent}</span>
            </TextReveal>
            <TextReveal as="p" delay={0.15} style={{ fontSize: '18px', lineHeight: 1.8, color: 'var(--text-muted)', maxWidth: '480px', display: 'block' }}>
              {c.heroBody}
            </TextReveal>
          </Reveal>
        </div>
      </section>

      {/* Form + Info */}
      <section style={{ padding: '80px 0 140px', background: 'var(--bg)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '100px', alignItems: 'start' }} className="grid-2">

            {/* Form */}
            <Reveal>
              {sent ? (
                <div className="contact-card" style={{ padding: '80px 60px', textAlign: 'center' }}>
                  <div style={{ width: '64px', height: '64px', background: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 32px', fontSize: '28px', color: '#fff' }}>✓</div>
                  <TextReveal as="h2" style={{ fontFamily: 'var(--font-barlow)', fontWeight: 800, fontSize: '36px', textTransform: 'uppercase', color: 'var(--text)', marginBottom: '16px', display: 'block' }}>{c.successTitle}</TextReveal>
                  <TextReveal as="p" delay={0.15} style={{ fontSize: '16px', color: 'var(--text-muted)', display: 'block' }}>{c.successBody}</TextReveal>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="contact-card">
                  <div className="form-grid">
                    <div>
                      <FieldLabel label={fieldById('nombre').label} htmlFor="nombre" />
                      <input
                        id="nombre"
                        type="text"
                        required
                        className="form-input"
                        value={form.nombre}
                        onChange={e => setForm({ ...form, nombre: e.target.value })}
                      />
                    </div>
                    <div>
                      <FieldLabel label={fieldById('empresa').label} htmlFor="empresa" />
                      <input
                        id="empresa"
                        type="text"
                        className="form-input"
                        value={form.empresa}
                        onChange={e => setForm({ ...form, empresa: e.target.value })}
                      />
                    </div>

                    <div className="form-field--full">
                      <FieldLabel label={fieldById('email').label} htmlFor="email" />
                      <input
                        id="email"
                        type="email"
                        required
                        className="form-input"
                        value={form.email}
                        onChange={e => setForm({ ...form, email: e.target.value })}
                      />
                    </div>

                    <div>
                      <FieldLabel label={fieldById('telefono').label} htmlFor="telefono" />
                      <input
                        id="telefono"
                        type="tel"
                        className="form-input"
                        value={form.telefono}
                        onChange={e => setForm({ ...form, telefono: e.target.value })}
                      />
                    </div>
                    <div>
                      <FieldLabel label={c.budgetLabel} htmlFor="presupuesto" />
                      <select
                        id="presupuesto"
                        className="form-input"
                        value={form.presupuesto}
                        onChange={e => setForm({ ...form, presupuesto: e.target.value })}
                        style={{ color: form.presupuesto ? 'var(--text)' : 'var(--text-light)' }}
                      >
                        {c.budgetOptions.map(opt => (
                          <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                      </select>
                    </div>

                    <div className="form-field--full">
                      <FieldLabel label={c.projectLabel} htmlFor="proyecto" />
                      <textarea
                        id="proyecto"
                        required
                        rows={5}
                        className="form-input"
                        placeholder={c.projectPlaceholder}
                        value={form.proyecto}
                        onChange={e => setForm({ ...form, proyecto: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="form-separator" />

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '16px' }}>
                    <button type="button" onClick={handleClear} className="btn-outline">
                      {c.clearBtn}
                    </button>
                    <button type="submit" className="btn-primary">
                      {c.submitBtn}
                    </button>
                  </div>
                </form>
              )}
            </Reveal>

            {/* Info */}
            <Reveal delay={0.2} direction="left">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
                <div>
                  <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '16px' }}>{c.infoCommercial}</p>
                  <p style={{ fontSize: '15px', color: 'var(--text-muted)', lineHeight: 1.7 }}>director.comercial@beyondgroup.co</p>
                </div>
                <div>
                  <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '16px' }}>{c.infoPhone}</p>
                  <p style={{ fontSize: '15px', color: 'var(--text-muted)' }}>(601) 390 44 15</p>
                </div>
                <div>
                  <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '16px' }}>{c.infoPlant}</p>
                  <p style={{ fontSize: '15px', color: 'var(--text-muted)', lineHeight: 1.7 }}>Cra. 62 17B-69<br />Bogotá, Colombia</p>
                </div>
                <div>
                  <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '16px' }}>{c.infoSocial}</p>
                  <div style={{ display: 'flex', gap: '20px' }}>
                    <SocialLinks size={22} />
                  </div>
                </div>

                <div style={{ background: 'var(--white)', border: '1px solid var(--border)', padding: '28px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                    <div style={{ width: '8px', height: '8px', background: '#22c55e', borderRadius: '50%' }} />
                    <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#22c55e' }}>{c.available}</span>
                  </div>
                  <TextReveal as="p" style={{ fontSize: '14px', color: 'var(--text-muted)', lineHeight: 1.6, display: 'block' }}>
                    {c.responseTime}<strong style={{ color: 'var(--text)' }}>{c.responseTimeStrong}</strong>{c.responseTimeSuffix}
                  </TextReveal>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  )
}
