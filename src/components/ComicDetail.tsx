import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { HashLoader } from 'react-spinners';
import { ICharacter } from '../models/character';
import { IStory } from '../models/story';
import { getCharactersByComic } from '../services/characters';
import { getStoriesByComic } from '../services/stories';
import CharacterList from './CharacterList';
import ItemDetail from './ItemDetail';
import StoryList from './StoryList';
import './ComicDetail.scss';
import { getComicDetail } from '../services/comics';
import { IComic } from '../models/comic';
import ToggleButton from './ToggleButton';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../store/comicsSlice';
import { RootState } from '../store/store';
import ImageGallery from './ImageGallery';
import { FaBookmark, FaRegBookmark } from 'react-icons/fa';

function ComicDetail() {
  const [comic, setComic] = useState<IComic | null>(null);
  const [characters, setCharacters] = useState<ICharacter[]>([]);
  const [stories, setStories] = useState<IStory[]>([]);
  const [loadingCharacters, setLoadingCharacters] = useState(true);
  const [loadingStories, setLoadingStories] = useState(true);
  const [loadingComic, setLoadingComic] = useState(true);
  const { id } = useParams();

  const favComics = useSelector(
    (state: RootState) => state.comics.favoriteComics
  );
  const [isFavComic, setIsFavComic] = useState(
    () => favComics.findIndex((favComic) => favComic.id === Number(id)) !== -1
  );
  const dispatch = useDispatch();

  useEffect(() => {
    getComicDetail(Number(id)).then((data) => {
      if (data) {
        setComic(data);
      }
      setLoadingComic(false);
    });

    getCharactersByComic(Number(id)).then((data) => {
      if (data) {
        setCharacters(data.results);
      }
      setLoadingCharacters(false);
    });

    getStoriesByComic(Number(id)).then((data) => {
      if (data) {
        setStories(data.results);
      }
      setLoadingStories(false);
    });
  }, []);

  function handleClick() {
    setIsFavComic((prevIsFavComic) => !prevIsFavComic);

    if (isFavComic) {
      dispatch(actions.comicUnBookmarked(Number(id)));
    } else {
      if (comic) {
        dispatch(actions.comicBookmarked(comic));
      }
    }
  }

  return (
    <main className='comic-detail'>
      {loadingComic ? (
        <HashLoader color='#dc143c' />
      ) : (
        <div className='comic-detail__header'>
          <ItemDetail
            thumbnail={comic?.thumbnail}
            title={comic?.title}
            description={comic?.description}
          />
          <ToggleButton
            toggleOn={isFavComic}
            onToggle={handleClick}
            showOnToggleOn={<FaBookmark />}
            showOnToggleOff={<FaRegBookmark />}
          />
          {comic?.images && (
            <div className='comic-detail__images'>
              <h2 className='image-galley__title'>Images</h2>
              <ImageGallery images={comic.images} />
            </div>
          )}
        </div>
      )}
      <section className='comic-detail__section'>
        <h2>Comic&apos;s Characters</h2>
        {loadingCharacters ? (
          <HashLoader color='#dc143c' />
        ) : (
          <CharacterList characters={characters} />
        )}
      </section>
      <section className='comic-detail__section'>
        <h2>Comic&apos;s Stories</h2>
        {loadingStories ? (
          <HashLoader color='#dc143c' />
        ) : (
          <StoryList stories={stories} />
        )}
      </section>
    </main>
  );
}

export default ComicDetail;
