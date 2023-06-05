const bodyParser = require("body-parser");
const express = require("express");
const cors = require("cors");
const routeManager = require("./routes");

//Database Connection
const db = require("./config/db.config");
const { models } = db;

const app = express();

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(cors("*"));

app.use("/api/v1", routeManager);

app.get("/", (request, response) => {
  response.json({ info: "Node.js, Express, and Postgres API" });
});

const PORT = process.env.PORT || 8080;

async function initial() {
  try {
    const count = await models.role.count();
    if (count <= 0) {
      await models.role.create({
        id: 1,
        name: "user",
      });
      await models.role.create({
        id: 2,
        name: "moderator",
      });

      await models.role.create({
        id: 3,
        name: "admin",
      });
      console.log("Role Default Data inserted Perfectly");
    }
  } catch (error) {
    // Handle connection or query error
    console.error(error);
  }
}

async function assertDatabaseConnectionOk() {
  console.log(`Checking database connection...`);
  try {
    await db.authenticate();
    console.log("Database connection OK!");
  } catch (error) {
    console.log("Unable to connect to the database:");
    console.log(error.message);
    process.exit(1);
  }
}

async function init() {
  await assertDatabaseConnectionOk();
  db.sync({ alter: true })
    .then(() => {
      app.listen(PORT, console.log(`Server started on port ${PORT}`));
      initial();
    })
    .catch((err) => console.log("Error: " + err));
}

init();
