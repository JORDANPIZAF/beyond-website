'use client'

import { useEffect, useRef, useState, CSSProperties } from 'react'
import { useInView, useReducedMotion } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext'

interface ParsedValue {
  target: number
  prefix: string
  suffix: string
}

function parseValue(value: string): ParsedValue | null {
  const match = value.match(/[\d.,]+/)
  if (!match || match.index === undefined) return null
  const digits = match[0].replace(/[^\d]/g, '')
  if (!digits) return null
  return {
    target: parseInt(digits, 10),
    prefix: value.slice(0, match.index),
    suffix: value.slice(match.index + match[0].length),
  }
}

interface CountUpProps {
  value: string
  duration?: number
  style?: CSSProperties
  className?: string
}

export default function CountUp({ value, duration = 1600, style, className }: CountUpProps) {
  const { lang } = useLanguage()
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const prefersReduced = useReducedMotion()
  const parsed = parseValue(value)

  const [display, setDisplay] = useState(() => (parsed ? `${parsed.prefix}0${parsed.suffix}` : value))

  useEffect(() => {
    if (!parsed) { setDisplay(value); return }
    if (!inView || prefersReduced) { setDisplay(value); return }

    const formatter = new Intl.NumberFormat(lang === 'es' ? 'es-CO' : 'en-US')
    const start = performance.now()
    let frame: number

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = Math.round(parsed.target * eased)
      setDisplay(`${parsed.prefix}${formatter.format(current)}${parsed.suffix}`)
      if (progress < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, value, lang, duration, prefersReduced])

  return (
    <span ref={ref} style={style} className={className}>
      {display}
    </span>
  )
}
