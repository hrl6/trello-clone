'use client'

import { useState } from 'react'
import { trpc } from '@/utils/trpc'
import { Button } from '../ui/Button'

export function CreateList() {
  const [isCreating, setIsCreating] = useState(false)
  const [title, setTitle] = useState('')
  const utils = trpc.useContext()

  const createList = trpc.list.create.useMutation({
    onSuccess: () => {
      utils.list.getAll.invalidate()
      setTitle('')
      setIsCreating(false)
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (title.trim()) {
      createList.mutate({ title: title.trim() })
    }
  }

  if (!isCreating) {
    return (
      <Button
        onClick={() => setIsCreating(true)}
        className="w-80 h-12"
      >
        Add new list
      </Button>
    )
  }

  return (
    <div className="w-80 bg-gray-100 rounded-lg p-2">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter list title..."
          className="w-full border rounded px-2 py-1 mb-2"
          autoFocus
        />
        <div className="flex gap-2">
          <Button type="submit">Create List</Button>
          <Button
            type="button"
            variant="ghost"
            onClick={() => setIsCreating(false)}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  )
}
