import { GoogleGenAI } from '@google/genai';
import { MarketAnalysisReport, GroundingSource } from '../types';

const MISSING_KEY_HINT =
  'Set VITE_GEMINI_API_KEY in .env.local to enable live Gemini features.';

export class GeminiService {
  private readonly ai: GoogleGenAI | null;

  constructor() {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    this.ai = apiKey ? new GoogleGenAI({ apiKey }) : null;
  }

  /** True when the client can call the Gemini API */
  isConfigured(): boolean {
    return this.ai !== null;
  }

  private offlineReport(ticker: string): MarketAnalysisReport {
    return {
      ticker,
      sentimentSummary: MISSING_KEY_HINT,
      riskLevel: 'MEDIUM',
      outlook:
        'Live analysis is unavailable without a Gemini API key. Dashboards and navigation still work; add your key to run F.O.R.C.E neural analysis.',
      recommendedAction: 'HOLD',
      confidenceScore: 0,
    };
  }

  async analyzeTicker(ticker: string): Promise<MarketAnalysisReport> {
    if (!this.ai) {
      return this.offlineReport(ticker);
    }

    const prompt = `Perform a detailed F.O.R.C.E (Financial Outlook, Risk, Control, Evaluator) analysis for the asset: ${ticker}.
Search for recent news, market sentiment, and financial health.
Output your analysis as a JSON object with the following structure:
{
  "ticker": "${ticker}",
  "sentimentSummary": "concise sentiment from news/social",
  "riskLevel": "LOW | MEDIUM | HIGH | EXTREME",
  "outlook": "comprehensive outlook text",
  "recommendedAction": "BUY | SELL | HOLD | ACCUMULATE",
  "confidenceScore": 0.0 to 1.0
}
Ensure the response is valid JSON.`;

    const response = await this.ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
        responseMimeType: 'application/json',
      },
    });

    let data: MarketAnalysisReport;

    try {
      data = JSON.parse(response.text || '{}');
    } catch {
      const jsonMatch = response.text?.match(/\{[\s\S]*\}/);
      data = jsonMatch
        ? JSON.parse(jsonMatch[0])
        : ({} as MarketAnalysisReport);
    }

    const chunks =
      response.candidates?.[0]?.groundingMetadata?.groundingChunks;

    if (chunks) {
      const sources: GroundingSource[] = chunks
        .filter((chunk: { web?: unknown }) => chunk.web)
        .map((chunk: { web: { title: string; uri: string } }) => ({
          title: chunk.web.title,
          uri: chunk.web.uri,
        }));
      data.sources = sources;
    }

    return data;
  }

  async getMarketPulse(): Promise<string> {
    if (!this.ai) {
      return `Market pulse offline — ${MISSING_KEY_HINT}`;
    }

    const response = await this.ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents:
        'Give a 10-word maximum ticker-style update on global market sentiment (e.g. BTC Bullish, Tech stocks rallying on earnings).',
    });

    return response.text?.trim() || 'Market Stable';
  }

  async chatWithGemini(
    message: string,
    useLowLatency: boolean = false
  ): Promise<string> {
    if (!this.ai) {
      return `F.O.R.C.E assistant is offline. ${MISSING_KEY_HINT}`;
    }

    const modelName = useLowLatency
      ? 'gemini-2.5-flash-lite-latest'
      : 'gemini-3-pro-preview';

    const response = await this.ai.models.generateContent({
      model: modelName,
      contents: message,
      config: {
        systemInstruction:
          'You are the F.O.R.C.E AI Assistant. You provide expert financial analysis, explain market concepts, and assist with trading strategies. Be concise and professional.',
      },
    });

    return response.text || 'I am unable to process that request at the moment.';
  }
}
