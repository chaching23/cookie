import { combineReducers } from 'redux';
import { stubTrue } from 'lodash';
import { isNull } from 'lodash';
import update from 'immutability-helper';
import {
  ADD_RECIPE,
  FETCH_RECIPES,
  FETCH_FAVORITES,
  ADD_FAVORITE,
  REMOVE_FAVORITE,
} from './constants';

const initialState = {
  recipes: [],
  favorites: [],
  favoriteIds: [],
};
const user = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_RECIPES:
      return { ...state, recipes: action.payload };
    case ADD_RECIPE:
      return { ...state, recipes: [...state.recipes, action.payload] };
    case FETCH_FAVORITES:
      return { ...state, ...action.payload };
    case ADD_FAVORITE:
      return {
        ...state,
        favoriteIds: [...state.favoriteIds, action.payload.id],
        favorites: [...state.favorites, action.payload],
      };
    case REMOVE_FAVORITE:
      const index = state.favorites.findIndex((st) => st.id === action.payload);
      const idIndex = state.favoriteIds.indexOf(action.payload);
      return update(state, {
        favoriteIds: { $splice: [[idIndex, 1]] },
        favorites: { $splice: [[index, 1]] },
      });
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  user,
});

export default rootReducer;
