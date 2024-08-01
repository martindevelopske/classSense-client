import { useAppStore } from "@/store";
import apiclient from "./apiclient";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";

const useFetchData = () => {
  const setUser = useAppStore((state) => state?.setUser);
  const navigate = useNavigate();

  const fetchData = useCallback(
    async (url: string) => {
      try {
        const response = await apiclient.get(url, { withCredentials: true });
        console.log(response);
        return response;
      } catch (err) {
        console.log(err);
        if (err == "login") {
          // Clear the current user data if any
          setUser(null);

          // Redirect to login page
          navigate("/");
        }
        return Promise.reject(err);
      }
    },
    [setUser, navigate],
  );

  return { fetchData };
};

export default useFetchData;
