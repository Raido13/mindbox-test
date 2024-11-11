import { ITodo } from "../../../types/todo";
import { Todo } from "../todo/todo";
import s from './todos.module.scss';

interface TodosProps {
  todosData: ITodo[];
  toggleTodoStatus: (id: string) => void;
}

export const Todos = ({ todosData, toggleTodoStatus }: TodosProps) => {
  return (
    <ul className={s.todos}>
      {todosData.map(t => <Todo todo={t} toggleTodoStatus={toggleTodoStatus} key={t.id} />)}
    </ul>
  )
}
