import React, { useState } from 'react';

interface SignupProps {
  onSignup: () => void;
}

const Signup: React.FC<SignupProps> = ({ onSignup }) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate a high-end neural verification delay
    setTimeout(() => {
      onSignup();
    }, 1200);
  };

  const handleGoogleLogin = () => {
    setLoading(true);
    setTimeout(() => {
      onSignup();
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#0a0b14] flex flex-col items-center justify-center p-4 relative overflow-hidden font-['Inter'] text-slate-200">
      {/* Background Grid Effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Ambient glow effects */}
        <div className="absolute top-[20%] left-[10%] w-[300px] h-[300px] bg-blue-600/5 blur-[100px] rounded-full" />
        <div className="absolute top-[30%] right-[15%] w-[250px] h-[250px] bg-purple-600/5 blur-[100px] rounded-full" />
        
        {/* 3D Perspective Grid Floor */}
        <div 
          className="absolute bottom-0 left-0 right-0 h-[50%]"
          style={{
            perspective: '500px',
            perspectiveOrigin: '50% 0%',
          }}
        >
          <div 
            className="absolute inset-0"
            style={{
              transform: 'rotateX(60deg)',
              transformOrigin: 'top center',
              background: `
                linear-gradient(90deg, rgba(59, 130, 246, 0.08) 1px, transparent 1px),
                linear-gradient(0deg, rgba(59, 130, 246, 0.08) 1px, transparent 1px)
              `,
              backgroundSize: '60px 60px',
              maskImage: 'linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)',
            }}
          />
        </div>

        {/* Subtle side architectural lines */}
        <div className="absolute left-[5%] top-[20%] bottom-[30%] w-px bg-gradient-to-b from-transparent via-blue-500/20 to-transparent" />
        <div className="absolute left-[8%] top-[25%] bottom-[35%] w-px bg-gradient-to-b from-transparent via-blue-500/10 to-transparent" />
        <div className="absolute right-[5%] top-[20%] bottom-[30%] w-px bg-gradient-to-b from-transparent via-blue-500/20 to-transparent" />
        <div className="absolute right-[8%] top-[25%] bottom-[35%] w-px bg-gradient-to-b from-transparent via-blue-500/10 to-transparent" />
      </div>

      <div className="w-full max-w-md relative z-10 animate-in fade-in slide-in-from-bottom-6 duration-1000">
        {/* Logo Section */}
        <div className="text-center mb-8">
          {/* Circular Logo with Purple Ring */}
          <div className="inline-flex items-center justify-center mb-6 relative">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center border border-purple-500/50 shadow-lg shadow-purple-500/20">
              <span className="text-2xl font-bold text-white">F</span>
            </div>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-2">
            F.O.R.C.E AI - Market Analyst System
          </h1>
          <p className="text-slate-400 text-sm font-medium">Secure Access Portal</p>
        </div>

        {/* Auth Card */}
        <div className="relative">
          {/* Card glow effect */}
          <div className="absolute -inset-px bg-gradient-to-b from-blue-500/20 via-purple-500/10 to-blue-500/5 rounded-2xl blur-sm" />
          
          <div className="relative bg-[#0d1023]/90 backdrop-blur-xl border border-blue-500/20 p-8 rounded-2xl shadow-2xl">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  Identity Name
                </label>
                <input 
                  required
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Full Name"
                  className="w-full bg-[#141832] border border-blue-500/30 rounded-lg px-4 py-3.5 text-white focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500/50 outline-none transition-all placeholder:text-slate-600 shadow-inner shadow-blue-500/5"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  Access Email
                </label>
                <input 
                  required
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email@address.com"
                  className="w-full bg-[#141832] border border-blue-500/30 rounded-lg px-4 py-3.5 text-white focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500/50 outline-none transition-all placeholder:text-slate-600 shadow-inner shadow-blue-500/5"
                />
              </div>

              <div className="flex justify-end">
                <button type="button" className="text-xs font-medium text-blue-400 hover:text-blue-300 transition-colors">
                  Forgot Password?
                </button>
              </div>

              <button 
                type="submit"
                disabled={loading}
                className="w-full bg-purple-600 hover:bg-purple-500 text-white font-bold py-3.5 rounded-lg transition-all shadow-lg shadow-purple-600/30 flex items-center justify-center gap-3 active:scale-[0.98] disabled:opacity-50 uppercase tracking-wider text-sm"
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Processing...</span>
                  </div>
                ) : (
                  <span>Sign In</span>
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-700/50"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-[#0d1023] px-4 text-slate-500 font-medium tracking-wider">Or</span>
              </div>
            </div>

            {/* Google Button */}
            <button 
              type="button"
              onClick={handleGoogleLogin}
              disabled={loading}
              className="w-full bg-slate-100 hover:bg-white text-slate-900 font-semibold py-3 rounded-lg transition-all shadow-md flex items-center justify-center gap-3 active:scale-[0.98] disabled:opacity-50"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              <span className="text-sm">Continue with Google</span>
            </button>

            {/* Login / Create Account Buttons */}
            <div className="mt-8 pt-6 border-t border-slate-700/30 flex flex-col items-center gap-5">
              <div className="grid grid-cols-2 gap-4 w-full">
                <button 
                  type="button" 
                  className="w-full bg-transparent hover:bg-slate-800/50 border border-slate-600 text-white text-sm font-semibold py-3 rounded-lg transition-all"
                >
                  Login
                </button>
                <button 
                  type="button" 
                  className="w-full bg-purple-600 hover:bg-purple-500 border border-purple-600 text-white text-sm font-semibold py-3 rounded-lg transition-all shadow-md shadow-purple-600/20"
                >
                  Create Account
                </button>
              </div>
              <p className="text-[10px] text-slate-500 font-semibold uppercase tracking-[0.15em]">
                End-to-End Encryption Enabled
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center mt-8 text-slate-500 text-[11px] font-medium leading-relaxed">
          Accessing this portal implies consent to the <br/>
          <button className="text-blue-400 hover:text-blue-300 underline decoration-blue-500/30 underline-offset-4 transition-colors">
            Neural Data &amp; Privacy Protocol
          </button>
        </p>
      </div>
    </div>
  );
};

export default Signup;
