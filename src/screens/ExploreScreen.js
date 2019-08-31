import React from 'react';
import {StyleSheet,View, Text} from 'react-native'
import PropTypes from 'prop-types'

class Component extends React.Component {
  constructor(props){
    super(props);
    this.state = {
    }
  }
  render(){
    const {params} = this.props.navigation.state;
    return (
        <View style={styles.container}>
            <Text>Explore Screen</Text>
            <Text>{params.category}</Text>
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

Component.propTypes ={
}

Component.defaultProps ={
}

export default Component;
