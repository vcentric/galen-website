import React from 'react';
import Link from 'next/link';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

export const metadata = {
  title: 'Privacy Policy | GalenAI',
};

export default function PrivacyPage() {
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
          Privacy Policy
        </h1>
        
        <div className="prose prose-lg text-dark/80 max-w-none space-y-6">
          <p>
            GalenAI Private Limited (“GalenAI”, “we”, “our”, “us”) is committed to safeguarding the privacy and security of the personal data entrusted to us by our customers, their authorised users, and institutional partners.
          </p>
          <p>
            This Privacy Policy describes how we handle personal data and institutional information in connection with the provision of our subscription-based AI-powered medical learning and productivity platform (the “Services”).
          </p>
          <p>
            This Privacy Policy forms part of our contractual commitments under the Enterprise SaaS Agreement and is aligned with applicable Global and Indian data protection laws, including:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Digital Personal Data Protection Act, 2023</li>
            <li>Information Technology Act, 2000</li>
            <li>Other relevant regulations</li>
          </ul>
          <p>
            By subscribing to and using the Services, you acknowledge and consent to the practices described herein.
          </p>

          <h2 className="text-xl font-semibold mt-10 mb-4 text-dark">1. Categories of Data Processed</h2>
          <p>Depending on the scope of the Services procured, we may process the following categories of data:</p>

          <h3 className="text-lg font-medium mt-6 mb-2 text-dark">1.1 Institutional and Account Data</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>Customer name, institutional details, faculty/student identifiers, and administrative contact information.</li>
            <li>User account details such as email addresses, usernames, passwords, payment mode details, and access preferences.</li>
          </ul>

          <h3 className="text-lg font-medium mt-6 mb-2 text-dark">1.2 Learning and Usage Data</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>Study progress, flashcard activity, clinical case responses, AI Co-Pilot interactions, analytics reports, and performance dashboards.</li>
            <li>Wellbeing mode usage insights (e.g., study breaks, stress prompts) in anonymised or aggregated form only.</li>
          </ul>

          <h3 className="text-lg font-medium mt-6 mb-2 text-dark">1.3 Transaction and Billing Data</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>Payment-related information such as billing address and GST details.</li>
            <li>Payment credentials are handled exclusively by authorised payment processors; GalenAI does not store full card or bank details.</li>
          </ul>

          <h3 className="text-lg font-medium mt-6 mb-2 text-dark">1.4 Technical and Log Data</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>Device identifiers, IP address, browser and operating system details, login timestamps, usage patterns, and error logs.</li>
          </ul>

          <h3 className="text-lg font-medium mt-6 mb-2 text-dark">1.5 Third-Party or Integrated Data</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>Information provided by institutional partners or integrated learning management systems, limited to academic and access-related information.</li>
          </ul>

          <h2 className="text-xl font-semibold mt-10 mb-4 text-dark">2. Purpose and Basis of Processing</h2>
          <p>GalenAI processes personal and institutional data only for the following purposes:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Service Delivery:</strong> To provide, operate, and maintain the Services, including account provisioning, personalised learning pathways, multilingual support, and institutional reporting.</li>
            <li><strong>Improvement and Innovation:</strong> To enhance platform features, improve AI models (using de-identified data), and conduct product research and analytics.</li>
            <li><strong>Compliance and Security:</strong> To ensure lawful use, protect against fraud or unauthorised access, and comply with applicable laws and regulatory requirements.</li>
            <li><strong>Support and Communication:</strong> To respond to support requests, notify about system updates, and share service-related communications.</li>
            <li><strong>Billing and Administration:</strong> To process subscription payments, manage invoices, and maintain records for statutory compliance.</li>
          </ul>
          <p>Processing is carried out under contractual necessity, compliance with law, and legitimate business interests as defined by applicable Indian regulations.</p>

          <h2 className="text-xl font-semibold mt-10 mb-4 text-dark">3. Data Sharing and Disclosure</h2>
          <p>GalenAI does not sell or monetise Customer Data. Data may be disclosed only in the following situations:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Within the Institution:</strong> Certain usage or performance data may be made available to the subscribing institution for academic and administrative purposes.</li>
            <li><strong>Service Providers:</strong> Third-party vendors providing hosting, cloud storage, payment processing, analytics, or customer support. These entities are bound by confidentiality and data protection obligations equivalent to those of GalenAI.</li>
            <li><strong>Legal Requirements:</strong> Where disclosure is required by law, regulation, or judicial order.</li>
            <li><strong>Corporate Restructuring:</strong> In connection with a merger, acquisition, or transfer of assets, subject to confidentiality safeguards.</li>
            <li><strong>Sub processors:</strong> Where necessary for hosting or data management, with equivalent data protection commitments in place.</li>
          </ul>

          <h2 className="text-xl font-semibold mt-10 mb-4 text-dark">4. Data Protection and Security</h2>
          <p>GalenAI maintains administrative, technical, and organisational safeguards designed to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Protect Customer Data against unauthorised access, alteration, loss, or disclosure.</li>
            <li>Ensure compliance with the Digital Personal Data Protection Act, 2023 and allied regulations.</li>
            <li>Restrict access to Customer Data to authorised personnel only.</li>
            <li>Employ encryption, access control, and monitoring protocols in line with industry standards.</li>
          </ul>
          <p>In the event of a confirmed data breach affecting Customer Data, GalenAI shall notify the Customer within 72 hours of discovery and cooperate fully in mitigation and remediation.</p>

          <h2 className="text-xl font-semibold mt-10 mb-4 text-dark">5. Data Retention and Deletion</h2>
          <p>GalenAI retains Customer Data for the duration of the active subscription. Following termination or expiry of the Agreement, Customer Data will remain accessible for retrieval by the User for up to fifteen (15) days at no additional charge.</p>
          <p>After this period, GalenAI may continue to retain User Data indefinitely for archival, compliance, backup, and service-improvement purposes, in accordance with applicable data protection and privacy laws. Backups maintained for disaster recovery shall also be retained under the same framework.</p>

          <h2 className="text-xl font-semibold mt-10 mb-4 text-dark">6. Rights of Customers and Users</h2>
          <p>Subject to applicable law, Customers and Authorised Users have the right to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Access and obtain copies of their personal data processed by GalenAI.</li>
            <li>Request rectification or correction of inaccurate data.</li>
            <li>Request deletion of personal data, subject to contractual or legal retention requirements.</li>
            <li>Withdraw consent for processing (where consent is the legal basis).</li>
          </ul>
          <p>Requests may be submitted by emailing <a href="mailto:info@galenai.io" className="text-orange underline hover:text-orange/80">info@galenai.io</a>. Institutional customers may also designate an authorised administrator to coordinate rights requests on behalf of their users.</p>

          <h2 className="text-xl font-semibold mt-10 mb-4 text-dark">7. Responsibilities of Institutions</h2>
          <h3 className="text-lg font-medium mt-6 mb-2 text-dark">7.1</h3>
          <p>Where Services are provided to an institution, the institution acts as the primary data controller with respect to its Authorised Users. GalenAI acts as a data processor and will process Customer Data only on the institution's documented instructions, as per the SaaS Agreement and this Privacy Policy.</p>
          <h3 className="text-lg font-medium mt-6 mb-2 text-dark">7.2</h3>
          <p>All Users, including individual subscribers and institutions, shall take all necessary measures to ensure lawful and ethical use of the Services. Without limitation, Users shall:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>(a) refrain from using the Services for plagiarism, academic dishonesty, or any form of misrepresentation;</li>
            <li>(b) not upload, distribute, or store infringing or unauthorised copyrighted works (including entire textbooks, journal PDFs, or proprietary materials);</li>
            <li>(c) ensure compliance with applicable intellectual property, privacy, and ethical standards under law and institutional codes of conduct; and</li>
            <li>(d) prevent any unauthorised or fraudulent use of the Services.</li>
            <li>(e) Institutions shall further ensure that their Authorised Users comply with these obligations.</li>
            <li>(f) Any misuse or breach by an Authorised User shall be deemed a breach by the Institution.</li>
          </ul>

          <h2 className="text-xl font-semibold mt-10 mb-4 text-dark">8. Use of Knowledge Sources and Transformative Outputs</h2>
          <h3 className="text-lg font-medium mt-6 mb-2 text-dark">8.1</h3>
          <p>GalenAI does not copy or reproduce entire textbooks, journals, or other works. Instead, our Services draw on academic and publisher materials and transform them into new educational aids such as explanations, summaries, interactive cases, and learning pathways. These outputs are designed to support study and understanding, with proper references, and are provided only for research, teaching, review, and criticism under fair use or fair dealing principles. GalenAI content is supplementary and does not replace institutionally prescribed textbooks or publisher materials.</p>
          <h3 className="text-lg font-medium mt-6 mb-2 text-dark">8.2</h3>
          <p>GalenAI respects the intellectual property rights of publishers, authors, and content creators. If you believe that our Services inadvertently reference or infringe your copyright, please contact us immediately at <a href="mailto:info@galenai.io" className="text-orange underline hover:text-orange/80">info@galenai.io</a>.</p>

          <h2 className="text-xl font-semibold mt-10 mb-4 text-dark">9. International Data Transfers</h2>
          <p>Although data is primarily processed and stored in India, if cross-border transfers are necessary (e.g., for cloud hosting or analytics), GalenAI shall ensure that equivalent contractual and technical safeguards are applied in line with Indian legal requirements.</p>

          <h2 className="text-xl font-semibold mt-10 mb-4 text-dark">10. Children's Data</h2>
          <p>The Services are designed for medical students, faculty, and professionals. We do not knowingly collect data from individuals under 15 years of age. If such data is identified, GalenAI will delete it promptly.</p>

          <h2 className="text-xl font-semibold mt-10 mb-4 text-dark">11. Policy Updates</h2>
          <p>This Privacy Policy may be revised from time to time to reflect changes in law, technology, or our practices. Updates will be communicated through appropriate channels, including email or in-product notifications. Continued use of the Services after updates constitutes acceptance of the revised Privacy Policy.</p>

          <h2 className="text-xl font-semibold mt-10 mb-4 text-dark">12. Contact Details</h2>
          <p>For all privacy-related queries, rights requests, or concerns, please contact:</p>
          <div className="bg-dark/5 p-6 rounded-lg mt-4">
            <p className="font-semibold text-dark">GalenAI Private Limited</p>
            <p>Door No.1/168-B18 (Flat No.205B), Tower 2, DD Golden Gate, MLA Road, Palachuvadu,</p>
            <p>Kakkanad, Kochi, Ernakulam, Kerala, India, 682037</p>
            <p className="mt-4">Email: <a href="mailto:info@galenai.io" className="text-orange underline hover:text-orange/80">info@galenai.io</a></p>
          </div>
        </div>
      </div>
    </main>
  );
}
