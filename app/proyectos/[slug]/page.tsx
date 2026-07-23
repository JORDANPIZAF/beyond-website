'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import Reveal from '../../components/Reveal'
import TextReveal from '../../components/TextReveal'

export const runtime = 'edge'

const clientLogoMap: Record<string, string> = {
  'Samsung': 'SAMSUNG - BEYOND.webp',
  'TCL': 'TCL---BEYOND.webp',
  'Bold': 'bold.webp',
  'Apple': 'APPLE - BEYOND.webp',
  'AMD': 'AMD - BEYOND.webp',
  'LG': 'LG - BEYOND.webp',
  'Aldo': 'aldo.webp',
  'Olímpica': 'OLIMPICA - BEYOND.webp',
  'Nestlé': 'NESTLE- BEYOND.webp',
  'Microsoft': 'microsoft.webp',
  'Canasta': 'LOGO_CANASTA .webp',
  'Purina': 'NESTLE PURINA - BEYOND.webp',
}

const projectsData: Record<string, {
  title: string
  client: string
  category: string
  year: string
  description: string
  cover: string
  gallery: string[]
}> = {
  'samsung-galaxy-studio': {
    title: 'Samsung Galaxy Studio',
    client: 'Samsung',
    category: 'Arquitectura Efímera',
    year: '2024',
    description: 'Stand interactivo Galaxy Studio para el lanzamiento de la línea Samsung Galaxy en centros comerciales de Bogotá y Medellín. Estructura metálica de piso a techo con paneles retroiluminados, integración de pantallas para demostraciones de SmartThings y acabados en madera y verde, color característico de la marca. Fabricación integral: metalmecánica de la estructura, carpintería del mobiliario interior, impresión de gran formato para la señalización y montaje en sitio con nuestro propio equipo de instalación.',
    cover: '/images/portfolio/arq-efimera/img/01/GALAXY-S-DES-1.png',
    gallery: [
      '/images/portfolio/arq-efimera/img/01/GALAXY-S-DES-1.png',
      '/images/portfolio/arq-efimera/img/01/GALAXY-S-DES-2.png',
      '/images/portfolio/arq-efimera/img/01/GALAXY-S-DES-3.png',
      '/images/portfolio/arq-efimera/img/01/GALAXY-S-DES-4.png',
      '/images/portfolio/arq-efimera/img/01/GALAXY-S-INT-1.png',
      '/images/portfolio/arq-efimera/img/01/GALAXY-S-INT-2.png',
      '/images/portfolio/arq-efimera/img/01/GALAXY-S-INT-3.png',
      '/images/portfolio/arq-efimera/img/01/GALAXY-S-INT-4.png',
    ],
  },
  'tcl-tv-wall': {
    title: 'TCL TV Wall',
    client: 'TCL',
    category: 'Arquitectura Efímera',
    year: '2023',
    description: 'TV Wall móvil de gran formato para TCL, diseñado para exhibir simultáneamente múltiples televisores en un solo punto de alto tráfico. Estructura metalmecánica robusta capaz de soportar el peso y cableado de varias pantallas, con sistema de iluminación LED perimetral y acabados en pintura electrostática de alta durabilidad para resistir el uso constante en piso de venta. Un desarrollo pensado para moverse entre tiendas sin perder rigidez ni terminación premium.',
    cover: '/images/portfolio/arq-efimera/img/03/wall_tcl_DEST-1.png',
    gallery: [
      '/images/portfolio/arq-efimera/img/03/wall_tcl_DEST-1.png',
      '/images/portfolio/arq-efimera/img/03/wall_tcl_DEST-2.png',
      '/images/portfolio/arq-efimera/img/03/wall_tcl_DEST-3.png',
      '/images/portfolio/arq-efimera/img/03/wall_tcl_DEST-4.png',
      '/images/portfolio/arq-efimera/img/03/wall_tcl_DEST-5.png',
      '/images/portfolio/arq-efimera/img/03/wall_tcl_DEST-6.png',
      '/images/portfolio/arq-efimera/img/03/wall_tcl_INT-1-.png',
      '/images/portfolio/arq-efimera/img/03/wall_tcl_INT-2.png',
    ],
  },
  'bold-islas': {
    title: 'Bold Islas',
    client: 'Bold',
    category: 'Arquitectura Efímera',
    year: '2021',
    description: 'Islas comerciales modulares para Bold, diseñadas para puntos de venta dentro de centros comerciales. Carpintería de precisión con acabados en laminado de alto brillo, iluminación integrada bajo mesón y sistema de anclaje que permite reconfigurar el mobiliario según el espacio disponible en cada ubicación. Un diseño compacto que maximiza la exhibición de producto sin perder circulación alrededor del punto.',
    cover: '/images/portfolio/arq-efimera/img/02/islas_boldDEST-4.png',
    gallery: [
      '/images/portfolio/arq-efimera/img/02/islas_boldDEST-1.png',
      '/images/portfolio/arq-efimera/img/02/islas_boldDEST-2.png',
      '/images/portfolio/arq-efimera/img/02/islas_boldDEST-3.png',
      '/images/portfolio/arq-efimera/img/02/islas_boldDEST-4.png',
      '/images/portfolio/arq-efimera/img/02/islas_boldDEST-5.png',
      '/images/portfolio/arq-efimera/img/02/islas_boldDEST-6.png',
      '/images/portfolio/arq-efimera/img/02/islas_boldINT-1-.png',
      '/images/portfolio/arq-efimera/img/02/islas_boldINT-2.png',
    ],
  },
  'apple-isla': {
    title: 'Apple Isla',
    client: 'Apple',
    category: 'Arquitectura Efímera',
    year: '2021',
    description: 'Isla de exhibición para productos insignia Apple, fabricada respetando al milímetro los estándares de diseño y minimalismo de la marca. Carpintería y metalmecánica de alta precisión, superficies en vidrio templado, iluminación LED de bajo consumo integrada en la estructura y acabados en tonos neutros que ponen el foco completamente en el producto. Cada unión y cada terminación pasó por control de calidad antes de instalar en sitio.',
    cover: '/images/portfolio/arq-efimera/img/04/isla_appleDEST-3.png',
    gallery: [
      '/images/portfolio/arq-efimera/img/04/isla_appleDEST-1.png',
      '/images/portfolio/arq-efimera/img/04/isla_appleDEST-2.png',
      '/images/portfolio/arq-efimera/img/04/isla_appleDEST-3.png',
      '/images/portfolio/arq-efimera/img/04/isla_appleDEST-4.png',
      '/images/portfolio/arq-efimera/img/04/isla_appleDEST-5.png',
      '/images/portfolio/arq-efimera/img/04/isla_appleDEST-6.png',
      '/images/portfolio/arq-efimera/img/04/isla_appleINT-1-.png',
      '/images/portfolio/arq-efimera/img/04/isla_appleINT-2.png',
    ],
  },
  'amd-mesa': {
    title: 'AMD Mesa',
    client: 'AMD',
    category: 'Arquitectura Efímera',
    year: '2020',
    description: 'Mesa de exhibición de alto impacto para AMD, pensada como punto focal dentro de eventos y activaciones tecnológicas. Estructura metalmecánica robusta con superficie en vidrio templado, iluminación perimetral LED que resalta el producto y soporte para impresión digital de alta resolución con la gráfica de marca. Diseñada para resistir montaje y desmontaje repetido sin perder estabilidad.',
    cover: '/images/portfolio/arq-efimera/img/05/mesa-amd_DEST-1.png',
    gallery: [
      '/images/portfolio/arq-efimera/img/05/mesa-amd_DEST-1.png',
      '/images/portfolio/arq-efimera/img/05/mesa-amd_DEST-2.png',
      '/images/portfolio/arq-efimera/img/05/mesa-amd_DEST-3.png',
      '/images/portfolio/arq-efimera/img/05/mesa-amd_DEST-4.png',
      '/images/portfolio/arq-efimera/img/05/mesa-amd_DEST-5.png',
      '/images/portfolio/arq-efimera/img/05/mesa-amd_DEST-6.png',
      '/images/portfolio/arq-efimera/img/05/mesa-amd_INT-1-.png',
      '/images/portfolio/arq-efimera/img/05/mesa-amd_INT-2.png',
    ],
  },
  'lg-arq-comercial': {
    title: 'LG Arquitectura Comercial',
    client: 'LG',
    category: 'Arquitectura Comercial',
    year: '2023',
    description: 'Arquitectura comercial integral para LG en grandes superficies a nivel nacional. Diseño de espacios de exhibición con estructuras metálicas, paneles de carpintería de alta precisión y señalización de marca aplicada en múltiples formatos. El proyecto se replicó en distintas tiendas manteniendo consistencia de marca y calidad de acabado en cada instalación.',
    cover: '/images/portfolio/arq-comercial/img/p1/ARQ_COMERCIAL_02DEST-2.png',
    gallery: [
      '/images/portfolio/arq-comercial/img/p1/ARQ_COMERCIAL_02DEST-1.png',
      '/images/portfolio/arq-comercial/img/p1/ARQ_COMERCIAL_02DEST-2.png',
      '/images/portfolio/arq-comercial/img/p1/ARQ_COMERCIAL_02DEST-3.png',
      '/images/portfolio/arq-comercial/img/p1/ARQ_COMERCIAL_02DEST-4.png',
      '/images/portfolio/arq-comercial/img/p1/ARQ_COMERCIAL_02DEST-5.png',
      '/images/portfolio/arq-comercial/img/p1/ARQ_COMERCIAL_02DEST-6.png',
      '/images/portfolio/arq-comercial/img/p1/ARQ_COMERCIAL_02INT-2.png',
      '/images/portfolio/arq-comercial/img/p1/ARQ_COMERCIAL_02INT-3.png',
    ],
  },
  'aldo-mobiliario': {
    title: 'Aldo Mobiliario',
    client: 'Aldo',
    category: 'Arquitectura Comercial',
    year: '2022',
    description: 'Mobiliario comercial de alta gama para tiendas Aldo. Carpintería de precisión con acabados lacados, herrajes de importación y superficies en vidrio templado que refuerzan el posicionamiento premium de la marca en el punto de venta. Cada exhibidor se fabricó a medida para adaptarse al layout específico de cada tienda.',
    cover: '/images/portfolio/arq-comercial/img/p2/DEST-2PANDORA.png',
    gallery: [
      '/images/portfolio/arq-comercial/img/p2/DEST-1PANDORA.png',
      '/images/portfolio/arq-comercial/img/p2/DEST-2PANDORA.png',
      '/images/portfolio/arq-comercial/img/p2/DEST-3PANDORA.png',
      '/images/portfolio/arq-comercial/img/p2/DEST-4PANDORA.png',
      '/images/portfolio/arq-comercial/img/p2/DEST-5PANDORA.png',
      '/images/portfolio/arq-comercial/img/p2/DEST-6PANDORA.png',
      '/images/portfolio/arq-comercial/img/p2/INT-2PANDORA.png',
      '/images/portfolio/arq-comercial/img/p2/INT-3PANDORA.png',
    ],
  },
  'lg-vitrina-bucaramanga': {
    title: 'LG Vitrina Bucaramanga',
    client: 'LG',
    category: 'Arquitectura Comercial',
    year: '2024',
    description: 'Intervención de vitrina comercial LG dentro del punto de venta TownCenter en Bucaramanga. Diseño y fabricación de módulos de exhibición con iluminación LED integrada, estructura metálica y carpintería de acabado fino para presentar el portafolio LG dentro de un espacio comercial ya existente. Instalación coordinada en sitio sin interrumpir la operación diaria del punto de venta.',
    cover: '/images/portfolio/arq-comercial/img/p3/vitrina_buc_DEST-1.png',
    gallery: [
      '/images/portfolio/arq-comercial/img/p3/vitrina_buc_DEST-1.png',
      '/images/portfolio/arq-comercial/img/p3/vitrina_buc_DEST-2.png',
      '/images/portfolio/arq-comercial/img/p3/vitrina_buc_DEST-3.png',
      '/images/portfolio/arq-comercial/img/p3/vitrina_buc_DEST-4.png',
      '/images/portfolio/arq-comercial/img/p3/vitrina_buc_DEST-5.png',
      '/images/portfolio/arq-comercial/img/p3/vitrina_buc_DEST-6.png',
      '/images/portfolio/arq-comercial/img/p3/vitrina-bucaramanga_01.png',
      '/images/portfolio/arq-comercial/img/p3/vitrina-bucaramanga_02.png',
    ],
  },
  'olimpica-licores': {
    title: 'Olímpica Licores',
    client: 'Olímpica',
    category: 'Góndolas',
    year: '2024',
    description: 'Góndolas de exhibición para la sección de licores de Olímpica. Estructura en metalmecánica con acabado en tonos oscuros y detalles en cobre, señalización retroiluminada con el nombre de cada categoría y medallones circulares informativos integrados en el mueble. Un desarrollo pensado para darle a la sección de licores una identidad visual propia dentro del supermercado, sin sacrificar capacidad de almacenaje ni exhibición de producto.',
    cover: '/images/portfolio/gondolas/imge/01/GONDOLAS_-DES-1.png',
    gallery: [
      '/images/portfolio/gondolas/imge/01/GONDOLAS_-DES-1.png',
      '/images/portfolio/gondolas/imge/01/GONDOLAS_DES-2.png',
      '/images/portfolio/gondolas/imge/01/GONDOLAS_DES-3.png',
      '/images/portfolio/gondolas/imge/01/GONDOLAS_DES-4.png',
      '/images/portfolio/gondolas/imge/01/GONDOLAS_-DES-5.png',
      '/images/portfolio/gondolas/imge/01/GONDOLAS_DES-6.png',
      '/images/portfolio/gondolas/imge/01/GONDOLAS_-INT-1.png',
      '/images/portfolio/gondolas/imge/01/GONDOLAS_-INT-2.png',
    ],
  },
  'olimpica-zona-fit': {
    title: 'Olímpica Zona Fit',
    client: 'Olímpica',
    category: 'Góndolas',
    year: '2021',
    description: 'Zona Fit Olímpica: exhibición especializada para productos de fitness y nutrición deportiva. Góndolas modulares fabricadas en metalmecánica, con sistema de iluminación LED y señalética de alto impacto visual que diferencia esta sección del resto del supermercado. El diseño permite reorganizar los módulos según la rotación de producto.',
    cover: '/images/portfolio/gondolas/imge/02/zona-fit_DEST-2.png',
    gallery: [
      '/images/portfolio/gondolas/imge/02/zona-fit_DEST-1.png',
      '/images/portfolio/gondolas/imge/02/zona-fit_DEST-2.png',
      '/images/portfolio/gondolas/imge/02/zona-fit_DEST-3.png',
      '/images/portfolio/gondolas/imge/02/zona-fit_DEST-4.png',
      '/images/portfolio/gondolas/imge/02/zona-fit_DEST-5.png',
      '/images/portfolio/gondolas/imge/02/zona-fit_DEST-6.png',
      '/images/portfolio/gondolas/imge/02/zona-fit_INT-2.png',
      '/images/portfolio/gondolas/imge/02/zona-fit_INT-3.png',
    ],
  },
  'olimpica-gondolas': {
    title: 'Olímpica Góndolas',
    client: 'Olímpica',
    category: 'Góndolas',
    year: '2022',
    description: 'Sistema completo de góndolas para distintas secciones de Olímpica. Fabricación metalmecánica de alta resistencia con capacidad de carga superior a la estándar, acabados en pintura electrostática y sistema de estanterías ajustables que se adapta al tipo y volumen de cada producto. Un desarrollo a escala pensado para múltiples puntos de venta.',
    cover: '/images/portfolio/gondolas/imge/03/gondolas_2_DEST-2.png',
    gallery: [
      '/images/portfolio/gondolas/imge/03/gondolas_2_DEST-1.png',
      '/images/portfolio/gondolas/imge/03/gondolas_2_DEST-2.png',
      '/images/portfolio/gondolas/imge/03/gondolas_2_DEST-3.png',
      '/images/portfolio/gondolas/imge/03/gondolas_2_DEST-4.png',
      '/images/portfolio/gondolas/imge/03/gondolas_2_DEST-5.png',
      '/images/portfolio/gondolas/imge/03/gondolas_2_DEST-6.png',
      '/images/portfolio/gondolas/imge/03/gondolas_2_INT-2.png',
      '/images/portfolio/gondolas/imge/03/gondolas_2_INT-3.png',
    ],
  },
  'isimo-to-go': {
    title: 'Isimo To Go',
    client: 'Isimo',
    category: 'Góndolas',
    year: '2026',
    description: 'Sistema modular de autoservicio "Isimo To Go" para puntos de venta desatendidos en edificios corporativos y zonas de alto tráfico. Góndolas metalmecánicas organizadas por categoría —mundo saludable, bebidas y snacks— con iluminación LED integrada bajo cada nivel y señalética retroiluminada de marca. Incluye nevera vertical para bebidas frías, mueble de base en carpintería con paneles de madera texturizada y estación de autopago con lector de código de barras y datáfono integrados. Un formato replicable que hemos instalado en varias sedes manteniendo la misma calidad de acabado y tiempos de montaje ajustados.',
    cover: '/images/portfolio/gondolas/isimo/isimo-portada.jpg',
    gallery: [
      '/images/portfolio/gondolas/isimo/isimo-portada.jpg',
      '/images/portfolio/gondolas/isimo/isimo-01.jpg',
      '/images/portfolio/gondolas/isimo/isimo-02.jpg',
      '/images/portfolio/gondolas/isimo/isimo-03.jpg',
      '/images/portfolio/gondolas/isimo/isimo-04.jpg',
      '/images/portfolio/gondolas/isimo/isimo-05.jpg',
      '/images/portfolio/gondolas/isimo/isimo-06.jpg',
      '/images/portfolio/gondolas/isimo/isimo-07.jpg',
      '/images/portfolio/gondolas/isimo/isimo-08.jpg',
      '/images/portfolio/gondolas/isimo/isimo-09.jpg',
    ],
  },
  'lg-road-show': {
    title: 'LG Road Show',
    client: 'LG',
    category: 'Arquitectura Efímera',
    year: '2026',
    description: 'Activación itinerante para LG con múltiples ambientes de producto dentro de un mismo salón de eventos: sala de TV con pedestales retroiluminados para las líneas OLED y QNED AI, torre de lavandería "Encaje perfecto" con iluminación RGB integrada, cocina completa con nevera, estufa e isla en barra para mostrar línea blanca en uso real, y una zona de lounge con divisor de listones de madera. Carpintería, metalmecánica e impresión de gran formato combinadas en un montaje modular pensado para armarse y desarmarse entre sedes sin perder el nivel de terminación de un stand fijo.',
    cover: '/images/portfolio/arq-efimera/lg-road-show/lg-roadshow-portada.jpg',
    gallery: [
      '/images/portfolio/arq-efimera/lg-road-show/lg-roadshow-portada.jpg',
      '/images/portfolio/arq-efimera/lg-road-show/lg-roadshow-01.jpg',
      '/images/portfolio/arq-efimera/lg-road-show/lg-roadshow-02.jpg',
      '/images/portfolio/arq-efimera/lg-road-show/lg-roadshow-03.jpg',
      '/images/portfolio/arq-efimera/lg-road-show/lg-roadshow-04.jpg',
      '/images/portfolio/arq-efimera/lg-road-show/lg-roadshow-05.jpg',
    ],
  },
  'plataforma-masajeadoras-el-dorado': {
    title: 'Plataforma Sillas Masajeadoras — El Dorado',
    client: 'El Dorado',
    category: 'Mobiliario',
    year: '2026',
    description: 'Plataforma elevada en madera con iluminación LED perimetral para alojar cápsulas de masaje Zero-Gravity en las salas de espera del Aeropuerto Internacional El Dorado. Estructura de piso a la medida de cada capsula, acabado en piso laminado tipo madera, cableado y anclajes ocultos para las tres unidades, y totem de señalización con panel retroiluminado y frente en listones de madera a juego. Replicada en distintos puntos del terminal, pensada para resistir el tránsito constante de pasajeros sin perder terminación.',
    cover: '/images/portfolio/mobiliario/aeropuerto-el-dorado/aeropuerto-portada.jpg',
    gallery: [
      '/images/portfolio/mobiliario/aeropuerto-el-dorado/aeropuerto-portada.jpg',
      '/images/portfolio/mobiliario/aeropuerto-el-dorado/aeropuerto-01.jpg',
      '/images/portfolio/mobiliario/aeropuerto-el-dorado/aeropuerto-02.jpg',
      '/images/portfolio/mobiliario/aeropuerto-el-dorado/aeropuerto-03.jpg',
      '/images/portfolio/mobiliario/aeropuerto-el-dorado/aeropuerto-04.jpg',
      '/images/portfolio/mobiliario/aeropuerto-el-dorado/aeropuerto-05.jpg',
      '/images/portfolio/mobiliario/aeropuerto-el-dorado/aeropuerto-06.jpg',
      '/images/portfolio/mobiliario/aeropuerto-el-dorado/aeropuerto-07.jpg',
    ],
  },
  'nespresso-al-agua-patos': {
    title: 'Stand Nespresso × Al Agua Patos',
    client: 'Nespresso',
    category: 'Arquitectura Efímera',
    year: '2026',
    description: 'Stand efímero para la colaboración entre Nespresso y Al Agua Patos durante la Feria EVA. Módulo de madera con esquinas curvas y cubierta con logotipo retroiluminado en ambas fachadas, más cortinas enrollables perimetrales para cerrar el punto fuera de horario de feria. Interior con barra de servicio en madera y blanco, exhibidor vertical de cápsulas organizado por color y sabor con iluminación integrada, y zona de repostería a cargo de Al Agua Patos. Carpintería e impresión de gran formato para toda la señalética, con montaje pensado para lucir tan bien de día como iluminado de noche.',
    cover: '/images/portfolio/arq-efimera/nespresso-al-agua-patos/nespresso-portada.jpg',
    gallery: [
      '/images/portfolio/arq-efimera/nespresso-al-agua-patos/nespresso-portada.jpg',
      '/images/portfolio/arq-efimera/nespresso-al-agua-patos/nespresso-01.jpg',
      '/images/portfolio/arq-efimera/nespresso-al-agua-patos/nespresso-02.jpg',
      '/images/portfolio/arq-efimera/nespresso-al-agua-patos/nespresso-03.jpg',
      '/images/portfolio/arq-efimera/nespresso-al-agua-patos/nespresso-04.jpg',
      '/images/portfolio/arq-efimera/nespresso-al-agua-patos/nespresso-05.jpg',
      '/images/portfolio/arq-efimera/nespresso-al-agua-patos/nespresso-06.jpg',
    ],
  },
  'relojeria-falabella-unicentro': {
    title: 'Relojería Falabella Unicentro',
    client: 'Falabella',
    category: 'Arquitectura Comercial',
    year: '2026',
    description: 'Rediseño integral de la relojería Falabella en Unicentro: un recorrido de vitrinas iluminadas que convierte cada marca —Casio, Fossil, Tissot, Guess, Citizen— en una experiencia propia dentro del mismo pasillo. Islas y muros en metal negro con luz LED perimetral, paneles publicitarios retroiluminados que rotan con cada campaña, y acabados en mármol que elevan el punto de venta al nivel de una boutique. Cada vitrina se pensó para que el reloj sea la estrella: vidrio de alta transparencia, iluminación cenital de precisión y señalética que vende sin gritar.',
    cover: '/images/portfolio/arq-comercial/relojeria-falabella/relojeria-portada.jpg',
    gallery: [
      '/images/portfolio/arq-comercial/relojeria-falabella/relojeria-portada.jpg',
      '/images/portfolio/arq-comercial/relojeria-falabella/relojeria-01.jpg',
      '/images/portfolio/arq-comercial/relojeria-falabella/relojeria-02.jpg',
      '/images/portfolio/arq-comercial/relojeria-falabella/relojeria-03.jpg',
      '/images/portfolio/arq-comercial/relojeria-falabella/relojeria-04.jpg',
      '/images/portfolio/arq-comercial/relojeria-falabella/relojeria-05.jpg',
      '/images/portfolio/arq-comercial/relojeria-falabella/relojeria-06.jpg',
      '/images/portfolio/arq-comercial/relojeria-falabella/relojeria-07.jpg',
      '/images/portfolio/arq-comercial/relojeria-falabella/relojeria-08.jpg',
      '/images/portfolio/arq-comercial/relojeria-falabella/relojeria-09.jpg',
      '/images/portfolio/arq-comercial/relojeria-falabella/relojeria-10.jpg',
      '/images/portfolio/arq-comercial/relojeria-falabella/relojeria-11.jpg',
      '/images/portfolio/arq-comercial/relojeria-falabella/relojeria-12.jpg',
      '/images/portfolio/arq-comercial/relojeria-falabella/relojeria-13.jpg',
      '/images/portfolio/arq-comercial/relojeria-falabella/relojeria-14.jpg',
    ],
  },
  'falabella-colina': {
    title: 'Calzado Falabella Colina',
    client: 'Falabella',
    category: 'Arquitectura Comercial',
    year: '2026',
    description: 'Rediseño del departamento de calzado en Falabella Centro Colina: un recorrido de zonas por marca —Nike, Adidas Originals, Puma, Reebok, New Balance, Veja, Michael Kors, Dr. Martens, Aldo y más— unidas por un mismo lenguaje de mármol, metal negro y detalles en latón. Muros con cubículos retroiluminados que exhiben cada caja como pieza de colección, letreros suspendidos con follaje artificial sobre cada marca, y un sistema de mesas anidadas en mármol y metal que se reconfigura según la temporada y las promociones. Un piso de venta pensado para que cada marca tenga su propio momento sin romper la coherencia del espacio completo.',
    cover: '/images/portfolio/arq-comercial/falabella-colina/falabella-colina-portada.jpg',
    gallery: [
      '/images/portfolio/arq-comercial/falabella-colina/falabella-colina-portada.jpg',
      '/images/portfolio/arq-comercial/falabella-colina/falabella-colina-01.jpg',
      '/images/portfolio/arq-comercial/falabella-colina/falabella-colina-02.jpg',
      '/images/portfolio/arq-comercial/falabella-colina/falabella-colina-03.jpg',
      '/images/portfolio/arq-comercial/falabella-colina/falabella-colina-04.jpg',
      '/images/portfolio/arq-comercial/falabella-colina/falabella-colina-05.jpg',
      '/images/portfolio/arq-comercial/falabella-colina/falabella-colina-06.jpg',
      '/images/portfolio/arq-comercial/falabella-colina/falabella-colina-07.jpg',
      '/images/portfolio/arq-comercial/falabella-colina/falabella-colina-08.jpg',
      '/images/portfolio/arq-comercial/falabella-colina/falabella-colina-09.jpg',
      '/images/portfolio/arq-comercial/falabella-colina/falabella-colina-10.jpg',
      '/images/portfolio/arq-comercial/falabella-colina/falabella-colina-11.jpg',
      '/images/portfolio/arq-comercial/falabella-colina/falabella-colina-12.jpg',
      '/images/portfolio/arq-comercial/falabella-colina/falabella-colina-13.jpg',
      '/images/portfolio/arq-comercial/falabella-colina/falabella-colina-14.jpg',
      '/images/portfolio/arq-comercial/falabella-colina/falabella-colina-15.jpg',
      '/images/portfolio/arq-comercial/falabella-colina/falabella-colina-16.jpg',
      '/images/portfolio/arq-comercial/falabella-colina/falabella-colina-17.jpg',
      '/images/portfolio/arq-comercial/falabella-colina/falabella-colina-18.jpg',
      '/images/portfolio/arq-comercial/falabella-colina/falabella-colina-19.jpg',
      '/images/portfolio/arq-comercial/falabella-colina/falabella-colina-20.jpg',
    ],
  },
  'oficinas-bogota': {
    title: 'Oficinas Bogotá',
    client: 'Corporativo',
    category: 'Mobiliario',
    year: '2023',
    description: 'Mobiliario corporativo para oficinas en Bogotá: puestos de trabajo modulares en tablero enchapado en madera, paneles divisorios de color como elemento de identidad visual entre áreas y jardineras integradas que suavizan el ambiente industrial del espacio. Carpintería de alta calidad con acabados lacados y herrajes importados, fabricada e instalada a la medida del layout de la oficina.',
    cover: '/images/portfolio/mobiliario/img/01/OFI-BOGOTÁ-DES-1.png',
    gallery: [
      '/images/portfolio/mobiliario/img/01/OFI-BOGOTÁ-DES-1.png',
      '/images/portfolio/mobiliario/img/01/OFI-BOGOTÁ-DES-2.png',
      '/images/portfolio/mobiliario/img/01/OFI-BOGOTÁ-DES-3.png',
      '/images/portfolio/mobiliario/img/01/OFI-BOGOTÁ-DES-4.png',
      '/images/portfolio/mobiliario/img/01/OFI-BOGOTÁ-DES-5.png',
      '/images/portfolio/mobiliario/img/01/OFI-BOGOTÁ-DES-6.png',
      '/images/portfolio/mobiliario/img/01/OFI-BOGOTÁ-INT-1.png',
      '/images/portfolio/mobiliario/img/01/OFI-BOGOTÁ-INT-2.png',
    ],
  },
  'oficinas-barranquilla': {
    title: 'Oficinas Barranquilla',
    client: 'Corporativo',
    category: 'Mobiliario',
    year: '2021',
    description: 'Mobiliario corporativo para oficinas en Barranquilla: puestos de trabajo ergonómicos, muebles de archivo y áreas colaborativas fabricadas con materiales de primera calidad. Carpintería de precisión en cada puesto, pensada para maximizar el uso del espacio sin sacrificar comodidad ni estética del ambiente de trabajo.',
    cover: '/images/portfolio/mobiliario/img/02/DEST-4_OFI_-BARRANQUILLA.png',
    gallery: [
      '/images/portfolio/mobiliario/img/02/DEST-1_OFI_-BARRANQUILLA.png',
      '/images/portfolio/mobiliario/img/02/DEST-2_OFI_-BARRANQUILLA.png',
      '/images/portfolio/mobiliario/img/02/DEST-3_OFI_-BARRANQUILLA.png',
      '/images/portfolio/mobiliario/img/02/DEST-4_OFI_-BARRANQUILLA.png',
      '/images/portfolio/mobiliario/img/02/DEST-5_OFI_-BARRANQUILLA.png',
      '/images/portfolio/mobiliario/img/02/DEST-6_OFI_-BARRANQUILLA.png',
      '/images/portfolio/mobiliario/img/02/INT-2_OFI_-BARRANQUILLA.png',
      '/images/portfolio/mobiliario/img/02/INT-3_OFI_-BARRANQUILLA.png',
    ],
  },
  'mobiliario-hogar': {
    title: 'Mobiliario Hogar',
    client: 'Corporativo',
    category: 'Mobiliario',
    year: '2022',
    description: 'Proyecto integral de mobiliario para hogar, con diseño personalizado y fabricación en maderas nobles. Piezas únicas trabajadas por nuestro equipo de ebanistas, con acabados premium que combinan funcionalidad y estética de alto nivel para espacios residenciales exigentes.',
    cover: '/images/portfolio/mobiliario/img/03/mobiliario_3_DEST-1.png',
    gallery: [
      '/images/portfolio/mobiliario/img/03/mobiliario_3_DEST-1.png',
      '/images/portfolio/mobiliario/img/03/mobiliario_3_DEST-2.png',
      '/images/portfolio/mobiliario/img/03/mobiliario_3_DEST-3.png',
      '/images/portfolio/mobiliario/img/03/mobiliario_3_DEST-4.png',
      '/images/portfolio/mobiliario/img/03/mobiliario_3_DEST-5.png',
      '/images/portfolio/mobiliario/img/03/mobiliario_3_DEST-6.png',
      '/images/portfolio/mobiliario/img/03/mobiliario_3_INT-2.png',
      '/images/portfolio/mobiliario/img/03/mobiliario_3_INT-3.png',
    ],
  },
  'nestle-congreso': {
    title: 'Nestlé Congreso Pediatría',
    client: 'Nestlé',
    category: 'Publicidad',
    year: '2023',
    description: 'Stand para el Congreso Colombiano de Pediatría de Nestlé. Fabricación integral del espacio: estructura, carpintería, impresión de gran formato y señalización médica especializada. Un stand funcional pensado para la interacción con profesionales de la salud, cumpliendo los estándares visuales y de contenido que exige la marca en un entorno científico.',
    cover: '/images/portfolio/publicidad/img/01/evento-nestle_DEST-1.png',
    gallery: [
      '/images/portfolio/publicidad/img/01/evento-nestle_DEST-1.png',
      '/images/portfolio/publicidad/img/01/evento-nestle_DEST-2.png',
      '/images/portfolio/publicidad/img/01/evento-nestle_DEST-3.png',
      '/images/portfolio/publicidad/img/01/evento-nestle_DEST-4.png',
      '/images/portfolio/publicidad/img/01/evento-nestle_DEST-5.png',
      '/images/portfolio/publicidad/img/01/evento-nestle_DEST-6.png',
      '/images/portfolio/publicidad/img/01/evento-nestle_INT-2.png',
      '/images/portfolio/publicidad/img/01/evento-nestle_INT-3.png',
    ],
  },
  'nestle-nan': {
    title: 'Nestlé NAN',
    client: 'Nestlé',
    category: 'Publicidad',
    year: '2022',
    description: 'Stand ferial para la línea Nestlé NAN, con una estructura curva retroiluminada como elemento central y una pantalla integrada para contenido de marca. Acabados en superficies lacadas blancas, iluminación LED de acento y mobiliario a la medida para la atención de visitantes durante el evento. Impresión de gran formato y displays de punto de venta complementaron la presencia de marca en canal farmacéutico y supermercados.',
    cover: '/images/portfolio/publicidad/img/02/nestle_nan_DEST-5.png',
    gallery: [
      '/images/portfolio/publicidad/img/02/nestle_nan_DEST-1.png',
      '/images/portfolio/publicidad/img/02/nestle_nan_DEST-2.png',
      '/images/portfolio/publicidad/img/02/nestle_nan_DEST-3.png',
      '/images/portfolio/publicidad/img/02/nestle_nan_DEST-4.png',
      '/images/portfolio/publicidad/img/02/nestle_nan_DEST-5.png',
      '/images/portfolio/publicidad/img/02/nestle_nan_DEST-6.png',
      '/images/portfolio/publicidad/img/02/nestle_nan_INT-2.png',
      '/images/portfolio/publicidad/img/02/nestle_nan_INT-3.png',
    ],
  },
  'xbox-stands': {
    title: 'Xbox Stands',
    client: 'Microsoft',
    category: 'Publicidad',
    year: '2021',
    description: 'Stands de exhibición Xbox para centros comerciales a nivel nacional. Estructura metalmecánica modular con carpintería de precisión, soportes para pantallas integradas e impresión de gran formato con la identidad visual de la marca. Un desarrollo replicable, pensado para instalarse y desmontarse rápidamente entre distintos puntos del país.',
    cover: '/images/portfolio/publicidad/img/03/publi_xbox_DEST-1.png',
    gallery: [
      '/images/portfolio/publicidad/img/03/publi_xbox_DEST-1.png',
      '/images/portfolio/publicidad/img/03/publi_xbox_DEST-2.png',
      '/images/portfolio/publicidad/img/03/publi_xbox_DEST-3.png',
      '/images/portfolio/publicidad/img/03/publi_xbox_DEST-4.png',
      '/images/portfolio/publicidad/img/03/publi_xbox_DEST-5.png',
      '/images/portfolio/publicidad/img/03/publi_xbox_DEST-6.png',
      '/images/portfolio/publicidad/img/03/publi_xbox_INT-2.png',
      '/images/portfolio/publicidad/img/03/publi_xbox_INT-3.png',
    ],
  },
  'canasta-panaderia': {
    title: 'Canasta Panadería',
    client: 'Canasta',
    category: 'Creativo',
    year: '2023',
    description: 'Carrito móvil de venta para Canasta Panadería: estructura en carpintería con acabado en madera natural, toldo publicitario a la medida, canastillas en fibra natural para exhibir el pan y punto de cobro integrado. Un desarrollo pensado para activaciones itinerantes, donde el mueble mismo comunica el concepto artesanal de la marca.',
    cover: '/images/portfolio/creativo/img/03/canasta_DEST-6.png',
    gallery: [
      '/images/portfolio/creativo/img/03/canasta_DEST-1.png',
      '/images/portfolio/creativo/img/03/canasta_DEST-2.png',
      '/images/portfolio/creativo/img/03/canasta_DEST-3.png',
      '/images/portfolio/creativo/img/03/canasta_DEST-4.png',
      '/images/portfolio/creativo/img/03/canasta_DEST-5.png',
      '/images/portfolio/creativo/img/03/canasta_DEST-6.png',
      '/images/portfolio/creativo/img/03/canasta_INT-2.png',
      '/images/portfolio/creativo/img/03/canasta_INT-3.png',
    ],
  },
  'mundo-playa': {
    title: 'Mundo Playa Olímpica',
    client: 'Olímpica',
    category: 'Creativo',
    year: '2022',
    description: 'Intervención creativa Mundo Playa para Olímpica: diseño conceptual y fabricación de elementos decorativos estacionales, señalización temática y displays de producto para la temporada de playa. Un desarrollo que combina carpintería, impresión de gran formato y montaje en sitio para transformar la experiencia de compra durante la campaña.',
    cover: '/images/portfolio/creativo/img/01/DEST-5MUNDO-PLAYA.png',
    gallery: [
      '/images/portfolio/creativo/img/01/DEST-1MUNDO-PLAYA.png',
      '/images/portfolio/creativo/img/01/DEST-2MUNDO-PLAYA.png',
      '/images/portfolio/creativo/img/01/DEST-3MUNDO-PLAYA.png',
      '/images/portfolio/creativo/img/01/DEST-4MUNDO-PLAYA.png',
      '/images/portfolio/creativo/img/01/DEST-5MUNDO-PLAYA.png',
      '/images/portfolio/creativo/img/01/DEST-6MUNDO-PLAYA.png',
      '/images/portfolio/creativo/img/01/INT-2MUNDO-PLAYA.png',
      '/images/portfolio/creativo/img/01/INT-3MUNDO-PLAYA.png',
    ],
  },
  'mascotas-purina': {
    title: 'Mascotas Purina',
    client: 'Purina',
    category: 'Creativo',
    year: '2020',
    description: 'Activación creativa para Purina en tiendas especializadas de mascotas. Diseño y fabricación de displays temáticos, señalización a la medida y material POP que comunica el vínculo con las mascotas directamente en el punto de venta. Un desarrollo que combina carpintería, impresión y detalles de acabado pensados para un público muy identificado con la marca.',
    cover: '/images/portfolio/creativo/img/02/mascotas_DEST-1.png',
    gallery: [
      '/images/portfolio/creativo/img/02/mascotas_DEST-1.png',
      '/images/portfolio/creativo/img/02/mascotas_DEST-2.png',
      '/images/portfolio/creativo/img/02/mascotas_DEST-3.png',
      '/images/portfolio/creativo/img/02/mascotas_DEST-4.png',
      '/images/portfolio/creativo/img/02/mascotas_DEST-5.png',
      '/images/portfolio/creativo/img/02/mascotas_DEST-6.png',
      '/images/portfolio/creativo/img/02/mascotas_INT-2.png',
      '/images/portfolio/creativo/img/02/mascotas_INT-3.png',
    ],
  },
}

export default function ProjectDetailPage() {
  const params = useParams()
  const slug = params.slug as string
  const project = projectsData[slug]
  const [lightboxImg, setLightboxImg] = useState<string | null>(null)

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxImg(null)
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [])

  if (!project) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', paddingTop: '76px' }}>
        <TextReveal as="h1" style={{ fontFamily: 'var(--font-barlow)', fontWeight: 800, fontSize: '48px', color: 'var(--text)', marginBottom: '16px', display: 'block' }}>Proyecto no encontrado</TextReveal>
        <Link href="/proyectos" style={{ color: 'var(--accent)', fontWeight: 600 }}>← Volver a proyectos</Link>
      </div>
    )
  }

  const logoFile = clientLogoMap[project.client]

  const relatedProjects = Object.entries(projectsData)
    .filter(([s, proj]) => s !== slug && proj.category === project.category)
    .slice(0, 2)
    .map(([s, proj]) => ({ slug: s, ...proj }))

  return (
    <>
      {/* Intro */}
      <section style={{ paddingTop: '180px', paddingBottom: '80px', background: 'var(--white)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '3px', background: 'var(--accent)' }} />
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'linear-gradient(rgba(0,0,0,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.04) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }} />
        <div className="container" style={{ position: 'relative' }}>
          <Reveal>
            <Link href="/proyectos" style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              color: 'var(--text-muted)', textDecoration: 'none',
              fontSize: '13px', fontWeight: 600, letterSpacing: '0.06em',
              marginBottom: '28px',
            }}>
              ← Todos los proyectos
            </Link>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
              <div style={{ width: '32px', height: '2px', background: 'var(--accent)' }} />
              <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--accent)' }}>{project.category}</span>
              <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>· {project.year}</span>
            </div>
            <TextReveal as="h1" style={{
              fontFamily: 'var(--font-barlow), sans-serif',
              fontWeight: 800,
              fontSize: 'clamp(40px, 7vw, 88px)',
              lineHeight: 0.95,
              letterSpacing: '-0.02em',
              textTransform: 'uppercase',
              color: 'var(--text)',
              display: 'block',
            }}>{project.title}</TextReveal>
          </Reveal>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '60px', marginTop: '56px', alignItems: 'start' }} className="grid-2">
            <Reveal delay={0.1}>
              <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '12px' }}>Cliente</p>
              {logoFile ? (
                <div style={{ position: 'relative', width: '160px', height: '50px' }}>
                  <Image
                    src={`/images/logo/${logoFile}`}
                    alt={project.client}
                    fill
                    style={{ objectFit: 'contain', objectPosition: 'left center' }}
                  />
                </div>
              ) : (
                <p style={{ fontSize: '20px', fontWeight: 700, color: 'var(--text)' }}>{project.client}</p>
              )}
            </Reveal>
            <Reveal delay={0.2} direction="left">
              <TextReveal as="p" style={{ fontSize: '18px', lineHeight: 1.9, color: 'var(--text-muted)', display: 'block' }}>{project.description}</TextReveal>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Imagen principal — sin texto encima, protagonismo total a la fotografía */}
      <section style={{ padding: '0 0 80px', background: 'var(--white)' }}>
        <div className="container">
          <Reveal>
            <div style={{ position: 'relative', height: '78vh', minHeight: '440px', overflow: 'hidden', borderRadius: '14px' }}>
              <Image
                src={project.cover}
                alt={project.title}
                fill
                style={{ objectFit: 'cover' }}
                priority
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Galería */}
      <section style={{ padding: '0 0 120px', background: 'var(--white)' }}>
        <div className="container">
          <Reveal>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '48px' }}>
              <div style={{ width: '32px', height: '2px', background: 'var(--accent)' }} />
              <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--accent)' }}>Galería del proyecto</span>
            </div>
          </Reveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '6px', background: 'var(--border)' }}>
            {project.gallery.map((img, i) => (
              <Reveal key={i} delay={i * 0.04}>
                <div
                  onClick={() => setLightboxImg(img)}
                  className="gallery-tile"
                  style={{
                    position: 'relative',
                    height: '340px',
                    overflow: 'hidden',
                    cursor: 'zoom-in',
                    background: '#e8e6e2',
                    borderRadius: '12px',
                  }}
                >
                  <Image
                    src={img}
                    alt={`${project.title} — imagen ${i + 1}`}
                    fill
                    style={{ objectFit: 'cover' }}
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="proj-img"
                  />
                  <div style={{
                    position: 'absolute', inset: 0,
                    background: 'rgba(0,0,0,0)',
                    transition: 'background 0.3s',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }} className="gallery-overlay">
                    <span style={{ color: '#fff', fontSize: '28px', opacity: 0, transition: 'opacity 0.3s' }} className="zoom-icon">+</span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Proyectos relacionados */}
      {relatedProjects.length > 0 && (
        <section style={{ padding: '100px 0', background: 'var(--bg)', borderTop: '1px solid var(--border)' }}>
          <div className="container">
            <Reveal>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <div style={{ width: '32px', height: '2px', background: 'var(--accent)' }} />
                <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--accent)' }}>Sigue explorando</span>
              </div>
              <TextReveal as="h2" style={{
                fontFamily: 'var(--font-barlow)', fontWeight: 800,
                fontSize: 'clamp(28px, 4vw, 48px)', lineHeight: 1,
                letterSpacing: '-0.02em', textTransform: 'uppercase', color: 'var(--text)',
                marginBottom: '48px', display: 'block',
              }}>Proyectos<br /><span style={{ color: 'var(--accent)' }}>relacionados.</span></TextReveal>
            </Reveal>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '4px', background: 'var(--border)' }}>
              {relatedProjects.map((rp, i) => (
                <Reveal key={rp.slug} delay={i * 0.08}>
                  <Link href={`/proyectos/${rp.slug}`} style={{ textDecoration: 'none', display: 'block' }}>
                    <div style={{ position: 'relative', aspectRatio: '4/3', overflow: 'hidden', background: '#e8e6e2' }}>
                      <Image src={rp.cover} alt={rp.title} fill style={{ objectFit: 'cover', transition: 'transform 0.5s ease' }} className="proj-img" />
                      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 60%)', zIndex: 1 }} />
                      <div style={{ position: 'absolute', bottom: '24px', left: '24px', zIndex: 2 }}>
                        <p style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '6px' }}>{rp.category}</p>
                        <h3 style={{ fontFamily: 'var(--font-barlow)', fontWeight: 700, fontSize: '17px', textTransform: 'uppercase', color: '#fff', lineHeight: 1.2 }}>{rp.title}</h3>
                      </div>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA — única invitación a iniciar un proyecto similar */}
      <section style={{ padding: '100px 0', background: 'var(--accent)', position: 'relative', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'linear-gradient(rgba(0,0,0,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.12) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }} />
        <div className="container" style={{ position: 'relative', textAlign: 'center' }}>
          <Reveal>
            <TextReveal as="h2" style={{
              fontFamily: 'var(--font-barlow)', fontWeight: 800,
              fontSize: 'clamp(32px, 5vw, 72px)', lineHeight: 0.95,
              letterSpacing: '-0.02em', textTransform: 'uppercase',
              color: '#fff', marginBottom: '24px', display: 'block',
            }}>
              ¿Querés algo similar?<br />Hablemos.
            </TextReveal>
            <TextReveal as="p" delay={0.15} style={{ fontSize: '17px', color: 'rgba(255,255,255,0.85)', marginBottom: '40px', maxWidth: '440px', margin: '0 auto 40px', display: 'block' }}>
              Cuéntanos tu proyecto. Fabricamos cualquier concepto con la más alta calidad industrial.
            </TextReveal>
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/contacto" style={{
                textDecoration: 'none',
                display: 'inline-flex', alignItems: 'center', gap: '10px',
                background: '#fff', color: 'var(--red)',
                padding: '18px 48px', fontSize: '14px', fontWeight: 800,
                letterSpacing: '0.06em', textTransform: 'uppercase',
              }}>
                Iniciar Proyecto →
              </Link>
              <Link href="/proyectos" style={{
                textDecoration: 'none',
                display: 'inline-flex', alignItems: 'center', gap: '10px',
                background: 'transparent', color: '#fff', border: '1px solid rgba(255,255,255,0.4)',
                padding: '18px 48px', fontSize: '14px', fontWeight: 800,
                letterSpacing: '0.06em', textTransform: 'uppercase',
              }}>
                Ver más proyectos
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxImg(null)}
            style={{
              position: 'fixed', inset: 0, zIndex: 200,
              background: 'rgba(0,0,0,0.95)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'zoom-out', padding: '32px',
            }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              style={{ position: 'relative', maxWidth: '90vw', maxHeight: '90vh', width: '100%', height: '100%' }}
              onClick={e => e.stopPropagation()}
            >
              <Image
                src={lightboxImg}
                alt="Vista ampliada"
                fill
                style={{ objectFit: 'contain' }}
              />
            </motion.div>
            <button
              onClick={() => setLightboxImg(null)}
              style={{
                position: 'absolute', top: '24px', right: '24px',
                background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)',
                color: '#fff', width: '44px', height: '44px', cursor: 'pointer',
                fontSize: '20px', borderRadius: '999px',
              }}
            >✕</button>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        .gallery-overlay:hover {
          background: rgba(0,0,0,0.35) !important;
        }
        .gallery-overlay:hover .zoom-icon {
          opacity: 1 !important;
        }
        .gallery-tile:hover {
          grid-column: span 2;
          z-index: 2;
        }
      `}</style>
    </>
  )
}
