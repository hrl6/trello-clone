import { router } from '../trpc'
import { listRouter } from './list'
import { itemRouter } from './item'

export const appRouter = router({
  list: listRouter,
  item: itemRouter,
})

export type AppRouter = typeof appRouter