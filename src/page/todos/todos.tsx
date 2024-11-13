import { TodosView } from "./view/todosView";
import rawTodos from '@shared/data/todos.json';
import { ITodo } from '@shared/types/todo';
import { TaskStatus } from '@shared/enums/taskStatus';

export const Todos = () => {

  const initialTodos: ITodo[] = (rawTodos as { id: string, task: string, status: string }[]).map(t => (
    { ...t, status: t.status as TaskStatus}
  ));

  return (
    <TodosView initialTodos={initialTodos} />
  )
}
