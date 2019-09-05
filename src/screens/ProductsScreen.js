import React from 'react';
import {StyleSheet, ScrollView, Image} from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/Ionicons';
import {Block, Text, Button, Divider} from '../elements';
import {theme, mocks} from '../constants';
import {CommonUtils} from '../utils'

class ProductScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {
    }
  }

  static navigationOptions = ({navigation}) => {
    return {
      headerRight: (
        <Button>
          <Icon 
            color={theme.colors.gray} 
            size={theme.sizes.base*1.5} 
            name={"ios-more"} 
            />
        </Button>
      ),
    };
  }
  render(){
    return (
      <ScrollView
        showsVerticalScrollIndicator = {false}
      >
        <Block>
          <Image
            source = {this.props.product.images[0]}
            style ={{height: 200}}
          />
        </Block>
        <Block padding = {[theme.sizes.base, theme.sizes.base*2]} >
          <Text h2 bold> {this.props.product.name}</Text>
        </Block>

        <Block row  padding = {[0, theme.sizes.base*2]}>
          {this.props.product.tags.map(tag => (
            <Button
              key = {CommonUtils.generateUniqueId()}
              center
              color={theme.colors.white} 
              style = {{
                marginRight: theme.sizes.base*0.5,
                borderRadius: theme.sizes.radius* 3 , 
                borderColor: theme.colors.gray2, 
                borderWidth: 1,
                height: theme.sizes.base*2,
                paddingHorizontal: theme.sizes.base , 
              }}
            >
            <Text small light gray2 center semibold>{tag}</Text>
           </Button>
          ))}
        </Block>

        <Block padding = {[theme.sizes.base, theme.sizes.base*2]} >
          <Text gray body> {this.props.product.description}</Text>
        </Block>

        <Divider/>
        
        <Block padding = {[0, theme.sizes.base*2]}>
            <Text bold>Gallery</Text>

        </Block>

      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
    
})

ProductScreen.propTypes ={
  product : PropTypes.object,
}

ProductScreen.defaultProps ={
  product: mocks.products[0],
}

export default ProductScreen;
