import React from 'react';

const FAQ = () => {
  // FAQ data
  const faqs = [
    {
      question: "What is HomeNest?",
      answer: "HomeNest is a platform that helps you find your perfect home with ease and convenience."
    },
    {
      question: "How do I list my property?",
      answer: "Simply sign up, click on 'List Property', and follow the guided steps to add your property details and photos."
    },
    {
      question: "Is HomeNest free to use?",
      answer: "Browsing and searching properties is completely free. We offer premium plans for property owners who want enhanced visibility."
    },
    {
      question: "How can I contact support?",
      answer: "You can reach our support team via email at support@homenest.com or through the contact form on our website."
    }
  ];

  return (
    <div className="py-10 bg-base-100">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4">
           <span className='text-primary'>Frequently</span> Asked Questions
          </h2>
          <p className="text-center text-lg mb-12 opacity-80">
            Quick answers to common questions about HomeNest
          </p>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="collapse collapse-plus bg-base-200 rounded-lg"
              >
                <input
                  type="radio"
                  name="faq-accordion"
                  defaultChecked={index === 0}
                />
                <div className="collapse-title text-xl font-semibold">
                  {faq.question}
                </div>
                <div className="collapse-content">
                  <p className="opacity-80 leading-relaxed">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;