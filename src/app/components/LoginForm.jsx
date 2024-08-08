// components/LoginForm.js
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import pb from "@/utils/pocketbase";

const LoginForm = ({ closer, changer }) => {
  const { register, handleSubmit } = useForm();
  const [InvalidCredentials, setInvalidCredentials] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const submitter = async (data) => {
    console.log(data);
    setIsLoading(!isLoading);
    pb
      .collection("users")
      .authWithPassword(data.email, data.password)
      .then((record) => {
        console.log(record);
        localStorage.setItem("token", record.token);
        setIsLoading(!isLoading);
        router.push("/problems");
      })
      .catch((error) => {
        console.log(JSON.stringify(error));
        setIsLoading(!isLoading);
        setInvalidCredentials("Invalid Credentials");
      }); 
  };

  return (
    <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
      <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
        <div className="flex justify-between items-center">
          <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Login to your account
          </h1>
          <div
            onClick={() => {
              closer();
            }}
            className="rounded-xl cursor-pointer text-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </div>
        </div>
        <form
          onSubmit={handleSubmit(submitter)}
          class="space-y-4 md:space-y-6"
          action="#"
        >
          <div>
            <label
              for="email"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your email
            </label>
            <input
              {...register("email")}
              type="email"
              name="email"
              id="email"
              class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="name@company.com"
              required=""
            />
          </div>
          <div>
            <label
              for="password"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Password
            </label>
            <input
              {...register("password")}
              type="password"
              name="password"
              id="password"
              placeholder="••••••••"
              class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required=""
            />
          </div>
          {InvalidCredentials && (
            <div class="text-red-500 text-lg text-center">
              {InvalidCredentials}
            </div>
          )}
          {/* <div class="flex items-center justify-between">
            
            <a
              href="#"
              class="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
            >
              Forgot password?
            </a>
          </div> */}
          <button
            type="submit"
            class="w-full text-white border-2 border-[#a0a0a0] py-2 rounded-xl"
          >
            Sign in
          </button>
          <p class="text-sm font-light text-gray-500 dark:text-gray-400">
            Don’t have an account yet?{" "}
            <button
              onClick={changer}
              class="font-medium text-primary-600 hover:underline dark:text-primary-500"
            >
              Sign up
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
