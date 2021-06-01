import { useQuery, gql, useMutation } from '@apollo/client';
import React from 'react';
import {
  Text,
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { AntDesign, EvilIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import {
  addFavouriteAction,
  removeFavouriteAction,
} from '../actions/favorites';

const RECIPE_LIST = gql`
  query listRecipes {
    listRecipes {
      items {
        id
        title
        price
        description
        authorId
      }
    }
  }
`;

const REMOVE_RECIPE = gql`
  mutation MyMutation($id: String = "") {
    deleteRecipe(input: { id: $id }) {
      id
    }
  }
`;

function RecipeList(props) {
  const { loading, error, data } = useQuery(RECIPE_LIST, {
    pollInterval: 500,
  });
  const [removeRecipe] = useMutation(REMOVE_RECIPE);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { favoriteIds } = useSelector((state) => state.user);

  async function onDelete(id) {
    await removeRecipe({
      variables: {
        id: id,
      },
    });
    dispatch(removeFavouriteAction(id));
  }

  const setFavorite = (item) => {
    dispatch(addFavouriteAction(item));
  };
  const removeFavorite = (id) => {
    dispatch(removeFavouriteAction(id));
  };

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error :(</Text>;
  return (
    <FlatList
      data={data.listRecipes.items}
      onRefresh={() => {
        switch (this.props.refresh) {
          case 'REFRESH':
            data.listRecipes.items;
            break;
          case 'REFRESH_':
            this.props.getHot();
            break;
        }
      }}
      refreshing={false}
      renderItem={({ item }) => {
        const isFavourite = favoriteIds.includes(item.id);
        return (
          <TouchableOpacity
            key={item.title}
            onPress={() =>
              navigation.navigate('ViewRecipe', {
                recipe: item,
              })
            }
            style={{
              width: '95%',
              flexDirection: 'row',
              marginHorizontal: '2.5%',
              marginVertical: 5,
              padding: 10,
              alignItems: 'center',
              backgroundColor: '#fff',
              borderRadius: 5,
              justifyContent: 'space-between',
            }}>
            <Text style={{ fontSize: 17 }}>{item.title}</Text>
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity
                onPress={() =>
                  isFavourite ? removeFavorite(item.id) : setFavorite(item)
                }
                style={styles.smBtn}>
                <AntDesign
                  name='star'
                  size={24}
                  color={favoriteIds.includes(item.id) ? 'gold' : 'grey'}
                />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('EditRecipe', {
                    recipe: item,
                  })
                }
                style={styles.smBtn}>
                <AntDesign name='edit' size={24} color='green' />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => onDelete(item.id)}
                style={styles.smBtn}>
                <EvilIcons name='trash' size={24} color='red' />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        );
      }}
    />
  );
}

const styles = StyleSheet.create({
  smBtn: {
    marginLeft: 5,
  },
});
export default RecipeList;
