import React from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../hooks/useAuth";
import LoadingSpinner from "./LoadingSpinner";

const MyRating = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: reviews = [], isLoading } = useQuery({
    queryKey: ["reviews", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/reviews?email=${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-4xl font-bold mb-8 text-center text-primary">
        My Ratings & Reviews
      </h2>

      {reviews.length === 0 ? (
        <p className="text-center text-gray-500">You haven’t reviewed any property yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {reviews.map((review) => (
            <div
              key={review._id}
              className="card bg-base-100 shadow-2xl border border-base-200 hover:shadow-primary/20 transition-all"
            >
              {/* Property Image */}
              <figure>
                <img
                  src={review.thumbnailOfProperty}
                  alt={review.propertyName}
                  className="h-52 w-full object-cover"
                />
              </figure>

              <div className="card-body space-y-4">
                {/* Property Name */}
                <h3 className="text-xl font-semibold text-secondary">
                  {review.propertyName}
                </h3>

                {/* STAR RATING – STRONGLY HIGHLIGHTED */}
                <div className="flex items-center justify-center bg-gradient-to-r from-[#E6B400]/20 via-[#FFD24A]/30 to-[#E6B400]/20 rounded-lg py-3">
                  {[...Array(5)].map((_, index) => (
                    <span
                      key={index}
                      className={`text-3xl ${
                        index < review.starRating
                          ? "text-primary"
                          : "text-gray-300"
                      }`}
                    >
                      ★
                    </span>
                  ))}
                  <span className="ml-3 text-lg font-semibold text-primary">
                    {review.starRating}/5
                  </span>
                </div>

                {/* REVIEW MESSAGE – MAIN FOCUS */}
                <div className="bg-base-200 rounded-xl p-4 border-l-4 border-primary">
                  <p className="text-base font-medium text-neutral leading-relaxed">
                    “{review.reviewText}”
                  </p>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between text-sm text-gray-500 pt-2">
                  <span>
                    Reviewed by <strong>{review.reviewerName}</strong>
                  </span>
                  <span>
                    {new Date(review.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyRating;
