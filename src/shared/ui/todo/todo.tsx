import { ITodo } from '@shared/types/todo';
import { Icon } from "../icons/icons";
import s from './todo.module.scss';
import cn from 'classnames';

interface TodoProps {
  todo: ITodo;
  toggleTodoStatus: (id: string) => void;
}

export const Todo = ({ todo, toggleTodoStatus }: TodoProps) => {
  return (
    <li className={s.todo}>
      <label className={cn(s.todo__task, todo.status === 'Completed' && s.todo__task__active)}>
        <span className={cn(s.todo__status, todo.status === 'Active' && s.todo__status__active)}>
          {todo.status === 'Completed' && <Icon iconName="checkbox" style={{ width: '24px', height: '24px', fill: 'currentColor' }} />}
          <input data-testid={`checkbox`} className={s.todo__input} type="checkbox" checked={todo.status === 'Completed'} onChange={() => toggleTodoStatus(todo.id)} />
        </span>
        {todo.task}
      </label>
    </li>
  )
}
