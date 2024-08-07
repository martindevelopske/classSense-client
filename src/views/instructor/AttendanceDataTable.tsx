import React from "react";
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
import { PDFDownloadLink } from "@react-pdf/renderer";
import AttendancePdf from "@/components/pdfs/AttendancePdf";

interface EmailCount {
  email: string;
  count: number;
  firstname: string;
  lastname: string;
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

// Function to count email occurrences and extract names
const countEmailOccurrences = ({
  data,
}: {
  data: AttendanceResponse[];
}): Record<string, { count: number; firstname: string; lastname: string }> => {
  return data.reduce((acc, item) => {
    const email = item.user.email;
    if (acc[email]) {
      acc[email].count += 1;
    } else {
      acc[email] = {
        count: 1,
        firstname: item.user.firstname,
        lastname: item.user.lastname,
      };
    }
    return acc;
  }, {} as Record<string, { count: number; firstname: string; lastname: string }>);
};

// Convert email counts to an array of objects
const getEmailCountArray = (
  emailCounts: Record<
    string,
    { count: number; firstname: string; lastname: string }
  >
): EmailCount[] => {
  return Object.keys(emailCounts).map((email) => ({
    email,
    count: emailCounts[email].count,
    firstname: emailCounts[email].firstname,
    lastname: emailCounts[email].lastname,
  }));
};

// interface AttendanceDataTableProps {
//   data: AttendanceResponse[];
// }

export function AttendanceDataTable({
  data,
  session,
}: {
  data: AttendanceResponse[];
  session: SessionResponse;
}) {
  const emailCounts = countEmailOccurrences({ data: data });
  const emailCountArray = getEmailCountArray(emailCounts);

  // // Function to download the table as a PDF
  // const downloadPDF = () => {
  //   const input = document.getElementById("attendance-table");
  //   if (!input) return;

  //   html2canvas(input).then((canvas) => {
  //     const imgData = canvas.toDataURL("image/png");
  //     const pdf = new jsPDF();
  //     const imgWidth = 190;
  //     const pageHeight = 295; // A4 paper height in mm
  //     const imgHeight = (canvas.height * imgWidth) / canvas.width;
  //     let heightLeft = imgHeight;

  //     let position = 0;

  //     pdf.addImage(imgData, "PNG", 10, position, imgWidth, imgHeight);
  //     heightLeft -= pageHeight;

  //     while (heightLeft >= 0) {
  //       position = heightLeft - imgHeight;
  //       pdf.addPage();
  //       pdf.addImage(imgData, "PNG", 10, position, imgWidth, imgHeight);
  //       heightLeft -= pageHeight;
  //     }

  //     pdf.save("attendance-data.pdf");
  //   });
  // };
  let rowCount = 0;
  return emailCountArray.length > 0 ? (
    <div>
      <PDFDownloadLink
        document={AttendancePdf({
          attendanceData: emailCountArray,
          session: session,
        })}
        fileName={`Attendance Pdf-${session.name}`}
      >
        {({ loading }) =>
          loading ? (
            <button className="p-2 m-2 bg-primary text-white">
              Loading Document...
            </button>
          ) : (
            <button className="p-2 m-2 bg-primary text-white hover:bg-purple">
              Download Attendance PDF
            </button>
          )
        }
      </PDFDownloadLink>
      <Table id="attendance-table">
        <TableCaption>A list of email attendance counts.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>No.</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>First Names</TableHead>
            <TableHead>Last Names</TableHead>
            <TableHead>Count</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {emailCountArray.map(({ email, count, firstname, lastname }) => (
            <TableRow key={email}>
              <TableCell>{++rowCount}</TableCell>
              <TableCell>{email}</TableCell>
              <TableCell>{firstname}</TableCell>
              <TableCell>{lastname}</TableCell>
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
    </div>
  ) : (
    <ErrorComponent errorMessage="No attendance Records" />
  );
}

export default AttendanceDataTable;
