import React from 'react';
import { Link } from 'react-router-dom'; // Assuming react-router-dom is used for navigation

const Cookies = () => {
  // Define policy sections for dynamic rendering and Table of Contents
  const cookieSections = [
    { id: "introduction", title: "1. Introduction", subsections: [] },
    { id: "what-are-cookies", title: "2. What Are Cookies?", subsections: [] },
    { id: "types-of-cookies-we-use", title: "3. Types of Cookies We Use", subsections: [
        { id: "strictly-necessary", title: "a. Strictly Necessary Cookies" },
        { id: "performance-analytics", title: "b. Performance/Analytics Cookies" },
        { id: "functionality", title: "c. Functionality Cookies" },
        { id: "targeting-advertising", title: "d. Targeting/Advertising Cookies" },
        { id: "first-third-party", title: "e. First-Party vs. Third-Party Cookies" },
        { id: "session-persistent", title: "f. Session vs. Persistent Cookies" },
    ]},
    { id: "how-we-use-cookies", title: "4. How We Use Cookies", subsections: [] },
    { id: "managing-preferences", title: "5. Managing Your Cookie Preferences", subsections: [
        { id: "browser-settings", title: "a. Browser Settings" },
        { id: "consent-tool", title: "b. Our Cookie Consent Tool" },
        { id: "opt-out-links", title: "c. Industry Opt-Out Links" },
    ]},
    { id: "updates-policy", title: "6. Updates to This Policy", subsections: [] },
    { id: "contact-us", title: "7. Contact Us", subsections: [] },
  ];

  return (
    // Main container with a clean, light background and good padding
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
            PeerTask Cookies Policy
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
              {cookieSections.map((section) => (
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
            At PeerTask, we are committed to providing you with a seamless, efficient, and personalized experience. To achieve this, our website and services utilize <strong className="text-indigo-600">cookies</strong> and similar tracking technologies. This Cookies Policy provides detailed information about what these technologies are, how we use them, and how you can manage your preferences.
          </p>
          <p>
            By continuing to use PeerTask, you consent to the use of cookies as described in this policy.
          </p>
        </section>

        {/* What Are Cookies? */}
        <section id="what-are-cookies" className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">2. What Are Cookies?</h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            Cookies are small text files that are downloaded to your computer or mobile device when you visit a website. They are widely used by online service providers to make their websites work, or to work more efficiently, as well as to provide reporting information. These files allow the website to remember your actions and preferences (such as login details, language, font size, and other display preferences) over a period, so you don’t have to keep re-entering them whenever you come back to the site or browse from one page to another.
          </p>
        </section>

        {/* Types of Cookies We Use */}
        <section id="types-of-cookies-we-use" className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">3. Types of Cookies We Use</h2>
          <p className="text-gray-700 text-lg leading-relaxed mb-4">
            We use various types of cookies for different purposes to ensure the proper functioning and optimal performance of our platform:
          </p>

          <h3 id="strictly-necessary" className="text-2xl font-semibold text-gray-800 mb-3">a. Strictly Necessary Cookies</h3>
          <p className="text-gray-700 text-lg leading-relaxed mb-4">
            These cookies are essential for the operation of our website. They enable core functionalities such as user authentication, security features, and access to secure areas of the site. Without these cookies, services you have specifically requested, like logging into your account or adding items to a task list, cannot be provided. They do not collect any personal information for marketing purposes and are usually set only in response to actions made by you.
          </p>

          <h3 id="performance-analytics" className="text-2xl font-semibold text-gray-800 mb-3 mt-6">b. Performance/Analytics Cookies</h3>
          <p className="text-gray-700 text-lg leading-relaxed mb-4">
            These cookies collect anonymous information about how visitors use our website, such as which pages they visit most often, how much time they spend on a page, and if they encounter error messages. This data helps us to understand and analyze web traffic, identify popular content, and improve the overall performance and design of our website. We may use third-party analytics providers (e.g., Google Analytics) for this purpose. These cookies do not identify you personally.
          </p>

          <h3 id="functionality" className="text-2xl font-semibold text-gray-800 mb-3 mt-6">c. Functionality Cookies</h3>
          <p className="text-gray-700 text-lg leading-relaxed mb-4">
            Functionality cookies allow our website to remember choices you make (such as your username, language, or the region you are in) and provide enhanced, more personalized features. For example, they can remember your login details for a smoother return experience or provide you with localized content. They may also be used to provide services you have asked for, such as watching a video or commenting on a blog. The information these cookies collect may be anonymized and cannot track your Browse activity on other websites.
          </p>

          <h3 id="targeting-advertising" className="text-2xl font-semibold text-gray-800 mb-3 mt-6">d. Targeting/Advertising Cookies</h3>
          <p className="text-gray-700 text-lg leading-relaxed mb-4">
            These cookies are used to deliver advertisements that are more relevant to you and your interests based on your Browse habits. They are also used to limit the number of times you see an advertisement as well as help measure the effectiveness of advertising campaigns. They are usually placed by advertising networks with the website operator’s permission. They remember that you have visited a website and this information is shared with other organizations such as advertisers. This means that after you have visited our website, you may see some advertising about PeerTask elsewhere on the Internet.
          </p>

          <h3 id="first-third-party" className="text-2xl font-semibold text-gray-800 mb-3 mt-6">e. First-Party vs. Third-Party Cookies</h3>
          <p className="text-gray-700 text-lg leading-relaxed mb-4">
            <strong className="text-gray-900">First-Party Cookies:</strong> These are cookies set by the website you are visiting (i.e., PeerTask). They are typically used to remember your preferences for that specific site.
          </p>
          <p className="text-gray-700 text-lg leading-relaxed">
            <strong className="text-gray-900">Third-Party Cookies:</strong> These are cookies set by a domain other than the one you are visiting. This occurs when the website incorporates elements from other sites, such as images, social media plugins, or advertising. For example, YouTube sets a cookie on your browser when you watch a video embedded from YouTube on PeerTask. We do not control the use of these third-party cookies.
          </p>

          <h3 id="session-persistent" className="text-2xl font-semibold text-gray-800 mb-3 mt-6">f. Session vs. Persistent Cookies</h3>
          <p className="text-gray-700 text-lg leading-relaxed mb-4">
            <strong className="text-gray-900">Session Cookies:</strong> These cookies are temporary and expire when you close your browser. They are typically used for things like remembering your login for a single session.
          </p>
          <p className="text-gray-700 text-lg leading-relaxed">
            <strong className="text-gray-900">Persistent Cookies:</strong> These cookies remain on your device for a set period (which can be minutes, days, or years) or until you delete them. They are used to remember you over multiple sessions, for example, to keep you logged in or remember your preferences.
          </p>
        </section>

        {/* How We Use Cookies */}
        <section id="how-we-use-cookies" className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">4. How We Use Cookies</h2>
          <p className="text-gray-700 text-lg leading-relaxed mb-4">
            PeerTask uses cookies to enhance your experience in several ways, including:
          </p>
          <ul className="list-disc list-outside ml-8 text-gray-700 text-lg leading-relaxed space-y-2 mb-6">
            <li>Operating our website and enabling core functionalities (e.g., secure login, task management).</li>
            <li>Remembering your settings and preferences.</li>
            <li>Analyzing how our website is used to improve its design and performance.</li>
            <li>Providing personalized content and relevant advertisements (where applicable).</li>
            <li>Ensuring the security of our platform and preventing fraudulent activity.</li>
          </ul>
        </section>

        {/* Managing Your Cookie Preferences */}
        <section id="managing-preferences" className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">5. Managing Your Cookie Preferences</h2>
          <p className="text-gray-700 text-lg leading-relaxed mb-4">
            You have the right to control and manage your cookie preferences. Please note that restricting or blocking certain cookies may impact the functionality and performance of our website.
          </p>

          <h3 id="browser-settings" className="text-2xl font-semibold text-gray-800 mb-3">a. Browser Settings</h3>
          <p className="text-gray-700 text-lg leading-relaxed mb-4">
            Most web browsers allow you to control cookies through their settings. You can typically find these settings in the "Options," "Preferences," or "Tools" menu of your browser. You can configure your browser to:
          </p>
          <ul className="list-disc list-outside ml-8 text-gray-700 text-lg leading-relaxed space-y-2 mb-6">
            <li>Block all cookies.</li>
            <li>Accept only certain types of cookies (e.g., first-party cookies only).</li>
            <li>Notify you before a cookie is placed.</li>
            <li>Delete all cookies when you close your browser.</li>
          </ul>
          <p className="text-gray-700 text-lg leading-relaxed">
            Please consult your browser's help documentation for specific instructions on how to manage cookie settings.
          </p>

          <h3 id="consent-tool" className="text-2xl font-semibold text-gray-800 mb-3 mt-6">b. Our Cookie Consent Tool</h3>
          <p className="text-gray-700 text-lg leading-relaxed mb-4">
            PeerTask may provide a specific cookie consent tool on our website (e.g., a banner or pop-up) that allows you to customize your preferences for non-essential cookies. You can usually access and modify these settings at any time through the tool.
          </p>

          <h3 id="opt-out-links" className="text-2xl font-semibold text-gray-800 mb-3 mt-6">c. Industry Opt-Out Links</h3>
          <p className="text-gray-700 text-lg leading-relaxed mb-4">
            You can learn more about behavioral advertising and opt-out of cookies from certain advertising networks through industry initiatives:
          </p>
          <ul className="list-disc list-outside ml-8 text-gray-700 text-lg leading-relaxed space-y-2 mb-6">
            <li><a href="http://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">Digital Advertising Alliance (DAA)</a></li>
            <li><a href="http://youronlinechoices.eu/" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">European Interactive Digital Advertising Alliance (EDAA)</a></li>
            <li><a href="https://optout.networkadvertising.org/?c=1" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">Network Advertising Initiative (NAI)</a></li>
          </ul>
        </section>

        {/* Updates to This Policy */}
        <section id="updates-policy" className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">6. Updates to This Policy</h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            We may update this Cookies Policy from time to time to reflect changes in our practices, technology, or for other operational, legal, or regulatory reasons. We will notify you of any material changes by posting the new Cookies Policy on this page and updating the "Effective Date" at the top. We encourage you to review this policy periodically for any updates.
          </p>
        </section>

        {/* Contact Us */}
        <section id="contact-us" className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">7. Contact Us</h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            If you have any questions or concerns about our Cookies Policy or our use of cookies, please do not hesitate to contact us at:
          </p>
          <ul className="list-disc list-outside ml-8 text-gray-700 text-lg leading-relaxed space-y-2 mb-6">
            <li><strong>By Email:</strong> <a href="mailto:support@peertask.com" className="text-indigo-600 hover:underline">support@peertask.com</a></li>
            <li><strong>By Mail:</strong>
              <address className="not-italic mt-1">
                PeerTask Support<br />
                [Ruchi Lifescapes]<br />
                Bhopal, Madhya Pradesh, India
              </address>
            </li>
          </ul>
        </section>

        {/* Footer */}
        <footer className="mt-20 text-center text-gray-500 text-base border-t pt-8 border-gray-200">
          <p>&copy; {new Date().getFullYear()} PeerTask. All rights reserved.</p>
          <p className="mt-2">Thank you for your understanding and trust.</p>
        </footer>
      </div>
    </div>
  );
};

export default Cookies;