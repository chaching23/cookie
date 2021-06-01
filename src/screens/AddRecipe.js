import { useMutation, gql } from '@apollo/client';
import React, { useState } from 'react';
import {
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const ADD_RECIPE = gql`
  mutation createRecipe($createrecipeinput: CreateRecipeInput!) {
    createRecipe(input: $createrecipeinput) {
      id
      title
      price
      description
      authorId
    }
  }
`;

function AddRecipe({ navigation }) {
  const [addRecipe, { data }] = useMutation(ADD_RECIPE);
  const [item, setItem] = useState({});
  async function onPress() {
    await addRecipe({
      variables: {
        createrecipeinput: {
          authorId: 'id',
          ...item,
        },
      },
    });
    navigation.pop();
  }

  return (
    <SafeAreaView style={{ flex: 1, padding: 10, width: '100%' }}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{
          alignItems: 'center',
          flexDirection: 'row',
          marginRight: 10,
          marginBottom: 10,
        }}>
        <Ionicons
          style={{
            paddingRight: 5,
          }}
          name={'arrow-back'}
          size={24}
          color='#007aff'
          style={{ marginLeft: 10 }}
        />
      </TouchableOpacity>

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
              Submit
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default AddRecipe;
