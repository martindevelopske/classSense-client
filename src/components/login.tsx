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
import { ChangeEvent, FormEvent, useState } from "react";

export function LoginForm() {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validation
    if (!values.email || !values.password) {
      alert("Please fill in all fields.");
      return;
    }

    // Perform form submission logic here

    // Reset form fields
    setValues({
      email: "",
      password: "",
    });
  };

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Login to your account</CardTitle>
        <CardDescription>Fill in the fields below</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Email</Label>
              <Input
                required
                type="email"
                placeholder="example@xyz.com"
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Password</Label>
              <Input
                required
                type="password"
                placeholder="Password"
                onChange={handleChange}
              />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button type="submit" disabled={!values.email || !values.password}>
          Login
        </Button>
      </CardFooter>
    </Card>
  );
}
