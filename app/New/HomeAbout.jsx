import React, { useRef } from 'react'
import Scroll from './scroll'
import {useGSAP} from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)


const HomeAbout = () => {
  const sectionRef = useRef(null)

  useGSAP(() => {
    // Set initial state
    gsap.set('.hero-tex', {
      opacity: 0,
      y: 50,
      scale: 0.8,
      filter: 'blur(20px)'
    })

    // Create scroll trigger animation
    gsap.to('.hero-tex', {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: 'blur(0px)',
      duration: 2,
      ease: 'power1.inOut',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 50%',
        end: 'bottom 20%',
        toggleActions: 'play none none none'
      }
    })
  }, { scope: sectionRef })
  return (
    <section ref={sectionRef} className="relative  bg-black py-20  px-4 sm:px-6 lg:px-0">
      
      {/* Horizontal Line at Bottom with Circle Break */}
      <div className="absolute top-[0%] z-40 left-0 right-0 flex items-center justify-center px-8">
          {/* Left line segment */}
          <div className="h-[2px] bg-gradient-to-r from-transparent via-white/20 to-white/40 flex-1 w-full"></div>
          
          {/* Circle in the middle */}
          <div className="xl:w-6 xl:h-6 w-4 h-4 bg-transparent border-2 border-gray-200/50 rounded-full mx-4 relative">
            {/* Inner circle for depth */}
           
          </div>
          
          {/* Right line segment */}
          <div className="h-[2px] bg-gradient-to-l from-transparent via-white/20 to-white/40 flex-1 w-full"></div>
        </div>

      <div className="relative z-10 ">
        <Scroll />
         
        {/* Main Content */}
        <div className="hero-tex grid grid-cols-6 w-[90%] mx-auto gap-2  ">

            {/* About Us Button */}
          <div className="relative flex justify-start items-start" >
              <button 
                className="bg-black text-gray-400 px-6 py-3 rounded-lg z-10 font-light text-sm transition-all duration-300 hover:scale-105 hover:shadow-lg border text-nowrap border-gray-600"
                
            >
              About Us
            </button>
            <div className='hidden lg:block absolute inset-0 w-full h-full bg-black opacity-40 z-0'>
                <img src={'/pattern3.svg'} alt="About Us" className="w-full h-full" />
            </div>
          </div>
          {/* Platform Description */}
          <div className="mb-6 lg:col-span-5 col-span-6 max-w-[1185px] mx-auto flex justify-center items-end text-left  ">
            <h2 className="text-sm md:text-2xl xl:text-[48px] font-[400]  text-white leading-relaxed sm:leading-loose xl:leading-[1.05] mb-8 xl:ml-28">
              Our platform is designed to{' '}
              <span className="text-[#787979]">eliminate complexity,</span>
              <span className="text-[#787979]">offering an intuitive and seamless </span>
              experience for both beginners and expert users.
            </h2>
          </div>

          
          
        </div>
        {/* Feature Cards Section */}
        <div className="hero-tex grid grid-cols-1 lg:grid-cols-3 xl:gap-8 gap-4 mt-4 w-[90%] mx-auto">
            {/* Card 1 - Token Creation */}
                <div className="bg-[#0c0c0c] rounded-3xl md:p-8 xl:p-12 p-4 border border-gray-800 hover:border-gray-700 xl:h-[55vh] h-[30vh] transition-all duration-300 hover:shadow-lg">
              <div className="flex flex-col items-start space-y-4 h-full justify-between">
                {/* Icon */}
                <div className="w-16 h-16 rounded-lg bg-[#0c0c0c] flex items-center justify-center">
                  <img src={'/icon1.svg'} alt="Token Creation" className="md:w-full md:h-full w-6 h-6" />
                </div>
                
                {/* Title */}
                <div className='space-y-2'>
                <h3 className="xl:text-2xl text-sm md:text-lg font-[600] text-white">Knowledge Made Accessible</h3>
                
                {/* Description */}
                <p className="text-[#CDC8C8] leading-relaxed font-manrope">
                Advanced vector embeddings and semantic search ensure we find the most relevant information from your documents.
                </p>
                </div>
              </div>
            </div>

            {/* Card 2 - Wallet Integration */}
            <div className="bg-[#0c0c0c] rounded-3xl md:p-8 xl:p-12 p-4 border border-gray-800 hover:border-gray-700 xl:h-[55vh] h-[30vh] transition-all duration-300 hover:shadow-lg">
              <div className="flex flex-col items-start space-y-4 h-full justify-between">
                {/* Icon */}
                <div className="w-16 h-16 rounded-lg bg-[#0c0c0c] flex items-center justify-center">
                  <img src={'/icon2.svg'} alt="Wallet Integration" className="md:w-full md:h-full w-6 h-6" />
                </div>
                
                {/* Title */}
                <div className='space-y-2'> 
                <h3 className="xl:text-2xl text-sm md:text-lg font-[600] text-white">Natural Conversations</h3>
                
                {/* Description */}
                <p className="text-[#CDC8C8] leading-relaxed font-manrope">
                Large language models generate human-like responses that feel natural and engaging in every interaction.
                </p>
                </div>
              </div>
            </div>

            {/* Card 3 - Launchpad Access */}
            <div className="bg-[#0c0c0c] rounded-3xl md:p-8 xl:p-12 p-4 border border-gray-800 hover:border-gray-700 xl:h-[55vh] h-[30vh] transition-all duration-300 hover:shadow-lg">
              <div className="flex flex-col items-start space-y-4 h-full justify-between">
                {/* Icon */}
                <div className="w-16 h-16 rounded-lg bg-[#0c0c0c] flex items-center justify-center">
                  <img src={'/icon3.svg'} alt="Launchpad Access" className="md:w-full md:h-full w-6 h-6" />
                </div>
                
                {/* Title */}
                <div className='space-y-2'> 
                <h3 className="xl:text-2xl text-sm md:text-lg font-[600] text-white">Intelligent Processing</h3>
                
                {/* Description */}
                <p className="text-[#CDC8C8] leading-relaxed font-manrope">
                Our AI understands context, maintains accuracy, and provides meaningful insights from your documents.
                </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
  )
}

export default HomeAbout