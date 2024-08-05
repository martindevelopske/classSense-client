import apiclient from "./apiclient";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";
import { useAppStore } from "@/store";

const useDeleteData = () => {
  const setUser = useAppStore((state) => state?.setUser);
  const navigate = useNavigate();

  const deleteData = useCallback(
    async <T extends object>(url: string, data?: T) => {
      try {
        const response = await apiclient.delete(url, {
          withCredentials: true,
        });
        return response;
      } catch (err) {
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

  return { deleteData };
};

export default useDeleteData;
