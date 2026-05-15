'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const palette = [
  { name: 'Белый', hex: '#FFFFFF', border: true },
  { name: 'Айвори', hex: '#FDFcf8', border: true },
  { name: 'Шампань', hex: '#efeae0' },
  { name: 'Пудровый розовый', hex: '#ffd8e1' },
  { name: 'Пудровый голубой', hex: '#b9d8f3' },
  { name: 'Бирюзовый', hex: '#80d7e0' },
  { name: 'Тёмно-синий', hex: '#1b2a4a' },
]

export default function WeddingColors() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="bg-ivory py-20 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <p className="font-sans text-xs tracking-[0.3em] uppercase text-navy/40 mb-3">Дресс-код</p>
          <h2 className="font-script text-6xl sm:text-7xl text-navy">Цвета свадьбы</h2>
          <div className="flex justify-center mt-4">
            <div className="h-px w-24 bg-gradient-to-r from-transparent via-powder-pink to-transparent" />
          </div>
          <p className="font-sans text-lg italic text-navy/50 mt-6 text-balance">
            Мы будем рады, если ваш образ будет в гармонии с нашей палитрой
          </p>
        </motion.div>

        {/* Color swatches */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-6 mb-14"
        >
          {palette.map((color, i) => (
            <motion.div
              key={color.hex}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * i + 0.3 }}
              className="flex flex-col items-center gap-2"
            >
              <div
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-full shadow-card transition-transform hover:scale-110 cursor-default"
                style={{
                  backgroundColor: color.hex,
                  border: color.border ? '2px solid #efeae0' : 'none',
                }}
              />
              <p className="font-sans text-sm text-navy/70 text-center max-w-[80px] leading-tight">{color.name}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Notes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 mt-4"
        >
          <div className="flex-1 bg-white rounded-2xl p-5 shadow-card border border-champagne/60 flex items-start gap-3">
            <span className="text-2xl flex-shrink-0">🩱</span>
            <p className="font-sans text-sm text-navy/65 leading-relaxed">
              Возьмите купальник — на вилле будет бассейн
            </p>
          </div>
          <div className="flex-1 bg-white rounded-2xl p-5 shadow-card border border-champagne/60 flex items-start gap-3">
            <span className="text-2xl flex-shrink-0">🌙</span>
            <p className="font-sans text-sm text-navy/65 leading-relaxed">
              При желании можно остаться на ночь на вилле
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  )
}
