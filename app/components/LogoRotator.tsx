'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

const TICK_MS = 950
const COLUMNS = 4
const ROWS = 2
const TILE_COUNT = COLUMNS * ROWS

// Chess-style sweep: top-col0, bottom-col0, top-col1, bottom-col1, ... so the
// change visibly hops top/bottom as it moves across columns, instead of the
// whole top row updating before the bottom row ever does.
const SWEEP_ORDER = Array.from({ length: COLUMNS }, (_, col) => [col, col + COLUMNS]).flat()

interface LogoItem {
  name: string
  file: string
}

interface TileProps {
  bucket: LogoItem[]
  currentIndex: number
}

function LogoTile({ bucket, currentIndex }: TileProps) {
  const logo = bucket[currentIndex]

  return (
    <div style={{ position: 'relative', height: '96px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <AnimatePresence mode="sync">
        <motion.div
          key={logo.name}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <Image
            src={`/images/logo/${logo.file}`}
            alt={logo.name}
            width={160}
            height={80}
            style={{ objectFit: 'contain', height: '76px', width: 'auto', maxWidth: '88%', filter: 'grayscale(1)', opacity: 0.5, transition: 'opacity 0.2s' }}
            className="brand-item"
          />
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

interface LogoRotatorProps {
  logos: LogoItem[]
}

export default function LogoRotator({ logos }: LogoRotatorProps) {
  const buckets: LogoItem[][] = Array.from({ length: TILE_COUNT }, () => [])
  logos.forEach((logo, i) => buckets[i % TILE_COUNT].push(logo))

  const [indices, setIndices] = useState<number[]>(() => Array(TILE_COUNT).fill(0))
  const [sweepTick, setSweepTick] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setSweepTick((t) => t + 1)
    }, TICK_MS)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    const position = SWEEP_ORDER[sweepTick % TILE_COUNT]
    const bucketLength = buckets[position]?.length ?? 0
    if (bucketLength <= 1) return
    setIndices((prev) => {
      const next = [...prev]
      next[position] = (next[position] + 1) % bucketLength
      return next
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sweepTick])

  return (
    <div style={{ display: 'grid', gridTemplateColumns: `repeat(${COLUMNS}, 1fr)`, gap: '8px' }}>
      {buckets.map((bucket, i) => (
        bucket.length > 0 && <LogoTile key={i} bucket={bucket} currentIndex={indices[i]} />
      ))}
    </div>
  )
}
