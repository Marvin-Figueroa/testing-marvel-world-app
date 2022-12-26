import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ICharacter } from '../models/character';
import './CharacterListItem.scss';
import ToggleButton from './ToggleButton';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../store/charactersSlice';
import { RootState } from '../store/store';
import { FaBookmark, FaEyeSlash, FaRegBookmark } from 'react-icons/fa';
import Button from './Button';

type Props = {
  character: ICharacter;
};

function CharacterListItem({ character }: Props) {
  const favCharacters = useSelector(
    (state: RootState) => state.characters.nonHiddenFavoriteCharacters
  );
  const [isFavCharacter, setIsFavCharacter] = useState(
    () =>
      favCharacters.findIndex((favChar) => favChar.id === character.id) !== -1
  );
  const dispatch = useDispatch();

  function handleClick() {
    setIsFavCharacter((prevIsFavCharacter) => !prevIsFavCharacter);

    if (isFavCharacter) {
      dispatch(actions.characterUnBookmarked(character.id));
    } else {
      dispatch(actions.characterBookmarked(character));
    }
  }

  return (
    <article className='character-item'>
      <img
        className='character-item__image'
        src={
          character.thumbnail.path +
          '/standard_xlarge.' +
          character.thumbnail.extension
        }
        alt={character.name}
      />
      <div className='character-item__footer'>
        <p className='character-item__name'>
          <Link to={`/characters/${character.id}`}>
            {character.name.toUpperCase()}
          </Link>
        </p>
        <div className='character-item__buttons'>
          <ToggleButton
            toggleOn={isFavCharacter}
            onToggle={handleClick}
            showOnToggleOn={<FaBookmark />}
            showOnToggleOff={<FaRegBookmark />}
          />
          <Button
            onClick={() => {
              dispatch(actions.characterHidden(character));
            }}>
            <FaEyeSlash />
            HIDE ITEM
          </Button>
        </div>
      </div>
    </article>
  );
}

export default CharacterListItem;
