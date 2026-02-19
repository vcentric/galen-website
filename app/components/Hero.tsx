"use client";

import { useState, useEffect, useCallback } from "react";

const PHRASES = [
  "for daily medical learning",
  "to crack any medical exam",
  "that saves time for you",
];

const keywordPhrases = [
  "Clarity over chaos",
  "Avoid cognitive overload",
  "Mentoring, not more videos",
  "Know where you stand",
  "Know what to study next",
  "Think like a doctor",
  "Assess. Apply.",
  "Make time for yourself",
];

interface SpawnedKeyword {
  id: number;
  text: string;
  x: number;
  y: number;
  rotation: number;
}

const Hero = () => {
  const [textIndex, setTextIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [displayText, setDisplayText] = useState("");
  const [delta, setDelta] = useState(100);
  const [isExpanded, setIsExpanded] = useState(false);
  const [spawnedKeywords, setSpawnedKeywords] = useState<SpawnedKeyword[]>([]);
  const [hoverTimer, setHoverTimer] = useState<NodeJS.Timeout | null>(null);
  const [keywordIndex, setKeywordIndex] = useState(0);

  const tick = useCallback(() => {
    const i = textIndex % PHRASES.length;
    const fullText = PHRASES[i];
    const updatedText = isDeleting
      ? fullText.substring(0, displayText.length - 1)
      : fullText.substring(0, displayText.length + 1);

    setDisplayText(updatedText);

    if (isDeleting) {
      setDelta(50);
    }

    if (!isDeleting && updatedText === fullText) {
      setIsDeleting(true);
      setDelta(2000);
    } else if (isDeleting && updatedText === "") {
      setIsDeleting(false);
      setTextIndex(textIndex + 1);
      setDelta(100);
    } else if (!isDeleting && updatedText !== fullText) {
      setDelta(100);
    }
  }, [displayText, isDeleting, textIndex]);

  useEffect(() => {
    const ticker = setInterval(() => {
      tick();
    }, delta);
    return () => clearInterval(ticker);
  }, [tick, delta]);

  const spawnKeyword = useCallback(
    (x: number, y: number) => {
      const phrase = keywordPhrases[keywordIndex % keywordPhrases.length];
      const rotation = Math.random() * 10 - 5;

      const newKeyword: SpawnedKeyword = {
        id: Date.now(),
        text: phrase,
        x,
        y,
        rotation,
      };

      setSpawnedKeywords((prev) => [...prev, newKeyword]);
      setKeywordIndex((prev) => prev + 1);

      setTimeout(() => {
        setSpawnedKeywords((prev) =>
          prev.filter((k) => k.id !== newKeyword.id)
        );
      }, 8000);
    },
    [keywordIndex]
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (hoverTimer) clearTimeout(hoverTimer);

    const timer = setTimeout(() => {
      spawnKeyword(x, y);
    }, 2500);

    setHoverTimer(timer);
  };

  const handleMouseLeave = () => {
    if (hoverTimer) {
      clearTimeout(hoverTimer);
      setHoverTimer(null);
    }
  };

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    spawnKeyword(x, y);
  };

  const handlePlayClick = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <section
      className="pt-32 pb-12 px-8 bg-[#f6f4f1] flex justify-center overflow-visible relative"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      {/* Notebook Paper Background */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background: `repeating-linear-gradient(transparent, transparent 31px, rgba(173,216,230,0.15) 31px, rgba(173,216,230,0.15) 32px), linear-gradient(to bottom, #faf8f5 0%, #f8f6f3 100%)`,
        }}
      />

      {/* Pencil Keywords */}
      <div className="absolute inset-0 z-[1] pointer-events-none">
        {spawnedKeywords.map((keyword) => (
          <div
            key={keyword.id}
            className="absolute font-[Caveat,Kalam,cursive] text-[1.1rem] text-[#4a4a4a] opacity-0 whitespace-nowrap font-medium tracking-[0.02em] animate-[writeInFadeOut_8s_ease-out_forwards]"
            style={{
              left: `${keyword.x}px`,
              top: `${keyword.y}px`,
              transform: `translate(-50%, -50%) rotate(${keyword.rotation}deg)`,
            }}
          >
            {keyword.text}
          </div>
        ))}
      </div>

      <div className="max-w-[1200px] w-full grid grid-cols-[1.2fr_0.8fr] gap-12 items-center relative z-[2] max-[900px]:grid-cols-1 max-[900px]:text-center">
        {/* Left Column: Text */}
        <div className="flex flex-col max-[900px]:items-center">
          {/* Audience Toggle */}
          <div className="inline-flex gap-8 mb-7 font-[Inter,system-ui,-apple-system,sans-serif]">
            <button className="p-0 pb-1 rounded-none text-[1.1rem] font-medium border-none bg-transparent text-[#2e2e2e] cursor-pointer opacity-100 border-b-2 border-b-[#eb602d]">
              Students
            </button>
            <button className="p-0 pb-1 rounded-none text-[1.1rem] font-normal border-none bg-transparent text-[#2e2e2e] cursor-pointer opacity-50 border-b-2 border-b-transparent hover:opacity-75">
              Institutions
            </button>
          </div>

          {/* Exam Keywords */}
          <div className="flex gap-6 mb-8 font-[Inter,system-ui,-apple-system,sans-serif]">
            {["NEET PG", "NEET SS", "EMREE", "FMGE"].map((exam) => (
              <span
                key={exam}
                className="text-[0.875rem] font-medium text-[#2e2e2e] opacity-40 tracking-[0.05em] uppercase"
              >
                {exam}
              </span>
            ))}
          </div>

          <h1 className="text-[3.5rem] font-medium leading-[1.1] text-[#2e2e2e] mb-8 tracking-[-0.03em]">
            Your personal AI companion <br />
            <span className="text-[#eb602d] italic font-[Georgia,serif]">
              &gt; {displayText}
            </span>
            <span className="font-thin text-[#eb602d] animate-[blink_1s_step-end_infinite] ml-1">
              |
            </span>
          </h1>

          <p className="text-[1.25rem] leading-[1.6] text-[rgba(46,46,46,0.7)] max-w-[500px] mb-12">
            GalenAI is your AI medical mentor that explains, tests, and guides
            you, so you spend less time planning and more time understanding.
          </p>

          <div className="flex gap-6 mb-8">
            <a
              href="#ask"
              className="py-[0.8rem] px-8 rounded-xl text-base font-medium no-underline transition-all duration-200 inline-block bg-[#eb602d] text-white border border-[#eb602d] hover:brightness-110 hover:-translate-y-[1px]"
            >
              Ask GalenAI
            </a>
            <a
              href="#download"
              className="py-[0.8rem] px-8 rounded-xl text-base font-medium no-underline transition-all duration-200 inline-block text-[#2e2e2e] border border-[rgba(46,46,46,0.2)] bg-transparent hover:bg-[rgba(46,46,46,0.05)]"
            >
              Download Now
            </a>
          </div>

          <div className="flex items-center gap-12 text-[0.875rem] text-[rgba(46,46,46,0.6)]">
            <div className="flex items-center gap-2">
              <div className="flex gap-[2px]">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill={star <= 4 ? "#eb602d" : "none"}
                    stroke={star === 5 ? "#eb602d" : "none"}
                    strokeWidth="2"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>
              <span className="font-medium text-[#2e2e2e] ml-1">
                4.2 / 5
              </span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-[0.8rem] opacity-50 uppercase tracking-[0.05em]">
                Backed by
              </span>
              <span className="text-[0.8rem] font-medium text-[rgba(46,46,46,0.5)] tracking-[-0.01em]">
                Kerala Startup Mission
              </span>
              <span className="text-[0.8rem] font-medium text-[rgba(46,46,46,0.5)] tracking-[-0.01em]">
                Google Cloud
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Visual */}
        <div
          className={`relative h-[600px] flex items-center justify-center transition-all duration-800 ease-[cubic-bezier(0.16,1,0.3,1)] z-10 max-[900px]:h-[500px] max-[900px]:mt-8 ${
            isExpanded
              ? "fixed top-0 left-0 w-screen h-screen bg-[rgba(246,244,241,0.98)] z-[1000] backdrop-blur-[20px]"
              : ""
          }`}
        >
          <div className="relative flex items-center justify-center">
            {/* Phone Mockup */}
            <div
              className={`relative w-[240px] h-[490px] bg-[#1a1a1a] rounded-[36px] shadow-[0_30px_60px_rgba(0,0,0,0.15),0_10px_20px_rgba(0,0,0,0.1),inset_0_0_0_1px_rgba(255,255,255,0.1)] border-8 border-[#1a1a1a] transition-all duration-800 ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer overflow-hidden origin-center hover:-translate-y-1 hover:shadow-[0_35px_70px_rgba(0,0,0,0.18),0_15px_25px_rgba(0,0,0,0.12),inset_0_0_0_1px_rgba(255,255,255,0.1)] ${
                isExpanded ? "rotate-90 scale-[1.4]" : ""
              }`}
              onClick={handlePlayClick}
            >
              <div className="w-full h-full bg-white relative overflow-hidden flex items-center justify-center">
                {/* Play Button Overlay */}
                {!isExpanded && (
                  <div className="absolute inset-0 flex items-center justify-center bg-transparent">
                    <div className="w-20 h-20 bg-[#eb602d] rounded-full flex items-center justify-center shadow-[0_8px_24px_rgba(235,96,45,0.4),0_4px_12px_rgba(0,0,0,0.2)] transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-110">
                      <svg
                        width="32"
                        height="32"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path d="M8 5V19L19 12L8 5Z" fill="white" />
                      </svg>
                    </div>
                  </div>
                )}

                {/* Video Content */}
                {isExpanded && (
                  <div className="absolute inset-0 bg-black flex items-center justify-center rounded-[2rem] overflow-hidden z-10">
                    <iframe
                      src="https://www.youtube.com/embed/1l0-dJic1dE?autoplay=1&mute=0&controls=1&rel=0"
                      className="w-full h-full border-none rounded-[2rem]"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Floating Overlays */}
            {!isExpanded && (
              <>
                <div className="absolute top-[10%] left-[-120px] bg-[rgba(255,255,255,0.95)] backdrop-blur-[20px] py-[10px] px-[14px] rounded-[14px] shadow-[0_4px_12px_rgba(0,0,0,0.08),0_1px_3px_rgba(0,0,0,0.06),inset_0_0_0_0.5px_rgba(0,0,0,0.04)] border-[0.5px] border-[rgba(0,0,0,0.06)] flex items-center gap-[10px] z-20 animate-[float_6s_ease-in-out_infinite] max-w-[180px] max-[900px]:hidden">
                  <div className="text-base">🔔</div>
                  <div>
                    <span className="block text-[0.7rem] text-[#2e2e2e] font-semibold mb-[1px]">
                      Revision reminder
                    </span>
                    <span className="block text-[0.75rem] text-[#2e2e2e] font-normal opacity-70">
                      Upper Limb – Today
                    </span>
                  </div>
                </div>

                <div className="absolute bottom-[15%] left-[-100px] bg-[rgba(255,255,255,0.95)] backdrop-blur-[20px] py-[10px] px-[14px] rounded-[14px] shadow-[0_4px_12px_rgba(0,0,0,0.08),0_1px_3px_rgba(0,0,0,0.06),inset_0_0_0_0.5px_rgba(0,0,0,0.04)] border-[0.5px] border-[rgba(0,0,0,0.06)] flex items-center gap-[10px] z-20 animate-[float_6s_ease-in-out_infinite] max-w-[180px] max-[900px]:hidden" style={{ animationDelay: "2s" }}>
                  <div>
                    <span className="block text-[0.7rem] text-[#2e2e2e] font-semibold mb-[1px]">
                      60%
                    </span>
                    <span className="block text-[0.75rem] text-[#2e2e2e] font-normal opacity-70">
                      Competency achieved
                    </span>
                  </div>
                </div>

                <div className="absolute top-[35%] right-[-80px] bg-[rgba(255,255,255,0.95)] backdrop-blur-[20px] py-[10px] px-[14px] rounded-[14px] shadow-[0_4px_12px_rgba(0,0,0,0.08),0_1px_3px_rgba(0,0,0,0.06),inset_0_0_0_0.5px_rgba(0,0,0,0.04)] border-[0.5px] border-[rgba(0,0,0,0.06)] flex items-center gap-[10px] z-20 animate-[float_6s_ease-in-out_infinite] max-w-[180px] max-[900px]:hidden" style={{ animationDelay: "1s" }}>
                  <div className="text-base">⚠️</div>
                  <div>
                    <span className="block text-[0.7rem] text-[#2e2e2e] font-semibold mb-[1px]">
                      Weak area detected
                    </span>
                    <span className="block text-[0.75rem] text-[#2e2e2e] font-normal opacity-70">
                      Shoulder Joint
                    </span>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
