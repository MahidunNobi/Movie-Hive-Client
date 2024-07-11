import { useForm, SubmitHandler } from "react-hook-form";
import Logo from "../../componants/SharedComponants/Logo/Logo";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import FilledButton from "../../componants/SharedComponants/Buttons/FilledButton/FilledButton";
import { ReactNode, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import Swal from "sweetalert2";

type Inputs = {
  email: string;
  password: string;
};

const Login = (): ReactNode => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const navigate = useNavigate();

  const contextData = useContext(AuthContext);
  // Validating the context data
  if (!contextData) {
    return alert("AuthContext is null or undifined");
  }

  const { user, loading, googleLogin, login } = contextData;

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const email = data.email;
    const password = data.password;
    try {
      const res = await login(email, password);
      Swal.fire({
        title: "Login in successful",
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

  const handleGoogleLogin = async () => {
    try {
      const googleREs = await googleLogin();
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
    <div className=" hero-background min-w-[100vw] md:min-w-[98.5vw] min-h-screen flex justify-center items-center  pt-16 pb-6">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-net-black/70 px-6 py-12 rounded-lg flex flex-col border-2 border-net-red space-y-4 md:w-[423px]"
      >
        <div className="h-8 flex justify-center">
          <Logo />
        </div>
        <h5 className="text-xl text-center text-white font-semibold">Login</h5>
        <span
          onClick={handleGoogleLogin}
          className="cursor-pointer px-2 py-1 border border-gray-500 rounded-md flex items-center gap-3 justify-center text-white"
        >
          <FcGoogle />
          Log in with Google
        </span>

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
        <div>
          <span className="label-text p-2">PASSWORD </span>
          <br />
          <input
            placeholder="*******"
            type="password"
            {...register("password", { required: true })}
            className="bg-transparent p-2 border rounded-lg text-gray-200 outline-none focus:border-2 border-net-red w-full"
          />
          {errors.password?.type === "required" && (
            <span className="font-medium text-red-600">
              Please provide password
            </span>
          )}
        </div>

        <p>
          Don&apos;t have an account?{" "}
          <Link to="/register" className="text-blue-600">
            Register
          </Link>
        </p>
        {loading ? (
          <span className="loading loading-spinner loading-md text-net-red mx-auto"></span>
        ) : (
          <FilledButton text="Login" type="submit" />
        )}
      </form>
    </div>
  );
};

export default Login;
