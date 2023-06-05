import { router, publicProcedure } from "../trpc/builder";
import { createUserInput, findUserInput } from "./schema";

export const userRouter = router({
  find: publicProcedure.input(findUserInput).query(async ({ ctx, input }) => {
    const user = await ctx.prisma.user.findUnique({
      where: {
        email: input.email,
      },
    });

    return user;
  }),
  create: publicProcedure
    .input(createUserInput)
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.prisma.user.create({
        data: {
          email: input.email,
          name: input.name,
        },
      });

      return user;
    }),
});
