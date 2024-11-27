import { useContext } from "react";
import { TodosContext } from "../../page/todos/todos";

export const useTodosContext = () => {
  const context = useContext(TodosContext);

  if (!context) throw new Error('TodosContext should be defined');

  return context
}
