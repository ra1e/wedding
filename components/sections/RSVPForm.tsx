'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Check, X, Loader2 } from 'lucide-react'
import type { GuestInfo } from '@/lib/guests'
import { guestIsPlural } from '@/lib/guests'

interface RSVPFormProps {
  guests: GuestInfo
}

type AttendStatus = 'yes' | 'no' | null

export default function RSVPForm({ guests }: RSVPFormProps) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const plural = guestIsPlural(guests)

  const guestNames = guests.names
  const isGeneric  = guests.isDefault
  const isSingle   = !isGeneric && guestNames.length === 1
  const isMultiple = !isGeneric && guestNames.length > 1

  const [attending, setAttending] = useState<AttendStatus>(null)
  const [freeInput, setFreeInput] = useState('')
  const [checkedNames, setCheckedNames] = useState<string[]>(guestNames)
  const [guestCount, setGuestCount] = useState(1)
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  function toggleName(name: string) {
    setCheckedNames(prev =>
      prev.includes(name) ? prev.filter(n => n !== name) : [...prev, name]
    )
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (attending === null) { setError('Пожалуйста, выберите ответ'); return }
    if (isGeneric && !freeInput.trim()) { setError('Пожалуйста, укажите имя'); return }
    if (isMultiple && attending === 'yes' && checkedNames.length === 0) {
      setError('Выберите хотя бы одно имя'); return
    }
    setError('')
    setLoading(true)
    try {
      let payload: object

      if (isMultiple) {
        payload = {
          guests: guestNames.map((name) => ({
            name,
            attending: attending === 'yes' ? checkedNames.includes(name) : false,
          })),
        }
      } else {
        payload = {
          name: isGeneric ? freeInput.trim() : guestNames[0],
          attending: attending === 'yes',
          guests: isGeneric ? guestCount : 1,
        }
      }

      const res = await fetch('/api/rsvp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
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
    <section ref={ref} className="bg-champagne py-20 px-4">
      <div className="max-w-lg mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <h2 className="font-script text-5xl sm:text-7xl text-navy whitespace-nowrap">Будете ли вы с нами?</h2>
          <div className="flex justify-center mt-4">
            <div className="h-px w-24 bg-gradient-to-r from-transparent via-navy/40 to-transparent" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-white rounded-3xl shadow-card p-8 sm:p-10 border border-champagne/60"
        >
          {submitted ? (
            <div className="flex flex-col items-center text-center gap-6 py-6">
              <div className="w-16 h-16 rounded-full bg-teal/20 flex items-center justify-center">
                <Check className="w-8 h-8 text-teal" strokeWidth={3} />
              </div>
              <div>
                <p className="font-sans text-2xl text-navy mb-2">Спасибо!</p>
                <p className="font-sans text-sm text-navy/60 leading-relaxed">
                  {attending === 'yes'
                    ? `${plural ? 'Очень рады, что вы придёте' : 'Очень рады, что ты придёшь'} — до встречи 14 июня! 🎉`
                    : 'Мы понимаем и ценим твой ответ. Будем скучать!'}
                </p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div>
                <p className="font-sans text-base text-navy/60 mb-3 text-center">
                  {plural ? 'Вы придёте на нашу свадьбу?' : 'Ты придёшь на нашу свадьбу?'}
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setAttending('yes')}
                    className={`flex items-center justify-center gap-2 py-4 rounded-2xl border-2 transition-all font-sans text-lg
                      ${attending === 'yes'
                        ? 'border-teal bg-teal/10 text-navy'
                        : 'border-champagne text-navy/50 hover:border-teal/40'}`}
                  >
                    <Check className="w-4 h-4" />
                    {plural ? 'Придём!' : 'Приду!'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setAttending('no')}
                    className={`flex items-center justify-center gap-2 py-4 rounded-2xl border-2 transition-all font-sans text-lg
                      ${attending === 'no'
                        ? 'border-powder-pink bg-powder-pink/20 text-navy'
                        : 'border-champagne text-navy/50 hover:border-powder-pink/40'}`}
                  >
                    <X className="w-4 h-4" />
                    {plural ? 'Не придём' : 'Не приду'}
                  </button>
                </div>
              </div>

              {isMultiple && attending === 'yes' && (
                <div>
                  <label className="font-sans text-sm text-navy/50 block mb-3 tracking-wide">
                    Кто придёт?
                  </label>
                  <div className="flex flex-col gap-2">
                    {guestNames.map(name => (
                      <button
                        key={name}
                        type="button"
                        onClick={() => toggleName(name)}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl border-2 transition-all text-left
                          ${checkedNames.includes(name)
                            ? 'border-teal bg-teal/10 text-navy'
                            : 'border-champagne text-navy/50 hover:border-teal/30'}`}
                      >
                        <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-all
                          ${checkedNames.includes(name) ? 'border-teal bg-teal' : 'border-navy/20'}`}>
                          {checkedNames.includes(name) && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
                        </div>
                        <span className="font-sans text-base">{name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {isGeneric && (
                <div>
                  <label className="font-sans text-sm text-navy/50 block mb-1.5 tracking-wide">
                    Ваше имя
                  </label>
                  <input
                    type="text"
                    value={freeInput}
                    onChange={e => setFreeInput(e.target.value)}
                    placeholder="Иван Петров"
                    className="w-full bg-ivory border border-champagne rounded-xl px-4 py-3 font-sans text-sm text-navy placeholder:text-navy/30 focus:outline-none focus:border-teal transition-colors"
                  />
                </div>
              )}

              {isGeneric && attending === 'yes' && (
                <div>
                  <label className="font-sans text-sm text-navy/50 block mb-1.5 tracking-wide">
                    Количество гостей
                  </label>
                  <div className="flex items-center gap-4">
                    <button
                      type="button"
                      onClick={() => setGuestCount(g => Math.max(1, g - 1))}
                      className="w-10 h-10 rounded-full border border-champagne flex items-center justify-center text-navy hover:border-teal transition-colors font-sans text-xl"
                    >−</button>
                    <span className="font-sans text-3xl text-navy w-8 text-center">{guestCount}</span>
                    <button
                      type="button"
                      onClick={() => setGuestCount(g => Math.min(10, g + 1))}
                      className="w-10 h-10 rounded-full border border-champagne flex items-center justify-center text-navy hover:border-teal transition-colors font-sans text-xl"
                    >+</button>
                  </div>
                </div>
              )}

              {error && (
                <p className="font-sans text-sm text-red-400 text-center">{error}</p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-navy text-white rounded-2xl font-sans text-xl tracking-wide hover:bg-navy/80 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                Отправить ответ
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  )
}
