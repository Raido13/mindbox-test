import React from 'react';
import { Filters } from '@shared/ui/filters/filters';
import s from './todosView.module.scss';
import { Todos } from '@shared/ui/todos/todos';
import { KeyboardEvent, useMemo, useState } from 'react';
import { Icon } from '@shared/ui/icons/icons';
import { Filters as FiltersEnum } from '@shared/enums/filters';
import { TodoStatus } from '@shared/enums/todoStatus';
import { useTodosContext } from '@shared/hooks/useTodosContext';

export const TodosView = () => {
  const [activeFilter, setActiveFilter] = useState<string>(FiltersEnum.All);
  const { todos, addTodo, clearTodos, toggleTodoStatus } = useTodosContext();
  const counterLeft = useMemo(() => todos.reduce((c, t) => t.status === TodoStatus.Active ? ++c : c, 0), [todos]);
  const filteredTodos = useMemo(() => activeFilter !== FiltersEnum.All ? todos.filter(t => t.status === activeFilter) : todos, [activeFilter, todos])

  const addNewTodo = (todo: string) => {
    addTodo(todo);
  }

  const removeCompleted = () => {
    clearTodos();
  }

  return (
    <div className={s.todosView}>
      <div className={s.todosView__header}>
        <h2 className={s.todosView__title}>{'todos'}</h2>
      </div>
      <div className={s.todosView__container}>
        <div className={s.todosView__inputContainer}>
          <Icon iconName='arrow' height={24} width={24} style={{ width: '24px', height: '24px', fill: 'currentColor' }} className={s.todosView__input__icon} />
          <input
            data-testid='field'
            type="text"
            placeholder='What needs to be done?'
            className={s.todosView__input}
            onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
              if (e.key === 'Enter' && e.currentTarget.value !== '') {
                addNewTodo(e.currentTarget.value);
                e.currentTarget.value = '';
              }
            }}
          />
        </div>
        <Todos todosData={filteredTodos} toggleTodoStatus={toggleTodoStatus} />
        <div className={s.todosView__footer}>
          <span data-testid='counter' className={s.todosView__counter}>{`${counterLeft} items left`}</span>
          <Filters setActiveFilter={setActiveFilter} activeFilter={activeFilter} />
          <button data-testid='reset' className={s.todosView__clearButton} onClick={removeCompleted}>{'Clear completed'}</button>
        </div>
      </div>
    </div>
  )
}
