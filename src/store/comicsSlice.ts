import { IComic } from '../models/comic';

// Initial State
interface filtersType {
  title?: string;
  format?: string;
  page?: number;
}
interface initialStateType {
  comics: IComic[];
  filters: filtersType;
  favoriteComics: IComic[];
  hiddenComics: IComic[];
  nonHiddenComics: IComic[];
  nonHiddenFavComics: IComic[];
}

const initialState: initialStateType = {
  comics: [],
  filters: {
    title: '',
    format: '',
    page: 1,
  },
  favoriteComics: [],
  hiddenComics: [],
  nonHiddenComics: [],
  nonHiddenFavComics: [],
};

// Action types
const COMICS_LOADED = 'comics/comicsLoaded';
const COMICS_FILTERED_BY_FORMAT = 'comics/comicsFilteredByFormat';
const COMICS_FILTERED_BY_TITLE = 'comics/comicsFilteredByTitle';
const COMICS_FILTERED_BY_PAGE = 'comics/comicsFilteredByPage';
const COMIC_BOOKMARKED = 'comics/comicBookmarked';
const COMIC_UNBOOKMARKED = 'comics/comicUnBookmarked';
const COMICS_UNBOOKMARKED_ALL = 'comics/comicsUnBookmarkedAll';
const COMIC_HIDDEN = 'comics/comicHidden';
const COMICS_EXPOSED_ALL = 'comics/comicsExposedAll';

type ComicActionType =
  | { type: 'comics/comicsLoaded'; payload: IComic[] }
  | { type: 'comics/comicsFilteredByFormat'; payload: string }
  | { type: 'comics/comicsFilteredByTitle'; payload: string }
  | { type: 'comics/comicsFilteredByPage'; payload: number }
  | { type: 'comics/comicBookmarked'; payload: IComic }
  | { type: 'comics/comicUnBookmarked'; payload: number }
  | { type: 'comics/comicsUnBookmarkedAll' }
  | { type: 'comics/comicHidden'; payload: IComic }
  | { type: 'comics/comicsExposedAll' };

// Action Creators
export function comicsLoaded(comics: IComic[]) {
  return {
    type: COMICS_LOADED,
    payload: comics,
  };
}

export function comicsFilteredByFormat(format: string) {
  return {
    type: COMICS_FILTERED_BY_FORMAT,
    payload: format,
  };
}

export function comicsFilteredByTitle(title: string) {
  return {
    type: COMICS_FILTERED_BY_TITLE,
    payload: title,
  };
}

export function comicsFilteredByPage(page: number) {
  return {
    type: COMICS_FILTERED_BY_PAGE,
    payload: page,
  };
}

export function comicBookmarked(comic: IComic) {
  return {
    type: COMIC_BOOKMARKED,
    payload: comic,
  };
}

export function comicUnBookmarked(comicId: number) {
  return {
    type: COMIC_UNBOOKMARKED,
    payload: comicId,
  };
}

export function comicsUnBookmarkedAll() {
  return {
    type: COMICS_UNBOOKMARKED_ALL,
  };
}

export function comicHidden(comic: IComic) {
  return {
    type: COMIC_HIDDEN,
    payload: comic,
  };
}

export function comicsExposedAll() {
  return {
    type: COMICS_EXPOSED_ALL,
  };
}

// Reducer
export default function comicsReducer(
  state = initialState,
  action: ComicActionType
): initialStateType {
  switch (action.type) {
    case COMICS_LOADED:
      return {
        ...state,
        comics: action.payload,
        nonHiddenComics: action.payload.filter(
          (comic) =>
            state.hiddenComics.findIndex(
              (hiddenComic) => comic.id === hiddenComic.id
            ) === -1
        ),
      };

    case COMICS_FILTERED_BY_FORMAT:
      return {
        ...state,
        filters: { ...state.filters, format: action.payload, page: 1 },
      };

    case COMICS_FILTERED_BY_TITLE:
      return {
        ...state,
        filters: { ...state.filters, title: action.payload, page: 1 },
      };

    case COMICS_FILTERED_BY_PAGE:
      return { ...state, filters: { ...state.filters, page: action.payload } };

    case COMIC_BOOKMARKED:
      return {
        ...state,
        nonHiddenFavComics: [...state.nonHiddenFavComics, action.payload],
        favoriteComics: [...state.favoriteComics, action.payload],
      };

    case COMIC_UNBOOKMARKED:
      return {
        ...state,
        nonHiddenFavComics: state.nonHiddenFavComics?.filter(
          (nonHiddenFavComic) => nonHiddenFavComic.id !== action.payload
        ),
        favoriteComics: [
          ...state.favoriteComics.filter(
            (favComic) => favComic.id !== action.payload
          ),
        ],
      };

    case COMICS_UNBOOKMARKED_ALL:
      return {
        ...state,
        favoriteComics: [],
        nonHiddenFavComics: [],
      };

    case COMIC_HIDDEN:
      return {
        ...state,
        nonHiddenFavComics: state.nonHiddenFavComics?.filter(
          (nonHiddenFavComic) => nonHiddenFavComic.id !== action.payload.id
        ),
        nonHiddenComics: state.nonHiddenComics.filter(
          (comic) => comic.id !== action.payload.id
        ),
        hiddenComics: [...state.hiddenComics, action.payload],
      };

    case COMICS_EXPOSED_ALL:
      return {
        ...state,
        hiddenComics: [],
        nonHiddenFavComics: [...state.favoriteComics],
        nonHiddenComics: [...state.comics],
      };

    default:
      return state;
  }
}
