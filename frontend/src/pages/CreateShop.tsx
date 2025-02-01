import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useShop } from "@/stores/shopStore";
import { LoaderCircle } from "lucide-react";
import { useState } from "react";

function CreateShop() {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    currency: "",
  });

  const { createShop } = useShop();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleCurrencyChange = (value: string) => {
    setFormData((prev) => ({ ...prev, currency: value }));
  };

  const handleCreateShop = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await createShop(formData);
    setIsLoading(false);
  };

  return (
    <div className="flex justify-center items-center min-h-screen select-none">

    <Card className="w-[500px]">
      <CardHeader className="flex items-center">
        <CardTitle>Create Your Shop</CardTitle>
        <CardDescription>Create your new shop in one-click.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleCreateShop}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Shop Name</Label>
              <Input
                id="name"
                name="name"
                placeholder="Name of your shop"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div className="mt-4 ">
              <Label htmlFor="currency">Shop Currency</Label>
              <Select onValueChange={handleCurrencyChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a currency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="usd">USD - US Dollar</SelectItem>
                  <SelectItem value="inr">INR - Indian Rupee</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <CardFooter className="flex justify-between mt-4">
            {isLoading ? (
              <Button disabled className="w-full py-2">
                <LoaderCircle className="animate-spin" />
                Please wait
              </Button>
            ) : (
              <Button type="submit" className="w-full py-2">
                Create
              </Button>
            )}
          </CardFooter>
        </form>
      </CardContent>
    </Card>
    </div>
  );
}

export default CreateShop;
