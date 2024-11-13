import { useState } from "react";
import { ITodo } from "@shared/types/todo";
import { nanoid } from "nanoid";
import { TaskStatus } from "@shared/enums/taskStatus";

export const useAddTodo = () => {
  const [todos, setTodos] = useState<ITodo[]>([]);

  const addTodo = (newTask: string) => {
    const newTodo = {
      id: nanoid(),
      task: newTask,
      status: TaskStatus.Active
    }
    setTodos([...todos, newTodo])
  }

  const setInitialTodos = (todosFromJson: ITodo[]) => {
    setTodos(todosFromJson);
  };

  const clearTodos = () => {
    const updatedTodos = todos.map(t => ({ ...t, status: TaskStatus.Active }));
    setTodos(updatedTodos);
  };

  const toggleTodoStatus = (id: string) => {
    const updatedTodos = todos.map(t => t.id === id ? { ...t, status: t.status === TaskStatus.Active ? TaskStatus.Completed : TaskStatus.Active } : t);
    setTodos(updatedTodos);
  }

  return { todos, addTodo, clearTodos, setInitialTodos, toggleTodoStatus }
}
