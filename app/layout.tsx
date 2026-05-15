import type { Metadata } from 'next'
import { Great_Vibes } from 'next/font/google'
import './globals.css'

const greatVibes = Great_Vibes({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-script',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Евгений & Екатерина — 09.09.2026',
  description: 'Мы приглашаем вас разделить с нами самый особенный день нашей жизни',
  openGraph: {
    title: 'Евгений & Екатерина — Свадьба 09.09.2026',
    description: 'Мы приглашаем вас разделить с нами самый особенный день нашей жизни',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={greatVibes.variable}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
