import React from 'react';
import {StyleSheet,ScrollView, Image, View} from 'react-native';
import PropTypes from 'prop-types';
import {Block, Text, Button, Switch, Divider, Input,Slider} from '../elements';
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
      sliders: {
        budget:{
          label: 'Budget',
          minimumValue: 0,
          maximumValue: mocks.profile.budget*2,
          value: mocks.profile.budget,
          step: 100,
        },
        monthlyCap:{
          label: 'Monthly Cap',
          minimumValue: 0,
          maximumValue: mocks.profile.monthly_cap*2,
          value: mocks.profile.monthly_cap,
          step: 100,
        },
      },
      switches:{
        notification: {
          label: "Notification",
          value: true,

        },
        newsletter: {
          label: "Newsletter",
          value: true,

        }
      }
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

  onSliderValueChange = (newValue,sliderKey) =>{
    if(!this.state.sliders[sliderKey])
      return null;
    let newSlidersState = {...this.state.sliders};
    newSlidersState[sliderKey].value = newValue;
    this.setState({sliders: newSlidersState});  
  }

  onSwichValueChange = (newValue, switchKey) => {
    if(!this.state.switches[switchKey])
      return null;
    let newSwitchesState = {...this.state.switches};
    newSwitchesState[switchKey].value = newValue;
    this.setState({switches: newSwitchesState}); 
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

  renderSliders = () => {
    const sliderComponents = Object.entries(this.state.sliders).map(
      ([sliderKey,sliderValues]) => (
        <Slider
          label = {sliderValues.label}
          value = {sliderValues.value}
          step = {sliderValues.step}
          minimumValue ={sliderValues.minimumValue}
          maximumValue = {sliderValues.maximumValue} 
          onValueChange = {(value)=>this.onSliderValueChange(value, sliderKey)}
        />
      ));
    return(
      <Block>
        {sliderComponents}
      </Block>
    );
  }

  renderSwitches = () => {
    const switchComponents = Object.entries(this.state.switches).map(([switchKey, switchValue])=> (
      <Block center row space="between" padding = {[theme.sizes.base,theme.sizes.base*2]} >
        <Text>{switchValue.label}</Text>
        <Switch
          value={switchValue.value}
          onValueChange={(value)=> this.onSwichValueChange(value, switchKey)}
        />
      </Block>
    ));

    return(
      <Block>
        {switchComponents}
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
            {this.renderSliders()}
            <Divider/>
            {this.renderSwitches()}
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
