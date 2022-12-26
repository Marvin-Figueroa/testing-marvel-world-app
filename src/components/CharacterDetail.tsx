import { useEffect, useState } from 'react';
import HashLoader from 'react-spinners/HashLoader';
import { useParams } from 'react-router-dom';
import { ICharacter } from '../models/character';
import { IComic } from '../models/comic';
import { IStory } from '../models/story';
import { getComicsByCharacter } from '../services/comics';
import { getStoriesByCharacter } from '../services/stories';
import ComicList from './ComicList';
import ItemDetail from './ItemDetail';
import StoryList from './StoryList';
import { getCharacterDetail } from '../services/characters';
import ToggleButton from './ToggleButton';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../store/charactersSlice';
import { RootState } from '../store/store';
import { FaBookmark, FaRegBookmark } from 'react-icons/fa';
import './CharacterDetail.scss';

function CharacterDetail() {
  const [character, setCharacter] = useState<ICharacter | null>(null);
  const [comics, setComics] = useState<IComic[]>([]);
  const [stories, setStories] = useState<IStory[]>([]);
  const [loadingComics, setLoadingComics] = useState(true);
  const [loadingCharacter, setLoadingCharacter] = useState(true);
  const [loadingStories, setLoadingStories] = useState(true);
  const { id } = useParams();

  const favCharacters = useSelector(
    (state: RootState) => state.characters.favoriteCharacters
  );
  const [isFavCharacter, setIsFavCharacter] = useState(
    () => favCharacters.findIndex((favChar) => favChar.id === Number(id)) !== -1
  );
  const dispatch = useDispatch();

  useEffect(() => {
    getCharacterDetail(Number(id)).then((data) => {
      if (data) {
        setCharacter(data);
      }
      setLoadingCharacter(false);
    });

    getComicsByCharacter(Number(id)).then((data) => {
      if (data) {
        setComics(data.results);
      }
      setLoadingComics(false);
    });

    getStoriesByCharacter(Number(id)).then((data) => {
      if (data) {
        setStories(data.results);
      }
      setLoadingStories(false);
    });
  }, []);

  function handleClick() {
    setIsFavCharacter((prevIsFavCharacter) => !prevIsFavCharacter);

    if (isFavCharacter) {
      dispatch(actions.characterUnBookmarked(Number(id)));
    } else {
      if (character) {
        dispatch(actions.characterBookmarked(character));
      }
    }
  }

  return (
    <main className='character-detail'>
      {loadingCharacter ? (
        <HashLoader color='#dc143c' />
      ) : (
        <div className='character-detail__header'>
          <ItemDetail
            thumbnail={character?.thumbnail}
            title={character?.name}
            description={character?.description}
          />
          <ToggleButton
            toggleOn={isFavCharacter}
            onToggle={handleClick}
            showOnToggleOn={<FaBookmark />}
            showOnToggleOff={<FaRegBookmark />}
          />
        </div>
      )}

      <section className='character-detail__section'>
        <h2>Character&apos;s Comics</h2>
        {loadingComics ? (
          <HashLoader color='#dc143c' />
        ) : (
          <ComicList comics={comics} />
        )}
      </section>
      <section className='character-detail__section'>
        <h2>Character&apos;s Stories</h2>
        {loadingStories ? (
          <HashLoader color='#dc143c' />
        ) : (
          <StoryList stories={stories} />
        )}
      </section>
    </main>
  );
}

export default CharacterDetail;
