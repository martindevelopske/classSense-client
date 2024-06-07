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
import { signup } from "@/endpoints";
import axios from "axios";
import { ChangeEvent, FormEvent, useState } from "react";
import { LoadingButton } from "./LoadingButton";
import { useNavigate } from "react-router-dom";
import { useAppStore } from "@/store";

export function SignupForm() {
  const [values, setValues] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState<string | null>("");
  const [success, setSuccess] = useState<string | null>("");
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();
  const setUser = useAppStore((state) => state.setUser);
  const user = useAppStore((state) => state.user);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validation
    if (!values.email || !values.password || !values.confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }

    if (values.password !== values.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // Perform form submission logic here, e.g., calling an API or dispatching an action
    try {
      setLoading(true);
      const { confirmPassword, ...data } = values;

      await axios.post(signup, { ...data }).then((res) => {
        setError(null);
        const userData: User = res.data.message;
        console.log(res);
        setSuccess("User Created successfully. Redirecting...");

        //update state on zustand
        setUser(userData);

        userData.userType === "student"
          ? navigate("/student", { replace: true })
          : userData.userType === "instructor"
          ? navigate("/instructor", { replace: true })
          : navigate("/");
      });
    } catch (error: any) {
      console.log(error.response);
      setSuccess(null);
      const errMsg = error.response.data.message;
      setError(errMsg);
    } finally {
      setLoading(false);
      // Reset form fields
      // setValues({
      //   email: "",
      //   password: "",
      //   confirmPassword: "",
      // });
    }
  };

  return (
    <Card className="w-full">
      <form onSubmit={handleSubmit}>
        <CardHeader>
          <CardTitle>Create an account</CardTitle>
          <CardDescription>Fill in the fields below</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            {error && (
              <div className="flex flex-col space-y-1.5 border border-red-600 p-2 text-red-600">
                {error}
              </div>
            )}
            {success && (
              <div className="flex flex-col space-y-1.5 border border-green-600 p-2 text-green-600">
                {success}
              </div>
            )}
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Email</Label>
              <Input
                required
                type="email"
                name="email"
                placeholder="example@xyz.com"
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Password</Label>
              <Input
                required
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name"> Confirm Password</Label>
              <Input
                required
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                onChange={handleChange}
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          {loading ? (
            <LoadingButton />
          ) : (
            <Button type="submit" disabled={loading}>
              Create Account
            </Button>
          )}
        </CardFooter>
      </form>
    </Card>
  );
}
