import { useAppStore } from "@/store";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

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
  }, [user]);
}
