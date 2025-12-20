import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";
import useAuth from "../hooks/useAuth";
import LoadingSpinner from "./LoadingSpinner";
import { Link } from "react-router";

const Myproperties = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: myProperty = [], isLoading } = useQuery({
    queryKey: ["my-property", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/my-property?email=${user.email}`);
      return res.data;
    },
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6 text-primary">My Properties</h2>

      {myProperty.length === 0 ? (
        <p className="text-center text-gray-500">No properties found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {myProperty.map((property) => (
            <div key={property._id} className="card bg-base-100 shadow-xl">
              {/* Property Image */}
              <figure className="h-48">
                <img
                  src={property.image}
                  alt={property.propertyName}
                  className="w-full h-full object-cover"
                />
              </figure>

              {/* Card Body */}
              <div className="card-body">
                <h3 className="card-title">{property.propertyName}</h3>

                <p>
                  <span className="font-semibold">Category:</span>{" "}
                  {property.category}
                </p>

                <p>
                  <span className="font-semibold">Price:</span> $
                  {property.price}
                </p>

                <p>
                  <span className="font-semibold">Location:</span>{" "}
                  {property.location}
                </p>

                <p className="text-sm text-gray-500">
                  <span className="font-semibold">Posted:</span>{" "}
                  {new Date(property.createdAt).toLocaleDateString()}
                </p>

                {/* Action Buttons */}
                <div className="card-actions justify-between mt-4">
                  <button className="btn btn-sm btn-primary">Update</button>

                  <button className="btn btn-sm btn-error">Delete</button>
                  <Link to={`/property-details/${property._id}`}>
                    <button className="btn btn-sm btn-outline">
                      View Details
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Myproperties;
