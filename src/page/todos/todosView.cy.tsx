import { Todos } from './todos';
import rawTodos from '@shared/data/todos.json';
import { TaskStatus } from '@shared/enums/taskStatus';
import { ITodo } from '@shared/types/todo';
import { nanoid } from 'nanoid';

const TEST_TASK = 'Test Task';

describe('TodosView Component', () => {

  const initialTodos: ITodo[] = (rawTodos as { id: string, task: string, status: string }[]).map(t => (
    { ...t, status: t.status as TaskStatus}
  ));

  const addNewTask = (task: string) => {
    const field = cy.get(`input[data-testid="field"]`);
    field.type(task).type('{enter}')
  }

  beforeEach(() => {
    cy.stub({ nanoid }, 'nanoid').returns('mocked-nanoid-id');
    cy.mount(<Todos />)
  })

  it('Add new task', () => {
    addNewTask(TEST_TASK);

    cy.get("label").contains(TEST_TASK);
  });

  it('Count tasks left', () => {
    cy.get(`[data-testid="counter"]`).contains(/^\d+ items left$/).invoke('text').then((initialCounterText) => {
      const activeTodosCount = initialTodos.filter((t) => t.status === TaskStatus.Active).length;
      
      expect(initialCounterText).to.equal(`${activeTodosCount} items left`);
      
      addNewTask(TEST_TASK);
      
      cy.get(`[data-testid="counter"]`).contains(/^\d+ items left$/).invoke('text').then((updatedCounterText) => {
        expect(updatedCounterText).to.equal(`${activeTodosCount + 1} items left`);
      });
    });
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

  it('Reset all tasks', () => {
    cy.get('[data-testid="reset"]').click();

    cy.get('[data-testid^="checkbox"]').each(($checkbox) => {
      cy.wrap($checkbox).should('not.be.checked');
    });
  });
})
