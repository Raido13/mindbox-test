import { useState } from "react";
import { ITodo } from "@shared/types/todo";
import { nanoid } from "nanoid";

export const useAddTodo = () => {
  const [todos, setTodos] = useState<ITodo[]>([]);

  const addTodo = (newTask: string) => {
    const newTodo = {
      id: global.__IS_TEST__ ? 'mocked-nanoid-id' : nanoid(),
      task: newTask,
      status: 'Active'
    }
    setTodos([...todos, newTodo])
  }

  const setInitialTodos = (todosFromJson: ITodo[]) => {
    setTodos(todosFromJson);
  };

  const clearTodos = () => {
    const updatedTodos = todos.map(t => ({ ...t, status: 'Active' }));
    setTodos(updatedTodos);
  };

  const toggleTodoStatus = (id: string) => {
    const updatedTodos = todos.map(t => t.id === id ? { ...t, status: t.status === 'Active' ? 'Completed' : 'Active' } : t);
    setTodos(updatedTodos);
  }

  return { todos, addTodo, clearTodos, setInitialTodos, toggleTodoStatus }
}
