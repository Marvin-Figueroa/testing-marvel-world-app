import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPaginatedCharacters } from '../services/characters';
import { RootState } from '../store/store';
import * as actionsCharacters from '../store/charactersSlice';
import CharacterList from './CharacterList';
import Pagination from './Pagination';
import { HashLoader } from 'react-spinners';
import SearchBar from './SearchBar';
import './CharacterPage.scss';
import FilterSelect from './FilterSelect';
import { FaEye } from 'react-icons/fa';
import Button from './Button';

const comicsWithCharacters = ['1994', '1158', '1332', '1590', '1689', '1749'];
const storiesWithCharacters = ['477', '479', '488', '489', '498', '535'];

function CharacterPage() {
  const [loadingCharacters, setLoadingCharacters] = useState(true);
  const [totalItems, setTotalItems] = useState(0);
  const dispatch = useDispatch();
  const characters = useSelector((state: RootState) => state.characters);
  const filters = characters.filters;

  useEffect(() => {
    getPaginatedCharacters().then((data) => {
      if (data) {
        dispatch(actionsCharacters.charactersLoaded(data.results));
        setTotalItems(data.total);
      }
      setLoadingCharacters(false);
    });
  }, []);

  function handlePageChange(pageNumber: number) {
    dispatch(actionsCharacters.charactersFilteredByPage(pageNumber));
    setLoadingCharacters(true);

    getPaginatedCharacters(
      pageNumber,
      20,
      filters.name,
      filters.comic,
      filters.story
    ).then((data) => {
      if (data) {
        dispatch(actionsCharacters.charactersLoaded(data.results));
        setTotalItems(data.total);
      }
      setLoadingCharacters(false);
    });
  }

  function handleSearch(query: string) {
    dispatch(actionsCharacters.charactersFilteredByName(query));
    setLoadingCharacters(true);

    getPaginatedCharacters(1, 20, query, filters.comic, filters.story).then(
      (data) => {
        if (data) {
          dispatch(actionsCharacters.charactersLoaded(data.results));
          setTotalItems(data.total);
        }
        setLoadingCharacters(false);
      }
    );
  }

  function handleComicSelectFilterChange(comic: string) {
    const validatedComic = comic === 'Select an option' ? '' : comic;

    dispatch(actionsCharacters.charactersFilteredByComic(validatedComic));
    dispatch(actionsCharacters.charactersFilteredByStory(''));
    setLoadingCharacters(true);

    getPaginatedCharacters(1, 20, filters.name, validatedComic, '').then(
      (data) => {
        if (data) {
          dispatch(actionsCharacters.charactersLoaded(data.results));
          setTotalItems(data.total);
        }
        setLoadingCharacters(false);
      }
    );
  }

  function handleStorySelectFilterChange(story: string) {
    const validatedStory = story === 'Select an option' ? '' : story;
    dispatch(actionsCharacters.charactersFilteredByStory(validatedStory));
    dispatch(actionsCharacters.charactersFilteredByComic(''));
    setLoadingCharacters(true);

    getPaginatedCharacters(1, 20, filters.name, '', validatedStory).then(
      (data) => {
        if (data) {
          dispatch(actionsCharacters.charactersLoaded(data.results));
          setTotalItems(data.total);
        }
        setLoadingCharacters(false);
      }
    );
  }

  return (
    <main className='character-page'>
      <SearchBar searchFor='character' onSubmitSearch={handleSearch} />
      <div className='filters-container'>
        <FilterSelect
          label='comic'
          value={filters.comic}
          options={comicsWithCharacters}
          onFilterChange={handleComicSelectFilterChange}
        />
        <FilterSelect
          label='story'
          value={filters.story}
          options={storiesWithCharacters}
          onFilterChange={handleStorySelectFilterChange}
        />
      </div>
      {characters.hiddenCharacters.length > 0 && (
        <Button
          onClick={() => dispatch(actionsCharacters.charactersExposedAll())}>
          <FaEye /> Show Hidden
        </Button>
      )}
      {loadingCharacters ? (
        <div className='loader-container'>
          <HashLoader color='#dc143c' />
        </div>
      ) : (
        <CharacterList characters={characters.nonHiddenCharacters} />
      )}
      <Pagination
        totalItems={totalItems}
        pageSize={20}
        onPageChange={handlePageChange}
        siblingCount={1}
        currentPage={filters.page || 1}
      />
    </main>
  );
}

export default CharacterPage;
