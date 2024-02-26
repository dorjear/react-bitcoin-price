import { render, screen } from '@testing-library/react';
import App from './App';

test('App home page', () => {
  render(<App />);
  const bitcoinRatelinkElement = screen.getByText(/Bitcoin Rates/i);
  expect(bitcoinRatelinkElement).toBeInTheDocument();

  const emailLabelElement = screen.getAllByText(/Email/i)[0];
  expect(emailLabelElement).toBeInTheDocument();

  screen.debug()

});
