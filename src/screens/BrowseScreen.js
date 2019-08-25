
import React from 'react';
import PropTypes from 'prop-types'
import { View, Text } from "react-native";

class BrowseScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {
    }
  }
  render(){
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>BrowseScreen Screen</Text>
      </View>
    );
  }
}

BrowseScreen.propTypes ={
}

BrowseScreen.defaultProps ={
}

export default BrowseScreen;