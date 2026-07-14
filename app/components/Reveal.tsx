'use client'

import { motion, useInView, useReducedMotion } from 'framer-motion'
import { useRef, useState, useEffect, ReactNode, CSSProperties } from 'react'

interface Props {
  children: ReactNode
  delay?: number
  direction?: 'up' | 'left' | 'right' | 'none'
  className?: string
  style?: CSSProperties
}

export default function Reveal({ children, delay = 0, direction = 'up', className, style }: Props) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const prefersReduced = useReducedMotion()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  const variants = prefersReduced
    ? { hidden: { opacity: 1 }, show: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y: direction === 'up' ? 32 : 0, x: direction === 'left' ? -32 : direction === 'right' ? 32 : 0 },
        show: { opacity: 1, y: 0, x: 0 },
      }

  const transition = prefersReduced
    ? { duration: 0 }
    : { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }

  return (
    <motion.div ref={ref} variants={variants} initial="hidden"
      animate={mounted && inView ? 'show' : 'hidden'}
      transition={transition}
      className={className} style={style}
      suppressHydrationWarning>
      {children}
    </motion.div>
  )
}
