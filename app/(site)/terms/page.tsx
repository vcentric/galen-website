import { buildMetadata } from '@/lib/seo';
import LegalPage from '@/app/components/v2/LegalPage';

export const metadata = buildMetadata({
  title: 'Terms of Service',
  description: 'The terms that apply when you use the GalenAI student app, faculty platform and website: accounts, acceptable use, content, payments and liability.',
  path: '/terms',
});

const TOC = [
  { id: "eligibility-and-account-responsibilities", text: "1. Eligibility and Account Responsibilities" },
  { id: "licence-to-use", text: "2. Licence to Use" },
  { id: "content-and-intellectual-property", text: "3. Content and Intellectual Property" },
  { id: "fees-and-payment", text: "4. Fees and Payment" },
  { id: "security-and-acceptable-use", text: "5. Security and Acceptable Use" },
  { id: "disclaimers-and-limitation-of-liability", text: "6. Disclaimers and Limitation of Liability" },
  { id: "suspension-and-termination", text: "7. Suspension and Termination" },
  { id: "governing-law-and-dispute-resolution", text: "8. Governing Law and Dispute Resolution" },
  { id: "amendments", text: "9. Amendments" },
  { id: "consumer-protection-and-grievance-redressal", text: "10. Consumer Protection and Grievance Redressal" },
  { id: "contact", text: "11. Contact" },
];

export default function TermsPage() {
  return (
    <LegalPage title="Terms of" accent="service." path="/terms" toc={TOC}>
      <h2>Terms and Conditions of Usage</h2>

      <p>
        Welcome to GalenAI Private Limited (“GalenAI”, “we”, “us”, “our”). We provide AI-powered learning and productivity tools designed for medical students, faculty, practitioners (doctors), and institutions (the “Services”).
      </p>
      <p>
        By registering an account or using our Services, you agree to be bound by these Terms of Use (“Terms”), along with our Software As a Service Agreement (SAAS), Privacy Policy and any additional policies notified by us. If you do not agree, please discontinue use of the Services.
      </p>

      <h2 id="eligibility-and-account-responsibilities">1. Eligibility and Account Responsibilities</h2>

      <h3>Who May Use the Services</h3>
      <p>The Services are intended solely for educational purposes. You may use the Services if you:</p>
      <ul>
        <li>access them for learning, teaching, training, or other legitimate educational use; and</li>
        <li>agree to comply with these Terms, applicable laws, and all institutional or professional codes of conduct relevant to your use.</li>
      </ul>

      <h3>Account Creation</h3>
      <ul>
        <li>You must provide accurate, current, and complete information during account creation.</li>
        <li>You are responsible for the security of your login credentials.</li>
        <li>Unless explicitly permitted by GalenAI, account sharing is not allowed.</li>
      </ul>

      <h3>Institutional Use</h3>
      <ul>
        <li>If your access is provided by an institution (university, hospital, etc.), additional contractual terms may apply.</li>
        <li>Institutions are responsible for ensuring user compliance with laws (e.g., GDPR, HIPAA), institutional codes, and these Terms.</li>
      </ul>

      <h2 id="licence-to-use">2. Licence to Use</h2>

      <h3>2.1 Limited Licence</h3>
      <p>GalenAI grants you a personal, limited, revocable, non-exclusive, and non-transferable licence to access and use the Services solely for educational purposes, as defined under the SaaS framework.</p>

      <h3>2.2 Restrictions</h3>
      <p>You may not:</p>
      <ul>
        <li>use the Services for unauthorised commercial activities;</li>
        <li>decompile, reverse engineer, or tamper with the platform;</li>
        <li>bypass or disable security features;</li>
        <li>sublicense or resell the Services.</li>
      </ul>

      <h3>Institutional Licence</h3>
      <p>Institutional access is governed by separate agreements, which prevail in case of conflict.</p>

      <h2 id="content-and-intellectual-property">3. Content and Intellectual Property</h2>

      <h3>Our Content</h3>
      <p>All platform materials (AI-generated content, clinical cases, research content, q-banks, graphics, dashboards, trademarks, software, etc.) belong to GalenAI or its licensors.</p>
      <p>No ownership rights are transferred to you.</p>

      <h3>Your Content</h3>
      <p>You retain rights over any content you upload (assignments, notes, submissions).</p>
      <p>By uploading content, you grant GalenAI a non-exclusive, royalty-free licence to use it for service delivery and improvement.</p>

      <h3>Third-Party Content</h3>
      <ul>
        <li>Some materials may be provided by institutional partners.</li>
        <li>Credit or certification is not guaranteed unless explicitly stated.</li>
        <li>GalenAI&apos;s use of copyrighted works (e.g., referencing for AI processing) falls under fair use/fair dealing where legally applicable.</li>
        <li>The platform does not reproduce copyrighted works in full.</li>
      </ul>

      <h2 id="fees-and-payment">4. Fees and Payment</h2>

      <h3>Fees</h3>
      <ul>
        <li>Some Services require payment.</li>
        <li>Prices are listed in INR (₹) and include applicable taxes such as GST.</li>
      </ul>

      <h3>Payment Processing</h3>
      <ul>
        <li>Payments are handled through authorised gateways.</li>
        <li>GalenAI does not store sensitive banking/card details.</li>
      </ul>

      <h3>Refunds</h3>
      <p>Refunds are governed by our Refund Policy.</p>

      <h3>Institutional Billing</h3>
      <p>Enterprise billing, renewal, and termination follow the Enterprise SaaS Agreement.</p>

      <h2 id="security-and-acceptable-use">5. Security and Acceptable Use</h2>

      <h3>Security Obligations</h3>
      <ul>
        <li>We maintain reasonable safeguards, though no system is fully secure.</li>
        <li>You must report unauthorised account activity to <a href="mailto:info@galenai.io">info@galenai.io</a>.</li>
      </ul>

      <h3>Prohibited Conduct</h3>
      <p>You agree not to:</p>
      <ul>
        <li>upload or transmit unlawful, offensive, harmful, or defamatory material;</li>
        <li>impersonate others or misrepresent your affiliation;</li>
        <li>violate intellectual property, privacy, or proprietary rights;</li>
        <li>engage in malware distribution, phishing, scraping, mining, or similar actions;</li>
        <li>access non-public areas without permission;</li>
        <li>use the Services to train competing AI/ML models;</li>
        <li>overload or disrupt platform operations.</li>
      </ul>

      <h3>Academic Integrity</h3>
      <p>Using AI-generated content for plagiarism or academic dishonesty is strictly prohibited.</p>

      <h3>5.3 Institutional and Individual Compliance</h3>
      <p>All users must:</p>
      <ul>
        <li>avoid plagiarism, impersonation, or misrepresentation;</li>
        <li>not upload full copyrighted textbooks, PDFs, or publisher content;</li>
        <li>comply with IP, privacy, and institutional regulations;</li>
        <li>prevent fraudulent or improper use.</li>
      </ul>
      <p>Institutions must ensure compliance by authorised users. User breaches are treated as institutional breaches.</p>

      <h2 id="disclaimers-and-limitation-of-liability">6. Disclaimers and Limitation of Liability</h2>

      <h3>Educational Purpose Only</h3>
      <p>The Services are educational aids and do not replace professional medical training or clinical decision-making.</p>

      <h3>General Disclaimer</h3>
      <p>The Services are provided &quot;as is&quot;, without warranties of any kind.</p>

      <h3>Limitation of Liability</h3>
      <p>GalenAI is not liable for:</p>
      <ul>
        <li>indirect, incidental, or consequential damages;</li>
        <li>academic loss (state, marks, credits), data loss, or business loss.</li>
      </ul>
      <p>Liability is limited to fees paid in the previous 12 months.</p>

      <h3>Accuracy and Clinical Safety</h3>
      <p>AI-generated outputs may be inaccurate or incomplete. They must not be used for diagnosis, treatment, or medical decisions.</p>

      <h3>No Guarantee of Results</h3>
      <p>GalenAI does not guarantee:</p>
      <ul>
        <li>academic outcomes,</li>
        <li>certifications,</li>
        <li>research performance,</li>
        <li>professional achievements.</li>
      </ul>

      <h3>Responsibility for Misuse</h3>
      <p>You take responsibility for misinterpretation or misuse of AI content.</p>

      <h3>No Guarantee of Uptime</h3>
      <p>Maintenance or outages may temporarily affect service availability.</p>

      <h3>Feature Modification</h3>
      <p>Features may change or be discontinued, with 7 days&apos; notice when possible.</p>

      <h2 id="suspension-and-termination">7. Suspension and Termination</h2>
      <p>GalenAI may suspend or terminate access for violations of:</p>
      <ul>
        <li>these Terms,</li>
        <li>SaaS Agreement,</li>
        <li>institutional rules,</li>
        <li>applicable law.</li>
      </ul>
      <p>You may stop using the Services at any time.</p>

      <h2 id="governing-law-and-dispute-resolution">8. Governing Law and Dispute Resolution</h2>
      <ul>
        <li>Governed by the laws of India.</li>
        <li>Parties must attempt amicable resolution first.</li>
        <li>Unresolved matters go to arbitration under the Arbitration and Conciliation Act, 1996.</li>
        <li>Seat: New Delhi</li>
        <li>Language: English</li>
        <li>Arbitrator: Sole, mutually appointed.</li>
      </ul>

      <h2 id="amendments">9. Amendments</h2>
      <p>GalenAI may update these Terms for legal, technical, or business reasons.</p>
      <p>Major updates will be notified via email or platform notice. Continued use indicates acceptance.</p>

      <h2 id="consumer-protection-and-grievance-redressal">10. Consumer Protection and Grievance Redressal</h2>

      <h3>Consumer Rights</h3>
      <p>Direct subscribers are protected under the Consumer Protection Act, 2019.</p>

      <h3>Refunds and Cancellations</h3>
      <p>Refund claims must be submitted within 7 working days of payment.</p>

      <h3>Grievance Officer</h3>
      <p>Name: Varun J</p>
      <p>Email: <a href="mailto:info@galenai.com">info@galenai.com</a></p>
      <p>Response Time: 48 working hours</p>
      <p>Resolution Time: 30 days</p>

      <h2 id="contact">11. Contact</h2>
      <div className="lcallout">
        <p><strong>GalenAI Private Limited</strong></p>
        <p>No.205B, Tower 2, DD Golden Gate, MLA Road, Palachuvadu, Kakkanad,</p>
        <p>Ernakulam, Kerala, India, 682037</p>
        <p>Email: <a href="mailto:support@galenai.com">support@galenai.com</a></p>
      </div>


    </LegalPage>
  );
}
