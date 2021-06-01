import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { StyleSheet, TouchableOpacity, View, Text, Button } from "react-native";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
// import { createDrawerNavigator } from "@react-navigation/drawer";
import { Feather, Entypo, Ionicons } from "@expo/vector-icons";
import Show from "./src/screens/Show.js";
import AddRecipe from "./src/screens/AddRecipe";
import Edit from "./src/screens/Edit";
import Profile from "./src/screens/Profile";
import History from "./src/screens/History";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { Provider } from "react-redux";
import configureStore from "./src/store";
import {
  getFavoriteData,
  getFavoriteIdsData,
  removeFavoriteIdsData,
} from "./src/utils/storage.js";
import actionCreator from "./src/utils/actionCreator.js";
import { FETCH_FAVORITES } from "./src/reducers/constants.js";
const store = configureStore();

// import * as React from "react";

// Initialize Apollo Client
const client = new ApolloClient({
  uri: "https://aua3cktr5jbktcczt32tvdnxzm.appsync-api.us-east-2.amazonaws.com/graphql",
  cache: new InMemoryCache(),
  headers: { "x-api-key": "da2-2mbfen7lczer3b6yibh6iy5ipu" },
});

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={{ fontSize: 30 }}>This is the home screen!</Text>
      <Button
        onPress={() => navigation.navigate("MyModal")}
        title="Open Modal"
      />
    </View>
  );
}

function ModalScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      {/* <Button onPress={() => navigation.goBack()} title="Dismiss" /> */}
      <AddRecipe navigation={navigation} />
    </View>
  );
}

// function DrawerScreen() {
//   return (
//     <Drawer.Navigator initialRouteName="Home">
//       <Drawer.Screen name="Home" component={HomeScreen} />
//       <Drawer.Screen name="Notifications" component={NotificationsScreen} />
//     </Drawer.Navigator>
//   );
// }

const MainStack = createStackNavigator();
const RootStack = createStackNavigator();
// const Drawer = createDrawerNavigator();

function MainStackScreen({ navigation }) {
  return (
    <MainStack.Navigator>
      <MainStack.Screen
        name="Home"
        component={Profile}
        options={{
          headerRight: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate("MyModal")}
              style={styles.rightIcon}
            >
              <Entypo name="plus" size={26} color="#24cc94" />
            </TouchableOpacity>
          ),
          headerLeft: () => (
            <TouchableOpacity
              // onPress={() => navigation.navigate("EditRecipe")}
              style={styles.leftIcon}
            >
              <Feather name="menu" size={26} color="#24cc94" />
            </TouchableOpacity>
          ),
        }}
      />
      {/* <MainStack.Screen name="Details" component={DetailsScreen} /> */}
      <MainStack.Screen name="EditRecipe" component={Edit} />
      <MainStack.Screen name="Add" component={AddRecipe} />
      <MainStack.Screen name="ViewRecipe" component={Show} />
      <MainStack.Screen name="History" component={History} />
    </MainStack.Navigator>
  );
}

function App() {
  useEffect(() => {
    async function fetchData() {
      const favorites = await getFavoriteData();
      const favoriteIds = await getFavoriteIdsData();
      if (favorites && favoriteIds) {
        store.dispatch(
          actionCreator(FETCH_FAVORITES, { favorites, favoriteIds })
        );
      }
    }
    fetchData();
  }, []);
  return (
    <Provider store={store}>
      <ApolloProvider client={client}>
        <NavigationContainer>
          <RootStack.Navigator mode="modal" headerMode="none">
            <RootStack.Screen name="Main" component={MainStackScreen} />
            <RootStack.Screen
              name="MyModal"
              component={ModalScreen}
              options={{
                headerLeft: (props) => (
                  <View
                    style={{
                      flex: 1,
                      alignItems: "center",
                      flexDirection: "row",
                      marginRight: 10,
                    }}
                  >
                    <Ionicons
                      style={{
                        paddingRight: 5,
                      }}
                      name={"arrow-back"}
                      size={24}
                      color="#007aff"
                      onPress={props.onPress}
                      style={{ marginLeft: 10 }}
                    />
                  </View>
                ),
              }}
            />
            {/* <RootStack.Screen name="Drawer" component={DrawerScreen} /> */}
          </RootStack.Navigator>
        </NavigationContainer>
      </ApolloProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  topBar: {
    flexDirection: "row",
    backgroundColor: "white",
  },
  leftIcon: {
    marginLeft: 15,
  },
  rightIcon: {
    marginRight: 15,
  },
});

export default App;
