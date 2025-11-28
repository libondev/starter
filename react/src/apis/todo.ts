import { useGet } from '@/hooks/use-fetch'

interface TodoResponse {
  todos: TodoItem[]
  total: number
  skip: number
  limit: number
}

export interface TodoItem {
  id: number
  todo: string
  userId: number
  completed: boolean
}

export function getTodoList() {
  return useGet<TodoResponse>(`https://dummyjson.com/todos?limit=10`)
}
