import { buildMetadata } from '@/lib/seo';
import LegalPage from '@/app/components/v2/LegalPage';

export const metadata = buildMetadata({
  title: 'Privacy Policy',
  description: 'How GalenAI collects, uses, stores and protects your data in the student app, the faculty platform and this website, and the choices and rights you have.',
  path: '/privacy',
});

const TOC = [
  { id: "categories-of-data-processed", text: "1. Categories of Data Processed" },
  { id: "purpose-and-basis-of-processing", text: "2. Purpose and Basis of Processing" },
  { id: "data-sharing-and-disclosure", text: "3. Data Sharing and Disclosure" },
  { id: "data-protection-and-security", text: "4. Data Protection and Security" },
  { id: "data-retention-and-deletion", text: "5. Data Retention and Deletion" },
  { id: "rights-of-customers-and-users", text: "6. Rights of Customers and Users" },
  { id: "responsibilities-of-institutions", text: "7. Responsibilities of Institutions" },
  { id: "use-of-knowledge-sources-and-transformative-outputs", text: "8. Use of Knowledge Sources and Transformative Outputs" },
  { id: "international-data-transfers", text: "9. International Data Transfers" },
  { id: "children-s-data", text: "10. Children's Data" },
  { id: "policy-updates", text: "11. Policy Updates" },
  { id: "contact-details", text: "12. Contact Details" },
];

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy" accent="policy." path="/privacy" toc={TOC}>
      <p>
        GalenAI Private Limited (“GalenAI”, “we”, “our”, “us”) is committed to safeguarding the privacy and security of the personal data entrusted to us by our customers, their authorised users, and institutional partners.
      </p>
      <p>
        This Privacy Policy describes how we handle personal data and institutional information in connection with the provision of our subscription-based AI-powered medical learning and productivity platform (the “Services”).
      </p>
      <p>
        This Privacy Policy forms part of our contractual commitments under the Enterprise SaaS Agreement and is aligned with applicable Global and Indian data protection laws, including:
      </p>
      <ul>
        <li>Digital Personal Data Protection Act, 2023</li>
        <li>Information Technology Act, 2000</li>
        <li>Other relevant regulations</li>
      </ul>
      <p>
        By subscribing to and using the Services, you acknowledge and consent to the practices described herein.
      </p>

      <h2 id="categories-of-data-processed">1. Categories of Data Processed</h2>
      <p>Depending on the scope of the Services procured, we may process the following categories of data:</p>

      <h3>1.1 Institutional and Account Data</h3>
      <ul>
        <li>Customer name, institutional details, faculty/student identifiers, and administrative contact information.</li>
        <li>User account details such as email addresses, usernames, passwords, payment mode details, and access preferences.</li>
      </ul>

      <h3>1.2 Learning and Usage Data</h3>
      <ul>
        <li>Study progress, flashcard activity, clinical case responses, AI Co-Pilot interactions, analytics reports, and performance dashboards.</li>
        <li>Wellbeing mode usage insights (e.g., study breaks, stress prompts) in anonymised or aggregated form only.</li>
      </ul>

      <h3>1.3 Transaction and Billing Data</h3>
      <ul>
        <li>Payment-related information such as billing address and GST details.</li>
        <li>Payment credentials are handled exclusively by authorised payment processors; GalenAI does not store full card or bank details.</li>
      </ul>

      <h3>1.4 Technical and Log Data</h3>
      <ul>
        <li>Device identifiers, browser and operating system details, login timestamps, usage patterns, and error logs.</li>
        <li>Raw IP addresses are temporarily processed and immediately hashed for installation attribution purposes (see Section 1.6); they are not stored indefinitely as log data.</li>
      </ul>

      <h3>1.5 Third-Party or Integrated Data</h3>
      <ul>
        <li>Information provided by institutional partners or integrated learning management systems, limited to academic and access-related information.</li>
      </ul>

      <h3>1.6 Installation Attribution Data</h3>
      <p>
        When you tap an advertisement for GalenAI and subsequently install the app, we measure which advertising campaign led to your installation. This processing is conducted solely to assess campaign effectiveness and allocate our marketing budget responsibly. We do not use this data to build user profiles or serve behavioural advertising.
      </p>
      <p><strong>What we collect:</strong></p>
      <ul>
        <li>Campaign parameters from the advertisement link clicked (e.g., utm_source, utm_medium, utm_campaign), which describe the campaign, not you.</li>
        <li>A one-way cryptographic hash of your device&apos;s network (IP) address — used only on iOS to match your click to your install. The raw IP address is never stored by GalenAI.</li>
        <li>Device type and operating system version (e.g., &quot;iPhone, iOS 18.2&quot;), used to improve match accuracy where multiple users share a network.</li>
        <li>Play Install Referrer string (Android only), provided by Google Play upon installation, containing the campaign parameters originally embedded in our advertisement link.</li>
        <li>A referral code, only if voluntarily entered during onboarding.</li>
      </ul>
      <p>
        <strong>What we do not collect:</strong> We do not access your device&apos;s advertising identifier (IDFA on iOS or AAID on Android), store your raw IP address, track you across other apps or websites, build a device fingerprint, or share this data with any third party.
      </p>
      <p>
        <strong>Retention:</strong> Unmatched advertisement click records are deleted within 72 hours. Upon a successful match, the IP hash is immediately deleted; only campaign metadata (source, campaign name, medium) is retained with your account and deleted upon account deletion.
      </p>
      <p>
        <strong>Legal basis:</strong> We rely on your consent, provided when you accept our Terms &amp; Conditions during onboarding. You may opt out by installing the app directly from the app store (without clicking an advertisement link), or by deleting your account at any time.
      </p>
      <p>
        This processing complies with the Digital Personal Data Protection Act, 2023 (India) and, where applicable, the General Data Protection Regulation (GDPR).
      </p>

      <h2 id="purpose-and-basis-of-processing">2. Purpose and Basis of Processing</h2>
      <p>GalenAI processes personal and institutional data only for the following purposes:</p>
      <ul>
        <li><strong>Service Delivery:</strong> To provide, operate, and maintain the Services, including account provisioning, personalised learning pathways, multilingual support, and institutional reporting.</li>
        <li><strong>Marketing Attribution:</strong> To assess advertising campaign effectiveness without profiling users, as outlined in Section 1.6.</li>
        <li><strong>Improvement and Innovation:</strong> To enhance platform features, improve AI models (using de-identified data), and conduct product research and analytics.</li>
        <li><strong>Compliance and Security:</strong> To ensure lawful use, protect against fraud or unauthorised access, and comply with applicable laws and regulatory requirements.</li>
        <li><strong>Support and Communication:</strong> To respond to support requests, notify about system updates, and share service-related communications.</li>
        <li><strong>Billing and Administration:</strong> To process subscription payments, manage invoices, and maintain records for statutory compliance.</li>
      </ul>
      <p>Processing is carried out under contractual necessity, compliance with law, and legitimate business interests as defined by applicable Indian regulations.</p>

      <h2 id="data-sharing-and-disclosure">3. Data Sharing and Disclosure</h2>
      <p>GalenAI does not sell or monetise Customer Data. We also do not share data (including Installation Attribution Data, see Section 1.6) with advertising networks or third parties. Data may be disclosed only in the following situations:</p>
      <ul>
        <li><strong>Within the Institution:</strong> Certain usage or performance data may be made available to the subscribing institution for academic and administrative purposes.</li>
        <li><strong>Service Providers:</strong> Third-party vendors providing hosting, cloud storage, payment processing, analytics, or customer support. These entities are bound by confidentiality and data protection obligations equivalent to those of GalenAI.</li>
        <li><strong>Legal Requirements:</strong> Where disclosure is required by law, regulation, or judicial order.</li>
        <li><strong>Corporate Restructuring:</strong> In connection with a merger, acquisition, or transfer of assets, subject to confidentiality safeguards.</li>
        <li><strong>Sub processors:</strong> Where necessary for hosting or data management, with equivalent data protection commitments in place.</li>
      </ul>

      <h2 id="data-protection-and-security">4. Data Protection and Security</h2>
      <p>GalenAI maintains administrative, technical, and organisational safeguards designed to:</p>
      <ul>
        <li>Protect Customer Data against unauthorised access, alteration, loss, or disclosure.</li>
        <li>Ensure compliance with the Digital Personal Data Protection Act, 2023 and allied regulations.</li>
        <li>Restrict access to Customer Data to authorised personnel only.</li>
        <li>Employ encryption, access control, and monitoring protocols in line with industry standards.</li>
      </ul>
      <p>In the event of a confirmed data breach affecting Customer Data, GalenAI shall notify the Customer within 72 hours of discovery and cooperate fully in mitigation and remediation.</p>

      <h2 id="data-retention-and-deletion">5. Data Retention and Deletion</h2>
      <p>GalenAI retains Customer Data for the duration of the active subscription. Following termination or expiry of the Agreement, Customer Data will remain accessible for retrieval by the User for up to fifteen (15) days at no additional charge.</p>
      <p>After this period, GalenAI may continue to retain User Data indefinitely for archival, compliance, backup, and service-improvement purposes, in accordance with applicable data protection and privacy laws. Backups maintained for disaster recovery shall also be retained under the same framework.</p>
      <p>
        <strong>Exceptions to indefinite retention:</strong> Campaign metadata and unmatched advertisement click records described in Section 1.6 are subject to specific deletion rules and are permanently deleted when you delete your account or within 72 hours, respectively.
      </p>

      <h2 id="rights-of-customers-and-users">6. Rights of Customers and Users</h2>
      <p>Subject to applicable law, Customers and Authorised Users have the right to:</p>
      <ul>
        <li>Access and obtain copies of their personal data processed by GalenAI.</li>
        <li>Request rectification or correction of inaccurate data.</li>
        <li>Request deletion of personal data, subject to contractual or legal retention requirements.</li>
        <li>Withdraw consent for processing (where consent is the legal basis).</li>
      </ul>
      <p>Requests may be submitted by emailing <a href="mailto:info@galenai.io">info@galenai.io</a>. Institutional customers may also designate an authorised administrator to coordinate rights requests on behalf of their users.</p>

      <h2 id="responsibilities-of-institutions">7. Responsibilities of Institutions</h2>
      <h3>7.1</h3>
      <p>Where Services are provided to an institution, the institution acts as the primary data controller with respect to its Authorised Users. GalenAI acts as a data processor and will process Customer Data only on the institution&apos;s documented instructions, as per the SaaS Agreement and this Privacy Policy.</p>
      <h3>7.2</h3>
      <p>All Users, including individual subscribers and institutions, shall take all necessary measures to ensure lawful and ethical use of the Services. Without limitation, Users shall:</p>
      <ul>
        <li>(a) refrain from using the Services for plagiarism, academic dishonesty, or any form of misrepresentation;</li>
        <li>(b) not upload, distribute, or store infringing or unauthorised copyrighted works (including entire textbooks, journal PDFs, or proprietary materials);</li>
        <li>(c) ensure compliance with applicable intellectual property, privacy, and ethical standards under law and institutional codes of conduct; and</li>
        <li>(d) prevent any unauthorised or fraudulent use of the Services.</li>
        <li>(e) Institutions shall further ensure that their Authorised Users comply with these obligations.</li>
        <li>(f) Any misuse or breach by an Authorised User shall be deemed a breach by the Institution.</li>
      </ul>

      <h2 id="use-of-knowledge-sources-and-transformative-outputs">8. Use of Knowledge Sources and Transformative Outputs</h2>
      <h3>8.1</h3>
      <p>GalenAI does not copy or reproduce entire textbooks, journals, or other works. Instead, our Services draw on academic and publisher materials and transform them into new educational aids such as explanations, summaries, interactive cases, and learning pathways. These outputs are designed to support study and understanding, with proper references, and are provided only for research, teaching, review, and criticism under fair use or fair dealing principles. GalenAI content is supplementary and does not replace institutionally prescribed textbooks or publisher materials.</p>
      <h3>8.2</h3>
      <p>GalenAI respects the intellectual property rights of publishers, authors, and content creators. If you believe that our Services inadvertently reference or infringe your copyright, please contact us immediately at <a href="mailto:info@galenai.io">info@galenai.io</a>.</p>

      <h2 id="international-data-transfers">9. International Data Transfers</h2>
      <p>Although data is primarily processed and stored in India, if cross-border transfers are necessary (e.g., for cloud hosting or analytics), GalenAI shall ensure that equivalent contractual and technical safeguards are applied in line with Indian legal requirements.</p>

      <h2 id="children-s-data">10. Children&apos;s Data</h2>
      <p>The Services are designed for medical students, faculty, and professionals. We do not knowingly collect data from individuals under 15 years of age. If such data is identified, GalenAI will delete it promptly.</p>

      <h2 id="policy-updates">11. Policy Updates</h2>
      <p>This Privacy Policy may be revised from time to time to reflect changes in law, technology, or our practices. Updates will be communicated through appropriate channels, including email or in-product notifications. Continued use of the Services after updates constitutes acceptance of the revised Privacy Policy.</p>

      <h2 id="contact-details">12. Contact Details</h2>
      <p>For all privacy-related queries, rights requests, or concerns, please contact:</p>
      <div className="lcallout">
        <p><strong>GalenAI Private Limited</strong></p>
        <p>Door No.1/168-B18 (Flat No.205B), Tower 2, DD Golden Gate, MLA Road, Palachuvadu,</p>
        <p>Kakkanad, Kochi, Ernakulam, Kerala, India, 682037</p>
        <p>Email: <a href="mailto:info@galenai.io">info@galenai.io</a></p>
      </div>

    </LegalPage>
  );
}
