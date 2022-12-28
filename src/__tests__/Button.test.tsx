import { fireEvent, render, screen } from '@testing-library/react';
import Button from '../components/Button';

test('renders button with click me text', () => {
  render(<Button onClick={jest.fn()}>Click Me</Button>);
  const buttonElement = screen.getByText(/click me/i);
  expect(buttonElement).toBeInTheDocument();
});

test('onClick should be executed', () => {
  const mockOnClick = jest.fn();
  const { getByText } = render(<Button onClick={mockOnClick}>Click Me</Button>);
  const buttonElement = getByText(/click me/i);
  fireEvent.click(buttonElement, { click: 0 });
  expect(mockOnClick).toHaveBeenCalledTimes(1);
});
