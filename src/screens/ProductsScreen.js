import React from 'react';
import {StyleSheet,View, Text} from 'react-native'
import PropTypes from 'prop-types'

const component = (props) => {
  return(
    <View style = {styles.container}>
      <Text>Product Screen</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
})

component.propTypes ={
}

component.defaultProps ={
}

export default component;
