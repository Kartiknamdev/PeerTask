import React from 'react';

// PPT component containing the glassmorphism page with the embedded Canva presentation
const PPT = () => {
  return (
    // Main container with full viewport height and width, centered content, and a background gradient
    // Changed background gradient to greyish tones
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-gray-700 to-gray-900 p-4 font-sans">
      {/* Glassmorphism card container */}
      <div className="relative w-full max-w-4xl bg-white/5 backdrop-filter backdrop-blur-xl rounded-3xl shadow-2xl border border-white/10 p-8 transform transition-all duration-500 hover:scale-[1.01] overflow-hidden">
        {/* Decorative background circles for enhanced glassmorphism effect */}
        {/* Adjusted opacity and blend mode for subtle effect on grey background */}
        <div className="absolute -top-16 -left-16 w-48 h-48 bg-gray-500/5 rounded-full mix-blend-lighten animate-pulse"></div>
        <div className="absolute -bottom-16 -right-16 w-64 h-64 bg-gray-500/5 rounded-full mix-blend-lighten animate-pulse animation-delay-2000"></div>

        {/* Content wrapper */}
        <div className="relative z-10 text-gray-200"> {/* Default text color for inside glass card */}
          {/* Page Title */}
          {/* Changed title color to a light grey, keeping drop shadow */}
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-center text-gray-100 drop-shadow-lg">
            About PeerTask
          </h1>

          {/* Subtitle/Description */}
          {/* Adjusted subtitle color for better contrast */}
          <p className="text-lg md:text-xl text-center mb-10 text-gray-300 opacity-90 leading-relaxed">
            Empowering student collaboration through micro-tasks and mutual support
          </p>

          {/* Presentation Section */}
          {/* Background slightly darker for embedded sections, border adjusted */}
          <div className="bg-black/20 rounded-2xl p-6 mb-8 border border-gray-600/30 shadow-inner">
            {/* Heading with a subtle accent color (e.g., a muted teal/cyan) */}
            <h2 className="text-3xl font-bold mb-4 text-center text-teal-300">Our Mission & Vision</h2>
            {/* Description text color */}
            <p className="text-md text-center mb-6 text-gray-300 opacity-80">
              Learn more about how PeerTask is revolutionizing student collaboration
            </p>

            {/* Iframe for embedding the Canva Presentation with updated embed code */}
            <div style={{ position: 'relative', width: '100%', height: 0, paddingTop: '56.2500%',
                          paddingBottom: 0, boxShadow: '0 2px 8px 0 rgba(63,69,81,0.16)', marginTop: '1.6em', marginBottom: '0.9em', overflow: 'hidden',
                          borderRadius: '8px', willChange: 'transform' }}>
              <iframe
                loading="lazy"
                style={{ position: 'absolute', width: '100%', height: '100%', top: 0, left: 0, border: 'none', padding: 0, margin: 0 }}
                src="https://www.canva.com/design/DAGmNjGTI9k/8A7ehbcv__A_6kw0dcE_aQ/view?embed"
                allowFullScreen={true}
                allow="fullscreen"
                title="PeerTask Presentation"
              ></iframe>
            </div>
          </div>

          {/* Additional Content Section */}
          {/* Background slightly darker for embedded sections, border adjusted */}
          <div className="bg-black/20 rounded-2xl p-6 border border-gray-600/30 shadow-inner">
            {/* Heading with the same subtle accent color */}
            <h2 className="text-2xl font-bold mb-4 text-center text-teal-300">Why PeerTask?</h2>
            {/* Description text color */}
            <p className="text-md text-center text-gray-300 opacity-80 leading-relaxed">
              PeerTask is more than just a platform - it's a community. We believe in the power of student collaboration
              and mutual support. Whether you need help with presentations, notes, or data analysis, our platform
              connects you with capable peers who can assist. Tasks can be completed for rewards or favors,
              fostering a culture of reciprocity and community support.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PPT;