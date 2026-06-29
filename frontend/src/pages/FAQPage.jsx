import React, { useState } from "react";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import styles from "../styles/styles";

const FAQPage = () => {
  const [activeTab, setActiveTab] = useState(0);

  const toggleTab = (tab) => {
    if (activeTab === tab) {
      setActiveTab(0);
    } else {
      setActiveTab(tab);
    }
  };

  const faqData = [
    {
      id: 2,
      q: "What is your return policy?",
      a: "We offer a 30-day return policy for all unused products in their original packaging. You can initiate a return from your profile order details panel.",
    },
    {
      id: 3,
      q: "How do I track my order?",
      a: "Once shipped, you will receive a tracking link in your profile. You can also view live tracking updates on the Track Order page.",
    },
    {
      id: 4,
      q: "How do I contact customer support?",
      a: "You can send us a message through the customer inbox or reach out via email support@eshop.com.",
    },
    {
      id: 5,
      q: "Can I change or cancel my order?",
      a: "Orders can be modified or cancelled before the shipment process begins. Please contact the merchant directly via store messaging.",
    },
    {
      id: 6,
      q: "Do you offer international shipping?",
      a: "Yes, we ship internationally to multiple countries worldwide. Custom duties and delivery fees will be shown at checkout.",
    },
    {
      id: 7,
      q: "What payment methods do you accept?",
      a: "We accept PayPal, credit cards (Stripe confirmation), and Cash On Delivery payment options.",
    },
  ];

  return (
    <div>
      <Header activeHeading={5} />
      <div className={`${styles.section} my-12`}>
        <h2 className="text-3xl font-bold text-gray-800 border-b pb-4 mb-8 font-Poppins">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {faqData.map((item) => (
            <div key={item.id} className="border-b pb-4">
              <button
                className="w-full flex items-center justify-between text-left py-2 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 rounded"
                onClick={() => toggleTab(item.id)}
              >
                <span className="font-semibold text-gray-800 text-base md:text-lg">
                  {item.q}
                </span>
                {activeTab === item.id ? (
                  <svg
                    className="h-6 w-6 text-gray-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
                  <svg
                    className="h-6 w-6 text-gray-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                )}
              </button>
              {activeTab === item.id && (
                <p className="mt-2 text-gray-600 text-sm md:text-base leading-relaxed pl-1 animate-fade-in">
                  {item.a}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default FAQPage;
