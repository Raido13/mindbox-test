import { Filters } from '@shared/ui/filters/filters';
import s from './todosView.module.scss';
import { useAddTodo } from '@shared/hooks/useAddTodo';
import { Todos } from '@shared/ui/todos/todos';
import { KeyboardEvent } from 'react';

type TProps = {
  title?: string;
  actionName?: string
}

export const TodosView = ({title = 'todos', actionName = 'Clear completed'}: TProps) => {
  const { todos, addTodo, clearTodos } = useAddTodo();

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
      <div className={s.todosView__inputContainer}>
        <input
          type="text"
          placeholder='What needs to be done?'
          onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
            if (e.key === 'Enter' && e.currentTarget.value !== '') addNewTask(e.currentTarget.value)
          }}
        />
      </div>
      <Todos todosData={todos} />
      <div className={s.todosView__footer}>
        <span className={s.todosView__counter}></span>
        <Filters />
        <button onClick={clearCheckboxes}>{actionName}</button>
      </div>
    </div>
  )
}
