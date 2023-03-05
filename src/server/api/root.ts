import { createTRPCRouter } from "~/server/api/trpc";
import { exampleRouter } from "~/server/api/routers/example";
import { subscribeRouter } from "~/server/api/routers/subscribe";
import { notesRouter } from "~/server/api/routers/mynotes";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  subscribe: subscribeRouter,
  mynotes: notesRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
