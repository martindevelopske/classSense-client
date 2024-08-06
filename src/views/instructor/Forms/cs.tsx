// import axios, { AxiosError } from "axios";
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Helmet } from "react-helmet";
// import { Label } from "@radix-ui/react-label";
// import { ChangeEvent, FormEvent, useState, useEffect } from "react";
// import { Input } from "@/components/ui/input";
// import { LoadingButton } from "@/components/LoadingButton";
// import { createSession, getAllLocations, updateSession } from "@/endpoints"; // Ensure updateSession endpoint is imported
// import useFetchData from "@/lib/fetchData";
// import usePostData from "@/lib/postData";
// import { toast } from "@/components/ui/use-toast";
// import { Toaster } from "@/components/ui/toaster";

// interface ErrorResponse {
//   message: string;
// }
// interface FormProps {
//   id?: string; // Add id to identify if it's edit mode
//   name?: string;
//   status?: string;
//   day?: string;
//   locationId?: string;
// }
// interface LocationResponse {
//   id: string;
//   locationName: string;
// }

// export default function CreateSessionForm({
//   name,
//   status,
//   day,
//   locationId,
// }: FormProps) {
//   const [error, setError] = useState<string | null>(null);
//   const [loading, setLoading] = useState(false);
//   const [success, setSuccess] = useState<string | null>(null);
//   const [locations, setLocations] = useState<LocationResponse[] | null>(null);
//   const [locationError, setLocationError] = useState<string | null>(null);
//   const { fetchData } = useFetchData();
//   const { postData } = usePostData();
//   const [values, setValues] = useState({
//     name: name || "",
//     status: status || "created",
//     day: day || "",
//     locationId: locationId || "",
//   });

//   //get all locations
//   const getLocations = async () => {
//     const res = await fetchData(getAllLocations);
//     console.log(res);

//     if (res.status !== 200) {
//       setLocationError(res.data.message);
//     } else {
//       setLocations(res.data.message);
//     }
//   };

//   useEffect(() => {
//     getLocations();
//   }, []);
//   const selectedLocation: LocationResponse =
//     locations && locations.filter((item) => item.id == locationId);
//   console.log(selectedLocation);

//   const handleChange = (
//     e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
//   ) => {
//     setValues({ ...values, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     try {
//       setLoading(true);
//       console.log(values);

//       if (true) {
//         // Edit mode
//         // await postData(updateSession(data.id), { ...values }).then((res) => {
//         //   setSuccess("Session updated successfully.");
//         // });
//         toast({
//           title: "Session updated successfully. You can now close this modal.",
//         });
//       } else {
//         // Create mode
//         await postData(createSession, { ...values }).then((res) => {
//           setSuccess("Session created successfully.");
//         });
//         toast({
//           title: "Session created successfully. You can now close this modal.",
//         });
//       }
//       //close the modal-figure that out
//     } catch (error: unknown) {
//       setSuccess(null);
//       if (axios.isAxiosError(error)) {
//         const axiosError = error as AxiosError<ErrorResponse>;
//         const errMsg =
//           axiosError.response?.data?.message || "An error occurred";
//         setError(errMsg);
//       } else {
//         setError("An unexpected error occurred");
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       <Card className="w-full h-full">
//         <Toaster />
//         <Helmet>
//           <meta charSet="utf-8" />
//           <title>{name ? "Edit Session" : "Create Session"}</title>
//         </Helmet>
//         <form onSubmit={handleSubmit}>
//           <CardHeader>
//             <CardTitle>{name ? "Edit Session" : "Create A Session"}</CardTitle>
//             <CardDescription>Fill in the fields below</CardDescription>
//           </CardHeader>
//           <CardContent>
//             <div className="grid w-full items-center gap-4">
//               <div className="flex flex-col space-y-1.5">
//                 <Label
//                   htmlFor="name"
//                   className=" font-bold text-orange-600 text-lg"
//                 >
//                   Name
//                 </Label>
//                 <Input
//                   required
//                   type="text"
//                   name="name"
//                   value={values.name}
//                   placeholder="Session Name"
//                   onChange={handleChange}
//                 />
//               </div>
//               <div className="flex flex-col space-y-1.5">
//                 <Label
//                   htmlFor="status"
//                   className=" font-bold text-orange-600 text-lg"
//                 >
//                   Status
//                 </Label>
//                 <div className="flex gap-2 items-center ">
//                   <Input
//                     required
//                     name="status"
//                     value={values.status}
//                     placeholder="Status"
//                     onChange={handleChange}
//                     disabled
//                   />
//                 </div>
//               </div>
//             </div>
//             <div className="flex flex-col space-y-1.5 mt-5">
//               <Label
//                 htmlFor="day"
//                 className=" font-bold text-orange-600 text-lg"
//               >
//                 Day
//               </Label>
//               <select
//                 name="day"
//                 onChange={handleChange}
//                 value={values.day}
//                 className="border rounded-md p-2"
//               >
//                 <option value=""></option>
//                 <option value="Monday">Monday</option>
//                 <option value="Tuesday">Tuesday</option>
//                 <option value="Wednesday">Wednesday</option>
//                 <option value="Thursday">Thursday</option>
//                 <option value="Friday">Friday</option>
//               </select>
//             </div>
//             <div className="flex flex-col space-y-1.5 mt-5">
//               <Label
//                 htmlFor="locationId"
//                 className=" font-bold text-orange-600 text-lg"
//               >
//                 Location
//               </Label>
//               {locations ? (
//                 <select
//                   name="locationId"
//                   className="border rounded-md p-2"
//                   onChange={handleChange}
//                   value={selectedLocation?.id || ""}
//                 >
//                   <option value=""></option>
//                   {locations?.map((item: LocationResponse) => (
//                     <option value={item.id} key={item.id}>
//                       {item.locationName}
//                     </option>
//                   ))}
//                 </select>
//               ) : (
//                 <div>No locations available</div>
//               )}
//             </div>
//           </CardContent>
//           <CardFooter className="flex justify-between">
//             {loading ? (
//               <LoadingButton />
//             ) : (
//               <Button type="submit" disabled={loading}>
//                 {name ? "Update Session" : "Create Session"}
//               </Button>
//             )}
//           </CardFooter>
//         </form>
//       </Card>
//     </>
//   );
// }
