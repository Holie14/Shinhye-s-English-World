import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { BookOpen, PenTool, Hash, Home as HomeIcon, Volume2, Mic, Square, Play, RefreshCw, BookText } from "lucide-react";
import { ALPHABET_DATA } from "./constants";
import { speak } from "./lib/speech";
import { READING_CATEGORIES } from "./readingData";
import { STORIES_DATA } from "./storiesData";
import confetti from "canvas-confetti";

// --- Components ---

const BackButton = ({ onClick }: { onClick: () => void }) => (
  <button 
    onClick={onClick}
    className="fixed top-6 left-6 z-50 bg-white/80 backdrop-blur-sm p-4 rounded-2xl border-4 border-teal-100 shadow-lg text-teal-600 hover:scale-110 transition-all active:scale-95"
  >
    <HomeIcon size={24} />
  </button>
);

const Home = ({ setView, avatarUrl }: { setView: (v: string) => void, avatarUrl: string }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-12 px-6 max-w-5xl mx-auto">
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="w-full flex flex-col items-center"
      >
        {/* Avatar Section */}
        <div className="relative mb-12">
          <div className="w-64 h-64 bg-teal-50 rounded-full flex items-center justify-center p-2 relative shadow-2xl overflow-hidden border-8 border-white">
            <img 
              src={avatarUrl} 
              alt="Shinhye Avatar" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <motion.div 
            animate={{ rotate: [0, 5, -5, 0], scale: [1, 1.05, 1] }} 
            transition={{ repeat: Infinity, duration: 4 }}
            className="absolute -top-4 -right-12 bg-white px-6 py-3 rounded-2xl shadow-xl border-4 border-pink-200"
          >
            <span className="text-2xl font-black text-pink-500">Hello! 👋</span>
          </motion.div>
        </div>

        <h2 className="text-5xl md:text-7xl font-black mb-2 uppercase tracking-tighter text-center glitter-text">SHINHYE'S ADVENTURE</h2>
        <p className="text-teal-600 font-bold text-xl mb-12 text-center">What do you want to do today?</p>

        {/* Action Buttons Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          <ActionCard 
            title="Sounds" 
            desc="Learn A-B-C sounds" 
            icon={<Volume2 className="w-10 h-10" />} 
            color="bg-pink-400" 
            shadowColor="shadow-[0_8px_0_0_#db2777]"
            onClick={() => setView("phonics")}
          />
          <ActionCard 
            title="Write" 
            desc="Master your writing" 
            icon={<PenTool className="w-10 h-10" />} 
            color="bg-teal-400" 
            shadowColor="shadow-[0_8px_0_0_#0d9488]"
            onClick={() => setView("writing")}
          />
          <ActionCard 
            title="Reading" 
            desc="Play with words" 
            icon={<BookOpen className="w-10 h-10" />} 
            color="bg-pink-400" 
            shadowColor="shadow-[0_8px_0_0_#db2777]"
            onClick={() => setView("reading")}
          />
          <ActionCard 
            title="Stories" 
            desc="Listen & enjoy" 
            icon={<HomeIcon className="w-10 h-10" />} 
            color="bg-teal-400" 
            shadowColor="shadow-[0_8px_0_0_#0d9488]"
            onClick={() => setView("stories")}
          />
          <ActionCard 
            title="Diary" 
            desc="Write your story" 
            icon={<BookText className="w-10 h-10" />} 
            color="bg-pink-400" 
            shadowColor="shadow-[0_8px_0_0_#db2777]"
            onClick={() => setView("diary")}
          />
          <ActionCard 
            title="Wardrobe" 
            desc="Change your look" 
            icon={<div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-4xl">👗</div>} 
            color="bg-teal-400" 
            shadowColor="shadow-[0_8px_0_0_#0d9488]"
            onClick={() => setView("avatar")}
          />
        </div>
      </motion.div>
    </div>
  );
};

const ActionCard = ({ title, desc, icon, color, shadowColor, onClick }: any) => (
  <motion.button
    whileHover={{ y: -5 }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
    className={`${color} ${shadowColor} w-full p-8 rounded-[36px] flex flex-col items-center gap-4 text-white hover:brightness-105 transition-all group`}
  >
    <div className="p-4 bg-white/20 rounded-3xl group-hover:scale-110 transition-transform">
      {icon}
    </div>
    <div className="text-center">
      <h3 className="text-2xl font-black uppercase tracking-widest leading-none mb-2">{title}</h3>
      <p className="text-white/80 font-bold text-sm tracking-tight">{desc}</p>
    </div>
  </motion.button>
);

const Phonics = ({ onBack }: { onBack: () => void }) => {
  return (
    <div className="pt-32 pb-12 px-6 max-w-6xl mx-auto relative">
      <BackButton onClick={onBack} />
      <header className="mb-10 text-center">
        <h2 className="text-5xl font-black text-teal-900 mb-2 uppercase tracking-tight">The Alphabet</h2>
        <p className="text-teal-600 font-bold opacity-70">Tap and hear the magic sounds!</p>
      </header>

      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-7 gap-6">
        {ALPHABET_DATA.map((item) => (
          <motion.button
            key={item.letter}
            whileHover={{ y: -5, rotate: 2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              speak(`${item.letter}. ${item.letter} is for ${item.word}`);
            }}
            style={{ 
              backgroundColor: item.color,
              borderColor: 'rgba(0,0,0,0.1)'
            }}
            className="aspect-square rounded-[2rem] p-4 flex flex-col items-center justify-between shadow-xl text-white border-b-8"
          >
            <span className="text-6xl font-black">{item.letter}</span>
            <div className="bg-white/20 w-full py-1 rounded-xl">
              <p className="text-xs font-black uppercase tracking-widest">{item.word}</p>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
};

const Writing = ({ onBack }: { onBack: () => void }) => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = React.useState(false);
  const [mode, setMode] = React.useState<"alphabet" | "words">("alphabet");
  const [currentLetter, setCurrentLetter] = React.useState(ALPHABET_DATA[0]);
  const [currentCategory, setCurrentCategory] = React.useState<keyof typeof READING_CATEGORIES>("ANIMALS");
  const [currentWordIdx, setCurrentWordIdx] = React.useState(0);
  const [isUppercase, setIsUppercase] = React.useState(true);
  const [showSuccess, setShowSuccess] = React.useState(false);

  const words = READING_CATEGORIES[currentCategory];
  const activeWord = words[currentWordIdx];
  
  const activeChar = mode === "alphabet" 
    ? (isUppercase ? currentLetter.letter : currentLetter.letter.toLowerCase())
    : (isUppercase ? activeWord.word : activeWord.word.toLowerCase());

  const playSuccess = () => {
    speak("Great job, Shinhye!", true);
    setShowSuccess(true);
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#2dd4bf", "#f97316", "#10b981", "#ec4899"]
    });
    setTimeout(() => setShowSuccess(false), 2000);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Guide text - scale factor for longer words
    const fontSize = mode === "alphabet" ? 240 : Math.max(60, 240 / (activeChar.length * 0.6));
    ctx.font = `900 ${fontSize}px Inter`;
    ctx.fillStyle = "rgba(13, 148, 136, 0.08)";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(activeChar, canvas.width / 2, canvas.height / 2);
  };

  React.useEffect(() => {
    clearCanvas();
  }, [currentLetter, isUppercase, mode, activeChar]);

  const startDrawing = (e: any) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX || e.touches?.[0]?.clientX) - rect.left;
    const y = (e.clientY || e.touches?.[0]?.clientY) - rect.top;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.strokeStyle = "#2dd4bf";
    ctx.lineWidth = 18;
    ctx.lineCap = "round";
    setIsDrawing(true);
  };

  const draw = (e: any) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX || e.touches?.[0]?.clientX) - rect.left;
    const y = (e.clientY || e.touches?.[0]?.clientY) - rect.top;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => setIsDrawing(false);

  const handleDone = () => {
    playSuccess();
    setTimeout(() => {
      if (mode === "alphabet") {
        const idx = ALPHABET_DATA.findIndex(l => l.letter === currentLetter.letter);
        const nextIdx = (idx + 1) % ALPHABET_DATA.length;
        setCurrentLetter(ALPHABET_DATA[nextIdx]);
      } else {
        setCurrentWordIdx((prev) => (prev + 1) % words.length);
      }
      clearCanvas();
    }, 1500);
  };

  return (
    <div className="pt-32 pb-12 px-6 flex flex-col items-center relative">
      <BackButton onClick={onBack} />
      <header className="mb-8 text-center">
        <h2 className="text-5xl font-black text-teal-900 uppercase tracking-tight">Let's Write!</h2>
        <p className="text-teal-700 font-bold opacity-70">
          Trace the {mode === "alphabet" ? (isUppercase ? "Big Letter" : "Small Letter") : `Word: ${activeWord.word}`}
        </p>
      </header>

      <div className="flex flex-col lg:flex-row gap-10 items-center justify-center w-full max-w-5xl">
        <div className="bg-white p-6 md:p-8 rounded-[40px] border-8 border-teal-100 shadow-2xl relative overflow-hidden flex flex-col items-center w-full sm:w-auto">
          
          <AnimatePresence>
            {showSuccess && (
              <motion.div 
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                className="absolute inset-0 z-20 flex items-center justify-center bg-white/80 pointer-events-none"
              >
                <div className="text-center">
                  <div className="text-7xl mb-2">🌟</div>
                  <div className="text-4xl font-black text-pink-500 uppercase">Excellent!</div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex flex-wrap gap-2 mb-6 bg-teal-50 p-2 rounded-2xl border-4 border-teal-100 justify-center">
            <button 
              onClick={() => setMode("alphabet")}
              className={`px-4 md:px-6 py-2 rounded-xl font-black text-xs uppercase transition-all ${mode === "alphabet" ? "bg-teal-500 text-white shadow-md" : "text-teal-400 hover:bg-teal-100"}`}
            >
              ABC
            </button>
            <button 
              onClick={() => setMode("words")}
              className={`px-4 md:px-6 py-2 rounded-xl font-black text-xs uppercase transition-all ${mode === "words" ? "bg-teal-500 text-white shadow-md" : "text-teal-400 hover:bg-teal-100"}`}
            >
              Words
            </button>
            <div className="w-[1px] h-6 bg-teal-100 self-center mx-1" />
            <button 
              onClick={() => setIsUppercase(true)}
              className={`px-4 md:px-6 py-2 rounded-xl font-black text-xs uppercase transition-all ${isUppercase ? "bg-pink-500 text-white shadow-md" : "text-pink-400 hover:bg-pink-50"}`}
            >
              BIG
            </button>
            <button 
              onClick={() => setIsUppercase(false)}
              className={`px-4 md:px-6 py-2 rounded-xl font-black text-xs uppercase transition-all ${!isUppercase ? "bg-pink-500 text-white shadow-md" : "text-pink-400 hover:bg-pink-50"}`}
            >
              small
            </button>
          </div>

          <canvas
            ref={canvasRef}
            width={mode === "alphabet" ? 350 : 500}
            height={350}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            onTouchStart={startDrawing}
            onTouchMove={draw}
            onTouchEnd={stopDrawing}
            className="cursor-crosshair bg-white rounded-3xl border-4 border-dashed border-teal-200 w-full max-w-full"
          />
          <div className="flex gap-4 mt-8 w-full">
            <button
              onClick={clearCanvas}
              className="flex-1 py-4 px-6 bg-white border-4 border-gray-200 text-gray-500 font-black rounded-2xl hover:bg-gray-50 uppercase tracking-widest text-xs"
            >
              Clear
            </button>
            <button
              onClick={handleDone}
              className="flex-1 py-4 px-6 bg-teal-500 text-white font-black rounded-2xl shadow-[0_6px_0_0_#0d9488] hover:translate-y-1 transition-all active:shadow-none uppercase tracking-widest text-xs"
            >
              Done! 🌟
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-4 items-center">
          {mode === "alphabet" ? (
            <div className="flex flex-wrap gap-2 max-w-md justify-center">
              {ALPHABET_DATA.map((l) => (
                <button
                  key={l.letter}
                  onClick={() => {
                    setCurrentLetter(l);
                    clearCanvas();
                  }}
                  className={`w-12 h-12 rounded-2xl font-black transition-all border-b-4 ${
                    currentLetter.letter === l.letter 
                      ? "bg-pink-500 border-pink-700 text-white scale-110 shadow-lg" 
                      : "bg-white border-gray-100 text-gray-300 hover:bg-gray-50"
                  }`}
                >
                  {l.letter}
                </button>
              ))}
            </div>
          ) : (
            <div className="bg-white p-6 rounded-3xl shadow-xl border-4 border-teal-100 w-full max-w-sm">
              <p className="text-teal-900 font-black text-center mb-4 uppercase tracking-widest text-xs">Pick a Word Group</p>
              <div className="grid grid-cols-2 gap-2 mb-6">
                {Object.keys(READING_CATEGORIES).map(cat => (
                  <button
                    key={cat}
                    onClick={() => {
                      setCurrentCategory(cat as any);
                      setCurrentWordIdx(0);
                    }}
                    className={`px-3 py-2 rounded-xl font-black text-xs uppercase border-b-4 transition-all ${
                      currentCategory === cat ? "bg-teal-400 border-teal-600 text-white" : "bg-teal-50 border-teal-100 text-teal-600"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
              <div className="flex flex-wrap gap-2 justify-center max-h-40 overflow-y-auto p-2 bg-gray-50 rounded-xl">
                 {words.map((w, idx) => (
                   <button
                    key={w.word}
                    onClick={() => {
                      setCurrentWordIdx(idx);
                    }}
                    className={`px-4 py-2 rounded-xl font-black text-xs uppercase transition-all ${
                      currentWordIdx === idx ? "bg-pink-500 text-white" : "bg-white text-pink-300"
                    }`}
                   >
                     {w.word}
                   </button>
                 ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const Reading = ({ onBack }: { onBack: () => void }) => {
  const [category, setCategory] = React.useState<keyof typeof READING_CATEGORIES>("ANIMALS");
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [solved, setSolved] = React.useState(false);

  // Recording states
  const [isRecording, setIsRecording] = React.useState(false);
  const [audioUrl, setAudioUrl] = React.useState<string | null>(null);
  const [recError, setRecError] = React.useState(false);
  const mediaRecorderRef = React.useRef<MediaRecorder | null>(null);
  const chunksRef = React.useRef<Blob[]>([]);

  const currentWords = READING_CATEGORIES[category];

  const startRecording = async () => {
    setRecError(false);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      // Determine supported type (WebM for Chrome/FF, MP4 for Safari)
      const mimeType = MediaRecorder.isTypeSupported("audio/webm") 
        ? "audio/webm" 
        : MediaRecorder.isTypeSupported("audio/mp4") 
          ? "audio/mp4" 
          : "";

      const mediaRecorder = new MediaRecorder(stream, { mimeType });
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: mimeType || "audio/ogg" });
        const url = URL.createObjectURL(blob);
        setAudioUrl(url);
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
      setAudioUrl(null);
    } catch (err) {
      console.error("Microphone access denied or failed", err);
      setRecError(true);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const playRecording = () => {
    if (audioUrl) {
      const audio = new Audio(audioUrl);
      audio.play();
    }
  };

  const nextWord = () => {
    setSolved(false);
    setAudioUrl(null);
    setCurrentIndex((prev) => (prev + 1) % currentWords.length);
  };

  return (
    <div className="pt-32 pb-12 px-6 flex flex-col items-center relative">
      <BackButton onClick={onBack} />
      <header className="mb-10 text-center">
        <h2 className="text-5xl font-black text-teal-900 uppercase tracking-tight">Word Time!</h2>
        <p className="text-pink-400 font-bold opacity-70">Pick a group and read!</p>
      </header>

      <div className="flex flex-wrap gap-3 justify-center mb-10 w-full max-w-2xl">
        {Object.keys(READING_CATEGORIES).map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setCategory(cat as any);
              setCurrentIndex(0);
              setSolved(false);
            }}
            className={`px-6 py-2 rounded-2xl font-black text-sm uppercase transition-all border-b-4 ${
              category === cat 
                ? "bg-teal-500 border-teal-700 text-white shadow-lg" 
                : "bg-white border-teal-100 text-teal-400 hover:bg-teal-50"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="w-full max-w-lg">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${category}-${currentIndex}`}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            className="bg-white rounded-[40px] p-12 shadow-2xl text-center border-8 border-pink-100 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-pink-50 rounded-bl-[100px] -z-0 opacity-50" />
            <div className="text-9xl mb-8 relative z-10">{currentWords[currentIndex].image}</div>
            <div className="flex flex-wrap gap-2 justify-center mb-10 relative z-10">
              {currentWords[currentIndex].combo.map((char, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0, rotate: -10 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: i * 0.1, type: "spring" }}
                  className="w-14 h-18 sm:w-16 sm:h-20 bg-teal-50 rounded-2xl flex items-center justify-center text-4xl font-black text-teal-900 shadow-inner border-4 border-teal-100"
                >
                  {char}
                </motion.div>
              ))}
            </div>
            
            <div className="flex flex-col gap-4">
              <button
                onClick={() => {
                  speak(currentWords[currentIndex].word);
                  if (!solved) {
                    setSolved(true);
                    confetti({
                      particleCount: 150,
                      spread: 100,
                      origin: { y: 0.6 },
                      colors: ["#2dd4bf", "#ec4899"]
                    });
                  }
                }}
                className="w-full py-5 bg-teal-500 text-white font-black text-2xl rounded-3xl shadow-[0_8px_0_0_#0d9488] hover:translate-y-1 transition-all active:shadow-none uppercase tracking-tighter flex items-center justify-center gap-3"
              >
                <Volume2 className="w-8 h-8" />
                Listen!
              </button>

              <div className="flex gap-4">
                {!isRecording ? (
                  <button
                    onClick={startRecording}
                    className="flex-1 py-4 bg-red-100 text-red-600 font-black rounded-2xl border-4 border-red-200 hover:bg-red-200 transition-all uppercase text-sm flex items-center justify-center gap-2"
                  >
                    <Mic className="w-5 h-5" />
                    Record
                  </button>
                ) : (
                  <button
                    onClick={stopRecording}
                    className="flex-1 py-4 bg-red-600 text-white font-black rounded-2xl border-4 border-red-800 animate-pulse transition-all uppercase text-sm flex items-center justify-center gap-2"
                  >
                    <Square className="w-5 h-5" />
                    STOP
                  </button>
                )}

                {audioUrl && (
                  <button
                    onClick={playRecording}
                    className="flex-1 py-4 bg-teal-100 text-teal-600 font-black rounded-2xl border-4 border-teal-200 hover:bg-teal-200 transition-all uppercase text-sm flex items-center justify-center gap-2"
                  >
                    <Play className="w-5 h-5" />
                    Hear Me
                  </button>
                )}
              </div>

              {recError && (
                <div className="bg-red-50 p-3 rounded-xl border-2 border-red-100">
                  <p className="text-red-500 text-[10px] uppercase font-black text-center leading-tight">
                    Microphone blocked! Please open the app in a new tab ↗️ to record.
                  </p>
                </div>
              )}
            </div>

            {solved && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                onClick={nextWord}
                className="mt-10 bg-pink-500 text-white px-10 py-4 rounded-2xl font-black shadow-[0_4px_0_0_#db2777] hover:translate-y-1 transition-all uppercase tracking-widest text-sm flex items-center justify-center gap-2 mx-auto"
              >
                Next word <RefreshCw className="w-4 h-4" />
              </motion.button>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

const Stories = ({ onBack }: { onBack: () => void }) => {
  const [storyType, setStoryType] = React.useState<"short" | "long">("short");
  const [currentStoryIdx, setCurrentStoryIdx] = React.useState(0);
  const [showQuiz, setShowQuiz] = React.useState(false);
  const [quizResult, setQuizResult] = React.useState<null | boolean>(null);
  const [currentPage, setCurrentPage] = React.useState(0);

  const filteredStories = STORIES_DATA.filter(s => s.type === storyType);
  const story = filteredStories[currentStoryIdx] || filteredStories[0];

  const handleAnswer = (option: string) => {
    if (option === story.quiz.answer) {
      setQuizResult(true);
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#2dd4bf", "#ec4899"]
      });
      speak("Excellent! You are right!");
    } else {
      setQuizResult(false);
      speak("Try again, Shinhye!");
    }
  };

  const nextStory = () => {
    const nextIdx = (currentStoryIdx + 1) % filteredStories.length;
    setCurrentStoryIdx(nextIdx);
    setShowQuiz(false);
    setQuizResult(null);
    setCurrentPage(0);
  };

  const handleTypeChange = (type: "short" | "long") => {
    setStoryType(type);
    setCurrentStoryIdx(0);
    setShowQuiz(false);
    setQuizResult(null);
    setCurrentPage(0);
  };

  return (
    <div className="pt-32 pb-12 px-6 flex flex-col items-center relative">
      <BackButton onClick={onBack} />
      <header className="mb-6 text-center">
        <h2 className="text-5xl font-black text-teal-900 uppercase tracking-tight">Story Time</h2>
        <p className="text-pink-400 font-bold opacity-70 italic font-serif">Read along with Shinhye!</p>
      </header>

      {/* Type Toggle */}
      <div className="flex bg-white p-2 rounded-2xl border-4 border-teal-100 mb-8 shadow-sm">
        <button 
          onClick={() => handleTypeChange("short")}
          className={`px-8 py-2 rounded-xl font-black text-xs uppercase transition-all ${storyType === "short" ? "bg-pink-500 text-white shadow-md" : "text-pink-400 hover:bg-pink-50"}`}
        >
          Short Stories
        </button>
        <button 
          onClick={() => handleTypeChange("long")}
          className={`px-8 py-2 rounded-xl font-black text-xs uppercase transition-all ${storyType === "long" ? "bg-pink-500 text-white shadow-md" : "text-pink-400 hover:bg-pink-50"}`}
        >
          Adventure Stories
        </button>
      </div>

      <div className="w-full max-w-2xl bg-white rounded-[40px] border-8 border-pink-100 shadow-2xl p-8 md:p-12 min-h-[500px] flex flex-col">
        <AnimatePresence mode="wait">
          {!showQuiz ? (
            <motion.div
              key={`${storyType}-${currentStoryIdx}-${currentPage}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="text-center flex-1 flex flex-col"
            >
              <motion.div 
                animate={{ 
                  y: [0, -20, 0],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 4,
                  ease: "easeInOut"
                }}
                className="text-8xl mb-8 drop-shadow-xl"
              >
                {story.emoji}
              </motion.div>
              <h3 className="text-4xl font-black text-teal-600 mb-8 uppercase tracking-widest drop-shadow-sm font-sans underline decoration-teal-100 decoration-8 underline-offset-8">{story.title}</h3>
              
              <div className="flex-1 flex items-center justify-center min-h-[160px] bg-teal-50/30 rounded-3xl p-6 mb-8 border-2 border-dashed border-teal-100">
                <motion.p 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  key={currentPage + currentStoryIdx}
                  className="text-2xl md:text-4xl font-bold text-gray-700 leading-snug tracking-tight"
                >
                  {storyType === "short" ? story.content[0] : story.content[currentPage]}
                </motion.p>
              </div>

              {storyType === "long" && (
                <div className="flex items-center justify-center gap-4 mb-8">
                  {story.content.map((_, idx) => (
                    <div 
                      key={idx} 
                      className={`h-3 rounded-full transition-all ${idx === currentPage ? "w-8 bg-teal-500" : "w-3 bg-teal-100"}`}
                    />
                  ))}
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-4 mt-auto">
                <button
                  onClick={() => speak(storyType === "short" ? story.content[0] : story.content[currentPage])}
                  className="flex-1 py-4 bg-teal-100 text-teal-600 font-black rounded-2xl hover:bg-teal-200 uppercase transition-all"
                >
                  Listen 🔊
                </button>

                {storyType === "long" && currentPage < story.content.length - 1 ? (
                  <button
                    onClick={() => setCurrentPage(prev => prev + 1)}
                    className="flex-[2] py-4 bg-pink-500 text-white font-black text-xl rounded-2xl shadow-[0_6px_0_0_#db2777] hover:translate-y-1 transition-all active:shadow-none uppercase"
                  >
                    Next Page →
                  </button>
                ) : (
                  <button
                    onClick={() => setShowQuiz(true)}
                    className="flex-[2] py-4 bg-teal-500 text-white font-black text-xl rounded-2xl shadow-[0_6px_0_0_#0d9488] hover:translate-y-1 transition-all active:shadow-none uppercase tracking-widest"
                  >
                    Take Quiz! ✍️
                  </button>
                )}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="quiz"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center"
            >
              <div className="w-20 h-20 bg-teal-100 rounded-2xl flex items-center justify-center text-4xl mx-auto mb-6 shadow-inner">❓</div>
              <h3 className="text-3xl font-black text-teal-900 mb-8 uppercase tracking-tight leading-tight">{story.quiz.question}</h3>
              
              <div className="grid gap-4 mb-8">
                {story.quiz.options.map((option) => (
                  <button
                    key={option}
                    onClick={() => handleAnswer(option)}
                    className={`py-5 px-6 rounded-2xl font-black text-xl transition-all border-4 ${
                      quizResult === true && option === story.quiz.answer
                        ? "bg-green-500 border-green-700 text-white"
                        : quizResult === false && option !== story.quiz.answer
                        ? "bg-red-50 border-red-200 text-red-300"
                        : "bg-white border-teal-100 text-teal-900 hover:bg-teal-50 shadow-sm"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>

              {quizResult === true ? (
                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  onClick={nextStory}
                  className="w-full py-5 bg-pink-500 text-white font-black text-xl rounded-2xl shadow-[0_6px_0_0_#db2777] hover:translate-y-1 transition-all active:shadow-none uppercase tracking-widest"
                >
                  Next Adventure! 🚀
                </motion.button>
              ) : quizResult === false && (
                <p className="text-red-500 font-black animate-bounce mt-4 uppercase">Oops! Try again Shinhye!</p>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

const AvatarCreator = ({ avatarConfig, setAvatarConfig, onSave, onBack }: any) => {
  const options = {
    hair: ["long", "bob", "curly", "pigtails", "shaved", "short"],
    eyes: ["happy", "surprised", "wink", "shaded", "round"],
    mouth: ["smile", "laughing", "tongue", "pout"],
    baseColor: ["f8d9ce", "e0a39a", "8d5524", "ffdbac"],
    hairColor: ["2c1b18", "b58143", "d6b672", "e22c2c", "000000"]
  };

  const currentUrl = `https://api.dicebear.com/7.x/lorelei/svg?seed=${avatarConfig.seed}&hair=${avatarConfig.hair}&eyes=${avatarConfig.eyes}&mouth=${avatarConfig.mouth}&backgroundColor=${avatarConfig.baseColor}&hairColor=${avatarConfig.hairColor}`;

  return (
    <div className="pt-32 pb-12 px-6 flex flex-col items-center max-w-4xl mx-auto relative">
      <BackButton onClick={onBack} />
      <header className="mb-8 text-center">
        <h2 className="text-5xl font-black text-teal-900 uppercase tracking-tight">Style Shinhye!</h2>
        <p className="text-pink-400 font-bold opacity-70">Make your character look just like you!</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center w-full">
        <div className="bg-white rounded-[40px] border-8 border-teal-100 p-10 shadow-2xl flex flex-col items-center">
          <div className="w-64 h-64 bg-teal-50 rounded-full border-8 border-white shadow-inner mb-6 flex items-center justify-center overflow-hidden">
            <img src={currentUrl} alt="Avatar Preview" className="w-full h-full" referrerPolicy="no-referrer" />
          </div>
          <button 
            onClick={onSave}
            className="w-full py-4 bg-teal-500 text-white font-black text-2xl rounded-3xl shadow-[0_8px_0_0_#0d9488] hover:translate-y-1 transition-all active:shadow-none"
          >
            I LOVE IT! ❤️
          </button>
        </div>

        <div className="space-y-6">
          <AvatarOption 
            label="Hair Style" 
            options={options.hair} 
            value={avatarConfig.hair} 
            onChange={(v: any) => setAvatarConfig({...avatarConfig, hair: v})} 
            colorClass="bg-pink-500"
          />
          <AvatarOption 
            label="Eyes" 
            options={options.eyes} 
            value={avatarConfig.eyes} 
            onChange={(v: any) => setAvatarConfig({...avatarConfig, eyes: v})} 
            colorClass="bg-teal-500"
          />
          <AvatarOption 
            label="Mouth" 
            options={options.mouth} 
            value={avatarConfig.mouth} 
            onChange={(v: any) => setAvatarConfig({...avatarConfig, mouth: v})} 
            colorClass="bg-pink-500"
          />
          <div className="flex gap-2 flex-wrap bg-white p-4 rounded-3xl border-4 border-teal-50">
            {options.hairColor.map(color => (
              <button 
                key={color}
                onClick={() => setAvatarConfig({...avatarConfig, hairColor: color})}
                className={`w-10 h-10 rounded-full border-4 ${avatarConfig.hairColor === color ? "border-teal-400" : "border-white"}`}
                style={{ backgroundColor: `#${color}` }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const AvatarOption = ({ label, options, value, onChange, colorClass }: any) => (
  <div className="w-full bg-white p-6 rounded-3xl shadow-md border-4 border-teal-50">
    <p className="text-teal-900 font-black mb-2 uppercase text-sm tracking-widest">{label}</p>
    <div className="flex flex-wrap gap-2">
      {options.map((opt: any) => (
        <button
          key={opt}
          onClick={() => onChange(opt)}
          className={`px-4 py-2 rounded-xl font-bold capitalize transition-all ${
            value === opt ? `${colorClass} text-white shadow-md` : "bg-teal-50 text-teal-300 hover:bg-teal-100"
          }`}
        >
          {opt}
        </button>
      ))}
    </div>
  </div>
);

const Diary = ({ onBack }: { onBack: () => void }) => {
  const [entry, setEntry] = React.useState(() => localStorage.getItem("shinhye_diary") || "");
  const [isListening, setIsListening] = React.useState(false);
  const [language, setLanguage] = React.useState<"en-US" | "ko-KR">("en-US");

  const recognitionRef = React.useRef<any>(null);

  React.useEffect(() => {
    if (typeof window !== 'undefined' && ('webkitSpeechRecognition' in window || 'speechRecognition' in window)) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).speechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;

      recognitionRef.current.onresult = (event: any) => {
        let finalTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          }
        }

        if (finalTranscript) {
          setEntry(prev => {
            const newEntry = prev + (prev ? ' ' : '') + finalTranscript;
            localStorage.setItem("shinhye_diary", newEntry);
            return newEntry;
          });
        }
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error("Speech recognition error", event.error);
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
  }, [entry]);

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop();
    } else {
      if (recognitionRef.current) {
        recognitionRef.current.lang = language;
        recognitionRef.current.start();
        setIsListening(true);
      } else {
        alert("Speech recognition is not supported in this browser.");
      }
    }
  };

  const handleSave = (val: string) => {
    setEntry(val);
    localStorage.setItem("shinhye_diary", val);
  };

  return (
    <div className="pt-32 pb-12 px-6 flex flex-col items-center min-h-screen relative">
      <BackButton onClick={onBack} />
      <header className="mb-8 text-center">
        <h2 className="text-5xl font-black text-teal-600 uppercase tracking-tight">English Diary</h2>
        <p className="text-pink-400 font-bold opacity-70 italic font-serif">Speak or Write your story, Shinhye!</p>
      </header>

      <div className="w-full max-w-3xl bg-white rounded-[40px] border-8 border-teal-100 shadow-2xl p-8 relative overflow-hidden">
        {/* Paper lines decoration */}
        <div className="absolute inset-x-8 inset-y-8 pointer-events-none opacity-20 border-l-4 border-pink-200">
          {[...Array(15)].map((_, i) => (
            <div key={i} className="h-12 border-b-2 border-teal-200" />
          ))}
        </div>

        <textarea
          value={entry}
          onChange={(e) => handleSave(e.target.value)}
          placeholder="Today I learned..."
          className="w-full h-[400px] bg-transparent relative z-10 text-2xl font-bold text-teal-900 leading-[48px] focus:outline-none resize-none px-4 py-0 placeholder-teal-100"
        />

        <div className="mt-8 flex flex-col gap-6 relative z-10">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 flex bg-teal-50 p-2 rounded-2xl border-4 border-teal-100">
               <button 
                onClick={() => setLanguage("en-US")}
                className={`flex-1 py-2 rounded-xl font-black text-xs uppercase transition-all ${language === "en-US" ? "bg-teal-500 text-white shadow-md" : "text-teal-400"}`}
              >
                English
              </button>
              <button 
                onClick={() => setLanguage("ko-KR")}
                className={`flex-1 py-2 rounded-xl font-black text-xs uppercase transition-all ${language === "ko-KR" ? "bg-pink-500 text-white shadow-md" : "text-pink-400"}`}
              >
                Korean
              </button>
            </div>
            
            <button
              onClick={toggleListening}
              className={`flex-[2] py-4 rounded-2xl font-black text-xl shadow-lg hover:translate-y-1 transition-all active:shadow-none uppercase tracking-widest flex items-center justify-center gap-3 border-4 ${
                isListening 
                  ? "bg-red-500 text-white border-red-700 animate-pulse" 
                  : "bg-white text-teal-600 border-teal-100 hover:bg-teal-50"
              }`}
            >
              {isListening ? <Square className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
              {isListening ? "Listening..." : "Speak Now!"}
            </button>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => speak(entry || "Please write something first!")}
              className="flex-1 py-4 bg-teal-500 text-white font-black rounded-2xl shadow-[0_6px_0_0_#0d9488] hover:translate-y-1 transition-all active:shadow-none uppercase tracking-widest flex items-center justify-center gap-3"
            >
              <Volume2 className="w-6 h-6" />
              Replay My Story 🔊
            </button>
            
            <button
              onClick={() => {
                if (confirm("Do you want to start a new page?")) {
                  handleSave("");
                }
              }}
              className="py-4 px-8 bg-pink-50 text-pink-400 font-black rounded-2xl border-4 border-pink-100 hover:bg-white transition-all uppercase text-xs"
            >
              New Page
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [view, setView] = React.useState("home");
  const [avatarConfig, setAvatarConfig] = React.useState({
    hair: "long",
    eyes: "happy",
    mouth: "smile",
    baseColor: "f8d9ce",
    hairColor: "2c1b18",
    seed: "Shinhye"
  });

  const avatarUrl = `https://api.dicebear.com/7.x/lorelei/svg?seed=${avatarConfig.seed}&hair=${avatarConfig.hair}&eyes=${avatarConfig.eyes}&mouth=${avatarConfig.mouth}&backgroundColor=${avatarConfig.baseColor}&hairColor=${avatarConfig.hairColor}`;

  return (
    <div className="min-h-screen bg-transparent font-sans selection:bg-teal-200">
      <main>
        {view === "home" && <Home setView={setView} avatarUrl={avatarUrl} />}
        {view === "phonics" && <Phonics onBack={() => setView("home")} />}
        {view === "writing" && <Writing onBack={() => setView("home")} />}
        {view === "reading" && <Reading onBack={() => setView("home")} />}
        {view === "stories" && <Stories onBack={() => setView("home")} />}
        {view === "diary" && <Diary onBack={() => setView("home")} />}
        {view === "avatar" && (
          <AvatarCreator 
            avatarConfig={avatarConfig} 
            setAvatarConfig={setAvatarConfig} 
            onBack={() => setView("home")}
            onSave={() => {
              speak("You look beautiful!");
              setView("home");
            }} 
          />
        )}
      </main>

      <footer className="py-8 text-center text-gray-400 text-xs mt-auto">
        <p>© 2026 Shinhye's English World • Made with ❤️ for Shinhye</p>
      </footer>
    </div>
  );
}
