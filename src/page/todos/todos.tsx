import { useAddTodo } from "@shared/hooks/useAddTodo";
import { TodosView } from "./view/todosView";

export const Todos = () => {
  const { todos, addTodo, clearTodos, toggleTodoStatus } = useAddTodo();

  return (
    <TodosView todos={todos} addTodo={addTodo} clearTodos={clearTodos} toggleTodoStatus={toggleTodoStatus} />
  )
}
