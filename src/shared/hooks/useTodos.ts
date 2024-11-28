import { useCallback, useEffect, useState } from 'react';
import { ITodo } from '@shared/types/todo';
import { nanoid } from 'nanoid';
import { TodoStatus } from '@shared/enums/todoStatus';
import {
  addTodo as addTodoToDB,
  getTodos,
  updateTodo,
  deleteTodo,
} from '@shared/db/db';

export const useTodos = () => {
  const [todos, setTodos] = useState<ITodo[]>([]);

  useEffect(() => {
    const loadTodos = async () => {
      const todosFromDB = await getTodos();
      setTodos(todosFromDB as ITodo[]);
    };

    loadTodos();
  }, []);

  const addTodo = useCallback(async (newTodo: string) => {
    const todoToBeAdded = {
      id: nanoid(),
      todo: newTodo,
      status: TodoStatus.Active,
    };
    setTodos((prevTodos) => [...prevTodos, todoToBeAdded]);

    await addTodoToDB(todoToBeAdded);
  }, []);

  const clearTodos = useCallback(async () => {
    setTodos((prevTodos) => {
      const activeTodos = prevTodos.filter(
        (t) => t.status === TodoStatus.Active
      );
      const completedTodos = prevTodos.filter(
        (t) => t.status === TodoStatus.Completed
      );

      Promise.all(completedTodos.map((t) => deleteTodo(t.id)));

      return activeTodos;
    });
  }, []);

  const toggleTodoStatus = useCallback(async (id: string) => {
    setTodos((prevTodos) => {
      const updatedTodos = prevTodos.map((t) =>
        t.id === id
          ? {
              ...t,
              status:
                t.status === TodoStatus.Active
                  ? TodoStatus.Completed
                  : TodoStatus.Active,
            }
          : t
      );
      const updatedTodo = updatedTodos.find((t) => t.id === id);

      if (updateTodo && updatedTodos) {
        updateTodo(updatedTodo as ITodo);
      }

      return updatedTodos;
    });
  }, []);

  return { todos, addTodo, clearTodos, toggleTodoStatus };
};
