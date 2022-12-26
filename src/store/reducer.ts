import { combineReducers } from 'redux';

import charactersReducer from './charactersSlice';
import comicsReducer from './comicsSlice';
import storiesReducer from './storiesSlice';

const rootReducer = combineReducers({
  characters: charactersReducer,
  comics: comicsReducer,
  stories: storiesReducer,
});

export default rootReducer;
