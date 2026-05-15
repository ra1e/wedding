import WeddingPage from '@/components/WeddingPage'
import type { GuestInfo } from '@/lib/guests'

interface GuestPageProps {
  params: { guest: string }
}

// Legacy route: /ИмяГостя — treats path segment as a single guest name
export default function GuestPage({ params }: GuestPageProps) {
  const name = decodeURIComponent(params.guest)
  const guests: GuestInfo = { names: [name], isDefault: false }
  return <WeddingPage guests={guests} />
}
