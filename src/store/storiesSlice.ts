import { IStory } from '../models/story';

// Initial State
interface filtersType {
  character?: string;
  page?: number;
}

interface initialStateType {
  stories: IStory[];
  filters: filtersType;
  favoriteStories: IStory[];
  hiddenStories: IStory[];
  nonHiddenStories: IStory[];
  nonHiddenFavStories: IStory[];
}

const initialState: initialStateType = {
  stories: [],
  filters: {
    character: '',
    page: 1,
  },
  favoriteStories: [],
  hiddenStories: [],
  nonHiddenStories: [],
  nonHiddenFavStories: [],
};

// Action types
const STORIES_LOADED = 'stories/storiesLoaded';
const STORIES_FILTERED_BY_CHARACTER = 'stories/storiesFilteredByCharacter';
const STORIES_FILTERED_BY_PAGE = 'stories/storiesFilteredByPage';
const STORY_BOOKMARKED = 'stories/storyBookmarked';
const STORY_UNBOOKMARKED = 'stories/storyUnBookmarked';
const STORIES_UNBOOKMARKED_ALL = 'stories/storiesUnBookmarkedAll';
const STORY_HIDDEN = 'stories/storyHidden';
const STORIES_EXPOSED_ALL = 'stories/storiesExposedAll';

type StoryActionType =
  | { type: 'stories/storiesLoaded'; payload: IStory[] }
  | { type: 'stories/storiesFilteredByCharacter'; payload: string }
  | { type: 'stories/storiesFilteredByPage'; payload: number }
  | { type: 'stories/storyBookmarked'; payload: IStory }
  | { type: 'stories/storyUnBookmarked'; payload: number }
  | { type: 'stories/storiesUnBookmarkedAll' }
  | { type: 'stories/storyHidden'; payload: IStory }
  | { type: 'stories/storiesExposedAll' };

// Action Creators
export function storiesLoaded(stories: IStory[]) {
  return {
    type: STORIES_LOADED,
    payload: stories,
  };
}

export function storiesFilteredByCharacter(character: string) {
  return {
    type: STORIES_FILTERED_BY_CHARACTER,
    payload: character,
  };
}

export function storiesFilteredByPage(page: number) {
  return {
    type: STORIES_FILTERED_BY_PAGE,
    payload: page,
  };
}

export function storyBookmarked(story: IStory) {
  return {
    type: STORY_BOOKMARKED,
    payload: story,
  };
}

export function storyUnBookmarked(storyId: number) {
  return {
    type: STORY_UNBOOKMARKED,
    payload: storyId,
  };
}

export function storiesUnBookmarkedAll() {
  return {
    type: STORIES_UNBOOKMARKED_ALL,
  };
}

export function storyHidden(story: IStory) {
  return {
    type: STORY_HIDDEN,
    payload: story,
  };
}

export function storiesExposedAll() {
  return {
    type: STORIES_EXPOSED_ALL,
  };
}

// Reducer
export default function storiesReducer(
  state = initialState,
  action: StoryActionType
): initialStateType {
  switch (action.type) {
    case STORIES_LOADED:
      return {
        ...state,
        stories: action.payload,
        nonHiddenStories: action.payload.filter(
          (story) =>
            state.hiddenStories.findIndex(
              (hiddenStory) => story.id === hiddenStory.id
            ) === -1
        ),
      };

    case STORIES_FILTERED_BY_CHARACTER:
      return {
        ...state,
        filters: { ...state.filters, character: action.payload, page: 1 },
      };

    case STORIES_FILTERED_BY_PAGE:
      return { ...state, filters: { ...state.filters, page: action.payload } };

    case STORY_BOOKMARKED:
      return {
        ...state,
        nonHiddenFavStories: [...state.nonHiddenFavStories, action.payload],
        favoriteStories: [...state.favoriteStories, action.payload],
      };

    case STORY_UNBOOKMARKED:
      return {
        ...state,
        nonHiddenFavStories: state.nonHiddenFavStories?.filter(
          (nonHiddenFavStory) => nonHiddenFavStory.id !== action.payload
        ),
        favoriteStories: state.favoriteStories.filter(
          (favStory) => favStory.id !== action.payload
        ),
      };

    case STORIES_UNBOOKMARKED_ALL:
      return {
        ...state,
        favoriteStories: [],
        nonHiddenFavStories: [],
      };

    case STORY_HIDDEN:
      return {
        ...state,
        nonHiddenFavStories: state.nonHiddenFavStories?.filter(
          (nonHiddenFavStory) => nonHiddenFavStory.id !== action.payload.id
        ),
        nonHiddenStories: state.nonHiddenStories.filter(
          (story) => story.id !== action.payload.id
        ),
        hiddenStories: [...state.hiddenStories, action.payload],
      };

    case STORIES_EXPOSED_ALL:
      return {
        ...state,
        hiddenStories: [],
        nonHiddenFavStories: [...state.favoriteStories],
        nonHiddenStories: [...state.stories],
      };

    default:
      return state;
  }
}
