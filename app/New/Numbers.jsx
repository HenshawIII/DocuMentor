import React, { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const Numbers = () => {
  const containerRef = useRef(null)
  const numbersRef = useRef([])

  useGSAP(() => {
    // Set initial state for all numbers
    gsap.set(".number-item", {
      scale: 0.8,
      opacity: 0,
      y: 50
    })

    // Animate each number individually on scroll
    gsap.utils.toArray(".number-item").forEach((item, index) => {
      gsap.to(item, {
        scale: 0 * index + 1,
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: item,
          start: 'top 85%',
          end: 'bottom 15%',
          scrub: true,
          toggleActions: 'play none none reverse'
        }
      })
    })

    // Animate the gradient text effect
    gsap.utils.toArray(".gradient-text").forEach((text, index) => {
      gsap.fromTo(text, 
        {
          backgroundPosition: '200% 0%'
        },
        {
          backgroundPosition: '0% 0%',
          duration: 2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: text,
            start: 'top 85%',
            end: 'bottom 15%',
            scrub: true,
            toggleActions: 'play none none reverse'
          }
        }
      )
    })
  }, { scope: containerRef })

  return (
    <section className="relative min-h-screen mb-10 bg-black pt-10 pb-2 px-4 sm:px-6 lg:px-8">
      {/* Background Grid Pattern */}
      

      <div ref={containerRef} className="relative z-10 max-w-7xl mx-auto">
        <div className="flex flex-col items-center justify-center min-h-screen space-y-16">
          
          {/* 20M+ - The Tronix community */}
          <div className="relative number-item text-center">
            <div 
              className="gradient-text text-8xl sm:text-9xl lg:text-[14rem] font-medium leading-none mb-4"
             
            >
              30K+
            </div>
            <p className="text-white text-xl sm:text-2xl font-medium">
              The Evian community
            </p>
            <div className="absolute inset-0 w-full h-full bg-black -z-10 opacity-50">
                <img src={'/pattern3.svg'} alt="hero-bg" className='w-[100%] h-[100%] xl:w-full xl:h-full' />
            </div>
          </div>

          {/* 100+ - The Tronix countries */}
          <div className="number-item text-center">
            <div 
              className="gradient-text text-8xl sm:text-9xl lg:text-[14rem] font-medium leading-none mb-4"
              style={{
                background: 'linear-gradient(90deg, #ffffff 0%, #ffffff 60%, #666666 100%)',
                backgroundSize: '200% 100%',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              11+
            </div>
            <p className="text-white text-xl sm:text-2xl font-medium">
              The Evian countries
            </p>
          </div>

          {/* 67B+ - Total transactions */}
          <div className="number-item text-center">
            <div 
              className="gradient-text text-8xl sm:text-9xl lg:text-[14rem] font-medium leading-none mb-4"
              style={{
                background: 'linear-gradient(90deg, #ffffff 0%, #ffffff 60%, #666666 100%)',
                backgroundSize: '200% 100%',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              8K+
            </div>
            <p className="text-white text-xl sm:text-2xl font-medium">
              Total requests
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Numbers
