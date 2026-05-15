'use client'

import { useEffect } from 'react'
import Hero from './sections/Hero'
import Location from './sections/Location'
import Timeline from './sections/Timeline'
import WeddingColors from './sections/WeddingColors'
import Gifts from './sections/Gifts'
import Photos from './sections/Photos'
import RSVPForm from './sections/RSVPForm'
import PredictionButton from './PredictionButton'
import type { GuestInfo } from '@/lib/guests'
import { guestDisplayName } from '@/lib/guests'

interface WeddingPageProps {
  guests: GuestInfo
}

export default function WeddingPage({ guests }: WeddingPageProps) {
  useEffect(() => {
    if (!guests.isDefault) {
      localStorage.setItem('weddingGuest', guestDisplayName(guests))
    }
  }, [guests])

  return (
    <main className="overflow-x-hidden">
      <Hero guests={guests} />
      <Location />
      <Timeline />
      <WeddingColors />
      <RSVPForm guests={guests} />
      <Gifts />
      <Photos />
      <PredictionButton />
    </main>
  )
}
