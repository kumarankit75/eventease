import Hero from '../components/Hero'
import StatsStrip from '../components/StatsStrip'
import EventTypes from '../components/EventTypes'
import Services from '../components/Services'
import SearchBar from '../components/SearchBar'
import HowItWorks from '../components/HowItWorks'
import Testimonials from '../components/Testimonials'
import CTA from '../components/CTA'

function Home({ onBookNow }) {
  return (
    <>
      <Hero onBookNow={onBookNow} />
      <StatsStrip />
      <div className="reveal"><EventTypes /></div>
      <div className="reveal"><Services onBookNow={onBookNow} /></div>
      <div className="reveal"><SearchBar /></div>
      <div className="reveal"><HowItWorks /></div>
      <div className="reveal"><Testimonials /></div>
      <div className="reveal"><CTA onBookNow={onBookNow} /></div>
    </>
  )
}

export default Home