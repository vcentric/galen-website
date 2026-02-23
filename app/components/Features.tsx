"use client";

import React from "react";
const Features = () => {
  return (
    <section className="w-full py-[clamp(3rem,8vw,5rem)] px-[clamp(1rem,5vw,2rem)] font-sans">
      <div className="max-w-[1200px] mx-auto flex flex-col items-start mb-[clamp(1rem,3vw,1.5rem)]">
        <span className="text-[clamp(0.7rem,1vw,0.85rem)] text-[#666] font-semibold tracking-widest uppercase">
          FEATURES
        </span>
      </div>
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-[clamp(1rem,3vw,1.5rem)] auto-rows-[clamp(280px,30vw,340px)]">
        
        {/* 1. AI Tutor (Col 1, Spans 2 Rows) */}
        <div className="md:col-span-1 md:row-span-2 bg-[#b9a5e8] rounded-[32px] p-[clamp(1.5rem,3vw,2rem)] flex flex-col relative overflow-hidden shadow-sm">
          <h2 className="text-[clamp(1.5rem,4vw,1.875rem)] leading-tight font-serif font-bold text-[#351a5e] tracking-tight mb-[clamp(1.5rem,4vw,2rem)]">
            AI Tutor
          </h2>

          {/* Mock Floating Cards */}
          <div className="relative w-full flex-1 flex items-center justify-center min-h-[200px]">
            <div className="absolute w-[180px] h-[240px] bg-blue-400 rounded-xl transform rotate-[15deg] translate-x-4 border-4 border-white shadow-lg overflow-hidden">
                <div className="w-full h-full bg-[#5b8cdd] p-4 flex flex-col items-center justify-center">
                    <span className="text-6xl">🧠</span>
                </div>
            </div>
            <div className="absolute w-[180px] h-[240px] bg-white rounded-xl transform -rotate-6 -translate-x-4 shadow-xl border border-purple-200 overflow-hidden flex flex-col p-3">
              <div className="bg-slate-200 h-2/3 rounded-lg w-full mb-3 flex items-center justify-center text-4xl">🩺</div>
              <div className="font-bold text-slate-800 text-sm mb-1">Clinical Skills</div>
              <div className="text-[8px] text-slate-400 leading-tight">Patient presents with acute chest pain radiating to the left arm. What is your immediate next step in management...</div>
            </div>
          </div>

          {/* Mock Toolbar */}
          <div className="bg-white rounded-2xl p-4 shadow-xl flex justify-between items-center mb-6 relative z-10 w-[110%] -ml-[5%]">
            {["�", "📝", "💡", "🧠", "�", "🩺"].map((icon, i) => (
              <div key={i} className="flex flex-col items-center gap-1">
                <div className="text-xl text-slate-600">{icon}</div>
                <div className="text-[9px] text-slate-400 font-medium">Tool</div>
              </div>
            ))}
          </div>

          <p className="text-[clamp(0.95rem,2vw,1.05rem)] text-[#351a5e] font-medium leading-snug">
            Learn anything clearly. Ask doubts, master concepts, and get instant clarity.
          </p>
        </div>

        {/* 2. Flashcards (Col 2 & 3, Spans 1 Row) */}
        <div className="md:col-span-2 md:row-span-1 bg-[#df8ba9] rounded-[32px] p-[clamp(1.5rem,3vw,2rem)] flex items-center relative overflow-hidden shadow-sm">
          <div className="w-1/2 z-10">
            <h2 className="text-[clamp(1.875rem,5vw,2.25rem)] leading-tight font-serif font-bold text-[#4a1c31] tracking-tight mb-[clamp(0.75rem,2vw,1rem)]">
              Flashcards
            </h2>
            <p className="text-[clamp(1rem,2vw,1.15rem)] text-[#5c213c] font-medium leading-snug max-w-[80%]">
              Active recall + spaced repetition built directly from your syllabus.
            </p>
          </div>
          
          {/* Mock Interval Picker Area */}
          <div className="absolute right-0 top-0 bottom-0 w-1/2 flex items-center justify-center">
             {/* Background tilted card */}
             <div className="absolute w-[200px] h-[280px] bg-[#fca5a5] border-8 border-white rounded-xl rotate-[15deg] shadow-lg translate-x-12">
                <div className="w-full h-full bg-gradient-to-b from-orange-300 to-pink-400 flex flex-col pt-8 items-center">
                    <span className="font-serif font-bold text-2xl text-white tracking-widest rotate-[-15deg]">PHARMACOLOGY</span>
                </div>
             </div>
             {/* Foreground Review Picker */}
             <div className="relative bg-white rounded-3xl p-6 shadow-2xl w-[260px] transform rotate-[-5deg] z-10 translate-x-4">
                <div className="text-center text-xs font-bold text-slate-800 mb-4">When should we show this again?</div>
                <div className="flex justify-between text-xs text-slate-300 mb-2">
                    <div className="text-slate-200">Again</div><div>&lt;1m</div><div>🔴</div>
                </div>
                <div className="flex justify-between text-sm font-bold text-slate-800 bg-slate-100 py-2 px-3 rounded-lg mb-2">
                    <div>Good</div><div>1d</div><div>🟢</div>
                </div>
                <div className="flex justify-between text-xs text-slate-300 mb-6">
                    <div>Easy</div><div>4d</div><div>🔵</div>
                </div>
                <button className="w-full bg-[#1c1c1e] text-white rounded-full py-3 text-sm font-bold">
                    Review Answer
                </button>
             </div>
          </div>
        </div>

        {/* 3. Adaptive MCQs (Col 2, Spans 1 Row) */}
        <div className="md:col-span-1 md:row-span-1 bg-[#b4d69a] rounded-[32px] p-[clamp(1.5rem,3vw,2rem)] flex flex-col justify-end relative overflow-hidden shadow-sm">
           {/* Stacked Cards Mock */}
           <div className="absolute top-8 left-0 right-0 flex justify-center flex-col items-center">
               <div className="w-[85%] h-12 bg-white rounded-t-2xl border-t border-x border-slate-200" />
               <div className="w-[90%] h-12 bg-[#ff8a65] rounded-t-2xl -mt-8 border-t border-x border-orange-200" />
               <div className="w-[95%] h-[140px] bg-[#2a2a2a] rounded-2xl -mt-8 p-5 text-white shadow-xl flex flex-col justify-between z-10">
                   <div className="flex justify-between text-sm font-medium text-slate-300">
                       Overall Mastery <span className="w-5 h-5 rounded-full border border-slate-500 flex items-center justify-center text-[10px]">✔</span>
                   </div>
                   <div className="flex items-end justify-between">
                       <div className="text-4xl font-bold tracking-tight">85<span className="text-2xl ml-1 text-slate-400">%</span></div>
                       <button className="text-[10px] font-bold uppercase tracking-wider bg-white/10 px-3 py-1.5 rounded-full">Review</button>
                   </div>
               </div>
           </div>

           <div className="relative z-20 mt-auto">
              <h2 className="text-[clamp(1.5rem,4vw,1.875rem)] leading-tight font-serif font-bold text-[#2a4115] tracking-tight mb-[clamp(0.5rem,1vw,0.5rem)]">Adaptive MCQs</h2>
              <p className="text-[clamp(0.95rem,2vw,1.05rem)] text-[#38561c] font-medium leading-snug">
                Questions that match your level, tracking your weak areas as you improve.
              </p>
           </div>
        </div>

        {/* 4. Clinical Cases (Col 3, Spans 1 Row) */}
        <div className="md:col-span-1 md:row-span-1 bg-[#f5dc83] rounded-[32px] p-[clamp(1.5rem,3vw,2rem)] flex flex-col relative overflow-hidden shadow-sm">
          <h2 className="text-[clamp(1.5rem,4vw,1.875rem)] leading-tight font-serif font-bold text-[#5c4912] tracking-tight mb-[clamp(0.5rem,1vw,0.5rem)]">Clinical Cases</h2>
          <p className="text-[clamp(0.95rem,2vw,1.05rem)] text-[#6b5617] font-medium leading-snug mb-[clamp(1rem,3vw,1.5rem)] w-5/6">
            Practice diagnosis on realistic clinical scenarios.
          </p>
          
          {/* Mock Inbox List */}
          <div className="bg-white rounded-2xl p-4 shadow-lg flex-1 flex flex-col gap-4">
             {[
                { name: "54yo M with Chest Pain", text: "Case 12 • Cardiology", initial: "12", color: "bg-green-200" },
                { name: "22yo F with Fatigue", text: "Case 18 • Hematology", initial: "18", color: "bg-purple-200" },
                { name: "68yo M with SOB", text: "Case 05 • Pulmonology", initial: "05", color: "bg-yellow-200" }
             ].map((msg, i) => (
                <div key={i} className="flex items-center gap-3">
                   <div className={`w-9 h-9 rounded-full ${msg.color} flex items-center justify-center text-xs font-bold text-slate-700`}>{msg.initial}</div>
                   <div className="flex-1">
                      <div className="text-[13px] font-bold text-slate-800 line-clamp-1">{msg.name}</div>
                      <div className="text-[10px] text-slate-400">{msg.text}</div>
                   </div>
                   <div className="w-8 h-8 rounded-lg bg-slate-100 border border-slate-200" />
                </div>
             ))}
          </div>
        </div>

        {/* 5. Study Planner (Col 1 & 2, Spans 1 Row) */}
        <div className="md:col-span-2 md:row-span-1 bg-[#e79e6f] rounded-[32px] p-[clamp(1.5rem,3vw,2rem)] flex relative overflow-hidden shadow-sm">
           <div className="w-[40%] flex flex-col justify-end z-20">
              <h2 className="text-[clamp(1.875rem,5vw,2.25rem)] leading-tight font-serif font-bold text-[#5c2d12] tracking-tight mb-[clamp(0.5rem,1vw,0.75rem)]">Study Planner</h2>
              <p className="text-[clamp(1rem,2vw,1.15rem)] text-[#783c18] font-medium leading-snug max-w-[90%]">
                Smart daily plans that adapt to your progress.
              </p>
           </div>

           {/* Mock Plan Modules Background */}
           <div className="absolute right-0 top-0 bottom-0 w-[60%] z-10">
               <div className="relative w-full h-full">
                  {/* Mod 1 */}
                  <div className="absolute top-10 left-0 w-32 h-20 bg-[#0f3d87] rounded-xl transform rotate-[-8deg] shadow-md flex items-center justify-center p-2 text-white font-serif text-sm leading-tight text-center border-4 border-white/20">Anatomy &<br/>Physiology</div>
                  {/* Mod 2 */}
                  <div className="absolute top-16 left-36 w-32 h-20 bg-pink-200 rounded-xl transform rotate-[5deg] shadow-md flex items-center justify-center text-[10px] font-bold border-2 border-black tracking-widest text-center text-black">PHARMACOLOGY</div>
                  {/* Mod 3 */}
                  <div className="absolute bottom-10 left-10 w-32 h-20 bg-[#232f3e] rounded-xl transform rotate-[6deg] shadow-md flex items-center justify-center text-white font-bold text-lg border-2 border-white/10 uppercase">pathology</div>
                  {/* Mod 4 */}
                  <div className="absolute top-28 right-8 w-32 h-20 bg-black rounded-xl transform rotate-[-12deg] shadow-md flex items-center justify-center border border-white/20">
                     <div className="w-full h-4 bg-white flex items-center justify-center text-[8px] font-bold tracking-widest text-black">BIOCHEMISTRY</div>
                  </div>
                  {/* Mod 5 */}
                  <div className="absolute bottom-6 left-44 w-32 h-20 bg-[#ff6600] rounded-xl transform rotate-[-4deg] shadow-md flex items-center justify-center text-white text-sm font-bold border-2 border-white/20">Microbiology</div>
                  {/* Mod 6 */}
                  <div className="absolute bottom-4 right-12 w-32 h-20 bg-white rounded-xl transform rotate-[8deg] shadow-md flex items-center justify-center text-[#cc0000] text-sm font-black border border-slate-200">Immunology</div>
               </div>
           </div>
        </div>

        {/* 6. Performance Dashboard (Col 3, Spans 1 Row) */}
        <div className="md:col-span-1 md:row-span-1 bg-[#b4cade] rounded-[32px] p-[clamp(1.5rem,3vw,2rem)] pb-0 flex flex-col relative overflow-hidden shadow-sm">
          <h2 className="text-[clamp(1.5rem,4vw,1.875rem)] leading-tight font-serif font-bold text-[#243c53] tracking-tight mb-[clamp(0.5rem,1vw,0.5rem)]">Performance</h2>
          <p className="text-[clamp(0.95rem,2vw,1.05rem)] text-[#335372] font-medium leading-snug mb-[clamp(1.5rem,4vw,2rem)] w-[90%]">
            Track strengths, gaps, and growth over time
          </p>

          {/* Mock Phone / Notification */}
          <div className="flex-1 bg-[#1a1c1e] w-[90%] mx-auto rounded-t-3xl border-8 border-b-0 border-[#1a1c1e] relative mt-auto overflow-hidden">
             {/* Phone Screen bg */}
             <div className="w-full h-full bg-[#f4f4f4] rounded-t-2xl p-4">
                {/* Dynamic Island / Notch */}
                <div className="w-[100px] h-[30px] bg-black rounded-full mx-auto mb-6"></div>
                
                {/* Notification Bubble */}
                <div className="bg-white rounded-2xl p-3 shadow-sm border border-slate-100 flex gap-3 items-start">
                   <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-xs mt-1 text-xl">🏆</div>
                   <div>
                      <div className="text-xs font-bold text-slate-800">Goal Reached! �</div>
                      <div className="text-[10px] text-slate-500 leading-tight">You've mastered the Pharmacology module! +50 XP �</div>
                   </div>
                </div>
             </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Features;