import { router, publicProcedure } from "../trpc/builder";

export const healthcheck = router({
  info: publicProcedure.query(() => ({
    ok: true,
  })),
});
