import express, { Express, Request, Response } from "express";
import cors from "cors";
import morgan from "morgan";
import routes from "./routes";
import passport from "passport";
import passportAuth from "./middlewares/auth";

const server: Express = express();

// Settings.
server.set("port", 4500);

// Middlewares.
server.use(cors());
server.use(morgan("dev"));
server.use(express.json());
server.use(express.urlencoded({ extended: false }));
server.use(passport.initialize());
passport.use(passportAuth); // jwt

// Routes.
server.get("/", (req: Request, res: Response): Response => {
  return res.status(200).json({ msg: "hello, world" });
});

server.use("/api", routes.task);
server.use("/api", routes.auth);

export default server;
