
import React, { useState } from 'react';
import { GeminiService } from '../services/geminiService';
import { MarketAnalysisReport } from '../types';

const ForceAnalysis: React.FC = () => {
  const [ticker, setTicker] = useState('BTC');
  const [report, setReport] = useState<MarketAnalysisReport | null>(null);
  const [loading, setLoading] = useState(false);
  const gemini = new GeminiService();

  const handleAnalysis = async () => {
    if (!ticker) return;
    setLoading(true);
    try {
      const result = await gemini.analyzeTicker(ticker);
      setReport(result);
    } catch (error) {
      console.error(error);
      alert("Analysis failed. Verify network connectivity and API status.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in slide-in-from-bottom-6 duration-700">
      <div className="bg-[#0f172a] border border-slate-800 p-10 rounded-3xl shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/5 blur-[100px] -mr-32 -mt-32 rounded-full" />
        <div className="relative z-10">
          <h3 className="text-3xl font-black text-white mb-2 tracking-tight">F.O.R.C.E <span className="text-indigo-500">Neural Engine</span></h3>
          <p className="text-slate-400 mb-10 max-w-xl text-lg font-medium leading-relaxed">Execute real-time sentiment extraction and risk modeling using multi-agent LLM analysis.</p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <input 
                type="text" 
                value={ticker}
                onChange={(e) => setTicker(e.target.value.toUpperCase())}
                placeholder="TICKER (e.g. NVDA, SOL)"
                className="w-full bg-slate-900 border border-slate-700 rounded-2xl px-6 py-4 text-xl font-black text-white focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all uppercase placeholder:text-slate-700 outline-none"
              />
            </div>
            <button 
              onClick={handleAnalysis}
              disabled={loading}
              className="bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-black px-10 py-4 rounded-2xl transition-all shadow-xl shadow-indigo-600/30 flex items-center justify-center gap-3 active:scale-95"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                  Analyze Asset
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {report && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-in fade-in zoom-in-95 duration-1000">
          {/* Main Content */}
          <div className="lg:col-span-8 space-y-8">
            <div className="bg-[#0f172a] border border-slate-800 p-8 rounded-3xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1 h-6 bg-indigo-500 rounded-full" />
                <h4 className="text-xs font-black text-indigo-400 uppercase tracking-widest">Financial Outlook & Strategic Analysis</h4>
              </div>
              <div className="prose prose-invert max-w-none">
                <p className="text-slate-300 text-lg leading-relaxed font-medium">
                  {report.outlook}
                </p>
              </div>
            </div>

            <div className="bg-[#0f172a] border border-slate-800 p-8 rounded-3xl">
               <div className="flex items-center gap-3 mb-6">
                <div className="w-1 h-6 bg-emerald-500 rounded-full" />
                <h4 className="text-xs font-black text-emerald-400 uppercase tracking-widest">Market Sentiment Index</h4>
              </div>
              <p className="text-slate-400 text-base italic leading-relaxed font-medium border-l-2 border-slate-800 pl-6 py-2">
                "{report.sentimentSummary}"
              </p>
            </div>

            {report.sources && report.sources.length > 0 && (
              <div className="bg-[#0f172a] border border-slate-800 p-8 rounded-3xl">
                <h4 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-6">Grounding Sources</h4>
                <div className="flex flex-wrap gap-3">
                  {report.sources.map((source, idx) => (
                    <a 
                      key={idx} 
                      href={source.uri} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-slate-900 border border-slate-800 rounded-full text-[11px] font-bold text-slate-400 hover:text-indigo-400 hover:border-indigo-500/50 transition-all flex items-center gap-2 group"
                    >
                      <svg className="w-3 h-3 text-slate-600 group-hover:text-indigo-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} /></svg>
                      {source.title.length > 30 ? source.title.substring(0, 30) + '...' : source.title}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Side Panels */}
          <div className="lg:col-span-4 space-y-8">
            <div className="bg-[#0f172a] border border-slate-800 p-8 rounded-3xl flex flex-col items-center text-center">
              <h4 className="text-xs font-black text-rose-500 uppercase tracking-widest mb-8">Risk Evaluation</h4>
              <div className="relative w-40 h-40 flex items-center justify-center mb-6">
                 <svg className="w-full h-full -rotate-90">
                    <circle cx="80" cy="80" r="70" className="stroke-slate-800 fill-none" strokeWidth="12" />
                    <circle 
                      cx="80" 
                      cy="80" 
                      r="70" 
                      className={`fill-none transition-all duration-1000 ${
                        report.riskLevel === 'LOW' ? 'stroke-emerald-500' :
                        report.riskLevel === 'MEDIUM' ? 'stroke-amber-500' :
                        'stroke-rose-500'
                      }`} 
                      strokeWidth="12" 
                      strokeLinecap="round"
                      strokeDasharray="440"
                      strokeDashoffset={
                        report.riskLevel === 'LOW' ? 440 * 0.75 :
                        report.riskLevel === 'MEDIUM' ? 440 * 0.5 :
                        report.riskLevel === 'HIGH' ? 440 * 0.25 : 0
                      }
                    />
                 </svg>
                 <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-2xl font-black text-white">{report.riskLevel}</span>
                 </div>
              </div>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Calculated Risk Factor</p>
            </div>

            <div className="bg-indigo-600 border border-indigo-400/50 p-8 rounded-3xl shadow-2xl shadow-indigo-600/20">
              <div className="flex items-center gap-2 mb-6">
                <svg className="w-5 h-5 text-indigo-200" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" /></svg>
                <h4 className="text-xs font-black text-indigo-100 uppercase tracking-widest">F.O.R.C.E Consensus</h4>
              </div>
              <p className="text-4xl font-black text-white mb-6 tracking-tighter uppercase">{report.recommendedAction}</p>
              <div className="flex flex-col gap-1">
                <div className="flex justify-between items-center text-[10px] font-black text-indigo-200 uppercase tracking-widest mb-1">
                  <span>AI Certainty</span>
                  <span>{(report.confidenceScore * 100).toFixed(0)}%</span>
                </div>
                <div className="h-2 w-full bg-indigo-900/50 rounded-full overflow-hidden">
                  <div className="h-full bg-white transition-all duration-1000" style={{ width: `${report.confidenceScore * 100}%` }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ForceAnalysis;
