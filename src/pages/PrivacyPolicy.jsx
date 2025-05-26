import React from "react";
import { Link } from "react-router-dom";

const PrivacyPolicy = () => {
  // Define policy sections for dynamic rendering and Table of Contents
  const policySections = [
    { id: "scope", title: "1. Scope of This Policy", subsections: [] },
    {
      id: "what-we-collect",
      title: "2. What We Collect",
      subsections: [
        { id: "info-you-provide", title: "a. Information You Provide" },
        { id: "auto-collected", title: "b. Automatically Collected Information" },
        { id: "cookies", title: "c. Cookies and Tracking Technologies" },
        { id: "third-party-data", title: "d. Data from Third Parties" },
      ],
    },
    {
      id: "how-we-use",
      title: "3. How We Use Your Information",
      subsections: [
        { id: "provide-service", title: "a. To Provide and Maintain Our Service" },
        { id: "analytics-improvement", title: "b. For Analytics and Service Improvement" },
        { id: "communication", title: "c. For Communication and Support" },
        { id: "security-fraud", title: "d. For Security and Fraud Prevention" },
        { id: "legal-compliance", title: "e. For Legal Compliance" },
      ],
    },
    {
      id: "when-we-share",
      title: "4. When We Share Information",
      subsections: [
        { id: "with-users", title: "a. With Other Users During Collaborations" },
        { id: "service-providers", title: "b. With Trusted Service Providers" },
        { id: "legal-authorities", title: "c. With Legal Authorities" },
        { id: "payment-partners", title: "d. With Payment Partners" },
        { id: "business-transfers", title: "e. Business Transfers" },
      ],
    },
    { id: "data-security", title: "5. Data Security", subsections: [] },
    {
      id: "your-rights",
      title: "6. Your Rights Regarding Your Data",
      subsections: [
        { id: "access-rectification", title: "a. Access and Rectification" },
        { id: "erasure", title: "b. Erasure (Right to Be Forgotten)" },
        { id: "restriction", title: "c. Restriction of Processing" },
        { id: "portability", title: "d. Data Portability" },
        { id: "objection", title: "e. Objection to Processing" },
        { id: "consent-withdrawal", title: "f. Withdrawal of Consent" },
        { id: "complaints", title: "g. Complaints to Supervisory Authorities" },
        { id: "automated-decisions", title: "h. Automated Decision-Making" },
      ],
    },
    {
      id: "data-retention",
      title: "7. Data Retention",
      subsections: [
        { id: "account-deactivation", title: "a. Account Deactivation/Closure" },
        { id: "legal-operational", title: "b. Legal & Operational Retention" },
      ],
    },
    {
      id: "children-privacy",
      title: "8. Children’s Privacy",
      subsections: [{ id: "age-restriction", title: "a. Age Restriction" }],
    },
    {
      id: "international-users",
      title: "9. International Data Transfers",
      subsections: [{ id: "consent-transfer", title: "a. Consent to Transfer" }],
    },
    {
      id: "third-party-services",
      title: "10. Third-Party Services and Links",
      subsections: [{ id: "links-to-others", title: "a. Links to Other Websites" }],
    },
    {
      id: "policy-changes",
      title: "11. Changes to This Privacy Policy",
      subsections: [{ id: "notification-changes", title: "a. Notification of Changes" }],
    },
    {
      id: "contact-us",
      title: "12. Contact Us & Governing Law",
      subsections: [
        { id: "governing-law", title: "a. Governing Law and Jurisdiction" },
        { id: "dispute-resolution", title: "b. Dispute Resolution" },
        { id: "contact-info", title: "c. Contact Information" },
      ],
    },
  ];

  return (
    // Main container now has a subtle background texture/pattern if desired,
    // ensuring it extends fully. Keeping it clean for professionalism.
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 min-h-screen py-16 px-4 sm:px-6 lg:px-8 font-sans text-gray-800">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl p-8 md:p-12 lg:p-16 border border-gray-100">
        {/* Header Section */}
        <header className="mb-12 text-center border-b pb-8 border-gray-200">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight">
            PeerTask Privacy Policy
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
              {policySections.map((section) => (
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
        <section className="mb-16 text-gray-700 text-lg leading-relaxed">
          <p className="mb-4">
            Welcome to <strong className="text-indigo-600">PeerTask</strong> — your trusted student-focused micro-task platform. This Privacy Policy describes how we collect, use, store, and protect your personal information when you access or use the PeerTask website, services, or related applications. We are committed to transparency and to safeguarding your privacy in accordance with applicable data protection laws.
          </p>
          <p>
            By registering, posting, accepting tasks, or otherwise interacting with our platform, you acknowledge that you have read, understood, and agree to the terms described in this Privacy Policy. If you do not agree with these terms, please do not use PeerTask.
          </p>
        </section>

        {/* Policy Sections - Detailed Content */}

        {/* Section 1: Scope */}
        <section id="scope" className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            1. Scope of This Policy
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed mb-4">
            This Privacy Policy applies to all users of PeerTask, including individuals who create tasks (task requesters), individuals who accept and complete tasks (task doers), and casual visitors Browse the platform.
          </p>
          <p className="text-gray-700 text-lg leading-relaxed mb-4">
            It covers the collection, use, and disclosure of personal information in connection with all activities on the PeerTask platform, including but not limited to account creation, task interactions, internal messaging, payment handling (if enabled), and any related applications or services we provide.
          </p>
          <p className="text-gray-700 text-lg leading-relaxed">
            We are dedicated to respecting your privacy and handling your personal data responsibly.
          </p>
        </section>

        {/* Section 2: What We Collect */}
        <section id="what-we-collect" className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            2. What We Collect
          </h2>

          <h3 id="info-you-provide" className="text-2xl font-semibold text-gray-800 mb-3">a. Information You Provide</h3>
          <p className="text-gray-700 text-lg leading-relaxed mb-4">
            We collect personal information that you voluntarily provide to us when you register on PeerTask, create a profile, post a task, accept a task, communicate with other users, or otherwise interact with the platform. This may include:
          </p>
          <ul className="list-disc list-outside ml-8 text-gray-700 text-lg leading-relaxed space-y-2 mb-6">
            <li><strong>Identification and Contact Data:</strong> Your full name, email address, phone number, and academic details (e.g., institution, course of study).</li>
            <li><strong>Profile Information:</strong> Any information you choose to add to your public or private profile, such as skills, experience, and a profile picture.</li>
            <li><strong>Task-Related Information:</strong> Detailed descriptions of tasks you create or accept, deadlines, attached files, instructions, and any relevant communications.</li>
            <li><strong>Communications:</strong> Messages exchanged with other users, feedback you provide, and any communications with PeerTask customer support.</li>
            <li><strong>Payment Information:</strong> If PeerTask processes payments, we may collect payment method details (e.g., bank account, UPI ID), though sensitive financial data is typically handled by secure third-party payment processors.</li>
          </ul>

          <h3 id="auto-collected" className="text-2xl font-semibold text-gray-800 mb-3">b. Automatically Collected Information</h3>
          <p className="text-gray-700 text-lg leading-relaxed mb-4">
            When you access and use PeerTask, certain information is automatically collected about your device and usage patterns. This data helps us understand how our service is used and improve your experience. This includes:
          </p>
          <ul className="list-disc list-outside ml-8 text-gray-700 text-lg leading-relaxed space-y-2 mb-6">
            <li><strong>Device and Usage Data:</strong> Your IP address, browser type and version, operating system, device identifiers, language preferences, and referring URLs.</li>
            <li><strong>Log Data:</strong> Information about your interaction with the platform, such as pages visited, features used, time spent on pages, search queries, and clickstream data.</li>
            <li><strong>Location Data:</strong> General geographical location inferred from your IP address.</li>
          </ul>

          <h3 id="cookies" className="text-2xl font-semibold text-gray-800 mb-3">c. Cookies and Tracking Technologies</h3>
          <p className="text-gray-700 text-lg leading-relaxed mb-4">
            We use cookies and similar tracking technologies (like web beacons and pixels) to track activity on our service and hold certain information. Cookies are small data files placed on your device. We use them for:
          </p>
          <ul className="list-disc list-outside ml-8 text-gray-700 text-lg leading-relaxed space-y-2 mb-6">
            <li><strong>Authentication:</strong> To keep you logged in and recognize you when you return to PeerTask.</li>
            <li><strong>Functionality:</strong> To remember your preferences and settings (e.g., language, task filters).</li>
            <li><strong>Performance and Analytics:</strong> To understand how users interact with our platform, track usage patterns, and identify areas for improvement.</li>
            <li><strong>Security:</strong> To detect and prevent fraudulent activity.</li>
          </ul>
          <p className="text-gray-700 text-lg leading-relaxed">
            You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our Service.
          </p>

          <h3 id="third-party-data" className="text-2xl font-semibold text-gray-800 mb-3 mt-6">d. Data from Third Parties</h3>
          <p className="text-gray-700 text-lg leading-relaxed">
            We may receive information about you from third-party services, such as social login providers (if you choose to link your account), or analytics partners, consistent with their privacy policies. This information is used to enhance your experience or for analytical purposes.
          </p>
        </section>

        {/* Section 3: How We Use Your Information */}
        <section id="how-we-use" className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            3. How We Use Your Information
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed mb-4">
            We use the information we collect for various purposes, primarily to operate, maintain, and improve our service, and to ensure a secure and efficient platform for all users.
          </p>

          <h3 id="provide-service" className="text-2xl font-semibold text-gray-800 mb-3">a. To Provide and Maintain Our Service</h3>
          <ul className="list-disc list-outside ml-8 text-gray-700 text-lg leading-relaxed space-y-2 mb-6">
            <li>To create and manage your account.</li>
            <li>To facilitate the posting, acceptance, and completion of tasks.</li>
            <li>To enable communication and collaboration between task requesters and task doers.</li>
            <li>To process payments for tasks (if applicable) and manage transactions.</li>
            <li>To provide customer support and respond to your inquiries.</li>
          </ul>

          <h3 id="analytics-improvement" className="text-2xl font-semibold text-gray-800 mb-3">b. For Analytics and Service Improvement</h3>
          <ul className="list-disc list-outside ml-8 text-gray-700 text-lg leading-relaxed space-y-2 mb-6">
            <li>To monitor and analyze trends, usage, and activities in connection with our Service.</li>
            <li>To personalize your experience and offer relevant task recommendations.</li>
            <li>To develop new features, products, and services.</li>
            <li>To troubleshoot problems, prevent errors, and optimize the platform's performance.</li>
          </ul>

          <h3 id="communication" className="text-2xl font-semibold text-gray-800 mb-3">c. For Communication and Support</h3>
          <ul className="list-disc list-outside ml-8 text-gray-700 text-lg leading-relaxed space-y-2 mb-6">
            <li>To send you transactional emails, service announcements, security alerts, and administrative messages.</li>
            <li>To provide you with information about PeerTask, special offers, and new features, subject to your communication preferences.</li>
          </ul>

          <h3 id="security-fraud" className="text-2xl font-semibold text-gray-800 mb-3">d. For Security and Fraud Prevention</h3>
          <ul className="list-disc list-outside ml-8 text-gray-700 text-lg leading-relaxed space-y-2 mb-6">
            <li>To protect PeerTask, our users, and third parties from fraud, abuse, and other malicious activities.</li>
            <li>To enforce our Terms of Service and other policies.</li>
          </ul>

          <h3 id="legal-compliance" className="text-2xl font-semibold text-gray-800 mb-3">e. For Legal Compliance</h3>
          <ul className="list-disc list-outside ml-8 text-gray-700 text-lg leading-relaxed space-y-2 mb-6">
            <li>To comply with applicable laws, regulations, and legal processes.</li>
            <li>To respond to lawful requests from public and government authorities.</li>
          </ul>
        </section>

        {/* Section 4: When We Share Information */}
        <section id="when-we-share" className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            4. When We Share Information
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed mb-4">
            We share your personal information only in the ways described in this Privacy Policy. We do not sell your personal data to third parties.
          </p>

          <h3 id="with-users" className="text-2xl font-semibold text-gray-800 mb-3">a. With Other Users During Collaborations</h3>
          <p className="text-gray-700 text-lg leading-relaxed mb-4">
            When you engage in tasks, certain information necessary for task completion will be shared between task requesters and task doers. This may include your username, profile details, and communications related to the task.
          </p>

          <h3 id="service-providers" className="text-2xl font-semibold text-gray-800 mb-3">b. With Trusted Service Providers</h3>
          <p className="text-gray-700 text-lg leading-relaxed mb-4">
            We engage third-party companies and individuals to facilitate our Service, provide the Service on our behalf, perform Service-related services, or assist us in analyzing how our Service is used. These third parties have access to your Personal Information only to perform these tasks on our behalf and are obligated not to disclose or use it for any other purpose. Examples include hosting providers, analytics services, and customer support tools.
          </p>

          <h3 id="legal-authorities" className="text-2xl font-semibold text-gray-800 mb-3">c. With Legal Authorities When Legally Required</h3>
          <p className="text-gray-700 text-lg leading-relaxed mb-4">
            We may disclose your Personal Information in the good faith belief that such action is necessary to:
          </p>
          <ul className="list-disc list-outside ml-8 text-gray-700 text-lg leading-relaxed space-y-2 mb-6">
            <li>Comply with a legal obligation or respond to valid requests by public authorities (e.g., a court or government agency).</li>
            <li>Protect and defend the rights or property of PeerTask.</li>
            <li>Prevent or investigate possible wrongdoing in connection with the Service.</li>
            <li>Protect the personal safety of users of the Service or the public.</li>
            <li>Protect against legal liability.</li>
          </ul>

          <h3 id="payment-partners" className="text-2xl font-semibold text-gray-800 mb-3">d. With Payment Partners for Processing Transactions</h3>
          <p className="text-gray-700 text-lg leading-relaxed mb-4">
            If our platform facilitates payments, we share necessary information with our third-party payment processors (e.g., Stripe, PayPal) to process transactions securely. Your financial data is directly handled by these partners, who are compliant with industry security standards.
          </p>

          <h3 id="business-transfers" className="text-2xl font-semibold text-gray-800 mb-3">e. Business Transfers</h3>
          <p className="text-gray-700 text-lg leading-relaxed mb-4">
            If PeerTask is involved in a merger, acquisition, or asset sale, your Personal Information may be transferred. We will provide notice before your Personal Information is transferred and becomes subject to a different Privacy Policy.
          </p>
        </section>

        {/* Section 5: Data Security */}
        <section id="data-security" className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            5. Data Security
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            PeerTask implements robust industry-standard security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. These measures include:
          </p>
          <ul className="list-disc list-outside ml-8 text-gray-700 text-lg leading-relaxed space-y-2 mb-6">
            <li><strong>Encryption:</strong> Data transmission is secured using SSL/TLS encryption.</li>
            <li><strong>Access Controls:</strong> Strict internal access controls limit who can access your data.</li>
            <li><strong>Secure Infrastructure:</strong> Our servers and databases are hosted in secure environments with regular security audits.</li>
            <li><strong>Regular Backups:</strong> Data is regularly backed up to prevent loss.</li>
            <li><strong>Employee Training:</strong> Our team members are trained on data protection and privacy best practices.</li>
          </ul>
          <p className="text-gray-700 text-lg leading-relaxed">
            While we strive to use commercially acceptable means to protect your Personal Information, no method of transmission over the Internet or method of electronic storage is 100% secure. Therefore, we cannot guarantee its absolute security. We encourage you to use strong, unique passwords and to keep your account credentials confidential.
          </p>
        </section>

        {/* Section 6: Your Rights */}
        <section id="your-rights" className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            6. Your Rights Regarding Your Data
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed mb-4">
            Depending on your location and applicable laws, you may have certain rights regarding your personal data. These rights may include:
          </p>

          <h3 id="access-rectification" className="text-2xl font-semibold text-gray-800 mb-3">a. Access and Rectification</h3>
          <p className="text-gray-700 text-lg leading-relaxed mb-4">
            You have the right to request access to the personal information we hold about you and to request that we correct any inaccurate or incomplete information. You can typically access and update much of your profile information directly through your PeerTask account settings.
          </p>

          <h3 id="erasure" className="text-2xl font-semibold text-gray-800 mb-3">b. Erasure (Right to Be Forgotten)</h3>
          <p className="text-gray-700 text-lg leading-relaxed mb-4">
            You may have the right to request the deletion of your personal data under certain circumstances, such as when the data is no longer necessary for the purposes for which it was collected.
          </p>

          <h3 id="restriction" className="text-2xl font-semibold text-gray-800 mb-3">c. Restriction of Processing</h3>
          <p className="text-gray-700 text-lg leading-relaxed mb-4">
            You may have the right to request that we restrict the processing of your personal data under certain conditions, for example, if you dispute the accuracy of the data.
          </p>

          <h3 id="portability" className="text-2xl font-semibold text-gray-800 mb-3">d. Data Portability</h3>
          <p className="text-gray-700 text-lg leading-relaxed mb-4">
            You have the right to receive your personal data in a structured, commonly used, and machine-readable format, and to transmit that data to another controller where technically feasible.
          </p>

          <h3 id="objection" className="text-2xl font-semibold text-gray-800 mb-3">e. Objection to Processing</h3>
          <p className="text-gray-700 text-lg leading-relaxed mb-4">
            You have the right to object to the processing of your personal data under certain circumstances, particularly where processing is based on legitimate interests or for direct marketing purposes.
          </p>

          <h3 id="consent-withdrawal" className="text-2xl font-semibold text-gray-800 mb-3">f. Withdrawal of Consent</h3>
          <p className="text-gray-700 text-lg leading-relaxed mb-4">
            Where processing is based on your consent, you have the right to withdraw your consent at any time. This will not affect the lawfulness of processing based on consent before its withdrawal.
          </p>

          <h3 id="complaints" className="text-2xl font-semibold text-gray-800 mb-3">g. Complaints to Supervisory Authorities</h3>
          <p className="text-gray-700 text-lg leading-relaxed mb-4">
            You have the right to lodge a complaint with a data protection supervisory authority in your country of residence if you believe your rights have been violated.
          </p>

          <h3 id="automated-decisions" className="text-2xl font-semibold text-gray-800 mb-3">h. Automated Decision-Making</h3>
          <p className="text-gray-700 text-lg leading-relaxed">
            PeerTask does not engage in solely automated decision-making processes that produce legal effects concerning you or similarly significantly affect you. If this changes, we will update this policy and provide information about your rights.
          </p>
        </section>

        {/* Section 7: Data Retention */}
        <section id="data-retention" className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            7. Data Retention
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed mb-4">
            We retain your Personal Information only for as long as is necessary for the purposes set out in this Privacy Policy.
          </p>

          <h3 id="account-deactivation" className="text-2xl font-semibold text-gray-800 mb-3">a. Account Deactivation/Closure</h3>
          <p className="text-gray-700 text-lg leading-relaxed mb-4">
            We will retain your data for as long as your account is active or as needed to provide you services. If you close your account, we will delete your personal data within a reasonable timeframe, subject to our legal and operational obligations.
          </p>

          <h3 id="legal-operational" className="text-2xl font-semibold text-gray-800 mb-3">b. Legal & Operational Retention</h3>
          <p className="text-gray-700 text-lg leading-relaxed">
            We may retain and use your Personal Information to the extent necessary to comply with our legal obligations (for example, if we are required to retain your data to comply with applicable laws), resolve disputes, and enforce our legal agreements and policies.
          </p>
        </section>

        {/* Section 8: Children’s Privacy */}
        <section id="children-privacy" className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            8. Children’s Privacy
          </h2>

          <h3 id="age-restriction" className="text-2xl font-semibold text-gray-800 mb-3">a. Age Restriction</h3>
          <p className="text-gray-700 text-lg leading-relaxed">
            PeerTask is not intended for use by children under the age of 13. We do not knowingly collect personally identifiable information from anyone under the age of 13. If you are a parent or guardian and you are aware that your child has provided us with Personal Information, please contact us. If we become aware that we have collected Personal Information from children without verification of parental consent, we take steps to remove that information from our servers promptly.
          </p>
        </section>

        {/* Section 9: International Users */}
        <section id="international-users" className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            9. International Data Transfers
          </h2>

          <h3 id="consent-transfer" className="text-2xl font-semibold text-gray-800 mb-3">a. Consent to Transfer</h3>
          <p className="text-gray-700 text-lg leading-relaxed">
            PeerTask is based in [Insert Your Country/Region, e.g., India]. If you are accessing our service from outside of [Your Country/Region], please be aware that your information may be transferred to, stored, and processed in [Your Country/Region] where our servers are located and our central database is operated. By using PeerTask, you consent to the transfer of your information to our facilities and to those third parties with whom we share it as described in this Privacy Policy. We take all steps reasonably necessary to ensure that your data is treated securely and in accordance with this Privacy Policy.
          </p>
        </section>

        {/* Section 10: Third-Party Services */}
        <section id="third-party-services" className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            10. Third-Party Services and Links
          </h2>

          <h3 id="links-to-others" className="text-2xl font-semibold text-gray-800 mb-3">a. Links to Other Websites</h3>
          <p className="text-gray-700 text-lg leading-relaxed">
            Our Service may contain links to other websites that are not operated by us. If you click on a third-party link, you will be directed to that third party's site. We strongly advise you to review the Privacy Policy of every site you visit. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party sites or services.
          </p>
          <p className="text-gray-700 text-lg leading-relaxed">
            We partner with trusted services like Google (for analytics/authentication), Stripe (for payments), or Supabase (for database/backend services). While we vet our partners, their specific privacy policies apply to the data they collect and process on their own platforms.
          </p>
        </section>

        {/* Section 11: Changes to This Policy */}
        <section id="policy-changes" className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            11. Changes to This Privacy Policy
          </h2>

          <h3 id="notification-changes" className="text-2xl font-semibold text-gray-800 mb-3">a. Notification of Changes</h3>
          <p className="text-gray-700 text-lg leading-relaxed">
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Effective Date" at the top. If the changes are material, we will provide you with prior notice (e.g., via email or prominent notice on our Service) before the changes become effective.
          </p>
          <p className="text-gray-700 text-lg leading-relaxed">
            You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page. Your continued use of PeerTask after any modifications to this Privacy Policy will constitute your acknowledgment of the modifications and your consent to abide and be bound by the modified Privacy Policy.
          </p>
        </section>

        {/* Section 12: Contact Us */}
        <section id="contact-us" className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            12. Contact Us & Governing Law
          </h2>

          <h3 id="governing-law" className="text-2xl font-semibold text-gray-800 mb-3">a. Governing Law and Jurisdiction</h3>
          <p className="text-gray-700 text-lg leading-relaxed mb-4">
            This Privacy Policy shall be governed by and construed in accordance with the laws of [India], without regard to its conflict of law provisions. You agree to the exclusive jurisdiction of the courts located in [ Bhopal, Madhya Pradesh, India] for any disputes arising out of or relating to this Privacy Policy.
          </p>

          <h3 id="dispute-resolution" className="text-2xl font-semibold text-gray-800 mb-3">b. Dispute Resolution</h3>
          <p className="text-gray-700 text-lg leading-relaxed mb-4">
            Any dispute arising out of or in connection with this Privacy Policy, including any question regarding its existence, validity, or termination, shall be referred to and finally resolved by arbitration in [Bhopal,India] with the arbitration rules then in force.
          </p>

          <h3 id="contact-info" className="text-2xl font-semibold text-gray-800 mb-3">c. Contact Information</h3>
          <p className="text-gray-700 text-lg leading-relaxed">
            If you have any questions or concerns about this Privacy Policy, our data practices, or your rights, please contact us:
          </p>
          <ul className="list-disc list-outside ml-8 text-gray-700 text-lg leading-relaxed space-y-2 mb-6">
            <li><strong>By Email:</strong> <a href="mailto:support@peertask.com" className="text-indigo-600 hover:underline">support@peertask.com</a></li>
            <li><strong>By Mail:</strong>
              <address className="not-italic mt-1">
                [PeerTask Headquarters]<br />
                [Ruchi Lifescapes]<br />
                [462026, Madhya Pradesh, India]
              </address>
            </li>
          </ul>
        </section>

        {/* Footer */}
        <footer className="mt-20 text-center text-gray-500 text-base border-t pt-8 border-gray-200">
          <p>&copy; {new Date().getFullYear()} PeerTask. All rights reserved.</p>
          <p className="mt-2">Thank you for trusting PeerTask with your privacy.</p>
        </footer>
      </div>
    </div>
  );
};

export default PrivacyPolicy;