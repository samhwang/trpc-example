import express from "express";
import logger from "morgan";
import cors from "cors";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { appRouter } from "./trpc/router";
import { createContext } from "./trpc/context";

const server = express();

server.use(logger("dev"));
server.use(cors());
server.use(
  "/trpc",
  createExpressMiddleware({
    router: appRouter,
    createContext,
  })
);

export default server;
