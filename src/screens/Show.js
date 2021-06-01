import { useQuery, gql, useMutation } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { AntDesign, EvilIcons } from '@expo/vector-icons';

const RECIPE_SHOW = gql`
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

function Show({ route }) {
  // const { loading, error, data } = useQuery(RECIPE_SHOW);
  const [item, setItem] = useState({});
  useEffect(() => {
    const { recipe } = route.params;
    setItem(recipe);
  }, []);
  return (
    <View
      style={{
        width: '95%',
        marginHorizontal: '2.5%',
        marginVertical: 5,
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 5,
      }}>
      <Text style={{ fontSize: 17, marginVertical: 10 }}>
        <Text style={{ fontWeight: 'bold' }}>Title:</Text> {item.title}
      </Text>
      <Text style={{ fontSize: 17, marginVertical: 10 }}>
        <Text style={{ fontWeight: 'bold' }}>description:</Text>{' '}
        {item.description}
      </Text>
      <Text style={{ fontSize: 17, marginVertical: 10 }}>
        <Text style={{ fontWeight: 'bold' }}>price:</Text> ${item.price}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  smBtn: {
    marginLeft: 5,
  },
});
export default Show;
