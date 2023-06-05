import express from "express";
import logger from "morgan";
import cors from "cors";
import healthcheck from "./healthcheck";
import user from "./user";

const server = express();

server.use(logger("dev"));
server.use(express.json());
server.use(cors());
server.use(express.urlencoded({ extended: true }));
server.use("/healthcheck", healthcheck);
server.use("/user", user);

export default server;
