import { ITodo } from "../../../types/todo";
import { Todo } from "../todo/todo";
import s from './todos.module.scss';

interface TodosProps {
  todosData: ITodo[];
}

export const Todos = ({ todosData }: TodosProps) => {
  return (
    <ul className={s.Todos}>
      {todosData.map(t => <Todo todo={t} key={t.id} />)}
    </ul>
  )
}
