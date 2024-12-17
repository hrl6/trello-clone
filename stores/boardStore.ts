import { atom } from 'jotai'
import type { List, Item } from '@/types'

export type BoardState = {
  lists: List[]
}

export const boardAtom = atom<BoardState>({ lists: [] })