/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable quotes */
import {
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import CharacterPage from '../components/CharacterPage';
import { store } from '../store/store';
import App from '../App';

describe('Character Page', () => {
  it('should render a list of characters initially', async () => {
    // Render
    render(
      <Provider store={store}>
        <BrowserRouter>
          <CharacterPage />
        </BrowserRouter>
      </Provider>
    );
    // Assertions
    await waitFor(
      () => {
        expect(screen.queryByText('3-D MAN')).toBeInTheDocument();
        expect(
          screen.queryByText('AIR-WALKER (GABRIEL LAN)')
        ).toBeInTheDocument();
      },
      { timeout: 3000 }
    );
  });
  it('should show characters of page 2', async () => {
    // Render
    render(
      <Provider store={store}>
        <BrowserRouter>
          <CharacterPage />
        </BrowserRouter>
      </Provider>
    );
    // Interact / Act
    await waitFor(
      () => {
        const button = screen.getByRole('button', {
          name: /2/i,
        });
        userEvent.click(button);
      },
      { timeout: 3000 }
    );
    // Assertions
    await waitFor(
      () => {
        expect(screen.queryByText('AJAK')).toBeInTheDocument();
      },
      { timeout: 3000 }
    );
  });
  it('should search for a character by its name', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <App />
        </MemoryRouter>
      </Provider>
    );
    await screen.findByText(/Search character/i);
    const searchBar = screen.getByPlaceholderText(/enter a name.../i);
    userEvent.type(searchBar, 'ajak');
    await waitFor(
      () => {
        expect(screen.queryByText(/AJAK/i)).toBeInTheDocument();
      },
      { timeout: 3000 }
    );
    userEvent.type(searchBar, '{backspace}{backspace}{backspace}{backspace}');
    await waitFor(
      () => {
        expect(screen.queryByText(/AJAK/i)).toBeNull();
        expect(screen.queryByText(/3-D MAN/i)).toBeInTheDocument();
      },
      { timeout: 3000 }
    );
  });
  it('should show no results when searching for an inexistent name', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <App />
        </MemoryRouter>
      </Provider>
    );
    await screen.findByText(/Search character/i);
    const searchBar = screen.getByPlaceholderText(/enter a name.../i);
    userEvent.type(searchBar, 'abc');
    await waitFor(
      () => {
        expect(
          screen.queryByText(/No characters to show/i)
        ).toBeInTheDocument();
      },
      { timeout: 3000 }
    );
  });
  it('should redirect to character details when clicked on the character name', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <App />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByTestId('loader')).toBeInTheDocument();
    await waitForElementToBeRemoved(() => screen.queryByTestId('loader'), {
      timeout: 3000,
    });
    const characterLink = screen.getByText('3-D MAN');
    userEvent.click(characterLink);
    // expect(screen.getByTestId('loader')).toBeInTheDocument();
    // await waitForElementToBeRemoved(() => screen.queryByTestId('loader'), {
    //   timeout: 2000,
    // });
    expect(screen.queryByText('3-D MAN')).toBeInTheDocument();
    expect(
      screen.getByRole('heading', {
        name: /character's comics/i,
      })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', {
        name: /character's stories/i,
      })
    ).toBeInTheDocument();
  });

  it('should filter characters based on the dropdown list selected comicId', async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <CharacterPage />
        </BrowserRouter>
      </Provider>
    );

    // check if dropdown exists
    const selectDropdown = await waitFor(
      () => screen.getByRole('combobox', { name: /filter by comic/i }),
      {
        timeout: 3000,
      }
    );
    expect(selectDropdown).toBeInTheDocument();

    //"1994" is the element in the select dropdown list
    userEvent.selectOptions(
      screen.getByRole('combobox', { name: /filter by comic/i }),
      ['1994']
    );

    await waitFor(
      () => {
        expect(screen.queryByText('APOCALYPSE')).toBeInTheDocument();
        expect(screen.queryByText('WOLVERINE')).toBeInTheDocument();
      },
      { timeout: 3000 }
    );
  });

  it('should filter characters based on the dropdown list selected storyId', async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <CharacterPage />
        </BrowserRouter>
      </Provider>
    );

    // check if dropdown exists
    const selectDropdown = await waitFor(
      () => screen.getByRole('combobox', { name: /filter by story/i }),
      {
        timeout: 3000,
      }
    );
    expect(selectDropdown).toBeInTheDocument();

    //"479" is the element in the select dropdown list
    userEvent.selectOptions(
      screen.getByRole('combobox', { name: /filter by story/i }),
      ['479']
    );

    await waitFor(
      () => {
        expect(screen.queryByText('HULKLING')).toBeInTheDocument();
        expect(screen.queryByText('WICCAN')).toBeInTheDocument();
      },
      { timeout: 3000 }
    );
  });
});
