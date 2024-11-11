import { fireEvent, render, screen } from '@testing-library/react';
import { TodosView } from './todosView';
import initialTodos from '@shared/data/todos.json';

describe('TodosView Component', () => {

  const addNewTask = (task: string) => {
    const field = screen.getByTestId('field');

    fireEvent.change(field, { target: { value: task } });
    fireEvent.keyDown(field, { key: 'Enter', code: 'Enter' });
  }

  const TEST_TASK = 'Test Task';

  test('Add new task', () => {
    render(<TodosView />);

    addNewTask(TEST_TASK);

    expect(screen.getByText(TEST_TASK)).toBeInTheDocument();
  });

  test('Count tasks left', () => {
    render(<TodosView />);
    const counter = screen.getByTestId('counter');
    const activeTodosCount = initialTodos.filter(t => t.status === 'Active').length;

    expect(counter).toHaveTextContent(`${activeTodosCount} items left`);

    addNewTask(TEST_TASK);

    expect(counter).toHaveTextContent(`${activeTodosCount + 1} items left`);
  });

  test('Filters switching', () => {
    render(<TodosView />);

    initialTodos.forEach(t => expect(screen.getByTestId(`filter-${t.status}`)).toBeInTheDocument());

    fireEvent.click(screen.getByTestId('filter-Active'));

    initialTodos.forEach(t => {
      t.status === 'Active'
        ? expect(screen.getByTestId(`filter-${t.status}`)).toBeInTheDocument()
        : expect(screen.getByTestId(`filter-Completed`)).not.toBeInTheDocument()
    });

    fireEvent.click(screen.getByTestId('filter-Completed'));

    initialTodos.forEach(t => {
      t.status === 'Completed'
        ? expect(screen.getByTestId(`filter-${t.status}`)).toBeInTheDocument()
        : expect(screen.getByTestId(`filter-Active`)).not.toBeInTheDocument()
    })
  })

  test('Reset all tasks', () => {
    render(<TodosView />);

    fireEvent.click(screen.getByTestId('reset'));

    expect(initialTodos.some(t => t.status === 'Completed')).toBeFalsy;
  });
})