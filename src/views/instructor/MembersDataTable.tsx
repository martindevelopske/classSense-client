import { useEffect, useState } from "react";
import ErrorComponent from "@/components/Error";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getSessionMembers, removeSessionMembers } from "@/endpoints";
import Loading from "@/components/Loading";
import useFetchData from "@/lib/fetchData";
import { Button } from "@/components/ui/button";
import usePostData from "@/lib/postData";
import { PDFDownloadLink } from "@react-pdf/renderer";
import MembersPdf from "@/components/pdfs/MembersPdf";

// const HandleDeleteAttendance = async (studentId: string) => {
//   //send the request
//   //filter the data
// };
function MembersDataTable({
  sessionId,
  session,
}: {
  sessionId: string;
  session: SessionResponse;
}) {
  const [data, setData] = useState<SessionMembersResponse[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { fetchData } = useFetchData();
  const { postData } = usePostData();
  const getMembersData = async () => {
    try {
      setLoading(true);
      const url = `${getSessionMembers}/${sessionId}`;
      await fetchData(url).then((res) => {
        console.log(res);

        setData(res.data.message);
      });
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  const HandleRemoveMember = async ({
    sessionId,
    memberId,
  }: {
    sessionId: string;
    memberId: string;
  }) => {
    try {
      const response = await postData(removeSessionMembers, {
        sessionId: sessionId,
        memberId: memberId,
      });
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getMembersData();
  }, []);

  let rowCount = 0;
  return loading ? (
    <Loading loadingState={loading} />
  ) : data && data?.length > 0 ? (
    <div className="w-full">
      <PDFDownloadLink
        document={MembersPdf({
          membersData: data,
          session: session,
        })}
        fileName={`MembersPDF-${session.name}`}
      >
        {({ loading }) =>
          loading ? (
            <button className="p-2 m-2 bg-primary text-white">
              Loading Document...
            </button>
          ) : (
            <button className="p-2 m-2 bg-primary text-white hover:bg-purple">
              Download Members PDF
            </button>
          )
        }
      </PDFDownloadLink>
      <Table>
        <TableCaption>A list of your Session Members.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>No.</TableHead>
            <TableHead className="text-right font-bold">Firstname</TableHead>
            <TableHead className="w-[100px]">Lastname</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Date Joined</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((item: SessionMembersResponse) => {
            const { firstname, lastname, email, id, createdAt } = item.user;
            return (
              <TableRow key={id}>
                <TableCell>{++rowCount}</TableCell>
                <TableCell className="">{firstname}</TableCell>
                <TableCell>{lastname}</TableCell>
                <TableCell>{email}</TableCell>
                <TableCell>
                  {createdAt ? new Date(createdAt).toLocaleDateString() : "N/A"}
                </TableCell>
                {/* <TableCell>
                  <Button
                    variant="destructive"
                    onClick={() =>
                      HandleRemoveMember({
                        memberId: "",
                        sessionId: item.sessionId,
                      })
                    }
                  >
                    Remove
                  </Button>
                </TableCell> */}
              </TableRow>
            );
          })}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell className="text-right">{data.length}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  ) : (
    <ErrorComponent errorMessage="This session has no members Yet." />
  );
}
export default MembersDataTable;
