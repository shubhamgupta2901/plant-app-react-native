import React from 'react';
import {StyleSheet,View, Text} from 'react-native'
import PropTypes from 'prop-types'

class SettingsScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {
    }
  }
  render(){
    return (
        <View style={styles.container}>
            <Text>SettingsScreen</Text>
        </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
})

SettingsScreen.propTypes ={
}

SettingsScreen.defaultProps ={
}

export default SettingsScreen;
