import React from 'react';
import { Check } from 'lucide-react';

const pricingPlans = [
  {
    name: 'Starter',
    price: '$19',
    description: 'Perfect for individuals and small teams getting started.',
    features: [
      { text: 'Up to 5 users', included: true },
      { text: 'Basic project management', included: true },
      { text: '5GB storage', included: true },
      { text: 'Basic analytics', included: true },
      { text: 'Email support', included: true },
      { text: 'Advanced security', included: false },
      { text: 'Custom integrations', included: false },
    ],
    buttonText: 'Start Free Trial'
  },
  {
    name: 'Pro',
    price: '$49',
    description: 'Ideal for growing teams needing more features and flexibility.',
    features: [
      { text: 'Up to 20 users', included: true },
      { text: 'Advanced project management', included: true },
      { text: '25GB storage', included: true },
      { text: 'Advanced analytics', included: true },
      { text: 'Priority support', included: true },
      { text: 'Advanced security', included: true },
      { text: 'Custom integrations', included: false },
    ],
    buttonText: 'Start Free Trial',
    highlighted: true
  },
  {
    name: 'Enterprise',
    price: '$99',
    description: 'For organizations requiring maximum security and customization.',
    features: [
      { text: 'Unlimited users', included: true },
      { text: 'Enterprise project management', included: true },
      { text: 'Unlimited storage', included: true },
      { text: 'Custom analytics', included: true },
      { text: 'Dedicated support', included: true },
      { text: 'Advanced security', included: true },
      { text: 'Custom integrations', included: true },
    ],
    buttonText: 'Contact Sales'
  }
];

const Pricing = () => {
  return (
    <section id="pricing" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-blue-600 font-semibold tracking-wider uppercase">Pricing</span>
          <h2 className="mt-2 text-3xl md:text-4xl font-bold text-gray-900">
            Choose the perfect plan for your team
          </h2>
          <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
            Simple, transparent pricing that scales with your business. All plans include a 14-day free trial.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {pricingPlans.map((plan, index) => (
            <div 
              key={index} 
              className={`rounded-xl overflow-hidden ${
                plan.highlighted 
                  ? 'ring-2 ring-blue-500 shadow-xl bg-white relative' 
                  : 'border border-gray-200 shadow-sm bg-white'
              }`}
            >
              {plan.highlighted && (
                <div className="absolute top-0 inset-x-0 flex justify-center transform -translate-y-1/2">
                  <span className="inline-flex rounded-full bg-blue-600 px-4 py-1 text-sm font-semibold text-white">
                    Most Popular
                  </span>
                </div>
              )}
              
              <div className="p-8">
                <h3 className="text-xl font-semibold text-gray-900">{plan.name}</h3>
                <div className="mt-4 flex items-baseline">
                  <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                  <span className="ml-1 text-gray-600">/month</span>
                </div>
                <p className="mt-2 text-gray-600">{plan.description}</p>
                
                <ul className="mt-6 space-y-4">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <div className={`rounded-full p-1 ${feature.included ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-400'}`}>
                        <Check size={16} />
                      </div>
                      <span className={`ml-3 ${feature.included ? 'text-gray-700' : 'text-gray-400'}`}>
                        {feature.text}
                      </span>
                    </li>
                  ))}
                </ul>
                
                <div className="mt-8">
                  <button 
                    className={`w-full py-3 px-4 rounded-lg text-center font-medium ${
                      plan.highlighted 
                        ? 'bg-blue-600 text-white hover:bg-blue-700' 
                        : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                    } transition-colors`}
                  >
                    {plan.buttonText}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
