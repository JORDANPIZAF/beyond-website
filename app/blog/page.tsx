'use client'

import Image from 'next/image'
import Link from 'next/link'
import Reveal from '../components/Reveal'
import { useLanguage } from '../context/LanguageContext'
import TextReveal from '../components/TextReveal'

const postSlugs = [
  'fabricacion-industrial-exhibicion-comercial',
  'carpinteria-cnc-retail',
  'arquitectura-efimera-colombia',
]

const postCovers = [
  '/images/portfolio/arq-efimera/img/01/GALAXY-S-DES-1.png',
  '/images/portfolio/arq-comercial/img/p1/ARQ_COMERCIAL_02DEST-2.png',
  '/images/portfolio/arq-efimera/img/04/isla_appleDEST-3.png',
]

export default function BlogPage() {
  const { t } = useLanguage()
  const b = t.blog

  const posts = b.posts.map((p, i) => ({
    ...p,
    slug: postSlugs[i],
    cover: postCovers[i],
    author: 'Beyond SAS',
  }))

  return (
    <>
      {/* Hero */}
      <section style={{ paddingTop: '180px', paddingBottom: '100px', background: 'var(--white)', position: 'relative', overflow: 'hidden' }}>
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
              <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--red)' }}>{b.tag}</span>
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
              {b.heroTitle1}<br />
              <span style={{ color: 'var(--red)' }}>{b.heroAccent}</span><br />
              {b.heroTitle2}
            </TextReveal>
            <TextReveal as="p" delay={0.15} style={{ fontSize: '18px', lineHeight: 1.8, color: 'var(--text-muted)', maxWidth: '560px', display: 'block' }}>
              {b.heroBody}
            </TextReveal>
          </Reveal>
        </div>
      </section>

      {/* Posts */}
      <section style={{ padding: '80px 0 120px', background: 'var(--bg)' }}>
        <div className="container">
          {/* Featured post */}
          <Reveal>
            <Link href={`/blog/${posts[0].slug}`} style={{ textDecoration: 'none', display: 'block', marginBottom: '4px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', background: 'var(--white)', overflow: 'hidden' }} className="grid-2">
                <div style={{ position: 'relative', height: '480px', overflow: 'hidden', background: '#e8e6e2' }}>
                  <Image
                    src={posts[0].cover}
                    alt={posts[0].title}
                    fill
                    style={{ objectFit: 'cover', transition: 'transform 0.6s ease' }}
                    className="proj-img"
                  />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, transparent 60%, rgba(0,0,0,0.1))' }} />
                </div>
                <div style={{ padding: '60px 48px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                    <span style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--red)', border: '1px solid var(--red)', padding: '3px 10px' }}>{posts[0].category}</span>
                    <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{posts[0].date}</span>
                  </div>
                  <TextReveal as="h2" style={{
                    fontFamily: 'var(--font-barlow)', fontWeight: 800,
                    fontSize: 'clamp(24px, 3vw, 40px)', lineHeight: 1.1,
                    letterSpacing: '-0.02em', textTransform: 'uppercase',
                    color: 'var(--text)', marginBottom: '20px', display: 'block',
                  }}>{posts[0].title}</TextReveal>
                  <TextReveal as="p" delay={0.15} style={{ fontSize: '15px', lineHeight: 1.8, color: 'var(--text-muted)', marginBottom: '32px', display: 'block' }}>{posts[0].excerpt}</TextReveal>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--red)', letterSpacing: '0.04em' }}>{b.readMore}</span>
                    <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{posts[0].readTime}</span>
                  </div>
                </div>
              </div>
            </Link>
          </Reveal>

          {/* Other posts */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '4px', marginTop: '4px' }}>
            {posts.slice(1).map((post, i) => (
              <Reveal key={post.slug} delay={i * 0.1}>
                <Link href={`/blog/${post.slug}`} style={{ textDecoration: 'none', display: 'block', height: '100%' }}>
                  <div style={{ background: 'var(--white)', overflow: 'hidden', height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ position: 'relative', height: '260px', overflow: 'hidden', background: '#e8e6e2' }}>
                      <Image
                        src={post.cover}
                        alt={post.title}
                        fill
                        style={{ objectFit: 'cover', transition: 'transform 0.6s ease' }}
                        className="proj-img"
                      />
                    </div>
                    <div style={{ padding: '32px 28px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                        <span style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--red)', border: '1px solid var(--red)', padding: '3px 8px' }}>{post.category}</span>
                        <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{post.date}</span>
                      </div>
                      <TextReveal as="h3" style={{
                        fontFamily: 'var(--font-barlow)', fontWeight: 700,
                        fontSize: 'clamp(18px, 2vw, 24px)', lineHeight: 1.2,
                        textTransform: 'uppercase', letterSpacing: '-0.01em',
                        color: 'var(--text)', marginBottom: '12px', display: 'block',
                      }}>{post.title}</TextReveal>
                      <TextReveal as="p" delay={0.1} style={{ fontSize: '14px', lineHeight: 1.7, color: 'var(--text-muted)', flex: 1, marginBottom: '24px', display: 'block' }}>{post.excerpt}</TextReveal>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--red)' }}>{b.readMore}</span>
                        <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{post.readTime}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '100px 0', background: 'var(--white)', borderTop: '1px solid var(--border)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <Reveal>
            <TextReveal as="h2" style={{
              fontFamily: 'var(--font-barlow)', fontWeight: 800,
              fontSize: 'clamp(32px, 5vw, 64px)', lineHeight: 0.95,
              letterSpacing: '-0.02em', textTransform: 'uppercase',
              color: 'var(--text)', marginBottom: '24px', display: 'block',
            }}>
              {b.ctaTitle1}<br /><span style={{ color: 'var(--red)' }}>{b.ctaAccent}</span>
            </TextReveal>
            <Link href="/contacto" className="btn-primary" style={{ fontSize: '14px' }}>
              {b.ctaBtn}
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  )
}
