const WhatsAppContact = () => {
  return (
    <section className="py-12 px-8 bg-transparent max-[480px]:py-10 max-[480px]:px-6">
      <div className="max-w-[1200px] mx-auto">
        <div className="bg-gradient-to-br from-[#d4f4dd] to-[#e8f8ed] rounded-[1.25rem] py-8 px-12 flex items-center justify-between gap-16 shadow-[0_4px_20px_rgba(0,0,0,0.06)] relative overflow-hidden max-[768px]:flex-col max-[768px]:py-10 max-[768px]:px-8 max-[768px]:gap-8 max-[768px]:text-center max-[480px]:py-8 max-[480px]:px-6">
          {/* Content */}
          <div className="flex-1 max-w-[700px] max-[768px]:max-w-full">
            <h3 className="text-[1.75rem] font-bold text-[#1a5d3a] mb-2 tracking-[-0.02em] max-[768px]:text-2xl max-[480px]:text-[1.35rem]">
              Have questions? We&apos;re here to help
            </h3>
            <p className="text-[0.95rem] text-[#2d6a4f] leading-[1.5] mb-5 flex items-center flex-wrap gap-[0.35rem] max-[768px]:justify-center max-[480px]:text-[0.9rem]">
              Connect with our team on WhatsApp
              <svg
                className="w-[18px] h-[18px] text-[#25D366] shrink-0"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
              for personalized guidance on how GalenAI can support your medical
              education journey
            </p>
            <button className="bg-[#25D366] text-white border-none py-[0.875rem] px-7 rounded-[0.625rem] text-[0.95rem] font-semibold cursor-pointer inline-flex items-center gap-2 transition-all duration-300 shadow-[0_4px_12px_rgba(37,211,102,0.3)] hover:bg-[#20bd5a] hover:-translate-y-[2px] hover:shadow-[0_6px_16px_rgba(37,211,102,0.4)] active:translate-y-0 max-[480px]:w-full max-[480px]:justify-center">
              <svg
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
              Chat on WhatsApp
            </button>
          </div>

          {/* Graphics */}
          <div className="shrink-0 relative max-[768px]:hidden">
            <div className="relative w-[140px] h-[140px]">
              <div className="bg-white rounded-[0.875rem] p-4 shadow-[0_4px_12px_rgba(0,0,0,0.08)] relative z-[2]">
                <div className="flex items-center gap-[0.625rem]">
                  <div className="w-8 h-8 bg-gradient-to-br from-[#25D366] to-[#20bd5a] rounded-full shrink-0" />
                  <div className="flex-1 flex flex-col gap-[0.4rem]">
                    <div className="h-[6px] bg-[#e0e0e0] rounded-[3px]" />
                    <div className="h-[6px] bg-[#e0e0e0] rounded-[3px] w-[60%]" />
                  </div>
                </div>
              </div>
              <div className="absolute bottom-[15px] right-[5px] z-[3] w-[42px] h-[42px] bg-white rounded-full p-[0.625rem] shadow-[0_4px_12px_rgba(0,0,0,0.1)] animate-[float_3s_ease-in-out_infinite]">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="w-full h-full text-[#25D366]"
                >
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
              </div>
              <div
                className="absolute top-[5px] left-[-5px] z-[1] w-9 h-9 bg-white rounded-full p-[0.625rem] shadow-[0_4px_12px_rgba(0,0,0,0.1)] animate-[float_3s_ease-in-out_infinite]"
                style={{ animationDelay: "1.5s" }}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="w-full h-full text-[#25D366]"
                >
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatsAppContact;
