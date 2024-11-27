import React, { useMemo } from "react";
import { ITodo } from "@shared/types/todo";
import s from './todos.module.scss';
import { Icon } from "../icons/icons";
import { TodoStatus } from '@shared/enums/todoStatus';
import cn from 'classnames';

interface TodosProps {
  todosData: ITodo[];
  toggleTodoStatus: (id: string) => void;
}

export const Todos = ({ todosData, toggleTodoStatus }: TodosProps) => {
  const todosList = useMemo(() =>
    todosData.map(t => <Todo todo={t} toggleTodoStatus={toggleTodoStatus} key={t.id} />),
    [todosData, toggleTodoStatus]
  );

  return (
    <ul className={s.todos}>
      {todosList}
    </ul>
  )
}

interface TodoProps {
  todo: ITodo;
  toggleTodoStatus: (id: string) => void;
}

const Todo = React.memo(({ todo, toggleTodoStatus }: TodoProps) => {
  return (
    <li className={s.todo}>
      <label className={cn(s.todo__task, todo.status === TodoStatus.Completed && s.todo__task__completed)}>
        <span className={cn(s.todo__status, todo.status === TodoStatus.Active && s.todo__status__active)}>
          {todo.status === TodoStatus.Completed && <Icon iconName="checkbox" style={{ width: '24px', height: '24px', fill: 'currentColor' }} />}
          <input data-testid={`checkbox`} className={s.todo__input} type="checkbox" checked={todo.status === TodoStatus.Completed} onChange={() => toggleTodoStatus(todo.id)} />
        </span>
        {todo.todo}
      </label>
    </li>
  )
})
