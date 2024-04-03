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
import { Helmet } from "react-helmet";
import { Label } from "@radix-ui/react-label";
import { ChangeEvent, useState } from "react";
import { Input } from "@/components/ui/input";
import { LoadingButton } from "@/components/LoadingButton";
import { createSession } from "@/endpoints";
export default function CreateSession() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [values, setValues] = useState({
    name: "",
    status: "",
  });
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios
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
          console.log(res);
          setSuccess(true);
        });
    } catch (error: unknown) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <Card className="w-full">
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
