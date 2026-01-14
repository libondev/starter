import { create } from 'zustand'

import { getTodoList, type TodoItem } from '@/apis/todo'

interface TodoStore {
  todos: TodoItem[]
  fetchTodos: () => Promise<void>
  addTodo: (todo: TodoItem) => void
  removeTodo: (id: number) => void
}

export const useTodoStore = create<TodoStore>((set) => ({
  todos: [],
  fetchTodos: async () => {
    const res = await getTodoList()
    set({ todos: res.todos })
  },
  addTodo: (todo: TodoItem) => set((state) => ({ todos: [...state.todos, todo] })),
  removeTodo: (id: number) =>
    set((state) => ({ todos: state.todos.filter((todo) => todo.id !== id) })),
}))
