export interface GuestInfo {
  names: string[]
  gender?: 'male' | 'female'
  isDefault: boolean
}

/** Parse ?guests[]=Аня&guests[]=Саша&gender=female from Next.js searchParams */
export function parseSearchParams(
  sp: Record<string, string | string[] | undefined>
): GuestInfo {
  const raw = sp['guests[]'] ?? sp['guests']
  const decode = (s: string) => { try { return decodeURIComponent(s) } catch { return s } }
  const names: string[] = raw
    ? (Array.isArray(raw) ? raw : [raw]).map(s => decode(s).trim()).filter(Boolean)
    : []
  const g = Array.isArray(sp['gender']) ? sp['gender'][0] : sp['gender']
  const gender: GuestInfo['gender'] =
    g === 'male' || g === 'female' ? g : undefined
  return { names, gender, isDefault: names.length === 0 }
}

export function guestDisplayName(info: GuestInfo): string {
  if (info.isDefault || !info.names.length) return 'Дорогой гость'
  return info.names.join(' и ')
}

export function guestIsPlural(info: GuestInfo): boolean {
  return info.names.length > 1
}

export function guestSalutation(info: GuestInfo): string {
  if (info.names.length > 1) return 'Дорогие'
  if (info.gender === 'male') return 'Дорогой'
  if (info.gender === 'female') return 'Дорогая'
  return 'Дорогой / Дорогая'
}

export function guestBodyText(info: GuestInfo): string {
  if (info.names.length > 1)
    return 'Вы дороги нам, и мы хотим, чтобы вы разделили с нами этот особенный день'
  if (info.gender === 'male')
    return 'Ты дорог нам, и мы хотим, чтобы ты разделил с нами этот особенный день'
  if (info.gender === 'female')
    return 'Ты дорога нам, и мы хотим, чтобы ты разделила с нами этот особенный день'
  return 'Ты дорог(а) нам, и мы хотим, чтобы ты разделил(а) с нами этот особенный день'
}
