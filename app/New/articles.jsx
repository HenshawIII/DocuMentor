import React from 'react'
import {useGSAP} from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)


const Articles = () => {
  useGSAP(() => {
    gsap.set('.articles-text', {
      opacity: 0,
      y: 50,
      filter: 'blur(20px)'
    })

    gsap.to('.articles-text', {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: 2,
      ease: 'power1.inOut',
      scrollTrigger: {
        trigger: '.articles-text',
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none none'
      }
    })
  },[])
  return (
    <section id="blog" className="relative w-[94%] xl:w-[97%]  my-2 mx-auto py-20 px-4 sm:px-6 lg:px-8 bg-[#0C0C0C] rounded-3xl  ">
      {/* Background Gradient Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"></div>
        <div className="absolute top-10 left-10 w-96 h-96 bg-green-500/20 rounded-full blur-3xl"></div>
        <div className="absolute top-20 left-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"></div>
        <div className="absolute top-20 left-40 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-40 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[50%] right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-4 right-4 w-16  h-16">
              <img src={'/star.svg'} alt="star" className="w-full h-full animate-pulse" />
            </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Top Section - Heading and Description */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center mb-16">
          
          {/* Left Side - Main Heading with Star Icon */}
          <div className="relative col-span-2">
            {/* Star Icon */}
            <div className="absolute -top-4 -left-4 w-8 h-8">
              <img src={'/star.svg'} alt="star" className="w-full h-full animate-pulse" />
            </div>
           

            <h2 className="articles-text text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-[500]  text-white leading-tight">
              Insights from AI experts and researchers
            </h2>
          </div>

          {/* Right Side - Supporting Text */}
          <div className="flex items-start col-span-1">
            <p className="articles-text text-[16px] text-[#C8C4C4] leading-relaxed font-manrope max-w-2xl">
              Deep dives into RAG technology, document intelligence, and the future of conversational AI. Expert insights for developers, researchers, and AI practitioners.
            </p>
          </div>
        </div>

        {/* Horizontal Separator with Indicators */}
        {/* Bottom Pagination Indicator */}
        <div className="lg:mt-10 mb-10 mt-5 flex items-center justify-center px-8">
          {/* Left line segment */}
          <div className="h-[0.1px] bg-gradient-to-r from-transparent via-white/20 to-white/40 flex-1 w-full"></div>
          
          {/* Circle in the middle */}
          <div className="xl:w-6 xl:h-6 w-4 h-4 bg-transparent border-2 border-gray-200/50 rounded-full mx-4 relative">
            {/* Inner circle for depth */}
           
          </div>
          
          {/* Right line segment */}
          <div className="h-[0.1px] bg-gradient-to-l from-transparent via-white/20 to-white/40 flex-1 w-full"></div>
        </div>

         {/* Article Preview Card */}
         <div className="relative w-full">
           <div className="bg-transparent w-full grid grid-cols-1 lg:grid-cols-2 items-start min-h-screen backdrop-blur-sm rounded-3xl p-4 lg:p-12 relative overflow-hidden gap-8">
             
             

             <div className="relative z-10 grid grid-cols-1 gap-8 items-center order-2 lg:order-1">
              
              {/* Left Side - Article Content */}
              <div className="space-y-6 border-t border-white/10 pt-8">
                {/* Date */}
                <div className="text-purple-400 font-medium text-sm font-manrope">
                  June 13, 2025
                </div>

                {/* Article Title */}
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-[500] text-white leading-tight">
                  How Does RAG Technology Work?
                </h3>

                {/* Article Snippet */}
                <p className="text-lg text-white/80 leading-relaxed font-manrope text-[16px] font-light">
                  Retrieval-Augmented Generation combines information retrieval with language generation, enabling AI to access and cite real documents for accurate, contextual responses.
                </p>

               
              </div>

              <div className="space-y-6 border-t border-white/10 pt-8">
                {/* Date */}
                <div className="text-purple-400 font-medium text-sm font-manrope">
                  June 13, 2025
                </div>

                {/* Article Title */}
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-[500] text-white leading-tight">
                  Vector Embeddings Explained
                </h3>

                {/* Article Snippet */}
                <p className="text-lg text-white/80 leading-relaxed font-manrope text-[16px] font-light">
                  Learn how vector embeddings transform text into mathematical representations, enabling semantic search and intelligent document retrieval in RAG systems.
                </p>

               
              </div>

              <div className="space-y-6 border-t border-white/10 pt-8">
                {/* Date */}
                <div className="text-purple-400 font-medium text-sm font-manrope">
                  June 13, 2025
                </div>

                {/* Article Title */}
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-[500] text-white leading-tight">
                  Document Intelligence Best Practices
                </h3>

                {/* Article Snippet */}
                <p className="text-lg text-white/80 leading-relaxed font-manrope text-[16px] font-light">
                  Discover proven strategies for processing, indexing, and querying documents effectively in AI-powered systems for maximum accuracy and performance.
                </p>

                
              </div>

             
            </div>
               {/* Right Side - 3D Chain Graphic */}
               <div className="relative flex-col justify-center items-center rounded-3xl bg-[#444343]/20 lg:p-10 p-4 overflow-hidden order-1 lg:order-2 z-10">
                
                
                <div className="relative w-full h-full xl:scale-150 my-20  lg:w-80 lg:h-80 z-10 mx-auto">
                    <img src={'/distortion3.png'} alt="chain" className="w-full h-full object-contain" />
                    {/* Square Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="w-full h-full" style={{
                    backgroundImage: `
                      linear-gradient(rgba(255,255,255,0.1) 1px, transparent 2px),
                      linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 2px)
                    `,
                    backgroundSize: '20px 20px'
                  }}></div>
                </div>
                </div>
                <div className="space-y-6 scale-90 lg:pt-8 pt-2">
                {/* Date */}
                <div className="text-purple-400 font-medium text-sm font-manrope">
                  June 13, 2025
                </div>

                {/* Article Title */}
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-[500] text-white leading-tight">
                  The Future of Conversational AI
                </h3>

                {/* Article Snippet */}
                <p className="text-lg text-white/80 leading-relaxed font-manrope text-[16px] font-light">
                  Explore emerging trends in conversational AI, from advanced RAG implementations to multimodal document understanding and real-time knowledge synthesis.
                </p>

                {/* Read More Button */}
                <button className="inline-flex items-center gap-2 text-white/90 hover:text-white font-medium font-manrope transition-colors duration-300 group">
                  <span>Read Full Article</span>
                  <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>

              </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Articles
