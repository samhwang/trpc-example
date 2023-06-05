import express from "express";
import { getPrismaClient } from "../db";
import { findUserInput, createUserInput } from "./schema";

const router = express.Router();

router.get("/", async (req, res) => {
  const validate = findUserInput.safeParse(req.query);
  if (!validate.success) {
    res.status(400).send({
      error: `Invalid input: ${validate.error.issues}`,
    });
    return;
  }

  const prisma = getPrismaClient();
  const user = await prisma.user.findUnique({
    where: {
      email: validate.data.email,
    },
  });

  res.status(200).send(user);
});

router.post("/", async (req, res) => {
  const validate = createUserInput.safeParse(req.body);
  if (!validate.success) {
    res.status(400).send({
      error: `Invalid input: ${validate.error.issues}`,
    });
    return;
  }

  const prisma = getPrismaClient();
  const user = await prisma.user.create({
    data: {
      email: validate.data.email,
      name: validate.data.name,
    },
  });

  res.status(200).send(user);
});

export default router;
