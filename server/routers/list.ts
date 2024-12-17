import { z } from 'zod'
import { router, publicProcedure } from '../trpc'

export const listRouter = router({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return ctx.prisma.list.findMany({
      include: {
        items: {
          orderBy: {
            order: 'asc',
          },
        },
      },
      orderBy: {
        order: 'asc',
      },
    })
  }),

  create: publicProcedure
    .input(z.object({ title: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const lastList = await ctx.prisma.list.findFirst({
        orderBy: {
          order: 'desc',
        },
      })

      const newOrder = lastList ? lastList.order + 1 : 0

      return ctx.prisma.list.create({
        data: {
          title: input.title,
          order: newOrder,
        },
        include: {
          items: true,
        },
      })
    }),

  update: publicProcedure
    .input(z.object({
      id: z.string(),
      title: z.string(),
    }))
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.list.update({
        where: { id: input.id },
        data: { title: input.title },
        include: {
          items: true,
        },
      })
    }),

  delete: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.list.delete({
        where: { id: input.id },
      })
    })
})