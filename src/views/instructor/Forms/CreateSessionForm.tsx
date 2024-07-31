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
import { createSession, getAllLocations } from "@/endpoints";

interface ErrorResponse {
  message: string;
}
export default function CreateSessionForm() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [locations, setLocations] = useState<LocationResponse[] | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [values, setValues] = useState({
    name: "",
    status: "created",
    day: "",
    locationId: "",
  });
  //get all locations
  const getLocations = async () => {
    await axios.get(getAllLocations, { withCredentials: true }).then((res) => {
      if (res.status != 200) {
        setLocationError(res.data.message);
      }
      setLocations(res.data.message);
    });
  };
  useEffect(() => {
    getLocations();
  }, []);
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
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
                <Label
                  htmlFor="name"
                  className=" font-bold text-orange-600 text-lg"
                >
                  Title
                </Label>
                <Input
                  required
                  type="text"
                  name="name"
                  placeholder="Session title"
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label
                  htmlFor="name"
                  className=" font-bold text-orange-600 text-lg"
                >
                  status
                </Label>
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
            <div className="flex flex-col space-y-1.5 mt-5">
              <Label
                htmlFor="days"
                className=" font-bold text-orange-600 text-lg"
              >
                Day:
              </Label>
              <select
                name="days"
                onChange={handleChange}
                className="border rounded-md p-2"
              >
                <option value=""></option>
                <option value="monday">Monday</option>
                <option value="tuesday">Tuesday</option>
                <option value="wednesday">Wednesday</option>
                <option value="thursday">Thursday</option>
                <option value="friday">Friday</option>
              </select>
            </div>
            <div className="flex flex-col space-y-1.5 mt-5">
              <Label
                htmlFor="locationId"
                className=" font-bold text-orange-600 text-lg"
              >
                Location:
              </Label>
              {locations ? (
                <select
                  name="locationId"
                  className="border rounded-md p-2"
                  onChange={handleChange}
                >
                  <option value=""></option>
                  {locations?.map((item: LocationResponse) => (
                    <option value={item?.id} key={item?.id}>
                      {item?.locationName}
                    </option>
                  ))}
                </select>
              ) : (
                <div>No locations available</div>
              )}
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
