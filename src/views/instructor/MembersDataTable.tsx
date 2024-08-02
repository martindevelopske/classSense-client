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

// const HandleDeleteAttendance = async (studentId: string) => {
//   //send the request
//   //filter the data
// };
function MembersDataTable({ sessionId }: { sessionId: string }) {
  const [data, setData] = useState<SessionMembersResponse[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { fetchData } = useFetchData();
  const { postData } = usePostData();
  const getMembersData = async () => {
    try {
      setLoading(true);
      const url = `${getSessionMembers}/${sessionId}`;
      await fetchData(url).then((res) => {
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
  return loading ? (
    <Loading loadingState={loading} />
  ) : data && data?.length > 0 ? (
    <Table>
      <TableCaption>A list of your recent Attendances.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="text-right font-bold">Firstname</TableHead>
          <TableHead className="w-[100px]">Lastname</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Date Joined</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data?.map((item: SessionMembersResponse) => {
          const { firstname, lastname, email, id } = item.user;
          return (
            <TableRow key={id}>
              <TableCell className="">{firstname}</TableCell>
              <TableCell>{lastname}</TableCell>
              <TableCell>{email}</TableCell>
              <TableCell>date joined</TableCell>
              <TableCell>
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
              </TableCell>
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
  ) : (
    <ErrorComponent errorMessage="This session has no members Yet." />
  );
}
export default MembersDataTable;
