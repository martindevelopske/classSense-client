import AttendanceModal from "@/components/modals/AttendanceModal";
import { addAttendance } from "@/endpoints";
import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { log } from "util";
import { useStudentUserDataEffect } from "./useStudentUserDataEffect";

function AddAttendance() {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null | undefined>();
  const [success, setSuccess] = useState<boolean>(false);
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const sessionId = params.get("sessionId");
  console.log(sessionId);

  useStudentUserDataEffect();

  useEffect(() => {
    const send = async (sessionId: string) => {
      await new Promise((resolve) => {
        setTimeout(async () => {
          try {
            const response = await axios.post(
              addAttendance,
              { sessionId: sessionId },
              {
                headers: {
                  "Content-Type": "application/json",
                },
                withCredentials: true,
              }
            );
            console.log(response.data);
            setSuccess(true);
          } catch (err: unknown) {
            if (axios.isAxiosError(err)) {
              const axiosErr = err as AxiosError; // Cast err to AxiosError
              if (
                axiosErr.response &&
                axiosErr.response.data &&
                axiosErr.response.data.message
              ) {
                const errorMessage = axiosErr.response.data.message;
                setError(errorMessage);
              } else {
                setError("An error occurred");
              }
            }
          } finally {
            setLoading(false);
          }

          resolve();
        }, 2000);
      });
    };

    if (sessionId) {
      send("sessionId");
    }
  }, [sessionId]);

  return (
    <div>
      <AttendanceModal success={success} loading={loading} error={error} />
    </div>
  );
}

export default AddAttendance;
