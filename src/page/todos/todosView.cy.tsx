import { Todos } from './todos';
import { TodoStatus } from '@shared/enums/todoStatus';
import { ITodo } from '@shared/types/todo';
import { nanoid } from 'nanoid';
import { addTodo, clearAllTodos } from "@shared/db/db";

const TEST_TODO = 'Test Todo';

const initialTodos: ITodo[] = [
  { id: nanoid(), todo: 'Sample Todo 1', status: TodoStatus.Active },
  { id: nanoid(), todo: 'Sample Todo 2', status: TodoStatus.Completed },
];

describe('TodosView Component', () => {
  const addNewTodo = (todo: string) => {
    const field = cy.get(`input[data-testid="field"]`);
    field.type(todo).type('{enter}')
  }

  beforeEach(() => {
    cy.wrap(clearAllTodos()).then(() => {
      return Promise.all(initialTodos.map((todo) => addTodo(todo)));
    });

    cy.stub({ nanoid }, 'nanoid').returns('mocked-nanoid-id');
    cy.mount(<Todos />)
  });

  it('Add new todo', () => {
    addNewTodo(TEST_TODO);

    cy.get("label").contains(TEST_TODO);
  });

  it('Count todos left', () => {
    const activeTodosCount = initialTodos.filter((t) => t.status === TodoStatus.Active).length;

    cy.get(`[data-testid="counter"]`).should('contain', `${activeTodosCount} items left`);

    addNewTodo(TEST_TODO);
    
    cy.get(`[data-testid="counter"]`).should('contain', `${activeTodosCount + 1} items left`);
  });

  it('Filters switching', () => {
    initialTodos.forEach((t) => {
      cy.get(`[data-testid="filter-${t.status}"]`).should('exist');
    });

    cy.get('[data-testid="filter-Active"]').click();

    initialTodos.forEach((t: ITodo) => {
      t.status === TodoStatus.Active && cy.get(`[data-testid="checkbox"]`).should('exist').should('be.not.checked')
    });

    cy.get('[data-testid="filter-Completed"]').click();

    initialTodos.forEach((t: ITodo) => {
      t.status === TodoStatus.Completed && cy.get(`[data-testid="checkbox"]`).should('exist').should('be.checked')
    })
  });

  it('Remove Completed Todos', () => {
    cy.get('[data-testid="reset"]').click();

    cy.get('[data-testid^="checkbox"]').each(($checkbox) => {
      cy.wrap($checkbox).should('not.be');
    });
  });
})
