import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../src/App';
import { applyMiddleware, createStore, Store } from 'redux';
import reducer, { AppState } from './reducer';
import { AppAction } from './actions';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';

test('renders click me button', () => {
  const store: Store<AppState, AppAction> = createStore(reducer, applyMiddleware(thunk));

  render(<Provider store={store}><App></App></Provider>);
  const buttonElement = screen.getByText(/Click me./i);
  expect(buttonElement).toBeInTheDocument();
  expect(buttonElement.nodeName).toBe('BUTTON');
  const headerElement = screen.getByText(/My Restaurant/);
  expect(headerElement.nodeName).toBe('H1');
});
