/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable quotes */
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import StoryPage from '../components/StoryPage';
import { store } from '../store/store';

describe('Story Page', () => {
  it('should render a list of stories initially', async () => {
    // Render
    render(
      <Provider store={store}>
        <BrowserRouter>
          <StoryPage />
        </BrowserRouter>
      </Provider>
    );
    // Assertions
    await waitFor(
      () => {
        expect(
          screen.queryByText(
            /INVESTIGATING THE MURDER OF A TEENAGE GIRL, CAGE SUDDENLY LEARNS THAT A THREE-WAY GANG WAR IS UNDER WAY FOR CONTROL OF THE TURF/
          )
        ).toBeInTheDocument();
        expect(
          screen.queryByText(
            /THE SECOND VOLUME CONTAINING THE HULK'S EARLY ADVENTURES WITH APPEARANCES BY THE SUB-MARINER, THE MANDARIN, KA-ZAR AND NICK FURY/
          )
        ).toBeInTheDocument();
      },
      { timeout: 3000 }
    );
  });

  it('should show stories of page 3', async () => {
    // Render
    render(
      <Provider store={store}>
        <BrowserRouter>
          <StoryPage />
        </BrowserRouter>
      </Provider>
    );
    // Interact / Act
    await waitFor(
      () => {
        const buttons = screen.getAllByRole('button', {
          name: /3/i,
        });
        userEvent.click(buttons[0]);
      },
      { timeout: 3000 }
    );
    // Assertions
    await waitFor(
      () => {
        expect(
          screen.queryByText(
            /FROM THE TEEMING CITY STREETS OF MUTANT TOWN TO THE IRRADIATED RUINS OF THE ISLAND NATION GENOSHA, ONCE A HAVEN FOR MUTANTS, THE/
          )
        ).toBeInTheDocument();
        expect(
          screen.queryByText(
            /ONE OF THE X-MEN, JEAN GREY, HAS UNWITTINGLY ATTAINED POWER BEYOND IMAGINATION. AS THE DARK PHOENIX, SHE IS CAPABLE OF INCINERA/
          )
        ).toBeInTheDocument();
      },
      { timeout: 3000 }
    );
  });

  it('should filter stories based on the dropdown list selected characterId', async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <StoryPage />
        </BrowserRouter>
      </Provider>
    );

    // check if dropdown exists
    const selectDropdown = await waitFor(
      () => screen.getByRole('combobox', { name: /filter by character/i }),
      {
        timeout: 3000,
      }
    );
    expect(selectDropdown).toBeInTheDocument();

    //"1017100" is the characterId in the select dropdown list
    userEvent.selectOptions(
      screen.getByRole('combobox', { name: /filter by character/i }),
      ['1017100']
    );

    await waitFor(
      () => {
        expect(screen.queryByText('HULK (2008) #55')).toBeInTheDocument();
        expect(screen.queryByText('HULK (2008) #54')).toBeInTheDocument();
        expect(
          screen.queryByText(
            'COVER FROM FREE COMIC BOOK DAY 2013 (AVENGERS/HULK) (2013) #1'
          )
        ).toBeInTheDocument();
      },
      { timeout: 3000 }
    );
  });
});
