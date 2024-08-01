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
import { getSessionMembers } from "@/endpoints";
import axios from "axios";
import Loading from "@/components/Loading";

// const HandleDeleteAttendance = async (studentId: string) => {
//   //send the request
//   //filter the data
// };
function MembersDataTable({ sessionId }: { sessionId: string }) {
  const [data, setData] = useState<SessionMembersResponse[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const getMembersData = async () => {
    try {
      setLoading(true);
      const url = `${getSessionMembers}/${sessionId}`;
      await axios
        .get(url, {
          withCredentials: true,
        })
        .then((res) => {
          setData(res.data.message);
        });
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getMembersData();
  }, []);
  return loading ? <Loading loadingState={loading}/> :  data && data?.length > 0 ? (
    <Table>
      <TableCaption>A list of your recent Attendances.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="text-right font-bold">Firstname</TableHead>
          <TableHead className="w-[100px]">Lastname</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Date</TableHead>
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
              {/* <TableCell>{item.createdAt}</TableCell> */}
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