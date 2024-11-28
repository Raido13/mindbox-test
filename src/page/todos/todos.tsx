import { useTodos } from '@shared/hooks/useTodos';
import { TodosView } from './view/todosView';
import { ITodo } from '@shared/types/todo';
import { createContext } from 'react';

type TodosContextType = {
  todos: ITodo[];
  addTodo: (newTodo: string) => void;
  clearTodos: () => void;
  toggleTodoStatus: (id: string) => void;
};

export const TodosContext = createContext<TodosContextType | undefined>(
  undefined
);

export const Todos = () => {
  const todosContextValue = useTodos();

  return (
    <TodosContext.Provider value={todosContextValue}>
      <TodosView />
    </TodosContext.Provider>
  );
};
