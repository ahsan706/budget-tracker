import React from 'react';

import { render, screen } from '@testing-library/react';

import App from './App';
import * as Auth from './context/authContext';
jest.mock('i18next', () => require('./mock/translationMock').mockI18next);

jest.mock('react-i18next', () => require('./mock/translationMock').mockReactI18next);
test('renders Budget Tracker', async () => {
  jest.spyOn(Auth, 'useAuthContext').mockImplementation(() => {
    return { isAuth: true };
  });
  render(<App />);
  const linkElement = screen.getByText(/Budget Tracker/i);
  expect(linkElement).toBeInTheDocument();
});
