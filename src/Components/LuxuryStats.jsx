import React from 'react';
import { FiHome, FiUsers, FiDollarSign } from 'react-icons/fi';

const LuxuryStats = () => {
    const stats = [
        {
            label: "Total Revenue",
            value: "$12.5M+",
            icon: <FiDollarSign />,
        },
        {
            label: "Properties Sold",
            value: "3,200+",
            icon: <FiHome />,
        },
        {
            label: "Happy Customers",
            value: "5,000+",
            icon: <FiUsers />,
        },
    ];

    return (
        <section className="py-10 bg-base-100">
            <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-14">
                    <h2 className="text-3xl md:text-4xl font-bold text-neutral">
                        Our <span className="text-primary">Milestones</span>
                    </h2>
                    <p className="mt-4 text-base-content max-w-2xl mx-auto">
                        A reflection of the trust our users place in HomeNest and the continued
                        growth of our real estate platform.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 text-center gap-12">
                    {stats.map((stat, index) => (
                        <div key={index} className="flex flex-col items-center">
                            <div className="text-5xl text-primary mb-4">
                                {stat.icon}
                            </div>

                            <h3 className="text-5xl font-bold text-neutral mb-3">
                                {stat.value}
                            </h3>

                            <div className="w-16 h-[2px] bg-primary mb-3"></div>

                            <p className="text-sm uppercase tracking-widest text-base-content">
                                {stat.label}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default LuxuryStats;
