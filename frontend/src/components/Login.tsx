import { useState } from "react";
import { useUser } from "@/stores/userStore";

function Login({ setIsLogin }: { setIsLogin: (value: boolean) => void }) {
  const { login } = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await login(formData);
    setIsLoading(false);
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form
        className="w-[500px] p-8 rounded-lg border border-base-200 shadow-md"
        onSubmit={handleLogin}
      >
        <h1 className="text-3xl font-bold text-center mb-6">Welcome Back</h1>

        <div className="mb-6">
          <label htmlFor="email" className="block text-base font-medium mb-2">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="Enter your email"
            className="input input-bordered w-full  rounded-md"
            id="email"
            required
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-base font-medium mb-2"
          >
            Password <span className="text-red-500">*</span>
          </label>
          <input
            type="password"
            placeholder="Enter your password"
            className="input input-bordered w-full rounded-md"
            id="password"
            required
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
        </div>

        <div>
          <button className="w-full btn bg-pink-500 text-white" type="submit">
            {isLoading ? (
              <span className="loading loading-dots loading-lg"></span>
            ) : (
              "Login"
            )}
          </button>
        </div>
        <p className="text-gray-600 mt-4 text-center">
          Don't have an account?{" "}
          <span
            className="text-blue-500 underline cursor-pointer"
            onClick={() => setIsLogin(false)}
          >
            Sign up
          </span>
        </p>
      </form>
    </div>
  );
}

export default Login;
