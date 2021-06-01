import React, { useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  useWindowDimensions,
} from "react-native";
import { FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";
import RecipeList from "./RecipeList";
import FavoriteList from "./FavoriteList";

import { TabView, SceneMap } from "react-native-tab-view";

const ReceiptRoute = () => (
  <View style={{ flex: 1, backgroundColor: "white" }}>
    <RecipeList />
  </View>
);

const FavoriteRoute = () => (
  <View style={{ flex: 1, backgroundColor: "white" }}>
    <FavoriteList />
  </View>
);

let screenWidth = Dimensions.get("window").width;
let screenHeight = Dimensions.get("window").height;

export default function Profile({ navigation }) {
  // state = {
  //   index: 0,
  //   bluriii: true,
  // };

  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "first", title: "Receipt" },
    { key: "second", title: "Favorite" },
  ]);

  const renderScene = SceneMap({
    first: ReceiptRoute,
    second: FavoriteRoute,
  });

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <View>
        <View
          style={[
            {
              alignItems: "center",
              justifyContent: "space-around",
              flexDirection: "row",
              paddingTop: 10,
              paddingRight: 15,
              paddingLeft: 15,
              paddingBottom: 0,
              alignItems: "center",
            },
          ]}
        >
          {/* <View style={{ alignItems: "center" }}>
            <View style={[{ flexDirection: "row" }]}>
              <FontAwesome5 name="store" size={24} color="black" />
              <Text
                size={14}
                style={[
                  {
                    fontWeight: "bold",
                    margin: 5,
                  },
                ]}
              >
                CookieTown
              </Text>
            </View>
          </View> */}
          <View
            style={[
              {
                alignItems: "center",
                justifyContent: "space-around",
                flexDirection: "row",
                paddingLeft: 0,
              },
            ]}
          >
            <View style={[{ flexDirection: "row" }]}>
              <View
                style={[
                  {
                    flexDirection: "row",
                    // marginRight: 20,
                    width: 85,
                    height: 30,
                    // backgroundColor: "black",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 10,
                  },
                ]}
              >
                <FontAwesome5 name="cookie-bite" size={24} color="black" />
                <Text style={[{ color: "black", fontWeight: "bold" }]}>
                  {" "}
                  Coins: 500
                </Text>
              </View>
            </View>
          </View>
          <View
            style={[
              // styles.spaceAround,
              {
                alignItems: "center",
                justifyContent: "space-around",
                flexDirection: "row",
                paddingLeft: 0,
              },
            ]}
          >
            <View style={[{ flexDirection: "row" }]}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("AddRecipe");
                }}
                style={[
                  {
                    flexDirection: "row",
                    // marginRight: 20,
                    width: 100,
                    height: 30,
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 10,
                  },
                ]}
              >
                <MaterialCommunityIcons
                  name="home-currency-usd"
                  size={30}
                  color="black"
                />
                <Text style={[{ color: "black", fontWeight: "bold" }]}>
                  {" "}
                  Transactions
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View
          style={[
            {
              paddingHorizontal: 25,
              paddingBottom: 10,
              paddingTop: 5,
              borderBottomWidth: 1,
            },
          ]}
        >
          <Text style={{ color: "black" }}>
            Enjoy A Homemade Cookie From Our Bakery. Many Styles And Flavors
            Available. Over 300 5-star Verified Reviews And 100% Satisfaction
            Guarantee! Handcrafted Cookies. Delivering Fresh To Door. Baked
            Fresh.
          </Text>
        </View>
      </View>

      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        // navigationState={{ index: this.state.index, routes }}
        // renderScene={renderScene}
        // onIndexChange={this.onIndexChange}
        // initialLayout={initialLayout}
      />
    </View>
  );
}
