import React, { useEffect, useState, useRef } from 'react';
import { Language } from '../types';
import { SUPPORTED_LANGUAGES } from '../constants';
import { generateCulturalStory, generateSpeech } from '../services/geminiService';

interface StoryPanelProps {
  artifactName: string;
  basePrompt: string;
}

const StoryPanel: React.FC<StoryPanelProps> = ({ artifactName, basePrompt }) => {
  const [currentLanguage, setCurrentLanguage] = useState<Language>(Language.English);
  const [story, setStory] = useState<string>("");
  const [isStoryLoading, setIsStoryLoading] = useState<boolean>(false);
  const [isAudioLoading, setIsAudioLoading] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  
  const audioContextRef = useRef<AudioContext | null>(null);
  const sourceNodeRef = useRef<AudioBufferSourceNode | null>(null);

  // Fetch Story when language changes
  useEffect(() => {
    const fetchStory = async () => {
      setIsStoryLoading(true);
      // Stop audio if playing
      stopAudio();
      
      const text = await generateCulturalStory(artifactName, basePrompt, currentLanguage);
      setStory(text);
      setIsStoryLoading(false);
    };

    fetchStory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentLanguage, artifactName, basePrompt]);

  const handlePlayAudio = async () => {
    if (isPlaying) {
      stopAudio();
      return;
    }

    if (!story) return;

    setIsAudioLoading(true);

    try {
      const audioBuffer = await generateSpeech(story, currentLanguage);
      
      if (audioBuffer) {
         // Initialize context if needed (must be done on user gesture)
        if (!audioContextRef.current) {
          audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
        }
        
        if (audioContextRef.current.state === 'suspended') {
          await audioContextRef.current.resume();
        }

        const source = audioContextRef.current.createBufferSource();
        source.buffer = audioBuffer;
        source.connect(audioContextRef.current.destination);
        source.onended = () => setIsPlaying(false);
        
        sourceNodeRef.current = source;
        source.start();
        setIsPlaying(true);
      }
    } catch (e) {
      console.error("Playback failed", e);
    } finally {
      setIsAudioLoading(false);
    }
  };

  const stopAudio = () => {
    if (sourceNodeRef.current) {
      try {
        sourceNodeRef.current.stop();
      } catch (e) {
        // ignore if already stopped
      }
      sourceNodeRef.current = null;
    }
    setIsPlaying(false);
  };

  return (
    <div className="bg-white/90 backdrop-blur-md p-6 rounded-t-2xl md:rounded-2xl shadow-xl border-t md:border border-green-100 h-full flex flex-col">
      
      {/* Language Selector */}
      <div className="mb-4">
        <label className="block text-xs font-bold text-stone-500 uppercase tracking-wide mb-2">Select Language</label>
        <div className="flex flex-wrap gap-2">
          {SUPPORTED_LANGUAGES.map((lang) => (
            <button
              key={lang}
              onClick={() => setCurrentLanguage(lang)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                currentLanguage === lang
                  ? 'bg-green-700 text-white shadow-md'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              {lang}
            </button>
          ))}
        </div>
      </div>

      {/* Story Content */}
      <div className="flex-grow overflow-y-auto mb-4 pr-2 custom-scrollbar">
        {isStoryLoading ? (
          <div className="flex flex-col items-center justify-center h-full py-8 opacity-80">
            {/* Pulsing Book Icon Animation */}
            <div className="relative mb-4">
              <svg className="w-16 h-16 text-green-600 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-ping"></div>
            </div>
            <p className="text-stone-500 font-medium animate-pulse text-sm tracking-wide">Unfolding history...</p>
          </div>
        ) : (
          <p className="text-stone-800 leading-relaxed text-lg animate-[fadeIn_0.5s_ease-out]">
            {story}
          </p>
        )}
      </div>

      {/* Audio Controls */}
      <div className="pt-4 border-t border-stone-100">
        <button
          onClick={handlePlayAudio}
          disabled={isAudioLoading || isStoryLoading}
          className={`w-full flex items-center justify-center gap-3 py-3 rounded-xl font-bold text-white transition-all ${
            isPlaying 
              ? 'bg-red-500 hover:bg-red-600' 
              : 'bg-stone-900 hover:bg-green-700'
          } disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          {isAudioLoading ? (
            <>
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>Generating Voice...</span>
            </>
          ) : isPlaying ? (
            <>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" /></svg>
              <span>Stop Narration</span>
            </>
          ) : (
            <>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" /></svg>
              <span>Listen to Story</span>
            </>
          )}
        </button>
        <p className="text-center text-xs text-stone-400 mt-2">Powered by Gemini Audio</p>
      </div>
    </div>
  );
};

export default StoryPanel;