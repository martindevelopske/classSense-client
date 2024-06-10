import { useAppStore } from "@/store";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function useStudentUserDataEffect() {
  const user: User | null = useAppStore((state) => state.user);
  const navigate = useNavigate();
  useEffect(() => {
    if (!user || user == null) {
      navigate("/", { state: { redirect: "/student" } });
    }
  }, []);
}
