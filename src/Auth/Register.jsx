import { Link, useNavigate } from "react-router";
import { use, useState } from "react";

import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import LoadingSpinner from "../Components/LoadingSpinner";
import { AuthContext } from "../Contexts/AuthContext";
import toast from "react-hot-toast";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

const Register = () => {
  const { createUser, setUser, signInWithGoogle, updateUserProfile } =
    use(AuthContext);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // react hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleRegister = async (data) => {
    const { name, image, email, password } = data;
    setLoading(true);

    try {
      //1. User Registration
      const result = await createUser(email, password);
      await updateUserProfile(name, image);
      //  updated user
      setUser({
        ...result.user,
        displayName: name,
        photoURL: image,
      });

      navigate("/");
      toast.success("Signup Successfully");
    } catch (err) {
      toast.error(err?.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSignInWithGoogle = () => {
    signInWithGoogle()
      .then((result) => {
        const user = result.user;
        setUser(user);
        toast.success(`Welcome ${user.displayName || "User"}!`);
        navigate("/");
      })
      .catch((error) => {
        const errorMessage = error.message;
        toast.error(`Google sign-in failed: ${errorMessage}`);
      });
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <>
    <Navbar/>
      <div className="hero py-2 dotted-bg">
        <div className="card w-full max-w-md mx-auto bg-base-200  pt-4">
          <h2 className="text-2xl font-bold text-center text-primary">Register Now</h2>
          <div className="card-body">
            <form onSubmit={handleSubmit(handleRegister)}>
              <fieldset className="space-y-2">
                <div>
                  {/* Name  */}
                  <label className="label mb-1">Name</label>
                  <input
                    {...register("name", { required: true, maxLength: 40 })}
                    type="text"
                    className="input w-full"
                    placeholder="Name"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.name.type === "required" && "Name is required."}
                      {errors.name.type === "maxLength" &&
                        "Name cannot exceed 40 characters."}
                    </p>
                  )}
                </div>
                <div>
                  {/* image  */}
                  <label htmlFor="image" className="label mb-2">
                    Image URL
                  </label>
                  <input
                    {...register("image", {
                      required: "Image URL is required",
                    })}
                    type="text"
                    className="input w-full"
                    placeholder="Image"
                  />

                  {errors.image && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.image.message}
                    </p>
                  )}

                  {/* email  */}
                  <label className="label mb-1 mt-2">Email</label>
                  <input
                    {...register("email", { required: "Email is required." })}
                    type="email"
                    className="input w-full"
                    placeholder="Email"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>
                {/* password */}
                <div className="relative">
                  <label className="label mb-1">Password</label>
                  <input
                    {...register("password", {
                      required: "Password is required.",
                      pattern: {
                        value: /^(?=.*[A-Z])(?=.*[a-z]).{6,}$/,
                        message:
                          "Password must include uppercase, lowercase, and be at least 6 characters long.",
                      },
                    })}
                    type={showPassword ? "text" : "password"}
                    className="input w-full focus:outline-none focus:ring-0"
                    placeholder="Password"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-[38px]"
                    onClick={() => {
                      setShowPassword(!showPassword);
                    }}
                  >
                    {showPassword ? (
                      <EyeOffIcon size={20}></EyeOffIcon>
                    ) : (
                      <EyeIcon size={20}></EyeIcon>
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.password.message}
                  </p>
                )}
                <button
                  type="submit"
                  className="btn btn-primary text-white w-full"
                >
                  Register
                </button>
              </fieldset>
            </form>
            {/* or here  */}
            <div className="flex items-center my-4">
              <hr className="grow border-t border-gray-300" />
              <span className="px-2 text-gray-500 font-bold">OR</span>
              <hr className="grow border-t border-gray-300" />
            </div>

            <button
              onClick={handleSignInWithGoogle}
              className="btn bg-white text-black border-[#e5e5e5] w-full"
            >
              <svg
                aria-label="Google logo"
                width="25"
                height="25"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <g>
                  <path d="m0 0H512V512H0" fill="#fff"></path>
                  <path
                    fill="#34a853"
                    d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                  ></path>
                  <path
                    fill="#4285f4"
                    d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                  ></path>
                  <path
                    fill="#fbbc02"
                    d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                  ></path>
                  <path
                    fill="#ea4335"
                    d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                  ></path>
                </g>
              </svg>
              <span className="ml-2">Continue with Google</span>
            </button>

            <p className="text-center font-bold mt-4">
              Already Have An Account?{" "}
              <Link to={`/login`} className="text-primary underline">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default Register;
