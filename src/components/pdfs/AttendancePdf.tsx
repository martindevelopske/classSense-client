import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#E4E4E4",
    padding: 20,
  },
  section: {
    margin: 10,
    padding: 10,
    borderBottom: "1px solid #000",
  },
  header: {
    fontSize: 16,
    marginBottom: 10,
  },
  item: {
    fontSize: 12,
    marginBottom: 5,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  columnHeader: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 5,
  },
});

interface EmailCount {
  email: string;
  count: number;
  firstname: string;
  lastname: string;
}

const ITEMS_PER_PAGE = 30; // Adjust the number of items per page as needed

// Create Document Component
const AttendancePdf = ({
  attendanceData,
  session,
}: {
  attendanceData: EmailCount[];
  session: SessionResponse;
}) => {
  const totalPages = Math.ceil(attendanceData.length / ITEMS_PER_PAGE);

  const paginate = (data: EmailCount[], itemsPerPage: number) => {
    const pages = [];
    for (let i = 0; i < data.length; i += itemsPerPage) {
      pages.push(data.slice(i, i + itemsPerPage));
    }
    return pages;
  };

  const paginatedData = paginate(attendanceData, ITEMS_PER_PAGE);
  let rowCount = 0;
  return (
    <Document>
      {paginatedData.map((pageData, pageIndex) => (
        <Page key={pageIndex} size="A4" style={styles.page}>
          <View style={styles.section}>
            <Text style={styles.header}>Attendance Report</Text>
            <Text style={styles.item}>Session ID: {session.id}</Text>
            <Text style={styles.item}>Session Name: {session.name}</Text>
            <Text style={styles.item}>
              Created At: {new Date(session.createdAt).toLocaleDateString()}
            </Text>
          </View>
          <View style={styles.section}>
            <View style={styles.row}>
              <Text style={styles.columnHeader}>No.</Text>
              <Text style={styles.columnHeader}>Email</Text>
              <Text style={styles.columnHeader}>First Name</Text>
              <Text style={styles.columnHeader}>Last Name</Text>
              <Text style={styles.columnHeader}>Count</Text>
            </View>
            {pageData.map((record, index) => (
              <View key={index} style={styles.row}>
                <Text style={styles.item}>{++rowCount}</Text>
                <Text style={styles.item}>{record.email}</Text>
                <Text style={styles.item}>{record.firstname}</Text>
                <Text style={styles.item}>{record.lastname}</Text>
                <Text style={styles.item}>{record.count}</Text>
              </View>
            ))}
          </View>
          <View style={styles.section}>
            <Text style={styles.item}>
              Page {pageIndex + 1} of {totalPages}
            </Text>
          </View>
        </Page>
      ))}
    </Document>
  );
};

export default AttendancePdf;
