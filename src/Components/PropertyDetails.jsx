import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";
import LoadingSpinner from "./LoadingSpinner";
import { useParams } from "react-router";
import { MapPin, Tag, Calendar, User, Star } from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import { useState } from "react";
import toast from "react-hot-toast";
import useAuth from "../hooks/useAuth";
import Swal from "sweetalert2";

// Custom Rating Component
const StarRating = ({ value, onChange }) => {
  const [hoverValue, setHoverValue] = useState(0);

  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => {
        const isFilled = star <= (hoverValue || value);
        return (
          <button
            key={star}
            type="button"
            onClick={() => onChange(star)}
            onMouseEnter={() => setHoverValue(star)}
            onMouseLeave={() => setHoverValue(0)}
            className="transition-transform hover:scale-110 focus:outline-none"
          >
            <Star
              className={`w-8 h-8 transition-colors ${
                isFilled
                  ? "text-yellow-400 fill-yellow-400"
                  : "text-gray-300 fill-none"
              } stroke-current`}
            />
          </button>
        );
      })}
    </div>
  );
};

// --------------------------------------------

const PropertyDetails = () => {
  const axiosSecure = useAxiosSecure();
  const { id } = useParams();
  const { user } = useAuth();

  const { data: propertiesDetails = {}, isLoading } = useQuery({
    queryKey: ["properties-details", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/properties-details/${id}`);

      return res.data;
    },
  });

  const { data: allReviews = [], refetch: refetchReviews } = useQuery({
    queryKey: ["all-reviews", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/reviews/${id}`);

      return res.data;
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      rating: 0,
      review: "",
    },
  });

  const onSubmitReview = async (data) => {
    //  POST
    try {
      const ticketReviewData = {
        propertyId: propertiesDetails._id,
        reviewerName: user?.displayName,
        reviewerEmail: user?.email,
        starRating: data.rating,
        reviewText: data.review,
        propertyName: propertiesDetails.propertyName,
        thumbnailOfProperty: propertiesDetails.image,
      };

      const response = await axiosSecure.post("/reviews", ticketReviewData);
      if (response?.data?.acknowledged) {
        Swal.fire({
          title: "Review added Successfully",
          icon: "success",
          draggable: true,
        });
        reset();
        refetchReviews();
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

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };
  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(price);
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-base-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="mb-6">
          <h1 className="text-4xl font-bold text-base-content mb-2">
            {propertiesDetails.propertyName}
          </h1>
          <div className="flex items-center gap-2 text-base-content/70">
            <MapPin className="w-5 h-5" />
            <span className="text-lg">{propertiesDetails.location}</span>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Image and Description */}
          <div className="lg:col-span-2 space-y-6">
            {/* Property Image */}
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <img
                src={propertiesDetails.image}
                alt={propertiesDetails.propertyName}
                className="w-full h-96 object-cover"
              />
            </div>

            {/* Description Section */}
            <div className="bg-base-200 rounded-2xl p-6 shadow-lg">
              <h2 className="text-2xl font-bold text-base-content mb-4">
                Property Description
              </h2>
              <p className="text-base-content/80 leading-relaxed text-lg">
                {propertiesDetails.description}
              </p>
            </div>
          </div>

          {/* Right Column - Property Info Card */}
          <div className="lg:col-span-1">
            <div className="bg-base-200 rounded-2xl p-6 shadow-xl sticky top-8">
              {/* Price */}
              <div className="mb-6">
                <p className="text-sm text-base-content/60 mb-1">Price</p>
                <p className="text-4xl font-bold bg-gradient-to-r from-[#E6B400] via-[#FFD24A] to-[#a47d08] bg-clip-text text-transparent">
                  {formatPrice(propertiesDetails.price)}
                </p>
              </div>

              <div className="divider"></div>

              {/* Property Details */}
              <div className="space-y-4">
                {/* Category */}
                <div className="flex items-start gap-3">
                  <div className="bg-primary/10 p-2 rounded-lg">
                    <Tag className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-base-content/60">Category</p>
                    <p className="font-semibold text-base-content">
                      {propertiesDetails.category}
                    </p>
                  </div>
                </div>

                {/* Posted By */}
                <div className="flex items-start gap-3">
                  <div className="bg-primary/10 p-2 rounded-lg">
                    <User className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-base-content/60">Posted By</p>
                    <p className="font-semibold text-base-content">
                      {propertiesDetails.vendorName}
                    </p>
                  </div>
                </div>

                {/* Posted Date */}
                <div className="flex items-start gap-3">
                  <div className="bg-primary/10 p-2 rounded-lg">
                    <Calendar className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-base-content/60">Posted Date</p>
                    <p className="font-semibold text-base-content">
                      {formatDate(propertiesDetails.createdAt)}
                    </p>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-start gap-3">
                  <div className="bg-primary/10 p-2 rounded-lg">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-base-content/60">Location</p>
                    <p className="font-semibold text-base-content">
                      {propertiesDetails.location}
                    </p>
                  </div>
                </div>
              </div>

              <div className="divider"></div>
            </div>
          </div>
        </div>

        {/* Ratings & Reviews Section */}
        <div className="mt-12 bg-base-200 rounded-2xl p-6 shadow-lg">
          <h2 className="text-3xl font-bold text-base-content mb-6">
            Ratings & Reviews
          </h2>

          <form onSubmit={handleSubmit(onSubmitReview)} className="space-y-6">
            {/* Rating */}
            <div>
              <label className="block text-sm font-semibold text-base-content mb-2">
                Your Rating
              </label>
              <Controller
                name="rating"
                control={control}
                rules={{ required: "Rating is required", min: 1 }}
                render={({ field }) => (
                  <StarRating value={field.value} onChange={field.onChange} />
                )}
              />
              {errors.rating && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.rating.message}
                </p>
              )}
            </div>

            {/* Review Text */}
            <div>
              <label className="block text-sm font-semibold text-base-content mb-2">
                Your Review
              </label>
              <textarea
                className="textarea textarea-bordered w-full min-h-[120px]"
                placeholder="Write a short review about this property..."
                {...register("review", {
                  required: "Review is required",
                  maxLength: {
                    value: 300,
                    message: "Review must be 300 characters or less",
                  },
                })}
              ></textarea>
              {errors.review && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.review.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button type="submit" className="btn btn-primary w-full sm:w-auto">
              Submit Review
            </button>
          </form>
        </div>

        {/* All Reviews List */}
        <div className="mt-10 space-y-6">
          <h3 className="text-2xl font-bold text-base-content">
            All Reviews ({allReviews.length})
          </h3>

          {allReviews.length === 0 ? (
            <p className="text-base-content/60">No reviews yet.</p>
          ) : (
            allReviews.map((review) => (
              <div
                key={review._id}
                className="bg-base-100 rounded-xl p-5 shadow-md border border-base-300"
              >
                {/* Reviewer Info */}
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="font-semibold text-lg text-base-content">
                      {review.reviewerName}
                    </h4>
                    <p className="text-sm text-base-content/60">
                      {new Date(review.createdAt).toLocaleDateString()}
                    </p>
                  </div>

                  {/* Star Rating */}
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < review.starRating
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Review Text */}
                <p className="text-base-content/80 leading-relaxed">
                  {review.reviewText}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;
