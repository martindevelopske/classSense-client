import axios from "axios";
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
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { login } from "@/endpoints";
import { LoadingButton } from "./LoadingButton";
import { redirect, useNavigate } from "react-router-dom";

export function LoginForm() {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [redirect, setRedirect] = useState("");

  const navigate = useNavigate();

  //check prev page
  useEffect(() => {
    const redirectState = location?.state;
    redirectState && setRedirect(redirectState.from?.pathname);
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("hit!");

    // Validation
    if (!values.email || !values.password) {
      setError("Please fill in all fields.");
      return;
    }

    // Perform form submission logic here
    try {
      setLoading(true);
      console.log(values);

      const response = await axios
        .post(
          login,
          { ...values },
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        )
        .then((res) => {
          const userType = res.data.userType;
          console.log(userType);
          setSuccess(true);
          if (userType == "student") {
            !redirect && setRedirect("student");
            navigate(redirect);
          } else if (userType == "instructor") {
            !redirect && setRedirect("instructor");
            navigate(redirect);
          }
        });
    } catch (error: any) {
      console.log(error.response);
      const errMsg = error.response.data.detail;
      setError(errMsg);
    } finally {
      setLoading(false);
      // Reset form fields
      // setValues({
      //   email: "",
      //   password: "",
      // });
    }
  };

  return (
    <Card className="w-[350px]">
      <form onSubmit={handleSubmit}>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
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
                Login successfull. Redirecting...
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
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          {loading ? (
            <LoadingButton />
          ) : (
            <Button type="submit" disabled={loading}>
              Login
            </Button>
          )}
        </CardFooter>
      </form>
    </Card>
  );
}
