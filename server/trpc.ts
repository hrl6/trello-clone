import { initTRPC } from '@trpc/server'
import { FetchCreateContextFnOptions } from '@trpc/server/adapters/fetch'
import { prisma } from '@/utils/prisma'

export async function createContext(opts: FetchCreateContextFnOptions) {
  return {
    prisma,
  }
}

const t = initTRPC.context<typeof createContext>().create()

export const router = t.router
export const publicProcedure = t.procedure