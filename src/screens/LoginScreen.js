import React from 'react';
import PropTypes from 'prop-types'
import {Keyboard, Platform, StyleSheet, KeyboardAvoidingView,View} from 'react-native';
import { Block, Input, Button, Text, DotIndicator} from '../elements';
import {theme} from '../constants';
import {CommonUtils} from '../utils';

const VALID_PASSWORD = "react";
class LoginScreen extends React.Component {
  
  constructor(props){
    super(props);
    this.state = {
      email: 'plantapp@react.com',
      password: 'react',
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

  //Server side mockup
  onLoginClicked = async () => {
    Keyboard.dismiss();
    this.setState({loading: true});
    await CommonUtils.wait(1200);
    const errors = [];
    if(!CommonUtils.validateEmail(this.state.email)){
      errors.push('email');
    }
    if(this.state.password !== VALID_PASSWORD){
      errors.push('password');
    }
    this.setState({errors,loading: false});
    
    if(errors.length === 0)
    this.props.navigation.navigate('browse');
  }

  onForgotPasswordClicked = () => {
    this.props.navigation.navigate("forgot_password");
  }


  render(){
    const {errors} = this.state;
    const errorStyle = key => errors.includes(key) ? styles.inputError : null;
    return (
      <KeyboardAvoidingView 
        style = {styles.container}
        keyboardVerticalOffset={Platform.select({ios: 0, android: theme.sizes.base*2})} 
        behavior="padding">
        <Block padding= {[0,theme.sizes.base*2]}>
         <Text h1 bold>Login</Text>
         <Block middle>
            <Input
              label= "Email"
              error = {errorStyle('email')}
              style = {[styles.input, errorStyle('email')]}
              defaultValue = {this.state.email}
              onChangeText = {(text)=>this.onEmailTextChanged(text)}
            />
            <Input
              secure
              label= "Password"
              style = {[styles.input,errorStyle('password')]}
              error = {errorStyle('password')}
              defaultValue = {this.state.password}
              onChangeText = {(text)=>this.onPasswordTextChanged(text)}
            />
            <Button gradient onPress={this.onLoginClicked}>
              {this.state.loading ? 
                <DotIndicator color = {theme.colors.white} count = {4} size = {theme.sizes.base*0.5}/> : 
                <Text bold white center>Login</Text>
              }
            </Button>
            <Button onPress = {this.onForgotPasswordClicked}>
              <Text center caption gray style = {{textDecorationLine: 'underline'}}>Forgot Password?</Text>
            </Button>
         </Block>
        </Block>
      </KeyboardAvoidingView>
    );
  }
}

LoginScreen.propTypes ={
}

LoginScreen.defaultProps ={
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

export default LoginScreen;
