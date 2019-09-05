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

  renderHeaderGallery = (images = []) => {
    return(
      <FlatList
        horizontal
        scrollEnabled
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        snapToAlignment="center"
        data = {images}
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

  renderHeaderGallerySteps = (images = []) => {
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
    );
  }
  renderName = (name = "") => {
    return  <Text h2 bold> {name}</Text>;
  }

  renderTags = (tags =[]) => {
    return (
      <Block flex={false} row  margin = {[theme.sizes.base,0]}>
        {tags.map(tag => (
          <Button
            key = {CommonUtils.generateUniqueId()}
            center
            color={theme.colors.white} 
            style = {styles.tag}
          >
          <Text small light gray2 center semibold>{tag}</Text>
        </Button>
        ))}
      </Block>
    )
  }

  renderDescription = (description = "") => {
    return <Text gray light height={22}>{description}</Text>
  }
  renderBottomGallery = (images = []) => {
    const startIndex = 0;
    const endIndex = Math.min(2,images.length); // endIndex is exclusive
    return (
      <Block>
        <Text semibold>Gallery</Text>
        <Block row margin={[theme.sizes.padding*0.9, 0]}>
          {images.slice(startIndex,endIndex).map((image) => (
            <Image 
              key={CommonUtils.generateUniqueId()}
              source={image}
              style = {styles.image}
              />
          ))}
          {
            images.length > (endIndex-startIndex) ? (
              <Block 
                style = {styles.more}
                flex={false}
                card
                center
                middle
              >
                <Text gray>{`+ ${images.length-(endIndex-startIndex)}`}</Text>
              </Block>
            ): null 
          }
        </Block>
      </Block>
    )
  }
  render(){
    const {product} = this.props;
    return (
      <ScrollView showsVerticalScrollIndicator = {false}>
        <Block center middle>
          {this.renderHeaderGallery(product.images)}
          {this.renderHeaderGallerySteps(product.images)}
        </Block>
        
        <Block style = {styles.productContainer}>
          {this.renderName(product.name)}
          {this.renderTags(product.tags)}
          {this.renderDescription(product.description)}
          <Divider margin={[theme.sizes.padding * 0.9, 0]}/>
          {this.renderBottomGallery(product.images)}
        </Block>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  productContainer: {
    paddingHorizontal: theme.sizes.base * 2,
    paddingVertical: theme.sizes.padding,
  },
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
  tag: {
    marginRight: theme.sizes.base*0.625,
    borderRadius: theme.sizes.radius* 3 , 
    borderColor: theme.colors.gray2, 
    borderWidth: StyleSheet.hairlineWidth,
    height: theme.sizes.base*2,
    paddingHorizontal: theme.sizes.base , 
  },
  image: {
    width: width / 3.26,
    height: width / 3.26,
    marginRight: theme.sizes.base,
  },
  more: {
    marginRight: theme.sizes.base,
    backgroundColor: theme.colors.grey_300,
    width: width / 7,
    height: width/7,
  }
})

ProductScreen.propTypes ={
  product : PropTypes.object,
}

ProductScreen.defaultProps ={
  product: mocks.products[0],
}

export default ProductScreen;
