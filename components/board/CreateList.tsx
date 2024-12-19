'use client'

import { useState } from 'react'
import { trpc } from '@/utils/trpc'
import { Button } from '../ui/Button'
import { Plus } from 'lucide-react';

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
        className="min-w-64 h-12 bg-slate-400/80 hover:bg-slate-500 flex justify-center items-center gap-2 pr-4"
      >
        <Plus size={20}/>Add new list
      </Button>
    )
  }

  return (
    <div className="min-w-80 max-h-48 border- bg-gray-100 border-[0.5px] border-gray-300 rounded-lg p-2">
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
          <Button type="submit" className='flex-1'>Create List</Button>
          <Button
            type="button"
            variant="ghost"
            className="flex-1"
            onClick={() => setIsCreating(false)}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  )
}
