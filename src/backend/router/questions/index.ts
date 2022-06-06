import * as trpc from "@trpc/server";
import z from "zod";

import { prisma } from "@/backend/db/client";

export const questionRouter = trpc
  .router()
  .query("get-all", {
    async resolve({}) {
      return prisma.pollQuestion.findMany();
    },
  })
  .query("get-by-id", {
    input: z.object({ id: z.string() }),
    async resolve({ input }) {
      return prisma.pollQuestion.findFirst({ where: { id: input.id } });
    },
  })
  .mutation("create", {
    input: z.object({ question: z.string().min(5).max(600) }),
    async resolve({ input }) {
      return prisma.pollQuestion.create({
        data: {
          question: input.question,
          options: [],
        },
      });
    },
  });

export type questionRouter = typeof questionRouter;
