import { render, screen } from '@testing-library/react';
import NotFound from '../components/NotFound';

describe('NotFound component', () => {
  it('should show the correct text', () => {
    render(<NotFound />);

    expect(screen.getByText('Oops!')).toBeInTheDocument();
    expect(
      screen.getByText('The page you were looking for does not exists!')
    ).toBeInTheDocument();
  });
});
