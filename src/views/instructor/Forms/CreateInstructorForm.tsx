import axios, { AxiosError } from "axios";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Helmet } from "react-helmet";
import { Label } from "@radix-ui/react-label";
import { ChangeEvent, FormEvent, useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { LoadingButton } from "@/components/LoadingButton";
import { createInstructor, createSession, getAllLocations } from "@/endpoints";
import useFetchData from "@/lib/fetchData";
import usePostData from "@/lib/postData";
import { toast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";

interface ErrorResponse {
  message: string;
}

interface LocationResponse {
  id: string;
  locationName: string;
}

export default function CreateSessionForm() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const { postData } = usePostData();
  const [showPassword, setShowPassword] = useState(false);
  const [values, setValues] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {}, []);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (values.password !== values.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      await postData(createInstructor, { ...values }).then((res) => {
        setSuccess("Instructor created successfully.");
      });
      toast({
        title: "Instructor created successfully. You can now close this modal.",
      });
      // close the modal - figure that out
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
    }
  };

  return (
    <>
      <Card className="w-full h-full">
        <Toaster />
        <Helmet>
          <meta charSet="utf-8" />
          <title>Create Instructor</title>
        </Helmet>
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>Create An Instructor</CardTitle>
            <CardDescription>Fill in the fields below</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label
                  htmlFor="firstname"
                  className="font-bold text-orange-600 text-lg"
                >
                  First Name
                </Label>
                <Input
                  required
                  type="text"
                  name="firstname"
                  placeholder="First Name"
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label
                  htmlFor="lastname"
                  className="font-bold text-orange-600 text-lg"
                >
                  Last Name
                </Label>
                <Input
                  required
                  type="text"
                  name="lastname"
                  placeholder="Last Name"
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label
                  htmlFor="email"
                  className="font-bold text-orange-600 text-lg"
                >
                  Email
                </Label>
                <Input
                  required
                  type="email"
                  name="email"
                  placeholder="Email"
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label
                  htmlFor="password"
                  className="font-bold text-orange-600 text-lg"
                >
                  Password
                </Label>
                <Input
                  required
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label
                  htmlFor="confirmPassword"
                  className="font-bold text-orange-600 text-lg"
                >
                  Confirm Password
                </Label>
                <Input
                  required
                  type={showPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  onChange={handleChange}
                />
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="showPassword"
                  checked={showPassword}
                  onChange={() => setShowPassword(!showPassword)}
                />
                <Label htmlFor="showPassword" className="text-sm">
                  Show Password
                </Label>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            {loading ? (
              <LoadingButton />
            ) : (
              <Button type="submit" disabled={loading}>
                Create Instructor
              </Button>
            )}
          </CardFooter>
        </form>
      </Card>
    </>
  );
}
