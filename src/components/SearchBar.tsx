/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import useDebounce from '../hooks/useDebounce';
import './SearchBar.scss';
interface Props {
  searchFor: string;
  onSubmitSearch: (searchQuery: string) => void;
}

const SearchBar = ({ onSubmitSearch, searchFor }: Props) => {
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 1000);

  useEffect(() => {
    onSubmitSearch(search);
  }, [debouncedSearch]);

  return (
    <div className='form-search'>
      <label className='form-search__label' htmlFor='search'>
        Search {searchFor}
      </label>
      <input
        className='form-search__input'
        type='search'
        name='search'
        id='search'
        placeholder='enter a name...'
        onChange={(e) => {
          setSearch(e.target.value);
        }}
        value={search}
        maxLength={50}
      />
    </div>
  );
};

export default React.memo(SearchBar);
