import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPaginatedComics } from '../services/comics';
import { RootState } from '../store/store';
import * as actionsComics from '../store/comicsSlice';
import ComicList from './ComicList';
import Pagination from './Pagination';
import { HashLoader } from 'react-spinners';
import SearchBar from './SearchBar';
import TagList from './TagList';
import Button from './Button';
import './ComicPage.scss';

const formatTags = [
  'all',
  'comic',
  'magazine',
  'trade paperback',
  'hardcover',
  'digest',
  'graphic novel',
  'digital comic',
  'infinite comic',
];

function ComicPage() {
  const [loadingComics, setLoadingComics] = useState(true);
  const [totalItems, setTotalItems] = useState(0);
  const dispatch = useDispatch();
  const comics = useSelector((state: RootState) => state.comics);
  const filters = comics.filters;

  useEffect(() => {
    getPaginatedComics().then((data) => {
      if (data) {
        dispatch(actionsComics.comicsLoaded(data.results));
        setTotalItems(data.total);
      }
      setLoadingComics(false);
    });
  }, []);

  function handlePageChange(pageNumber: number) {
    dispatch(actionsComics.comicsFilteredByPage(pageNumber));

    setLoadingComics(true);

    getPaginatedComics(pageNumber, 20, filters.title, filters.format).then(
      (data) => {
        if (data) {
          dispatch(actionsComics.comicsLoaded(data.results));
          setTotalItems(data.total);
        }
        setLoadingComics(false);
      }
    );
  }

  function handleSearch(query: string) {
    dispatch(actionsComics.comicsFilteredByTitle(query));
    setLoadingComics(true);

    getPaginatedComics(1, 20, query, filters.format).then((data) => {
      if (data) {
        dispatch(actionsComics.comicsLoaded(data.results));
        setTotalItems(data.total);
      }
      setLoadingComics(false);
    });
  }

  function handleTagChange(tag: string) {
    dispatch(actionsComics.comicsFilteredByFormat(tag));
    setLoadingComics(true);

    getPaginatedComics(1, 20, filters.title, tag).then((data) => {
      if (data) {
        dispatch(actionsComics.comicsLoaded(data.results));
        setTotalItems(data.total);
      }
      setLoadingComics(false);
    });
  }

  return (
    <main className='comic-page'>
      <SearchBar searchFor='comic' onSubmitSearch={handleSearch} />
      <TagList onTagChange={handleTagChange} tags={formatTags} />
      {comics.hiddenComics.length > 0 && (
        <Button onClick={() => dispatch(actionsComics.comicsExposedAll())}>
          Show Hidden
        </Button>
      )}
      {loadingComics ? (
        <div className='loader-container'>
          <HashLoader data-testid='loader' color='#dc143c' />
        </div>
      ) : (
        <ComicList comics={comics.nonHiddenComics} />
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

export default ComicPage;
