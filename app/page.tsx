'use client'
import Navigation from '@/app/components/Navigation';
import Link from 'next/link';
import RippleGrid from './components/RippleGrid';
import DarkVeil from './components/DarkVeil';
import { useUser } from './contexts/UserContext';

export default function Home() {
  const { user } = useUser();
 
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative h-screen flex items-center  justify-center overflow-hidden">
        <div style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 0}}>
          {/* <RippleGrid
            enableRainbow={false}
            gridColor="#ffffff"
            rippleIntensity={0.05}
            gridSize={10}
            gridThickness={15}
            mouseInteraction={true}
            mouseInteractionRadius={1.2}
            opacity={0.8}
          /> */}
          <DarkVeil />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-300 mb-6">
              Chat with Your
              <span className="text-blue-600"> Documents</span>
            </h1>
            <p className="text-xl text-gray-400 mb-8 max-w-3xl mx-auto">
              Upload your PDFs and text files, then ask questions about them. 
              Get instant, intelligent answers powered by AI.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href={user ? '/upload' : '/signup'}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium text-lg transition-colors"
              >
                {user ? 'Go to start' : 'Get Started Free'}
              </Link>
              {!user && <Link
                href="/login"
                className="border border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-3 rounded-lg font-medium text-lg transition-colors"
              >
                Sign In
              </Link>}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose DocuMentor?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Transform how you interact with your documents using advanced AI technology
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-white/70 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300">
              <div className="text-4xl mb-4">📄</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Easy Upload</h3>
              <p className="text-gray-600">
                Simply upload your PDF and text files. Our system processes them automatically.
              </p>
            </div>
            
            <div className="text-center p-8 bg-white/70 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300">
              <div className="text-4xl mb-4">🤖</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">AI-Powered Chat</h3>
              <p className="text-gray-600">
                Ask questions in natural language and get intelligent answers from your documents.
              </p>
            </div>
            
            <div className="text-center p-8 bg-white/70 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300">
              <div className="text-4xl mb-4">🔒</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Secure & Private</h3>
              <p className="text-gray-600">
                Your documents are encrypted and secure. Only you can access your data.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Get started in just three simple steps
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Text Items Column */}
            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold flex-shrink-0">
                  1
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Sign In</h3>
                  <p className="text-gray-600">
                    Create account and sign in to upload documents
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold flex-shrink-0">
                  2
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">AI Processing</h3>
                  <p className="text-gray-600">
                    Our AI analyzes and indexes your documents for intelligent search
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold flex-shrink-0">
                  3
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Start Chatting</h3>
                  <p className="text-gray-600">
                    Ask questions and get instant, accurate answers from your documents
                  </p>
                </div>
              </div>
            </div>
            
            {/* Logo Image Column */}
            <div className="flex justify-center lg:justify-end">
              <div className="w-80 h-80 bg-gradient-to-br from-blue-100 to-indigo-200 rounded-full flex items-center justify-center shadow-lg">
                <div className="text-8xl">🤖</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#310896]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of users who are already chatting with their documents
          </p>
          <Link
            href={user ? '/upload' : '/signup'}
            className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 hover:text-blue-200 font-medium text-lg transition-colors"
          >
         {user ? 'Go to start' : 'Start Free Trial'}
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="text-2xl">🤖</div>
                <span className="text-xl font-bold">DocuMentor</span>
              </div>
              <p className="text-gray-400">
                Transform how you interact with your documents using AI.
              </p>
            </div>
            
            <div>
             
              <ul className=" text-gray-400 flex justify-around items-center">
                <li><Link href="/upload" className="hover:text-white">Upload</Link></li>
                <li><Link href="/chat" className="hover:text-white">Chat</Link></li>
                <li><Link href="/login" className="hover:text-white">Login</Link></li>
              </ul>
            </div>
           
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 DocuMentor. Made by <a href="https://X.com/devansa01" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300">😎</a></p>
          </div>
        </div>
      </footer>
    </div>
  );
}
