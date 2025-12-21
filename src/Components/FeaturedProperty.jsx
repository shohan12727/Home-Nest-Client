import React from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "./LoadingSpinner";
import { Link } from "react-router";

const FeaturedProperty = () => {
  const axiosSecure = useAxiosSecure();

  const { data: featuredProperty = [], isLoading } = useQuery({
    queryKey: ["featured-property"],
    queryFn: async () => {
      const res = await axiosSecure.get("/properties/featured"); 
      return res.data;
    },
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-4xl font-bold text-center mb-8">
      <span className="text-primary">Featured</span> Properties
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {featuredProperty.map((property) => (
          <div
            key={property._id}
            className="card bg-base-100 shadow-xl"
          >
            <figure>
              <img
                src={property.image}
                alt={property.propertyName}
                className="h-48 w-full object-cover"
              />
            </figure>

            <div className="card-body">
              <h3 className="card-title">
                {property.propertyName}
              </h3>

              <p className="text-sm text-gray-500">
                <span className="font-semibold">Category:</span>{" "}
                {property.category}
              </p>

              <p className="text-sm line-clamp-2">
                {property.description}
              </p>

              <p className="text-sm">
                <span className="font-semibold">Location:</span>{" "}
                {property.location}
              </p>

              <p className="text-lg font-bold text-primary">
                ${property.price}
              </p>

              <div className="card-actions justify-end mt-4">
                <Link to={`/property-details/${property._id}`}>
                  <button className="btn btn-primary">
                    View Details
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedProperty;
