import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function createData(name, id, station, workcount, efficiency) {
  return { name, id, station, workcount, efficiency };
}

const rows = [
  createData("Jhon Doe", 159, 6.0, 24, "matched"),
  createData("pardumna Dash", 237, 9.0, 37, "matched"),
  createData("Ajit mohanty", 262, 16.0, 24, "matched"),
  createData("Avishek panigrahi", 305, 3.7, 67, "matched"),
  createData("Sanket Dash", 356, 16.0, 49, "low"),
];

export default function Datatable({ data }) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow className="bg-[#F5F5F5] text-2xl">
            <TableCell className="text-xl">sl no</TableCell>
            <TableCell align="right">Date</TableCell>
            <TableCell align="right">Time</TableCell>
            <TableCell align="right">Station Number</TableCell>
            <TableCell align="right">Employee_Code</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.map((item) => (
            <TableRow
              key={item.Sl_no}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell sx={{ color: "black" }} component="th" scope="row">
                {item.Sl_no}
              </TableCell>
              <TableCell align="right">{item.Date}</TableCell>
              <TableCell align="right">{item.Station_Number}</TableCell>
              <TableCell align="right">{item.Time}</TableCell>
              <TableCell align="right">{item.EmployeeCode}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
