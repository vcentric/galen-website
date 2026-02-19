"use client";

import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
  return (
    <div className="fixed top-0 left-0 right-0 flex justify-center pt-6 w-full z-[100] pointer-events-none">
      <nav className="flex items-center justify-between bg-[rgba(246,244,241,0.8)] backdrop-blur-[20px] border border-[rgba(46,46,46,0.08)] rounded-full py-2 pr-2 pl-6 w-auto min-w-[600px] max-w-[90%] shadow-[0_2px_8px_rgba(0,0,0,0.04),0_1px_2px_rgba(0,0,0,0.02)] pointer-events-auto">
        <div className="mr-8">
          <a href="/" className="text-xl font-bold text-[#2e2e2e] no-underline tracking-[-0.03em] flex items-center">
            <Image src="/galenai-logo.png" alt="GalenAI" width={152} height={38} className="h-[38px] w-auto transition-opacity duration-200 hover:opacity-80" />
          </a>
        </div>

        <div className="flex-grow flex justify-center mr-8">
          <ul className="flex list-none gap-8 m-0 p-0">
            <li><a href="#features" className="no-underline text-[#2e2e2e] text-[0.95rem] font-medium tracking-[0.01em] transition-opacity duration-200 hover:opacity-70">Features</a></li>
            <li><Link href="/team" className="no-underline text-[#2e2e2e] text-[0.95rem] font-medium tracking-[0.01em] transition-opacity duration-200 hover:opacity-70">Team</Link></li>
            <li><Link href="/blog" className="no-underline text-[#2e2e2e] text-[0.95rem] font-medium tracking-[0.01em] transition-opacity duration-200 hover:opacity-70">Blog</Link></li>
            <li><a href="#login" className="no-underline text-[#2e2e2e] text-[0.95rem] font-medium tracking-[0.01em] transition-opacity duration-200 hover:opacity-70">Login</a></li>
          </ul>
        </div>

        <div className="flex items-center">
          <a href="#ask" className="bg-[#eb602d] text-white no-underline py-[0.6rem] px-[1.4rem] rounded-full text-[0.95rem] font-medium transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] whitespace-nowrap animate-[subtle-pulse_4s_ease-in-out_infinite] hover:scale-105 active:scale-[0.98]">
            Ask GalenAI
          </a>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
