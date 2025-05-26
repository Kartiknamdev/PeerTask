import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const faqs = [
  {
    id: 1,
    question: "How do I join PeerTask?",
    answer: "Signing up is easy! Just click the 'Sign Up' button, enter your school email, create a password, and complete your profile with your skills and interests."
  },
  {
    id: 2,
    question: "Is PeerTask only for college students?",
    answer: "Currently, PeerTask is designed for college and university students. We verify all users through their academic email addresses to ensure a trusted community."
  },
  {
    id: 3,
    question: "How does the task exchange work?",
    answer: "You can either post tasks you need help with or browse available tasks. Once you find a match, you can chat with the other student to discuss details and agree on the exchange value (points, credits, or other assistance)."
  },
  {
    id: 4,
    question: "Is there a fee to use PeerTask?",
    answer: "PeerTask is completely free to use for all verified students. We believe in creating a platform that's accessible to everyone in the academic community."
  },
  {
    id: 5,
    question: "How does PeerTask ensure quality and trust?",
    answer: "We maintain a robust rating and review system. After each task exchange, students rate each other, building a reputation score that helps ensure quality interactions. We also have a verification process to make sure all users are legitimate students."
  },
  {
    id: 6,
    question: "Can I use PeerTask to find long-term study partners?",
    answer: "Absolutely! While many students use PeerTask for one-time task exchanges, it's also a great platform to find compatible study partners for ongoing collaboration throughout your academic journey."
  }
];


const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">   
        <div className="text-center mb-16">
          <span className="text-blue-600 font-semibold tracking-wider uppercase">FAQ</span>
          <h2 className="mt-2 text-3xl md:text-4xl font-bold text-gray-900">Frequently Asked Questions</h2>
          <p className="mt-4 text-xl text-gray-600">Find answers to common questions about PeerTask .</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
              <button
                className="w-full text-left py-4 px-6 flex justify-between items-center focus:outline-none bg-white"
                onClick={() => toggleFAQ(index)}
              >
                <span className="text-lg font-medium text-gray-900">{faq.question}</span>
                <span className="ml-6 flex-shrink-0">
                  {openIndex === index ? (
                    <Minus className="h-5 w-5 text-blue-500" />
                  ) : (
                    <Plus className="h-5 w-5 text-gray-500" />
                  )}
                </span>
              </button>
              {openIndex === index && (
                <div className="px-6 pb-4 text-gray-600">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
