import mongoose from "mongoose";
import config from "./config";

mongoose.connect(config.DATABASE.URI);

const connection = mongoose.connection;

connection.once("open", () => {
  console.log("DB Connected");
});

connection.once("error", (err) => {
  console.log(err);
  process.exit(1);
});
