import { Button } from "@/components/ui/button";
import { addAttendance, getSingleSession } from "@/endpoints";
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { AttendanceDataTable } from "./AttendanceDataTable";
import QRCode from "qrcode";

export default function SingleSession() {
  const { id } = useParams();

  const [session, setSession] = useState<unknown>(null);
  const [code, setCode] = useState();
  const location = useLocation();

  const attendanceUrl = `http://localhost:5173/student/addAttendance?sessionId=${id}`;

  const fetchSession = async (id: number) => {
    try {
      const url = `${getSingleSession}/${Number(id)}`;
      const response = await axios.get(url, {
        withCredentials: true,
      });
      console.log(response);
      setSession(response.data);
    } catch (error) {
      console.error("Error fetching sessions:", error);
    }
  };
  useEffect(() => {
    console.log(location.pathname);

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
        <div className="flex gap-3">
          <Button onClick={generateCode}>Generate QR Code</Button>
          <Button>Invite</Button>
        </div>
        {session ? (
          <div>
            {code && (
              <div className="p-3 border-b">
                <img className="" src={code} />
              </div>
            )}
            <div className="mt-3">
              <div>Session ID: {session.id}</div>
              <div>Name: {session.name}</div>
              <div>Status: {session.status}</div>
            </div>
          </div>
        ) : (
          <></>
        )}
        <AttendanceDataTable />
      </div>
    </>
  );
}
