import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { HashLoader } from 'react-spinners';
import { getPaginatedStories } from '../services/stories';
import { RootState } from '../store/store';
import * as actions from '../store/storiesSlice';
import Button from './Button';
import FilterSelect from './FilterSelect';
import Pagination from './Pagination';
import StoryList from './StoryList';
import './StoryPage.scss';

const charactersWithStories = [
  '1011334',
  '1017100',
  '1009144',
  '1010699',
  '1009146',
];

function StoryPage() {
  const [loadingStories, setLoadingStories] = useState(true);
  const [totalItems, setTotalItems] = useState(0);
  const dispatch = useDispatch();
  const stories = useSelector((state: RootState) => state.stories);
  const filters = stories.filters;

  useEffect(() => {
    getPaginatedStories().then((data) => {
      if (data) {
        dispatch(actions.storiesLoaded(data.results));
        setTotalItems(data.total);
      }
      setLoadingStories(false);
    });
  }, []);

  function handlePageChange(pageNumber: number) {
    dispatch(actions.storiesFilteredByPage(pageNumber));
    setLoadingStories(true);

    getPaginatedStories(pageNumber, 20, filters.character).then((data) => {
      if (data) {
        dispatch(actions.storiesLoaded(data.results));
        setTotalItems(data.total);
      }
      setLoadingStories(false);
    });
  }

  function handleCharacterSelectFilterChange(character: string) {
    const validatedCharacter =
      character === 'Select an option' ? '' : character;

    dispatch(actions.storiesFilteredByCharacter(validatedCharacter));

    setLoadingStories(true);

    getPaginatedStories(1, 20, validatedCharacter).then((data) => {
      if (data) {
        dispatch(actions.storiesLoaded(data.results));
        setTotalItems(data.total);
      }
      setLoadingStories(false);
    });
  }

  return (
    <main className='story-page'>
      <FilterSelect
        label='character'
        value={filters.character}
        options={charactersWithStories}
        onFilterChange={handleCharacterSelectFilterChange}
      />
      {stories.hiddenStories.length > 0 && (
        <Button onClick={() => dispatch(actions.storiesExposedAll())}>
          Show Hidden
        </Button>
      )}
      {loadingStories ? (
        <div className='loader-container'>
          <HashLoader color='#dc143c' />
        </div>
      ) : (
        <StoryList stories={stories.nonHiddenStories} />
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

export default StoryPage;
