
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI, LiveServerMessage, Modality } from '@google/genai';

const LiveVoice: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const [transcription, setTranscription] = useState<string>('');
  const [isConnecting, setIsConnecting] = useState(false);
  
  const audioContextRef = useRef<AudioContext | null>(null);
  const outputAudioContextRef = useRef<AudioContext | null>(null);
  const nextStartTimeRef = useRef<number>(0);
  const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());
  const sessionRef = useRef<any>(null);

  const stopSession = () => {
    if (sessionRef.current) {
      sessionRef.current.close();
      sessionRef.current = null;
    }
    for (const source of sourcesRef.current) {
      source.stop();
    }
    sourcesRef.current.clear();
    setIsActive(false);
  };

  const startSession = async () => {
    setIsConnecting(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
      
      const inputAudioContext = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      const outputAudioContext = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      audioContextRef.current = inputAudioContext;
      outputAudioContextRef.current = outputAudioContext;

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-09-2025',
        callbacks: {
          onopen: () => {
            setIsConnecting(false);
            setIsActive(true);
            const source = inputAudioContext.createMediaStreamSource(stream);
            const scriptProcessor = inputAudioContext.createScriptProcessor(4096, 1, 1);
            
            scriptProcessor.onaudioprocess = (e) => {
              const inputData = e.inputBuffer.getChannelData(0);
              const l = inputData.length;
              const int16 = new Int16Array(l);
              for (let i = 0; i < l; i++) {
                int16[i] = inputData[i] * 32768;
              }
              const base64 = btoa(String.fromCharCode(...new Uint8Array(int16.buffer)));
              sessionPromise.then(session => {
                session.sendRealtimeInput({ media: { data: base64, mimeType: 'audio/pcm;rate=16000' } });
              });
            };

            source.connect(scriptProcessor);
            scriptProcessor.connect(inputAudioContext.destination);
          },
          onmessage: async (message: LiveServerMessage) => {
            if (message.serverContent?.outputTranscription) {
              setTranscription(prev => prev + ' ' + message.serverContent?.outputTranscription?.text);
            }

            const base64 = message.serverContent?.modelTurn?.parts?.[0]?.inlineData?.data;
            if (base64) {
              const binaryString = atob(base64);
              const bytes = new Uint8Array(binaryString.length);
              for (let i = 0; i < binaryString.length; i++) bytes[i] = binaryString.charCodeAt(i);
              
              const dataInt16 = new Int16Array(bytes.buffer);
              const buffer = outputAudioContext.createBuffer(1, dataInt16.length, 24000);
              const channelData = buffer.getChannelData(0);
              for (let i = 0; i < dataInt16.length; i++) channelData[i] = dataInt16[i] / 32768.0;

              const source = outputAudioContext.createBufferSource();
              source.buffer = buffer;
              source.connect(outputAudioContext.destination);
              
              nextStartTimeRef.current = Math.max(nextStartTimeRef.current, outputAudioContext.currentTime);
              source.start(nextStartTimeRef.current);
              nextStartTimeRef.current += buffer.duration;
              sourcesRef.current.add(source);
              source.onended = () => sourcesRef.current.delete(source);
            }

            if (message.serverContent?.interrupted) {
              for (const s of sourcesRef.current) s.stop();
              sourcesRef.current.clear();
              nextStartTimeRef.current = 0;
            }
          },
          onerror: (e) => console.error('Live API Error:', e),
          onclose: () => setIsActive(false),
        },
        config: {
          responseModalities: [Modality.AUDIO],
          outputAudioTranscription: {},
          systemInstruction: "You are the F.O.R.C.E Voice Analyst. You have a real-time voice conversation with users about stock and crypto markets. Be helpful, concise, and professional."
        }
      });

      sessionRef.current = await sessionPromise;
    } catch (err) {
      console.error(err);
      setIsConnecting(false);
      alert('Failed to connect to Voice API. Check microphone permissions and API key.');
    }
  };

  useEffect(() => {
    return () => stopSession();
  }, []);

  return (
    <div className="max-w-3xl mx-auto space-y-12 py-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
      <div className="text-center">
        <h3 className="text-4xl font-black text-white mb-4 tracking-tight">Conversational <span className="text-indigo-500">Voice Analyst</span></h3>
        <p className="text-slate-400 max-w-lg mx-auto text-lg">Speak naturally with the F.O.R.C.E brain. Get real-time audio insights and market feedback.</p>
      </div>

      <div className="flex flex-col items-center justify-center space-y-12">
        <div className="relative group">
          <div className={`absolute -inset-8 bg-indigo-500/20 rounded-full blur-3xl transition-opacity duration-1000 ${isActive ? 'opacity-100 animate-pulse' : 'opacity-0'}`} />
          <button 
            onClick={isActive ? stopSession : startSession}
            disabled={isConnecting}
            className={`relative w-48 h-48 rounded-full flex flex-col items-center justify-center transition-all duration-500 border-4 shadow-2xl active:scale-95 ${
              isActive 
                ? 'bg-rose-600 border-rose-400 shadow-rose-600/40' 
                : 'bg-indigo-600 border-indigo-400 shadow-indigo-600/40'
            } ${isConnecting ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'}`}
          >
            {isConnecting ? (
              <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin" />
            ) : isActive ? (
              <>
                <div className="flex gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map(i => (
                    <div key={i} className={`w-1 bg-white rounded-full animate-bounce [animation-delay:${i * 0.1}s] h-8`} />
                  ))}
                </div>
                <span className="text-xs font-black uppercase tracking-widest text-white">Stop Session</span>
              </>
            ) : (
              <>
                <svg className="w-16 h-16 text-white mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-20a3 3 0 013 3v8a3 3 0 01-6 0V5a3 3 0 013-3z" /></svg>
                <span className="text-xs font-black uppercase tracking-widest text-white">Start Conversation</span>
              </>
            )}
          </button>
        </div>

        {isActive && (
          <div className="w-full bg-[#0f172a] border border-slate-800 p-8 rounded-3xl animate-in slide-in-from-top-4 duration-500">
            <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">Live Transcription</h4>
            <div className="min-h-[100px] text-slate-300 font-medium leading-relaxed italic">
              {transcription || "Listening for your voice..."}
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { title: "Ultra Low Latency", desc: "Native audio processing for human-like response times." },
          { title: "Market Context", desc: "Aware of latest tickers, sentiment, and F.O.R.C.E metrics." },
          { title: "Hands-Free", desc: "Perfect for analysts who need to multitask during trades." }
        ].map((feat, i) => (
          <div key={i} className="bg-slate-800/20 border border-slate-800/50 p-6 rounded-2xl text-center">
            <h5 className="text-white font-bold text-sm mb-2">{feat.title}</h5>
            <p className="text-slate-500 text-xs leading-relaxed">{feat.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LiveVoice;
