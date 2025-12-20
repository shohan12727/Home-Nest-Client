import React from 'react';

const HowItWorks = () => {
    const steps = [
        {
            step: "01",
            title: "Create Your Account",
            description:
                "Sign up using email or Google to access personalized features like adding properties and posting reviews.",
            icon: "👤",
        },
        {
            step: "02",
            title: "Explore or List Properties",
            description:
                "Browse available properties or add your own listings with detailed information and images.",
            icon: "🏘️",
        },
        {
            step: "03",
            title: "Review & Manage Listings",
            description:
                "Rate properties, leave reviews, and manage your listings from your dashboard with full control.",
            icon: "⭐",
        },
    ];

    return (
        <section className="py-16 bg-base-100 grid-bg">
            <div className="max-w-7xl mx-auto px-4">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-neutral">
                        How <span className="text-primary">HomeNest</span> Works
                    </h2>
                    <p className="mt-4 text-base-content max-w-2xl mx-auto">
                        Get started with HomeNest in just a few simple steps and discover or manage
                        properties effortlessly.
                    </p>
                </div>

                {/* Steps */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {steps.map((item, index) => (
                        <div
                            key={index}
                            className="card bg-base-100 shadow-md hover:shadow-xl transition-all duration-300"
                        >
                            <div className="card-body items-center text-center">
                                <div className="text-primary text-sm font-semibold mb-2">
                                    STEP {item.step}
                                </div>
                                <div className="text-4xl mb-4">{item.icon}</div>
                                <h3 className="card-title text-lg font-semibold text-neutral">
                                    {item.title}
                                </h3>
                                <p className="text-sm text-base-content">
                                    {item.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
