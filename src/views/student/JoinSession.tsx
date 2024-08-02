import { addSessionMembers } from "@/endpoints";
import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useStudentUserDataEffect } from "./useStudentUserDataEffect";
import usePostData from "@/lib/postData";
import JoinSessionModal from "@/components/modals/JoinSessionModal";
interface ErrorResponse {
  message: string;
}
function JoinSession() {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null | undefined>();
  const [success, setSuccess] = useState<boolean | string>(false);
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const sessionId = params.get("sessionId");
  const { postData } = usePostData();

  useStudentUserDataEffect();

  useEffect(() => {
    const currentUrl = window.location.href;
    const parsedUrl = new URL(currentUrl);
    const pathname = parsedUrl.pathname;

    const segments = pathname.split("/");
    const sessionId = segments[3];
    console.log(segments[3]);

    const send = async (sessionId: string) => {
      // await new Promise((resolve) => {
      // setTimeout(async () => {
      try {
        await postData(addSessionMembers, { sessionId: sessionId }).then(
          (res) => {
            if (typeof res.data.message === "string") {
              setSuccess(res.data.message);
            } else {
              setSuccess("You are in! Welcome to the session");
            }
          }
        );
      } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
          const axiosErr = err as AxiosError<ErrorResponse>; // Cast err to AxiosError with ErrorResponse type
          if (axiosErr.response && axiosErr.response.data) {
            const errorData = axiosErr.response.data;
            const errorMessage = errorData.message;
            setError(errorMessage);
          } else {
            setError("An error occurred");
          }
        } else {
          setError("An unexpected error occurred");
        }
      } finally {
        setLoading(false);
      }

      // resolve();
      // }, 2000);
      // });
    };

    if (sessionId) {
      send(sessionId);
    }
  }, [sessionId]);

  return (
    <div>
      <JoinSessionModal success={success} loading={loading} error={error} />
    </div>
  );
}

export default JoinSession;
