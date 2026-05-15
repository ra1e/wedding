'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Sparkles } from 'lucide-react'
import { getDailyPrediction } from '@/lib/predictions'

const STORAGE_KEY = 'wedding_prediction_date'

function getTodayStr() {
  const d = new Date()
  return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`
}

function getCountdown() {
  const now = new Date()
  const midnight = new Date()
  midnight.setHours(24, 0, 0, 0)
  const diff = midnight.getTime() - now.getTime()
  const h = Math.floor(diff / 3600000)
  const m = Math.floor((diff % 3600000) / 60000)
  const s = Math.floor((diff % 60000) / 1000)
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}

export default function PredictionButton() {
  const [isOpen, setIsOpen] = useState(false)
  const [used, setUsed] = useState(false)
  const [prediction, setPrediction] = useState('')
  const [countdown, setCountdown] = useState('')
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    const lastUsed = localStorage.getItem(STORAGE_KEY)
    const wasUsed = lastUsed === getTodayStr()
    setUsed(wasUsed)

    if (wasUsed) {
      setCountdown(getCountdown())
      timerRef.current = setInterval(() => {
        const today = getTodayStr()
        const stored = localStorage.getItem(STORAGE_KEY)
        if (stored !== today) {
          // New day — reset
          setUsed(false)
          setCountdown('')
          if (timerRef.current) clearInterval(timerRef.current)
          return
        }
        setCountdown(getCountdown())
      }, 1000)
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [])

  function handleOpen() {
    const today = getTodayStr()
    const pred = getDailyPrediction()
    setPrediction(pred)
    localStorage.setItem(STORAGE_KEY, today)
    setUsed(true)
    setIsOpen(true)

    // Start countdown
    setCountdown(getCountdown())
    if (timerRef.current) clearInterval(timerRef.current)
    timerRef.current = setInterval(() => {
      const current = getTodayStr()
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored !== current) {
        setUsed(false)
        setCountdown('')
        if (timerRef.current) clearInterval(timerRef.current)
        return
      }
      setCountdown(getCountdown())
    }, 1000)
  }

  return (
    <>
      {/* Floating button */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2.5, type: 'spring', stiffness: 200 }}
        className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2"
      >
        {/* Countdown badge — shown when prediction used */}
        <AnimatePresence>
          {used && countdown && (
            <motion.div
              initial={{ opacity: 0, y: 6, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 6, scale: 0.9 }}
              className="bg-white/90 backdrop-blur-sm border border-champagne rounded-2xl px-3 py-2 shadow-card text-right"
            >
              <p className="font-sans text-[10px] tracking-wide text-navy/40 uppercase">следующее предсказание</p>
              <p className="font-sans text-lg font-medium text-navy tabular-nums">{countdown}</p>
            </motion.div>
          )}
        </AnimatePresence>

        <button
          onClick={used ? undefined : handleOpen}
          title={used ? 'Предсказание уже получено сегодня' : 'Получить предсказание на сегодня'}
          className={`w-14 h-14 rounded-full shadow-lg flex items-center justify-center text-2xl
            transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-teal focus:ring-offset-2
            ${used
              ? 'bg-champagne text-navy/30 cursor-default'
              : 'bg-gradient-to-br from-powder-pink to-teal text-white animate-pulse-soft hover:scale-110 cursor-pointer'
            }`}
        >
          🔮
          {!used && (
            <span className="absolute w-3 h-3 bg-teal rounded-full border-2 border-white top-0 right-0 translate-x-0.5 -translate-y-0.5" />
          )}
        </button>
      </motion.div>

      {/* Prediction modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            onClick={() => setIsOpen(false)}
          >
            <div className="absolute inset-0 bg-navy/60 backdrop-blur-md" />

            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 40 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              onClick={e => e.stopPropagation()}
              className="relative z-10 max-w-md w-full bg-white rounded-3xl shadow-2xl p-10 sm:p-14 text-center overflow-hidden"
            >
              {/* Bg decoration */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-0 w-40 h-40 rounded-full bg-powder-pink opacity-20 blur-2xl -translate-x-10 -translate-y-10" />
                <div className="absolute bottom-0 right-0 w-40 h-40 rounded-full bg-powder-blue opacity-20 blur-2xl translate-x-10 translate-y-10" />
              </div>

              <div className="relative z-10">
                <div className="flex justify-center gap-2 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * i + 0.2 }}
                    >
                      <Sparkles className="w-4 h-4 text-teal" />
                    </motion.div>
                  ))}
                </div>

                <p className="font-sans text-xs tracking-[0.3em] uppercase text-navy/40 mb-4">
                  Предсказание на сегодня
                </p>

                <div className="text-5xl mb-6">🔮</div>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                  className="font-sans text-xl sm:text-2xl text-navy leading-relaxed text-balance"
                >
                  {prediction}
                </motion.p>

                <div className="h-px bg-gradient-to-r from-transparent via-champagne to-transparent my-8" />

                {/* Countdown inside modal */}
                <div className="mb-6">
                  <p className="font-sans text-[10px] tracking-widest uppercase text-navy/30 mb-1">следующее через</p>
                  <p className="font-sans text-3xl font-medium text-navy tabular-nums">{countdown}</p>
                </div>

                <p className="font-script text-2xl text-navy/30 mb-8">Евгений & Екатерина</p>

                <button
                  onClick={() => setIsOpen(false)}
                  className="px-8 py-3 bg-navy text-white rounded-full font-sans text-sm tracking-widest uppercase hover:bg-navy/80 transition-colors"
                >
                  Спасибо, Вселенная!
                </button>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-champagne flex items-center justify-center hover:bg-powder-pink transition-colors"
              >
                <X className="w-4 h-4 text-navy" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
