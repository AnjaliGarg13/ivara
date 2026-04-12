import type { Metadata } from 'next'
import { Inter, Noto_Sans_Devanagari } from 'next/font/google'
import './globals.css'
import { LanguageProvider } from '@/context/LanguageContext'
import { PostHogProvider } from '@/components/providers/PostHogProvider'
import { siteMetadata } from '@/lib/seo'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const notoSansDevanagari = Noto_Sans_Devanagari({
  subsets: ['devanagari'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-devanagari',
})

export const metadata: Metadata = siteMetadata

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${notoSansDevanagari.variable}`}>
      <body className="font-sans antialiased">
        <PostHogProvider>
          <LanguageProvider>
            {children}
          </LanguageProvider>
        </PostHogProvider>
      </body>
    </html>
  )
}
