import { ITodo } from "@shared/types/todo";
import s from './todos.module.scss';
import { Icon } from "../icons/icons";
import { TaskStatus } from '@shared/enums/taskStatus';
import cn from 'classnames';

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

interface TodoProps {
  todo: ITodo;
  toggleTodoStatus: (id: string) => void;
}

const Todo = ({ todo, toggleTodoStatus }: TodoProps) => {
  return (
    <li className={s.todo}>
      <label className={cn(s.todo__task, todo.status === TaskStatus.Completed && s.todo__task__completed)}>
        <span className={cn(s.todo__status, todo.status === TaskStatus.Active && s.todo__status__active)}>
          {todo.status === TaskStatus.Completed && <Icon iconName="checkbox" style={{ width: '24px', height: '24px', fill: 'currentColor' }} />}
          <input data-testid={`checkbox`} className={s.todo__input} type="checkbox" checked={todo.status === TaskStatus.Completed} onChange={() => toggleTodoStatus(todo.id)} />
        </span>
        {todo.task}
      </label>
    </li>
  )
}
