
import React from 'react';

const Alerts: React.FC = () => {
  const alerts = [
    { id: 1, type: 'CRITICAL', asset: 'BTC', msg: 'Whale movement detected: 50,000 BTC moved to Binance.', time: 'Just now' },
    { id: 2, type: 'INFO', asset: 'AAPL', msg: 'Quarterly earnings report expected in 48 hours.', time: '10 mins ago' },
    { id: 3, type: 'SIGNAL', asset: 'SOL', msg: 'Bullish breakout on 1-hour time frame. Confidence: 92%.', time: '45 mins ago' },
    { id: 4, type: 'WARNING', asset: 'NVDA', msg: 'Increased institutional selling pressure detected.', time: '2 hours ago' },
    { id: 5, type: 'SIGNAL', asset: 'ETH', msg: 'Stochastic RSI indicating oversold conditions.', time: '3 hours ago' },
  ];

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-white">Market Alert Stream</h3>
        <button className="text-sm text-indigo-400 hover:text-indigo-300 font-medium transition-colors">Mark all as read</button>
      </div>

      <div className="space-y-4">
        {alerts.map((alert) => (
          <div key={alert.id} className="bg-slate-800/40 border border-slate-700 p-5 rounded-2xl flex gap-4 hover:border-slate-500 transition-all cursor-pointer">
            <div className={`w-1 h-12 rounded-full ${
              alert.type === 'CRITICAL' ? 'bg-red-500' :
              alert.type === 'WARNING' ? 'bg-amber-500' :
              alert.type === 'SIGNAL' ? 'bg-emerald-500' : 'bg-indigo-500'
            }`} />
            <div className="flex-1">
              <div className="flex justify-between items-center mb-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-white uppercase text-xs tracking-widest">{alert.asset}</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                    alert.type === 'CRITICAL' ? 'bg-red-500/10 text-red-400' :
                    alert.type === 'WARNING' ? 'bg-amber-500/10 text-amber-400' :
                    alert.type === 'SIGNAL' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-indigo-500/10 text-indigo-400'
                  }`}>
                    {alert.type}
                  </span>
                </div>
                <span className="text-[10px] text-slate-500">{alert.time}</span>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">{alert.msg}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Alerts;
