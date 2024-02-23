import { render, screen } from '@testing-library/react';
import App3 from './App';

test('renders learn react link', () => {
  render(<App3 />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
