import React from 'react';
import PropTypes from 'prop-types'
import {View, Text} from 'react-native';

class SettingsScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {
    }
  }
  render(){
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>SettingsScreen</Text>
      </View>
    );
  }
}

SettingsScreen.propTypes ={
}

SettingsScreen.defaultProps ={
}

export default SettingsScreen;
