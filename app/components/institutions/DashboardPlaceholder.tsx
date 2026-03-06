import React from 'react';

const DashboardPlaceholder = ({ label, accent = false }: { label: string; accent?: boolean }) => (
    <div className="bg-white border rounded-[0.5rem] overflow-hidden w-full h-full flex flex-col border-[#2e2e2e]/[0.08] shadow-sm">
        <div className="flex items-center gap-[6px] px-[18px] py-[14px] border-b border-[#2e2e2e]/[0.06] bg-[#fafaf9]">
            <span className="w-[10px] h-[10px] rounded-full bg-[#2e2e2e]/10" />
            <span className="w-[10px] h-[10px] rounded-full bg-[#2e2e2e]/10" />
            <span className="w-[10px] h-[10px] rounded-full bg-[#2e2e2e]/10" />
            <span className="text-[0.72rem] font-medium text-[#2e2e2e]/45 ml-[6px] tracking-[0.02em]">{label}</span>
        </div>
        <div className="flex flex-col gap-[12px] p-[20px] pb-[40px] flex-1">
            <div className="max-w-[40%] md:max-w-[20%] h-[12px] md:h-[16px] rounded-[6px] bg-[#2e2e2e]/[0.08]" />
            <div className="max-w-[60%] md:max-w-[30%] h-[12px] md:h-[16px] rounded-[6px] bg-[#2e2e2e]/[0.08]" />
            <div className="flex gap-[12px] flex-wrap mt-2">
                <div className="h-[26px] md:h-[32px] w-[80px] md:w-[120px] rounded-[6px] bg-[#2e2e2e]/[0.07]" />
                <div className="h-[26px] md:h-[32px] w-[100px] md:w-[150px] rounded-[6px] bg-[#eb602d]/10" />
                <div className="h-[26px] md:h-[32px] w-[80px] md:w-[120px] rounded-[6px] bg-[#2e2e2e]/[0.07]" />
            </div>
            <div className="grid grid-cols-5 md:grid-cols-10 gap-[8px] md:gap-[12px] mt-6 flex-1">
                {Array.from({ length: 40 }).map((_, i) => (
                    <div
                        key={i}
                        className="h-full min-h-[28px] md:min-h-[40px] rounded-[5px] md:rounded-[8px] bg-[#eb602d]"
                        style={{ opacity: 0.2 + Math.random() * 0.8 }}
                    />
                ))}
            </div>
            <div className="max-w-[40%] md:max-w-[15%] h-[10px] md:h-[14px] rounded-[6px] bg-[#2e2e2e]/[0.08] mt-8" />
        </div>
        <div className="flex gap-[10px] px-[20px] py-[14px] md:py-[20px] border-t border-[#2e2e2e]/[0.06]">
            <div className="h-[8px] md:h-[12px] w-[50px] md:w-[80px] rounded-[4px] bg-[#2e2e2e]/[0.08]" />
            <div className="h-[8px] md:h-[12px] w-[90px] md:w-[120px] rounded-[4px] bg-[#2e2e2e]/[0.08]" />
        </div>
    </div>
);

export default DashboardPlaceholder;
