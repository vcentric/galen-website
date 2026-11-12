import React from 'react';
import Link from 'next/link';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

export const metadata = {
  title: 'Terms of Service | GalenAI',
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[var(--color-bg)] flex flex-col font-primary selection:bg-orange/20 selection:text-orange text-dark relative">
      <div className="fixed top-[clamp(0.8rem,1.5vw,1.25rem)] left-[clamp(1.2rem,3vw,2rem)] z-50">
        <Link 
          href="/#contact" 
          className="group flex items-center gap-2.5 px-1.5 py-1.5 sm:px-2.5 sm:py-1.5 bg-white/80 backdrop-blur-xl border border-dark/10 hover:border-dark/20 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)] rounded-full text-dark transition-all duration-300"
        >
          <div className="flex items-center justify-center w-6 h-6 sm:w-[1.7rem] sm:h-[1.7rem] rounded-full bg-dark/5 group-hover:bg-dark/10 transition-colors">
            <ArrowLeftIcon className="w-3.5 h-3.5 text-dark" strokeWidth={2.5} />
          </div>
          <span className="hidden sm:inline pr-2 text-[0.8rem] text-dark/80 group-hover:text-dark transition-colors font-semibold">
            Go Back
          </span>
        </Link>
      </div>
      <div className="flex-1 w-full max-w-[1000px] mx-auto px-[clamp(2rem,6vw,4rem)] pt-[clamp(4rem,7vh,5rem)] pb-[clamp(4rem,10vh,6rem)]">
        <h1 className="text-[clamp(2rem,4vw,3rem)] font-semibold mb-12 text-dark tracking-[-0.02em] text-center">
          Terms of Service
        </h1>
        
        <div className="prose prose-lg text-dark/80 max-w-none space-y-6">
          <h2 className="text-xl font-semibold mt-10 mb-4 text-dark uppercase tracking-wide">Terms and Conditions of Usage</h2>
          
          <p>
            Welcome to GalenAI Private Limited (“GalenAI”, “we”, “us”, “our”). We provide AI-powered learning and productivity tools designed for medical students, faculty, practitioners (doctors), and institutions (the “Services”).
          </p>
          <p>
            By registering an account or using our Services, you agree to be bound by these Terms of Use (“Terms”), along with our Software As a Service Agreement (SAAS), Privacy Policy and any additional policies notified by us. If you do not agree, please discontinue use of the Services.
          </p>

          <h2 className="text-xl font-semibold mt-10 mb-4 text-dark">1. Eligibility and Account Responsibilities</h2>
          
          <h3 className="text-lg font-medium mt-6 mb-2 text-dark">Who May Use the Services</h3>
          <p>The Services are intended solely for educational purposes. You may use the Services if you:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>access them for learning, teaching, training, or other legitimate educational use; and</li>
            <li>agree to comply with these Terms, applicable laws, and all institutional or professional codes of conduct relevant to your use.</li>
          </ul>

          <h3 className="text-lg font-medium mt-6 mb-2 text-dark">Account Creation</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>You must provide accurate, current, and complete information during account creation.</li>
            <li>You are responsible for the security of your login credentials.</li>
            <li>Unless explicitly permitted by GalenAI, account sharing is not allowed.</li>
          </ul>

          <h3 className="text-lg font-medium mt-6 mb-2 text-dark">Institutional Use</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>If your access is provided by an institution (university, hospital, etc.), additional contractual terms may apply.</li>
            <li>Institutions are responsible for ensuring user compliance with laws (e.g., GDPR, HIPAA), institutional codes, and these Terms.</li>
          </ul>

          <h2 className="text-xl font-semibold mt-10 mb-4 text-dark">2. Licence to Use</h2>
          
          <h3 className="text-lg font-medium mt-6 mb-2 text-dark">2.1 Limited Licence</h3>
          <p>GalenAI grants you a personal, limited, revocable, non-exclusive, and non-transferable licence to access and use the Services solely for educational purposes, as defined under the SaaS framework.</p>

          <h3 className="text-lg font-medium mt-6 mb-2 text-dark">2.2 Restrictions</h3>
          <p>You may not:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>use the Services for unauthorised commercial activities;</li>
            <li>decompile, reverse engineer, or tamper with the platform;</li>
            <li>bypass or disable security features;</li>
            <li>sublicense or resell the Services.</li>
          </ul>

          <h3 className="text-lg font-medium mt-6 mb-2 text-dark">Institutional Licence</h3>
          <p>Institutional access is governed by separate agreements, which prevail in case of conflict.</p>

          <h2 className="text-xl font-semibold mt-10 mb-4 text-dark">3. Content and Intellectual Property</h2>
          
          <h3 className="text-lg font-medium mt-6 mb-2 text-dark">Our Content</h3>
          <p>All platform materials (AI-generated content, clinical cases, research content, q-banks, graphics, dashboards, trademarks, software, etc.) belong to GalenAI or its licensors.</p>
          <p>No ownership rights are transferred to you.</p>

          <h3 className="text-lg font-medium mt-6 mb-2 text-dark">Your Content</h3>
          <p>You retain rights over any content you upload (assignments, notes, submissions).</p>
          <p>By uploading content, you grant GalenAI a non-exclusive, royalty-free licence to use it for service delivery and improvement.</p>

          <h3 className="text-lg font-medium mt-6 mb-2 text-dark">Third-Party Content</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>Some materials may be provided by institutional partners.</li>
            <li>Credit or certification is not guaranteed unless explicitly stated.</li>
            <li>GalenAI's use of copyrighted works (e.g., referencing for AI processing) falls under fair use/fair dealing where legally applicable.</li>
            <li>The platform does not reproduce copyrighted works in full.</li>
          </ul>

          <h2 className="text-xl font-semibold mt-10 mb-4 text-dark">4. Fees and Payment</h2>
          
          <h3 className="text-lg font-medium mt-6 mb-2 text-dark">Fees</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>Some Services require payment.</li>
            <li>Prices are listed in INR (₹) and include applicable taxes such as GST.</li>
          </ul>

          <h3 className="text-lg font-medium mt-6 mb-2 text-dark">Payment Processing</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>Payments are handled through authorised gateways.</li>
            <li>GalenAI does not store sensitive banking/card details.</li>
          </ul>

          <h3 className="text-lg font-medium mt-6 mb-2 text-dark">Refunds</h3>
          <p>Refunds are governed by our Refund Policy.</p>

          <h3 className="text-lg font-medium mt-6 mb-2 text-dark">Institutional Billing</h3>
          <p>Enterprise billing, renewal, and termination follow the Enterprise SaaS Agreement.</p>

          <h2 className="text-xl font-semibold mt-10 mb-4 text-dark">5. Security and Acceptable Use</h2>
          
          <h3 className="text-lg font-medium mt-6 mb-2 text-dark">Security Obligations</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>We maintain reasonable safeguards, though no system is fully secure.</li>
            <li>You must report unauthorised account activity to <a href="mailto:info@galenai.io" className="text-orange underline hover:text-orange/80">info@galenai.io</a>.</li>
          </ul>

          <h3 className="text-lg font-medium mt-6 mb-2 text-dark">Prohibited Conduct</h3>
          <p>You agree not to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>upload or transmit unlawful, offensive, harmful, or defamatory material;</li>
            <li>impersonate others or misrepresent your affiliation;</li>
            <li>violate intellectual property, privacy, or proprietary rights;</li>
            <li>engage in malware distribution, phishing, scraping, mining, or similar actions;</li>
            <li>access non-public areas without permission;</li>
            <li>use the Services to train competing AI/ML models;</li>
            <li>overload or disrupt platform operations.</li>
          </ul>

          <h3 className="text-lg font-medium mt-6 mb-2 text-dark">Academic Integrity</h3>
          <p>Using AI-generated content for plagiarism or academic dishonesty is strictly prohibited.</p>

          <h3 className="text-lg font-medium mt-6 mb-2 text-dark">5.3 Institutional and Individual Compliance</h3>
          <p>All users must:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>avoid plagiarism, impersonation, or misrepresentation;</li>
            <li>not upload full copyrighted textbooks, PDFs, or publisher content;</li>
            <li>comply with IP, privacy, and institutional regulations;</li>
            <li>prevent fraudulent or improper use.</li>
          </ul>
          <p>Institutions must ensure compliance by authorised users. User breaches are treated as institutional breaches.</p>

          <h2 className="text-xl font-semibold mt-10 mb-4 text-dark">6. Disclaimers and Limitation of Liability</h2>
          
          <h3 className="text-lg font-medium mt-6 mb-2 text-dark">Educational Purpose Only</h3>
          <p>The Services are educational aids and do not replace professional medical training or clinical decision-making.</p>

          <h3 className="text-lg font-medium mt-6 mb-2 text-dark">General Disclaimer</h3>
          <p>The Services are provided "as is", without warranties of any kind.</p>

          <h3 className="text-lg font-medium mt-6 mb-2 text-dark">Limitation of Liability</h3>
          <p>GalenAI is not liable for:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>indirect, incidental, or consequential damages;</li>
            <li>academic loss (state, marks, credits), data loss, or business loss.</li>
          </ul>
          <p>Liability is limited to fees paid in the previous 12 months.</p>

          <h3 className="text-lg font-medium mt-6 mb-2 text-dark">Accuracy and Clinical Safety</h3>
          <p>AI-generated outputs may be inaccurate or incomplete. They must not be used for diagnosis, treatment, or medical decisions.</p>

          <h3 className="text-lg font-medium mt-6 mb-2 text-dark">No Guarantee of Results</h3>
          <p>GalenAI does not guarantee:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>academic outcomes,</li>
            <li>certifications,</li>
            <li>research performance,</li>
            <li>professional achievements.</li>
          </ul>

          <h3 className="text-lg font-medium mt-6 mb-2 text-dark">Responsibility for Misuse</h3>
          <p>You take responsibility for misinterpretation or misuse of AI content.</p>

          <h3 className="text-lg font-medium mt-6 mb-2 text-dark">No Guarantee of Uptime</h3>
          <p>Maintenance or outages may temporarily affect service availability.</p>

          <h3 className="text-lg font-medium mt-6 mb-2 text-dark">Feature Modification</h3>
          <p>Features may change or be discontinued, with 7 days' notice when possible.</p>

          <h2 className="text-xl font-semibold mt-10 mb-4 text-dark">7. Suspension and Termination</h2>
          <p>GalenAI may suspend or terminate access for violations of:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>these Terms,</li>
            <li>SaaS Agreement,</li>
            <li>institutional rules,</li>
            <li>applicable law.</li>
          </ul>
          <p>You may stop using the Services at any time.</p>

          <h2 className="text-xl font-semibold mt-10 mb-4 text-dark">8. Governing Law and Dispute Resolution</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Governed by the laws of India.</li>
            <li>Parties must attempt amicable resolution first.</li>
            <li>Unresolved matters go to arbitration under the Arbitration and Conciliation Act, 1996.</li>
            <li>Seat: New Delhi</li>
            <li>Language: English</li>
            <li>Arbitrator: Sole, mutually appointed.</li>
          </ul>

          <h2 className="text-xl font-semibold mt-10 mb-4 text-dark">9. Amendments</h2>
          <p>GalenAI may update these Terms for legal, technical, or business reasons.</p>
          <p>Major updates will be notified via email or platform notice. Continued use indicates acceptance.</p>

          <h2 className="text-xl font-semibold mt-10 mb-4 text-dark">10. Consumer Protection and Grievance Redressal</h2>
          
          <h3 className="text-lg font-medium mt-6 mb-2 text-dark">Consumer Rights</h3>
          <p>Direct subscribers are protected under the Consumer Protection Act, 2019.</p>

          <h3 className="text-lg font-medium mt-6 mb-2 text-dark">Refunds and Cancellations</h3>
          <p>Refund claims must be submitted within 7 working days of payment.</p>

          <h3 className="text-lg font-medium mt-6 mb-2 text-dark">Grievance Officer</h3>
          <p>Name: Varun J</p>
          <p>Email: <a href="mailto:info@galenai.com" className="text-orange underline hover:text-orange/80">info@galenai.com</a></p>
          <p>Response Time: 48 working hours</p>
          <p>Resolution Time: 30 days</p>

          <h2 className="text-xl font-semibold mt-10 mb-4 text-dark">11. Contact</h2>
          <div className="bg-dark/5 p-6 rounded-lg mt-4">
            <p className="font-semibold text-dark">GalenAI Private Limited</p>
            <p>No.205B, Tower 2, DD Golden Gate, MLA Road, Palachuvadu, Kakkanad,</p>
            <p>Ernakulam, Kerala, India, 682037</p>
            <p className="mt-4">Email: <a href="mailto:support@galenai.com" className="text-orange underline hover:text-orange/80">support@galenai.com</a></p>
          </div>

        </div>
      </div>
    </main>
  );
}
