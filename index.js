const debug = require("debug")("debug");
const config = require("config");
const helmet = require("helmet");
const morgan = require("morgan");
const genres = require("./routes/genres");
const customers = require("./routes/customers");
const movies = require("./routes/movies");
const rentals = require("./routes/rentals");
const users = require("./routes/users");
const auth = require("./routes/auth");
const logger = require("./middleware/logger");
const authenticator = require("./middleware/authenticator");
const express = require("express");
const app = express();
const mongoose = require("mongoose");

if (!config.get("jwtPrivateKey")) {
  debug("Fatal Error! jwtPrivateKey is not defined.");
  process.exit(1);
}

mongoose
  .connect("mongodb://localhost/vidly", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connnected to Mongodb");
  })
  .catch((error) => {
    console.error("There is a problem", error);
  });

console.log(config.get("name"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(logger);
app.use(authenticator);
app.use(helmet());
if (app.get("env") === "developement") {
  app.use(morgan("tiny"));
  debug("Morgan enabled...");
}
app.use("/api/genres", genres);
app.use("/api/customers", customers);
app.use("/api/movies", movies);
app.use("/api/rentals", rentals);
app.use("/api/users", users);
app.use("/api/auth", auth);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  debug(`Listening on port ${port}...`);
});
