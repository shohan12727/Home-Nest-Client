import React from 'react';

const WhyChooseUs = () => {
    const features = [
        {
            title: "Verified Property Listings",
            description:
                "All properties on HomeNest go through a verification process to ensure accurate information and trusted listings.",
            icon: "🏠",
        },
        {
            title: "Seamless User Experience",
            description:
                "Our clean and intuitive interface allows users to search, filter, and manage properties with ease on any device.",
            icon: "🏁",
        },
        {
            title: "Secure & Protected Platform",
            description:
                "We use secure authentication and protected routes so your personal data and property information stay safe.",
            icon: "🔒",
        },
        {
            title: "Personalized Property Control",
            description:
                "Add, update, and manage your properties and reviews effortlessly from your personal dashboard.",
            icon: "📋",
        },
    ];

    return (
        <section className="py-16 bg-base-100 grid-bg">
            <div className="max-w-7xl mx-auto px-4">
                {/* Section Heading */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-neutral">
                        Why Choose <span className="text-primary">HomeNest</span>
                    </h2>
                    <p className="mt-4 text-base-content max-w-2xl mx-auto">
                        HomeNest is designed to make property discovery, listing, and management
                        secure, transparent, and effortless for everyone.
                    </p>
                </div>

                {/* Feature Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="card bg-base-200 shadow-md hover:shadow-xl transition-all duration-300"
                        >
                            <div className="card-body items-center text-center">
                                <div className="text-4xl mb-4 text-primary">
                                    {feature.icon}
                                </div>
                                <h3 className="card-title text-lg font-semibold text-neutral">
                                    {feature.title}
                                </h3>
                                <p className="text-sm text-base-content">
                                    {feature.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WhyChooseUs;
