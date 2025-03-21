import CTASection from '@/component/CTA'
import Features from '@/component/Features'
import Hero from '@/component/Hero'
import Working from '@/component/Working'
import React from 'react'

const Home = () => {
  document.title = 'Voyage | Home'
  return (
    <div >
      <Hero />
      <Features/>
      <Working/>
      <CTASection/>
    </div>
  )
}

export default Home
