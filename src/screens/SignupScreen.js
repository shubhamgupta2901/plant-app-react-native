import React from 'react';
import PropTypes from 'prop-types'
import {Keyboard, Platform, StyleSheet, KeyboardAvoidingView} from 'react-native';
import { Block, Input, Button, Text, DotIndicator} from '../elements';
import {theme} from '../constants';
import {CommonUtils} from '../utils';

class SignupScreen extends React.Component {
  
  constructor(props){
    super(props);
    this.state = {
      email: 'plantapp@react.com',
      password: 'react',
      username: 'plantapp',
      errors: [],
      loading: false,
    }
  }

  onEmailTextChanged = (newEmail) => {
    this.setState({email: newEmail})
  }

  onPasswordTextChanged = (newPassword) => {
    this.setState({password: newPassword})
  }

  onUsernameTextChanged = (newUsername) => {
    this.setState({username: newUsername})
  }

  //Server side mockup
  onSignupClicked = async () => {
    Keyboard.dismiss();
    this.setState({loading: true});
    await CommonUtils.wait(2000);
    const errors = [];
    if(!CommonUtils.validateEmail(this.state.email)){
      errors.push('email');
    }
    if(this.state.password.length<=0){
      errors.push('password');
    }

    if(this.state.username.length<=0){
      errors.push('username')
    }
    this.setState({errors,loading: false});
    
    if(errors.length === 0)
      this.props.navigation.navigate('browse');
  }

  onLoginClicked = () => {
    this.props.navigation.navigate("login");
  }


  render(){
    const {errors} = this.state;
    const errorStyle = key => errors.includes(key) ? styles.inputError : null;
    return (
      <KeyboardAvoidingView 
        style = {styles.container}
        
        behavior="padding">
        <Block padding= {[0,theme.sizes.base*2]}>
         <Text h1 bold>Signup</Text>
         <Block middle>
            <Input
              label= "Email"
              error = {errorStyle('email')}
              style = {[styles.input, errorStyle('email')]}
              defaultValue = {this.state.email}
              onChangeText = {(text)=>this.onEmailTextChanged(text)}
            />
            <Input
              label= "Username"
              error = {errorStyle('username')}
              style = {[styles.input, errorStyle('username')]}
              defaultValue = {this.state.username}
              onChangeText = {(text)=>this.onUsernameTextChanged(text)}
            />
            <Input
              secure
              label= "Password"
              style = {[styles.input,errorStyle('password')]}
              error = {errorStyle('password')}
              defaultValue = {this.state.password}
              onChangeText = {(text)=>this.onPasswordTextChanged(text)}
            />
            <Button gradient onPress={this.onSignupClicked}>
              {this.state.loading ? 
                <DotIndicator color = {theme.colors.white} count = {4} size = {theme.sizes.base*0.5}/> : 
                <Text bold white center>Signup</Text>
              }
            </Button>
            <Button onPress = {this.onLoginClicked}>
              <Text center caption gray style = {{textDecorationLine: 'underline'}}>Back to Login</Text>
            </Button>
         </Block>
        </Block>
      </KeyboardAvoidingView>
    );
  }
}

SignupScreen.propTypes ={
}

SignupScreen.defaultProps ={
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'center',
  },
  input: {
    borderColor: "transparent",
    borderWidth: 0,
    borderBottomColor: theme.colors.gray2,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  inputError: {
    borderBottomColor: theme.colors.accent,
  },
});

export default SignupScreen;
