const bodyParser = require("body-parser");
const express = require("express");
const cors = require("cors");

//Database Connection
const db = require("./config/db.config");
db.authenticate()
  .then(() => {
    console.log("Database connected...");
  })
  .catch((err) => {
    console.log("Error: " + err);
  });

const app = express();
const routeManager = require("./routes");

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(cors("*"));

app.use("/api/v1", routeManager);

app.get("/", (request, response) => {
  response.json({ info: "Node.js, Express, and Postgres API" });
});

const PORT = process.env.PORT || 3000;

db.sync()
  .then(() => {
    app.listen(PORT, console.log(`Server started on port ${PORT}`));
  })
  .catch((err) => console.log("Error: " + err));
