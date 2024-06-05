import { Button } from "@/components/ui/button";
import { addAttendance, getSingleSession } from "@/endpoints";
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { AttendanceDataTable } from "./AttendanceDataTable";
import QRCode from "qrcode";
import BackComponent from "@/components/BackComponent";
import Loading from "@/components/Loading";
import ErrorComponent from "@/components/Error";

export default function SingleSession() {
  const { id } = useParams();

  const [session, setSession] = useState(null);
  const [code, setCode] = useState();
  const [attendance, setAttendance] = useState();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>();
  const location = useLocation();

  const attendanceUrl = `http://localhost:5173/student/addAttendance?sessionId=${id}`;

  const fetchSession = async (id: number) => {
    try {
      setLoading(true);
      const url = `${getSingleSession}/${Number(id)}`;
      const response = await axios.get(url, {
        withCredentials: true,
      });
      setSession(response.data.message);
    } catch (error) {
      console.error("Error fetching sessions:", error);
      setError("Failed to fetch Session. Please Reload the page.");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchSession(6);
  }, [id]);

  const href: string = window.location.href;

  //generate a qr code for the student to sign in
  const generateCode = () => {
    QRCode.toDataURL(href, { width: 500, margin: 2 }, (err, url) => {
      if (err) return console.error(err);
      setCode(url);
    });
  };
  return (
    <>
      <div className="flex flex-col gap-3 border-t mt-3 w-full p-3">
        <BackComponent to="/student" />
        {loading && (
          <div>
            <Loading loadingState={loading} />
          </div>
        )}
        {error && (
          <div>
            <ErrorComponent errorMessage={error} />
          </div>
        )}
        {session && (
          <div className="flex gap-3">
            <Button onClick={generateCode}>Generate QR Code</Button>
            <Button>Invite</Button>
          </div>
        )}
        {session ? (
          <div>
            {code && (
              <div className="p-3 border-b">
                <img className="" src={code} />
              </div>
            )}
            <div className="mt-3">
              <div className="font-bold text-lg">
                Session ID:{" "}
                <span className="font-light font-sans">{session?.id}</span>
              </div>
              <div className="font-bold text-lg">Name: {session?.name}</div>
              <div className="font-bold text-lg">Status: {session?.status}</div>
            </div>
            <AttendanceDataTable />
          </div>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}
