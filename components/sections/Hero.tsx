'use client'

import { motion, useAnimation } from 'framer-motion'
import { useEffect, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import type { GuestInfo } from '@/lib/guests'
import { guestDisplayNameLines, guestIsPlural, guestSalutation, guestBodyText } from '@/lib/guests'

interface HeroProps {
  guests: GuestInfo
}

function Dove({ flip = false }: { flip?: boolean }) {
  return (
    <svg width="72" height="52" viewBox="0 0 72 52" fill="none"
      style={{ transform: flip ? 'scaleX(-1)' : undefined }}>
      <ellipse cx="34" cy="33" rx="17" ry="9" fill="#ede8e3" />
      <path d="M48 27 Q54 18 58 20" stroke="#ede8e3" strokeWidth="5.5" fill="none" strokeLinecap="round" />
      <circle cx="59" cy="19" r="6" fill="#ede8e3" />
      <path d="M64 18 L71 21 L64 24 Z" fill="#d4956a" />
      <circle cx="61" cy="17" r="1.5" fill="#1b2a4a" />
      <path className="dove-wing-up"   d="M34 30 Q24 10 12 16 Q24 23 34 30" fill="#ddd7ce" />
      <path className="dove-wing-down" d="M34 30 Q24 37 17 34 Q26 28 34 30" fill="#ddd7ce" />
      <path d="M19 34 Q9 30 7 37 Q13 39 19 34" fill="#ddd7ce" />
      <path d="M19 34 Q10 35 9 42 Q15 41 19 34" fill="#ccc6be" />
    </svg>
  )
}

// ─── Layout ──────────────────────────────────────────────────────────────────
const CARD_H  = 570
const ENV_H   = 280
const OVERLAP = 72
const ENV_TOP = CARD_H - OVERLAP   // 498
const SCENE_H = ENV_TOP + ENV_H    // 778

export default function Hero({ guests }: HeroProps) {
  const sceneCtrl       = useAnimation()
  const leftDoveCtrl    = useAnimation()
  const rightDoveCtrl   = useAnimation()
  const flapCtrl        = useAnimation()
  const cardCtrl        = useAnimation()
  const envCtrl         = useAnimation()
  const cardContentCtrl = useAnimation()
  const scrollCtrl      = useAnimation()
  const [flapZ, setFlapZ] = useState(20)

  const plural     = guestIsPlural(guests)
  const salutation = guestSalutation(guests)
  const bodyText   = guestBodyText(guests)
  const displayNameLines = guestDisplayNameLines(guests)

  useEffect(() => {
    async function sequence() {
      // 1. Вся сцена влетает сверху
      await sceneCtrl.start({ y: 0, transition: { duration: 2.2, ease: [0.22, 1, 0.36, 1] } })
      await delay(350)

      // 2. Голуби улетают
      leftDoveCtrl.start({ x: -360, y: -440, opacity: 0, transition: { duration: 1.2, ease: 'easeIn' } })
      rightDoveCtrl.start({ x:  360, y: -440, opacity: 0, transition: { duration: 1.2, ease: 'easeIn' } })
      await delay(480)

      // 3. Флап откидывается назад и остаётся перевёрнутым (видна внутренняя сторона)
      await flapCtrl.start({
        rotateX: -175,
        transition: { duration: 1.1, ease: 'easeInOut' },
      })
      setFlapZ(3)   // уходит за карточку и за конверт
      await delay(80)

      // 4. Карточка выезжает из горлышка конверта, конверт чуть уходит вниз
      cardCtrl.start({
        y: 0,
        opacity: 1,
        transition: {
          y:       { duration: 1.5, ease: [0.2, 0, 0, 1] },
          opacity: { duration: 0.15, ease: 'easeIn' },
        },
      })
      envCtrl.start({ y: 28, transition: { duration: 1.5, ease: 'easeOut' } })
      flapCtrl.start({ y: 28, transition: { duration: 1.5, ease: 'easeOut' } })
      await delay(1500)

      // 5. Текст карточки
      await cardContentCtrl.start({ opacity: 1, transition: { duration: 0.8 } })
      scrollCtrl.start({ opacity: 1, transition: { duration: 0.6 } })
    }

    sequence()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <section
      className="relative overflow-hidden flex items-center justify-center"
      style={{
        background: 'linear-gradient(160deg, #FDFcf8 0%, #ffd8e1 40%, #b9d8f3 100%)',
        minHeight: `max(100svh, ${SCENE_H + 96}px)`,
      }}
    >
      <div className="absolute top-[-120px] right-[-120px] w-[400px] h-[400px] rounded-full bg-powder-pink opacity-30 blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-80px] left-[-80px]  w-[300px] h-[300px] rounded-full bg-powder-blue opacity-40 blur-3xl pointer-events-none" />

      {/* ═══ Сцена ═══════════════════════════════════════════════════════════ */}
      <motion.div
        initial={{ y: -1500 }}
        animate={sceneCtrl}
        className="relative w-[340px] sm:w-[520px]"
        style={{ height: SCENE_H }}
      >
        {/* Голуби */}
        <motion.div animate={leftDoveCtrl}
          style={{ position: 'absolute', top: ENV_TOP - 62, left: 10, zIndex: 12 }}>
          <Dove />
        </motion.div>
        <motion.div animate={rightDoveCtrl}
          style={{ position: 'absolute', top: ENV_TOP - 62, right: 10, zIndex: 12 }}>
          <Dove flip />
        </motion.div>

        {/* ─── Карточка (z:15 — поверх конверта) ─────────────────────────
            Стартует с горлышка конверта: initial y = ENV_TOP.
            Выезжает вверх до y = 0.
        ─────────────────────────────────────────────────────────────────── */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: CARD_H,
          zIndex: 5,
          display: 'flex', justifyContent: 'center',
        }}>
          <motion.div
            initial={{ y: ENV_TOP, opacity: 0 }}
            animate={cardCtrl}
            className="w-[300px] sm:w-[420px] h-full"
          >
            <div
              className="bg-white rounded-2xl shadow-card-hover px-8 py-12 sm:px-12 sm:py-16 text-center relative h-full overflow-hidden"
              style={{ border: '1px solid #efeae0' }}
            >
              {(['tl','tr','bl','br'] as const).map(c => (
                <div key={c} className="absolute w-8 h-8 opacity-30"
                  style={{
                    top:    c.startsWith('t') ? 16 : 'auto',
                    bottom: c.startsWith('b') ? 16 : 'auto',
                    left:   c.endsWith('l')   ? 16 : 'auto',
                    right:  c.endsWith('r')   ? 16 : 'auto',
                    transform: `scale(${c.endsWith('r') ? -1 : 1}, ${c.startsWith('b') ? -1 : 1})`,
                  }}>
                  <svg viewBox="0 0 32 32" fill="none">
                    <path d="M2 30 Q2 2 30 2" stroke="#1b2a4a" strokeWidth="1.5" fill="none"/>
                    <circle cx="8" cy="8" r="2" fill="#1b2a4a"/>
                  </svg>
                </div>
              ))}

              <motion.div initial={{ opacity: 0 }} animate={cardContentCtrl}>
                <div className="flex justify-center mb-6 opacity-40">
                  <svg width="120" height="30" viewBox="0 0 120 30">
                    <path d="M60 15 Q50 5 40 15 Q50 25 60 15" fill="#ffd8e1"/>
                    <path d="M60 15 Q70 5 80 15 Q70 25 60 15" fill="#ffd8e1"/>
                    <path d="M60 15 Q55 5 45 8 Q52 15 60 15" fill="#b9d8f3" opacity="0.7"/>
                    <path d="M60 15 Q65 5 75 8 Q68 15 60 15" fill="#b9d8f3" opacity="0.7"/>
                    <circle cx="60" cy="15" r="4" fill="#80d7e0"/>
                    <line x1="0" y1="15" x2="36" y2="15" stroke="#efeae0" strokeWidth="1"/>
                    <line x1="84" y1="15" x2="120" y2="15" stroke="#efeae0" strokeWidth="1"/>
                  </svg>
                </div>

                <p className="font-sans text-sm tracking-[0.25em] uppercase text-navy/50 mb-3">
                  {salutation}
                </p>
                <p className="font-script text-4xl sm:text-5xl text-navy mb-6 leading-tight">
                  {displayNameLines.map((line, i) => (
                    <span key={i} className="block">{line}</span>
                  ))}
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

                <div className="flex justify-center mt-4 opacity-40">
                  <svg width="120" height="30" viewBox="0 0 120 30">
                    <path d="M60 15 Q50 5 40 15 Q50 25 60 15" fill="#ffd8e1"/>
                    <path d="M60 15 Q70 5 80 15 Q70 25 60 15" fill="#ffd8e1"/>
                    <circle cx="60" cy="15" r="4" fill="#80d7e0"/>
                    <line x1="0" y1="15" x2="36" y2="15" stroke="#efeae0" strokeWidth="1"/>
                    <line x1="84" y1="15" x2="120" y2="15" stroke="#efeae0" strokeWidth="1"/>
                  </svg>
                </div>

                <p className="font-script text-2xl text-navy/40 mt-4">Евгений &amp; Екатерина</p>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* ─── Верхний треугольник конверта (z:3 — за карточкой) ─────────
            Карточка (z:5) перекрывает этот треугольник при выезде.
        ─────────────────────────────────────────────────────────────── */}
        <motion.div
          animate={envCtrl}
          style={{ position: 'absolute', top: ENV_TOP, left: 0, right: 0, height: ENV_H, zIndex: 3 }}
        >
          <div className="absolute inset-0 rounded-xl"
            style={{ background: '#f5f0ea', border: '1px solid #e8e1d8' }}>
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 520 280" preserveAspectRatio="none">
              <path d="M0 0 L520 0 L260 188 Z" fill="#ede7df" opacity="0.6"/>
            </svg>
          </div>
        </motion.div>

        {/* ─── Тело конверта: левый, правый, нижний (z:10 — поверх карточки) ─
            Перекрывают нижнюю часть карточки, создавая эффект «внутри конверта».
        ─────────────────────────────────────────────────────────────────────── */}
        <motion.div
          animate={envCtrl}
          style={{ position: 'absolute', top: ENV_TOP, left: 0, right: 0, height: ENV_H, zIndex: 10 }}
        >
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 520 280" preserveAspectRatio="none">
            <path d="M0 0 L0 280 L260 188 Z"    fill="#ede7df"/>
            <path d="M520 0 L520 280 L260 188 Z" fill="#e8e2da"/>
            <path d="M0 280 L260 188 L520 280 Z" fill="#e2dbd3"/>
          </svg>
        </motion.div>

        {/* ─── Флап (z:flapZ) ────────────────────────────────────────────────
            Треугольник с острым углом ВВЕРХ (тупое основание — шарнир).
            transformOrigin: bottom center → поворачивается от основания.
            rotateX: 92 — уходит «на спину» конверта, становится ребром.
        ─────────────────────────────────────────────────────────────── */}
        <div
          style={{
            position: 'absolute',
            top: ENV_TOP, left: 0, right: 0,
            height: 188,
            perspective: 700,
            zIndex: flapZ,
            pointerEvents: 'none',
          }}
        >
          <motion.div
            initial={{ rotateX: 0 }}
            animate={flapCtrl}
            style={{
              position: 'absolute',
              top: 0, left: 0, right: 0, height: 188,
              transformOrigin: 'top center',
            }}
          >
            <div style={{
              position: 'absolute', inset: 0,
              clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
              background: '#f0ebe3',
              border: '1px solid #e5ded5',
            }}>
              <div style={{
                position: 'absolute', left: '50%', top: 62,
                transform: 'translateX(-50%)',
                width: 36, height: 36, borderRadius: '50%',
                background: 'linear-gradient(135deg, #c8745a, #a85540)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'white', fontSize: 14,
                boxShadow: '0 2px 10px rgba(168,85,64,0.45)',
              }}>♥</div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={scrollCtrl}
        className="absolute bottom-7 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-float pointer-events-none"
      >
        <span className="font-sans text-xs tracking-widest uppercase text-navy/40">листайте</span>
        <ChevronDown className="w-5 h-5 text-navy/40" />
      </motion.div>
    </section>
  )
}

function delay(ms: number) {
  return new Promise<void>((r) => setTimeout(r, ms))
}
