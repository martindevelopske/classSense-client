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

const ITEMS_PER_PAGE = 30; // Adjust the number of items per page as needed

// Create Document Component
const MembersPdf = ({
  membersData,
  session,
}: {
  membersData: SessionMembersResponse[];
  session: SessionResponse;
}) => {
  const totalPages = Math.ceil(membersData.length / ITEMS_PER_PAGE);

  const paginate = (data: SessionMembersResponse[], itemsPerPage: number) => {
    let pages = [];
    for (let i = 0; i < data.length; i += itemsPerPage) {
      pages.push(data.slice(i, i + itemsPerPage));
    }
    return pages;
  };

  const paginatedData = paginate(membersData, ITEMS_PER_PAGE);
  let rowCount = 0;
  return (
    <Document>
      {paginatedData.map((pageData, pageIndex) => (
        <Page key={pageIndex} size="A4" style={styles.page}>
          <View style={styles.section}>
            <Text style={styles.header}>Members Report</Text>
            <Text style={styles.item}>Session ID: {session.id}</Text>
            <Text style={styles.item}>Session Name: {session.name}</Text>
            <Text style={styles.item}>
              Created At: {new Date(session.createdAt).toLocaleDateString()}
            </Text>
          </View>
          <View style={styles.section}>
            <View style={styles.row}>
              <Text style={styles.columnHeader}>No.</Text>
              <Text style={styles.columnHeader}>First Name</Text>
              <Text style={styles.columnHeader}>Last Name</Text>
              <Text style={styles.columnHeader}>Email</Text>
            </View>
            {pageData.map((record, index) => (
              <View key={index} style={styles.row}>
                <Text style={styles.item}>{++rowCount}</Text>
                <Text style={styles.item}>{record.user.firstname}</Text>
                <Text style={styles.item}>{record.user.lastname}</Text>
                <Text style={styles.item}>{record.user.email}</Text>
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

export default MembersPdf;
