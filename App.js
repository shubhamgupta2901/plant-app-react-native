import React from "react";
import { View, Text } from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";
import WelcomeScreen from './src/screens/WelcomeScreen';
import ExploreScreen from './src/screens/ExploreScreen';

class App extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Plant App</Text>
      </View>
    );
  }
}

const AppNavigator = createStackNavigator(
  {
    Welcome: WelcomeScreen,
    Explore: ExploreScreen,
  },
  {
    initialRouteName: "Welcome"
  }
);

export default createAppContainer(AppNavigator);