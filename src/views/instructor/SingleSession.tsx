import { Button } from "@/components/ui/button";
import { getSingleSession } from "@/endpoints";
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { AttendanceDataTable } from "./AttendanceDataTable";
import QRCode from "qrcode";
import { RiFullscreenFill } from "react-icons/ri";
import BackComponent from "@/components/BackComponent";
import Loading from "@/components/Loading";
import ErrorComponent from "@/components/Error";
import SaveImageButton from "@/components/SaveImageButton";
import CodeModal from "@/components/modals/CodeModal";
import { useStudentUserDataEffect } from "../student/useStudentUserDataEffect";

export default function SingleSession() {
  useStudentUserDataEffect();

  const { id } = useParams();

  const [activeTab, setActiveTab] = useState<string | null>(null);
  const [fullscreen, setFullscreen] = useState<boolean>(false);
  const [session, setSession] = useState(null);
  const [code, setCode] = useState();
  const [attendance, setAttendance] = useState();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>();
  const location = useLocation();

  const attendanceUrl: string = `http://localhost:5173/student/addAttendance?sessionId=${id}`;

  const fetchSession = async (id: number) => {
    try {
      setLoading(true);
      const url = `${getSingleSession}/${Number(id)}`;
      const response = await axios.get(url, {
        withCredentials: true,
      });
      setSession(response.data.message);
      console.log(response.data.message);

      setAttendance(response.data.message.attendance);
      console.log(response.data.message.attendance);
    } catch (error) {
      console.error("Error fetching sessions:", error);
      setError("Failed to fetch Session. Please Reload the page.");
    } finally {
      setLoading(false);
    }
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    fetchSession(6);
  }, [id]);

  const href: string = window.location.href;

  //generate a qr code for the student to sign in
  const generateCode = async () => {
    console.log("called");

    await QRCode.toDataURL(href, { width: 500, margin: 2 }, (err, url) => {
      if (err) return console.error(err);

      setCode(url);
    });
  };
  return (
    <>
      <div className="flex flex-col gap-3 border-t mt-3 w-full p-3 h-auto">
        <BackComponent to="/student" />
        {loading && (
          <div className="mt-[200px]">
            <Loading loadingState={loading} />
          </div>
        )}
        {error && (
          <div className="mt-[200px]">
            <ErrorComponent errorMessage={error} />
          </div>
        )}
        {session && (
          <div className="flex gap-3">
            <Button
              onClick={() => {
                generateCode();
                handleTabChange("sign-in");
              }}
            >
              Sign In Code
            </Button>
            <Button
              onClick={() => {
                generateCode();
                handleTabChange("joining");
              }}
            >
              Invite Code
            </Button>
          </div>
        )}
        {session && (
          <div>
            {activeTab == "sign-in" && (
              <div className="p-3 border-b">
                <div className="text-2xl font-bold">sign in code</div>
                <img className="" src={code} alt="QR Code" />
                <hr />
                {code && (
                  <div className="flex items-center gap-10 w-full mt-10">
                    {" "}
                    <SaveImageButton dataUrl={code} />{" "}
                    <div>
                      <Button
                        onClick={() => setFullscreen(true)}
                        className="flex items-center gap-3"
                      >
                        Full Screen
                        <RiFullscreenFill />
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            )}
            {activeTab == "joining" && (
              <div className="p-3 border-b">
                <div className="text-2xl font-bold">
                  join as a new member code
                </div>
                <img className="" src={code} alt="QR Code" />

                <hr></hr>
                {code && (
                  <div className="flex items-center gap-10 w-full mt-10">
                    {" "}
                    <SaveImageButton dataUrl={code} />
                    <div className="">
                      <Button
                        onClick={() => setFullscreen(true)}
                        className="flex items-center gap-3"
                      >
                        Full Screen
                        <RiFullscreenFill />
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            )}
            {fullscreen && code && (
              <CodeModal data={code} setFullscreen={setFullscreen} />
            )}
            <div className="mt-3">
              <div className="font-bold text-lg">
                Session ID:{" "}
                <span className="font-light font-sans">{session.id}</span>
              </div>
              <div className="font-bold text-lg">Name: {session.name}</div>
              <div className="font-bold text-lg">Status: {session.status}</div>
            </div>
            {attendance ? (
              <AttendanceDataTable data={attendance} />
            ) : (
              <ErrorComponent errorMessage="Failed to Fetch attendance Data. Please Refresh the page." />
            )}
          </div>
        )}
      </div>
    </>
  );
}
