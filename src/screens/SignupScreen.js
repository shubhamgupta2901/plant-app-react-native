import React from 'react';
import PropTypes from 'prop-types'
import {View, Text} from 'react-native';

class SignupScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {
    }
  }
  render(){
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>SignupScreen</Text>
      </View>
    );
  }
}

SignupScreen.propTypes ={
}

SignupScreen.defaultProps ={
}

export default SignupScreen;
