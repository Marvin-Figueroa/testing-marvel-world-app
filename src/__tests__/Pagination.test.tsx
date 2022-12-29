import { render, screen } from '@testing-library/react';
import Pagination from '../components/Pagination';

describe('Pagination Component', () => {
  it('should render a list of buttons with a left arrow, numbers from 1 to 5 and a right arrow', () => {
    // Render
    render(
      <Pagination
        pageSize={20}
        siblingCount={1}
        totalItems={100}
        onPageChange={jest.fn()}
        currentPage={1}
      />
    );
    // Assertions
    expect(screen.queryByText('1')).toBeInTheDocument();
    expect(screen.queryByText('3')).toBeInTheDocument();
    expect(screen.queryByText('5')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /next/i })).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /previous/i })
    ).toBeInTheDocument();
  });

  it('should not render anything', () => {
    // Render
    render(
      <Pagination
        pageSize={20}
        siblingCount={1}
        totalItems={20}
        onPageChange={jest.fn()}
        currentPage={1}
      />
    );
    // Assertions
    expect(screen.queryByText('1')).not.toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: /next/i })
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: /previous/i })
    ).not.toBeInTheDocument();
  });

  it('should render 1 button with 3 dots between the rest of the numbers', () => {
    // Render
    render(
      <Pagination
        pageSize={10}
        siblingCount={1}
        totalItems={100}
        onPageChange={jest.fn()}
        currentPage={1}
      />
    );
    // Assertions
    screen.queryAllByRole('button', { name: /ellipsis/i });
    expect(screen.queryAllByTestId('dots')).toHaveLength(1);
  });

  it('should render 2 buttons with 3 dots among the rest of the numbers', () => {
    // Render
    render(
      <Pagination
        pageSize={5}
        siblingCount={1}
        totalItems={100}
        onPageChange={jest.fn()}
        currentPage={10}
      />
    );
    // Assertions
    expect(screen.queryAllByTestId('dots')).toHaveLength(2);
  });
});
