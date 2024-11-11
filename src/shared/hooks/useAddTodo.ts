import { useState } from "react";
import { ITodo } from "../../types/todo";
import { v4 as uuidv4 } from 'uuid';

export const useAddTodo = () => {
  const [todos, setTodos] = useState<ITodo[]>([]);

  const addTodo = (newTask: string) => {
    const newTodo = {
      id: uuidv4(),
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
