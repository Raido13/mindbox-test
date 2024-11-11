import { render } from '@testing-library/react'
import { App } from './app';
import { expect } from 'chai';

describe('App', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<App />)
    expect(baseElement).to.be.true;
  })
})
