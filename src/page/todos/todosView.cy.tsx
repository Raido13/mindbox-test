import { Todos } from './todos';
import { TaskStatus } from '@shared/enums/taskStatus';
import { ITodo } from '@shared/types/todo';
import { nanoid } from 'nanoid';
import { addTodo, clearAllTodos } from "@shared/db/db";

const TEST_TASK = 'Test Task';

const initialTodos: ITodo[] = [
  { id: nanoid(), task: 'Sample Task 1', status: TaskStatus.Active },
  { id: nanoid(), task: 'Sample Task 2', status: TaskStatus.Completed },
];

describe('TodosView Component', () => {
  const addNewTask = (task: string) => {
    const field = cy.get(`input[data-testid="field"]`);
    field.type(task).type('{enter}')
  }

  beforeEach(() => {
    cy.wrap(clearAllTodos()).then(() => {
      return Promise.all(initialTodos.map((todo) => addTodo(todo)));
    });

    cy.stub({ nanoid }, 'nanoid').returns('mocked-nanoid-id');
    cy.mount(<Todos />)
  });

  it('Add new task', () => {
    addNewTask(TEST_TASK);

    cy.get("label").contains(TEST_TASK);
  });

  it('Count tasks left', () => {
    const activeTodosCount = initialTodos.filter((t) => t.status === TaskStatus.Active).length;

    cy.get(`[data-testid="counter"]`).should('contain', `${activeTodosCount} items left`);

    addNewTask(TEST_TASK);
    
    cy.get(`[data-testid="counter"]`).should('contain', `${activeTodosCount + 1} items left`);
  });

  it('Filters switching', () => {
    initialTodos.forEach((t) => {
      cy.get(`[data-testid="filter-${t.status}"]`).should('exist');
    });

    cy.get('[data-testid="filter-Active"]').click();

    initialTodos.forEach((t: ITodo) => {
      t.status === TaskStatus.Active && cy.get(`[data-testid="checkbox"]`).should('exist').should('be.not.checked')
    });

    cy.get('[data-testid="filter-Completed"]').click();

    initialTodos.forEach((t: ITodo) => {
      t.status === TaskStatus.Completed && cy.get(`[data-testid="checkbox"]`).should('exist').should('be.checked')
    })
  });

  it('Remove Completed Tasks', () => {
    cy.get('[data-testid="reset"]').click();

    cy.get('[data-testid^="checkbox"]').each(($checkbox) => {
      cy.wrap($checkbox).should('not.be');
    });
  });
})
