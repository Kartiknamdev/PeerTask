import React from "react";
// Assuming you have react-router-dom installed for navigation
import { Link } from "react-router-dom"; // Import Link for navigation

export default function TermsOfService() {
  // Define policy sections for dynamic rendering and Table of Contents
  const termsSections = [
    { id: "introduction", title: "1. Introduction", subsections: [] },
    { id: "eligibility", title: "2. Eligibility and Account Registration", subsections: [] },
    { id: "user-roles", title: "3. User Roles & Responsibilities", subsections: [] },
    { id: "content", title: "4. User Content and Conduct", subsections: [
        { id: "user-content", title: "a. User Content" },
        { id: "prohibited-conduct", title: "b. Prohibited Conduct" },
    ]},
    { id: "rewards-payment", title: "5. Rewards and Payment", subsections: [] },
    { id: "platform-usage", title: "6. Platform Usage, Modifications, and Termination", subsections: [
        { id: "access-restrictions", title: "a. Access Restrictions" },
        { id: "service-modifications", title: "b. Service Modifications and Discontinuation" },
        { id: "account-termination", title: "c. Account Suspension and Termination" },
    ]},
    { id: "intellectual-property", title: "7. Intellectual Property Rights", subsections: [] },
    { id: "privacy", title: "8. Privacy Policy", subsections: [] },
    { id: "disclaimers", title: "9. Disclaimers of Warranties", subsections: [] },
    { id: "liability", title: "10. Limitation of Liability", subsections: [] },
    { id: "indemnification", title: "11. Indemnification", subsections: [] },
    { id: "governing-law", title: "12. Governing Law and Dispute Resolution", subsections: [] },
    { id: "miscellaneous", title: "13. Miscellaneous Provisions", subsections: [
        { id: "severability", title: "a. Severability" },
        { id: "entire-agreement", title: "b. Entire Agreement" },
        { id: "no-waiver", title: "c. No Waiver" },
        { id: "feedback", title: "d. Feedback" },
    ]},
    { id: "changes", title: "14. Changes to These Terms", subsections: [] },
    { id: "contact", title: "15. Contact Information", subsections: [] },
  ];

  return (
    // Main container now has a subtle background gradient, min height, and good padding
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 min-h-screen py-16 px-4 sm:px-6 lg:px-8 font-sans text-gray-800 relative">
      {/* Back to Home Button */}
      <div className="absolute top-6 left-6 z-20">
        <Link 
          to="/" 
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-200"
        >
          <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Home
        </Link>
      </div>

      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl p-8 md:p-12 lg:p-16 border border-gray-100">
        {/* Header Section */}
        <header className="mb-12 text-center border-b pb-8 border-gray-200">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight">
            PeerTask Terms of Service
          </h1>
          <p className="text-base sm:text-lg text-gray-500 mt-4">
            Effective Date: <strong className="text-gray-700">May 25, 2025</strong>
          </p>
        </header>

        {/* Table of Contents */}
        <section className="mb-12 p-6 bg-indigo-50 rounded-xl shadow-inner border border-indigo-200">
          <h2 className="text-2xl font-bold text-indigo-800 mb-4">Table of Contents</h2>
          <nav>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2 text-lg">
              {termsSections.map((section) => (
                <li key={section.id} className="text-indigo-700 hover:text-indigo-900 transition duration-200">
                  <a href={`#${section.id}`} className="font-semibold">{section.title}</a>
                  {section.subsections.length > 0 && (
                    <ul className="ml-4 mt-1 space-y-1 text-sm">
                      {section.subsections.map((sub) => (
                        <li key={sub.id} className="text-indigo-600 hover:text-indigo-800 transition duration-200">
                          <a href={`#${sub.id}`}>{sub.title}</a>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </section>

        {/* Introduction Section */}
        <section id="introduction" className="mb-16 text-gray-700 text-lg leading-relaxed">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">1. Introduction</h2>
          <p className="mb-4">
            Welcome to <strong className="text-indigo-600">PeerTask</strong>, a robust online platform designed to connect students within their academic community for sharing, accepting, and completing micro-tasks. These Terms and Conditions ("Terms") govern your access to and use of the PeerTask website, services, and related applications (collectively, the "Platform").
          </p>
          <p className="mb-4">
            By accessing or using the Platform, you signify that you have read, understood, and agree to be bound by these Terms, along with our <a href="/privacy-policy" className="text-indigo-600 hover:underline">Privacy Policy</a>. If you do not agree with any part of these Terms, you must not use the Platform.
          </p>
          <p>
            These Terms constitute a legally binding agreement between you and PeerTask.
          </p>
        </section>

        {/* Section 2: Eligibility and Account Registration */}
        <section id="eligibility" className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">2. Eligibility and Account Registration</h2>
          <p className="text-gray-700 text-lg leading-relaxed mb-4">
            PeerTask is intended for use by students who are 13 years of age or older. By creating an account and using the Platform, you represent and warrant that:
          </p>
          <ul className="list-disc list-outside ml-8 text-gray-700 text-lg leading-relaxed space-y-2 mb-4">
            <li>You are at least 13 years old.</li>
            <li>You are enrolled in or are part of an academic institution or community.</li>
            <li>All information you provide during registration is accurate, current, and complete.</li>
            <li>You will maintain the accuracy of your account information and update it as necessary.</li>
          </ul>
          <p className="text-gray-700 text-lg leading-relaxed">
            You are responsible for maintaining the confidentiality of your account login information (username and password) and for all activities that occur under your account. You agree to notify PeerTask immediately of any unauthorized use of your account or any other breach of security.
          </p>
        </section>

        {/* Section 3: User Roles & Responsibilities */}
        <section id="user-roles" className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">3. User Roles & Responsibilities</h2>
          <p className="text-gray-700 text-lg leading-relaxed mb-4">
            PeerTask users interact in distinct roles, each with specific responsibilities:
          </p>
          <ul className="list-disc list-outside ml-8 text-gray-700 text-lg leading-relaxed space-y-2 mb-4">
            <li>
              <strong className="text-gray-900">Task Creators (Requesters):</strong> You are responsible for providing clear, accurate, and honest descriptions of tasks, including specific requirements, deadlines, and any reward expectations. You must promptly respond to task acceptors and review completed tasks fairly.
            </li>
            <li>
              <strong className="text-gray-900">Task Acceptors (Doers):</strong> You are expected to complete accepted tasks diligently, within the agreed-upon deadlines, and to the best of your ability. You must communicate promptly with task creators regarding progress or any issues encountered.
            </li>
            <li>
              <strong className="text-gray-900">All Users:</strong> You are responsible for ensuring the authenticity and legality of all content you post and for your behavior on the Platform. You agree to act with integrity and respect towards all other users.
            </li>
          </ul>
        </section>

        {/* Section 4: User Content and Conduct */}
        <section id="content" className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">4. User Content and Conduct</h2>

          <h3 id="user-content" className="text-2xl font-semibold text-gray-800 mb-3">a. User Content</h3>
          <p className="text-gray-700 text-lg leading-relaxed mb-4">
            You are solely responsible for all content, including task descriptions, messages, files, and profile information, that you upload, post, or transmit through PeerTask ("User Content"). You retain ownership of your User Content, but you grant PeerTask a worldwide, non-exclusive, royalty-free, transferable license to use, reproduce, distribute, prepare derivative works of, display, and perform your User Content in connection with the Platform and PeerTask's (and its successors' and affiliates') business, including without limitation for promoting and redistributing part or all of the Service (and derivative works thereof) in any media formats and through any media channels.
          </p>
          <p className="text-gray-700 text-lg leading-relaxed mb-4">
            You represent and warrant that you have all rights, power, and authority necessary to grant the rights granted herein to any User Content that you submit.
          </p>

          <h3 id="prohibited-conduct" className="text-2xl font-semibold text-gray-800 mb-3 mt-6">b. Prohibited Conduct</h3>
          <p className="text-gray-700 text-lg leading-relaxed mb-4">
            You agree not to engage in any of the following prohibited activities:
          </p>
          <ul className="list-disc list-outside ml-8 text-gray-700 text-lg leading-relaxed space-y-2 mb-6">
            <li>Posting or transmitting any content that is offensive, harmful, defamatory, obscene, illegal, or violates any third-party rights.</li>
            <li>Impersonating any person or entity, or falsely stating or otherwise misrepresenting your affiliation with a person or entity.</li>
            <li>Creating fake tasks, accounts, or engaging in any form of fraudulent activity.</li>
            <li>Interfering with or disrupting the integrity or performance of the Platform or the data contained therein.</li>
            <li>Attempting to gain unauthorized access to PeerTask's systems or networks.</li>
            <li>Engaging in any form of harassment, discrimination, or hate speech.</li>
            <li>Using the Platform for any commercial purposes beyond those explicitly allowed by the Platform (e.g., direct advertising unrelated to tasks).</li>
            <li>Circumventing any security or access control measures.</li>
            <li>Collecting or harvesting any personally identifiable information from the Platform (e.g., usernames, email addresses) without explicit permission.</li>
          </ul>
        </section>

        {/* Section 5: Rewards and Payment */}
        <section id="rewards-payment" className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">5. Rewards and Payment</h2>
          <p className="text-gray-700 text-lg leading-relaxed mb-4">
            PeerTask allows task creators to offer optional rewards for completed tasks, which may be monetary or non-monetary (e.g., favors, study notes, mentorship).
          </p>
          <p className="text-gray-700 text-lg leading-relaxed mb-4">
            Any agreements made between users regarding rewards, payments, or exchanges are solely between the users involved. PeerTask acts as a platform to facilitate these connections and is **not responsible for the fulfillment of rewards, payment processing, or disputes arising from reward issues.**
          </p>
          <p className="text-gray-700 text-lg leading-relaxed">
            If PeerTask integrates with third-party payment processors, your use of such services will be governed by their respective terms and conditions and privacy policies.
          </p>
        </section>

        {/* Section 6: Platform Usage, Modifications, and Termination */}
        <section id="platform-usage" className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">6. Platform Usage, Modifications, and Termination</h2>

          <h3 id="access-restrictions" className="text-2xl font-semibold text-gray-800 mb-3">a. Access Restrictions</h3>
          <p className="text-gray-700 text-lg leading-relaxed mb-4">
            We reserve the right to restrict, suspend, or terminate your access to the Platform or any part thereof, at our sole discretion, without prior notice, if we believe you have violated these Terms, engaged in suspicious or harmful behavior, or disrupted the integrity of the Platform.
          </p>

          <h3 id="service-modifications" className="text-2xl font-semibold text-gray-800 mb-3 mt-6">b. Service Modifications and Discontinuation</h3>
          <p className="text-gray-700 text-lg leading-relaxed mb-4">
            PeerTask reserves the right to modify, suspend, or discontinue, temporarily or permanently, the Platform or any service therein, with or without notice. You agree that PeerTask shall not be liable to you or to any third party for any modification, suspension, or discontinuance of the Service.
          </p>

          <h3 id="account-termination" className="text-2xl font-semibold text-gray-800 mb-3 mt-6">c. Account Suspension and Termination</h3>
          <p className="text-gray-700 text-lg leading-relaxed mb-4">
            You may terminate your account at any time by following the instructions on the Platform or by contacting us. Upon termination, your right to use the Platform will immediately cease. Sections of these Terms that by their nature should survive termination shall survive, including, without limitation, ownership provisions, warranty disclaimers, indemnity, and limitations of liability.
          </p>
        </section>

        {/* Section 7: Intellectual Property Rights */}
        <section id="intellectual-property" className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">7. Intellectual Property Rights</h2>
          <p className="text-gray-700 text-lg leading-relaxed mb-4">
            All intellectual property rights in and to the PeerTask Platform, including its design, text, graphics, logos, icons, images, audio clips, digital downloads, data compilations, and software, are the exclusive property of PeerTask or its licensors and are protected by applicable copyright, trademark, and other intellectual property laws.
          </p>
          <p className="text-gray-700 text-lg leading-relaxed mb-4">
            You may not copy, reproduce, distribute, transmit, broadcast, display, sell, license, or otherwise exploit any content from the Platform without the prior written consent of PeerTask. You are granted a limited, non-exclusive, non-transferable, revocable license to access and use the Platform for your personal, non-commercial use only, subject to these Terms.
          </p>
        </section>

        {/* Section 8: Privacy Policy */}
        <section id="privacy" className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">8. Privacy Policy</h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            Your privacy is of utmost importance to us. Our <a href="/privacy-policy" className="text-indigo-600 hover:underline">Privacy Policy</a> explains how we collect, use, store, and protect your personal information when you use PeerTask. By agreeing to these Terms, you also acknowledge and agree to our Privacy Policy, which is incorporated herein by reference.
          </p>
        </section>

        {/* Section 9: Disclaimers of Warranties */}
        <section id="disclaimers" className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">9. Disclaimers of Warranties</h2>
          <p className="text-gray-700 text-lg leading-relaxed mb-4">
            THE PEERTASK PLATFORM IS PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS, WITHOUT ANY WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING, BUT NOT LIMITED TO, IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, NON-INFRINGEMENT, OR COURSE OF PERFORMANCE.
          </p>
          <p className="text-gray-700 text-lg leading-relaxed mb-4">
            PEERTASK DOES NOT WARRANT THAT THE SERVICE WILL BE UNINTERRUPTED, SECURE, OR ERROR-FREE; THAT DEFECTS WILL BE CORRECTED; THAT THE SERVICE OR THE SERVER THAT MAKES IT AVAILABLE ARE FREE OF VIRUSES OR OTHER HARMFUL COMPONENTS; OR THAT THE RESULTS OF USING THE SERVICE WILL MEET YOUR REQUIREMENTS.
          </p>
          <p className="text-gray-700 text-lg leading-relaxed">
            NO ADVICE OR INFORMATION, WHETHER ORAL OR WRITTEN, OBTAINED BY YOU FROM PEERTASK OR THROUGH THE SERVICE WILL CREATE ANY WARRANTY NOT EXPRESSLY STATED HEREIN.
          </p>
        </section>

        {/* Section 10: Limitation of Liability */}
        <section id="liability" className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">10. Limitation of Liability</h2>
          <p className="text-gray-700 text-lg leading-relaxed mb-4">
            TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL PEERTASK, ITS AFFILIATES, DIRECTORS, EMPLOYEES, PARTNERS, AGENTS, SUPPLIERS, OR LICENSORS BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING WITHOUT LIMITATION, LOSS OF PROFITS, DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES, RESULTING FROM (I) YOUR ACCESS TO OR USE OF OR INABILITY TO ACCESS OR USE THE SERVICE; (II) ANY CONDUCT OR CONTENT OF ANY THIRD PARTY ON THE SERVICE; (III) ANY CONTENT OBTAINED FROM THE SERVICE; AND (IV) UNAUTHORIZED ACCESS, USE, OR ALTERATION OF YOUR TRANSMISSIONS OR CONTENT, WHETHER BASED ON WARRANTY, CONTRACT, TORT (INCLUDING NEGLIGENCE), OR ANY OTHER LEGAL THEORY, WHETHER OR NOT WE HAVE BEEN INFORMED OF THE POSSIBILITY OF SUCH DAMAGE, AND EVEN IF A REMEDY SET FORTH HEREIN IS FOUND TO HAVE FAILED OF ITS ESSENTIAL PURPOSE.
          </p>
          <p className="text-gray-700 text-lg leading-relaxed">
            THE AGGREGATE LIABILITY OF PEERTASK FOR ALL CLAIMS RELATING TO THE SERVICE SHALL NOT EXCEED THE GREATER OF (A) THE AMOUNTS PAID BY YOU TO PEERTASK FOR THE PAST TWELVE MONTHS OF THE SERVICE IN QUESTION, OR (B) FIFTY US DOLLARS (USD 50.00).
          </p>
        </section>

        {/* Section 11: Indemnification */}
        <section id="indemnification" className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">11. Indemnification</h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            You agree to indemnify, defend, and hold harmless PeerTask, its affiliates, officers, directors, employees, consultants, agents, and representatives from any and all third-party claims, liability, damages, and/or costs (including, but not limited to, attorney's fees) arising from your access to or use of the Platform, your violation of these Terms, or your infringement of any intellectual property or other right of any person or entity.
          </p>
        </section>

        {/* Section 12: Governing Law and Dispute Resolution */}
        <section id="governing-law" className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">12. Governing Law and Dispute Resolution</h2>
          <p className="text-gray-700 text-lg leading-relaxed mb-4">
            These Terms shall be governed by and construed in accordance with the laws of **India**, without regard to its conflict of law provisions.
          </p>
          <p className="text-gray-700 text-lg leading-relaxed mb-4">
            Any dispute arising out of or relating to these Terms or your use of the Platform that cannot be resolved amicably shall be submitted to binding arbitration in **Bhopal, Madhya Pradesh, India**, in accordance with the rules of the Indian Arbitration and Conciliation Act, 1996. The decision of the arbitrator(s) shall be final and binding on both parties.
          </p>
          <p className="text-gray-700 text-lg leading-relaxed">
            You agree to submit to the personal jurisdiction of the courts located within **Bhopal, Madhya Pradesh, India** for any legal actions not subject to arbitration.
          </p>
        </section>

        {/* Section 13: Miscellaneous Provisions */}
        <section id="miscellaneous" className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">13. Miscellaneous Provisions</h2>

          <h3 id="severability" className="text-2xl font-semibold text-gray-800 mb-3">a. Severability</h3>
          <p className="text-gray-700 text-lg leading-relaxed mb-4">
            If any provision of these Terms is held to be invalid or unenforceable by a court, the remaining provisions of these Terms will remain in effect.
          </p>

          <h3 id="entire-agreement" className="text-2xl font-semibold text-gray-800 mb-3">b. Entire Agreement</h3>
          <p className="text-gray-700 text-lg leading-relaxed mb-4">
            These Terms, together with the Privacy Policy, constitute the entire agreement between you and PeerTask concerning the Service and supersede any prior agreements, whether written or oral, regarding the Service.
          </p>

          <h3 id="no-waiver" className="text-2xl font-semibold text-gray-800 mb-3">c. No Waiver</h3>
          <p className="text-gray-700 text-lg leading-relaxed mb-4">
            No waiver of any term of these Terms shall be deemed a further or continuing waiver of such term or any other term, and PeerTask's failure to assert any right or provision under these Terms shall not constitute a waiver of such right or provision.
          </p>

          <h3 id="feedback" className="text-2xl font-semibold text-gray-800 mb-3">d. Feedback</h3>
          <p className="text-gray-700 text-lg leading-relaxed">
            We welcome your feedback, comments, and suggestions for improvements to the Platform ("Feedback"). You acknowledge and agree that any Feedback you provide to us will be the sole and exclusive property of PeerTask, and you hereby irrevocably assign to PeerTask all of your right, title, and interest in and to all Feedback.
          </p>
        </section>

        {/* Section 14: Changes to These Terms */}
        <section id="changes" className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">14. Changes to These Terms</h2>
          <p className="text-gray-700 text-lg leading-relaxed mb-4">
            PeerTask reserves the right, at its sole discretion, to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
          </p>
          <p className="text-gray-700 text-lg leading-relaxed">
            By continuing to access or use our Service after any revisions become effective, you agree to be bound by the revised terms. If you do not agree to the new terms, you are no longer authorized to use the Service.
          </p>
        </section>

        {/* Section 15: Contact */}
        <section id="contact" className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">15. Contact Information</h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            For any questions, concerns, or inquiries regarding these Terms of Service, please contact us at:
          </p>
          <ul className="list-disc list-outside ml-8 text-gray-700 text-lg leading-relaxed space-y-2 mb-6">
            <li><strong>By Email:</strong> <a href="mailto:support@peertask.com" className="text-indigo-600 hover:underline">support@peertask.com</a></li>
            <li><strong>By Mail:</strong>
              <address className="not-italic mt-1">
                PeerTask Support<br />
                [Ruchi Lifescapes]
                Bhopal, Madhya Pradesh, India
              </address>
            </li>
          </ul>
        </section>

        {/* Footer */}
        <footer className="mt-20 text-center text-gray-500 text-base border-t pt-8 border-gray-200">
          <p>&copy; {new Date().getFullYear()} PeerTask. All rights reserved.</p>
          <p className="mt-2">Thank you for being a part of the PeerTask community.</p>
        </footer>
      </div>
    </div>
  );
}