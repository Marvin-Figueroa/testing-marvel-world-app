import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { IComic } from '../models/comic';
import { RootState } from '../store/store';
import * as actions from '../store/comicsSlice';
import ToggleButton from './ToggleButton';
import './ComicListItem.scss';
import { FaBookmark, FaEyeSlash, FaRegBookmark } from 'react-icons/fa';
import Button from './Button';

type Props = {
  comic: IComic;
};

function ComicListItem({ comic }: Props) {
  const favComics = useSelector(
    (state: RootState) => state.comics.nonHiddenFavComics
  );

  const [isFavComic, setIsFavComic] = useState(
    () => favComics?.findIndex((favCom) => favCom.id === comic.id) !== -1
  );

  const dispatch = useDispatch();

  function handleClick() {
    setIsFavComic((prevIsFavComic) => !prevIsFavComic);

    if (isFavComic) {
      dispatch(actions.comicUnBookmarked(comic.id));
    } else {
      dispatch(actions.comicBookmarked(comic));
    }
  }

  return (
    <article className='comic-item'>
      <img
        className='comic-item__image'
        src={
          comic.thumbnail.path + '/standard_xlarge.' + comic.thumbnail.extension
        }
        alt={comic.title}
      />
      <div className='comic-item__text'>
        <p className='comic-item__title'>
          <Link to={`/comics/${comic.id}`}>{comic.title.toUpperCase()}</Link>
        </p>
        <div className='comic-item__footer-buttons'>
          <ToggleButton
            toggleOn={isFavComic}
            onToggle={handleClick}
            showOnToggleOn={<FaBookmark />}
            showOnToggleOff={<FaRegBookmark />}
          />
          <Button
            onClick={() => {
              dispatch(actions.comicHidden(comic));
            }}>
            <FaEyeSlash />
            HIDE ITEM
          </Button>
        </div>
      </div>
    </article>
  );
}

export default ComicListItem;
