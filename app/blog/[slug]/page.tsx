'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import Reveal from '../../components/Reveal'
import TextReveal from '../../components/TextReveal'
import { useLanguage } from '../../context/LanguageContext'

export const runtime = 'edge'

const posts: Record<string, {
  title: { es: string; en: string }
  category: { es: string; en: string }
  date: { es: string; en: string }
  readTime: { es: string; en: string }
  cover: string
  author: string
  content: { es: string[]; en: string[] }
}> = {
  'fabricacion-industrial-exhibicion-comercial': {
    title: {
      es: 'Cómo la fabricación industrial transforma la experiencia de marca en el retail',
      en: 'How Industrial Manufacturing Transforms Brand Experience in Retail',
    },
    category: { es: 'Retail & Exhibición', en: 'Retail & Display' },
    date: { es: '15 junio, 2026', en: 'June 15, 2026' },
    readTime: { es: '7 min de lectura', en: '7 min read' },
    cover: '/images/portfolio/arq-efimera/img/01/GALAXY-S-DES-1.webp',
    author: 'Beyond SAS',
    content: {
      es: [
        'En el ecosistema del retail moderno, la diferencia entre una venta y una experiencia memorable a menudo se construye con madera, metal, acrílico y luz. Marcas como Samsung, Apple y LG lo saben bien: el punto de venta es el momento de la verdad, ese instante en que el consumidor pasa de conocer un producto a desearlo.',
        'Beyond SAS lleva más de 15 años siendo el socio de fabricación detrás de algunas de las instalaciones de retail más impactantes de Colombia. Nuestra propuesta es simple pero poderosa: diseño, ingeniería, fabricación e implementación bajo un mismo techo, sin intermediarios, sin subcontrataciones, con control total de cada detalle.',
        '## El proceso que marca la diferencia',
        'Cuando Samsung nos confió el Samsung Galaxy Studio, el reto era claro: crear una experiencia inmersiva donde los visitantes no solo vieran los nuevos dispositivos, sino que los vivieran. Diseñamos y fabricamos toda la estructura metálica, los paneles de carpintería con acabados lacados en blanco, las cajas de luz de impresión digital y los sistemas de exhibición interactivos.',
        'El proceso comenzó con ingeniería: planos técnicos, cálculos estructurales, selección de materiales. Luego vino la fabricación en nuestra planta de 5.000 m² en Bogotá, donde metalmecánica, carpintería y acrílicos trabajan en paralelo para cumplir tiempos imposibles sin sacrificar calidad. Finalmente, nuestro equipo de instalación viajó a los centros comerciales seleccionados, montó y ajustó cada pieza hasta lograr el resultado que la marca necesitaba.',
        '## El impacto en ventas: más que estética',
        'Es tentador pensar que la exhibición comercial es solo decoración. Pero los datos cuentan otra historia. Un punto de venta bien diseñado puede aumentar la permanencia del cliente entre un 30% y un 50%, lo que se traduce directamente en mayor probabilidad de compra. Para categorías como electrónica de consumo, donde el tacto y la experiencia son determinantes, una buena exhibición no es opcional: es estratégica.',
        'LG, otro de nuestros clientes recurrentes, nos ha encargado tanto arquitectura comercial permanente como vitrinas estacionales. En cada proyecto, el objetivo es el mismo: crear un espacio donde el producto brille, donde la marca se comunique sin necesidad de palabras, y donde el cliente sienta que está en el lugar correcto.',
        '## Materiales que cuentan historias',
        'En Beyond trabajamos con una paleta amplia de materiales: MDF y madera en carpintería, acero y aluminio en metalmecánica, acrílico en señalización y displays luminosos, impresión UV en superficies rígidas y flexibles. La clave está en combinarlos de manera que el resultado final se vea unitario, premium, coherente con la identidad de cada marca.',
        'Para Apple, por ejemplo, cada superficie debe ser perfecta. No hay espacio para imperfecciones. Usamos melaminas de alta calidad, herrajes de importación y procesos de acabado que garantizan que cada arista y cada unión estén al nivel que la marca exige. Para Nestlé, en cambio, la prioridad es la versatilidad: espacios que se puedan montar y desmontar en pocas horas para eventos y congresos.',
        '## Más de 10.000 proyectos de historia',
        'Cada uno de los más de 10.000 proyectos ejecutados por Beyond es una lección aprendida. Sabemos que los tiempos del retail son implacables: los lanzamientos no esperan, las temporadas llegan puntual. Por eso nuestra planta trabaja en turnos extendidos cuando el proyecto lo requiere, y nuestros procesos están optimizados para responder con agilidad sin comprometer la calidad.',
        'Si tu marca necesita transformar su presencia en el punto de venta, en Beyond tenemos la experiencia, la tecnología y el equipo para hacerlo realidad. Porque fabricar no es suficiente: hay que fabricar bien, rápido y con propósito.',
      ],
      en: [
        'In the modern retail ecosystem, the difference between a sale and a memorable experience is often built with wood, metal, acrylic, and light. Brands like Samsung, Apple, and LG know this well: the point of sale is the moment of truth, the instant when a consumer moves from knowing a product to wanting it.',
        'Beyond SAS has spent more than 15 years as the manufacturing partner behind some of the most impactful retail installations in Colombia. Our proposition is simple but powerful: design, engineering, manufacturing, and implementation under one roof, with no intermediaries, no subcontracting, and full control over every detail.',
        '## The Process That Makes the Difference',
        "When Samsung entrusted us with the Samsung Galaxy Studio, the challenge was clear: create an immersive experience where visitors wouldn't just see the new devices, but live them. We designed and manufactured the entire metal structure, the white lacquer-finished carpentry panels, the digitally printed light boxes, and the interactive display systems.",
        'The process began with engineering: technical drawings, structural calculations, material selection. Then came manufacturing at our 5,000 m² plant in Bogotá, where metalworking, carpentry, and acrylics run in parallel to meet impossible deadlines without sacrificing quality. Finally, our installation team traveled to the selected shopping centers, assembling and fine-tuning every piece until the result matched what the brand needed.',
        '## The Impact on Sales: More Than Aesthetics',
        "It's tempting to think of commercial display as mere decoration. But the data tells a different story. A well-designed point of sale can increase customer dwell time by 30% to 50%, which translates directly into a higher likelihood of purchase. For categories like consumer electronics, where touch and experience are decisive, good display isn't optional — it's strategic.",
        "LG, another of our recurring clients, has commissioned us for both permanent commercial architecture and seasonal showcases. In every project, the goal is the same: create a space where the product shines, where the brand communicates without words, and where the customer feels they're in the right place.",
        '## Materials That Tell Stories',
        "At Beyond we work with a broad palette of materials: MDF and wood in carpentry, steel and aluminum in metalworking, acrylic for signage and illuminated displays, UV printing on rigid and flexible surfaces. The key lies in combining them so the final result looks unified, premium, and consistent with each brand's identity.",
        "For Apple, for instance, every surface must be perfect. There's no room for imperfections. We use high-quality melamines, imported hardware, and finishing processes that guarantee every edge and every joint meets the standard the brand demands. For Nestlé, on the other hand, the priority is versatility: spaces that can be assembled and disassembled in a matter of hours for events and conferences.",
        '## More Than 10,000 Projects of History',
        "Every one of the more than 10,000 projects Beyond has completed is a lesson learned. We know retail timelines are unforgiving: launches don't wait, seasons arrive on schedule. That's why our plant runs extended shifts when a project requires it, and our processes are optimized to respond with agility without compromising quality.",
        "If your brand needs to transform its presence at the point of sale, Beyond has the experience, the technology, and the team to make it happen. Because manufacturing isn't enough — you have to manufacture well, fast, and with purpose.",
      ],
    },
  },
  'carpinteria-cnc-retail': {
    title: {
      es: 'Corte CNC y carpintería de precisión: el secreto detrás de los displays premium',
      en: 'CNC Cutting and Precision Carpentry: The Secret Behind Premium Displays',
    },
    category: { es: 'Tecnología de Fabricación', en: 'Manufacturing Technology' },
    date: { es: '2 mayo, 2026', en: 'May 2, 2026' },
    readTime: { es: '6 min de lectura', en: '6 min read' },
    cover: '/images/portfolio/arq-comercial/img/p1/ARQ_COMERCIAL_02DEST-2.webp',
    author: 'Beyond SAS',
    content: {
      es: [
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
      en: [
        "There's a question marketing managers and retail directors ask themselves often: why do some displays look like they belong in stores in Milan or New York, while others look like job-site carpentry? The answer almost always lies in manufacturing technology and process precision.",
        "At Beyond SAS, the heart of our carpentry capability is CNC (Computer Numerical Control) cutting. This technology lets us translate a digital design into physical parts with tolerances of tenths of a millimeter — something impossible to achieve with manual processes.",
        '## What CNC Cutting Is and Why It Matters',
        "A CNC router is, essentially, a machine that follows digital instructions to cut, mill, and engrave materials with extreme precision. Instead of relying on an operator's manual skill, the CNC executes the design exactly as conceived, piece after piece, with perfect consistency.",
        "This consistency is critical when we manufacture at scale. If a brand needs 150 identical display islands to distribute at points of sale across the country, every piece must fit perfectly with the rest, the logo must sit in exactly the same position, and the edges must share the same finish. With CNC, that's achievable. With manual carpentry, it's an aspiration.",
        '## The Materials We Work With',
        'Our plant processes a wide variety of materials. MDF (Medium Density Fiberboard) is one of the most widely used in displays and commercial furniture: it has a perfectly homogeneous surface for painting or laminating, takes to CNC with remarkable cleanliness, and offers a strong cost-to-performance ratio.',
        'Melamine is ideal when color finishes are needed without a subsequent painting process: it comes with factory lamination in hundreds of colors and textures. For high-end projects, we work with natural wood and veneered MDF, where CNC lets us create moldings, decorative routing, and textures that would be impossible to achieve by hand.',
        '## Finishes at an International Standard',
        'Cutting precision is only half the equation. The other half is the finish. At Beyond we have dedicated paint booths where we apply water-based enamels and lacquers with electrostatic guns, achieving perfectly smooth surfaces, free of brush marks, at exactly the sheen level the design specifies.',
        "For projects like LG's commercial furniture, the process is rigorous: progressive sanding, sealer application, fine sanding, first coat of lacquer, second coat, quality verification. The final result is a piece that could stand in a luxury store anywhere in the world.",
        '## From Blueprint to Installation: The Complete Process',
        "What sets Beyond apart from a conventional carpentry shop is that we don't just manufacture: we design, produce, and also install. Our engineers work directly with the client's design team to make sure the drawings are buildable, the materials are correct, and the final result is exactly what was envisioned.",
        'When the carpentry leaves the plant, our installation team receives it, transports it, and assembles it on site. We oversee the entire process to guarantee that the final installation looks like the render, with no unpleasant last-minute surprises.',
        '## The Investment That Pays for Itself',
        'A premium display manufactured with CNC technology and quality materials can cost more than one built by hand. But the difference in visual impact, durability, and brand perception it generates more than justifies that investment. Brands that work with Beyond know it: their points of sale look different, and that difference shows up in sales.',
      ],
    },
  },
  'arquitectura-efimera-colombia': {
    title: {
      es: 'Arquitectura efímera: stands y experiencias que mueven marcas',
      en: 'Ephemeral Architecture: Stands and Experiences That Move Brands',
    },
    category: { es: 'Arquitectura Efímera', en: 'Ephemeral Architecture' },
    date: { es: '18 marzo, 2026', en: 'March 18, 2026' },
    readTime: { es: '8 min de lectura', en: '8 min read' },
    cover: '/images/portfolio/arq-efimera/img/04/isla_appleDEST-3.webp',
    author: 'Beyond SAS',
    content: {
      es: [
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
      en: [
        'Ephemeral architecture is, by definition, temporary. It is built to last days, weeks, months at most. And yet, when executed well, it can create permanent memories. A stand where you lived a memorable experience can change your perception of a brand forever.',
        'In Colombia, experiential marketing has grown exponentially in recent years. Global brands understand that the experience at the point of sale, at events, and at product launches is one of the investments with the highest return. And at Beyond SAS we have been the manufacturing partner behind some of the most impressive ephemeral architecture in the country.',
        '## What Ephemeral Architecture Is',
        'Ephemeral architecture covers any space built with temporary character: stands for trade shows and exhibitions, display islands in shopping centers, product launch spaces, brand activations at large-scale events, pop-up installations, and seasonal environments.',
        'Unlike permanent architecture, ephemeral architecture has unique requirements: it must be assembled and disassembled quickly, it must be transportable to different locations, it must withstand intensive use during events, and it must look perfect from the first moment to the last.',
        '## Success Stories: From Samsung to AMD',
        'The Samsung Galaxy Studio was one of the most complex projects we have executed in this field. It is an immersive space designed for the launch of the Galaxy line, with multiple experience zones, integrated screens, ambient lighting, and premium finishes. The main challenge was creating something that looked permanent but could be assembled in 48 hours.',
        'For Apple we designed and manufactured a display island that had to compete visually with the spaces the brand has in its own stores. Every centimeter had to be perfect: the white lacquered surfaces, the LED lighting integrated into the edges, the product supports machined with millimeter precision. The result was an island that generated more than 200 spontaneous social media posts in its first week.',
        'AMD needed a high-impact display table for technology events. The solution was a robust metal structure with a tempered glass surface lit from below, making the processors appear to float. The table could be disassembled and transported in a single vehicle, with an assembly time of under two hours.',
        'Bold, the Colombian fintech, entrusted us with their commercial islands for points of sale. The challenge was different: the islands had to reflect the brand\'s young, dynamic identity, be highly functional so sales advisors could work comfortably, and withstand daily use in high-traffic shopping centers.',
        '## The Planning and Execution Process',
        'At Beyond, an ephemeral architecture project begins long before a single piece goes up. First comes the client brief: what space is available, how much time the project has, what it wants to communicate, how many people will pass through the space, how many times it will be assembled and disassembled.',
        'With that information, our design and engineering team develops the architectural concept, the technical drawings, and the photorealistic renders. At this stage we solve every potential problem before it reaches the job site: how it will anchor to the floor, how the cabling runs, how it disassembles without damaging any piece.',
        'Manufacturing is where the magic happens. Metalworking, carpentry, acrylics, and printing run simultaneously to meet deadlines, which in this type of project tend to be very tight. Our production system lets us track progress in each area and coordinate the final integration.',
        '## Why Beyond',
        "In more than 15 years of experience manufacturing ephemeral architecture, we've learned that clients don't need a supplier — they need a partner. A team that understands the impossible deadlines of retail and marketing, that proposes solutions when the unexpected happens, and that guarantees the final result will match what the brand represents.",
        "That's what Beyond does. We don't just manufacture: we think, solve, and execute. Because a brand experience that moves people isn't improvised — it's manufactured with precision, with creativity, and with a real commitment to excellence.",
      ],
    },
  },
}

export default function BlogPostPage() {
  const params = useParams()
  const slug = params.slug as string
  const post = posts[slug]
  const { t, lang } = useLanguage()

  if (!post) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', paddingTop: '76px' }}>
        <TextReveal as="h1" style={{ fontFamily: 'var(--font-barlow)', fontWeight: 800, fontSize: '48px', color: 'var(--text)', marginBottom: '16px', display: 'block' }}>
          {lang === 'es' ? 'Artículo no encontrado' : 'Article not found'}
        </TextReveal>
        <Link href="/blog" style={{ color: 'var(--accent)', fontWeight: 600 }}>{t.blogDetail.allArticles}</Link>
      </div>
    )
  }

  return (
    <>
      {/* Hero */}
      <section style={{ position: 'relative', height: '70vh', minHeight: '460px', overflow: 'hidden' }}>
        <Image
          src={post.cover}
          alt={post.title[lang]}
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
            {t.blogDetail.backLink}
          </Link>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--accent)', background: 'rgba(178,132,60,0.15)', padding: '4px 12px', border: '1px solid var(--accent)' }}>
              {post.category[lang]}
            </span>
            <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)' }}>{post.date[lang]}</span>
            <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)' }}>·</span>
            <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)' }}>{post.readTime[lang]}</span>
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
          }}>{post.title[lang]}</TextReveal>
        </div>
      </section>

      {/* Content */}
      <section style={{ padding: '80px 0 120px', background: 'var(--white)' }}>
        <div className="container">
          <div style={{ maxWidth: '760px', margin: '0 auto' }}>
            {post.content[lang].map((block, i) => {
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
              <div style={{ width: '48px', height: '48px', background: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <span style={{ color: '#fff', fontWeight: 800, fontSize: '18px', fontFamily: 'var(--font-barlow)' }}>B</span>
              </div>
              <div>
                <p style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text)', marginBottom: '2px' }}>{post.author}</p>
                <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{t.blogDetail.authorTagline}</p>
              </div>
            </div>

            {/* CTA */}
            <div style={{
              marginTop: '60px', padding: '40px',
              background: 'var(--bg)', borderLeft: '3px solid var(--accent)',
            }}>
              <TextReveal as="h3" style={{
                fontFamily: 'var(--font-barlow)', fontWeight: 800,
                fontSize: '24px', textTransform: 'uppercase', letterSpacing: '-0.01em',
                color: 'var(--text)', marginBottom: '12px', display: 'block',
              }}>{t.blogDetail.ctaTitle}</TextReveal>
              <TextReveal as="p" delay={0.15} style={{ fontSize: '15px', color: 'var(--text-muted)', marginBottom: '24px', lineHeight: 1.7, display: 'block' }}>
                {t.blogDetail.ctaBody}
              </TextReveal>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <Link href="/contacto" className="btn-primary">{t.nav.startProject}</Link>
                <Link href="/proyectos" className="btn-outline">{t.blogDetail.ctaBtnSecondary}</Link>
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
            {t.blogDetail.allArticles}
          </Link>
        </div>
      </section>
    </>
  )
}
