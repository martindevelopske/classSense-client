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
import { useLocation, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { EyeOpenIcon, EyeClosedIcon } from "@radix-ui/react-icons";
import { useAppStore } from "@/store";

type LoginProps = {
  redirect?: string;
};
export function LoginForm({ redirect }: LoginProps) {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [redirectURL, setRedirectURL] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const setUser = useAppStore((state) => state.setUser);
  //toggle show password
  const handleTogglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validation
    if (!values.email || !values.password) {
      setError("Please fill in all fields.");
      return;
    }

    // Perform form submission logic here
    try {
      setLoading(true);

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
          console.log(res);

          const userData: User = res.data.message;
          console.log(userData);

          setSuccess(true);

          // Convert your data to a string
          const userDataString = JSON.stringify(userData);

          //update state on zustand
          setUser(userData);
          //redirect
          //if there is a redirect url go there, else navigate normally
          redirect && navigate(redirect, { replace: true });
          userData.userType === "student"
            ? navigate("/student", { replace: true })
            : userData.userType === "instructor"
            ? navigate("/instructor", { replace: true })
            : navigate("/");
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
    <Card className=" w-full">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Login</title>
      </Helmet>
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
              <div className="flex gap-2 items-center ">
                <Input
                  required
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  onChange={handleChange}
                />
                <button type="button" onClick={handleTogglePassword}>
                  {showPassword ? <EyeOpenIcon /> : <EyeClosedIcon />}
                </button>
              </div>
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
