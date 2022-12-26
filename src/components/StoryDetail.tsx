import { ICharacter } from '../models/character';
import { IComic } from '../models/comic';
import CharacterList from './CharacterList';
import ItemDetail from './ItemDetail';
import ComicList from './ComicList';
import { IStory } from '../models/story';
import { useEffect, useState } from 'react';
import { getStoryDetail } from '../services/stories';
import { useParams } from 'react-router-dom';
import { getCharactersByStory } from '../services/characters';
import { getComicsByStory } from '../services/comics';
import { HashLoader } from 'react-spinners';
import ToggleButton from './ToggleButton';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../store/storiesSlice';
import { RootState } from '../store/store';
import './StoryDetail.scss';
import { FaBookmark, FaRegBookmark } from 'react-icons/fa';

function StoryDetail() {
  const [story, setStory] = useState<IStory | null>(null);
  const [comics, setComics] = useState<IComic[]>([]);
  const [characters, setCharacters] = useState<ICharacter[]>([]);
  const [loadingComics, setLoadingComics] = useState(true);
  const [loadingCharacters, setLoadingCharacters] = useState(true);
  const [loadingStory, setLoadingStory] = useState(true);
  const { id } = useParams();

  const favStories = useSelector(
    (state: RootState) => state.stories.favoriteStories
  );
  const [isFavStory, setIsFavStory] = useState(
    () => favStories.findIndex((favStory) => favStory.id === Number(id)) !== -1
  );
  const dispatch = useDispatch();

  useEffect(() => {
    getStoryDetail(Number(id)).then((data) => {
      if (data) {
        setStory(data);
      }
      setLoadingStory(false);
    });

    getCharactersByStory(Number(id)).then((data) => {
      if (data) {
        setCharacters(data.results);
      }
      setLoadingCharacters(false);
    });

    getComicsByStory(Number(id)).then((data) => {
      if (data) {
        setComics(data.results);
      }
      setLoadingComics(false);
    });
  }, []);

  function handleClick() {
    setIsFavStory((prevIsFavCharacter) => !prevIsFavCharacter);

    if (isFavStory) {
      dispatch(actions.storyUnBookmarked(Number(id)));
    } else {
      if (story) {
        dispatch(actions.storyBookmarked(story));
      }
    }
  }

  return (
    <main className='story-detail'>
      {loadingStory ? (
        <HashLoader color='#dc143c' />
      ) : (
        <div className='story-detail__header'>
          <ItemDetail
            thumbnail={story?.thumbnail}
            title={story?.title}
            description={story?.description}
          />
          <ToggleButton
            toggleOn={isFavStory}
            onToggle={handleClick}
            showOnToggleOn={<FaBookmark />}
            showOnToggleOff={<FaRegBookmark />}
          />
        </div>
      )}

      <section className='story-detail__section'>
        <h2>Story&apos;s Characters</h2>
        {loadingCharacters ? (
          <HashLoader color='#dc143c' />
        ) : (
          <CharacterList characters={characters} />
        )}
      </section>
      <section className='story-detail__section'>
        <h2>Story&apos;s Comics</h2>
        {loadingComics ? (
          <HashLoader color='#dc143c' />
        ) : (
          <ComicList comics={comics} />
        )}
      </section>
    </main>
  );
}

export default StoryDetail;
