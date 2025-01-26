import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { SignupInput } from "@/lib/types";
import { LoaderCircle } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import { BACKEND_URL } from "@/lib/backend_url";


function Signup({ setIsLogin }: { setIsLogin: (value: boolean) => void }) {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<SignupInput>({
    name: "",
    email: "",
    password: "",
  });
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await axios.post(
        `${BACKEND_URL}/api/user/signup`,
        formData,
        { withCredentials: true }
      );
      if(res.status === 200){
        toast.success("Signup Successfull")
      }
    } catch (error) {
      setIsLoading(false);
    } finally{
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen ">
      <Card className="w-full max-w-md p-4 ">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-semibold">
            Create an Account
          </CardTitle>
          <p className="text-center text-sm text-gray-600 mt-2">
            Join us today to start your journey. It’s quick and easy to set up
            your account!
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignup} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium">
                Name
              </label>
              <Input
                id="name"
                type="text"
                placeholder="Enter your name"
                className="mt-1"
                required
                value={formData?.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium">
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                className="mt-1"
                required
                value={formData?.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium">
                Password
              </label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                className="mt-1"
                required
                value={formData?.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
            </div>
            {isLoading ? (
              <Button disabled className="w-full py-2">
                <LoaderCircle className="animate-spin" />
                Please wait
              </Button>
            ) : (
              <Button type="submit" className="w-full py-2">
                Sign Up
              </Button>
            )}
          </form>
          <div className="mt-6 text-center">
            <p className="text-sm">
              Already have an account?{" "}
              <span
                className="text-blue-500 underline cursor-pointer select-none"
                onClick={() => setIsLogin(true)}
              >
                Login
              </span>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default Signup;
