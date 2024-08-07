import { useAppStore } from "@/store";
import apiclient from "./apiclient";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";

const usePostData = () => {
  const setUser = useAppStore((state) => state?.setUser);
  const navigate = useNavigate();

  const postData = useCallback(
    async <T extends object>(url: string, data: T) => {
      try {
        const response = await apiclient.post(url, data, {
          withCredentials: true,
        });
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
    [setUser, navigate]
  );

  return { postData };
};

export default usePostData;
