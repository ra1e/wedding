'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const steps = [
  {
    time: '11:00',
    title: 'Сбор гостей',
    desc: 'Встречаемся у апартаментов невесты',
    icon: '🌸',
    color: '#ffd8e1',
  },
  {
    time: '12:00',
    title: 'Фотосессия и прогулка',
    desc: 'Ловим моменты под батумским небом',
    icon: '📷',
    color: '#b9d8f3',
  },
  {
    time: '15:00',
    title: 'Трансфер на локацию',
    desc: 'Вместе отправляемся к месту торжества',
    icon: '🚗',
    color: '#80d7e0',
  },
  {
    time: '16:00',
    title: 'Фуршет',
    desc: 'Welcome drinks и лёгкие закуски',
    icon: '🥂',
    color: '#efeae0',
  },
  {
    time: '16:30',
    title: 'Церемония',
    desc: 'Торжественный обмен клятвами и кольцами',
    icon: '💍',
    color: '#ffd8e1',
  },
  {
    time: '17:00',
    title: 'Банкет и программа',
    desc: 'Праздничный ужин, танцы и развлечения до ночи',
    icon: '🎶',
    color: '#b9d8f3',
  },
  {
    time: '00:30',
    title: 'Трансфер в Батуми',
    desc: 'Мы позаботимся о вашем комфорте и отвезем вас домой',
    icon: '🚌',
    color: '#b9d8f3',
  },
]

function StepCard({ step, align }: { step: typeof steps[0]; align: 'left' | 'right' }) {
  return (
    <div className={`bg-white rounded-2xl p-5 shadow-card inline-block border border-champagne/60 ${align === 'right' ? 'text-right' : 'text-left'}`}>
      <p className="font-sans text-xs tracking-widest text-navy/40 mb-1">{step.time}</p>
      <p className="font-sans text-xl font-semibold text-navy mb-1">{step.title}</p>
      <p className="font-sans text-sm text-navy/50 leading-relaxed">{step.desc}</p>
    </div>
  )
}

export default function Timeline() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="py-20 px-4" style={{ backgroundColor: '#f4efe6' }}>
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <p className="font-sans text-xs tracking-[0.3em] uppercase text-navy/40 mb-3">Расписание</p>
          <h2 className="font-script text-6xl sm:text-7xl text-navy">День</h2>
          <div className="flex justify-center mt-4">
            <div className="h-px w-24 bg-gradient-to-r from-transparent via-powder-blue to-transparent" />
          </div>
        </motion.div>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-[28px] sm:left-1/2 sm:-translate-x-px top-0 bottom-0 w-px bg-gradient-to-b from-powder-pink via-powder-blue to-powder-pink opacity-40" />

          <div className="flex flex-col">
            {steps.map((step, i) => {
              const isEven = i % 2 === 0
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.1 * i + 0.3 }}
                  className="flex items-center mb-8 sm:mb-4"
                >
                  {/* Desktop left cell */}
                  <div className="hidden sm:flex w-[calc(50%-28px)] justify-end pr-6">
                    {isEven && <StepCard step={step} align="right" />}
                  </div>

                  {/* Icon */}
                  <div
                    className="flex-shrink-0 w-14 h-14 rounded-full flex items-center justify-center text-2xl shadow-card z-10 border-2 border-white"
                    style={{ background: step.color }}
                  >
                    {step.icon}
                  </div>

                  {/* Mobile content */}
                  <div className="sm:hidden flex-1 ml-4">
                    <p className="font-sans text-xs tracking-widest text-navy/40 mb-0.5">{step.time}</p>
                    <p className="font-sans text-lg font-semibold text-navy mb-1">{step.title}</p>
                    <p className="font-sans text-sm text-navy/50 leading-relaxed">{step.desc}</p>
                  </div>

                  {/* Desktop right cell */}
                  <div className="hidden sm:flex w-[calc(50%-28px)] pl-6">
                    {!isEven && <StepCard step={step} align="left" />}
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
