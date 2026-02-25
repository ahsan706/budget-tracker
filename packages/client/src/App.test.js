import React from 'react';

import { render, screen } from '@testing-library/react';

import App from './App';

vi.mock('i18next', async () => {
  const { mockI18next } = await import('./mock/translationMock');
  return { default: mockI18next };
});
vi.mock('react-i18next', async () => {
  const { mockReactI18next } = await import('./mock/translationMock');
  return mockReactI18next;
});
vi.mock('@auth0/auth0-react', async () => {
  const { auth0Mock } = await import('./mock/auth0mock');
  return auth0Mock;
});
test('renders Budget Tracker', async () => {
  render(<App />);
  const linkElement = screen.getByText(/Budget Tracker/i);
  expect(linkElement).toBeInTheDocument();
});
