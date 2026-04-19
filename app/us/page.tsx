import Nav from '@/components/sections/Nav'
import Hero from '@/components/sections/Hero'
import Problem from '@/components/sections/Problem'
import LeadMagnet from '@/components/us/LeadMagnet'
import Solution from '@/components/sections/Solution'
import Features from '@/components/sections/Features'
import Trust from '@/components/us/Trust'
import Testimonials from '@/components/sections/Testimonials'
import Pricing from '@/components/us/Pricing'
import FAQ from '@/components/sections/FAQ'
import WaitlistCTA from '@/components/sections/WaitlistCTA'
import Footer from '@/components/sections/Footer'

export default function USPage() {
  return (
    <main className="min-h-screen bg-ivory">
      <Nav />
      <Hero />
      <Problem />
      <LeadMagnet />
      <Solution />
      <Features />
      <Trust />
      <Testimonials />
      <Pricing />
      <FAQ />
      <WaitlistCTA />
      <Footer />
    </main>
  )
}
