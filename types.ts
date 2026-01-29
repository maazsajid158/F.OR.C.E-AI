
export interface PriceData {
  time: string;
  price: number;
  predicted?: number;
}

export interface MarketSignal {
  asset: string;
  type: 'BUY' | 'SELL' | 'HOLD';
  confidence: number;
  reason: string;
  timestamp: string;
}

export interface GroundingSource {
  title: string;
  uri: string;
}

export interface MarketAnalysisReport {
  ticker: string;
  sentimentSummary: string;
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'EXTREME';
  outlook: string;
  recommendedAction: string;
  confidenceScore: number;
  sources?: GroundingSource[];
}

export type ViewType = 'DASHBOARD' | 'ANALYSIS' | 'BACKTEST' | 'ALERTS' | 'CHAT' | 'VOICE';

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}
