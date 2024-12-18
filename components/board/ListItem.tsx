'use client'

import { useState } from 'react'
import { trpc } from '@/utils/trpc'
import { Button } from '../ui/Button'
import { Draggable } from '@hello-pangea/dnd'
import type { Item } from '@/types'
import { Trash2, PencilLine } from 'lucide-react';


type ListItemProps = {
  item: Item
  index: number
}

export function ListItem({ item, index }: ListItemProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [content, setContent] = useState(item.content)
  const utils = trpc.useContext()

  const updateItem = trpc.item.update.useMutation({
    onSuccess: () => {
      utils.list.getAll.invalidate()
      setIsEditing(false)
    },
  })

  const deleteItem = trpc.item.delete.useMutation({
    onSuccess: () => {
      utils.list.getAll.invalidate()
    },
  })

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault()
  //   if (content.trim()) {
  //     updateItem.mutate({ id: item.id, content: content.trim() })
  //   }
  // }

  const handleUpdate = () => {
    if (content.trim() && content.trim() !== item.content) {
      updateItem.mutate({ id: item.id, content: content.trim() })
    } else {
      setIsEditing(false)
      setContent(item.content)
    }
  }

  const handleCancel = () => {
    setIsEditing(false)
    setContent(item.content)
  }

  return (
    <Draggable draggableId={item.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="group flex items-start gap-2 p-2 bg-white rounded-[8px] shadow"
        >
          {isEditing ? (
            <div className="flex-1">
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full border rounded px-2 py-1 overflow-hidden"
                autoFocus
                // onBlur={() => setIsEditing(false)}
              />
              <div className="flex gap-2 pt-2">
                <Button
                  onClick={handleUpdate}
                  className="flex-1 gap-1 flex items-center justify-center rounded-lg bg-slate-400/80 hover:bg-slate-500 pr-4"
                  disabled={!content.trim() || content.trim() === item.content}
                >
                  <PencilLine size={14} />Save
                </Button>
                <Button
                  variant="ghost"
                  onClick={handleCancel}
                  className="flex-1 rounded-lg"
                >
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <div className='flex items-start w-full gap-2'>
              <span
                className="flex-1 cursor-pointer"
                onClick={() => setIsEditing(true)}
              >
                {content}
              </span>
              <Button
                variant="danger"
                onClick={() => deleteItem.mutate({ id: item.id })}
                className="opacity-0 group-hover:opacity-100"
              >
                <Trash2 size={14} />
              </Button>
            </div>
          )}
        </div>
      )}
    </Draggable>
  )
}