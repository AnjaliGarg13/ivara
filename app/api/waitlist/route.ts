import { NextRequest, NextResponse } from 'next/server'
import { waitlistSchema } from '@/lib/validations'
import { appendToWaitlist, isEmailRegistered } from '@/lib/storage'
import { sendWaitlistConfirmation } from '@/lib/email'

// In-memory rate limiter — resets on serverless cold starts.
// Replace with Upstash Redis in production.
const rateLimitMap = new Map<string, { count: number; resetAt: number }>()
const RATE_LIMIT = 5
const RATE_WINDOW_MS = 60 * 60 * 1000 // 1 hour

function getClientIP(req: NextRequest): string {
  // x-forwarded-for is spoofable by clients — noted for production hardening
  const forwarded = req.headers.get('x-forwarded-for')
  return forwarded ? forwarded.split(',')[0].trim() : 'unknown'
}

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const record = rateLimitMap.get(ip)
  if (!record || now > record.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS })
    return false
  }
  if (record.count >= RATE_LIMIT) return true
  record.count++
  return false
}

export async function POST(req: NextRequest) {
  const ip = getClientIP(req)

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { success: false, error: 'Too many requests. Please try again later.' },
      { status: 429 }
    )
  }

  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ success: false, error: 'Invalid request body.' }, { status: 400 })
  }

  const parsed = waitlistSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { success: false, error: parsed.error.errors[0]?.message ?? 'Validation failed.' },
      { status: 400 }
    )
  }

  const { email, language, city } = parsed.data

  try {
    const alreadyRegistered = await isEmailRegistered(email)
    if (alreadyRegistered) {
      return NextResponse.json(
        { success: true, message: "You're already on the list! We'll be in touch." },
        { status: 200 }
      )
    }

    await appendToWaitlist({ email, language, city, timestamp: new Date().toISOString(), ip })
    await sendWaitlistConfirmation(email, language)

    return NextResponse.json(
      { success: true, message: language === 'hi' ? 'Aap list mein hain! Launch hote hi aapko batayenge.' : "You're on the list! We'll be in touch when Ivara launches near you." },
      { status: 200 }
    )
  } catch (err) {
    console.error('[Waitlist API] Error:', err)
    return NextResponse.json(
      { success: false, error: 'Something went wrong. Please try again.' },
      { status: 500 }
    )
  }
}

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get('authorization')
  const adminSecret = process.env.ADMIN_SECRET

  if (!adminSecret || authHeader !== `Bearer ${adminSecret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { getWaitlist } = await import('@/lib/storage')
  const waitlist = await getWaitlist()
  return NextResponse.json({ count: waitlist.length, entries: waitlist })
}
