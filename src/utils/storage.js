import AsyncStorage from '@react-native-async-storage/async-storage';

const storeData = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    // saving error
  }
};
const mergeData = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.mergeItem(key, jsonValue);
  } catch (e) {
    // saving error
  }
};

const getData = async (key) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // error reading value
  }
};

const removeData = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    // remove error
  }
};

export const getUserData = () => {
  return getData('@cookie_user');
};
export const removeUserData = () => {
  return removeData('@cookie_user');
};
export const setUserData = (value) => {
  return storeData('@cookie_user', value);
};
export const getFavoriteData = () => {
  return getData('@cookie_favorite');
};
export const removeFavoriteData = () => {
  return removeData('@cookie_favorite');
};
export const setFavoriteData = (value) => {
  return storeData('@cookie_favorite', value);
};
export const mergeFavoriteData = (value) => {
  return mergeData('@cookie_favorite', value);
};
export const getFavoriteIdsData = () => {
  return getData('@cookie_favoriteIds');
};
export const removeFavoriteIdsData = () => {
  return removeData('@cookie_favoriteIds');
};
export const setFavoriteIdsData = (value) => {
  return storeData('@cookie_favoriteIds', value);
};
