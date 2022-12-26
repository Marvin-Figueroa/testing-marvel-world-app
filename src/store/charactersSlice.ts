import { ICharacter } from '../models/character';

// Initial State
interface filtersType {
  name?: string;
  comic?: string;
  story?: string;
  page?: number;
}
interface initialStateType {
  characters: ICharacter[];
  filters: filtersType;
  favoriteCharacters: ICharacter[];
  hiddenCharacters: ICharacter[];
  nonHiddenCharacters: ICharacter[];
  nonHiddenFavoriteCharacters: ICharacter[];
}

const initialState: initialStateType = {
  characters: [],
  filters: {
    name: '',
    comic: '',
    story: '',
    page: 1,
  },
  favoriteCharacters: [],
  hiddenCharacters: [],
  nonHiddenCharacters: [],
  nonHiddenFavoriteCharacters: [],
};

// Action types

const CHARACTERS_LOADED = 'characters/charactersLoaded';
const CHARACTERS_FILTERED_BY_NAME = 'characters/charactersFilteredByName';
const CHARACTERS_FILTERED_BY_COMIC = 'characters/charactersFilteredByComic';
const CHARACTERS_FILTERED_BY_STORY = 'characters/charactersFilteredByStory';
const CHARACTERS_FILTERED_BY_PAGE = 'characters/charactersFilteredByPage';
const CHARACTER_BOOKMARKED = 'characters/characterBookmarked';
const CHARACTER_UNBOOKMARKED = 'characters/characterUnBookmarked';
const CHARACTERS_UNBOOKMARKED_ALL = 'characters/charactersUnBookmarkedAll';
const CHARACTER_HIDDEN = 'characters/characterHidden';
const CHARACTERS_EXPOSED_ALL = 'characters/charactersExposedAll';

type CharacterActionType =
  | { type: 'characters/charactersLoaded'; payload: ICharacter[] }
  | { type: 'characters/charactersFilteredByName'; payload: string }
  | { type: 'characters/charactersFilteredByComic'; payload: string }
  | { type: 'characters/charactersFilteredByStory'; payload: string }
  | { type: 'characters/charactersFilteredByPage'; payload: number }
  | { type: 'characters/characterBookmarked'; payload: ICharacter }
  | { type: 'characters/characterUnBookmarked'; payload: number }
  | { type: 'characters/charactersUnBookmarkedAll' }
  | { type: 'characters/characterHidden'; payload: ICharacter }
  | { type: 'characters/charactersExposedAll' };

// Action Creators
export function charactersLoaded(characters: ICharacter[]) {
  return {
    type: CHARACTERS_LOADED,
    payload: characters,
  };
}

export function charactersFilteredByName(name: string) {
  return {
    type: CHARACTERS_FILTERED_BY_NAME,
    payload: name,
  };
}

export function charactersFilteredByComic(comic: string) {
  return {
    type: CHARACTERS_FILTERED_BY_COMIC,
    payload: comic,
  };
}

export function charactersFilteredByStory(story: string) {
  return {
    type: CHARACTERS_FILTERED_BY_STORY,
    payload: story,
  };
}

export function charactersFilteredByPage(page: number) {
  return {
    type: CHARACTERS_FILTERED_BY_PAGE,
    payload: page,
  };
}

export function characterBookmarked(character: ICharacter) {
  return {
    type: CHARACTER_BOOKMARKED,
    payload: character,
  };
}

export function characterUnBookmarked(characterId: number) {
  return {
    type: CHARACTER_UNBOOKMARKED,
    payload: characterId,
  };
}

export function charactersUnBookmarkedAll() {
  return {
    type: CHARACTERS_UNBOOKMARKED_ALL,
  };
}

export function characterHidden(character: ICharacter) {
  return {
    type: CHARACTER_HIDDEN,
    payload: character,
  };
}

export function charactersExposedAll() {
  return {
    type: CHARACTERS_EXPOSED_ALL,
  };
}

// Reducer
export default function charactersReducer(
  state = initialState,
  action: CharacterActionType
): initialStateType {
  switch (action.type) {
    case CHARACTERS_LOADED:
      return {
        ...state,
        characters: action.payload,
        nonHiddenCharacters: action.payload.filter(
          (char) =>
            state.hiddenCharacters.findIndex(
              (hiddenChar) => char.id === hiddenChar.id
            ) === -1
        ),
      };

    case CHARACTERS_FILTERED_BY_NAME:
      return {
        ...state,
        filters: { ...state.filters, name: action.payload, page: 1 },
      };

    case CHARACTERS_FILTERED_BY_COMIC:
      return {
        ...state,
        filters: { ...state.filters, comic: action.payload, page: 1 },
      };

    case CHARACTERS_FILTERED_BY_STORY:
      return {
        ...state,
        filters: { ...state.filters, story: action.payload, page: 1 },
      };

    case CHARACTERS_FILTERED_BY_PAGE:
      return { ...state, filters: { ...state.filters, page: action.payload } };

    case CHARACTER_BOOKMARKED:
      return {
        ...state,
        nonHiddenFavoriteCharacters: [
          ...state.nonHiddenFavoriteCharacters,
          action.payload,
        ],
        favoriteCharacters: [...state.favoriteCharacters, action.payload],
      };

    case CHARACTER_UNBOOKMARKED:
      return {
        ...state,
        nonHiddenFavoriteCharacters: state.nonHiddenFavoriteCharacters?.filter(
          (nonHiddenFavCharacter) => nonHiddenFavCharacter.id !== action.payload
        ),
        favoriteCharacters: state.favoriteCharacters?.filter(
          (favCharacter) => favCharacter.id !== action.payload
        ),
      };

    case CHARACTERS_UNBOOKMARKED_ALL:
      return {
        ...state,
        favoriteCharacters: [],
        nonHiddenFavoriteCharacters: [],
      };

    case CHARACTER_HIDDEN:
      return {
        ...state,
        nonHiddenFavoriteCharacters: state.nonHiddenFavoriteCharacters?.filter(
          (nonHiddenFavCharacter) =>
            nonHiddenFavCharacter.id !== action.payload.id
        ),
        nonHiddenCharacters: state.nonHiddenCharacters.filter(
          (character) => character.id !== action.payload.id
        ),
        hiddenCharacters: [...state.hiddenCharacters, action.payload],
      };

    case CHARACTERS_EXPOSED_ALL:
      return {
        ...state,
        hiddenCharacters: [],
        nonHiddenFavoriteCharacters: [...state.favoriteCharacters],
        nonHiddenCharacters: [...state.characters],
      };

    default:
      return state;
  }
}
