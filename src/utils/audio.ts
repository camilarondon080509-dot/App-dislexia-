// Web Speech Synthesis and Web Audio API synthesizer for positive, reliable dyslexia support

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    audioCtx = new AudioContextClass();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

// Positive sound effects generated purely via Web Audio API (no external file dependencies)
export const playSoundEffect = (type: 'success' | 'encouragement' | 'pop' | 'star' | 'tone', noteIndex = 0) => {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;

    if (type === 'pop') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(450, now);
      osc.frequency.exponentialRampToValueAtTime(150, now + 0.08);
      gain.gain.setValueAtTime(0.15, now);
      gain.gain.linearRampToValueAtTime(0.01, now + 0.08);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.08);
    } else if (type === 'success') {
      // Pleasant uplifting major chord (C5 - E5 - G5 - C6)
      const freqs = [523.25, 659.25, 783.99, 1046.5];
      freqs.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + i * 0.09);
        gain.gain.setValueAtTime(0, now + i * 0.09);
        gain.gain.linearRampToValueAtTime(0.18, now + i * 0.09 + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.09 + 0.5);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + i * 0.09);
        osc.stop(now + i * 0.09 + 0.55);
      });
    } else if (type === 'encouragement') {
      // Warm, friendly two-tone "Try again, you can do it!" (A4 - C#5)
      const freqs = [440, 554.37];
      freqs.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + i * 0.12);
        gain.gain.setValueAtTime(0.12, now + i * 0.12);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.12 + 0.35);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + i * 0.12);
        osc.stop(now + i * 0.12 + 0.4);
      });
    } else if (type === 'star') {
      // Magically sparkling tones
      const freqs = [659.25, 830.61, 987.77, 1318.51];
      freqs.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + i * 0.07);
        gain.gain.setValueAtTime(0.14, now + i * 0.07);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.07 + 0.4);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + i * 0.07);
        osc.stop(now + i * 0.07 + 0.45);
      });
    } else if (type === 'tone') {
      // Musical notes for auditory memory (C, D, E, F, G, A)
      const scale = [261.63, 293.66, 329.63, 349.23, 392.0, 440.0];
      const freq = scale[noteIndex % scale.length];
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now);
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.45);
    }
  } catch {
    // Audio context may not be initiated yet, fail gracefully
  }
};

// Text to Speech
let currentUtterance: SpeechSynthesisUtterance | null = null;

export const stopSpeech = () => {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
};

export const speakText = (
  text: string, 
  lang: 'es' | 'en' = 'es', 
  rate = 0.9, 
  onEnd?: () => void,
  onBoundary?: (charIndex: number) => void
): boolean => {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    return false;
  }

  stopSpeech();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = rate; // slightly slower than default for dyslexic comprehension
  utterance.pitch = 1.1; // friendly warmer tone for kids
  utterance.lang = lang === 'en' ? 'en-US' : 'es-ES';

  // Pick suitable voice if available
  const voices = window.speechSynthesis.getVoices();
  const matchedVoice = voices.find(v => 
    lang === 'en' 
      ? v.lang.startsWith('en') 
      : (v.lang.startsWith('es') || v.lang.includes('Spanish'))
  );
  if (matchedVoice) {
    utterance.voice = matchedVoice;
  }

  if (onEnd) {
    utterance.onend = onEnd;
    utterance.onerror = onEnd;
  }

  if (onBoundary) {
    utterance.onboundary = (event) => {
      if (event.name === 'word') {
        onBoundary(event.charIndex);
      }
    };
  }

  currentUtterance = utterance;
  window.speechSynthesis.speak(utterance);
  return true;
};

// Speech Recognition for pronunciation activities
export interface SpeechRecognitionResultState {
  isListening: boolean;
  transcript: string;
  isSupported: boolean;
  confidence: number;
}

export const checkSpeechRecognitionSupport = (): boolean => {
  if (typeof window === 'undefined') return false;
  return 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window;
};

export const startVoiceRecognition = (
  lang: 'es' | 'en' = 'es',
  onResult: (transcript: string) => void,
  onError: (err: string) => void,
  onEnd: () => void
) => {
  if (!checkSpeechRecognitionSupport()) {
    onError('El reconocimiento de voz no es compatible con este navegador, pero puedes continuar con botones.');
    return null;
  }

  try {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = lang === 'en' ? 'en-US' : 'es-ES';
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.maxAlternatives = 3;

    recognition.onresult = (event: any) => {
      const result = event.results[0][0].transcript;
      onResult(result);
    };

    recognition.onerror = (event: any) => {
      onError(event.error || 'Error al escuchar');
    };

    recognition.onend = () => {
      onEnd();
    };

    recognition.start();
    return recognition;
  } catch (err) {
    onError('No se pudo iniciar el micrófono');
    return null;
  }
};
