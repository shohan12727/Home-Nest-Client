import React, { useState } from "react";
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa";
import toast from "react-hot-toast";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const contactInfo = [
    {
      icon: <FaPhone />,
      title: "Phone",
      details: "+8801887104758",
      subDetails: "Mon-Fri 9am-6pm",
    },
    {
      icon: <FaEnvelope />,
      title: "Email",
      details: "aishohan001@gmail.com",
      subDetails: "24/7 (any day)",
    },
    {
      icon: <FaMapMarkerAlt />,
      title: "Office",
      details: "5/A road,Block C,Basundahra R/A",
      subDetails: "Dhaka, Bangladesh",
    },
    {
      icon: <FaClock />,
      title: "Working Hours",
      details: "Mon - Fri: 9:00 AM - 6:00 PM",
      subDetails: "",
    },
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill in all required fields");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    // Simulate form submission
    toast.success("Message sent successfully! We will get back to you soon.");

    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    });
  };

  const faqs = [
    {
      question: "How do I list my property on HomeNest?",
      answer:
        "Simply create an account, navigate to 'Add Properties' from the menu, fill in your property details, and submit. Your listing will be live immediately.",
    },
    {
      question: "Is there a fee for listing properties?",
      answer:
        "Basic listings are completely free. We also offer premium listing options with enhanced visibility for a small fee.",
    },
    {
      question: "How can I contact property owners?",
      answer:
        "Once you're logged in, view any property details page and you'll find the owner's contact information including email and phone number.",
    },
    {
      question: "Can I edit or delete my property listing?",
      answer:
        "Yes! Go to 'My Properties' page where you can update or delete any of your listings at any time.",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#E6B400] via-[#FFD24A] to-[#E6B400] py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-[#0A1A44] mb-6">
              Get In Touch
            </h1>
            <p className="text-xl text-[#0A1A44]/80 leading-relaxed">
              Have questions? We'd love to hear from you. Send us a message and
              we'll respond as soon as possible.
            </p>
          </div>
        </div>
      </div>

      {/* Contact Info Cards */}
      <div className="py-16 bg-base-100">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {contactInfo.map((info, index) => (
              <div
                key={index}
                className="bg-base-200 p-6 rounded-lg text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="text-4xl text-[#E6B400] mb-4 flex justify-center">
                  {info.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{info.title}</h3>
                <p className="font-semibold mb-1">{info.details}</p>
                <p className="text-sm opacity-70">{info.subDetails}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact Form & Map Section */}
      <div className="py-20 bg-base-200">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-4xl font-bold mb-4">Send Us a Message</h2>
              <p className="text-lg mb-8 opacity-80">
                Fill out the form below and our team will get back to you within
                24 hours
              </p>

              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Your Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="king Shohan"
                      className="input input-bordered w-full bg-base-100 focus:border-[#E6B400] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="king@gmail.com"
                      className="input input-bordered w-full bg-base-100 focus:border-[#E6B400] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Enter your  number"
                      className="input input-bordered w-full bg-base-100 focus:border-[#E6B400] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Property Inquiry"
                      className="input input-bordered w-full bg-base-100 focus:border-[#E6B400] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us how we can help you..."
                    rows="6"
                    className="textarea textarea-bordered w-full bg-base-100 focus:border-[#E6B400] focus:outline-none resize-none"
                  ></textarea>
                </div>

                <button
                  onClick={handleSubmit}
                  className="btn-primary w-full text-lg"
                >
                  Send Message
                </button>
              </div>
            </div>

            {/* Map & Social Links */}
            <div>
              <h2 className="text-4xl font-bold mb-4">Find Us Here</h2>
              <p className="text-lg mb-8 opacity-80">
                Visit our office or connect with us on social media
              </p>

              {/* Map */}
              <div className="rounded-lg overflow-hidden shadow-xl mb-8 h-[400px]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d233667.49930194505!2d90.25446309999999!3d23.780753!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8b087026b81%3A0x8fa563bbdd5904c2!2sDhaka!5e0!3m2!1sen!2sbd!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="HomeNest Office Location"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="py-20 bg-base-100">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-4">
              Frequently Asked Questions
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

      {/* CTA Section */}
      <div className="py-20 bg-gradient-to-r from-[#E6B400] via-[#FFD24A] to-[#E6B400]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-[#0A1A44] mb-6">
            Need Immediate Assistance?
          </h2>
          <p className="text-xl text-[#0A1A44]/80 mb-8 max-w-2xl mx-auto">
            Our support team is available to help you with any questions or
            concerns
          </p>

          <p className="btn-primary text-lg px-8 py-3 inline-block">
            Call Us Now: +880 188710 4758
          </p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
