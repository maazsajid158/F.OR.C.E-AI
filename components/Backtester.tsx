
import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const BACKTEST_DATA = [
  { day: 'Day 1', actual: 10000, model: 10000 },
  { day: 'Day 5', actual: 10200, model: 10500 },
  { day: 'Day 10', actual: 9800, model: 10300 },
  { day: 'Day 15', actual: 10500, model: 11200 },
  { day: 'Day 20', actual: 11200, model: 12100 },
  { day: 'Day 25', actual: 10900, model: 11900 },
  { day: 'Day 30', actual: 11500, model: 13200 },
];

const Backtester: React.FC = () => {
  const [ticker, setTicker] = useState('AAPL');
  const [period, setPeriod] = useState('30D');

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="bg-slate-800/40 border border-slate-700 p-8 rounded-2xl">
        <h3 className="text-xl font-bold text-white mb-6">Historical Accuracy & Simulations</h3>
        <div className="flex flex-wrap gap-6 items-end">
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-400 uppercase">Strategy Type</label>
            <select className="w-48 bg-slate-900 border border-slate-700 rounded-xl px-4 py-2 text-sm text-white">
              <option>Sentiment Weighted</option>
              <option>Momentum Only</option>
              <option>Risk-Averse Hybrid</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-400 uppercase">Symbol</label>
            <input 
              type="text" 
              value={ticker}
              onChange={(e) => setTicker(e.target.value.toUpperCase())}
              className="w-32 bg-slate-900 border border-slate-700 rounded-xl px-4 py-2 text-sm text-white uppercase"
            />
          </div>
          <button className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-6 py-2 rounded-xl transition-all shadow-lg shadow-indigo-600/20">
            Run Backtest
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 bg-slate-800/40 border border-slate-700 p-6 rounded-2xl">
          <h4 className="text-lg font-bold text-white mb-6">Equity Curve Comparison</h4>
          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={BACKTEST_DATA}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                <XAxis dataKey="day" stroke="#475569" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="#475569" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '12px' }}
                />
                <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px' }} />
                <Line type="monotone" dataKey="actual" name="Benchmark (S&P 500)" stroke="#94a3b8" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="model" name="F.O.R.C.E Strategy" stroke="#6366f1" strokeWidth={3} dot={{ r: 4, fill: '#6366f1' }} activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="space-y-6">
          {[
            { label: 'Cumulative Return', value: '+32.4%', sub: 'vs 15.2% benchmark', color: 'text-emerald-400' },
            { label: 'Sharpe Ratio', value: '2.84', sub: 'High risk-adjusted returns', color: 'text-indigo-400' },
            { label: 'Max Drawdown', value: '-8.2%', sub: 'Last 90 days peak-to-trough', color: 'text-rose-400' },
            { label: 'Win Rate', value: '68%', sub: 'Across 45 simulated trades', color: 'text-emerald-400' },
          ].map((stat, i) => (
            <div key={i} className="bg-slate-800/40 border border-slate-700 p-6 rounded-2xl">
              <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">{stat.label}</p>
              <h4 className={`text-2xl font-bold ${stat.color} mb-1`}>{stat.value}</h4>
              <p className="text-[10px] text-slate-500 italic">{stat.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Backtester;
