import { useCallback, useEffect, useState } from "react";
import { ITodo } from "@shared/types/todo";
import { nanoid } from "nanoid";
import { TaskStatus } from "@shared/enums/taskStatus";
import { addTodo as addTodoToDB, getTodos, updateTodo, deleteTodo } from "@shared/db/db";

export const useAddTodo = () => {
  const [todos, setTodos] = useState<ITodo[]>([]);

  useEffect(() => {
    const loadTodos = async () => {
      const todosFromDB = await getTodos();
      setTodos(todosFromDB as ITodo[]);
    }

    loadTodos()
  }, []);

  const addTodo = useCallback(async (newTask: string) => {
    const newTodo = {
      id: nanoid(),
      task: newTask,
      status: TaskStatus.Active
    }
    setTodos(prevTodos => [...prevTodos, newTodo]);

    await addTodoToDB(newTodo);
  }, []);

  const clearTodos = useCallback(async () => {
    setTodos(prevTodos => {
      const activeTodos = prevTodos.filter(t => t.status === TaskStatus.Active);
      const completedTodos = prevTodos.filter(t => t.status === TaskStatus.Completed);
    
      Promise.all(completedTodos.map(t => deleteTodo(t.id)));

      return activeTodos
    })
  }, []);

  const toggleTodoStatus = useCallback(async (id: string) => {
    setTodos(prevTodos => {
      const updatedTodos = prevTodos.map(t => t.id === id ? { ...t, status: t.status === TaskStatus.Active ? TaskStatus.Completed : TaskStatus.Active } : t);
      const updatedTodo = updatedTodos.find(t => t.id === id);

      if (updateTodo && updatedTodos) {
        updateTodo(updatedTodo as ITodo)
      }

      return updatedTodos
    })
  }, []);

  return { todos, addTodo, clearTodos, toggleTodoStatus }
}
