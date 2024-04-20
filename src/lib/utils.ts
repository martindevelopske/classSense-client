import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { APPS } from "./constants";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getApp = () => {
  console.log(window.location.hostname, "domain");

  const main = APPS.find((app) => app.main);
  if (!main) throw new Error("No main app. Must have a main app");
  console.log(main, "this is the main router");

  const subDomain = getSubdomain(window.location.hostname);
  if (subDomain === "") return main.app;
  const app = APPS.find((app) => subDomain === app.subdomain);

  if (!app) return main.app;

  return app.app;
};

export const getSubdomain = (location: string) => {
  const locationparts = location.split(".");
  const subdomain = locationparts[0];

  let sliceTill = -2;

  console.log(subdomain, "subdomain");

  //for localhost
  const isLocalhost = locationparts.slice(-1)[0] === "localhost";
  if (isLocalhost) sliceTill = -1;

  return locationparts.slice(0, sliceTill).join("");
};
