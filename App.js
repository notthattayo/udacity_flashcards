import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "./components/Home";
import NewDeck from "./components/NewDeck";
import IndividualDeck from "./components/IndividualDeck";
import NewQuestion from "./components/NewQuestion";
import Quiz from "./components/Quiz";
import reducers from "./reducers";
import middleware from "./middleware";
import { setLocalNotification } from "./utils/helpers";

const Stack = createStackNavigator();
export default function App() {
  useEffect(() => {
    setLocalNotification();
  });
  return (
    <Provider store={createStore(reducers, middleware)}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{ title: "All Decks" }}
          />
          <Stack.Screen
            name="NewDeck"
            component={NewDeck}
            options={{ title: "Create New Deck" }}
          />
          <Stack.Screen
            name="IndividualDeck"
            component={IndividualDeck}
            options={{ title: "Deck" }}
          />
          <Stack.Screen
            name="NewQuestion"
            component={NewQuestion}
            options={{ title: "New Card" }}
          />
          <Stack.Screen
            name="Quiz"
            component={Quiz}
            options={{ title: "Quiz" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
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
});
