import { ADD_FAVORITE, REMOVE_FAVORITE } from '../reducers/constants';
import actionCreator from '../utils/actionCreator';
import { setFavoriteData, setFavoriteIdsData } from '../utils/storage';
import update from 'immutability-helper';

export const addFavouriteAction = (item) => async (dispatch, state) => {
  try {
    const prevState = state().user;
    dispatch(actionCreator(ADD_FAVORITE, item));
    setFavoriteIdsData([...prevState.favoriteIds, item.id]);
    setFavoriteData([...prevState.favorites, item]);
  } catch (error) {
    console.log(error.stack, error.response);
  }
};
export const removeFavouriteAction = (id) => async (dispatch, state) => {
  try {
    const prevState = state().user;
    const index = prevState.favorites.findIndex((st) => st.id === id);
    const idIndex = prevState.favoriteIds.indexOf(id);
    const newState = update(prevState, {
      favoriteIds: { $splice: [[idIndex, 1]] },
      favorites: { $splice: [[index, 1]] },
    });

    setFavoriteIdsData(newState.favoriteIds);
    setFavoriteData(newState.favorites);
    dispatch(actionCreator(REMOVE_FAVORITE, id));
  } catch (error) {
    console.log('tatas', error.message, error.stack, error.response);
  }
};
