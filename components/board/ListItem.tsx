'use client'

import { useState } from 'react'
import { trpc } from '@/utils/trpc'
import { Button } from '../ui/Button'

type ListItemProps = {
  id: string
  content: string
}

export function ListItem({ id, content: initialContent }: ListItemProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [content, setContent] = useState(initialContent)
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (content.trim()) {
      updateItem.mutate({ id, content: content.trim() })
    }
  }

  return (
    <div className="group flex items-center gap-2 p-2 bg-white rounded shadow">
      {isEditing ? (
        <form onSubmit={handleSubmit} className="flex-1">
          <input
            type="text"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full border rounded px-2 py-1"
            autoFocus
            onBlur={() => setIsEditing(false)}
          />
        </form>
      ) : (
        <>
          <span
            className="flex-1 cursor-pointer"
            onClick={() => setIsEditing(true)}
          >
            {content}
          </span>
          <Button
            variant="danger"
            onClick={() => deleteItem.mutate({ id })}
            className="opacity-0 group-hover:opacity-100"
          >
            Delete
          </Button>
        </>
      )}
    </div>
  )
}