import { useAppStore } from "@/store";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
export function useInstructorUserDataEffect() {
  const navigate = useNavigate();
  const user: User | null = useAppStore((state) => state.user);
  const setUser = useAppStore((state) => state.setUser);
  useEffect(() => {
    if (!user || user == null) {
      navigate("/");
    }
    if (user?.userType !== "instructor") {
      setUser(null);
      navigate("/");
    }
    //check userToken in cookies
    const cookie = Cookies.get("userToken");
    if (cookie) {
      console.log(cookie);
    } else {
      console.log("absent");
    }
  }, [user]);
}
