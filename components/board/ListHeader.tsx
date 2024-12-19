'use client'

import { useState } from 'react'
import { Button } from '../ui/Button'
import { trpc } from '@/utils/trpc'
import { Trash2, PencilLine } from 'lucide-react';

type ListHeaderProps = {
  id: string
  title: string
}

export function ListHeader({ id, title: initialTitle }: ListHeaderProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [title, setTitle] = useState(initialTitle)
  const [buttonPressed, setButtonPressed] = useState(false)
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

  const handleBlur = () => {
    if (!buttonPressed) {
      // console.log('handle blur for ', initialTitle)
      setIsEditing(false)
      setTitle(initialTitle)
    }
  }

  const handleButtonClick = async (e: React.FormEvent) => {
    e.preventDefault()
    setButtonPressed(true)
    if (title.trim()) {
      try {
        await updateList.mutateAsync({ id, title: title.trim() })
      } catch (error) {
        console.error('Error update: ', error)
      }
    }
    setButtonPressed(false)
  }

  return (
    <div className="flex justify-between items-center py-2">
      {isEditing ? (
        <form onSubmit={handleSubmit} className="flex flex-1">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border rounded px-2 py-1 focus:outline-none focus:ring-1"
            autoFocus
            onBlur={handleBlur}
          />
          <Button
            className="ml-2 px-[10px]"
            onClick={handleButtonClick}
          >
            <PencilLine size={14} />
          </Button>
        </form>
      ) : (
        <h3
          className="text-lg font-semibold cursor-pointer hover:text-blue-600"
          onClick={() => setIsEditing(true)}
        >
          {title}
        </h3>
      )}
      <Button
        variant="danger"
        onClick={() => deleteList.mutate({ id })}
        className="ml-2 bg-transparent hover:bg-transparent text-slate-600 group"
      >
        <Trash2 size={18} className='group-hover:text-slate-800'/>
      </Button>
    </div>
  )
}