import React, { useState } from 'react'

const FAQ = () => {
  const [openItems, setOpenItems] = useState({})

  const faqItems = [
    {
      id: 1,
      number: "01",
      question: "What is EvianAI and how does it work?",
      answer: "EvianAI is an intelligent RAG-powered chatbot that transforms your documents into conversational knowledge. It uses Retrieval-Augmented Generation technology to understand your documents and provide accurate, contextual answers through natural conversation."
    },
    {
      id: 2,
      number: "02", 
      question: "Is my data secure with EvianAI?",
      answer: "Yes, EvianAI uses enterprise-grade encryption and security practices. Your documents are processed securely, and we never share your data with third parties. All data is stored with industry-standard privacy protection."
    },
    {
      id: 3,
      number: "03",
      question: "What file types does EvianAI support?",
      answer: "EvianAI currently supports PDF and TXT files. We're continuously working to add support for more document formats including Word documents, PowerPoint presentations, and other common file types."
    },
    {
      id: 4,
      number: "04",
      question: "Do I need technical knowledge to use EvianAI?",
      answer: "No technical knowledge required! EvianAI features an intuitive interface where you simply upload your documents and start chatting. The AI handles all the complex processing behind the scenes."
    },
    {
      id: 5,
      number: "05",
      question: "How accurate are the AI responses?",
      answer: "EvianAI uses advanced RAG technology to ensure responses are grounded in your actual document content. The AI retrieves relevant information and generates accurate answers based on your specific documents, not general knowledge."
    },
    {
      id: 6,
      number: "06",
      question: "Can I chat with multiple documents at once?",
      answer: "Yes! You can upload multiple documents and EvianAI will intelligently search across all of them to provide comprehensive answers. The AI understands context and can reference information from different documents in a single conversation."
    }
  ]

  const toggleItem = (id) => {
    setOpenItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }))
  }

  return (
    <section className="relative w-full my-2 mx-auto py-20  rounded-3xl" id="faq">
      <div className="mx-auto">
        
        {/* Main Title */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-8">
            Frequently Asked Questions
          </h2>
        </div>

        {/* Horizontal Separator with Circle Indicator */}
        <div className="flex w-full items-center justify-center mb-16">
          <div className="flex items-center gap-4 w-full ">
            {/* Left line */}
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/20 to-white/40"></div>
            
            {/* Center hollow circle */}
            <div className="w-3 h-3 bg-transparent border border-white rounded-full"></div>
            
            {/* Right line */}
            <div className="flex-1 h-px bg-gradient-to-l from-transparent via-white/20 to-white/40"></div>
          </div>
        </div>

        {/* FAQ Items */}
        <div className="space-y-0">
          {faqItems.map((item, index) => (
            <div key={item.id}>
              {/* FAQ Item */}
              <div 
                className="flex items-center justify-between py-6 px-4 hover:bg-white/5 transition-colors duration-300 cursor-pointer group"
                onClick={() => toggleItem(item.id)}
              >
                {/* Left side - Number and Question */}
                <div className="flex items-start gap-6 flex-col lg:flex-row  w-full">
                  {/* Number */}
                  <div className="text-white/60 font-mono text-lg font-medium min-w-[3rem]">
                    ({item.number})
                  </div>
                  
                  
                  {/* Question */}
                  <div className="text-white text-lg font-medium font-manrope w-full text-left lg:text-center">
                    {item.question}
                  </div>
                  </div>

                 {/* Right side - Plus/Minus Icon */}
                 <div className="">
                   <div className="w-6 h-6 flex items-center justify-center transition-all duration-300">
                     <svg 
                       className="w-5 h-5 text-white group-hover:text-white/80" 
                       fill="none" 
                       stroke="currentColor" 
                       viewBox="0 0 24 24"
                     >
                       {/* Plus sign - horizontal line */}
                       <path 
                         strokeLinecap="round" 
                         strokeLinejoin="round" 
                         strokeWidth={2} 
                         d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                         className={`transition-all duration-300 ${
                           openItems[item.id] ? 'opacity-0 scale-0' : 'opacity-100 scale-100'
                         }`}
                       />
                       {/* Minus sign - only horizontal line */}
                       <path 
                         strokeLinecap="round" 
                         strokeLinejoin="round" 
                         strokeWidth={2} 
                         d="M6 12h12"
                         className={`transition-all duration-300 ${
                           openItems[item.id] ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
                         }`}
                       />
                     </svg>
                   </div>
                 </div>
              </div>

              {/* Answer (Expandable) */}
              <div className={`overflow-hidden transition-all duration-1000 ${
                openItems[item.id] ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
              }`}>
                <div className="px-4 pb-6">
                  <div className="text-center text-white/70 text-base leading-relaxed font-manrope">
                    {item.answer}
                  </div>
                </div>
              </div>

              {/* Separator Line (except for last item) */}
              {index < faqItems.length - 1 && (
                <div className="h-px bg-white/10 mx-4"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FAQ
