'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import {useUser} from '@/app/contexts/UserContext'
import { useRouter } from 'next/navigation'

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const {user,signOut} = useUser()
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop
      setIsScrolled(scrollTop > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleSignOut = async () => {
    await signOut();
    window.location.href = '/';
    setIsMobileMenuOpen(false);
  };
  // const navigate = useNavigate()
  const router = useRouter()
  return (
    <>
      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-20 z-40 lg:hidden"
          onClick={closeMobileMenu}
        />
      )}

      {/* Mobile Sidebar */}
      <div className={`
        fixed top-0 right-0 h-full w-80 bg-gradient-to-b from-gray-900/95 to-black/95 backdrop-blur-xl border-l border-white/20 shadow-2xl transform transition-transform duration-300 ease-out z-50 lg:hidden
        ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}
      `}>
        {/* Header */}
        <div className="p-6 border-b border-white/20">
          <div className="flex items-center justify-end mb-4">
           
            <button
              onClick={closeMobileMenu}
              className="p-2 rounded-xl hover:bg-white/10 transition-all duration-300 group self-end order-2"
            >
              <svg className="w-6 h-6 text-gray-400 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          {user && (
            <div className="bg-white/5 rounded-xl p-3">
              <p className="text-sm text-gray-300">Hi {user.user_metadata?.name || user.email || 'User'}</p>
            </div>
          )}
        </div>
        
        {/* Navigation Links */}
        <nav className="p-4 space-y-2">
          <Link
            href="/"
            className="flex items-center space-x-3 p-3 rounded-xl hover:bg-white/5 transition-all duration-300 group"
            onClick={closeMobileMenu}
          >
            <svg className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <span className="text-gray-300 group-hover:text-white transition-colors">Home</span>
          </Link>
          <Link
            href="/docs"
            className="flex items-center space-x-3 p-3 rounded-xl hover:bg-white/5 transition-all duration-300 group"
            onClick={closeMobileMenu}
          >
            <svg className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            <span className="text-gray-300 group-hover:text-white transition-colors">Docs</span>
          </Link>
          <Link
            href="/chat"
            className="flex items-center space-x-3 p-3 rounded-xl hover:bg-white/5 transition-all duration-300 group"
            onClick={closeMobileMenu}
          >
            <svg className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <span className="text-gray-300 group-hover:text-white transition-colors">Chat</span>
          </Link>
          <Link
            href="/about"
            className="flex items-center space-x-3 p-3 rounded-xl hover:bg-white/5 transition-all duration-300 group"
            onClick={closeMobileMenu}
          >
            <span className="text-gray-300 group-hover:text-white transition-colors">About</span>
          </Link>
        </nav>
      </div>

      {/* Desktop Navbar */}
      <nav className={`absolute top-0 left-0 right-0 z-40 transition-all duration-300 ${
         'bg-transparent'
      }`}>
        <div className=" mx-auto px-6 md:px-12 md:py-6 py-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-[#8F72D0] rotate-[45deg] to-[#347FB0] rounded-lg flex items-center justify-center">
                <span className="absolute text-white font-bold text-lg -rotate-[45deg]">X</span>
              </div>
              <Link href="/" className="px-2 text-2xl font-[600] text-white hover:text-gray-300 transition-colors">
                EvianAI
              </Link>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden bg-slate-50/[0.08] rounded-full py-4 px-12 lg:flex items-center space-x-8">
              <Link
                href="/"
                className="text-white hover:text-gray-300 transition-colors font-manrope font-light text-[16px]"
              >
                Home
              </Link>
              <Link
                href="/docs"
                className="text-white hover:text-gray-300 transition-colors font-manrope font-light text-[16px]"
              >
                Docs
              </Link>
              <Link
                href="/chat"
                className="text-white hover:text-gray-300 transition-colors font-manrope font-light text-[16px]"
              >
                Chat
              </Link>
              <Link
                href="/about"
                className="text-white hover:text-gray-300 transition-colors font-manrope font-light text-[16px]"
              >
               About
              </Link>
              <Link
                href="/#faq"
                className="text-white hover:text-gray-300 transition-colors font-manrope font-light text-[16px]"
              >
                Faq
              </Link>
            </div>

            {/* Right side: Greeting + CTA */}
            <div className="hidden lg:flex items-center space-x-4">
              {/* {user && (
                <span className="text-white font-manrope text-sm">Hi {user.user_metadata?.name || user.email || 'User'}</span>
              )} */}
              <button
               
               onClick={user ? handleSignOut : () => {router.push('/signup')}}
               className="relative font-medium font-manrope text-[16px] text-white px-6 py-2 rounded-full text-lg overflow-hidden group transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
               style={{
                 background: 'linear-gradient(to right, #8F72D0, #347FB0)'
               }}
             >
               <span className="relative z-20 transition-colors duration-300 group-hover:text-gray-900">
                {user ? 'Sign Out' : 'Get Started'}
               </span>
               <div 
                 className="absolute inset-0 bg-white rounded-full transform scale-y-0 origin-bottom transition-transform duration-300 group-hover:scale-y-100 z-10"
                 style={{
                   transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)'
                 }}
               ></div>
             </button>
            </div>

            {/* Mobile menu button */}
            <div className="lg:hidden">
              <button
                onClick={toggleMobileMenu}
                className="text-white hover:text-gray-300 focus:outline-none bg-transparent"
                aria-label="Toggle mobile menu"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar
