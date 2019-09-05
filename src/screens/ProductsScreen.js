import React from 'react';
import {Animated,Dimensions,StyleSheet, ScrollView, Image, FlatList} from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/Ionicons';
import {Block, Text, Button, Divider} from '../elements';
import {theme, mocks} from '../constants';
import {CommonUtils} from '../utils'
const {width, height} = Dimensions.get('window');
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

  scrollX = new Animated.Value(0);

  renderGallery = () => {
    return(
      <FlatList
        horizontal
        scrollEnabled
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        snapToAlignment="center"
        data = {this.props.product.images}
        keyExtractor = {(item, index) => `${index}`}
        renderItem = {({item,index}) =>{
          return (
            <Image 
              source ={item}
              style = {{width: width,height: height*0.4}}
              resizeMode="contain"
            />
          )
        }}
        onScroll={
          Animated.event([{
            nativeEvent: { contentOffset: { x: this.scrollX } }
          }])
        }
      />
    )
  }

  renderSteps = () => {
    const images = this.props.product.images;
    const stepPosition = Animated.divide(this.scrollX, width)
    return (
      <Block row center middle style = {styles.stepsContainer}>
        {images.map((image, index) => {
          const opacity = stepPosition.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [0.4, 1, 0.4],
            extrapolate: 'clamp',
          });
          return(
            <Block 
              key = {`step-${index}`}
              animated
              flex={false}
              style = {[styles.steps,{opacity}]} 
              color={theme.colors.gray}
            />
          );
        })
      }
      </Block>
    )

  }
  render(){
    return (
      <ScrollView
        showsVerticalScrollIndicator = {false}
      >
        <Block center middle>
          {this.renderGallery()}
          {this.renderSteps()}
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
  stepsContainer:{
    position: 'absolute',
    bottom: theme.sizes.base* 2,
    right: 0,
    left: 0,
  },
  steps: {
    width: 5,
    height: 5, 
    borderRadius: 5,
    marginHorizontal: 2.5,
  },
})

ProductScreen.propTypes ={
  product : PropTypes.object,
}

ProductScreen.defaultProps ={
  product: mocks.products[0],
}

export default ProductScreen;
