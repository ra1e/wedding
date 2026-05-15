import WeddingPage from '@/components/WeddingPage'
import { parseSearchParams } from '@/lib/guests'

interface HomePageProps {
  searchParams: Record<string, string | string[] | undefined>
}

export default function HomePage({ searchParams }: HomePageProps) {
  const guests = parseSearchParams(searchParams)
  return <WeddingPage guests={guests} />
}
