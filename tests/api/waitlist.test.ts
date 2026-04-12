import { describe, it, expect, beforeEach, vi } from 'vitest'

// Mock the storage and email modules
vi.mock('@/lib/storage', () => ({
  appendToWaitlist: vi.fn().mockResolvedValue(undefined),
  isEmailRegistered: vi.fn().mockResolvedValue(false),
  getWaitlist: vi.fn().mockResolvedValue([
    { email: 'test@example.com', language: 'en', timestamp: '2026-01-01T00:00:00Z', ip: '1.2.3.4' }
  ]),
}))
vi.mock('@/lib/email', () => ({
  sendWaitlistConfirmation: vi.fn().mockResolvedValue(undefined),
}))

// Helper to create a mock NextRequest
function makeRequest(body: unknown, headers: Record<string, string> = {}, method = 'POST') {
  return new Request('http://localhost:3000/api/waitlist', {
    method,
    headers: { 'Content-Type': 'application/json', ...headers },
    body: JSON.stringify(body),
  })
}

describe('POST /api/waitlist', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    // Reset rate limit map between tests (import the module fresh each test)
  })

  it('returns 200 with success:true for valid email', async () => {
    const { POST } = await import('@/app/api/waitlist/route')
    const req = makeRequest({ email: 'priya@example.com', language: 'en' })
    const res = await POST(req as any)
    expect(res.status).toBe(200)
    const json = await res.json()
    expect(json.success).toBe(true)
  })

  it('returns 400 for invalid email', async () => {
    const { POST } = await import('@/app/api/waitlist/route')
    const req = makeRequest({ email: 'not-an-email' })
    const res = await POST(req as any)
    expect(res.status).toBe(400)
    const json = await res.json()
    expect(json.success).toBe(false)
    expect(typeof json.error).toBe('string')
  })

  it('returns 400 for missing email', async () => {
    const { POST } = await import('@/app/api/waitlist/route')
    const req = makeRequest({ language: 'en' })
    const res = await POST(req as any)
    expect(res.status).toBe(400)
  })
})

describe('GET /api/waitlist', () => {
  it('returns 401 without Authorization header', async () => {
    const { GET } = await import('@/app/api/waitlist/route')
    const req = new Request('http://localhost:3000/api/waitlist', { method: 'GET' })
    // Set env
    process.env.ADMIN_SECRET = 'test-secret'
    const res = await GET(req as any)
    expect(res.status).toBe(401)
  })

  it('returns 200 with waitlist data when auth is valid', async () => {
    const { GET } = await import('@/app/api/waitlist/route')
    process.env.ADMIN_SECRET = 'test-secret'
    const req = new Request('http://localhost:3000/api/waitlist', {
      method: 'GET',
      headers: { Authorization: 'Bearer test-secret' },
    })
    const res = await GET(req as any)
    expect(res.status).toBe(200)
    const json = await res.json()
    expect(Array.isArray(json.entries)).toBe(true)
  })
})
