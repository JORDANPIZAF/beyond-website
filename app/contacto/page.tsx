'use client'

import { useState } from 'react'
import Reveal from '../components/Reveal'
import { useLanguage } from '../context/LanguageContext'
import TextReveal from '../components/TextReveal'

export default function ContactoPage() {
  const [form, setForm] = useState({ nombre: '', empresa: '', email: '', telefono: '', proyecto: '', presupuesto: '' })
  const [sent, setSent] = useState(false)
  const { t } = useLanguage()
  const c = t.contacto

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <>
      {/* Hero */}
      <section style={{ paddingTop: '180px', paddingBottom: '80px', background: 'var(--white)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '3px', background: 'var(--red)' }} />
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'linear-gradient(rgba(0,0,0,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.04) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }} />
        <div className="container" style={{ position: 'relative' }}>
          <Reveal>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
              <div style={{ width: '32px', height: '2px', background: 'var(--red)' }} />
              <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--red)' }}>{c.tag}</span>
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
              <span style={{ color: 'var(--red)' }}>{c.heroAccent}</span>
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
                <div style={{
                  background: 'var(--white)',
                  border: '1px solid var(--border)',
                  padding: '80px 60px',
                  textAlign: 'center',
                }}>
                  <div style={{ width: '64px', height: '64px', background: 'var(--red)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 32px', fontSize: '28px', color: '#fff' }}>✓</div>
                  <TextReveal as="h2" style={{ fontFamily: 'var(--font-barlow)', fontWeight: 800, fontSize: '36px', textTransform: 'uppercase', color: 'var(--text)', marginBottom: '16px', display: 'block' }}>{c.successTitle}</TextReveal>
                  <TextReveal as="p" delay={0.15} style={{ fontSize: '16px', color: 'var(--text-muted)', display: 'block' }}>{c.successBody}</TextReveal>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                  {c.fields.map(field => (
                    <div key={field.id} style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
                      <label style={{ background: 'var(--white)', padding: '16px 24px 0', fontSize: '10px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
                        {field.label}
                      </label>
                      <input
                        type={field.type}
                        required={field.required}
                        value={form[field.id as keyof typeof form]}
                        onChange={e => setForm({ ...form, [field.id]: e.target.value })}
                        style={{
                          background: 'var(--white)',
                          border: 'none',
                          borderBottom: '1px solid var(--border)',
                          padding: '12px 24px 20px',
                          fontSize: '16px',
                          color: 'var(--text)',
                          outline: 'none',
                          width: '100%',
                          fontFamily: 'var(--font-figtree), sans-serif',
                        }}
                      />
                    </div>
                  ))}

                  {/* Textarea */}
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <label style={{ background: 'var(--white)', padding: '16px 24px 0', fontSize: '10px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
                      {c.projectLabel}
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={form.proyecto}
                      onChange={e => setForm({ ...form, proyecto: e.target.value })}
                      placeholder={c.projectPlaceholder}
                      style={{
                        background: 'var(--white)',
                        border: 'none',
                        borderBottom: '1px solid var(--border)',
                        padding: '12px 24px 20px',
                        fontSize: '16px',
                        color: 'var(--text)',
                        outline: 'none',
                        resize: 'vertical',
                        width: '100%',
                        fontFamily: 'var(--font-figtree), sans-serif',
                      }}
                    />
                  </div>

                  {/* Budget */}
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <label style={{ background: 'var(--white)', padding: '16px 24px 8px', fontSize: '10px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
                      {c.budgetLabel}
                    </label>
                    <select
                      value={form.presupuesto}
                      onChange={e => setForm({ ...form, presupuesto: e.target.value })}
                      style={{
                        background: 'var(--white)',
                        border: 'none',
                        borderBottom: '1px solid var(--border)',
                        padding: '12px 24px 20px',
                        fontSize: '16px',
                        color: form.presupuesto ? 'var(--text)' : 'var(--text-muted)',
                        outline: 'none',
                        width: '100%',
                        cursor: 'pointer',
                        fontFamily: 'var(--font-figtree), sans-serif',
                      }}
                    >
                      {c.budgetOptions.map(opt => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                  </div>

                  <button type="submit" style={{
                    background: 'var(--red)',
                    border: 'none',
                    color: '#fff',
                    padding: '20px 40px',
                    fontSize: '13px',
                    fontWeight: 700,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                    marginTop: '4px',
                    transition: 'background 0.2s',
                    alignSelf: 'flex-start',
                    fontFamily: 'var(--font-figtree), sans-serif',
                  }}>
                    {c.submitBtn}
                  </button>
                </form>
              )}
            </Reveal>

            {/* Info */}
            <Reveal delay={0.2} direction="left">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
                <div>
                  <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--red)', marginBottom: '16px' }}>{c.infoCommercial}</p>
                  <p style={{ fontSize: '15px', color: 'var(--text-muted)', lineHeight: 1.7 }}>director.comercial@beyondgroup.co</p>
                </div>
                <div>
                  <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--red)', marginBottom: '16px' }}>{c.infoPhone}</p>
                  <p style={{ fontSize: '15px', color: 'var(--text-muted)' }}>(601) 390 44 15</p>
                </div>
                <div>
                  <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--red)', marginBottom: '16px' }}>{c.infoPlant}</p>
                  <p style={{ fontSize: '15px', color: 'var(--text-muted)', lineHeight: 1.7 }}>Cra. 62 17B-69<br />Bogotá, Colombia</p>
                </div>
                <div>
                  <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--red)', marginBottom: '16px' }}>{c.infoSocial}</p>
                  <div style={{ display: 'flex', gap: '16px' }}>
                    <a href="https://instagram.com/beyond_sas" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', fontSize: '13px', color: 'var(--text-muted)', letterSpacing: '0.06em', textTransform: 'uppercase', fontWeight: 600, borderBottom: '1px solid var(--border)', paddingBottom: '2px' }}>Instagram</a>
                    <a href="https://wa.me/576013904415" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', fontSize: '13px', color: 'var(--text-muted)', letterSpacing: '0.06em', textTransform: 'uppercase', fontWeight: 600, borderBottom: '1px solid var(--border)', paddingBottom: '2px' }}>WhatsApp</a>
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
