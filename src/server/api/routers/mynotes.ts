import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const notesRouter = createTRPCRouter({
  newNote: publicProcedure
    .input(
      z.object({
        title: z
          .string()
          .min(5, { message: "title must be 5 or more characters" })
          .trim(),
        description: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        return await ctx.prisma.notes.create({
          data: {
            title: input.title,
            description: input.description,
          },
        });
      } catch (error) {
        console.log("cannot create notes ");
      }
    }),
  allNotes: publicProcedure.query(async ({ ctx }) => {
    try {
      return await ctx.prisma.notes.findMany({
        select: {
          title: true,
          id: true,
        },
      });
    } catch (error) {
      console.log("cannot create notes ");
    }
  }),
  getOneNote: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const { id } = input;

      try {
        return await ctx.prisma.notes.findUnique({
          where: {
            id,
          },
        });
      } catch (error) {
        console.log("could not find that note", error);
      }
    }),
  updateNote: publicProcedure
    .input(
      z.object({
        title: z
          .string()
          .min(5, { message: "title must be 5 or more characters" })
          .trim(),
        description: z.string(),
        id: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { id, title, description } = input;
      try {
        return await ctx.prisma.notes.update({
          where: { id },
          data: {
            title,
            description,
          },
        });
      } catch (error) {
        console.log("could not update the note");
      }
    }),
  deleteNote: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { id } = input;
      try {
        return await ctx.prisma.notes.delete({
          where: {
            id,
          },
        });
      } catch (error) {
        console.log("sadly we cannot the delete the note");
      }
    }),
});
