'use client'

import { useState } from 'react'
import { Button } from '../ui/Button'
import { trpc } from '@/utils/trpc'

type ListHeaderProps = {
  id: string
  title: string
}

export function ListHeader({ id, title: initialTitle }: ListHeaderProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [title, setTitle] = useState(initialTitle)
  const utils = trpc.useContext()

  const updateList = trpc.list.update.useMutation({
    onSuccess: () => {
      utils.list.getAll.invalidate()
      setIsEditing(false)
    },
  })

  const deleteList = trpc.list.delete.useMutation({
    onSuccess: () => {
      utils.list.getAll.invalidate()
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (title.trim()) {
      updateList.mutate({ id, title: title.trim() })
    }
  }

  return (
    <div className="flex justify-between items-center p-2">
      {isEditing ? (
        <form onSubmit={handleSubmit} className="flex-1">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border rounded px-2 py-1"
            autoFocus
            onBlur={() => setIsEditing(false)}
          />
        </form>
      ) : (
        <h3
          className="text-lg font-semibold cursor-pointer"
          onClick={() => setIsEditing(true)}
        >
          {title}
        </h3>
      )}
      <Button
        variant="danger"
        onClick={() => deleteList.mutate({ id })}
        className="ml-2"
      >
        Delete
      </Button>
    </div>
  )
}