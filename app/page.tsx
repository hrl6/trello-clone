'use client'

import { trpc } from '@/utils/trpc'
import { useState } from 'react'

export default function TestPage() {
  const [newListTitle, setNewListTitle] = useState('')
  const [newItemContent, setNewItemContent] = useState('')
  const [selectedListId, setSelectedListId] = useState('')

  const utils = trpc.useContext()
  const lists = trpc.list.getAll.useQuery()

  const createList = trpc.list.create.useMutation({
    onSuccess: () => utils.list.getAll.invalidate(),
  })
  const updateList = trpc.list.update.useMutation({
    onSuccess: () => utils.list.getAll.invalidate(),
  })
  const deleteList = trpc.list.delete.useMutation({
    onSuccess: () => utils.list.getAll.invalidate(),
  })
  const createItem = trpc.item.create.useMutation({
    onSuccess: () => utils.list.getAll.invalidate(),
  })
  const deleteItem = trpc.item.delete.useMutation({
    onSuccess: () => utils.list.getAll.invalidate(),
  })

  const handleCreateList = (e: React.FormEvent) => {
    e.preventDefault()
    if (newListTitle.trim()) {
      createList.mutate({ title: newListTitle })
      setNewListTitle('')
    }
  }

  const handleCreateItem = (e: React.FormEvent) => {
    e.preventDefault()
    if (newItemContent.trim() && selectedListId) {
      createItem.mutate({ 
        content: newItemContent,
        listId: selectedListId
      })
      setNewItemContent('')
    }
  }

  if (lists.isLoading) return <div>Loading...</div>
  if (lists.isError) return <div>Error: {lists.error.message}</div>

  return (
    <div>
      <h1 className='text-2xl font-bold'>test backend</h1>
      
      {/* show all lists & items */}
      <div className='flex gap-6'>
        {lists.data?.map((list) => (
          <div key={list.id} className='bg-gray-400'>
            <div className='flex'>
              <h3 className='text-xl font-semibold'>{list.title}</h3>
              <button
                onClick={() => deleteList.mutate({ id: list.id })}
                className='bg-red-400'
              >
                Delete List
              </button>
            </div>
            <ul className="space-y-2">
              {list.items.map((item) => (
                <li key={item.id} >
                  <span>- {item.content}</span>
                  <button
                    onClick={() => deleteItem.mutate({ id: item.id })}
                    className='bg-red-800 text-white'
                  >
                    Delete Item
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* create list container */}
      <div>
        <h2 className='italic'>Create New List</h2>
        <form onSubmit={handleCreateList}>
          <input
            type="text"
            value={newListTitle}
            onChange={(e) => setNewListTitle(e.target.value)}
            placeholder="List Title"
            className='border-2'
          />
          <button
            type="submit"
            className='bg-blue-400'
          >
            Create List
          </button>
        </form>
      </div>

      {/* create item after choose list */}
      <div>
        <h2>Create New Item</h2>
        <form onSubmit={handleCreateItem}>
          <div>
            <select
              value={selectedListId}
              onChange={(e) => setSelectedListId(e.target.value)}
            >
              <option value="">Select a List</option>
              {lists.data?.map((list) => (
                <option key={list.id} value={list.id}>
                  {list.title}
                </option>
              ))}
            </select>
          </div>
          <div>
            <input
              type="text"
              value={newItemContent}
              onChange={(e) => setNewItemContent(e.target.value)}
              placeholder="Item Content"
              className='border-2'
            />
            <button
              type="submit"
              disabled={!selectedListId}
              className='bg-green-400'
            >
              Create Item
            </button>
          </div>
        </form>
      </div>
    
    </div>
  )
}