import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';
import CharacterPage from '../components/CharacterPage';
import { store } from '../store/store';
import {
  act,
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from '../../test-utils';

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

describe('Character Page', () => {
  it('should render a list of characters initially', async () => {
    // Render
    render(<CharacterPage />);
    // Assertions
    await waitFor(
      () => {
        expect(screen.queryByText('3-D MAN')).toBeInTheDocument();
      },
      { timeout: 3000 }
    );

    expect(screen.queryByText('AIR-WALKER (GABRIEL LAN)')).toBeInTheDocument();
  });
  it('should show characters of page 2', async () => {
    // Render
    render(<CharacterPage />);
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
    render(<App />);
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
    render(<App />);
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
  it.only('should redirect to character details when clicked on the character name', async () => {
    act(() => {
      render(<App />);
    });
    expect(screen.getByTestId('loader')).toBeInTheDocument();
    await waitForElementToBeRemoved(() => screen.queryByTestId('loader'), {
      timeout: 3000,
    });
    await waitFor(
      () => {
        screen.getByRole('link', {
          name: /3-d man/i,
        });
      },
      {
        timeout: 3000,
      }
    );

    const characterLink = screen.getByRole('link', {
      name: /3-d man/i,
    });

    await sleep(2);
    userEvent.click(characterLink);
    // expect(screen.getByTestId('loader')).toBeInTheDocument();
    // await waitForElementToBeRemoved(() => screen.queryByTestId('loader'), {
    //   timeout: 2000,
    // });

    await waitFor(
      () => {
        screen.getByText("Character's Comics");
      },
      { timeout: 3000 }
    );

    // expect(
    //   screen.getByRole('heading', {
    //     name: /character's comics/i,
    //   })
    // ).toBeInTheDocument();
    // expect(
    //   screen.getByRole('heading', {
    //     name: /character's stories/i,
    //   })
    // ).toBeInTheDocument();
  });

  it('should filter characters based on the dropdown list selected comicId', async () => {
    render(<CharacterPage />);

    // check if dropdown exists
    const selectDropdown = screen.getByRole('combobox', {
      name: /filter by comic/i,
    });

    //"1994" is the element in the select dropdown list
    userEvent.selectOptions(selectDropdown, ['1994']);

    await waitFor(
      () => {
        expect(screen.queryByText('APOCALYPSE')).toBeInTheDocument();
      },
      { timeout: 3000 }
    );
    expect(screen.queryByText('WOLVERINE')).toBeInTheDocument();
  });

  it('should filter characters based on the dropdown list selected storyId', async () => {
    render(<CharacterPage />);

    // check if dropdown exists
    const selectDropdown = screen.getByRole('combobox', {
      name: /filter by story/i,
    });

    //"479" is the element in the select dropdown list
    userEvent.selectOptions(selectDropdown, ['479']);

    await waitFor(
      () => {
        expect(screen.queryByText('HULKLING')).toBeInTheDocument();
        expect(screen.queryByText('WICCAN')).toBeInTheDocument();
      },
      { timeout: 3000 }
    );
  });
});
