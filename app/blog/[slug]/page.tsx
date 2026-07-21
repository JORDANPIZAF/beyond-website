import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Reveal from '../../components/Reveal'
import TextReveal from '../../components/TextReveal'

export const runtime = 'edge'

const posts: Record<string, {
  title: string
  category: string
  date: string
  readTime: string
  cover: string
  author: string
  content: string[]
}> = {
  'fabricacion-industrial-exhibicion-comercial': {
    title: 'Cómo la fabricación industrial transforma la experiencia de marca en el retail',
    category: 'Retail & Exhibición',
    date: '15 junio, 2026',
    readTime: '7 min de lectura',
    cover: '/images/portfolio/arq-efimera/img/01/GALAXY-S-DES-1.png',
    author: 'Beyond SAS',
    content: [
      'En el ecosistema del retail moderno, la diferencia entre una venta y una experiencia memorable a menudo se construye con madera, metal, acrílico y luz. Marcas como Samsung, Apple y LG lo saben bien: el punto de venta es el momento de la verdad, ese instante en que el consumidor pasa de conocer un producto a desearlo.',
      'Beyond SAS lleva más de 15 años siendo el socio de fabricación detrás de algunas de las instalaciones de retail más impactantes de Colombia. Nuestra propuesta es simple pero poderosa: diseño, ingeniería, fabricación e implementación bajo un mismo techo, sin intermediarios, sin subcontrataciones, con control total de cada detalle.',
      '## El proceso que marca la diferencia',
      'Cuando Samsung nos confió el Samsung Galaxy Studio, el reto era claro: crear una experiencia inmersiva donde los visitantes no solo vieran los nuevos dispositivos, sino que los vivieran. Diseñamos y fabricamos toda la estructura metálica, los paneles de carpintería con acabados lacados en blanco, las cajas de luz de impresión digital y los sistemas de exhibición interactivos.',
      'El proceso comenzó con ingeniería: planos técnicos, cálculos estructurales, selección de materiales. Luego vino la fabricación en nuestra planta de 3.850 m² en Bogotá, donde metalmecánica, carpintería y acrílicos trabajan en paralelo para cumplir tiempos imposibles sin sacrificar calidad. Finalmente, nuestro equipo de instalación viajó a los centros comerciales seleccionados, montó y ajustó cada pieza hasta lograr el resultado que la marca necesitaba.',
      '## El impacto en ventas: más que estética',
      'Es tentador pensar que la exhibición comercial es solo decoración. Pero los datos cuentan otra historia. Un punto de venta bien diseñado puede aumentar la permanencia del cliente entre un 30% y un 50%, lo que se traduce directamente en mayor probabilidad de compra. Para categorías como electrónica de consumo, donde el tacto y la experiencia son determinantes, una buena exhibición no es opcional: es estratégica.',
      'LG, otro de nuestros clientes recurrentes, nos ha encargado tanto arquitectura comercial permanente como vitrinas estacionales. En cada proyecto, el objetivo es el mismo: crear un espacio donde el producto brille, donde la marca se comunique sin necesidad de palabras, y donde el cliente sienta que está en el lugar correcto.',
      '## Materiales que cuentan historias',
      'En Beyond trabajamos con una paleta amplia de materiales: MDF y madera en carpintería, acero y aluminio en metalmecánica, acrílico en señalización y displays luminosos, impresión UV en superficies rígidas y flexibles. La clave está en combinarlos de manera que el resultado final se vea unitario, premium, coherente con la identidad de cada marca.',
      'Para Apple, por ejemplo, cada superficie debe ser perfecta. No hay espacio para imperfecciones. Usamos melaminas de alta calidad, herrajes de importación y procesos de acabado que garantizan que cada arista y cada unión estén al nivel que la marca exige. Para Nestlé, en cambio, la prioridad es la versatilidad: espacios que se puedan montar y desmontar en pocas horas para eventos y congresos.',
      '## Más de 5.800 proyectos de historia',
      'Cada uno de los más de 5.800 proyectos ejecutados por Beyond es una lección aprendida. Sabemos que los tiempos del retail son implacables: los lanzamientos no esperan, las temporadas llegan puntual. Por eso nuestra planta trabaja en turnos extendidos cuando el proyecto lo requiere, y nuestros procesos están optimizados para responder con agilidad sin comprometer la calidad.',
      'Si tu marca necesita transformar su presencia en el punto de venta, en Beyond tenemos la experiencia, la tecnología y el equipo para hacerlo realidad. Porque fabricar no es suficiente: hay que fabricar bien, rápido y con propósito.',
    ],
  },
  'carpinteria-cnc-retail': {
    title: 'Corte CNC y carpintería de precisión: el secreto detrás de los displays premium',
    category: 'Tecnología de Fabricación',
    date: '2 mayo, 2026',
    readTime: '6 min de lectura',
    cover: '/images/portfolio/arq-comercial/img/p1/ARQ_COMERCIAL_02DEST-2.png',
    author: 'Beyond SAS',
    content: [
      'Hay una pregunta que los gerentes de marketing y los directores de retail se hacen con frecuencia: ¿por qué algunos displays se ven del mismo nivel que los que vemos en tiendas de Milán o Nueva York, mientras otros se ven como carpintería de obra? La respuesta está casi siempre en la tecnología de fabricación y en la precisión del proceso.',
      'En Beyond SAS, el corazón de nuestra capacidad de carpintería es el corte CNC (Control Numérico por Computadora). Esta tecnología nos permite traducir un diseño digital en piezas físicas con tolerancias de décimas de milímetro, algo imposible de lograr con procesos manuales.',
      '## Qué es el corte CNC y por qué importa',
      'Un router CNC es, esencialmente, una máquina que sigue instrucciones digitales para cortar, fresar y grabar materiales con extrema precisión. En lugar de depender de la habilidad manual de un operario, el CNC ejecuta el diseño exactamente como fue concebido, pieza tras pieza, con consistencia perfecta.',
      'Esta consistencia es crítica cuando fabricamos en serie. Si una marca necesita 150 islas de exhibición idénticas para distribuir en puntos de venta de todo el país, cada pieza debe encajar perfectamente con las demás, el logo debe estar en exactamente la misma posición, los bordes deben tener el mismo acabado. Con CNC, eso es posible. Con carpintería manual, es una aspiración.',
      '## Los materiales que trabajamos',
      'En nuestra planta procesamos una amplia variedad de materiales. El MDF (Medium Density Fiberboard) es uno de los más utilizados en displays y mobiliario comercial: tiene una superficie homogénea perfecta para pintar o laminar, acepta el CNC con extraordinaria limpieza y tiene buena relación costo-desempeño.',
      'La melamina es ideal cuando se requieren acabados de color sin proceso de pintura posterior: viene con laminado de fábrica en cientos de colores y texturas. Para proyectos de alta gama, trabajamos con maderas naturales y MDF enchapado, donde el CNC nos permite crear molduras, fresados decorativos y texturas que serían imposibles a mano.',
      '## Acabados de nivel internacional',
      'La precisión del corte es solo la mitad de la ecuación. La otra mitad son los acabados. En Beyond contamos con cabinas de pintura donde aplicamos esmaltes al agua y lacas con pistola electrostática, logrando superficies perfectamente lisas, sin marcas de brocha, con el nivel de brillo exacto que el diseño especifica.',
      'Para proyectos como el mobiliario comercial de LG, el proceso es riguroso: lijado progresivo, aplicación de sellador, lijado fino, primera capa de laca, segunda capa, verificación de calidad. El resultado final es una pieza que podría estar en una tienda de lujo en cualquier parte del mundo.',
      '## Del plano al montaje: el proceso completo',
      'Lo que distingue a Beyond de un taller de carpintería convencional es que no solo fabricamos: diseñamos, producimos y también instalamos. Nuestros ingenieros trabajan directamente con el equipo de diseño del cliente para asegurar que los planos sean ejecutables, que los materiales sean los correctos y que el resultado final sea exactamente lo que se imaginó.',
      'Cuando la carpintería sale de planta, nuestro equipo de instalación la recibe, la transporta y la monta en sitio. Supervisamos el proceso completo para garantizar que la instalación final luzca como el render, sin sorpresas desagradables de último minuto.',
      '## La inversión que se recupera',
      'Un display premium fabricado con tecnología CNC y buenos materiales puede costar más que uno fabricado artesanalmente. Pero la diferencia en impacto visual, en durabilidad y en la percepción de marca que genera justifica ampliamente esa inversión. Las marcas que trabajan con Beyond lo saben: sus puntos de venta se ven distintos, y eso se siente en las ventas.',
    ],
  },
  'arquitectura-efimera-colombia': {
    title: 'Arquitectura efímera: stands y experiencias que mueven marcas',
    category: 'Arquitectura Efímera',
    date: '18 marzo, 2026',
    readTime: '8 min de lectura',
    cover: '/images/portfolio/arq-efimera/img/04/isla_appleDEST-3.png',
    author: 'Beyond SAS',
    content: [
      'La arquitectura efímera es, por definición, temporal. Se construye para durar días, semanas, máximo meses. Y sin embargo, cuando está bien ejecutada, puede generar recuerdos permanentes. Un stand en el que viviste una experiencia memorable puede cambiar tu percepción de una marca para siempre.',
      'En Colombia, el marketing experiencial ha crecido exponencialmente en los últimos años. Las marcas globales entienden que la experiencia en punto de venta, en eventos y en lanzamientos de producto es una de las inversiones con mayor retorno. Y en Beyond SAS hemos sido el socio de fabricación de algunas de las arquitecturas efímeras más impresionantes del país.',
      '## Qué es la arquitectura efímera',
      'La arquitectura efímera abarca todo espacio construido con carácter temporal: stands para ferias y exposiciones, islas de exhibición en centros comerciales, espacios de lanzamiento de producto, activaciones de marca en eventos masivos, instalaciones pop-up y ambientaciones estacionales.',
      'A diferencia de la arquitectura permanente, la efímera tiene requerimientos únicos: debe montarse y desmontarse rápidamente, debe poder transportarse a diferentes ubicaciones, debe resistir el uso intensivo durante eventos, y debe verse perfecta desde el primer hasta el último momento.',
      '## Casos de éxito: de Samsung a AMD',
      'El Samsung Galaxy Studio fue uno de los proyectos más complejos que hemos ejecutado en este campo. Se trata de un espacio inmersivo diseñado para el lanzamiento de la línea Galaxy, con múltiples zonas de experiencia, pantallas integradas, iluminación ambiental y acabados premium. El reto principal era crear algo que se viera permanente pero que pudiera montarse en 48 horas.',
      'Para Apple diseñamos y fabricamos una isla de exhibición que tenía que competir visualmente con los espacios que la marca tiene en sus propias tiendas. Cada centímetro debía ser perfecto: las superficies blancas lacadas, la iluminación LED integrada en los bordes, los soportes de producto mecanizados con precisión milimétrica. El resultado fue una isla que generó más de 200 publicaciones espontáneas en redes sociales en su primera semana.',
      'AMD necesitaba una mesa de exhibición de alto impacto para eventos de tecnología. La solución fue una estructura metálica robusta con superficie de vidrio templado iluminado desde abajo, que hacía que los procesadores parecieran flotar. La mesa podía desmontarse y transportarse en un solo vehículo, y tenía un tiempo de montaje de menos de dos horas.',
      'Bold, la fintech colombiana, nos confió sus islas comerciales para puntos de venta. El desafío era diferente: las islas tenían que reflejar la identidad joven y dinámica de la marca, ser altamente funcionales para que los asesores comerciales pudieran trabajar cómodamente, y resistir el uso diario en centros comerciales de alto tráfico.',
      '## El proceso de planificación y ejecución',
      'En Beyond, un proyecto de arquitectura efímera comienza mucho antes de que se levante una sola pieza. Primero viene el brief del cliente: qué espacio tiene disponible, cuánto tiempo tiene el proyecto, qué quiere comunicar, cuántas personas pasarán por el espacio, cuántas veces se va a montar y desmontar.',
      'Con esa información, nuestro equipo de diseño e ingeniería desarrolla el concepto arquitectónico, los planos técnicos y los renders fotorrealistas. En esta etapa resolvemos todos los problemas potenciales antes de que lleguen a obra: cómo se va a anclar al piso, cómo van los cables, cómo se desmonta sin dañar ninguna pieza.',
      'La fabricación es donde la magia ocurre. Metalmecánica, carpintería, acrílicos e impresión trabajan simultáneamente para respetar los tiempos, que en este tipo de proyectos suelen ser muy cortos. Nuestro sistema de producción permite supervisar el avance de cada área y coordinar la integración final.',
      '## Por qué Beyond',
      'En más de 15 años de experiencia fabricando arquitectura efímera, hemos aprendido que los clientes no necesitan un proveedor: necesitan un socio. Un equipo que entienda los plazos imposibles del retail y el marketing, que proponga soluciones cuando aparecen imprevistos, y que garantice que el resultado final estará al nivel de lo que la marca representa.',
      'Eso es lo que hace Beyond. No solo fabricamos: pensamos, resolvemos y ejecutamos. Porque una experiencia de marca que mueve a las personas no se improvisa: se fabrica con precisión, con creatividad y con un compromiso real con la excelencia.',
    ],
  },
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = posts[slug]

  if (!post) {
    notFound()
  }

  return (
    <>
      {/* Hero */}
      <section style={{ position: 'relative', height: '70vh', minHeight: '460px', overflow: 'hidden' }}>
        <Image
          src={post.cover}
          alt={post.title}
          fill
          style={{ objectFit: 'cover' }}
          priority
        />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.2) 100%)',
        }} />
        <div className="container" style={{ position: 'absolute', bottom: '60px', left: '50%', transform: 'translateX(-50%)', width: '100%' }}>
          <Link href="/blog" style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            color: 'rgba(255,255,255,0.7)', textDecoration: 'none',
            fontSize: '13px', fontWeight: 600, letterSpacing: '0.06em',
            marginBottom: '20px',
          }}>
            ← Blog
          </Link>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--red)', background: 'rgba(224,41,7,0.15)', padding: '4px 12px', border: '1px solid var(--red)' }}>
              {post.category}
            </span>
            <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)' }}>{post.date}</span>
            <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)' }}>·</span>
            <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)' }}>{post.readTime}</span>
          </div>
          <TextReveal as="h1" style={{
            fontFamily: 'var(--font-barlow), sans-serif',
            fontWeight: 800,
            fontSize: 'clamp(28px, 4vw, 60px)',
            lineHeight: 1,
            letterSpacing: '-0.02em',
            textTransform: 'uppercase',
            color: '#fff',
            maxWidth: '800px',
            display: 'block',
          }}>{post.title}</TextReveal>
        </div>
      </section>

      {/* Content */}
      <section style={{ padding: '80px 0 120px', background: 'var(--white)' }}>
        <div className="container">
          <div style={{ maxWidth: '760px', margin: '0 auto' }}>
            {post.content.map((block, i) => {
              if (block.startsWith('## ')) {
                return (
                  <Reveal key={i} delay={0.05}>
                    <TextReveal as="h2" style={{
                      fontFamily: 'var(--font-barlow)', fontWeight: 800,
                      fontSize: 'clamp(22px, 3vw, 32px)', lineHeight: 1.1,
                      letterSpacing: '-0.01em', textTransform: 'uppercase',
                      color: 'var(--text)', marginTop: '56px', marginBottom: '20px', display: 'block',
                    }}>{block.replace('## ', '')}</TextReveal>
                  </Reveal>
                )
              }
              return (
                <Reveal key={i} delay={0.03}>
                  <TextReveal as="p" style={{
                    fontSize: '17px', lineHeight: 1.9,
                    color: 'var(--text-muted)', marginBottom: '24px', display: 'block',
                  }}>{block}</TextReveal>
                </Reveal>
              )
            })}

            {/* Author */}
            <div style={{
              marginTop: '60px', paddingTop: '40px',
              borderTop: '1px solid var(--border)',
              display: 'flex', alignItems: 'center', gap: '16px',
            }}>
              <div style={{ width: '48px', height: '48px', background: 'var(--red)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <span style={{ color: '#fff', fontWeight: 800, fontSize: '18px', fontFamily: 'var(--font-barlow)' }}>B</span>
              </div>
              <div>
                <p style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text)', marginBottom: '2px' }}>{post.author}</p>
                <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Fabricación industrial para marcas globales · Bogotá, Colombia</p>
              </div>
            </div>

            {/* CTA */}
            <div style={{
              marginTop: '60px', padding: '40px',
              background: 'var(--bg)', borderLeft: '3px solid var(--red)',
            }}>
              <TextReveal as="h3" style={{
                fontFamily: 'var(--font-barlow)', fontWeight: 800,
                fontSize: '24px', textTransform: 'uppercase', letterSpacing: '-0.01em',
                color: 'var(--text)', marginBottom: '12px', display: 'block',
              }}>¿Tenés un proyecto en mente?</TextReveal>
              <TextReveal as="p" delay={0.15} style={{ fontSize: '15px', color: 'var(--text-muted)', marginBottom: '24px', lineHeight: 1.7, display: 'block' }}>
                En Beyond fabricamos desde una pieza única hasta producciones industriales. Cuéntanos tu proyecto y te respondemos en menos de 24 horas.
              </TextReveal>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <Link href="/contacto" className="btn-primary">Iniciar Proyecto →</Link>
                <Link href="/proyectos" className="btn-outline">Ver Portafolio</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related posts nav */}
      <section style={{ padding: '60px 0', background: 'var(--bg)', borderTop: '1px solid var(--border)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <Link href="/blog" style={{
            textDecoration: 'none', fontSize: '13px', fontWeight: 600,
            color: 'var(--text-muted)', letterSpacing: '0.04em',
            borderBottom: '1px solid var(--border)', paddingBottom: '4px',
          }}>
            ← Ver todos los artículos
          </Link>
        </div>
      </section>
    </>
  )
}
