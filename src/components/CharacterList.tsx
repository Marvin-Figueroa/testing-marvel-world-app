import { ICharacter } from '../models/character';
import CharacterListItem from './CharacterListItem';
import './CharacterList.scss';

type Props = {
  characters: ICharacter[];
};

function CharacterList({ characters }: Props) {
  return characters.length > 0 ? (
    <div className='characters-container'>
      {characters?.map((character) => (
        <CharacterListItem key={character.id} character={character} />
      ))}
    </div>
  ) : (
    <p className='characters-message'>No characters to show.</p>
  );
}

export default CharacterList;
