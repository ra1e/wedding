'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Check, Loader2, Star } from 'lucide-react'
import type { GuestInfo } from '@/lib/guests'
import { guestDisplayName } from '@/lib/guests'

interface WishesFormProps {
  guests: GuestInfo
}

export default function WishesForm({ guests }: WishesFormProps) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const [name, setName] = useState(guests.isDefault ? '' : guestDisplayName(guests))
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!message.trim()) { setError('Напишите хотя бы пару слов 🌸'); return }
    setError('')
    setLoading(true)
    try {
      const res = await fetch('/api/wishes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim() || 'Анонимный гость', message: message.trim() }),
      })
      if (!res.ok) throw new Error()
      setSubmitted(true)
    } catch {
      setError('Что-то пошло не так. Попробуйте ещё раз.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section ref={ref} className="bg-ivory py-20 px-4 pb-32">
      <div className="max-w-lg mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <p className="font-sans text-xs tracking-[0.3em] uppercase text-navy/40 mb-3">От всей души</p>
          <h2 className="font-script text-6xl sm:text-7xl text-navy">Пожелания</h2>
          <div className="flex justify-center mt-4">
            <div className="h-px w-24 bg-gradient-to-r from-transparent via-powder-blue to-transparent" />
          </div>
          <p className="font-sans text-lg italic text-navy/50 mt-6 text-balance">
            Оставьте нам пожелание — мы сохраним каждое слово и будем перечитывать в трудные минуты
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-white rounded-3xl shadow-card p-8 sm:p-10 border border-champagne/60 relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-32 h-32 rounded-full bg-powder-blue opacity-10 blur-2xl -translate-x-8 -translate-y-8 pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-32 h-32 rounded-full bg-powder-pink opacity-15 blur-2xl translate-x-8 translate-y-8 pointer-events-none" />

          {submitted ? (
            <div className="flex flex-col items-center text-center gap-6 py-6 relative z-10">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 fill-powder-pink text-powder-pink" />
                ))}
              </div>
              <div className="w-16 h-16 rounded-full bg-powder-pink/20 flex items-center justify-center">
                <Check className="w-8 h-8 text-navy" strokeWidth={2.5} />
              </div>
              <div>
                <p className="font-sans text-2xl text-navy mb-2">Пожелание отправлено!</p>
                <p className="font-sans text-sm text-navy/60 leading-relaxed">
                  Спасибо за тёплые слова — они для нас очень важны 💌
                </p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5 relative z-10">
              <div>
                <label className="font-sans text-sm text-navy/50 block mb-1.5 tracking-wide">
                  Ваше имя (необязательно)
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Иван Петров"
                  className="w-full bg-ivory border border-champagne rounded-xl px-4 py-3 font-sans text-sm text-navy placeholder:text-navy/30 focus:outline-none focus:border-powder-blue transition-colors"
                />
              </div>

              <div>
                <label className="font-sans text-sm text-navy/50 block mb-1.5 tracking-wide">
                  Ваше пожелание
                </label>
                <textarea
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  placeholder="Желаем вам вечной любви, крепкой семьи и яркой жизни..."
                  rows={5}
                  className="w-full bg-ivory border border-champagne rounded-xl px-4 py-3 font-sans text-sm text-navy placeholder:text-navy/30 focus:outline-none focus:border-powder-blue transition-colors resize-none leading-relaxed"
                />
                <p className="font-sans text-xs text-navy/30 mt-1 text-right">
                  {message.length} символов
                </p>
              </div>

              {error && (
                <p className="font-sans text-sm text-red-400 text-center">{error}</p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-gradient-to-r from-powder-pink to-powder-blue text-navy rounded-2xl font-sans text-xl tracking-wide hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                Отправить пожелание 💌
              </button>
            </form>
          )}
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-16"
        >
          <p className="font-script text-5xl text-navy/30">Eugene & Darina</p>
          <p className="font-sans text-xs tracking-widest uppercase text-navy/20 mt-2">09 · 09 · 2026</p>
        </motion.div>
      </div>
    </section>
  )
}
