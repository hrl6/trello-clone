export type List = {
  id: string
  title: string
  order: number
  items: Item[]
  createdAt: Date
  updatedAt: Date
}

export type Item = {
  id: string
  content: string
  order: number
  listId: string
  createdAt: Date
  updatedAt: Date
}