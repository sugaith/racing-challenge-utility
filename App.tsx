import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import HomeScreen from "./src/HomeScreen";

const Stack = createStackNavigator();
const screenOptions = {
  headerStyle: {
    backgroundColor: "#29128e",
  },
  headerTintColor: "#ffffff",
};

const client = new ApolloClient({
  uri: "https://ba6gijdps7.execute-api.us-east-1.amazonaws.com/graphql",
  cache: new InMemoryCache(),
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home" screenOptions={screenOptions}>
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
