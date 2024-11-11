import { Filters } from '@shared/ui/filters/filters';
import s from './todosView.module.scss';
import { useAddTodo } from '@shared/hooks/useAddTodo';
import { Todos } from '@shared/ui/todos/todos';
import { KeyboardEvent, useEffect, useMemo, useState } from 'react';
import initialTodos from '@shared/data/todos.json';
import { Icon } from '@shared/ui/icons/icons';

type TProps = {
  title?: string;
  clearActionName?: string
}

export const TodosView = ({title = 'todos', clearActionName = 'Clear completed'}: TProps) => {
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const { todos, addTodo, clearTodos, setInitialTodos, toggleTodoStatus } = useAddTodo();

  useEffect(() => {
    setInitialTodos(initialTodos);
  }, [])

  const counterLeft = useMemo(() => todos.reduce((c, t) => t.status === 'Active' ? ++c : c, 0), [todos]);
  const filteredTodos = useMemo(() => activeFilter !== 'All' ? todos.filter(t => t.status === activeFilter) : todos, [activeFilter, todos])

  const addNewTask = (task: string) => {
    addTodo(task);
  }

  const clearCheckboxes = () => {
    clearTodos();
  }

  return (
    <div className={s.todosView}>
      <div className={s.todosView__header}>
        <h2 className={s.todosView__title}>{title}</h2>
      </div>
      <div className={s.todosView__container}>
        <div className={s.todosView__inputContainer}>
          <Icon iconName='arrow' height={24} width={24} className={s.todosView__input__icon} />
          <input
            data-testid='field'
            type="text"
            placeholder='What needs to be done?'
            className={s.todosView__input}
            onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
              if (e.key === 'Enter' && e.currentTarget.value !== '') addNewTask(e.currentTarget.value)
            }}
          />
        </div>
        <Todos todosData={filteredTodos} toggleTodoStatus={toggleTodoStatus} />
        <div className={s.todosView__footer}>
          <span data-testid='counter' className={s.todosView__counter}>{`${counterLeft} items left`}</span>
          <Filters setActiveFilter={setActiveFilter} activeFilter={activeFilter} />
          <button data-testid='reset' className={s.todosView__clearButton} onClick={clearCheckboxes}>{clearActionName}</button>
        </div>
      </div>
    </div>
  )
}
