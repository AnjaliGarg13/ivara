import { promises as fs } from 'fs'
import path from 'path'

export interface WaitlistEntry {
  email: string
  language: 'en' | 'hi'
  city?: string
  timestamp: string
  ip: string
}

const WAITLIST_PATH = path.join(process.cwd(), 'data', 'waitlist.json')

export async function appendToWaitlist(entry: WaitlistEntry): Promise<void> {
  // NOTE: Local file storage does not persist on Vercel serverless deployments.
  // Replace with Supabase or PlanetScale in production.
  let entries: WaitlistEntry[] = []
  try {
    const raw = await fs.readFile(WAITLIST_PATH, 'utf-8')
    entries = JSON.parse(raw)
  } catch {
    // File doesn't exist yet - start fresh
  }
  entries.push(entry)
  await fs.writeFile(WAITLIST_PATH, JSON.stringify(entries, null, 2), 'utf-8')
}

export async function getWaitlist(): Promise<WaitlistEntry[]> {
  try {
    const raw = await fs.readFile(WAITLIST_PATH, 'utf-8')
    return JSON.parse(raw)
  } catch {
    return []
  }
}

export async function isEmailRegistered(email: string): Promise<boolean> {
  const entries = await getWaitlist()
  return entries.some(e => e.email.toLowerCase() === email.toLowerCase())
}
