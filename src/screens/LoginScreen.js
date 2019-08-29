import React from 'react';
import PropTypes from 'prop-types'
import {View, Text} from 'react-native';

class LoginScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {
    }
  }
  render(){
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Login Screen</Text>
      </View>
    );
  }
}

LoginScreen.propTypes ={
}

LoginScreen.defaultProps ={
}

export default LoginScreen;
