'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import type { GuestInfo } from '@/lib/guests'
import { guestDisplayName, guestSalutation, guestBodyText } from '@/lib/guests'

interface InvitationCardProps {
  guests: GuestInfo
}

export default function InvitationCard({ guests }: InvitationCardProps) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const salutation = guestSalutation(guests)
  const bodyText   = guestBodyText(guests)
  const displayName = guestDisplayName(guests)

  return (
    <section className="bg-champagne py-20 px-4">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 60 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9, ease: 'easeOut' }}
        className="max-w-lg mx-auto"
      >
        {/* Envelope flap */}
        <div className="flex justify-center mb-[-1px] relative z-10">
          <svg width="300" height="40" viewBox="0 0 300 40" className="opacity-60">
            <path d="M0 40 L150 0 L300 40 Z" fill="#FDFcf8" stroke="#efeae0" strokeWidth="1" />
          </svg>
        </div>

        {/* Card */}
        <div
          className="bg-white rounded-2xl shadow-card-hover px-8 py-12 sm:px-12 sm:py-16 text-center relative"
          style={{ border: '1px solid #efeae0' }}
        >
          {/* Corner ornaments */}
          {(['tl','tr','bl','br'] as const).map(corner => (
            <div
              key={corner}
              className="absolute w-8 h-8 opacity-30"
              style={{
                top: corner.startsWith('t') ? 16 : 'auto',
                bottom: corner.startsWith('b') ? 16 : 'auto',
                left: corner.endsWith('l') ? 16 : 'auto',
                right: corner.endsWith('r') ? 16 : 'auto',
                transform: `scale(${corner.endsWith('r') ? -1 : 1}, ${corner.startsWith('b') ? -1 : 1})`,
              }}
            >
              <svg viewBox="0 0 32 32" fill="none">
                <path d="M2 30 Q2 2 30 2" stroke="#1b2a4a" strokeWidth="1.5" fill="none" />
                <circle cx="8" cy="8" r="2" fill="#1b2a4a" />
              </svg>
            </div>
          ))}

          {/* Top floral */}
          <div className="flex justify-center mb-6 opacity-40">
            <svg width="120" height="30" viewBox="0 0 120 30">
              <path d="M60 15 Q50 5 40 15 Q50 25 60 15" fill="#ffd8e1" />
              <path d="M60 15 Q70 5 80 15 Q70 25 60 15" fill="#ffd8e1" />
              <path d="M60 15 Q55 5 45 8 Q52 15 60 15" fill="#b9d8f3" opacity="0.7" />
              <path d="M60 15 Q65 5 75 8 Q68 15 60 15" fill="#b9d8f3" opacity="0.7" />
              <circle cx="60" cy="15" r="4" fill="#80d7e0" />
              <line x1="0" y1="15" x2="36" y2="15" stroke="#efeae0" strokeWidth="1" />
              <line x1="84" y1="15" x2="120" y2="15" stroke="#efeae0" strokeWidth="1" />
            </svg>
          </div>

          <p className="font-sans text-sm tracking-[0.25em] uppercase text-navy/50 mb-3">
            {salutation}
          </p>
          <p className="font-script text-4xl sm:text-5xl text-navy mb-6 leading-tight">
            {displayName}
          </p>

          <div className="h-px bg-gradient-to-r from-transparent via-champagne to-transparent mb-6" />

          <p className="font-sans text-lg sm:text-xl text-navy/70 leading-relaxed mb-6">
            {bodyText}
          </p>

          <p className="font-sans text-2xl sm:text-3xl font-medium text-navy mb-2">
            9 сентября 2026 года
          </p>
          <p className="font-sans text-xs tracking-widest uppercase text-navy/40 mb-6">
            в 11:00 · среда
          </p>

          {/* Bottom floral */}
          <div className="flex justify-center mt-4 opacity-40">
            <svg width="120" height="30" viewBox="0 0 120 30">
              <path d="M60 15 Q50 5 40 15 Q50 25 60 15" fill="#ffd8e1" />
              <path d="M60 15 Q70 5 80 15 Q70 25 60 15" fill="#ffd8e1" />
              <circle cx="60" cy="15" r="4" fill="#80d7e0" />
              <line x1="0" y1="15" x2="36" y2="15" stroke="#efeae0" strokeWidth="1" />
              <line x1="84" y1="15" x2="120" y2="15" stroke="#efeae0" strokeWidth="1" />
            </svg>
          </div>

          <p className="font-script text-2xl text-navy/40 mt-4">Евгений & Екатерина</p>
        </div>
      </motion.div>
    </section>
  )
}
