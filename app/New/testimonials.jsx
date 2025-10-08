import React, { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

const Testimonials = () => {
  const containerRef = useRef(null)
  const cardsRef = useRef([])
  const testimonials = [
    {
      id: 1,
      name: "Ada Nkiru.",
      title: "Professional Designer",
      quote: "EvianAI has become my second brain. I no longer skim through hundreds of pages — I ask, and it remembers. The way it links information across documents feels almost intuitive, like it understands what I am trying to find before I do.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1507152832244-10d45c7eda57?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      id: 2,
      name: "Robert M.",
      title: "Blockchain Developer",
      quote: "Working with EvianAI feels like having an analyst who never sleeps. It retrieves insights from our project archives in seconds, connects past strategies to new discussions, and keeps our team grounded in real context. It’s more than search — it iss continuity.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face&auto=format&q=80"
    },
    {
      id: 3,
      name: "Atens R.",
      title: "Architect",
      quote: "I think of EvianAI as a collaborator. It doesn’t just return information; it expands it. Conversations with it often lead to new directions — unexpected, but always precise.",
      rating: 4,
      image: "https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      id: 4,
      name: "Rado J.",
      title: "Web Developer",
      quote: "EvianAI redefines what it means to read. I upload contracts and case files, and it distills the core logic without losing nuance. It doesn’t just summarize — it interprets.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=150&h=150&fit=crop&crop=face&auto=format&q=80"
    }
  ]

  const StarRating = ({ rating }) => {
    return (
      <div className="flex gap-1">
        {[...Array(5)].map((_, index) => (
          <svg
            key={index}
            className="w-4 h-4 text-yellow-400"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
    )
  }

  useGSAP(() => {
    // Check if screen is mobile (less than 768px)
    const isMobile = window.innerWidth < 768

    // Set initial state for all cards
    gsap.set(cardsRef.current, {
      y: 0,
      scale: 1,
      opacity: 1
    })

    // Only apply animations on desktop/tablet
    if (!isMobile) {
      // Create floating animation for each card
      cardsRef.current.forEach((card, index) => {
        if (card) {
          // Different floating directions for each card
          const directions = [
            { x: 10, y: -15 }, // Top-left card: right and up
            { x: -10, y: -15 }, // Top-right card: left and up
            { x: 10, y: 15 }, // Bottom-left card: right and down
            { x: -10, y: 15 }  // Bottom-right card: left and down
          ]

          const direction = directions[index] || { x: 0, y: 0 }

          // ScrollTrigger for floating effect
          ScrollTrigger.create({
            trigger: card,
            start: "top 80%",
            end: "bottom 20%",
            scrub: 1, // Smooth scrubbing based on scroll
            onUpdate: (self) => {
              const progress = self.progress
              const floatAmount = 20 * progress // Maximum float distance
              
              gsap.to(card, {
                x: direction.x * floatAmount / 20,
                y: direction.y * floatAmount / 20,
                scale: 1 + (0.05 * progress), // Slight scale increase
                duration: 0.3,
                ease: "power2.out"
              })
            },
            onLeave: () => {
              // Return to original position when out of view
              gsap.to(card, {
                x: 0,
                y: 0,
                scale: 1,
                duration: 0.5,
                ease: "power2.out"
              })
            },
            onEnterBack: () => {
              // Animate back in when scrolling back up
              gsap.fromTo(card, {
                x: direction.x * 10,
                y: direction.y * 10,
                scale: 0.95,
                opacity: 0.8
              }, {
                x: 0,
                y: 0,
                scale: 1,
                opacity: 1,
                duration: 0.6,
                ease: "power2.out"
              })
            }
          })

          // Initial entrance animation
          gsap.fromTo(card, {
            y: 50,
            opacity: 0,
            scale: 0.9
          }, {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            delay: index * 0.2, // Staggered entrance
            ease: "power2.out"
          })
        }
      })
    } else {
      // On mobile, just do a simple fade-in without floating
      cardsRef.current.forEach((card, index) => {
        if (card) {
          gsap.fromTo(card, {
            y: 30,
            opacity: 0
          }, {
            y: 0,
            opacity: 1,
            duration: 0.6,
            delay: index * 0.1, // Faster stagger on mobile
            ease: "power2.out"
          })
        }
      })
    }
  }, { scope: containerRef })

  return (
    <section ref={containerRef} className="relative w-full mb-20 min-h-screen bg-black pb-20 pt-5 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto relative min-h-screen">
        {/* Section Header */}
        {/* <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6">
            What Our Customers Say
          </h2>
          <p className="text-lg text-white/70 font-manrope max-w-3xl mx-auto">
            Don't just take our word for it. Here's what our satisfied customers have to say about their experience with our platform.
          </p>
        </div> */}


            <div className="absolute inset-0 w-full h-full bg-black opacity-20 flex justify-center items-center">
                <img src={'/pattern3.svg'} alt="hero-bg" className='w-[100%] h-[100%] xl:w-1/2 xl:h-1/2' />
            </div>
        {/* Testimonials Grid */}
        <div className="sticky top-20 grid grid-cols-1 md:grid-cols-2 gap-8 bg-transparent ">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              ref={(el) => (cardsRef.current[index] = el)}
              className="bg-transparent backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300"
            >
              {/* Profile Section */}
              <div className="flex items-start gap-4 mb-6">
                {/* Profile Picture */}
                <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="w-full h-full object-cover rounded-full"
                    onError={(e) => {
                      // Fallback to gradient background with initial if image fails to load
                      e.target.style.display = 'none'
                      e.target.nextSibling.style.display = 'flex'
                    }}
                  />
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full items-center justify-center hidden">
                    <span className="text-white font-bold text-lg">
                      {testimonial.name.charAt(0)}
                    </span>
                  </div>
                </div>
                
                {/* Name and Title */}
                <div className="flex-1">
                  <h3 className="text-white font-semibold text-lg mb-1">
                    {testimonial.name}
                  </h3>
                  <p className="text-white/60 text-sm font-manrope">
                    {testimonial.title}
                  </p>
                </div>
              </div>

              {/* Quote */}
              <div className="mb-6">
                <p className="text-white/90 leading-relaxed font-manrope text-sm">
                  "{testimonial.quote}"
                </p>
              </div>

              {/* Star Rating */}
              <div className="flex justify-start">
                <StarRating rating={testimonial.rating} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonials
