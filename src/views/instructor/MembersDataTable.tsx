import { useEffect, useState } from "react";
import ErrorComponent from "@/components/Error";
import { Button } from "@/components/ui/button";
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
import { deleteAttendance, getSessionMembers } from "@/endpoints";
import axios from "axios";

const HandleDeleteAttendance = async (studentId: string) => {
  //send the request
  //filter the data
};
function MembersDataTable({ sessionId }: { sessionId: string }) {
  const [data, setData] = useState(null);
  const getMembersData = async () => {
    try {
      const url = `${getSessionMembers}/${sessionId}`;
      console.log(url);
      await axios
        .get(url, {
          withCredentials: true,
        })
        .then((res) => {
          setData(res.data.message);
        });
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getMembersData();
  }, []);
  return data?.length > 0 ? (
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
        {data?.map((item: AttendanceRecord) => {
          const { firstname, lastname, email, id } = item.user;
          return (
            <TableRow key={id}>
              <TableCell className="">{firstname}</TableCell>
              <TableCell>{lastname}</TableCell>
              <TableCell>{email}</TableCell>
              <TableCell>{item.createdAt}</TableCell>
              
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
