'use client'
import Navbar from '@/app/New/Navbar';
import Footer from '@/app/New/Footer';
import Link from 'next/link';
import CTA from '../New/CTA';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-indigo-900/20"></div>
      
      {/* Animated background elements */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      
      <Navbar />
      
      <div className="relative z-10">
        {/* Hero Section */}
        <section className=" relative overflow-hidden">
        <div className='absolute -top-[30%] xl:-left-[35%] md:-left-[90%] -left-[40%] -z-0'>
          <img src={'/Effect24.png'} alt="hero-bg" className='w-[60%] h-[50%] xl:w-full xl:h-full -z-10' />
        </div>
        <div className='absolute -bottom-[40%] xl:-right-[18%] md:-right-[50%] -right-[140%] -z-0'>
          <img src={'/Effect25.png'} alt="hero-bg" className='w-[60%] h-[50%] lg:w-full lg:h-full -z-10' />
        </div>
          <div className="w-full z-20 text-center px-4  h-[50vh] lg:h-[70vh] xl:h-[100vh] flex flex-col  justify-center ">
            <h1 className="hidden md:block text-4xl md:text-5xl font-bold text-white mb-8 max-w-3xl mx-auto leading-tight ">
            About Us
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-tight font-manrope">
            We designed this agent to think with you — not for you. It retrieves what matters, connects ideas, and keeps track of the story as it unfolds.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
               <Link 
                 href="/upload" 
                 className="relative bg-gradient-to-r from-[#8F72D0] to-[#347FB0] hover:from-[#7A5FBA] hover:to-[#2D6BA0] text-white px-8 py-4 rounded-full font-medium transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl overflow-hidden group"
               >
                 <span className="relative z-20 transition-colors duration-300 group-hover:text-gray-900">
                   Get Started
                 </span>
                 <div 
                   className="absolute inset-0 bg-white rounded-full transform scale-y-0 origin-bottom transition-transform duration-300 group-hover:scale-y-100 z-10"
                   style={{
                     transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)'
                   }}
                 ></div>
               </Link>
               <Link 
                 href="/chat" 
                 className="border z-30 border-white/30 text-white hover:bg-white/10 px-8 py-4 rounded-full font-medium transition-all duration-300 transform hover:scale-105"
               >
                 Try Demo
               </Link>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-20 px-2 ">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-bold text-white mb-6">Our Mission</h2>
                <p className="text-lg text-gray-300 mb-6 leading-relaxed font-manrope">
                EvianAI is not a tool. It’s an evolving intelligence — built to transform how humans connect with knowledge.

At its core, Evian learns from the documents, data, and ideas you share. It doesn’t just retrieve; it reasons. It weaves memory into meaning, turning static information into a continuous exchange of insight.
                </p>
                <p className="text-lg text-gray-300 mb-8 leading-relaxed font-manrope">
                We believe that intelligence should be contextual, adaptive, and quietly powerful. Kora exists to make knowledge fluid — something you can speak to, explore, and grow with.
                </p>
                <div className="space-y-4 font-manrope">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-[#a06fd6] rounded-full"></div>
                    <span className="text-gray-300">Advanced RAG (Retrieval-Augmented Generation) technology</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-[#a06fd6] rounded-full"></div>
                    <span className="text-gray-300">Secure document processing and storage</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-[#a06fd6] rounded-full"></div>
                    <span className="text-gray-300">Intuitive conversational interface</span>
                  </div>
                </div>
              </div>
              <div className="bg-gray-800/20 backdrop-blur-sm border border-white/20 rounded-2xl p-8">
                <div className="text-center">
                  {/* <div className="text-6xl mb-4">🤖</div> */}
                  <img src="/icon1.svg" alt="Intelligent Processing" className="w-16 h-16 mb-4 mx-auto" />
                  <h3 className="text-2xl font-bold text-white mb-4">Intelligent Processing</h3>
                  <p className="text-gray-300 font-manrope">
                    Our AI understands context, maintains accuracy, and provides meaningful insights from your documents.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Technology Section */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-[600] text-white mb-6">Precision through simplicity</h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto font-manrope">
              We build for people — not prompts. The goal is seamless dialogue between thought and technology.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-gray-800/20 backdrop-blur-sm border border-white/20 rounded-2xl p-8 text-center">
                {/* <div className="text-4xl mb-4">🧠</div> */}
                <img src="/icon1.svg" alt="Smart Retrieval" className="w-16 h-16 mb-4 mx-auto" />
                <h3 className="text-xl font-bold text-white mb-4">Smart Retrieval</h3>
                <p className="text-gray-300 font-manrope">
                  Advanced vector embeddings and semantic search ensure we find the most relevant information from your documents.
                </p>
              </div>
              
              <div className="bg-gray-800/20 backdrop-blur-sm border border-white/20 rounded-2xl p-8 text-center">
                {/* <div className="text-4xl mb-4">💬</div> */}
                <img src="/icon3.svg" alt="Natural Conversations" className="w-16 h-16 mb-4 mx-auto" />
                <h3 className="text-xl font-bold text-white mb-4">Natural Conversations</h3>
                <p className="text-gray-300 font-manrope">
                  Large language models generate human-like responses that feel natural and engaging in every interaction.
                </p>
              </div>
              
              <div className="bg-gray-800/20 backdrop-blur-sm border border-white/20 rounded-2xl p-8 text-center">
                {/* <div className="text-4xl mb-4">🔒</div> */}
                <img src="/icon2.svg" alt="Secure & Private" className="w-16 h-16 mb-4 mx-auto" />
                <h3 className="text-xl font-bold text-white mb-4">Secure & Private</h3>
                <p className="text-gray-300 font-manrope">
                  Your documents are processed securely with enterprise-grade encryption and privacy protection.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-[600] text-white mb-6">Why Choose EvianAI?</h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto font-manrope">
                Experience the next generation of document interaction with features designed for modern workflows
              </p>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-12">
              <div className="space-y-8">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-[#a06fd6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-[600] text-white mb-2">Lightning Fast Responses</h3>
                    <p className="text-gray-300 font-manrope">Get instant answers from your documents with our optimized processing pipeline.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-[#a06fd6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-[600] text-white mb-2">Accurate & Reliable</h3>
                    <p className="text-gray-300 font-manrope">RAG technology ensures responses are grounded in your actual document content.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-[#a06fd6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">User-Friendly Interface</h3>
                    <p className="text-gray-300 font-manrope">Intuitive design makes complex document analysis accessible to everyone.</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-800/20 backdrop-blur-sm border border-white/20 rounded-2xl p-8">
                <h3 className="text-2xl font-[600] text-white mb-6">Get Started in Minutes</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-[#a06fd6] rounded-full flex items-center justify-center text-white font-bold text-sm"></div>
                    <span className="text-gray-300 font-manrope">Upload your documents (PDF, TXT)</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-[#a06fd6] rounded-full flex items-center justify-center text-white font-bold text-sm"></div>
                    <span className="text-gray-300 font-manrope">Our AI processes and indexes your content</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-[#a06fd6] rounded-full flex items-center justify-center text-white font-bold text-sm"></div>
                    <span className="text-gray-300 font-manrope">Start chatting and get instant answers</span>
                  </div>
                </div>
                 <Link 
                   href="/upload" 
                   className="mt-6 inline-block relative bg-gradient-to-r from-[#8F72D0] to-[#347FB0] hover:from-[#7A5FBA] hover:to-[#2D6BA0] text-white px-6 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl overflow-hidden group"
                 >
                   <span className="relative text-sm font-light z-20 transition-colors duration-300 group-hover:text-gray-900">
                     Start Now
                   </span>
                   <div 
                     className="absolute inset-0 bg-white rounded-full transform scale-y-0 origin-bottom transition-transform duration-300 group-hover:scale-y-100 z-10"
                     style={{
                       transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)'
                     }}
                   ></div>
                 </Link>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
       <CTA />
      </div>
      
      <Footer />
    </div>
  );
}
