import { useMutation, gql } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { Text, View, TextInput, TouchableOpacity } from 'react-native';

const EDIT_RECIPE = gql`
  mutation MyMutation($input: UpdateRecipeInput!) {
    updateRecipe(input: $input) {
      authorId
      description
      id
      price
      title
    }
  }
`;

function Edit({ route, navigation }) {
  const [editRecipe, { data }] = useMutation(EDIT_RECIPE);
  const [item, setItem] = useState({});

  useEffect(() => {
    const { recipe } = route.params;
    setItem(recipe);
  }, []);

  async function onPress() {
    await editRecipe({
      variables: {
        input: {
          authorId: 'id',
          id: item.id,
          description: item.description,
          title: item.title,
          price: item.price,
        },
      },
    });
    navigation.pop();
  }

  return (
    <View>
      <View style={{ padding: 15 }}>
        <TextInput
          placeholder='title'
          style={{
            fontSize: 20,
            padding: 10,
          }}
          value={item.title}
          onChangeText={(text) =>
            setItem((prev) => ({
              ...prev,
              title: text,
            }))
          }
        />
        <TextInput
          placeholder='description'
          style={{
            fontSize: 20,
            padding: 10,
          }}
          value={item.description}
          onChangeText={(text) =>
            setItem((prev) => ({
              ...prev,
              description: text,
            }))
          }
        />
        <TextInput
          placeholder='price'
          style={{
            fontSize: 20,
            padding: 10,
          }}
          value={`${item.price}`}
          onChangeText={(text) =>
            setItem((prev) => ({
              ...prev,
              price: text,
            }))
          }
        />
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity
            onPress={() => onPress()}
            style={{
              backgroundColor: '#007aff',
              width: '100%',
              padding: 10,
              marginVertical: 20,
              borderRadius: 5,
            }}>
            <Text style={{ color: '#fff', fontSize: 20, textAlign: 'center' }}>
              Update
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default Edit;
