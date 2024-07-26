import { useContext, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
// import {UserCredential} from "firebase/auth"
import { Link, useNavigate } from "react-router-dom";
import FilledButton from "../../componants/SharedComponants/Buttons/FilledButton/FilledButton";
import Logo from "../../componants/SharedComponants/Logo/Logo";
import { FcGoogle } from "react-icons/fc";
import { AuthContext } from "../../context/AuthContext";
import Swal from "sweetalert2";
import auth from "../../Firebase/firebase.config";
import useAxiosPublic from "../../hooks/useAxiosPublic";

type Inputs = {
  email: string;
  password: string;
  name: string;
  confirmPassword: string;
};

const Register = (): React.ReactNode => {
  const [error, setError] = useState<string>("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();

  const contextData = useContext(AuthContext);
  // Validating the context data
  if (!contextData) {
    alert("AuthContext is null or undifined");
    return;
  }

  const { SignUp, loading, googleLogin, updateAccount } = contextData;

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setError("");
    const name = data.name;
    const email = data.email;
    const password = data.password;
    const confirmPassword = data.confirmPassword;

    // Validating password and confirm password
    if (password !== confirmPassword) {
      return setError("Password and confirm password did not match");
    }

    try {
      const signupRes = await SignUp(email, password);
      await updateAccount(name);
      const saveUserRes = await axiosPublic.post("/users", auth.currentUser);
      Swal.fire({
        title: "Signup in successfully!",
        icon: "success",
        showConfirmButton: false,
        timer: 1200,
      });

      navigate("/");
    } catch (error: unknown) {
      console.log(error);
      if (error instanceof Error) {
        Swal.fire({
          icon: "error",
          title: error?.message,
        });
      }
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const googleREs = await googleLogin();
      const saveUserRes = await axiosPublic.post("/users", auth.currentUser);
      Swal.fire({
        title: "Sign in successfully!",
        icon: "success",
        showConfirmButton: false,
        timer: 1200,
      });
      navigate("/");
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        Swal.fire({
          icon: "error",
          title: error?.message,
        });
      }
    }
  };

  return (
    <div className=" hero-background min-w-[100vw] md:min-w-[98.5vw] min-h-screen flex justify-center items-center pt-16 pb-6">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-net-black/70 px-6 py-12 rounded-lg flex flex-col border-2 border-net-red space-y-4 md:w-[423px]"
      >
        <div className="h-8 flex justify-center">
          <Logo />
        </div>
        <h5 className="text-xl text-center text-white font-semibold">
          Register
        </h5>
        <span
          onClick={handleGoogleLogin}
          className="cursor-pointer px-2 py-1 border border-gray-500 rounded-md flex items-center gap-3 justify-center text-white"
        >
          <FcGoogle />
          Register with Google.
        </span>
        {/* ---------Name------- */}
        <div>
          <span className="label-text p-2">NAME</span>
          <br />
          <input
            placeholder="Mr. Jhon sina"
            type="text"
            {...register("name", { required: true })}
            className="bg-transparent p-2 border rounded-lg text-gray-200 outline-none focus:border-2 border-net-red w-full"
          />
          {errors.name && (
            <span className="font-medium text-red-600">
              Please type your full name
            </span>
          )}
        </div>
        {/* --------Email-------- */}
        <div>
          <span className="label-text p-2">EMAIL</span>
          <br />
          <input
            placeholder="abc@mail.com"
            type="email"
            {...register("email", { required: true })}
            className="bg-transparent p-2 border rounded-lg text-gray-200 outline-none focus:border-2 border-net-red w-full"
          />
          {errors.email && (
            <span className="font-medium text-red-600">
              Please provide an email
            </span>
          )}
        </div>
        {/* ----------Password--------- */}
        <div>
          <span className="label-text p-2">PASSWORD </span>
          <br />
          <input
            placeholder="*******"
            type="password"
            {...register("password", {
              required: true,
              minLength: 6,
              pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/,
            })}
            className="bg-transparent p-2 border rounded-lg text-gray-200 outline-none focus:border-2 border-net-red w-full"
          />
          {errors.password?.type === "required" && (
            <span className="font-medium text-red-600">
              Please provide password
            </span>
          )}
          {errors.password?.type === "minLength" && (
            <span className="font-medium text-red-600">
              Password should at least 6 charecter.
            </span>
          )}
          {errors.password?.type === "pattern" && (
            <span className="font-medium text-red-600">
              Password should contain one Uppercase, one Lowercase, one Number
              and one Special charecter.
            </span>
          )}
        </div>
        {/* ----------Confirm Password--------- */}
        <div>
          <span className="label-text p-2">CONFIRM PASSWORD </span>
          <br />
          <input
            placeholder="*******"
            type="password"
            {...register("confirmPassword", {
              required: true,
            })}
            className="bg-transparent p-2 border rounded-lg text-gray-200 outline-none focus:border-2 border-net-red w-full"
          />
          {errors.confirmPassword?.type === "required" && (
            <span className="font-medium text-red-600">
              Please write the password again
            </span>
          )}
          {error.length > 1 && (
            <span className="font-medium text-red-600">{error}</span>
          )}
        </div>

        <p>
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600">
            Login
          </Link>
        </p>
        {loading ? (
          <span className="loading loading-spinner loading-md text-net-red mx-auto"></span>
        ) : (
          <FilledButton text="Register" type="submit" />
        )}
      </form>
    </div>
  );
};

export default Register;
