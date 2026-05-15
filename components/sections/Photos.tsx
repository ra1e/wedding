'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'

const photos = [
  { src: '/photos/1.jpg', alt: 'Фото пары 1' },
  { src: '/photos/2.jpg', alt: 'Фото пары 2' },
  { src: '/photos/3.jpg', alt: 'Фото пары 3' },
  { src: '/photos/4.jpg', alt: 'Фото пары 4' },
  { src: '/photos/5.jpg', alt: 'Фото пары 5' },
  { src: '/photos/6.jpg', alt: 'Фото пары 6' },
]

export default function Photos() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="bg-champagne py-20 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <h2 className="font-script text-6xl sm:text-7xl text-navy">Мы вместе</h2>
          <div className="flex justify-center mt-4">
            <div className="h-px w-24 bg-gradient-to-r from-transparent via-teal to-transparent" />
          </div>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">

          {/* Photo 1 — tall left, spans 2 rows on both mobile and desktop */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="col-span-1 row-span-2 rounded-2xl overflow-hidden shadow-card"
          >
            <div className="relative w-full h-full min-h-[280px] sm:min-h-[360px]">
              <Image src={photos[0].src} alt={photos[0].alt} fill
                className="object-cover hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 640px) 50vw, 33vw" />
            </div>
          </motion.div>

          {/* Photo 2 — top right, colspan 2 on desktop */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="col-span-1 sm:col-span-2 rounded-2xl overflow-hidden shadow-card"
          >
            <div className="relative w-full h-48 sm:h-56">
              <Image src={photos[1].src} alt={photos[1].alt} fill
                className="object-cover hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 640px) 50vw, 66vw" />
            </div>
          </motion.div>

          {/* Photo 3 — visible on mobile (row 2 right col) and desktop */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="col-span-1 rounded-2xl overflow-hidden shadow-card"
          >
            <div className="relative w-full h-48 sm:h-56">
              <Image src={photos[2].src} alt={photos[2].alt} fill
                className="object-cover hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 640px) 50vw, 33vw" />
            </div>
          </motion.div>

          {/* Photo 4 — desktop only */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="hidden sm:block rounded-2xl overflow-hidden shadow-card"
          >
            <div className="relative w-full h-48 sm:h-56">
              <Image src={photos[3].src} alt={photos[3].alt} fill
                className="object-cover hover:scale-105 transition-transform duration-700"
                sizes="33vw" />
            </div>
          </motion.div>

          {/* Photo 5 — desktop only, full width, 120% height */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="hidden sm:block sm:col-span-3 rounded-2xl overflow-hidden shadow-card"
          >
            <div className="relative w-full" style={{ height: '307px' }}>
              <Image src={photos[4].src} alt={photos[4].alt} fill
                className="object-cover object-center hover:scale-105 transition-transform duration-700"
                sizes="100vw" />
            </div>
          </motion.div>

        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="text-center font-script text-3xl text-navy/40 mt-10"
        >
          Евгений & Екатерина
        </motion.p>
      </div>
    </section>
  )
}
