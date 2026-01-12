export default function HomePage({ onNavigate }) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col relative font-sans">
      <header className="flex justify-between items-center px-8 py-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <span className="text-2xl font-bold text-gray-900">Authify</span>
        </div>
        <button
          onClick={() => onNavigate('login')}
          className="px-6 py-2 border-2 border-gray-300 rounded-full text-gray-700 font-medium transition-all duration-300 hover:bg-emerald-500 hover:text-white hover:border-emerald-500 active:scale-95 flex items-center gap-2"
        >
          Login
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </button>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-8 pb-32">
        <div className="text-center max-w-3xl">
          {/* Illustration Section */}
          <div className="mb-12 flex justify-center">
            <div className="relative w-48 h-56 flex items-center justify-center">
              <svg className="absolute w-44 h-44 z-10" style={{ top: '0px' }} viewBox="0 0 200 200">
                <defs>
                  <linearGradient id="shield" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" style={{ stopColor: '#86efac' }} />
                    <stop offset="100%" style={{ stopColor: '#4ade80' }} />
                  </linearGradient>
                </defs>
                <path d="M100 20 L160 50 L160 100 C160 140 130 170 100 180 C70 170 40 140 40 100 L40 50 Z" fill="url(#shield)" opacity="0.9" />
                <circle cx="100" cy="85" r="22" fill="white" />
                <path d="M88 85 L97 94 L116 70" stroke="#4ade80" strokeWidth="4.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              </svg>

              <svg className="absolute w-28 h-28 z-20" style={{ bottom: '0px', left: '50%', transform: 'translateX(-50%)' }} viewBox="0 0 100 100">
                <path d="M30 45 L30 30 C30 18 37 12 50 12 C63 12 70 18 70 30 L70 45" stroke="#5b21b6" strokeWidth="7" fill="none" strokeLinecap="round" />
                <rect x="20" y="45" width="60" height="40" fill="#7c3aed" rx="5" />
                <circle cx="50" cy="62" r="9" fill="#fbbf24" />
                <rect x="47.5" y="62" width="5" height="12" fill="#78350f" rx="2.5" />
              </svg>
            </div>
          </div>

          <h2 className="text-3xl font-medium text-gray-600 mb-4">
            Full-Stack Security Solution ✅
          </h2>

          <h1 className="text-6xl font-bold text-gray-900 mb-6">
            Secure Auth Showcase
          </h1>

          <p className="text-xl text-gray-600 mb-10 leading-relaxed">
            Experience a modern authentication flow integrated with <br />
            <span className="font-semibold text-purple-600">Spring Boot & JWT</span>, featuring high-security <br />
            <span className="font-semibold text-blue-600">Gmail OTP</span> verification for password recovery.
          </p>

          <button
            onClick={() => onNavigate('signup')}
            className="px-10 py-4 border-2 border-gray-900 rounded-full text-gray-900 font-bold hover:bg-gray-900 hover:text-white transition-all text-lg shadow-lg hover:shadow-xl"
          >
            Get Started
          </button>
        </div>
      </main>

      <footer className="w-full py-8 text-center bg-transparent border-t border-gray-100">
        <p className="text-gray-500 font-medium">
          Developed by{' '}
          <a
            href="https://www.linkedin.com/in/g%C3%B6rkem-karag%C3%B6z-91312a229/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-emerald-600 hover:text-emerald-700 transition-colors font-bold underline decoration-emerald-200 underline-offset-4"
          >
            Görkem Karagöz
          </a>
        </p>
      </footer>
    </div>
  );
}