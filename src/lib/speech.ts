
/**
 * Utility for friendly, clear speech synthesis for children.
 */

let selectedVoice: SpeechSynthesisVoice | null = null;

const loadVoice = () => {
  const voices = window.speechSynthesis.getVoices();
  // Prefer natural and friendly female/child voices
  // Aria and Samantha are usually the friendliest female voices on Windows/Mac/Mobile
  selectedVoice = voices.find(v => v.name.includes("Aria") && v.name.includes("Natural")) ||
                  voices.find(v => v.name.includes("Samantha")) ||
                  voices.find(v => v.name.includes("Google US English")) ||
                  voices.find(v => v.name.includes("Natural")) ||
                  voices.find(v => v.name.includes("Enhanced")) ||
                  voices.find(v => (v.name.includes("Female") || v.name.includes("Woman")) && v.lang.startsWith("en")) ||
                  voices.find(v => v.name.includes("Victoria")) ||
                  voices.find(v => v.lang.startsWith("en")) || null;
};

if (typeof window !== 'undefined' && window.speechSynthesis) {
  // Initial load
  loadVoice();
  // Chrome/Safari often load voices asynchronously
  window.speechSynthesis.onvoiceschanged = () => {
    loadVoice();
  };
}

export const speak = (text: string, fast: boolean = false, lang: string = "en-US") => {
  if (typeof window === 'undefined' || !window.speechSynthesis) return;

  // phonetic fix for Shinhye -> Shin-He
  let processedText = text.replace(/Shinhye/gi, "Shin He");
  
  // Specific fix for "CAT" which can sometimes be spelled out or mispronounced by some engines
  if (processedText.toUpperCase() === "CAT") {
    processedText = "cat"; 
  } else if (processedText.toUpperCase() === "DOG") {
    processedText = "dog";
  }

  // If it's a capitalized short word (like most reading words), lowercase it to ensure it's not spelled out
  if (processedText.length <= 5 && processedText === processedText.toUpperCase()) {
    processedText = processedText.toLowerCase();
  }

  // Detect language if it's very clearly Korean
  const hasKorean = /[\u3131-\uD79D]/.test(processedText);
  const targetLang = hasKorean ? "ko-KR" : lang;

  // Small delay to prevent overlap issues in some browsers
  window.speechSynthesis.cancel();
  
  setTimeout(() => {
    const utterance = new SpeechSynthesisUtterance(processedText);
    
    if (selectedVoice && !hasKorean) {
      utterance.voice = selectedVoice;
    } else if (hasKorean) {
      const voices = window.speechSynthesis.getVoices();
      const koVoice = voices.find(v => v.lang.startsWith("ko"));
      if (koVoice) utterance.voice = koVoice;
    }

    utterance.lang = targetLang;
    // Clear and engaging rate
    utterance.rate = fast ? 1.0 : 0.9; 
    // High pitch for a friendly child-like vibe, but not distorted (1.4 is stable)
    utterance.pitch = hasKorean ? 1.1 : 1.4; 
    utterance.volume = 1;

    window.speechSynthesis.speak(utterance);
  }, 50);
};
