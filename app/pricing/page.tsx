'use client'
import Navbar from '@/app/New/Navbar';
import Footer from '@/app/New/Footer';
import Link from 'next/link';
import {useGSAP} from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useUser } from '@/app/contexts/UserContext'

gsap.registerPlugin(ScrollTrigger)

export default function PricingPage() {
  const { user } = useUser();

  useGSAP(() => {
    gsap.from('.pricing-text', {
      opacity: 0,
      y: 0,
      filter: 'blur(20px)',
      duration: 2,
      ease: 'power1.inOut'
    })

    gsap.set('.pricing-card', {
      opacity: 0,
      y: 50,
      scale: 0.95
    })

    gsap.to('.pricing-card', {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 1.5,
      ease: 'power2.out',
      stagger: 0.2,
      scrollTrigger: {
        trigger: '.pricing-cards',
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none none'
      }
    })
  }, [])

  const plans = [
    {
      name: 'Free',
      price: '$0',
      period: '/month',
      description: 'Perfect for getting started with AI-powered document analysis',
      features: [
        '2 document uploads',
        'Basic AI chat functionality',
        'Standard response time',
        'Community support',
        'Basic analytics'
      ],
      cta: 'Get Started Free',
      ctaLink: user ? '/chat' : '/signup',
      popular: false,
      gradient: 'from-gray-600 to-gray-700'
    },
    {
      name: 'Pro',
      price: '$5',
      period: '/month',
      description: 'Ideal for professionals and small teams',
      features: [
        'Unlimited document uploads',
        'Advanced AI chat with context',
        'Priority response time',
        'Email support',
        'Advanced analytics & insights',
        'Custom document categories',
        'Export conversations'
      ],
      cta: 'Start Pro Trial',
      ctaLink: user ? '/chat' : '/signup',
      popular: true,
      gradient: 'from-[#8F72D0] to-[#347FB0]'
    },
    {
      name: 'Enterprise',
      price: '$20',
      period: '/month',
      description: 'For large organizations with advanced needs',
      features: [
        'Everything in Pro',
        'Custom AI model training',
        'API access',
        'Dedicated account manager',
        'Custom integrations',
        'Advanced security features',
        'SLA guarantee',
        'On-premise deployment option'
      ],
      cta: 'Contact Sales',
      ctaLink: '/contact',
      popular: false,
      gradient: 'from-purple-600 to-blue-600'
    }
  ]

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
        <section className="relative overflow-hidden xl:pb-20 bg-black w-[99vw]">
          <div className="flex flex-col items-center justify-start pt-40 xl:pt-28 xl:justify-center min-h-[50vh] xl:min-h-[80vh] overflow-hidden xl:pb-28 pb-20 px-6 text-center">
            
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

            {/* Background Effect Images */}
            <div className='absolute -top-[40%] xl:-right-[35%] md:-right-[90%] -right-[150%] z-0'>
              <img src={'/Effect24.png'} alt="hero-bg" className='w-[60%] h-[50%] xl:w-full xl:h-full' />
            </div>
            <div className='absolute -bottom-[10%] xl:-left-[20%] md:-left-[50%] -left-[70%]'>
              <img src={'/Effect25.png'} alt="hero-bg" className='w-[60%] h-[50%] lg:w-full lg:h-full' />
            </div>
            
            {/* Circular Border Element */}
            <div className="absolute left-1/2 -translate-x-1/2 -top-64 w-[70vw] h-[70vw] border-2 border-gray-500/20 rounded-[50%] transform"></div>
            
            <div className="w-full z-20 text-center px-4 h-[50vh] lg:h-[70vh] xl:h-[100vh] flex flex-col justify-center">
              <h1 className="pricing-text text-4xl md:text-5xl font-[500] text-white mb-8 max-w-3xl mx-auto leading-tight">
                Choose Your Plan
              </h1>
              <p className="pricing-text text-lg md:text-lg text-gray-300 mb-8 max-w-3xl mx-auto leading-tight font-manrope">
                Unlock the full potential of AI-powered document analysis with our flexible pricing plans designed for every need.
              </p>
            </div>
          </div>
        </section>

        {/* Pricing Cards Section */}
        <section className="py-20 px-4 bg-black">
          <div className="max-w-7xl mx-auto">
            <div className="pricing-cards grid md:grid-cols-3 gap-8">
              {plans.map((plan, index) => (
                <div 
                  key={plan.name}
                  className={`pricing-card relative bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 shadow-2xl transition-all duration-300 hover:scale-105 hover:shadow-3xl ${
                    plan.popular ? 'ring-2 ring-[#8F72D0] ring-opacity-50' : ''
                  }`}
                >
                  {/* Popular Badge */}
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <div className="bg-gradient-to-r from-[#8F72D0] to-[#347FB0] text-white px-6 py-2 rounded-full text-sm font-medium">
                        Most Popular
                      </div>
                    </div>
                  )}

                  {/* Plan Header */}
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-semibold text-white mb-2">{plan.name}</h3>
                    <div className="flex items-baseline justify-center mb-4">
                      <span className="text-5xl font-bold text-white">{plan.price}</span>
                      <span className="text-gray-400 ml-2">{plan.period}</span>
                    </div>
                    <p className="text-gray-300 text-sm font-manrope">{plan.description}</p>
                  </div>

                  {/* Features List */}
                  <div className="space-y-4 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center space-x-3">
                        <div className="w-5 h-5 bg-gradient-to-r from-[#8F72D0] to-[#347FB0] rounded-full flex items-center justify-center flex-shrink-0">
                          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="text-gray-300 text-sm font-manrope">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <Link
                    href={plan.ctaLink}
                    className={`w-full py-4 px-6 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl text-center block ${
                      plan.popular
                        ? 'bg-gradient-to-r from-[#8F72D0] to-[#347FB0] hover:from-[#7A5FBA] hover:to-[#2D6BA0] text-white'
                        : 'bg-white/10 hover:bg-white/20 text-white border border-white/30'
                    }`}
                  >
                    {plan.cta}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 px-4 bg-black">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-[600] text-white mb-6">Frequently Asked Questions</h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto font-manrope">
                Everything you need to know about our pricing and plans
              </p>
            </div>
            
            <div className="space-y-8">
              <div className="bg-white/5 backdrop-blur-sm border border-white/20 rounded-2xl p-8">
                <h3 className="text-xl font-semibold text-white mb-4">Can I change plans anytime?</h3>
                <p className="text-gray-300 font-manrope">
                  Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately, and we'll prorate any billing differences.
                </p>
              </div>
              
              <div className="bg-white/5 backdrop-blur-sm border border-white/20 rounded-2xl p-8">
                <h3 className="text-xl font-semibold text-white mb-4">Is there a free trial?</h3>
                <p className="text-gray-300 font-manrope">
                  Yes! All paid plans come with a 14-day free trial. No credit card required to start your trial.
                </p>
              </div>
              
              <div className="bg-white/5 backdrop-blur-sm border border-white/20 rounded-2xl p-8">
                <h3 className="text-xl font-semibold text-white mb-4">What payment methods do you accept?</h3>
                <p className="text-gray-300 font-manrope">
                  We accept all major credit cards, PayPal, and for Enterprise plans, we can arrange invoice billing.
                </p>
              </div>
              
              <div className="bg-white/5 backdrop-blur-sm border border-white/20 rounded-2xl p-8">
                <h3 className="text-xl font-semibold text-white mb-4">Do you offer refunds?</h3>
                <p className="text-gray-300 font-manrope">
                  We offer a 30-day money-back guarantee for all paid plans. If you're not satisfied, we'll refund your payment.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 bg-black">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-white/5 backdrop-blur-lg border border-white/20 rounded-2xl p-12 shadow-2xl">
              <h2 className="text-4xl font-[600] text-white mb-6">Ready to Get Started?</h2>
              <p className="text-xl text-gray-300 mb-8 font-manrope">
                Join thousands of users who are already using EvianAI to transform their document workflow.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href={user ? '/chat' : '/signup'}
                  className="relative font-medium font-manrope text-[16px] text-white px-8 py-3 rounded-full text-lg overflow-hidden group transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                  style={{
                    background: 'linear-gradient(to right, #8F72D0, #347FB0)'
                  }}
                >
                  <span className="relative z-10 transition-colors duration-300 group-hover:text-gray-900">
                    {user ? 'Start Chatting' : 'Get Started Free'}
                  </span>
                  <div 
                    className="absolute inset-0 bg-white transform scale-y-0 origin-bottom transition-transform duration-300 group-hover:scale-y-100 rounded-full"
                    style={{
                      transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)'
                    }}
                  ></div>
                </Link>
                <Link
                  href="/about"
                  className="relative font-medium font-manrope text-[16px] text-white px-8 py-3 rounded-full text-lg overflow-hidden group transition-all duration-300 transform hover:scale-105"
                  style={{
                    background: '#1a1a1a'
                  }}
                >
                  <span className="relative z-10 transition-colors duration-300 group-hover:text-white">
                    Learn More
                  </span>
                  <div 
                    className="absolute inset-0 bg-gradient-to-r from-[#8F72D0] to-[#347FB0] transform scale-y-0 origin-bottom transition-transform duration-300 group-hover:scale-y-100 rounded-full"
                    style={{
                      transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)'
                    }}
                  ></div>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
      
      <Footer />
    </div>
  );
}
