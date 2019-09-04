import React from 'react';
import {Animated, Dimensions,   StyleSheet, Image, TouchableOpacity} from 'react-native'
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';
import {Block, Text, Input, Button} from '../elements';
import {theme, mocks} from '../constants';
import { ScrollView } from 'react-native-gesture-handler';
const {height, width} = Dimensions.get('window');

class ExploreScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      searchFocus: new Animated.Value(0.6), 
      searchText: null,
    }
  }


  onImageClicked = () => {
    this.props.navigation.navigate('products');
  }

  onToggleSearchFocus = (isFocused) => {
    Animated.timing(
      this.state.searchFocus,
      {
        toValue: isFocused ? 0.8 : 0.6, // status === true, increase flex size
        duration: 150, // ms
      }
    ).start();
  }

  renderSearch = () => {
    const {searchFocus, searchText} = this.state;
    const isEditing = searchFocus && searchText;
    return (
      <Block animated middle flex={searchFocus} style = {styles.searchContainer}>
        <Input
          placeholder = "Search"
          placeholderTextColor = {theme.colors.gray}
          style = {styles.searchInput}
          value = {searchText}
          onChangeText = {(text) => {this.setState({searchText: text})}}
          onFocus = {()=>this.onToggleSearchFocus(true)}
          onBlur = {()=> this.onToggleSearchFocus(false)}
          rightLabel = { 
          <Icon 
            color={theme.colors.gray} 
            size={theme.sizes.font} 
            name={isEditing ? "ios-close":"ios-search"} 
            style={styles.searchIcon}
            />}
          rightStyle = {styles.searchRight}
          onRightPress = { ()=> isEditing ? this.setState({searchText: null}) : null}
        />
      </Block>
    );
  }

  renderHeader = () => {
    return (
      <Block flex={false} center row space="between" style= {styles.header}>
          <Text h1 bold>Explore</Text>
          {this.renderSearch()}
      </Block>
    )
  }

  renderImage = (image, index) => {
    const sizes = Image.resolveAssetSource(image);
    const fullWidth = width - (theme.sizes.padding * 2.5);
    const resize = (sizes.width * 100) / fullWidth;
    const imgWidth = resize > 75 ? fullWidth : sizes.width * 1;

    return (
      <TouchableOpacity
        key={`img-${index}`}
        onPress={() => this.onImageClicked()}
      >
        <Image
          source={image}
          style={[
            styles.image,
            { minWidth: imgWidth, maxWidth: imgWidth }
          ]}
        />
      </TouchableOpacity>
    )
  }

  renderExplore = () => {
    const {images} = this.props;
    const mainImage = images[0];
    const remainingImages = images.slice(1,images.length);
    return (
      <Block style = {{marginBottom: height / 3}} center>
        <TouchableOpacity
          style ={[styles.image,styles.mainImage]}
          onPress = {()=> this.onImageClicked()}
        >
          <Image
            style ={[styles.image,styles.mainImage]}
            resizeMode="cover"
            source={mainImage}
          />
        </TouchableOpacity>

        <Block row space="between" wrap>
          {images.slice(1, images.length).map((image, index) => this.renderImage(image, index))}
        </Block>

      </Block>
    );
  }

  renderFooter = () => {
    return (
      <LinearGradient
        locations={[0.5, 1]}
        style={styles.footer}
        colors={[theme.colors.transparent, theme.colors.white_transparent_6]}
      >
        <Button gradient style = {{width: width*0.5}}>
          <Text center bold white>Filter</Text>
        </Button>
      </LinearGradient>
    );
  }
  render(){
    const {params} = this.props.navigation.state;
    return (
       <Block >
         {this.renderHeader()}
         <ScrollView
          showsVerticalScrollIndicator={false}
          style = {styles.explore}
         >
           {this.renderExplore()}
         </ScrollView>
         {this.renderFooter()}
       </Block>
    );
  }
}

const styles = StyleSheet.create({
    header: {
      paddingHorizontal: theme.sizes.base*2,
      paddingBottom: theme.sizes.base*2,
    },
    searchContainer: {
      height: theme.sizes.base*2,
      width: width - theme.sizes.base * 2,
    },
    searchInput: {
      fontSize: theme.sizes.caption,
      height: theme.sizes.base*2,
      backgroundColor: theme.colors.grey_300,  
      borderColor: 'transparent',
      paddingLeft: theme.sizes.base/1.333,
      paddingRight: theme.sizes.base*1.5,
    },
    searchRight: {
      top: 0,
      marginVertical: 0, 
      backgroundColor: 'transparent'
    },
    searchIcon: {
      position: 'absolute',
      right: theme.sizes.base/ 1.33,
      top: theme.sizes.base/1.6,
    },
    explore: {
      backgroundColor: theme.colors.transparent,
      marginHorizontal: theme.sizes.base*2,
    },
    footer: {
      position: 'absolute',
      bottom: 0,
      right: 0,
      left: 0,
      overflow: 'visible',
      alignItems: 'center',
      justifyContent: 'center',
      height: height*0.1,
      width: width,
      paddingBottom: theme.sizes.base*4,
    },
    image: {
      minHeight: 100,
      maxHeight: 130,
      maxWidth: width - (theme.sizes.padding * 2.5),
      marginBottom: theme.sizes.base,
      borderRadius: 4,
    },
    mainImage: {
      minWidth: width - (theme.sizes.padding * 2.5),
      minHeight: width - (theme.sizes.padding * 2.5),
    },
})

ExploreScreen.propTypes ={
  images: PropTypes.array,
}

ExploreScreen.defaultProps ={
  images: mocks.explore,
}

export default ExploreScreen;
