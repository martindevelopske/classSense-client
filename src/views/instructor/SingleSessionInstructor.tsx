import { Button } from "@/components/ui/button";
import {
  addAttendance,
  addSessionMembers,
  attendanceEvents,
  deleteSession,
  getSingleSession,
} from "@/endpoints";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
import useFetchData from "@/lib/fetchData";
import useDeleteData from "@/lib/deleteData";
import { toast } from "@/components/ui/use-toast";
import EditSessionModal from "@/components/modals/EditSessionModal";
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
  const [showEditModal, setShowEditModal] = useState<boolean>(false);

  const { deleteData } = useDeleteData();
  const { fetchData } = useFetchData();
  const navigate = useNavigate();
  // const attendanceUrl: string = `http://localhost:5173/student/addAttendance?sessionId=${id}`;

  const fetchSession = async (id: string | undefined) => {
    try {
      setLoading(true);
      const url = `${getSingleSession}/${id}`;
      const response = await fetchData(url);
      console.log(response);

      const session = response.data.message;
      setSession(session);

      session.attendance.length > 0 && setAttendance(session.attendance);
      session.length > 0 && setMembers(session.members);
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
  const handleDelete = async () => {
    try {
      await deleteData(`${deleteSession}/${session?.id}`).then((res) => {
        console.log(res);

        toast({ title: res.data.message });
      });
      navigate("/instructor");
    } catch (err) {}
  };

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
    const studentEndpoint =
      "https://classsense-test.netlify.app/student/sessions/";
    // const studentEndpoint = "http://localhost:5173/student/sessions/"
    const payload = `${studentEndpoint}${data}`;
    console.log(payload);

    // const payload = JSON.stringify(data);
    await QRCode.toDataURL(
      payload,
      { width: 500, margin: 2 },
      (err, url: string) => {
        if (err) return console.error(err);

        setCode(url);
      }
    );
  };
  return (
    <>
      <div className="flex flex-col gap-1 border-t mt-3 w-full p-3 h-auto">
        <div className="flex items-center justify-center w-full ">
          <BackComponent to="/instructor" />
          <div className="w-full h-[50px] flex gap-3 items-center justify-end cursor-pointer self-end ml-[150px]">
            <p
              onClick={() => setShowEditModal(true)}
              className="flex gap-2 items-center border p-2 rounded-md border-purple z-10"
            >
              <FaEdit /> Edit
            </p>
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
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
        {!loading && session && (
          <div className="flex flex-col gap-3">
            <div>
              <div className="font-bold text-2xl text-purple">
                {session.name}
              </div>
              <div>{session.id}</div>
              <div className="font-bold text-lg">Status: {session.status}</div>
              <div className="text-lg">Status: {session.day}</div>
            </div>
          </div>
        )}
        <br></br>
        {!loading && session && (
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
        {!loading && session && (
          <div>
            {codeTab == "sign-in" && (
              <div className="p-3 border-b">
                <div className="text-2xl font-bold">sign in code</div>
                <img className="h-[300px] w-auto" src={code} alt="QR Code" />
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
                <img className="h-[300px] w-auto" src={code} alt="QR Code" />

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
                    className={`border-r px-3 cursor-pointer z-10 ${
                      activeTab == "attendance" && "text-primary"
                    }`}
                    onClick={() => setActiveTab("attendance")}
                  >
                    Attendance
                  </li>
                  <li
                    className={`border-r px-3 cursor-pointer z-10 ${
                      activeTab == "dashboard" && "text-primary"
                    }`}
                    onClick={() => setActiveTab("dashboard")}
                  >
                    Dashboard
                  </li>
                  <li
                    className={`border-r px-3 cursor-pointer z-10 ${
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
                  {!loading && attendance ? (
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
        {showEditModal && (
          <EditSessionModal
            setShowEditSessionModal={setShowEditModal}
            showEditSessionModal={showEditModal}
            name={session!.name}
            status={session!.status}
            locationId={session!.locationId}
            day={session!.day}
          />
        )}
      </div>
    </>
  );
}
