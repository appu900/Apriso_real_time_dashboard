import React, { useEffect, useState } from "react";
import LayoutCards from "../components/layoutCards";
import { Axis3D, ChevronRight } from "lucide-react";
import Datatable from "../components/DataTable";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export default function Homepage() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const eventSource = new EventSource("http://localhost:5000/stream");
    eventSource.onmessage = (event) => {
      const newData = JSON.parse(event.data);
      setData(newData);
      // console.log(newData);
      // console.log("data is:", data);
    };
    return () => {
      eventSource.close();
    };
  }, []);

  return (
    <div className="py-2 max-h-screen">
      <p className="flex">
        Apriso <ChevronRight /> Dashboard <ChevronRight /> homepage
      </p>
      <div className="grid grid-cols-5 gap-3 py-10">
        <LayoutCards
          title={"total employee"}
          data={"120"}
          url={"http://localhost:5000/api/employee"}
        />
        <LayoutCards
          title={"total station"}
          data={"140"}
          url={"http://localhost:5000/api/station"}
        />
        <LayoutCards
          title={"total work done"}
          data={"320"}
          url={"http://localhost:5000/totalWorkToday"}
        />

        <LayoutCards
          title={"total active employee today"}
          data={"120"}
          url={"http://localhost:5000/totalEmployeeCountToday"}
        />

        {/* <LayoutCards /> */}
      </div>
      {/* data section */}
      <section className=" bg-[#ffff]">
        <p className="mb-4 text-xl ">Latest Readings</p>
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
            <TableBody
              className=""
              sx={{ overflowY: "scroll", height: "400px" }}
            >
              {data &&
                data.length > 0 &&
                data[0].map((item) => (
                  <TableRow
                    key={item.Sl_no}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell
                      sx={{ color: "black" }}
                      component="th"
                      scope="row"
                    >
                      {item.Sl_no}
                    </TableCell>
                    <TableCell align="right">
                      {new Date(item.Date).toDateString()}
                    </TableCell>
                    <TableCell align="right">{item.Time}</TableCell>
                    <TableCell align="right">{item.Station_Number}</TableCell>
                    <TableCell align="right">{item.EmployeeCode}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </section>
    </div>
  );
}
