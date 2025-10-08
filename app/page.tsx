'use client'
import Navigation from '@/app/components/Navigation';
import Link from 'next/link';
import RippleGrid from './components/RippleGrid';
import DarkVeil from './components/DarkVeil';
import { useUser } from './contexts/UserContext';
import Navbar from '@/app/New/Navbar'
import Footer from '@/app/New/Footer'
import Hero from '@/app/New/Hero'
import HomeAbout from '@/app/New/HomeAbout'
import Dyk from '@/app/New/Dyk'
import Numbers from '@/app/New/Numbers'
import Goals from '@/app/New/Goals'
import Testimonials from '@/app/New/testimonials'
import Articles from '@/app/New/articles'
import FAQ from '@/app/New/FAQ'
import CTA from '@/app/New/CTA'

export default function Home() {
  const { user } = useUser();
 
  return (
    <>
      <Navbar />
      <Hero/>
      <HomeAbout />
      <Dyk />
      <Numbers />
      {/* <Goals /> */}
      <Testimonials />
      <Articles />
      <FAQ />
      <CTA />
      <Footer />
    </>
  );
}
