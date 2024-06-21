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
import axios, { AxiosError } from "axios";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { LoadingButton } from "./LoadingButton";
import { useNavigate } from "react-router-dom";
import { useAppStore } from "@/store";

interface ErrorResponse {
  message: string;
}
export function SignupForm() {
  const [values, setValues] = useState({
    email: "",
    password: "",
    firstname: "",
    lastname: "",
    confirmPassword: "",
  });
  const [error, setError] = useState<string | null>("");
  const [success, setSuccess] = useState<string | null>("");
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();
  const setUser = useAppStore((state) => state.setUser);
  const user = useAppStore((state) => state.user);

  //useEffect
  const checkuser = () => {
    if (user) {
      //do not get here
      user.userType === "student"
        ? navigate("/student", { replace: true })
        : user.userType === "instructor"
        ? navigate("/instructor", { replace: true })
        : navigate("/");
    }
  };
  useEffect(checkuser, []);
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

      await axios
        .post(
          signup,
          { ...data },
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          setError(null);
          const userData: User = res.data.message;
          setSuccess("User Created successfully. Redirecting...");

          //update state on zustand
          setUser(userData);

          userData.userType === "student"
            ? navigate("/student", { replace: true })
            : userData.userType === "instructor"
            ? navigate("/instructor", { replace: true })
            : navigate("/");
        });
    } catch (error: unknown) {
      setSuccess(null);
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<ErrorResponse>;
        const errMsg =
          axiosError.response?.data?.message || "An error occurred";
        setError(errMsg);
      } else {
        setError("An unexpected error occurred");
      }
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
              <Label htmlFor="firstname">Firstname</Label>
              <Input
                required
                type="firstname"
                name="firstname"
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="lastname">Lastname</Label>
              <Input
                required
                type="lastname"
                name="lastname"
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                required
                type="email"
                name="email"
                placeholder="example@xyz.com"
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input
                required
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="confirmpassword"> Confirm Password</Label>
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
