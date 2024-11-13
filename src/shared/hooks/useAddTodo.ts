import { useEffect, useState } from "react";
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
  }, [])

  const addTodo = async (newTask: string) => {
    const newTodo = {
      id: nanoid(),
      task: newTask,
      status: TaskStatus.Active
    }
    setTodos([...todos, newTodo]);

    await addTodoToDB(newTodo);
  }

  const clearTodos = async () => {
    const activeTodos = todos.filter(t => t.status === TaskStatus.Active);
    const completedTodos = todos.filter(t => t.status === TaskStatus.Completed);
    
    setTodos(activeTodos);
    await Promise.all(completedTodos.map(t => deleteTodo(t.id)));
  };

  const toggleTodoStatus = async (id: string) => {
    const updatedTodos = todos.map(t => t.id === id ? { ...t, status: t.status === TaskStatus.Active ? TaskStatus.Completed : TaskStatus.Active } : t);
    const updatedTodo = updatedTodos.find(t => t.id === id);
    
    setTodos(updatedTodos);

    if (updateTodo) {
      await updateTodo(updatedTodo as ITodo)
    }
  }

  return { todos, addTodo, clearTodos, toggleTodoStatus }
}
