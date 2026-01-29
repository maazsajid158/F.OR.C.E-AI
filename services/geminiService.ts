
import { GoogleGenAI, Type } from "@google/genai";
import { MarketAnalysisReport, GroundingSource } from "../types";

export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({
      apiKey: import.meta.env.VITE_GEMINI_API_KEY as string,
    });    
  }
  

  async analyzeTicker(ticker: string): Promise<MarketAnalysisReport> {
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
      model: "gemini-3-pro-preview",
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
        responseMimeType: "application/json"
      }
    });

    let data: MarketAnalysisReport;
    try {
      data = JSON.parse(response.text || '{}');
    } catch (e) {
      const jsonMatch = response.text?.match(/\{[\s\S]*\}/);
      data = jsonMatch ? JSON.parse(jsonMatch[0]) : ({} as MarketAnalysisReport);
    }

    const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
    if (chunks) {
      const sources: GroundingSource[] = chunks
        .filter((chunk: any) => chunk.web)
        .map((chunk: any) => ({
          title: chunk.web.title,
          uri: chunk.web.uri
        }));
      data.sources = sources;
    }

    return data;
  }

  async getMarketPulse(): Promise<string> {
    const response = await this.ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: "Give a 10-word maximum ticker-style update on global market sentiment (e.g. BTC Bullish, Tech stocks rallying on earnings).",
    });
    return response.text?.trim() || "Market Stable";
  }

  async chatWithGemini(message: string, useLowLatency: boolean = false): Promise<string> {
    const modelName = useLowLatency ? 'gemini-2.5-flash-lite-latest' : 'gemini-3-pro-preview';
    const response = await this.ai.models.generateContent({
      model: modelName,
      contents: message,
      config: {
        systemInstruction: "You are the F.O.R.C.E AI Assistant. You provide expert financial analysis, explain market concepts, and assist with trading strategies. Be concise and professional."
      }
    });
    return response.text || "I am unable to process that request at the moment.";
  }
}
