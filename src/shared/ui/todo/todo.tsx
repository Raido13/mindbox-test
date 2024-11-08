import { ITodo } from "../../../types/todo";
import s from './todo.module.scss';

interface TodoProps {
  todo: ITodo;
}

export const Todo = ({ todo }: TodoProps) => {
  return (
    <li className={s.Todo}>
      <input className={s.Todo__status} type="checkbox" checked={todo.status} />
      <label className={s.Todo__task}>{todo.task}</label>
    </li>
  )
}
