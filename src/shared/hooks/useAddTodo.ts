import { useState } from "react";
import { ITodo } from "../../types/todo";
import { v4 as uuidv4 } from 'uuid';

export const useAddTodo = (initialTodos = []) => {
  const [todos, setTodos] = useState<ITodo[]>(initialTodos);

  const addTodo = (newTask: string) => {
    const newTodo = {
      id: uuidv4(),
      task: newTask,
      status: false
    }
    setTodos([...todos, newTodo])
  }

  const clearTodos = () => {
    const updatedTodos = todos.map(todo => ({ ...todo, completed: false }));
    setTodos(updatedTodos);
  };

  return { todos, addTodo, clearTodos }
}
