import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import CharacterList from './CharacterList';
import ComicList from './ComicList';
import StoryList from './StoryList';
import * as actionsCharacters from '../store/charactersSlice';
import * as actionsComics from '../store/comicsSlice';
import * as actionsStories from '../store/storiesSlice';

import './Bookmarks.scss';

function Bookmarks() {
  const dispatch = useDispatch();

  const characters = useSelector((state: RootState) => state.characters);
  const comics = useSelector((state: RootState) => state.comics);
  const stories = useSelector((state: RootState) => state.stories);

  function handleRemoveBookmarks() {
    dispatch(actionsCharacters.charactersUnBookmarkedAll());
    dispatch(actionsComics.comicsUnBookmarkedAll());
    dispatch(actionsStories.storiesUnBookmarkedAll());
  }

  return (
    <main className='bookmarks-container'>
      <button
        disabled={
          characters.nonHiddenFavoriteCharacters?.length === 0 &&
          comics.nonHiddenFavComics?.length === 0 &&
          stories.nonHiddenFavStories?.length === 0
        }
        className='bookmarks-remove-btn'
        onClick={handleRemoveBookmarks}>
        Remove All Bookmarks
      </button>
      <section className='characters-section'>
        <h2>Favorite Characters</h2>
        {<CharacterList characters={characters.nonHiddenFavoriteCharacters} />}
      </section>
      <section className='comics-section'>
        <h2>Favorite Comics</h2>
        {<ComicList comics={comics.nonHiddenFavComics} />}
      </section>
      <section className='stories-section'>
        <h2>Favorite Stories</h2>
        {<StoryList stories={stories.nonHiddenFavStories} />}
      </section>
    </main>
  );
}

export default Bookmarks;
