import { HomeRouter, StudentRouter, InstructorRouter } from "@/routers";

export const APPS = [
  {
    subdomain: "",
    app: HomeRouter,
    main: true,
  },
  {
    subdomain: "student",
    app: StudentRouter,
    main: false,
  },
  {
    subdomain: "instructor",
    app: InstructorRouter,
    main: false,
  },
];
