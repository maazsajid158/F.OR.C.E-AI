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
    <div className="min-h-screen bg-[#020617] flex items-center justify-center p-4 relative overflow-hidden font-['Inter'] text-slate-200">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/10 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-600/10 blur-[150px] rounded-full animate-pulse [animation-delay:2s]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-[0.15]" 
             style={{ backgroundImage: 'radial-gradient(#1e293b 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
      </div>

      <div className="w-full max-w-lg relative z-10 animate-in fade-in slide-in-from-bottom-6 duration-1000">
        {/* Logo Section */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-indigo-600 rounded-2xl shadow-xl shadow-indigo-500/20 mb-6 border border-indigo-400/20">
            <span className="text-2xl font-black text-white">F</span>
          </div>
          <h1 className="text-3xl font-bold text-white tracking-tight mb-2">F.O.R.C.E AI - Market Analyst System</h1>
          <p className="text-slate-500 text-sm font-medium tracking-wide">Secure Access Portal</p>
        </div>

        {/* Auth Card */}
        <div className="bg-slate-900/40 backdrop-blur-3xl border border-slate-800/60 p-8 sm:p-12 rounded-[2rem] shadow-2xl ring-1 ring-white/5">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.15em] ml-1">Identity Name</label>
              <input 
                required
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Full Name"
                className="w-full bg-slate-950/40 border border-slate-800 rounded-xl px-5 py-3.5 text-white focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500/50 outline-none transition-all placeholder:text-slate-700"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.15em] ml-1">Access Email</label>
              <input 
                required
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@address.com"
                className="w-full bg-slate-950/40 border border-slate-800 rounded-xl px-5 py-3.5 text-white focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500/50 outline-none transition-all placeholder:text-slate-700"
              />
            </div>

            <div className="flex justify-end -mt-2">
              <button type="button" className="text-[11px] font-semibold text-indigo-400 hover:text-indigo-300 transition-colors">
                Forgot Password?
              </button>
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-indigo-600/20 flex items-center justify-center gap-3 active:scale-[0.98] disabled:opacity-50"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span className="uppercase tracking-widest text-xs">Processing...</span>
                </div>
              ) : (
                <span className="uppercase tracking-widest text-sm">Sign In</span>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-800"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-[#0f172a] px-4 text-slate-500 font-bold tracking-widest">Or</span>
            </div>
          </div>

          {/* Google Button */}
          <button 
            type="button"
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full bg-slate-100 hover:bg-white text-slate-900 font-bold py-3.5 rounded-xl transition-all shadow-md flex items-center justify-center gap-3 active:scale-[0.98] disabled:opacity-50"
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

          <div className="mt-10 pt-8 border-t border-slate-800/50 flex flex-col items-center gap-6">
             <div className="grid grid-cols-2 gap-4 w-full">
               <button type="button" className="w-full bg-slate-800/50 hover:bg-slate-800 border border-slate-700 text-white text-xs font-bold py-3 rounded-xl transition-all">
                 Login
               </button>
               <button type="button" className="w-full bg-slate-800/50 hover:bg-slate-800 border border-slate-700 text-white text-xs font-bold py-3 rounded-xl transition-all">
                 Create Account
               </button>
             </div>
             <p className="text-[10px] text-slate-600 font-bold uppercase tracking-[0.2em]">End-to-End Encryption Enabled</p>
          </div>
        </div>

        <p className="text-center mt-10 text-slate-500 text-[11px] font-medium leading-relaxed">
          Accessing this portal implies consent to the <br/>
          <button className="text-slate-400 hover:text-white underline decoration-slate-700 underline-offset-4">Neural Data & Privacy Protocol</button>
        </p>
      </div>
    </div>
  );
};

export default Signup;
