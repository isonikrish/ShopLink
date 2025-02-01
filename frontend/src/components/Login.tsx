import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { LoaderCircle } from "lucide-react";
import { useUser } from "@/stores/userStore";

function Login({ setIsLogin }: { setIsLogin: (value: boolean) => void }) {
  const {login} = useUser();
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
      <Card className="w-full max-w-md p-4">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-semibold">
            Login
          </CardTitle>
          <p className="text-center text-sm text-gray-600 mt-2">
            Welcome back! Please enter your credentials to access your account.
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-6">
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
                Login
              </Button>
            )}
          </form>
          <div className="mt-6 text-center">
            <p className="text-sm">
              Don't have an account?{" "}
              <span
                className="text-blue-500 underline cursor-pointer select-none"
                onClick={() => setIsLogin(false)}
              >
                Signup
              </span>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default Login;
