import React,{useRef} from 'react'
import Link from 'next/link'
import {useGSAP} from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useUser } from '../contexts/UserContext'

gsap.registerPlugin(ScrollTrigger)
const Dyk = () => {
  const scrollref = useRef(null)
  const {user} = useUser()
  useGSAP(() => {
    // Set initial state for all cards
    gsap.set(".jonze", {
      opacity: 0,
      y: 30,
      filter: 'blur(5px)'
    })

    // Create individual ScrollTriggers for each card
    gsap.utils.toArray(".jonze").forEach((card, index) => {
      gsap.to(card, {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 0.3,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 90%',
          scrub: true,
          end: 'bottom 15%',
          toggleActions: 'play none none reverse'
        }
      })
    })
  }, { scope: scrollref })
   

  return (
    <section className="relative w-[94%] xl:w-[97%] my-2  mx-auto rounded-3xl min-h-screen bg-[#0C0C0C] py-32 px-4 sm:px-6 lg:px-8">
      {/* Background Star Effect */}
      <div className="absolute top-20 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white rounded-full opacity-60 animate-pulse"></div>
      <div className='absolute -top-[5%] xl:-top-[20%] xl:-left-[15%] md:-left-[90%] -left-[20%] z-0'>
          <img src={'/Effect62.png'} alt="hero-bg" className='w-[100%] h-[100%] xl:w-full xl:h-full' />
        </div>
        <div className='absolute -bottom-[5%] xl:-bottom-[40%] xl:-right-[0%] md:-right-[0%] z-0 overflow-hidden'>
          <img src={'/Effect114.png'} alt="hero-bg" className='w-full h-full object-cover' />
        </div>
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          {/* Left Section - Main Content */}
          <div className="space-y-8 lg:sticky lg:top-[50px]">
            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
              Do you know how RAG works ?
            </h1>
            
            {/* Description */}
            <p className="text-lg sm:text-xl text-white leading-relaxed max-w-2xl font-manrope">
            Retrieval-Augmented Generation (RAG) lets Evian remember and reason with your own information.
When you ask a question, Evian retrieves the most relevant pieces from your documents , then forms precise, grounded responses.

It’s not guessing.
It’s retrieving, connecting, and generating — all in one motion.
            </p>
            
            {/* CTA Button */}
            <div className="pt-4">
             <Link
              href={user ? '/chat' : '/signup'}
              className="relative font-medium font-manrope text-[16px] text-white px-8 py-3 rounded-full text-lg overflow-hidden group transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl inline-block"
              style={{
                background: 'linear-gradient(to right, #8F72D0, #347FB0)'
              }}
            >
              <span className="relative z-10 transition-colors duration-300 group-hover:text-gray-900">
                {user ? 'Ask Evian' : 'Get Started for Free'}
              </span>
              <div 
                className="absolute inset-0 bg-white transform scale-y-0 origin-bottom transition-transform duration-300 group-hover:scale-y-100 rounded-full"
                style={{
                  transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)'
                }}
              ></div>
            </Link>
            </div>
          </div>
          
          {/* Right Section - Feature Cards */}
          <div className="space-y-5" ref={scrollref}>
            {/* Card 1 - Create an account */}
            <div className="jonze bg-gray-800/20 backdrop-blur-sm rounded-xl px-8 py-10  transition-all duration-300 hover:shadow-lg">
              <div className="space-y-6">
                {/* Icon */}
                <div className="w-12 h-12 rounded-lg  flex items-center justify-center">
                 <img src={'/icon7.svg'} alt="Create an account" className="w-10 h-10" />
                </div>
                
                {/* Title */}
                <h3 className="text-2xl font-bold text-white">Create an account</h3>
                
                {/* Description */}
                <p className="text-gray-300 leading-relaxed font-manrope">
               
Your EvianAI account is your personal environment — a secure space where your ideas, files, and interactions are stored privately.
Once inside, EvianAI begins building a memory tailored to you — not a dataset, but a sense of context.
                </p>
              </div>
            </div>
            
            {/* Card 2 - Funds can be transferred */}
            <div className="jonze bg-gray-800/20 backdrop-blur-sm rounded-xl px-8 py-10  transition-all duration-300 hover:shadow-lg">
              <div className="space-y-4">
                {/* Icon */}
                <div className="w-12 h-12 rounded-lg  flex items-center justify-center">
                  <img src={'/icon8.svg'} alt="Funds can be transferred" className="w-10 h-10" />
                </div>
                
                {/* Title */}
                <h3 className="text-2xl font-bold text-white">Upload your documents</h3>
                
                {/* Description */}
                <p className="text-gray-300 leading-relaxed font-manrope">
                Upload PDFs, reports, notes, or research files. Evian reads, fragments, and embeds your content into its vector memory — a structured field of meaning that allows it to recall and reason.
                This isn’t simple storage; it’s translation .
                </p>
              </div>
            </div>

            <div className="jonze bg-gray-800/20 backdrop-blur-sm rounded-xl px-8 py-10 transition-all duration-300 hover:shadow-lg">
              <div className="space-y-4">
                {/* Icon */}
                <div className="w-12 h-12 rounded-lg  flex items-center justify-center">
                  <img src={'/icon9.svg'} alt="Get passive interest every day" className="w-10 h-10" />
                </div>
                
                {/* Title */}
                <h3 className="text-2xl font-bold text-white">Refine and evolve.</h3>
                
                {/* Description */}
                <p className="text-gray-300 leading-relaxed font-manrope">
                Ask, compare, challenge, and explore. Evian retrieves the most relevant ideas from your data, merges them with its internal reasoning, and returns responses that grow sharper over time.
Each question shapes understanding; each answer reshapes memory.
Evian doesn’t just remember — it refines.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Dyk
