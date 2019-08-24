import React from "react";
import { View, Text } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';


class WelcomeScreen extends React.Component {
  render() {
      const icon = <Icon name="rocket" size={30} color="#900" />;;
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>WelcomeScreen Screen</Text>
        {icon}
      </View>
    );
  }
}


export default WelcomeScreen;