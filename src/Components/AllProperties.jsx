import useAxiosSecure from "../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "./LoadingSpinner";

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
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold mb-8 text-center">
        All Properties
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {allProperties.map((property) => (
          <div
            key={property._id}
            className="card bg-base-100 shadow-xl border border-base-200"
          >
            {/* Thumbnail Image */}
            <figure className="h-48 overflow-hidden">
              <img
                src={property.image}
                alt={property.propertyName}
                className="w-full h-full object-cover"
              />
            </figure>

            <div className="card-body">
              {/* Property Name */}
              <h2 className="card-title text-lg font-semibold">
                {property.propertyName}
              </h2>

              {/* Category */}
              <p className="text-sm">
                <span className="font-medium">Category:</span>{" "}
                {property.category}
              </p>

              {/* Location */}
              <p className="text-sm">
                <span className="font-medium">Location:</span>{" "}
                {property.location}
              </p>

              {/* Price */}
              <p className="text-lg font-bold text-primary">
                ${property.price}
              </p>

              {/* Vendor */}
              <p className="text-sm text-gray-500">
                Posted by: {property.vendorName}
              </p>

              {/* Button */}
              <div className="card-actions mt-4">
                <button className="btn btn-primary w-full">
                  See Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllProperties;
