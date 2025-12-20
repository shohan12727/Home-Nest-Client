import useAxiosSecure from "../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "./LoadingSpinner";
import { Link } from "react-router";

const AllProperties = () => {
  const axiosSecure = useAxiosSecure();


  const { data: allProperties = [], isLoading } = useQuery({
    queryKey: ["all-properties"],
    queryFn: async () => {
      const res = await axiosSecure.get("/properties");
      return res.data;
    },
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-primary mb-8 text-center">All Properties</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {allProperties.map((property) => (
          <div
            key={property._id}
            className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300"
          >
            {/* Property Image */}
            <figure className="h-56 overflow-hidden">
              <img
                src={property.image}
                alt={property.propertyName}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </figure>

            <div className="card-body p-4">
              {/* Property Name */}
              <h2 className="card-title text-xl font-bold mb-2">
                {property.propertyName}
              </h2>

              {/* Category and Price in one line */}
              <div className="flex items-center justify-between mb-2">
                <div className="badge badge-secondary badge-outline">
                  {property.category}
                </div>
                <div className="text-xl font-bold text-primary">
                  ${property.price.toLocaleString()}
                </div>
              </div>

              {/* Location and Posted by in one line */}
              <div className="flex items-center justify-between text-sm mb-3">
                <div className="flex items-center gap-1 opacity-80">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <span>{property.location}</span>
                </div>
                <div className="flex items-center gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  <span className="font-semibold">{property.vendorName}</span>
                </div>
              </div>

              {/* See Details Button */}
              <div className="card-actions">
                <Link to={`/property-details/${property._id}`}>
                  <button className="btn btn-primary w-full">
                    See Details
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {allProperties.length === 0 && (
        <div className="text-center py-16">
          <p className="text-xl opacity-70">
            No properties available at the moment.
          </p>
        </div>
      )}
    </div>
  );
};

export default AllProperties;
