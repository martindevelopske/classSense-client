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
import { ChangeEvent, FormEvent, useState } from "react";
import { Input } from "@/components/ui/input";
import { LoadingButton } from "@/components/LoadingButton";
import { createSession } from "@/endpoints";

interface ErrorResponse {
  message: string;
}
export default function CreateSession() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [values, setValues] = useState({
    name: "",
    status: "",
  });
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      await axios
        .post(
          createSession,
          { ...values },
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        )
        .then((res) => {
          setSuccess("session created successfully.");
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
    }
  };
  return (
    <>
      <Card className="w-full h-full">
        <Helmet>
          <meta charSet="utf-8" />
          <title>Create Session</title>
        </Helmet>
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>Create A session</CardTitle>
            <CardDescription>Fill in the fields below</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Title</Label>
                <Input
                  required
                  type="text"
                  name="name"
                  placeholder="Session title"
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">status</Label>
                <div className="flex gap-2 items-center ">
                  <Input
                    required
                    name="password"
                    placeholder="status"
                    onChange={handleChange}
                    disabled
                  />
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            {loading ? (
              <LoadingButton />
            ) : (
              <Button type="submit" disabled={loading}>
                Create Session
              </Button>
            )}
          </CardFooter>
        </form>
      </Card>
    </>
  );
}
