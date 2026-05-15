import { NextRequest, NextResponse } from 'next/server'
import path from 'path'
import fs from 'fs/promises'

function getDataPath() {
  if (process.env.NODE_ENV === 'production') return '/tmp'
  return path.join(process.cwd(), 'data')
}

export async function POST(request: NextRequest) {
  const body = await request.json()
  const dataPath = getDataPath()
  const filePath = path.join(dataPath, 'wishes.json')

  let list: unknown[] = []
  try {
    const raw = await fs.readFile(filePath, 'utf-8')
    list = JSON.parse(raw)
  } catch {}

  list.push({ ...body, timestamp: new Date().toISOString() })

  await fs.mkdir(dataPath, { recursive: true })
  await fs.writeFile(filePath, JSON.stringify(list, null, 2), 'utf-8')

  return NextResponse.json({ success: true })
}

export async function GET() {
  const filePath = path.join(getDataPath(), 'wishes.json')
  try {
    const raw = await fs.readFile(filePath, 'utf-8')
    return NextResponse.json(JSON.parse(raw))
  } catch {
    return NextResponse.json([])
  }
}
