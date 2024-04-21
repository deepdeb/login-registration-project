const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config({ path: `${__dirname}/.env` });
const app = express();
const cors = require("cors");
const AuthorizationRouter = require("./routes/authorization");
const createDb = require("./config/createDb");

app.use(cors());

createDb
  .createDbIfNotExists()
  .then(() => createDb.runMigrations())
  .catch((error) => console.error("Error setting up database:", error));

app.listen(process.env.PORT, () => {
  console.log(`server running on ${process.env.PORT}`);
});

app.use(bodyParser.json());

AuthorizationRouter.routesConfig(app);
