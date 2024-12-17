'use client'

import { trpc } from '@/utils/trpc'
import { List } from './List'
import { CreateList } from './CreateList'

export function Board() {
  const { data: lists, isLoading } = trpc.list.getAll.useQuery()

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className="h-full p-4 overflow-x-auto">
      <div className="flex gap-4">
        {lists?.map((list) => (
          <List key={list.id} list={list} />
        ))}
        <CreateList />
      </div>
    </div>
  )
}