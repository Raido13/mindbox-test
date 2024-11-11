import { fireEvent, render, screen } from '@testing-library/react';
import { Todo } from "./todo";
import { expect } from 'chai';
import sinon from 'sinon';

describe('TodosView Component', () => {
  it('Todo status change', () => {
    const mockToggleStatus = sinon.spy();
    const todoData = { id: '1', task: 'Sample Task', status: 'Active' };
  
    render(<Todo todo={todoData} toggleTodoStatus={mockToggleStatus} />);
  
    const checkbox = screen.getByTestId(`checkbox-${todoData.id}`);
    fireEvent.click(checkbox);
  
    expect(mockToggleStatus.calledWith(todoData.id)).to.be.true
  })
})