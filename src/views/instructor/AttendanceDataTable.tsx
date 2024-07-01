// import React from "react";
// import ErrorComponent from "@/components/Error";
// import {
//   Table,
//   TableBody,
//   TableCaption,
//   TableCell,
//   TableFooter,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";

export function AttendanceDataTable({ data }: { data: unknown }) {
  // return data.length > 0 ? (
  //   <Table>
  //     <TableCaption>A list of your recent Attendances.</TableCaption>
  //     <TableHeader>
  //       <TableRow>
  //         <TableHead className="text-right">ID</TableHead>
  //         <TableHead className="w-[100px]">Session ID</TableHead>
  //         <TableHead>Email</TableHead>
  //         <TableHead>Date</TableHead>
  //       </TableRow>
  //     </TableHeader>
  //     <TableBody>
  //       {data?.map((item) => (
  //         <TableRow key={item.id}>
  //           <TableCell className="font-medium">{item.id}</TableCell>
  //           <TableCell>{item.sessionId}</TableCell>
  //           <TableCell>{item.user.email}</TableCell>
  //           <TableCell>{item.createdAt}</TableCell>
  //         </TableRow>
  //       ))}
  //     </TableBody>
  //     <TableFooter>
  //       <TableRow>
  //         <TableCell colSpan={3}>Total</TableCell>
  //         <TableCell className="text-right">$2,500.00</TableCell>
  //       </TableRow>
  //     </TableFooter>
  //   </Table>
  // ) : (
  //   <ErrorComponent errorMessage="No attendance Records" />
  // );
  return <h2>Attendance data table</h2>;
}
