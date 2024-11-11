import { fireEvent, render, screen } from '@testing-library/react';
import { TodosView } from './todosView';
import initialTodos from '@shared/data/todos.json';
import { ITodo } from '@shared/types/todo';
import { expect } from 'chai';
import sinon from 'sinon';
import { nanoid } from 'nanoid';

const TEST_TASK = 'Test Task';
sinon.stub({ nanoid }, 'nanoid').returns('mocked-nanoid-id');

describe('TodosView Component', () => {

  const addNewTask = (task: string) => {
    const field = screen.getByTestId('field');

    fireEvent.change(field, { target: { value: task } });
    fireEvent.keyDown(field, { key: 'Enter', code: 'Enter' });
  }

  it('Add new task', () => {
    render(<TodosView />);

    addNewTask(TEST_TASK);

    expect(screen.getByText(TEST_TASK)).to.exist;
  });

  it('Count tasks left', () => {
    render(<TodosView />);
    const counter = screen.getByTestId('counter');
    const activeTodosCount = initialTodos.filter((t: ITodo) => t.status === 'Active').length;

    expect(counter.textContent).to.equal(`${activeTodosCount} items left`);

    addNewTask(TEST_TASK);

    expect(counter.textContent).to.equal(`${activeTodosCount + 1} items left`);
  });

  it('Filters switching', () => {
    render(<TodosView />);

    initialTodos.forEach((t: ITodo) => expect(screen.getByTestId(`filter-${t.status}`)).to.exist);

    fireEvent.click(screen.getByTestId('filter-Active'));

    initialTodos.forEach((t: ITodo) => {
      t.status === 'Active'
        ? expect(screen.getByTestId(`filter-${t.status}`)).to.exist
        : expect(screen.getByTestId(`filter-Completed`)).to.be.null
    });

    fireEvent.click(screen.getByTestId('filter-Completed'));

    initialTodos.forEach((t: ITodo) => {
      t.status === 'Completed'
        ? expect(screen.getByTestId(`filter-${t.status}`)).to.exist
        : expect(screen.getByTestId(`filter-Active`)).to.be.null
    })
  });

  it('Reset all tasks', () => {
    render(<TodosView />);

    fireEvent.click(screen.getByTestId('reset'));

    expect(initialTodos.some((t: ITodo) => t.status === 'Completed')).to.be.false
  });
})