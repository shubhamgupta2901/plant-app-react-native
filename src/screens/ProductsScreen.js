import React from 'react';
import PropTypes from 'prop-types'
import {View, Text} from 'react-native';

class ProductsScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {
    }
  }
  render(){
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Products Screen</Text>
      </View>
    );
  }
}

ProductsScreen.propTypes ={
}

ProductsScreen.defaultProps ={
}

export default ProductsScreen;
