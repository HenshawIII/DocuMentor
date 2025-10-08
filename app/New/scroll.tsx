import React from 'react'

const scroll = () => {
  const logos = [
    { src: '/daz.svg', alt: 'Dazzle' },
    { src: '/Dox.svg', alt: 'Dox' },
    { src: '/jah.svg', alt: 'Jah' },
    { src: '/som.svg', alt: 'Som' },
    { src: '/rix.svg', alt: 'Rix' }
  ]

  return (
    <>
     {/* Partner Logos Section - Infinite Scroll */}
     <div className="overflow-hidden mb-16 w-[90%] mx-auto relative">
          <div 
            className="flex items-center gap-8 sm:gap-12 whitespace-nowrap" 
            style={{ 
              width: 'max-content',
              animation: 'scroll-left 20s linear infinite'
            }}
          >
            {/* First set of logos */}
            {logos.map((logo, index) => (
              <div key={`first-${index}`} className="flex flex-col items-center group flex-shrink-0">
                <img 
                  src={logo.src} 
                  alt={logo.alt} 
                  className='w-24 h-24 sm:w-20 sm:h-20 rounded-full bg-transparent flex items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-300' 
                />
              </div>
            ))}

            {/* Duplicate set for seamless loop */}
            {logos.map((logo, index) => (
              <div key={`second-${index}`} className="flex flex-col items-center group flex-shrink-0">
                <img 
                  src={logo.src} 
                  alt={logo.alt} 
                  className='w-24 h-24 sm:w-20 sm:h-20 rounded-full bg-transparent flex items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-300' 
                />
              </div>
            ))}

            {/* Third set for extra smoothness */}
            {logos.map((logo, index) => (
              <div key={`third-${index}`} className="flex flex-col items-center group flex-shrink-0">
                <img 
                  src={logo.src} 
                  alt={logo.alt} 
                  className='w-24 h-24 sm:w-20 sm:h-20 rounded-full bg-transparent flex items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-300' 
                />
              </div>
            ))}
          </div>
        </div>
    </>
  )
}

export default scroll