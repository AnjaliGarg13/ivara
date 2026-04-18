import Nav from '@/components/sections/Nav'
import Hero from '@/components/sections/Hero'
import Problem from '@/components/sections/Problem'
import Solution from '@/components/sections/Solution'
import Timeline from '@/components/sections/Timeline'
import Features from '@/components/sections/Features'
import Trust from '@/components/sections/Trust'
import Testimonials from '@/components/sections/Testimonials'
import Pricing from '@/components/sections/Pricing'
import FAQ from '@/components/sections/FAQ'
import WaitlistCTA from '@/components/sections/WaitlistCTA'
import Footer from '@/components/sections/Footer'

export default function HomePage() {
  return (
    <main className="min-h-screen bg-ivory">
      <Nav />
      <Hero />
      <Problem />
      <Solution />
      <Timeline />
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
