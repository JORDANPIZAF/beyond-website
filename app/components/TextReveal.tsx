'use client'

import React, { useRef, ReactNode, CSSProperties, ElementType } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'

type Token = { kind: 'word'; text: string; style?: CSSProperties } | { kind: 'br' }

function tokenize(children: ReactNode, inheritedStyle?: CSSProperties): Token[] {
  const tokens: Token[] = []
  React.Children.forEach(children, (child) => {
    if (typeof child === 'string') {
      child.split(' ').filter(Boolean).forEach((w) => tokens.push({ kind: 'word', text: w, style: inheritedStyle }))
    } else if (typeof child === 'number') {
      tokens.push({ kind: 'word', text: String(child), style: inheritedStyle })
    } else if (React.isValidElement(child)) {
      if (child.type === 'br') {
        tokens.push({ kind: 'br' })
        return
      }
      const props = child.props as { style?: CSSProperties; children?: ReactNode }
      // Fragments (and any element whose children isn't a plain string) are unwrapped
      // recursively — this is what lets `.split('\n').map(...)` + <Fragment> patterns
      // (used for multi-line translation strings) still surface their words.
      const style = props.style ?? inheritedStyle
      tokens.push(...tokenize(props.children, style))
    }
  })
  return tokens
}

type TagName = 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div'

interface TextRevealProps {
  children: ReactNode
  as?: TagName
  delay?: number
  stagger?: number
  className?: string
  style?: CSSProperties
}

export default function TextReveal({ children, as: Tag = 'span', delay = 0, stagger = 0.045, className, style }: TextRevealProps) {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const prefersReduced = useReducedMotion()
  const tokens = tokenize(children)
  let wordIndex = -1

  const content = tokens.map((tok, i) => {
    if (tok.kind === 'br') return <br key={i} />
    wordIndex += 1
    const isLast = i === tokens.length - 1 || tokens[i + 1]?.kind === 'br'
    return (
      <React.Fragment key={i}>
        <span style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'top' }}>
          <motion.span
            style={{ display: 'inline-block', ...tok.style }}
            initial={prefersReduced ? false : { y: '110%' }}
            animate={!prefersReduced && inView ? { y: '0%' } : undefined}
            transition={{ duration: 0.7, delay: delay + wordIndex * stagger, ease: [0.22, 1, 0.36, 1] }}
          >
            {tok.text}
          </motion.span>
        </span>
        {isLast ? null : ' '}
      </React.Fragment>
    )
  })

  return React.createElement(Tag, { ref, className, style }, content)
}
