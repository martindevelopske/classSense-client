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
import { deleteAttendance } from "@/endpoints";
import axios from "axios";

interface EmailCount {
  email: string;
  count: number;
  firstNames: string[];
  lastNames: string[];
}

const HandleDeleteAttendance = async (attendanceId: string) => {
  // Send the request
  try {
    await axios.delete(`${deleteAttendance}/${attendanceId}`, {
      withCredentials: true,
    });
  } catch (err) {
    console.error("Failed to delete attendance", err);
  }
};

// Function to count email occurrences and track names
const countEmailOccurrences = (
  data: AttendanceResponse[]
): Record<
  string,
  { count: number; firstNames: string[]; lastNames: string[] }
> => {
  return data.reduce((acc, item) => {
    const { email, firstname, lastname } = item.user;
    if (acc[email]) {
      acc[email].count += 1;
      if (!acc[email].firstNames.includes(firstname)) {
        acc[email].firstNames.push(firstname);
      }
      if (!acc[email].lastNames.includes(lastname)) {
        acc[email].lastNames.push(lastname);
      }
    } else {
      acc[email] = {
        count: 1,
        firstNames: [firstname],
        lastNames: [lastname],
      };
    }
    return acc;
  }, {} as Record<string, { count: number; firstNames: string[]; lastNames: string[] }>);
};

// Convert email counts to an array of objects
const getEmailCountArray = (
  emailCounts: Record<
    string,
    { count: number; firstNames: string[]; lastNames: string[] }
  >
): EmailCount[] => {
  return Object.keys(emailCounts).map((email) => ({
    email,
    count: emailCounts[email].count,
    firstNames: emailCounts[email].firstNames,
    lastNames: emailCounts[email].lastNames,
  }));
};

interface AttendanceDataTableProps {
  data: AttendanceResponse[];
}

export function AttendanceDataTable({ data }: AttendanceDataTableProps) {
  const emailCounts = countEmailOccurrences(data);
  const emailCountArray = getEmailCountArray(emailCounts);

  return emailCountArray.length > 0 ? (
    <Table>
      <TableCaption>
        A list of email attendance counts with associated names.
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>First Names</TableHead>
          <TableHead>Last Names</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Count</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {emailCountArray.map(({ email, count, firstNames, lastNames }) => (
          <TableRow key={email}>
            <TableCell>{firstNames.join(", ")}</TableCell>
            <TableCell>{lastNames.join(", ")}</TableCell>
            <TableCell>{email}</TableCell>
            <TableCell className="text-right">{count}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total Emails</TableCell>
          <TableCell className="text-right">{data.length}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  ) : (
    <ErrorComponent errorMessage="No attendance Records" />
  );
}

export default AttendanceDataTable;
