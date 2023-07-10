import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { HomeScreen } from "./src/components/HomeScreen/HomeScreen";
import { homeScreenOptions } from "./src/components/HomeScreen/types";

const Stack = createStackNavigator();

const client = new ApolloClient({
  uri: "https://ba6gijdps7.execute-api.us-east-1.amazonaws.com/graphql",
  cache: new InMemoryCache(),
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={homeScreenOptions}
        >
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ title: "🏁 Racers Challenge" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  );
};

export default App;
