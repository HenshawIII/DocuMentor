import React from 'react'
import {useGSAP} from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

const Goals = () => {

  useGSAP(() => {

    gsap.set('.goals-text', {
      opacity: 0,
      y: 50,
      filter: 'blur(20px)'
    })
    
    gsap.to('.goals-text', {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: 2,
      stagger: 0.5,
      ease: 'power1.inOut',
      scrollTrigger: {
        trigger: '.goals-text',
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none none'
      }
    })
  },[])
  return (
    <>
    <section className="relative w-[94%] xl:w-[97%] my-2 overflow-hidden  mx-auto rounded-3xl min-h-screen bg-[#0C0C0C] py-32 px-4 sm:px-6 lg:px-8">
      <div className='absolute -bottom-[5%] hidden lg:block  xl:-bottom-[40%] xl:-left-[0%] md:-left-[0%] z-0 overflow-hidden'>
          <img src={'/Effect114.png'} alt="hero-bg" className='w-full h-full object-cover' />
        </div>
    

      <div className="relative z-10 ">
        <div className="flex items-start flex-col lg:justify-between gap-3 lg:flex-row">
          
          {/* Safe and secure button */}
          <div className=" lg:mb-8">
            <button className="bg-transparent backdrop-blur-sm border border-white/20 rounded-lg px-6 py-3 text-gray-400 text-[16px] font-manrope font-medium hover:bg-white/20 transition-all duration-300">
              Safe and secure
            </button>
          </div>

          {/* Star icon */}
          <div className="absolute top-20 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white rounded-full opacity-60"></div>

          {/* Main heading */}
          <div className="text-left max-w-6xl goals-text">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-[500] text-white leading-tight mb-8">
              Blockchain Project Timeline &<br />
              Strategic Goals
            </h2>
            
            {/* Description paragraph */}
            <p className="text-[16px] sm:text-[16px] font-light text-white/80 leading-relaxed max-w-5xl font-manrope">
              Explore our Blockchain Project Timeline & Strategic Goals to see how we're building the future of decentralized finance. From initial funding rounds to smart contract deployment and platform scaling, each phase is designed for transparency, innovation, and long-term impact—driven by community trust and blockchain-powered efficiency.
            </p>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row relative lg:mt-10 goals-text">
          <div className="absolute top-0 left-0">
            <img src={'/unii.avif'} alt="hero-bg" className='w-[60%] h-[50%] lg:w-full lg:h-full' />
          </div>
          <div className=" z-20">
          <img src={'/distort2.png'} alt="hero-bg" className='w-[60%] h-[50%] lg:w-full lg:h-full animate-pulse' />
          </div>
          <div className='grid grid-cols-1 items-start mt-2 lg:grid-cols-4 max-w-4xl gap-4 bg-gray-800/10 backdrop-blur-sm rounded-xl p-4'>
            <div className='bg-transparent  rounded-xl lg:col-span-3 p-4'>
             <img src={'/chart1.png'} alt="hero-bg" className='xl:w-full h-full object-contain mx-auto' />
            </div>
            <div className='bg-transparent rounded-xl p-4'>
              <img src={'/chart2.png'} alt="hero-bg" className='xl:w-full h-full object-contain mx-auto' />
            </div>
            <div className='bg-transparent rounded-xl p-4 lg:col-span-3'>
              <img src={'/chart3.png'} alt="hero-bg" className='xl:w-full h-full object-contain mx-auto' />
            </div>
            <div className='bg-transparent rounded-xl p-4 '>
              <img src={'/chart4.png'} alt="hero-bg" className='xl:w-full h-full object-contain mx-auto' />
            </div>
            
          </div>
        </div>
        </div>
      </section>
      
      {/* Trust Section Footer */}
      <section className="relative w-full bg-black py-20 px-4 sm:px-6 lg:px-8">
        {/* Subtle purple gradient background */}
        {/* <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-transparent"></div> */}
        
        <div className="relative z-10 ">
          <div className="grid grid-cols-1 lg:grid-cols-6 gap-6 items-center">
            
            {/* Left Side - Main Heading */}
            <div className="text-left lg:col-span-4">
              <h2 className="text-3xl sm:text-4xl lg:text-6xl  font-[500] text-white leading-tight">
                More than 12,500 happy<br />
                <span className="text-white">customers trust us</span>
              </h2>
            </div>
            
            {/* Right Side - Supporting Paragraph */}
            <div className="text-left flex lg:col-span-2">
              <p className="text-[16px] text-[#C8C4C4] leading-relaxed font-manrope max-w-2xl">
                Who trust our platform for secure, reliable, and user-friendly crypto services. Experience seamless transactions, real-time support, and a community-first approach to blockchain.
              </p>
            </div>
          </div>
          
          {/* Bottom Pagination Indicator */}
          <div className="lg:mt-20 mt-5 flex items-center justify-center px-8">
          {/* Left line segment */}
          <div className="h-[0.1px] bg-gradient-to-r from-transparent via-white/20 to-white/40 flex-1 w-full"></div>
          
          {/* Circle in the middle */}
          <div className="xl:w-6 xl:h-6 w-4 h-4 bg-transparent border-2 border-gray-200/50 rounded-full mx-4 relative">
            {/* Inner circle for depth */}
           
          </div>
          
          {/* Right line segment */}
          <div className="h-[0.1px] bg-gradient-to-l from-transparent via-white/20 to-white/40 flex-1 w-full"></div>
        </div>
        </div>
      </section>
    </>
  )
}

export default Goals
