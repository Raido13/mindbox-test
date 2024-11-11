import { fireEvent, render, screen } from '@testing-library/react';
import { Todo } from "./todo";

test('Todo status change', () => {
  const mockToggleStatus = jest.fn();
  const todoData = { id: '1', task: 'Sample Task', status: 'Active' };

  render(<Todo todo={todoData} toggleTodoStatus={mockToggleStatus} />);

  const checkbox = screen.getByTestId(`checkbox-${todoData.id}`);
  fireEvent.click(checkbox);

  expect(mockToggleStatus).toHaveBeenCalledWith(todoData.id)
})