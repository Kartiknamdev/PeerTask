import React, { useState } from 'react';
import { ArrowRight, CheckCircle } from 'lucide-react';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 1000);
  };
  
  return (
    <section id="contact" className="py-24 bg-gradient-to-br from-blue-500 to-indigo-700 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold">
            Stay updated with our newsletter
          </h2>
          <p className="mt-4 text-xl text-blue-100">
            Join our newsletter for tips, New updates, and exclusive rewards.
          </p>
          
          {isSubmitted ? (
            <div className="mt-8 flex items-center justify-center text-lg">
              <CheckCircle className="mr-2 h-6 w-6 text-green-300" />
              <span>Thanks for subscribing!</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-8">
              <div className="sm:flex sm:justify-center">
                <div className="sm:flex-1 min-w-0 sm:max-w-xs">
                  <label htmlFor="email" className="sr-only">Email address</label>
                  <input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-300"
                  />
                </div>
                <div className="mt-3 sm:mt-0 sm:ml-3">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className={`block w-full sm:w-auto px-6 py-3 bg-white text-blue-600 font-medium rounded-lg hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600 ${
                      isLoading ? 'opacity-75 cursor-not-allowed' : ''
                    }`}
                  >
                    {isLoading ? (
                      <span>Subscribing...</span>
                    ) : (
                      <span className="flex items-center">
                        Subscribe <ArrowRight className="ml-2 h-4 w-4" />
                      </span>
                    )}
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default Newsletter;