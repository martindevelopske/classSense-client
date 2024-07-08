import { useAppStore } from "@/store";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
// import Cookies from "js-cookie";

export function useStudentUserDataEffect() {
  const user: User | null = useAppStore((state) => state?.user);
  const navigate = useNavigate();
  const setUser = useAppStore((state) => state.setUser);

  const location = useLocation();

  useEffect(() => {
    if (!user || user == null) {
      navigate("/", { state: { redirect: location.pathname } });
    }

    if (user?.userType !== "student") {
      setUser(null);
      navigate("/", { state: { redirect: location.pathname } });
    }

    // const cookie = Cookies.get("userToken");
    // if (!cookie) {
    //   setUser(null);
    //   navigate("/", { state: { redirect: location.pathname } });
    // }
  }, []);
}
