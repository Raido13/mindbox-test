import { App } from './app';

describe('App', () => {
  it('should render successfully', () => {
    cy.mount(<App />);
    cy.get('body').should('exist');
  })
})
