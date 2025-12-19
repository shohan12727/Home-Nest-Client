import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";
import LoadingSpinner from "./LoadingSpinner";
import { useParams } from "react-router";
import { MapPin, Tag, Calendar, User } from "lucide-react";

const PropertyDetails = () => {
  const axiosSecure = useAxiosSecure();
  const { id } = useParams();

  const { data: propertiesDetails = {}, isLoading } = useQuery({
    queryKey: ["properties-details", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/properties-details/${id}`);
      return res.data;
    },
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }

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

              {/* CTA Button */}
              {/* <button className="btn-primary w-full text-lg">
                Contact Vendor
              </button> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;