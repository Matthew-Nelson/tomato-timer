import React from 'react';
import { render, unmountComponentAtNode } from '@testing-library/react';
import { CookiesProvider } from 'react-cookie';
import App from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  render(
    <CookiesProvider>
      <App />
    </CookiesProvider>,
    div
  );
  unmountComponentAtNode(div);
});
