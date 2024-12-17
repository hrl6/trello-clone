export type List = {
  id: string
  title: string
  order: number
  items: Item[]
  createdAt: Date | string
  updatedAt: Date | string
}

export type Item = {
  id: string
  content: string
  order: number
  listId: string
  createdAt: Date | string
  updatedAt: Date | string
}