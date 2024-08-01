import { Button } from "@/components/ui/button";
import {
  addAttendance,
  addSessionMembers,
  attendanceEvents,
  getSingleSession,
} from "@/endpoints";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AttendanceDataTable from "./AttendanceDataTable";
import QRCode from "qrcode";
import { RiFullscreenFill } from "react-icons/ri";
import { FaEdit } from "react-icons/fa";
import BackComponent from "@/components/BackComponent";
import Loading from "@/components/Loading";
import ErrorComponent from "@/components/Error";
import SaveImageButton from "@/components/SaveImageButton";
import CodeModal from "@/components/modals/CodeModal";
import MembersDataTable from "./MembersDataTable";
type QRCodeData = {
  page: string;
  action: string;
  id: string | undefined;
};
export default function SingleSessionInstructor() {
  const { id } = useParams();

  const [activeTab, setActiveTab] = useState<string | null>("attendance");
  const [codeTab, setCodeTab] = useState<string | null>(null);
  const [fullscreen, setFullscreen] = useState<boolean>(false);
  const [session, setSession] = useState<SessionResponse | null>(null);
  const [code, setCode] = useState<string | undefined>();
  const [attendance, setAttendance] = useState<AttendanceResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>();
  const [events, setEvents] = useState([]);
  const [members, setMembers] = useState(null);
  // const attendanceUrl: string = `http://localhost:5173/student/addAttendance?sessionId=${id}`;

  const fetchSession = async (id: string | undefined) => {
    try {
      setLoading(true);
      const url = `${getSingleSession}/${id}`;
      const response = await axios.get(url, {
        withCredentials: true,
      });
      setSession(response.data.message);
      
      setAttendance(response.data.message.attendance);
      setMembers(response.data.message.members);
    } catch (error) {
      console.error("Error fetching sessions:", error);
      setError("Failed to fetch Session. Please Reload the page.");
    } finally {
      setLoading(false);
    }
  };

  const handleTabChange = (tab: string) => {
    setCodeTab(tab);
  };
  const handleEditSession = () => {};

  useEffect(() => {
    fetchSession(id);
  }, [id]);

  //listen to attendance event
  useEffect(() => {
    const eventSource = new EventSource(attendanceEvents);
    eventSource.onopen = () => {};

    eventSource.onerror = (error) => {
      console.error("Error establishing SSE connection:", error);
    };
    eventSource.onmessage = (event) => {
      const newAttendance = JSON.parse(event.data);
      //setAttendance((prev) => [...prev, newAttendance]);
    };
    return () => {
      eventSource.close();
    };
  }, []);

  //generate a qr code for the student to sign in
  const generateCode = async (data: string) => {

    const studentEndpoint = "https://classsense-test.netlify.app/student/sessions/"
    // const studentEndpoint = "http://localhost:5173/student/sessions/"
    const payload = `${studentEndpoint}${data}`
    console.log(payload);
    
    // const payload = JSON.stringify(data);
    await QRCode.toDataURL(
      payload,
      { width: 500, margin: 2 },
      (err, url: string) => {
        if (err) return console.error(err);

        setCode(url);
      },
    );
  };
  return (
    <>
      <div className="flex flex-col gap-1 border-t mt-3 w-full p-3 h-auto">
        <div className="flex items-center justify-center w-full ">
          <BackComponent to="/instructor" />
          <div className="w-full h-[50px] flex items-center justify-end cursor-pointer self-end">
            <p
              onClick={handleEditSession}
              className="flex gap-2 items-center border p-2 rounded-md border-purple"
            >
              <FaEdit /> Edit
            </p>
          </div>
        </div>
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
          <div className="flex flex-col gap-3">
            <div>
              <div className="font-bold text-2xl text-purple">
                {session.name}
              </div>
              <div>{session.id}</div>
              <div className="font-bold text-lg">Status: {session.status}</div>
            </div>
          </div>
        )}
        <br></br>
        {session && (
          <div className="flex gap-3 p-2  border">
            <Button
              onClick={() => {
                generateCode(`${session.id}/addAttendance`);
                handleTabChange("sign-in");
              }}
              variant="default"
            >
              Sign In Code
            </Button>
            <Button
              onClick={() => {
                generateCode(`${session.id}/join`);
                handleTabChange("joining");
              }}
            >
              Invite Code
            </Button>
          </div>
        )}
        {session && (
          <div>
            {codeTab == "sign-in" && (
              <div className="p-3 border-b">
                <div className="text-2xl font-bold">sign in code</div>
                <img className="h-[250px]" src={code} alt="QR Code" />
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
            {codeTab == "joining" && (
              <div className="p-3 border-b">
                <div className="text-2xl font-bold">
                  join as a new member code
                </div>
                <img className="h-[250px]" src={code} alt="QR Code" />

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
              <CodeModal
                data={code}
                name={activeTab}
                setFullscreen={setFullscreen}
              />
            )}

            <div className="border-t w-full mt-10">
              <div className="w-full flex">
                <ul className="w-full flex gap-3 border p-2 text-lg text-purple">
                  <li
                    className={`border-r px-3 cursor-pointer ${
                      activeTab == "attendance" && "text-primary"
                    }`}
                    onClick={() => setActiveTab("attendance")}
                  >
                    Attendance
                  </li>
                  <li
                    className={`border-r px-3 cursor-pointer ${
                      activeTab == "dashboard" && "text-primary"
                    }`}
                    onClick={() => setActiveTab("dashboard")}
                  >
                    Dashboard
                  </li>
                  <li
                    className={`border-r px-3 cursor-pointer ${
                      activeTab == "members" && "text-primary"
                    }`}
                    onClick={() => setActiveTab("members")}
                  >
                    Members
                  </li>
                </ul>
              </div>
              {activeTab == "attendance" && (
                <div>
                  {attendance ? (
                    <AttendanceDataTable data={attendance} />
                  ) : (
                    <ErrorComponent errorMessage="Failed to Fetch attendance Data. Please Refresh the page." />
                  )}
                </div>
              )}
              {activeTab == "dashboard" && <div>Dashboard</div>}
              {activeTab == "members" && (
                <div className="h-full w-full flex items-center justify-center">
                  {id && <MembersDataTable sessionId={id} />}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
