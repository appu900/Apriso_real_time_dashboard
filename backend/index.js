const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const port = 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// conncet with database
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "123456789",
  database: "apriso",
});

connection.connect((err) => {
  if (err) throw err;
  console.log("Connected to database");
});

// get all station work count
app.get("/api/station/:date", (request, response) => {
  try {
    const date = request.params.date;

    // get todays date
    const today = new Date().toISOString().split("T")[0];

    // query for get all station work count
    const query =
      "SELECT Station_Number, COUNT(*) AS work_count FROM EmployeeRecords WHERE Date = ? GROUP BY Station_Number";

    // execute query
    connection.query(query, [date], (error, result) => {
      if (error) {
        console.log("Error in get all station work count", error.message);
        return response.status(500).send("Error in get all station work count");
      }
      return response.status(200).send(result);
    });
  } catch (error) {
    console.log("Error in get all station work count", error.message);
    return response.status(500).send("Error in get all station work count");
  }
});

//  total work done in a perticualar date
app.get("/api/totalwork/:date", (request, response) => {
  try {
    const date = request.params.date;
    // query for get total work done by employes in a day
    const query =
      "SELECT COUNT(*) AS total_work FROM EmployeeRecords WHERE Date = ?";
    // execute query
    connection.query(query, [date], (error, result) => {
      if (error) {
        console.log(
          "Error in get total work done by employes in a day",
          error.message
        );
        return response
          .status(500)
          .send("Error in get total work done by employes in a day");
      }
      return response.status(200).send(result);
    });
  } catch (error) {
    console.log(
      "Error in get total work done by employes in a day",
      error.message
    );
    return response
      .status(500)
      .send("Error in get total work done by employes in a day");
  }
});

// total work done by eacy employee in a day
app.get("/api/employee/:date", (request, response) => {
  try {
    const date = request.params.date;
    // query for get total work done by eacy employee in a day
    const query =
      "SELECT EmployeeCode, COUNT(*) AS work_count FROM EmployeeRecords WHERE Date = ? GROUP BY EmployeeCode";
    // execute query
    connection.query(query, [date], (error, result) => {
      if (error) {
        console.log(
          "Error in get total work done by eacy employee in a day",
          error.message
        );
        return response
          .status(500)
          .send("Error in get total work done by eacy employee in a day");
      }
      return response.status(200).send(result);
    });
  } catch (error) {
    console.log(
      "Error in get total work done by eacy employee in a day",
      error.message
    );
    return response
      .status(500)
      .send("Error in get total work done by eacy employee in a day");
  }
});

// server side event
// app.get("/stream", (request, response) => {
//   response.setHeader("Content-Type", "text/event-stream");
//   response.setHeader("Cache-Control", "no-cache");
//   response.setHeader("Connection", "keep-alive");

//   const sendUpdate = (data) => {
//     response.write(`data:${JSON.stringify(data)}\n\n`);
//   };

//   //   query for get all employee records
//   const query = connection.query("SELECT * FROM EmployeeRecords ORDER BY Sl_no DESC LIMIT 5");
//   const dataArray = [];

//   // handle result events
//   query.on("result", (row) => {
//     // sendUpdate(row);
//     dataArray.push(row);
//   });

//   query.on("end", () => {
//      sendUpdate(dataArray);
//     response.end();
//   });

//   query.on("error", (error) => {
//     console.log("Error in server side event", error.message);
//     return response.status(500).send("Error in server side event");
//   });
// });

// fetch all letest data for dashboard SSE
app.get("/stream", (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  // Function to fetch the latest data from the database
  const fetchData = () => {
    connection.query(
      "SELECT * FROM EmployeeRecords ORDER BY Sl_no DESC LIMIT 5",
      (error, results) => {
        if (error) {
          console.error("Error fetching data:", error);
          return;
        }
        // console.log("results", results);
        // Send the fetched data as an SSE event, wrapped in an array
        res.write(`data: ${JSON.stringify([results])}\n\n`);
      }
    );
  };

  // Fetch initial data when the client connects
  fetchData();

  // Poll the database for new data every second
  const intervalId = setInterval(fetchData, 6000);

  // Clean up function to close the SSE connection and stop polling when client disconnects
  req.on("close", () => {
    clearInterval(intervalId);
    res.end();
  });
});




//  total employee persent in database
app.get("/api/employee", (request, response) => {
  try {
    // query for get total employee persent in database
    const query = "SELECT COUNT(*) AS total_employee FROM EmployeeRecords";

    // execute query
    connection.query(query, (error, result) => {
      if (error) {
        console.log(
          "Error in get total employee persent in database",
          error.message
        );
        return response
          .status(500)
          .send("Error in get total employee persent in database");
      }
      return response.status(200).json({
        data: result[0].total_employee,
      });
    });
  } catch (error) {
    return response.status(500).send({
      error: "Error in get total employee persent in database",
    });
  }
});

//  total station persent in database
app.get("/api/station", (request, response) => {
  try {
    // query for get total station persent in database
    const query = "SELECT DISTINCT Station_Number FROM EmployeeRecords";
    // execute query
    connection.query(query, (error, result) => {
      if (error) {
        console.log(
          "Error in get total station persent in database",
          error.message
        );
        return response
          .status(500)
          .send("Error in get total station persent in database");
      }
      return response.status(200).json({
        data: result.length,
      });
    });
  } catch (error) {
    console.log(
      "Error in get total station persent in database",
      error.message
    );
    return response
      .status(500)
      .send("Error in get total station persent in database");
  }
});



// total employee in today
app.get('/totalEmployeeCountToday', (req, res) => {
  // Get today's date in the same format as in your data ("M/D/YYYY")
  const today = new Date();
  const todayFormatted = today.toISOString().slice(0, 10); 

  // Query to count total distinct employees for today
  const query = `SELECT COUNT(DISTINCT EmployeeCode) AS totalEmployees FROM EmployeeRecords WHERE Date = ?`;
  connection.query(query, [todayFormatted], (error, results) => {
    if (error) {
      console.error('Error counting total employee count today:', error);
      res.status(500).json({ error: 'An error occurred' });
      return;
    }
    // Send the total employee count as JSON response
    res.json({ data: results[0].totalEmployees });
  });
});




// total work done today
app.get("/totalWorkToday", (req, res) => {
  // Get today's date
  const today = new Date();
  const todayFormatted = today.toISOString().slice(0, 10); // Format as YYYY-MM-DD

  // Query to count total work done today
  const query = `SELECT COUNT(*) AS totalWork FROM EmployeeRecords WHERE Date = ?`;
  connection.query(query, [todayFormatted], (error, results) => {
    if (error) {
      console.error("Error counting total work today:", error);
      res.status(500).json({ error: "An error occurred" });
      return;
    }

    // Send the total count as JSON response
    res.json({ data: results[0].totalWork });
  });
});

app.listen(port, () => console.log(`Server is running on port ${port}`));
