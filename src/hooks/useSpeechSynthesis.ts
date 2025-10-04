import { useState, useEffect, useCallback } from 'react';

interface UseSpeechSynthesisReturn {
  speak: (text: string, lang?: string) => void;
  isSpeaking: boolean;
  stop: () => void;
  browserSupportsSpeechSynthesis: boolean;
}

export const useSpeechSynthesis = (): UseSpeechSynthesisReturn => {
  const [isSpeaking, setIsSpeaking] = useState(false);

  const browserSupportsSpeechSynthesis = 
    typeof window !== 'undefined' && 'speechSynthesis' in window;

  useEffect(() => {
    if (!browserSupportsSpeechSynthesis) return;

    const handleEnd = () => setIsSpeaking(false);
    
    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, [browserSupportsSpeechSynthesis]);

  const speak = useCallback((text: string, lang: string = 'en-US') => {
    if (!browserSupportsSpeechSynthesis) {
      console.warn('Browser does not support speech synthesis');
      return;
    }

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = 0.9; // Slightly slower for clarity
    utterance.pitch = 1;
    utterance.volume = 1;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = (event) => {
      console.error('Speech synthesis error:', event);
      setIsSpeaking(false);
    };

    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  }, [browserSupportsSpeechSynthesis]);

  const stop = useCallback(() => {
    if (browserSupportsSpeechSynthesis && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  }, [browserSupportsSpeechSynthesis]);

  return {
    speak,
    isSpeaking,
    stop,
    browserSupportsSpeechSynthesis,
  };
};
