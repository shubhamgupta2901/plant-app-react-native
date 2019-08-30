import React from 'react';
import {Platform, StyleSheet, Keyboard, KeyboardAvoidingView} from 'react-native'
import PropTypes from 'prop-types'
import {Block, Input, Button, Text, DotIndicator} from '../elements';
import {theme} from '../constants';
import {CommonUtils} from '../utils';
import { validateEmail } from '../utils/CommonUtils';

class ForgotPasswordScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      loading: false,
      email: 'plantapp@react.com',
      errors: [],
    }
  }

  onEmailTextChanged = (newText) => {
    this.setState({email: newText});
  }

  onEmailEntered = async () => {
    Keyboard.dismiss();
    this.setState({loading: true});
    await CommonUtils.wait(1200);
    const errors = [];
    if(!validateEmail(this.state.email)){
      errors.push('email');
    }
    this.setState({loading: false, errors});
    if(errors.length === 0){
      //show modal
      this.set
    }
  }

  onLoginClicked = () => {
    this.props.navigation.navigate("login");
  }

  render(){
    const { errors } = this.state;
    const errorStyle = key => errors.includes(key) ? styles.inputError : null;
    return (
        <KeyboardAvoidingView
          style = {styles.container}
          keyboardVerticalOffset = {Platform.select({ios: 0, android: theme.sizes.base*2})}
          behavior = "padding">
            <Block padding= {[0, theme.sizes.base*2]}>
              <Text h1 bold>Forgot Password</Text>
              <Block middle>
                <Input
                  label= "Email"
                  error = {errorStyle('email')}
                  style = {[styles.input, errorStyle('email')]}
                  defaultValue = {this.state.email}
                  onChangeText = {(text)=>this.onEmailTextChanged(text)}
                />
                <Button gradient onPress={this.onEmailEntered}>
                  {this.state.loading ? 
                    <DotIndicator color = {theme.colors.white} count = {4} size = {theme.sizes.base*0.5}/> : 
                    <Text bold white center>Forgot</Text>
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
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
})

ForgotPasswordScreen.propTypes ={
}

ForgotPasswordScreen.defaultProps ={
}

export default ForgotPasswordScreen;
