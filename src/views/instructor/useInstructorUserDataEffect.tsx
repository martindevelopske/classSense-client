import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function useInstructorUserDataEffect() {
  const navigate = useNavigate();
  useEffect(() => {
    const userDataString = localStorage.getItem("userData");
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      if (userData.userType !== "instructor") {
        console.error("User is not a instructor.");
        navigate("/");
      }
    } else {
      console.error("Instructor data not found in localStorage.");
      navigate("/");
    }
  }, []);
}
