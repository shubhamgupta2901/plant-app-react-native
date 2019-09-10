import React from 'react';
import {StyleSheet,View, Text} from 'react-native'
import PropTypes from 'prop-types'

class GalleryTab extends React.Component {
  constructor(props){
    super(props);
    this.state = {
    }
  }
  render(){
    return (
        <View style={styles.container}>
            <Text>Gallery</Text>
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

GalleryTab.propTypes ={
}

GalleryTab.defaultProps ={
}

export default GalleryTab;
