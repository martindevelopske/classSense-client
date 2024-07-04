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
      navigate("/", { state: { redirect: location.pathname } });
    }
    if (user?.userType !== "instructor") {
      setUser(null);
      navigate("/", { state: { redirect: location.pathname } });
    }
    //check userToken in cookies
    const cookie = Cookies.get("userToken");

    if (!cookie) {
      setUser(null);
      navigate("/", { state: { redirect: location.pathname } });
    }
  }, [user]);
}
