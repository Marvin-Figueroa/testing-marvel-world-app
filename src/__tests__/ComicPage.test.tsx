/* eslint-disable quotes */
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import ComicPage from '../components/ComicPage';
import { store } from '../store/store';
import App from '../App';

describe('Comic Page', () => {
  it('should render a list of comics initially', async () => {
    // Render
    render(
      <Provider store={store}>
        <BrowserRouter>
          <ComicPage />
        </BrowserRouter>
      </Provider>
    );
    // Assertions
    await waitFor(
      () => {
        expect(screen.queryAllByText('MARVEL PREVIEWS (2017)')).toHaveLength(3);
        expect(screen.queryByText('ANT-MAN (2003) #2')).toBeInTheDocument();
      },
      { timeout: 3000 }
    );
  });
  it('should show comics of page 2', async () => {
    // Render
    render(
      <Provider store={store}>
        <BrowserRouter>
          <ComicPage />
        </BrowserRouter>
      </Provider>
    );
    // Interact / Act

    await waitFor(
      () => {
        expect(screen.queryAllByText('MARVEL PREVIEWS (2017)')).toHaveLength(3);
        expect(screen.queryByText('ANT-MAN (2003) #2')).toBeInTheDocument();
      },
      { timeout: 3000 }
    );

    const buttons = screen.getAllByRole('button', {
      name: /2/i,
    });

    userEvent.click(buttons[0]);
    // Assertions
    await waitFor(
      () => {
        expect(screen.queryByText('SILVER SURFER (1987)')).toBeInTheDocument();
      },
      { timeout: 3000 }
    );
  });
  it('should search for a comic by its name', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/comics']}>
          <App />
        </MemoryRouter>
      </Provider>
    );
    await screen.findByText(/Search comic/i);
    const searchBar = screen.getByPlaceholderText(/enter a name.../i);
    userEvent.type(searchBar, 'wasp');
    await waitFor(
      () => {
        expect(screen.queryByText('WASP (2023) #1')).toBeInTheDocument();
      },
      { timeout: 3000 }
    );
    userEvent.type(searchBar, '{backspace}{backspace}{backspace}{backspace}');
    await waitFor(
      () => {
        expect(screen.queryByText('WASP (2023) #1')).toBeNull();
        expect(screen.queryByText('STORM (2006)')).toBeInTheDocument();
      },
      { timeout: 3000 }
    );
  });
  it('should show no results when searching for an inexistent name', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/comics']}>
          <App />
        </MemoryRouter>
      </Provider>
    );
    await screen.findByText(/Search comic/i);
    const searchBar = screen.getByPlaceholderText(/enter a name.../i);
    userEvent.type(searchBar, 'abc');
    await waitFor(
      () => {
        expect(screen.queryByText('No comics to show.')).toBeInTheDocument();
      },
      { timeout: 3000 }
    );
  });

  it('should show comics filtered by the format selected in the tags', async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <ComicPage />
        </BrowserRouter>
      </Provider>
    );

    // check if tag exists and it is not checked
    const hardcoverTag = screen.getByLabelText('hardcover');
    expect(hardcoverTag).toBeInTheDocument();
    expect(hardcoverTag).not.toBeChecked();

    userEvent.click(hardcoverTag);
    expect(hardcoverTag).toBeChecked();

    await waitFor(
      () => {
        expect(screen.getByText('CIVIL WAR (HARDCOVER)')).toBeInTheDocument();
      },
      { timeout: 3000 }
    );
  });
});
