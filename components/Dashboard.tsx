
import React from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  BarChart, Bar, Cell 
} from 'recharts';
import { MOCK_CHART_DATA, MOCK_SIGNALS } from '../constants';

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Portfolio Value', value: '$124,592.00', change: '+12.5%', color: 'text-emerald-400' },
          { label: 'Total Gains', value: '$14,203.45', change: '+2.4%', color: 'text-emerald-400' },
          { label: 'Active Signals', value: '8', change: 'Market Neutral', color: 'text-amber-400' },
          { label: 'Sentiment Index', value: 'Bullish (72)', change: '+5 pts', color: 'text-indigo-400' },
        ].map((stat, i) => (
          <div key={i} className="bg-slate-800/40 border border-slate-700 p-6 rounded-2xl hover:border-indigo-500/50 transition-all group">
            <p className="text-slate-400 text-sm font-medium mb-1">{stat.label}</p>
            <h3 className="text-2xl font-bold text-white mb-2">{stat.value}</h3>
            <span className={`text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-700 ${stat.color}`}>
              {stat.change}
            </span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Price Chart */}
        <div className="lg:col-span-2 bg-slate-800/40 border border-slate-700 p-6 rounded-2xl">
          <div className="flex justify-between items-center mb-6">
            <h4 className="text-lg font-bold text-white">BTC/USD Prediction Model</h4>
            <div className="flex gap-2">
              <span className="flex items-center gap-1.5 text-xs text-slate-400">
                <div className="w-2 h-2 bg-indigo-500 rounded-full" /> Historical
              </span>
              <span className="flex items-center gap-1.5 text-xs text-slate-400">
                <div className="w-2 h-2 bg-emerald-500 rounded-full" /> AI Predicted
              </span>
            </div>
          </div>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={MOCK_CHART_DATA}>
                <defs>
                  <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorPred" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="time" stroke="#475569" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#475569" fontSize={12} tickLine={false} axisLine={false} domain={['auto', 'auto']} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '12px', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  itemStyle={{ color: '#f8fafc' }}
                />
                <Area type="monotone" dataKey="price" stroke="#6366f1" fillOpacity={1} fill="url(#colorPrice)" strokeWidth={2} />
                <Area type="monotone" dataKey="predicted" stroke="#10b981" fillOpacity={1} fill="url(#colorPred)" strokeDasharray="5 5" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Live Signals Sidebar */}
        <div className="bg-slate-800/40 border border-slate-700 p-6 rounded-2xl flex flex-col">
          <h4 className="text-lg font-bold text-white mb-6">Recent F.O.R.C.E Signals</h4>
          <div className="space-y-4 flex-1">
            {MOCK_SIGNALS.map((signal, i) => (
              <div key={i} className="p-4 bg-slate-900/50 border border-slate-800 rounded-xl hover:bg-slate-900 transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-sm font-bold text-white">{signal.asset}</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${
                    signal.type === 'BUY' ? 'bg-emerald-500/10 text-emerald-400' : 
                    signal.type === 'SELL' ? 'bg-rose-500/10 text-rose-400' : 'bg-amber-500/10 text-amber-400'
                  }`}>
                    {signal.type}
                  </span>
                </div>
                <p className="text-xs text-slate-400 line-clamp-2 mb-2">{signal.reason}</p>
                <div className="flex justify-between items-center">
                  <span className="text-[10px] text-slate-500">{signal.timestamp}</span>
                  <span className="text-[10px] font-medium text-slate-400">Conf: {(signal.confidence * 100).toFixed(0)}%</span>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-6 py-2.5 rounded-xl border border-slate-700 text-sm font-medium hover:bg-slate-700 transition-all text-slate-300">
            View All Signals
          </button>
        </div>
      </div>
      
      {/* Market Sentiment Heatmap (Mock) */}
      <div className="bg-slate-800/40 border border-slate-700 p-6 rounded-2xl">
        <h4 className="text-lg font-bold text-white mb-6">Aggregate Sentiment Analysis</h4>
        <div className="h-40">
           <ResponsiveContainer width="100%" height="100%">
             <BarChart data={[
               { name: 'AAPL', sentiment: 75 },
               { name: 'TSLA', sentiment: 30 },
               { name: 'BTC', sentiment: 85 },
               { name: 'ETH', sentiment: 60 },
               { name: 'SOL', sentiment: 45 },
               { name: 'NVDA', sentiment: 92 },
               { name: 'META', sentiment: 55 },
             ]}>
               <XAxis dataKey="name" stroke="#475569" fontSize={11} axisLine={false} tickLine={false} />
               <Tooltip 
                 cursor={{fill: '#1e293b'}} 
                 contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px' }}
               />
               <Bar dataKey="sentiment" radius={[4, 4, 0, 0]}>
                 {(val, index) => (
                   <Cell key={`cell-${index}`} fill={val >= 50 ? '#10b981' : '#f43f5e'} fillOpacity={0.8} />
                 )}
               </Bar>
             </BarChart>
           </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
