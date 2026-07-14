'use client'

import { useRef, ReactNode } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

interface Props {
  children: ReactNode
  scrollHeight?: string
  index: number
  isLast?: boolean
}

export default function ScrollCard({
  children,
  scrollHeight = '260vh',
  index,
  isLast = false,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  const scale = useTransform(scrollYProgress, [0.5, 1], [1, isLast ? 1 : 0.88])
  const borderRadius = useTransform(scrollYProgress, [0.5, 1], ['0px', isLast ? '0px' : '16px'])
  const overlayOpacity = useTransform(scrollYProgress, [0.5, 1], [0, isLast ? 0 : 0.44])

  return (
    <div
      ref={containerRef}
      style={{
        height: scrollHeight,
        position: 'relative',
        marginTop: '-100vh',
      }}
    >
      <motion.div
        style={{
          position: 'sticky',
          top: 0,
          height: '100dvh',
          width: '100%',
          overflow: 'hidden',
          zIndex: index,
          scale,
          borderRadius,
          transformOrigin: 'top center',
          willChange: 'transform',
        }}
      >
        {children}

        <motion.div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            background: '#111110',
            opacity: overlayOpacity,
            pointerEvents: 'none',
            zIndex: 20,
          }}
        />

        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: 0, left: 0, right: 0,
            height: '72px',
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.14), transparent)',
            pointerEvents: 'none',
            zIndex: 1,
          }}
        />
      </motion.div>
    </div>
  )
}
