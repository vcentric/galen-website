import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-[#fff0e4] pt-16 px-8 border-t border-[rgba(0,0,0,0.08)] max-[768px]:pt-12 max-[768px]:px-6 max-[480px]:pt-10 max-[480px]:px-5">
      <div className="max-w-[1200px] mx-auto grid grid-cols-[1.5fr_1fr_1fr_1fr] gap-12 pb-12 max-[1024px]:grid-cols-2 max-[1024px]:gap-10 max-[768px]:grid-cols-1 max-[768px]:gap-10">
        {/* Column 1 - Brand & App */}
        <div className="max-w-[320px] max-[1024px]:max-w-full">
          <img
            src="/galenai-logo.png"
            alt="GalenAI"
            className="h-8 w-auto mb-4"
          />
          <p className="text-[0.9rem] text-[#555] leading-[1.6] mb-7">
            GalenAI is your daily medical learning companion — helping you
            understand, revise, and apply medicine better.
          </p>

          <h4 className="text-[0.875rem] font-bold text-[#2e2e2e] uppercase tracking-[0.05em] mb-4 mt-6">
            Download the App
          </h4>
          <div className="flex flex-col gap-3 mb-7">
            <a
              href="https://apps.apple.com/in/app/galenai/id6755653561"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white border border-[rgba(0,0,0,0.12)] rounded-[0.625rem] py-[0.625rem] px-4 flex items-center gap-3 no-underline transition-all duration-200 hover:border-[#eb602d] hover:bg-[rgba(235,96,45,0.02)] hover:-translate-y-[1px]"
            >
              <svg
                className="w-6 h-6 text-[#2e2e2e] shrink-0"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
              </svg>
              <div className="flex flex-col items-start">
                <span className="text-[0.65rem] text-[#777] font-normal">
                  Download on the
                </span>
                <span className="text-[0.875rem] text-[#2e2e2e] font-semibold">
                  App Store
                </span>
              </div>
            </a>
            <a
              href="https://play.google.com/store/apps/details?id=com.galenai.galenai"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white border border-[rgba(0,0,0,0.12)] rounded-[0.625rem] py-[0.625rem] px-4 flex items-center gap-3 no-underline transition-all duration-200 hover:border-[#eb602d] hover:bg-[rgba(235,96,45,0.02)] hover:-translate-y-[1px]"
            >
              <svg
                className="w-6 h-6 text-[#2e2e2e] shrink-0"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
              </svg>
              <div className="flex flex-col items-start">
                <span className="text-[0.65rem] text-[#777] font-normal">
                  Get it on
                </span>
                <span className="text-[0.875rem] text-[#2e2e2e] font-semibold">
                  Google Play
                </span>
              </div>
            </a>
          </div>

          <h4 className="text-[0.875rem] font-bold text-[#2e2e2e] uppercase tracking-[0.05em] mb-4 mt-6">
            Follow us
          </h4>
          <div className="flex gap-[0.875rem] max-[480px]:gap-[0.625rem]">
            {[
              {
                label: "Instagram",
                href: "https://instagram.com/galenai",
                icon: "M7.8,2H16.2C19.4,2 22,4.6 22,7.8V16.2A5.8,5.8 0 0,1 16.2,22H7.8C4.6,22 2,19.4 2,16.2V7.8A5.8,5.8 0 0,1 7.8,2M7.6,4A3.6,3.6 0 0,0 4,7.6V16.4C4,18.39 5.61,20 7.6,20H16.4A3.6,3.6 0 0,0 20,16.4V7.6C20,5.61 18.39,4 16.4,4H7.6M17.25,5.5A1.25,1.25 0 0,1 18.5,6.75A1.25,1.25 0 0,1 17.25,8A1.25,1.25 0 0,1 16,6.75A1.25,1.25 0 0,1 17.25,5.5M12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9Z",
              },
              {
                label: "Twitter",
                href: "https://twitter.com/galenai",
                icon: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
              },
              {
                label: "LinkedIn",
                href: "https://linkedin.com/company/galenai",
                icon: "M19 3A2 2 0 0 1 21 5V19A2 2 0 0 1 19 21H5A2 2 0 0 1 3 19V5A2 2 0 0 1 5 3H19M18.5 18.5V13.2A3.26 3.26 0 0 0 15.24 9.94C14.39 9.94 13.4 10.46 12.92 11.24V10.13H10.13V18.5H12.92V13.57C12.92 12.8 13.54 12.17 14.31 12.17A1.4 1.4 0 0 1 15.71 13.57V18.5H18.5M6.88 8.56A1.68 1.68 0 0 0 8.56 6.88C8.56 5.95 7.81 5.19 6.88 5.19A1.69 1.69 0 0 0 5.19 6.88C5.19 7.81 5.95 8.56 6.88 8.56M8.27 18.5V10.13H5.5V18.5H8.27Z",
              },
              {
                label: "YouTube",
                href: "https://youtube.com/@galenai",
                icon: "M10,15L15.19,12L10,9V15M21.56,7.17C21.69,7.64 21.78,8.27 21.84,9.07C21.91,9.87 21.94,10.56 21.94,11.16L22,12C22,14.19 21.84,15.8 21.56,16.83C21.31,17.73 20.73,18.31 19.83,18.56C19.36,18.69 18.5,18.78 17.18,18.84C15.88,18.91 14.69,18.94 13.59,18.94L12,19C7.81,19 5.2,18.84 4.17,18.56C3.27,18.31 2.69,17.73 2.44,16.83C2.31,16.36 2.22,15.73 2.16,14.93C2.09,14.13 2.06,13.44 2.06,12.84L2,12C2,9.81 2.16,8.2 2.44,7.17C2.69,6.27 3.27,5.69 4.17,5.44C4.64,5.31 5.5,5.22 6.82,5.16C8.12,5.09 9.31,5.06 10.41,5.06L12,5C16.19,5 18.8,5.16 19.83,5.44C20.73,5.69 21.31,6.27 21.56,7.17Z",
              },
            ].map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center bg-white border border-[rgba(0,0,0,0.1)] rounded-full transition-all duration-200 text-[#555] hover:bg-[#eb602d] hover:border-[#eb602d] hover:text-white hover:-translate-y-[2px] max-[480px]:w-8 max-[480px]:h-8"
                aria-label={social.label}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-[18px] h-[18px] max-[480px]:w-4 max-[480px]:h-4"
                >
                  <path d={social.icon} />
                </svg>
              </a>
            ))}
          </div>
        </div>

        {/* Column 2 - Company */}
        <div>
          <h4 className="text-[0.875rem] font-bold text-[#2e2e2e] uppercase tracking-[0.05em] mb-4 mt-6">
            Company
          </h4>
          <ul className="list-none p-0 m-0 flex flex-col gap-3">
            {[
              { label: "About GalenAI", href: "/about" },
              { label: "Our Mission", href: "/mission" },
              { label: "Join the Team", href: "/careers" },
              { label: "Pricing", href: "/pricing" },
              { label: "FAQs", href: "/faq" },
              { label: "Contact Us", href: "/contact" },
            ].map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="text-[0.9rem] text-[#555] no-underline transition-colors duration-200 inline-block hover:text-[#eb602d]"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3 - Study Resources */}
        <div>
          <h4 className="text-[0.875rem] font-bold text-[#2e2e2e] uppercase tracking-[0.05em] mb-4 mt-6">
            Study Resources
          </h4>
          <ul className="list-none p-0 m-0 flex flex-col gap-3">
            {[
              { label: "CBME Curriculum Guide (Latest)", href: "/cbme-curriculum" },
              { label: "Subject-wise Learning Paths", href: "/learning-paths" },
              { label: "Clinical Case Library", href: "/cases" },
              { label: "MCQs & Practice Sets", href: "/mcqs" },
              { label: "Flashcards & Active Recall", href: "/flashcards" },
              { label: "Exam Preparation Guides", href: "/exam-prep" },
              { label: "Blogs & Learning Notes", href: "/blog" },
            ].map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="text-[0.9rem] text-[#555] no-underline transition-colors duration-200 inline-block hover:text-[#eb602d]"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 4 - Contact & Support */}
        <div>
          <h4 className="text-[0.875rem] font-bold text-[#2e2e2e] uppercase tracking-[0.05em] mb-4 mt-6">
            Contact & Support
          </h4>
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-1">
              <span className="text-[0.8rem] text-[#777] font-medium">
                General Queries:
              </span>
              <a
                href="mailto:support@galenai.io"
                className="text-[0.9rem] text-[#eb602d] no-underline transition-colors duration-200 hover:text-[#d14d1f] hover:underline"
              >
                support@galenai.io
              </a>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[0.8rem] text-[#777] font-medium">
                WhatsApp Support:
              </span>
              <a
                href="https://wa.me/918848542046"
                className="text-[0.9rem] text-[#eb602d] no-underline transition-colors duration-200 hover:text-[#d14d1f] hover:underline"
              >
                +91 88485 42046
              </a>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[0.8rem] text-[#777] font-medium">
                Office Location:
              </span>
              <span className="text-[0.9rem] text-[#555]">
                India
              </span>
            </div>
            <p className="text-[0.8rem] text-[#999] italic mt-2">
              Response within 24 hours
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[rgba(0,0,0,0.08)] py-6">
        <div className="max-w-[1200px] mx-auto flex justify-between items-center max-[768px]:flex-col max-[768px]:gap-4 max-[768px]:text-center">
          <p className="text-[0.85rem] text-[#777] m-0">
            © 2025 GalenAI Pvt. Ltd.
          </p>
          <div className="flex items-center gap-3 max-[768px]:flex-wrap max-[768px]:justify-center">
            <a
              href="/terms"
              className="text-[0.85rem] text-[#555] no-underline transition-colors duration-200 hover:text-[#eb602d]"
            >
              Terms of Service
            </a>
            <span className="text-[#ccc] text-[0.85rem]">|</span>
            <a
              href="/privacy"
              className="text-[0.85rem] text-[#555] no-underline transition-colors duration-200 hover:text-[#eb602d]"
            >
              Privacy Policy
            </a>
            <span className="text-[#ccc] text-[0.85rem]">|</span>
            <a
              href="/refund"
              className="text-[0.85rem] text-[#555] no-underline transition-colors duration-200 hover:text-[#eb602d]"
            >
              Refund Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
