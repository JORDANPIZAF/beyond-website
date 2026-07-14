'use client'

import { useContext, useRef, useEffect, useState } from 'react'
import { ComposableMap, Geographies, Geography, MapContext } from 'react-simple-maps'
import { motion, useInView } from 'framer-motion'

const GEO_URL = '/data/world-110m.json'

const AMERICAS = new Set([
  840, 124, 484,
  320, 340, 222, 558, 188, 591, 84,
  170, 862, 218, 604, 76, 68, 600, 858, 32, 152, 328, 740,
  192, 388, 332, 214,
])

const BOGOTA: [number, number] = [-74.07, 4.71]

type City = { coords: [number, number]; label: string; mobileHide?: boolean }

const INTERNATIONAL: City[] = [
  { coords: [-80.19, 25.77], label: 'Miami' },
  { coords: [-95.37, 29.76], label: 'Houston', mobileHide: true },
  { coords: [-74.01, 40.71], label: 'Nueva York', mobileHide: true },
  { coords: [-79.52, 8.99], label: 'Panamá' },
  { coords: [-78.47, -0.18], label: 'Quito', mobileHide: true },
  { coords: [-77.04, -12.05], label: 'Lima', mobileHide: true },
  { coords: [-70.65, -33.46], label: 'Santiago', mobileHide: true },
  { coords: [-99.13, 19.43], label: 'Ciudad de México', mobileHide: true },
]

const NATIONAL: City[] = [
  { coords: [-75.56, 6.25], label: 'Medellín' },
  { coords: [-76.52, 3.44], label: 'Cali' },
  { coords: [-74.80, 10.96], label: 'Barranquilla' },
  { coords: [-75.48, 10.39], label: 'Cartagena' },
]

function getArcPath(from: [number, number], to: [number, number], curvature = 0.25): string {
  const [x1, y1] = from
  const [x2, y2] = to
  const dist = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2)
  const mx = (x1 + x2) / 2
  const my = (y1 + y2) / 2
  return `M ${x1} ${y1} Q ${mx} ${my - dist * curvature} ${x2} ${y2}`
}

type RouteProps = {
  from: [number, number]
  to: [number, number]
  delay: number
  isNational: boolean
}

function Route({ from, to, delay, isNational }: RouteProps) {
  const pathRef = useRef<SVGPathElement>(null)
  const [pathLen, setPathLen] = useState(500)
  const d = getArcPath(from, to, isNational ? 0.4 : 0.22)

  useEffect(() => {
    if (pathRef.current) setPathLen(pathRef.current.getTotalLength())
  }, [d])

  const glowSize = isNational ? 5 : 8
  const glowDur = isNational ? 1.2 : 2.8
  const glowDelay = delay + (isNational ? 1.0 : 2.2)
  const glowRepeatDelay = isNational ? 2 : 3

  return (
    <g>
      <motion.path
        ref={pathRef}
        d={d}
        stroke={isNational ? 'rgba(224,41,7,0.5)' : 'rgba(224,41,7,0.22)'}
        strokeWidth={isNational ? 1.2 : 0.8}
        fill="none"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: isNational ? 1 : 1.8, delay, ease: [0.16, 1, 0.3, 1] as any }}
      />
      <motion.path
        d={d}
        stroke={isNational ? '#E02907' : 'rgba(224,41,7,0.85)'}
        strokeWidth={isNational ? 2.5 : 2}
        strokeLinecap="round"
        fill="none"
        style={{ strokeDasharray: `${glowSize} ${pathLen + 20}` }}
        initial={{ strokeDashoffset: glowSize }}
        animate={{ strokeDashoffset: -(pathLen + glowSize) }}
        transition={{
          duration: glowDur,
          delay: glowDelay,
          repeat: Infinity,
          ease: 'linear',
          repeatDelay: glowRepeatDelay,
        }}
      />
    </g>
  )
}

type CityDotProps = {
  xy: [number, number]
  delay: number
  isHub?: boolean
}

function CityDot({ xy, delay, isHub }: CityDotProps) {
  const [x, y] = xy
  return (
    <motion.g
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.4, type: 'spring', stiffness: 200 }}
    >
      {(isHub ? [0, 1, 2] : [0]).map(i => (
        <motion.circle
          key={i}
          cx={x} cy={y}
          r={isHub ? 7 : 4}
          fill="none"
          stroke={isHub ? 'rgba(224,41,7,0.55)' : 'rgba(224,41,7,0.4)'}
          strokeWidth={isHub ? 1.5 : 1}
          initial={{ scale: 1, opacity: 0.7 }}
          animate={{ scale: isHub ? 3.5 : 2.5, opacity: 0 }}
          transition={{
            duration: isHub ? 2.8 : 2.2,
            repeat: Infinity,
            delay: i * (isHub ? 0.9 : 0.7),
            ease: 'easeOut',
          }}
        />
      ))}
      <circle cx={x} cy={y} r={isHub ? 5.5 : 3} fill="#E02907" />
      {isHub && <circle cx={x} cy={y} r={2.5} fill="#fff" />}
    </motion.g>
  )
}

type MapContentProps = {
  isMobile: boolean
}

function MapContent({ isMobile }: MapContentProps) {
  const ctx = useContext(MapContext) as any
  const proj = ctx?.projection
  if (!proj) return null

  const bogotaXY = proj(BOGOTA) as [number, number] | null
  if (!bogotaXY) return null

  const intlRoutes = isMobile ? INTERNATIONAL.filter(c => !c.mobileHide) : INTERNATIONAL

  return (
    <g>
      {intlRoutes.map((city, i) => {
        const toXY = proj(city.coords) as [number, number] | null
        if (!toXY) return null
        return (
          <Route key={city.label} from={bogotaXY} to={toXY} delay={0.4 + i * 0.18} isNational={false} />
        )
      })}
      {NATIONAL.map((city, i) => {
        const toXY = proj(city.coords) as [number, number] | null
        if (!toXY) return null
        return (
          <Route key={city.label} from={bogotaXY} to={toXY} delay={0.1 + i * 0.12} isNational />
        )
      })}
      {intlRoutes.map((city, i) => {
        const xy = proj(city.coords) as [number, number] | null
        if (!xy) return null
        return <CityDot key={city.label} xy={xy} delay={0.4 + i * 0.18 + 1.8} />
      })}
      {NATIONAL.map((city, i) => {
        const xy = proj(city.coords) as [number, number] | null
        if (!xy) return null
        return <CityDot key={city.label} xy={xy} delay={0.1 + i * 0.12 + 0.8} />
      })}
      <CityDot xy={bogotaXY} delay={0.1} isHub />
    </g>
  )
}

export default function FooterMap() {
  const containerRef = useRef<HTMLDivElement>(null)
  const inView = useInView(containerRef, { once: true, margin: '-80px' })
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  const mapWidth = 900
  const mapHeight = 700
  const mapScale = 520
  const mapCenter: [number, number] = [-82, 6]

  return (
    <div ref={containerRef} style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
      {inView && (
        <ComposableMap
          width={mapWidth}
          height={mapHeight}
          projection="geoMercator"
          projectionConfig={{ scale: mapScale, center: mapCenter }}
          style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}
        >
          <Geographies geography={GEO_URL}>
            {({ geographies }: { geographies: any[] }) =>
              geographies
                .filter((geo: any) => AMERICAS.has(parseInt(geo.id)))
                .map((geo: any) => (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    style={{
                      default: { fill: 'rgba(0,0,0,0.04)', stroke: 'rgba(0,0,0,0.09)', strokeWidth: 0.5, outline: 'none' },
                      hover: { fill: 'rgba(0,0,0,0.04)', stroke: 'rgba(0,0,0,0.09)', strokeWidth: 0.5, outline: 'none' },
                      pressed: { fill: 'rgba(0,0,0,0.04)', stroke: 'rgba(0,0,0,0.09)', strokeWidth: 0.5, outline: 'none' },
                    }}
                  />
                ))
            }
          </Geographies>

          <MapContent isMobile={isMobile} />
        </ComposableMap>
      )}
    </div>
  )
}
