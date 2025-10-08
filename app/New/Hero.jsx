import Link from 'next/link'
import {useGSAP} from '@gsap/react'
import { gsap } from 'gsap'
import { useUser } from '../contexts/UserContext'


const Hero = () => {

  const {user} =  useUser()

  useGSAP(() => {
    gsap.from('.hero-text', {
      opacity: 0,
      y: 0,
      filter: 'blur(20px)',
      duration: 2,
      ease: 'power1.inOut'
    })
  },[])
  return (
    <section className="relative overflow-hidden xl:pb-20  bg-black w-[99vw] ">
      <div className="  flex flex-col items-center justify-start pt-40 xl:pt-28  xl:justify-center min-h-[50vh] xl:min-h-[120vh]  overflow-hidden xl:pb-28 pb-20  px-6 text-center">
      {/* Background Elements */}
      <div className="absolute inset-0">
        {/* Abstract Lines */}
        <div className="absolute top-20 left-10 w-32 h-0.5 bg-gradient-to-r from-transparent via-white/20 to-transparent transform rotate-12"></div>
        <div className="absolute top-40 right-20 w-24 h-0.5 bg-gradient-to-r from-transparent via-white/15 to-transparent transform -rotate-6"></div>
        <div className="absolute bottom-40 left-1/4 w-40 h-0.5 bg-gradient-to-r from-transparent via-white/10 to-transparent transform rotate-45"></div>
        
        {/* Glowing Stars */}
        <div className="absolute top-32 right-32 w-2 h-2 bg-white rounded-full opacity-60 animate-pulse z-10"></div>
        <div className="absolute top-60 right-16 w-1 h-1 bg-white rounded-full opacity-40 animate-pulse delay-1000 z-10"></div>
        <div className="absolute bottom-32 right-24 w-1.5 h-1.5 bg-white rounded-full opacity-50 animate-pulse delay-500 z-10"></div>
        <div className="absolute top-80 right-40 w-1 h-1 bg-white rounded-full opacity-30 animate-pulse delay-2000 z-10"></div>
       
      </div>

      {/* Main Content */}
      
      
      <div className='absolute -top-[40%] xl:-right-[35%] md:-right-[90%] -right-[150%] z-0'>
          <img src={'/Effect24.png'} alt="hero-bg" className='w-[60%] h-[50%] xl:w-full xl:h-full' />
        </div>
        <div className='absolute -bottom-[10%] xl:-left-[20%] md:-left-[50%] -left-[70%]'>
          <img src={'/Effect25.png'} alt="hero-bg" className='w-[60%] h-[50%] lg:w-full lg:h-full' />
        </div>
      
        <div className=" absolute left-1/2 -translate-x-1/2 -top-64 w-[70vw] h-[70vw] border-2 border-gray-500/20 rounded-[50%] transform "></div>
        
       
        {/* Announcement Banner */}
        <div className="hero-text mb-1 flex z-20 items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 border border-[#347FB0]">
          <div className="flex -space-x-2">
            <div className="w-8 h-8 rounded-full border-2 border-white overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1522556189639-b150ed9c4330?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                alt="User 1"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.style.display = 'none'
                  e.target.nextSibling.style.display = 'block'
                }}
              />
              <div className="w-8 h-8 bg-gradient-to-r from-pink-400 to-pink-600 rounded-full border-2 border-white hidden"></div>
            </div>
            <div className="w-8 h-8 rounded-full border-2 border-white overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                alt="User 2"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.style.display = 'none'
                  e.target.nextSibling.style.display = 'block'
                }}
              />
              <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full border-2 border-white hidden"></div>
            </div>
            <div className="w-8 h-8 rounded-full border-2 border-white overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1507152832244-10d45c7eda57?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                alt="User 3"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.style.display = 'none'
                  e.target.nextSibling.style.display = 'block'
                }}
              />
              <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-green-600 rounded-full border-2 border-white hidden"></div>
            </div>
          </div>
           <span className="text-white text-sm font-medium font-manrope">
             EvianAI has surpassed <span className="text-yellow-400 font-bold">20K+ </span>
           </span>
        </div>

         {/* Main Headline */}
         <h1 className="hero-text text-[32px] flex flex-col gap-0 items-center justify-center z-20 md:text-[64px] xl:text-[88px] font-[600] text-white mb-2 pt-2 xl:pt-0 leading-[1.1]">
           <span className=" p-0 m-0">Artificial Intelligence</span>
         
           <span className="p-0 m-0">
             that Remembers
           </span>
         </h1>

         {/* Description */}
         <p className="hero-text text-xl z-20 font-light md:text-[16px] text-[#cdc8c8] mb-12 max-w-xl leading-relaxed font-manrope">
         Built at the intersection of memory and reasoning, our system doesn’t just process information — it perceives it.
         </p>

        

        {/* CTA Buttons */}
        <div className="flex flex-col hero-text  sm:flex-row gap-4 items-center">
           <Link
             href={user ? '/chat' : '/signup'}
             className="relative font-medium font-manrope text-[16px] text-white px-8 py-3 rounded-full text-lg  overflow-hidden group transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
             style={{
               background: 'linear-gradient(to right, #8F72D0, #347FB0)'
             }}
           >
             <span className="relative z-10 transition-colors duration-300 group-hover:text-gray-900">
              {user ? 'Ask Evian' : 'Get Started for Free'}
             </span>
             <div 
               className="absolute inset-0 bg-white transform scale-y-0 origin-bottom transition-transform duration-300 group-hover:scale-y-100"
               style={{
                 transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)'
               }}
             ></div>
           </Link>
           <Link
             href="/about"
             className="relative font-medium font-manrope text-[16px] text-white px-8 py-3 rounded-full text-lg  overflow-hidden group transition-all duration-300 transform hover:scale-105"
             style={{
               background: '#1a1a1a'
             }}
           >
             <span className="relative z-10 transition-colors duration-300 group-hover:text-white">
               How It Works
             </span>
             <div 
               className="absolute inset-0 bg-gradient-to-r from-[#8F72D0] to-[#347FB0] transform scale-y-0 origin-bottom transition-transform duration-300 group-hover:scale-y-100"
               style={{
                 transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)'
               }}
             ></div>
           </Link>
        </div>
      </div>
 

      {/* Bottom Gradient Overlay */}
      {/* <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/20 to-transparent"></div> */}
    </section>
  )
}

export default Hero
