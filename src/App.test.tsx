import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Todo component', () => {
  const component = render(<App />);
  const childEle = component.getByText("Task Manager App");
  expect(childEle).toBeInTheDocument();
});
