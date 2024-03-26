import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function useStudentUserDataEffect() {
  const navigate = useNavigate();
  useEffect(() => {
    const userDataString = localStorage.getItem("userData");
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      if (userData.userType !== "student") {
        console.error("User is not a student.");
        navigate("/login");
      }
    } else {
      console.error("User data not found in localStorage.");
      navigate("/login");
    }
  }, []);
}
