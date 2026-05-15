'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Gift } from 'lucide-react'

export default function Gifts() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="bg-ivory py-20 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <h2 className="font-script text-6xl sm:text-7xl text-navy">Подарки</h2>
          <div className="flex justify-center mt-4">
            <div className="h-px w-24 bg-gradient-to-r from-transparent via-powder-pink to-transparent" />
          </div>
        </motion.div>

        {/* Main card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-white rounded-3xl shadow-card-hover p-10 sm:p-14 text-center border border-champagne/60 relative overflow-hidden"
        >
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-powder-pink opacity-20 blur-2xl translate-x-10 -translate-y-10 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full bg-powder-blue opacity-20 blur-2xl -translate-x-8 translate-y-8 pointer-events-none" />

          <div className="relative z-10">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-powder-pink/30 rounded-full">
                <Gift className="w-8 h-8 text-navy" />
              </div>
            </div>

            <h3 className="font-sans text-3xl font-semibold text-navy mb-4">
              Мы — молодая семья!
            </h3>

            <p className="font-sans text-base text-navy/60 leading-relaxed mb-6">
              Ваше присутствие на нашем празднике — уже лучший подарок. Но если вы всё же хотите сделать что-то особенное, лучшим вложением в наш совместный путь станет денежный подарок.
            </p>

            <p className="font-sans text-sm italic text-navy/40 mt-2">
              Если хочется подарить что-то материальное — маленький сюрприз всегда найдёт своё место 🌸
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
