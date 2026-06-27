'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { MapPin, Clock, Trees } from 'lucide-react'

export default function Location() {
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
          className="text-center mb-14"
        >
          <p className="font-sans text-xs tracking-[0.3em] uppercase text-navy/40 mb-3">Место встречи</p>
          <h2 className="font-script text-6xl sm:text-7xl text-navy">Локация</h2>
          <div className="flex justify-center mt-4">
            <div className="h-px w-24 bg-gradient-to-r from-transparent via-powder-pink to-transparent" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-white rounded-3xl shadow-card border border-champagne/60 overflow-hidden"
        >
          {/* Map */}
          <div className="w-full h-52 relative">
            <iframe
              src="https://maps.google.com/maps?q=41.6417259,41.6157544&z=16&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 w-full h-full"
            />
          </div>

          {/* Info rows */}
          <div className="p-7 flex flex-col gap-5">
            {/* Row 1 — Hotel */}
            <div className="flex items-start gap-4">
              <div className="p-2.5 bg-powder-pink/30 rounded-xl flex-shrink-0 mt-0.5">
                <MapPin className="w-5 h-5 text-navy" />
              </div>
              <div>
                <p className="font-sans text-xs tracking-[0.2em] uppercase text-navy/40 mb-0.5">Место сбора</p>
                <p className="font-sans text-lg font-semibold text-navy mb-0.5">Апарт-отель Courtyard by Marriott</p>
                <p className="font-sans text-sm text-navy/55">5 Sherif Khimshiashvili St, Батуми</p>
              </div>
            </div>

            <div className="h-px bg-champagne/80" />

            {/* Row 2 — Time */}
            <div className="flex items-start gap-4">
              <div className="p-2.5 bg-powder-blue/30 rounded-xl flex-shrink-0 mt-0.5">
                <Clock className="w-5 h-5 text-navy" />
              </div>
              <div>
                <p className="font-sans text-xs tracking-[0.2em] uppercase text-navy/40 mb-0.5">Время сбора</p>
                <p className="font-sans text-lg font-semibold text-navy">
                  9 сентября · <span className="text-teal">в 11:00</span>
                </p>
              </div>
            </div>

            <div className="h-px bg-champagne/80" />

            {/* Row 3 — Villa */}
            <div className="flex items-start gap-4">
              <div className="p-2.5 bg-teal/20 rounded-xl flex-shrink-0 mt-0.5">
                <Trees className="w-5 h-5 text-navy" />
              </div>
              <div>
                <p className="font-sans text-xs tracking-[0.2em] uppercase text-navy/40 mb-0.5">Место свадьбы</p>
                <p className="font-sans text-lg font-semibold text-navy mb-0.5">Litz Resort</p>
                <p className="font-sans text-sm text-navy/55">Квариати, Аджария · трансфер в 15:00</p>
              </div>
            </div>

            {/* Map button */}
            <a
              href="https://www.google.com/maps/place/Courtyard+by+Marriott/@41.6417259,41.6157544,615m/data=!3m2!1e3!4b1!4m9!3m8!1s0x4067876ab1deee13:0x6023e13f45336111!5m2!4m1!1i2!8m2!3d41.6417259!4d41.6157544!16s%2Fg%2F11g2xkss4l?entry=ttu&g_ep=EgoyMDI2MDUxMC4wIKXMDSoASAFQAw%3D%3D"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-3.5 bg-navy text-white text-sm tracking-widest uppercase rounded-2xl hover:bg-navy/80 transition-colors mt-1"
            >
              <MapPin className="w-4 h-4" />
              Открыть на карте
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
