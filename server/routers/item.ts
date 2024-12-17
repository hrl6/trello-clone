import { z } from 'zod'
import { router, publicProcedure } from '../trpc'

export const itemRouter = router({
  create: publicProcedure
    .input(z.object({
      content: z.string(),
      listId: z.string(),
    }))
    .mutation(async ({ ctx, input }) => {
      const lastItem = await ctx.prisma.item.findFirst({
        where: { listId: input.listId },
        orderBy: { order: 'desc' },
      })

      const newOrder = lastItem ? lastItem.order + 1 : 0

      return ctx.prisma.item.create({
        data: {
          content: input.content,
          listId: input.listId,
          order: newOrder,
        },
      })
    }),

  update: publicProcedure
    .input(z.object({
      id: z.string(),
      content: z.string(),
    }))
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.item.update({
        where: { id: input.id },
        data: { content: input.content },
      })
    }),

  delete: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.item.delete({
        where: { id: input.id },
      })
    }),

    move: publicProcedure
      .input(z.object({
        id: z.string(),
        listId: z.string(),
        order: z.number(),
      }))
      .mutation(async ({ ctx, input }) => {
        return ctx.prisma.item.update({
          where: { id: input.id },
          data: {
            listId: input.listId,
            order: input.order,
          },
        })
      }),
  
    reorder: publicProcedure
      .input(z.object({
        items: z.array(z.object({
          id: z.string(),
          order: z.number(),
        })),
      }))
      .mutation(async ({ ctx, input }) => {
        const updates = input.items.map(({ id, order }) =>
          ctx.prisma.item.update({
            where: { id },
            data: { order },
          })
        )
  
        await ctx.prisma.$transaction(updates)
        return true
      }),
})