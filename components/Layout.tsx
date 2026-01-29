
import React, { useEffect, useMemo, useState, useRef } from 'react';
import { ICONS } from '../constants';
import { ViewType } from '../types';
import { GeminiService } from '../services/geminiService';

interface LayoutProps {
  children: React.ReactNode;
  activeView: ViewType;
  setActiveView: (view: ViewType) => void;
  /** Clears session and returns user to signup when provided */
  onLogout?: () => void;
}

const Layout: React.FC<LayoutProps> = ({
  children,
  activeView,
  setActiveView,
  onLogout,
}) => {
  const [pulse, setPulse] = useState('Initializing market stream...');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const gemini = useMemo(() => new GeminiService(), []);

  useEffect(() => {
    const fetchPulse = async () => {
      try {
        const text = await gemini.getMarketPulse();
        setPulse(text);
      } catch (e) {
        setPulse('Data stream paused');
      }
    };
    fetchPulse();
    const interval = setInterval(fetchPulse, 60000);
    return () => clearInterval(interval);
  }, []);

  // Handle click outside to close menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMenuOpen]);

  const navItems: { id: ViewType; label: string; icon: keyof typeof ICONS }[] = [
    { id: 'DASHBOARD', label: 'Dashboard', icon: 'Dashboard' },
    { id: 'ANALYSIS', label: 'F.O.R.C.E Analysis', icon: 'Analysis' },
    { id: 'CHAT', label: 'AI Chat', icon: 'Chat' },
    { id: 'VOICE', label: 'Live Voice', icon: 'Voice' },
    { id: 'BACKTEST', label: 'Backtester', icon: 'Backtest' },
    { id: 'ALERTS', label: 'Alert Center', icon: 'Alerts' },
  ];

  const handleNavClick = (id: ViewType) => {
    setActiveView(id);
    setIsMenuOpen(false);
  };

  return (
    <div className="flex h-screen bg-[#020617] text-slate-200 overflow-hidden font-['Inter'] flex-col">
      {/* Universal Header with Navigation */}
      <header className="h-20 border-b border-slate-800/50 flex items-center justify-between px-4 sm:px-8 bg-[#020617]/80 backdrop-blur-xl sticky top-0 z-50 shrink-0">
        <div className="flex items-center gap-4 sm:gap-8">
          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => handleNavClick('DASHBOARD')}>
            <div className="w-9 h-9 bg-indigo-600 rounded-lg flex items-center justify-center font-bold text-white shadow-lg shadow-indigo-500/20 border border-indigo-400/30">
              F
            </div>
            <div className="hidden xs:block">
              <h1 className="text-lg font-bold tracking-tight text-white leading-none">F.O.R.C.E</h1>
              <p className="text-[8px] text-slate-500 font-bold tracking-[0.2em] uppercase mt-1">AI Analyst</p>
            </div>
          </div>

          {/* Nav Dropdown Trigger */}
          <div className="relative" ref={menuRef}>
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all border ${
                isMenuOpen 
                  ? 'bg-indigo-600 text-white border-indigo-400 shadow-lg shadow-indigo-600/20' 
                  : 'bg-slate-900/50 text-slate-300 border-slate-800 hover:border-slate-600'
              }`}
            >
              <span className="text-sm font-bold tracking-wide">
                {navItems.find(i => i.id === activeView)?.label || 'Menu'}
              </span>
              <svg 
                className={`w-4 h-4 transition-transform duration-300 ${isMenuOpen ? 'rotate-180' : ''}`} 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Dropdown Menu */}
            {isMenuOpen && (
              <div className="absolute top-full left-0 mt-3 w-64 bg-[#0f172a]/95 backdrop-blur-2xl border border-slate-700/50 rounded-2xl shadow-2xl p-2 animate-in fade-in zoom-in-95 duration-200 origin-top-left ring-1 ring-white/5">
                <div className="p-3 mb-2 border-b border-slate-800/50">
                  <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">System Navigation</span>
                </div>
                <nav className="space-y-1">
                  {navItems.map((item) => {
                    const Icon = ICONS[item.icon];
                    const isActive = activeView === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => handleNavClick(item.id)}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group relative ${
                          isActive 
                          ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' 
                          : 'text-slate-400 hover:bg-slate-800/80 hover:text-slate-200'
                        }`}
                      >
                        <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-slate-500 group-hover:text-indigo-400'}`} />
                        <span className="font-semibold text-sm">{item.label}</span>
                        {isActive && (
                          <div className="ml-auto w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
                        )}
                      </button>
                    );
                  })}
                </nav>
                <div className="mt-4 p-3 bg-indigo-500/5 rounded-xl border border-indigo-500/10">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
                    <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">Core Sync Active</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Global Market Pulse & Search */}
        <div className="flex items-center gap-4 sm:gap-6">
          <div className="hidden lg:flex items-center gap-2 border-r border-slate-800 pr-6">
             <span className="text-[9px] font-black text-indigo-500 uppercase tracking-tighter bg-indigo-500/10 px-1.5 py-0.5 rounded">Market Pulse</span>
             <p className="text-xs font-medium text-slate-400 truncate max-w-[200px]">{pulse}</p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="relative group hidden md:block">
               <input 
                 type="text" 
                 placeholder="Asset search..." 
                 className="bg-slate-900/80 border border-slate-800 rounded-full px-5 py-1.5 text-xs w-48 focus:w-64 focus:ring-2 focus:ring-indigo-500/50 transition-all duration-300 outline-none text-slate-300"
               />
               <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-600 group-hover:text-slate-400 transition-colors">
                 <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
               </div>
            </div>
            <button 
              onClick={() => handleNavClick('CHAT')}
              className={`w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-[10px] font-black shadow-lg shadow-indigo-500/20 ring-1 ring-white/10 hover:scale-110 transition-transform cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-400 ${activeView === 'CHAT' ? 'ring-2 ring-white scale-110' : ''}`}
              title="Launch AI Chatbot"
            >
              AI
            </button>
            {onLogout && (
              <button
                type="button"
                onClick={() => {
                  setIsMenuOpen(false);
                  onLogout();
                }}
                className="text-xs font-semibold text-slate-400 hover:text-rose-400 border border-slate-700 hover:border-rose-500/40 rounded-xl px-3 py-1.5 transition-colors"
              >
                Log out
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto p-4 sm:p-8 scroll-smooth">
        {children}
      </main>

      {/* Footer Branding (Mobile/Small Desktop) */}
      <footer className="h-10 border-t border-slate-800/30 bg-[#020617]/50 flex items-center justify-center px-8 shrink-0">
        <p className="text-[9px] text-slate-600 font-bold uppercase tracking-[0.3em]">Neural Engine v2.5 Online</p>
      </footer>
    </div>
  );
};

export default Layout;
