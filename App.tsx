
import React, { useState } from 'react';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import ForceAnalysis from './components/ForceAnalysis';
import Backtester from './components/Backtester';
import Alerts from './components/Alerts';
import Chatbot from './components/Chatbot';
import LiveVoice from './components/LiveVoice';
import Signup from './components/Signup';
import { ViewType } from './types';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<ViewType>('DASHBOARD');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleSignupComplete = () => {
    setIsAuthenticated(true);
  };

  if (!isAuthenticated) {
    return <Signup onSignup={handleSignupComplete} />;
  }

  const renderContent = () => {
    switch (activeView) {
      case 'DASHBOARD':
        return <Dashboard />;
      case 'ANALYSIS':
        return <ForceAnalysis />;
      case 'CHAT':
        return <Chatbot />;
      case 'VOICE':
        return <LiveVoice />;
      case 'BACKTEST':
        return <Backtester />;
      case 'ALERTS':
        return <Alerts />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <Layout activeView={activeView} setActiveView={setActiveView}>
      {renderContent()}
    </Layout>
  );
};

export default App;
