import toast from "react-hot-toast";
import useAuth from "../hooks/useAuth";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const AddProperties = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const userName = user?.displayName;
  const userEmail = user?.email;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const propertyData = {
        vendorName: userName,
        vendorEmail: userEmail,
        propertyName: data.propertyName,
        price: Number(data.price),
        image: data.image,
        description: data.description,
        category: data.category,
        location: data.location,
      };

      const response = await axiosSecure.post("/properties", propertyData);

      if (response?.data?.acknowledged) {
        Swal.fire({
          title: "Property added Successfully",
          icon: "success",
          draggable: true,
        });
        reset();
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
      }
    } catch (err) {
      toast.error(err?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-base-200  flex items-center justify-center px-4">
      <div className="w-full max-w-4xl mt-4 bg-base-100 shadow-xl rounded-xl p-8">
        <h2 className="text-2xl font-bold text-center mb-8 text-primary">
          Add New Property
        </h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
        >
          {/* User Name */}
          <div>
            <label className="label">User Name</label>
            <input
              type="text"
              value={userName || ""}
              readOnly
              className="input input-bordered w-full bg-base-200"
            />
          </div>

          {/* User Email */}
          <div>
            <label className="label">User Email</label>
            <input
              type="email"
              value={userEmail || ""}
              readOnly
              className="input input-bordered w-full bg-base-200"
            />
          </div>

          {/* Property Name */}
          <div>
            <label className="label">Property Name</label>
            <input
              type="text"
              placeholder="Enter property name"
              className="input input-bordered w-full"
              {...register("propertyName", { required: true })}
            />
            {errors.propertyName && (
              <p className="text-red-500 text-sm mt-1">
                Property name is required
              </p>
            )}
          </div>

          {/* Category */}
          <div>
            <label className="label">Category</label>
            <select
              className="select select-bordered w-full"
              {...register("category", { required: true })}
            >
              <option value="">Select category</option>
              <option value="Rent">Rent</option>
              <option value="Sale">Sale</option>
              <option value="Commercial">Commercial</option>
              <option value="Land">Land</option>
            </select>
          </div>

          {/* Price */}
          <div>
            <label className="label">Price</label>
            <input
              type="number"
              placeholder="Enter price"
              className="input input-bordered w-full"
              {...register("price", { required: true, min: 0 })}
            />
          </div>

          {/* Location */}
          <div>
            <label className="label">Location</label>
            <input
              type="text"
              placeholder="City, area, or address"
              className="input input-bordered w-full"
              {...register("location", { required: true })}
            />
          </div>

          {/* Image Link */}
          <div>
            <label className="label">Image Link</label>
            <input
              type="url"
              placeholder="https://example.com/image.jpg"
              className="input input-bordered w-full"
              {...register("image", { required: true })}
            />
          </div>

          {/* Description (Full Width) */}
          <div className="md:col-span-2">
            <label className="label">Description</label>
            <textarea
              placeholder="Write property description"
              className="textarea textarea-bordered w-full"
              rows={4}
              {...register("description", { required: true })}
            />
          </div>

          {/* Submit Button (Full Width) */}
          <div className="md:col-span-2 pt-4">
            <button type="submit" className="btn btn-primary w-full">
              Add Property
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProperties;
