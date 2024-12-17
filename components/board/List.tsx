'use client'

import { useState } from 'react'
import { ListHeader } from './ListHeader'
import { ListItem } from './ListItem'
import { Button } from '../ui/Button'
import { trpc } from '@/utils/trpc'
import type { List as ListType, Item } from '@/types'

type ListProps = {
  list: ListType
}

export function List({ list }: ListProps) {
  const [newItemContent, setNewItemContent] = useState('')
  const utils = trpc.useContext()

  const addItem = trpc.item.create.useMutation({
    onSuccess: () => {
      utils.list.getAll.invalidate()
      setNewItemContent('')
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (newItemContent.trim()) {
      addItem.mutate({
        listId: list.id,
        content: newItemContent.trim(),
      })
    }
  }

  return (
    <div className="w-80 bg-gray-100 rounded-lg p-2">
      <ListHeader id={list.id} title={list.title} />
      
      <div className="space-y-2 mt-2">
        {list.items.map((item: Item) => (
          <ListItem key={item.id} id={item.id} content={item.content} />
        ))}
      </div>

      <form onSubmit={handleSubmit} className="mt-4">
        <input
          type="text"
          value={newItemContent}
          onChange={(e) => setNewItemContent(e.target.value)}
          placeholder="Add new item..."
          className="w-full border rounded px-2 py-1 mb-2"
        />
        <Button type="submit" className="w-full">
          Add Item
        </Button>
      </form>
    </div>
  )
}
