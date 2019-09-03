import React from 'react';
import {StyleSheet,ScrollView, Image, View} from 'react-native';
import PropTypes from 'prop-types';
import Slider from "react-native-slider";
import {Block, Text, Button, Switch, Divider, Input} from '../elements';
import {theme,mocks} from '../constants';
import {CommonUtils} from '../utils'

class SettingsScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      inputs:{
        username: {
          label: 'Username',
          value: mocks.profile.username,
          editable: false,
          hasRightLabel: true,
        },
        location: {
          label: 'Location',
          value: mocks.profile.location,
          editable: false,
          hasRightLabel: true,
        },
        email: {
          label: 'Email',
          value: mocks.profile.email,
          editable: false,
          hasRightLabel: false,
        }
      },
      sliderValue: 1000,
    }
  }

  onInputChangeText = (newText, inputKey) =>{
    if(!this.state.inputs[inputKey])
      return null;

    let newInputsState = {...this.state.inputs};
    newInputsState[inputKey].value = newText; 
    
    this.setState({inputs: newInputsState});
  }

  toggleEditable = (inputKey) => {
    if(!this.state.inputs[inputKey] || !this.state.inputs[inputKey].hasRightLabel)
      return null;
    
    let newInputsState = {...this.state.inputs};
    newInputsState[inputKey].editable = !this.state.inputs[inputKey].editable; 
    
    this.setState({inputs: newInputsState});
  }

  renderHeader = () => {
    return (
      <Block flex = {false} center row space="between" style = {styles.header}>
        <Text h1 bold>Settings</Text>
        <Button>
          <Image
            source = {mocks.profile.avatar}
            style ={styles.avatar}
          />
        </Button>
      </Block>
    )
  }

  renderInputs = () => {
    const inputComponents = [];
    Object.entries(this.state.inputs).forEach(
      ([key,value])=>{ inputComponents.push(
        <Input
          key = {CommonUtils.generateUniqueId()}
          value={value.value}
          label = {value.label}
          editable = {value.editable}
          style = {[styles.input, value.editable ?  styles.editableInput : styles.nonEditableInput]}
          rightLabel = { value.hasRightLabel ? <Text color={theme.colors.primary}>{value.editable? "Save" : "Edit"}</Text> : null}
          onRightPress = {()=> this.toggleEditable(key)}
          onChangeText = {(text)=> this.onInputChangeText(text,key)}
        />
      )})
    
    return (
      <Block 
        padding = {[0,theme.sizes.base*2]}
        color={theme.colors.white}
      >
       {inputComponents}
      </Block>
    );
  }

  render(){
    return (
        <Block>
          {this.renderHeader()}
          <ScrollView>
            {this.renderInputs()}
            <Divider/> 
            <Block margin={theme.sizes.base*3}>
            <Slider
              value={this.state.sliderValue}
              step ={100}
              minimumValue = {0}
              maximumValue = {5000}
              onValueChange={value => this.setState({ sliderValue: value })}
              minimumTrackTintColor='#1fb28a'
              maximumTrackTintColor='#d3d3d3'
              thumbTintColor='#1a9274'
            />
            <Text>
              Value: {this.state.sliderValue}
            </Text>
            </Block>
          </ScrollView>
        </Block>
    );
  }
}

const styles = StyleSheet.create({
    header:{
      paddingHorizontal: theme.sizes.base*2,
    },
    avatar: {
      height: theme.sizes.base*2.4,
      width: theme.sizes.base*2.4,
      borderRadius: theme.sizes.base*1.2,
    },
    input:{
      borderColor: "transparent",
      borderWidth: 0,
      borderBottomColor: theme.colors.gray2,
      backgroundColor: theme.colors.white,
    },
    editableInput: {
      fontWeight: '300',
    },
    nonEditableInput: {
      fontWeight: '500',
    }
})

SettingsScreen.propTypes ={

}

SettingsScreen.defaultProps ={
}

export default SettingsScreen;
