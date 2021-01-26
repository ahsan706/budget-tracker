import React from 'react';

import { render, screen } from '@testing-library/react';

import App from './App';
jest.mock('i18next', () => require('./mock/translationMock').mockI18next);
jest.mock('react-i18next', () => require('./mock/translationMock').mockReactI18next);
jest.mock('@auth0/auth0-react', () => require('./mock/auth0mock').auth0Mock);
test('renders Budget Tracker', async () => {
  render(<App />);
  const linkElement = screen.getByText(/Budget Tracker/i);
  expect(linkElement).toBeInTheDocument();
});
