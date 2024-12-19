'use client'

import { useState } from 'react'
import { ListHeader } from './ListHeader'
import { ListItem } from './ListItem'
import { Button } from '../ui/Button'
import { trpc } from '@/utils/trpc'
import type { List as ListType } from '@/types'
import { Draggable, Droppable } from '@hello-pangea/dnd'

type ListProps = {
  list: ListType
  index: number
}

export function List({ list, index }: ListProps) {
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
    <Draggable draggableId={list.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
        >
          <div className="w-72 bg-gray-100 border-[0.5px] border-gray-300 rounded-xl p-3">
            <div {...provided.dragHandleProps}>
              <ListHeader id={list.id} title={list.title} />
            </div>
            
            <Droppable droppableId={list.id} type="item">
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="space-y-2 mt-2 p-4 rounded-xl bg-gray-100 shadow-[inset_-2px_-2px_5px_rgba(255,255,255,0.7),inset_2px_2px_5px_rgba(0,0,0,0.1)]"
                >
                  {list.items.map((item, index) => (
                    <ListItem
                      key={item.id}
                      item={item}
                      index={index}
                    />
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
            
            <div className="my-4 h-[1px] bg-gray-300"></div>

            <form onSubmit={handleSubmit} className="mt-4">
              <input
                type="text"
                value={newItemContent}
                onChange={(e) => setNewItemContent(e.target.value)}
                placeholder="Add new item..."
                className="w-full text-slate-900 border rounded-lg px-2 py-1 mb-2"
              />
              <Button type="submit" className="w-full py-[6px] rounded-lg">
                Add Item
              </Button>
            </form>
          </div>
        </div>
      )}
    </Draggable>
  )
}