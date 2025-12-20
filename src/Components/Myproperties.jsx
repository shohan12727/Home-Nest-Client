import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";
import useAuth from "../hooks/useAuth";
import LoadingSpinner from "./LoadingSpinner";
import { Link, useNavigate } from "react-router";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import { useState } from "react";

const Myproperties = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const userName = user?.displayName;
  const userEmail = user?.email;
  const [selectedProperty, setSelectedProperty] = useState(null);
  const navigate = useNavigate();

  const {
    data: myProperty = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["my-property", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/my-property?email=${user.email}`);
      return res.data;
    },
  });

  const { register, handleSubmit, reset } = useForm();

  const handleUpdate = (id) => {
    const property = myProperty.find((item) => item._id === id);
    setSelectedProperty(property);

    reset({
      propertyName: property.propertyName,
      description: property.description,
      category: property.category,
      price: property.price,
      location: property.location,
      image: property.image,
      vendorName: userName,
      vendorEmail: userEmail,
    });

    document.getElementById("update_modal").showModal();
  };

  const onSubmitUpdate = async (data) => {
    try {
      const updateData = {
        propertyName: data.propertyName,
        description: data.description,
        category: data.category,
        price: data.price,
        location: data.location,
        image: data.image,
      };

      const res = await axiosSecure.patch(
        `/properties/${selectedProperty._id}`,
        updateData
      );

      if (res.data.propertyModified > 0) {
        Swal.fire("Updated!", "Property updated successfully.", "success");
        document.getElementById("update_modal").close();
        refetch();
        navigate(`/property-details/${selectedProperty._id}`);
      }
    } catch {
      Swal.fire("Error!", "Failed to update property.", "error");
      document.getElementById("update_modal").close();
    }
  };

  const handleDelete = async (id) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        const res = await axiosSecure.delete(`/properties/${id}`);
        if (res.data.deletedCount > 0) {
          Swal.fire({
            title: "Deleted!",
            text: "Your ticket has been deleted.",
            icon: "success",
          });
          refetch();
        }
      }
    } catch {
      Swal.fire({
        title: "Error!",
        text: "Failed to delete ticket. Please try again.",
        icon: "error",
      });
    }
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6 text-primary text-center">
        My Properties
      </h2>

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
                  <button
                    onClick={() => handleUpdate(property._id)}
                    className="btn btn-sm btn-primary"
                  >
                    Update
                  </button>

                  <button
                    onClick={() => handleDelete(property._id)}
                    className="btn btn-sm btn-error"
                  >
                    Delete
                  </button>

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

      <dialog id="update_modal" className="modal">
        <div className="modal-box max-w-2xl">
          <h3 className="font-bold text-xl mb-4 text-primary">
            Update Property
          </h3>

          <form onSubmit={handleSubmit(onSubmitUpdate)} className="space-y-4">
            {/* Property Name */}
            <input
              {...register("propertyName", { required: true })}
              className="input input-bordered w-full"
              placeholder="Property Name"
            />

            {/* Description */}
            <textarea
              {...register("description", { required: true })}
              className="textarea textarea-bordered w-full"
              placeholder="Description"
            />

            {/* Category */}
            <select
              {...register("category", { required: true })}
              className="select select-bordered w-full"
            >
              <option value="">Select Category</option>
              <option value="Land">Land</option>
              <option value="Sale">Sale</option>
              <option value="Rent">Rent</option>
            </select>

            {/* Price */}
            <input
              type="number"
              {...register("price", { required: true })}
              className="input input-bordered w-full"
              placeholder="Price"
            />

            {/* Location */}
            <input
              {...register("location", { required: true })}
              className="input input-bordered w-full"
              placeholder="Location"
            />

            {/* Image Link */}
            <input
              {...register("image", { required: true })}
              className="input input-bordered w-full"
              placeholder="Image URL"
            />

            {/* Read-only User Info */}
            <input
              {...register("vendorName")}
              readOnly
              className="input input-bordered w-full"
            />

            <input
              {...register("vendorEmail")}
              readOnly
              className="input input-bordered w-full"
            />

            {/* Actions */}
            <div className="modal-action">
              <button type="submit" className="btn btn-primary">
                Update
              </button>
              <button
                type="button"
                className="btn"
                onClick={() => document.getElementById("update_modal").close()}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default Myproperties;
