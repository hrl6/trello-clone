'use client'

import { trpc } from '@/utils/trpc'
import { List } from './List'
import { CreateList } from './CreateList'
import { DragDropContext, Droppable, DropResult } from '@hello-pangea/dnd'
import { useAtom } from 'jotai'
import { boardAtom } from '@/stores/boardStore'
// import { useEffect } from 'react'

export function Board() {
  const [board, setBoard] = useAtom(boardAtom)
  const utils = trpc.useContext()
  
  const { data: lists, isLoading } = trpc.list.getAll.useQuery(undefined, {
    onSuccess: (data) => {
      setBoard({ lists: data })
    },
  })

  const reorderLists = trpc.list.reorder.useMutation({
    onSuccess: () => {
      utils.list.getAll.invalidate()
    },
  })

  const moveItem = trpc.item.move.useMutation({
    onSuccess: () => {
      utils.list.getAll.invalidate()
    },
  })

  const reorderItems = trpc.item.reorder.useMutation({
    onSuccess: () => {
      utils.list.getAll.invalidate()
    },
  })

  const handleDragEnd = (result: DropResult) => {
    const { destination, source, type } = result

    if (!destination) return

    // return nothing if same position
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return
    }

    // list reordering
    if (type === 'list') {
      const newLists = Array.from(board.lists)
      const [moved] = newLists.splice(source.index, 1)
      newLists.splice(destination.index, 0, moved)
      
      setBoard({ lists: newLists })
      
      reorderLists.mutate({
        lists: newLists.map((list, index) => ({
          id: list.id,
          order: index,
        })),
      })
      return
    }

    // item reordering and move to other list
    const sourceList = board.lists.find(
      list => list.id === source.droppableId
    )
    const destList = board.lists.find(
      list => list.id === destination.droppableId
    )

    if (!sourceList || !destList) return

    // a copy of the list to not directly mutate it
    const newLists = Array.from(board.lists)

    // in same list
    if (source.droppableId === destination.droppableId) {
      const listIndex = newLists.findIndex(list => list.id === sourceList.id)
      const newItems = Array.from(sourceList.items)
      const [moved] = newItems.splice(source.index, 1)
      newItems.splice(destination.index, 0, moved)
      
      newLists[listIndex] = {
        ...sourceList,
        items: newItems,
      }

      setBoard({ lists: newLists }) // update state in jotai
      
      reorderItems.mutate({
        items: newItems.map((item, index) => ({
          id: item.id,
          order: index,
        })),
      })
    } 
    // different list
    else {
      const sourceIndex = newLists.findIndex(list => list.id === sourceList.id)
      const destIndex = newLists.findIndex(list => list.id === destList.id)
      
      const newSourceItems = Array.from(sourceList.items)
      const newDestItems = Array.from(destList.items)
      
      const [moved] = newSourceItems.splice(source.index, 1)
      newDestItems.splice(destination.index, 0, moved)
      
      newLists[sourceIndex] = {
        ...sourceList,
        items: newSourceItems,
      }
      newLists[destIndex] = {
        ...destList,
        items: newDestItems,
      }

      setBoard({ lists: newLists })
      
      moveItem.mutate({
        id: moved.id,
        listId: destList.id,
        order: destination.index,
      })
    }
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="board" type="list" direction="horizontal">
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="h-[93vh] p-10 overflow-x-auto"
          >
            <div className="flex gap-4">
              {board.lists.map((list, index) => (
                <List key={list.id} list={list} index={index} />
              ))}
              {provided.placeholder}
              <CreateList />
            </div>
          </div>
        )}
      </Droppable>
    </DragDropContext>
  )
}