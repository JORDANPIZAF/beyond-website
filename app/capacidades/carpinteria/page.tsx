import Image from 'next/image'
import Link from 'next/link'
import Reveal from '../../components/Reveal'
import TextReveal from '../../components/TextReveal'

const capabilities = [
  'Corte CNC de precisión',
  'Fabricación a medida',
  'Acabados lacados y barnizados',
  'Tapizado y forrado',
  'Uniones y ensambles especializados',
  'Producción en serie',
]

const relatedProjects = [
  {
    slug: 'aldo-mobiliario',
    title: 'Aldo Mobiliario',
    category: 'Arquitectura Comercial',
    cover: '/images/portfolio/arq-comercial/img/p2/DEST-2PANDORA.png',
  },
  {
    slug: 'oficinas-bogota',
    title: 'Oficinas Bogotá',
    category: 'Mobiliario',
    cover: '/images/portfolio/mobiliario/img/01/OFI-BOGOTÁ-DES-1.png',
  },
  {
    slug: 'lg-arq-comercial',
    title: 'LG Arquitectura Comercial',
    category: 'Arquitectura Comercial',
    cover: '/images/portfolio/arq-comercial/img/p1/ARQ_COMERCIAL_02DEST-2.png',
  },
]

export default function CarpinteriaPage() {
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
              <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--red)' }}>Especialidad 01</span>
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
              Carpintería<br />
              <span style={{ color: 'var(--red)' }}>& Ebanistería</span>
            </TextReveal>
            <TextReveal as="p" delay={0.15} style={{ fontSize: '18px', lineHeight: 1.8, color: 'var(--text-muted)', maxWidth: '560px', display: 'block' }}>
              Madera, MDF, melamina y materiales compuestos. Corte CNC de alta precisión y acabados premium para exhibición comercial y mobiliario de alta gama.
            </TextReveal>
            <div style={{ marginTop: '36px' }}>
              <Link href="/contacto" className="btn-primary">Solicitar cotización →</Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Imagen + descripción */}
      <section style={{ padding: '100px 0', background: 'var(--bg)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }} className="grid-2">
            <Reveal>
              <div style={{ position: 'relative', height: '500px', overflow: 'hidden', background: '#e8e6e2' }}>
                <Image
                  src="/images/service/beyond_carpinteria.webp"
                  alt="Carpintería Beyond SAS"
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
            </Reveal>
            <Reveal delay={0.15} direction="left">
              <div style={{ fontFamily: 'var(--font-barlow)', fontWeight: 800, fontSize: '120px', lineHeight: 1, color: 'rgba(224,41,7,0.08)', letterSpacing: '-0.04em', marginBottom: '-40px' }}>01</div>
              <TextReveal as="h2" style={{
                fontFamily: 'var(--font-barlow)', fontWeight: 800,
                fontSize: 'clamp(28px, 4vw, 48px)', lineHeight: 1,
                letterSpacing: '-0.02em', textTransform: 'uppercase',
                color: 'var(--text)', marginBottom: '24px', display: 'block',
              }}>Precisión en madera<br />a escala industrial</TextReveal>
              <TextReveal as="p" delay={0.15} style={{ fontSize: '16px', lineHeight: 1.9, color: 'var(--text-muted)', marginBottom: '40px', display: 'block' }}>
                Fabricación en maderas nobles, MDF, melamina y materiales compuestos. Corte CNC de alta precisión y acabados de nivel premium. Nuestro equipo de ebanistas y carpinteros especializados desarrolla desde piezas únicas hasta producción en serie con estándares industriales.
              </TextReveal>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px 32px' }}>
                {capabilities.map(c => (
                  <div key={c} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '6px', height: '6px', background: 'var(--red)', flexShrink: 0 }} />
                    <span style={{ fontSize: '14px', color: 'var(--text-muted)' }}>{c}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Proyectos relacionados */}
      <section style={{ padding: '100px 0', background: 'var(--white)', borderTop: '1px solid var(--border)' }}>
        <div className="container">
          <Reveal>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '48px', flexWrap: 'wrap', gap: '16px' }}>
              <TextReveal as="h2" style={{
                fontFamily: 'var(--font-barlow)', fontWeight: 800,
                fontSize: 'clamp(28px, 4vw, 48px)', lineHeight: 1,
                letterSpacing: '-0.02em', textTransform: 'uppercase', color: 'var(--text)', display: 'block',
              }}>Proyectos<br /><span style={{ color: 'var(--red)' }}>relacionados.</span></TextReveal>
              <Link href="/proyectos" style={{ textDecoration: 'none', fontSize: '13px', fontWeight: 600, color: 'var(--text-muted)', borderBottom: '1px solid var(--border)', paddingBottom: '4px' }}>
                Ver todos →
              </Link>
            </div>
          </Reveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '4px', background: 'var(--border)' }}>
            {relatedProjects.map((p, i) => (
              <Reveal key={p.slug} delay={i * 0.08}>
                <Link href={`/proyectos/${p.slug}`} style={{ textDecoration: 'none', display: 'block' }}>
                  <div style={{ position: 'relative', aspectRatio: '4/3', overflow: 'hidden', background: '#e8e6e2' }}>
                    <Image src={p.cover} alt={p.title} fill style={{ objectFit: 'cover', transition: 'transform 0.5s ease' }} className="proj-img" />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 60%)', zIndex: 1 }} />
                    <div style={{ position: 'absolute', bottom: '24px', left: '24px', zIndex: 2 }}>
                      <p style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--red)', marginBottom: '6px' }}>{p.category}</p>
                      <h3 style={{ fontFamily: 'var(--font-barlow)', fontWeight: 700, fontSize: '17px', textTransform: 'uppercase', color: '#fff', lineHeight: 1.2 }}>{p.title}</h3>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '100px 0', background: 'var(--red)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(0,0,0,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.12) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        <div className="container" style={{ position: 'relative', textAlign: 'center' }}>
          <Reveal>
            <TextReveal as="h2" style={{ fontFamily: 'var(--font-barlow)', fontWeight: 800, fontSize: 'clamp(32px, 5vw, 72px)', lineHeight: 0.95, letterSpacing: '-0.02em', textTransform: 'uppercase', color: '#fff', marginBottom: '24px', display: 'block' }}>
              Fabricamos tu<br />próximo proyecto.
            </TextReveal>
            <TextReveal as="p" delay={0.15} style={{ fontSize: '17px', color: 'rgba(255,255,255,0.85)', marginBottom: '40px', maxWidth: '440px', margin: '0 auto 40px', display: 'block' }}>
              Cuéntanos qué necesitas fabricar. Respondemos en menos de 24 horas.
            </TextReveal>
            <Link href="/contacto" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '10px', background: '#fff', color: 'var(--red)', padding: '18px 48px', fontSize: '14px', fontWeight: 800, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
              Iniciar Proyecto →
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  )
}
