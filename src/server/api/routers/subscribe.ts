import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const subscribeRouter = createTRPCRouter({
  sub: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        subMsg: `Subscribe to ${input?.text}`,
      };
    }),
});
