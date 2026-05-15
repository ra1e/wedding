import { NextRequest, NextResponse } from 'next/server'

async function sendTelegram(name: string, attending: boolean, guests?: number) {
  const token = process.env.TELEGRAM_BOT_TOKEN
  const chatIds = process.env.TELEGRAM_CHAT_IDS
  if (!token || !chatIds) return

  const status = attending ? '✅ Придёт' : '❌ Не придёт'
  const lines = [`🎊 *Новый RSVP!*`, `👤 ${name}`, status]
  if (attending && guests && guests > 1) lines.push(`👥 Гостей: ${guests}`)

  const text = lines.join('\n')
  const ids = chatIds.split(',').map((s) => s.trim()).filter(Boolean)

  await Promise.all(
    ids.map((chatId) =>
      fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: chatId, text, parse_mode: 'Markdown' }),
      })
    )
  )
}

export async function POST(request: NextRequest) {
  const body = await request.json()

  if (Array.isArray(body.guests)) {
    await Promise.all(
      body.guests.map((g: { name: string; attending: boolean }) =>
        sendTelegram(g.name, g.attending)
      )
    )
  } else {
    await sendTelegram(body.name, body.attending, body.guests)
  }

  return NextResponse.json({ success: true })
}
