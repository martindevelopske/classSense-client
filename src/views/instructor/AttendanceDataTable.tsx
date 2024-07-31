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
import { deleteAttendance } from "@/endpoints";
import axios from "axios";

const HandleDeleteAttendance = async (attendanceId: string) => {
  //send the request
  try {
    await axios
      .delete(`${deleteAttendance}/${attendanceId}`, {
        withCredentials: true,
      })
      .then((res) => console.log(res));
  } catch (err) {}
  //filter the data
};
export function AttendanceDataTable({ data }: { data: AttendanceResponse[] }) {
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
        {data?.map((item: AttendanceResponse) => {
          const { firstname, lastname, email, id, createdAt } = item.user;
          return (
            <TableRow key={id}>
              <TableCell className="">{firstname}</TableCell>
              <TableCell>{lastname}</TableCell>
              <TableCell>{email}</TableCell>
              <TableCell>{createdAt?.toString()}</TableCell>
              <TableCell>
                <Button
                  variant="destructive"
                  onClick={() => HandleDeleteAttendance(id)}
                >
                  Delete
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
    <ErrorComponent errorMessage="No attendance Records" />
  );
  // return <h2>Attendance data table</h2>;
}
