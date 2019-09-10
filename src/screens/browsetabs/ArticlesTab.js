import React from 'react';
import {StyleSheet,View, Text} from 'react-native'
import PropTypes from 'prop-types'

class ArticlesTab extends React.Component {
  constructor(props){
    super(props);
    this.state = {
    }
  }
  render(){
    return (
        <View style={styles.container}>
            <Text>Articles</Text>
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

ArticlesTab.propTypes ={
}

ArticlesTab.defaultProps ={
}

export default ArticlesTab;
