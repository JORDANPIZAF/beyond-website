'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import type { LucideIcon } from 'lucide-react'

interface ProcessItem {
  title: string
  desc: string
}

interface ProcessRotatorProps {
  items: ProcessItem[]
  icons: LucideIcon[]
  interval?: number
}

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number]

export default function ProcessRotator({ items, icons, interval = 4200 }: ProcessRotatorProps) {
  const N = items.length
  // `tick` is the rotation offset: every item's slot is (originalIndex + tick) % N.
  // Slot 0 is the big/featured spot, slots 1..N-1 are the small grid in fixed
  // visual order. Advancing tick by 1 moves every item exactly one slot forward —
  // a steady clockwise conveyor, never a random reshuffle.
  const [tick, setTick] = useState(0)
  const prefersReduced = useReducedMotion()

  useEffect(() => {
    if (prefersReduced) return
    const id = setInterval(() => {
      setTick((t) => (t + 1) % N)
    }, interval)
    return () => clearInterval(id)
  }, [N, interval, prefersReduced])

  const order = Array.from({ length: N }, (_, slot) => (slot + tick) % N)
  const activeIndex = order[0]
  const smallOrder = order.slice(1)
  const BigIcon = icons[activeIndex]

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', alignItems: 'stretch' }} className="grid-2">
      {/* Big — featured item */}
      <div style={{ position: 'relative', minHeight: '340px' }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, x: -18 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 18 }}
            transition={{ duration: 0.55, ease }}
            style={{ display: 'flex', flexDirection: 'column' }}
          >
            <div style={{
              width: '72px', height: '72px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              marginBottom: '28px',
            }}>
              <BigIcon size={44} strokeWidth={1.4} color="var(--accent)" />
            </div>
            <h3 style={{
              fontFamily: 'var(--font-barlow), sans-serif',
              fontWeight: 800,
              fontSize: 'clamp(24px, 2.6vw, 32px)',
              textTransform: 'uppercase',
              letterSpacing: '-0.01em',
              color: 'var(--text)',
              marginBottom: '16px',
            }}>{items[activeIndex].title}</h3>
            <p style={{ fontSize: '16px', lineHeight: 1.8, color: 'var(--text-muted)', maxWidth: '420px' }}>
              {items[activeIndex].desc}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Small grid — the rest, rotating in and out */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gridAutoRows: 'min-content',
        gap: '4px 28px',
        alignContent: 'start',
      }}>
        <AnimatePresence initial={false}>
          {smallOrder.map((i) => {
            const Icon = icons[i]
            return (
              <motion.button
                key={items[i].title}
                layout
                onClick={() => setTick(i)}
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.45, ease }}
                style={{
                  display: 'flex', alignItems: 'center', gap: '14px',
                  padding: '18px 8px',
                  background: 'transparent',
                  border: 'none',
                  borderTop: '1px solid var(--border)',
                  cursor: 'pointer',
                  textAlign: 'left',
                  width: '100%',
                }}
              >
                <Icon size={22} strokeWidth={1.6} color="var(--accent)" style={{ flexShrink: 0 }} />
                <span style={{
                  fontFamily: 'var(--font-barlow), sans-serif',
                  fontWeight: 700,
                  fontSize: '13px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.03em',
                  color: 'var(--text-muted)',
                }}>{items[i].title}</span>
              </motion.button>
            )
          })}
        </AnimatePresence>
      </div>
    </div>
  )
}
