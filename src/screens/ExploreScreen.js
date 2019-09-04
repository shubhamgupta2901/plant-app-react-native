import React from 'react';
import {Dimensions,   StyleSheet, Image} from 'react-native'
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
      searchText: "",
    }
  }

  renderSearch = () => {
    return (
      <Block middle flex={0.6} style = {styles.searchContainer}>
        <Input
          placeholder = "Search"
          placeholderTextColor = {theme.colors.gray}
          style = {styles.searchInput}
          value = {this.state.searchText}
          onChangeText = {(text) => {this.setState({searchText: text})}}
          rightLabel = { 
          <Icon 
            color={theme.colors.gray} 
            size={theme.sizes.font} 
            name={"ios-search"} 
            style={styles.searchIcon}
            />}
          rightStyle = {styles.searchRight}
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

  renderExplore = () => {
    return (
      <Block>
        <Text>Images</Text>
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
    }
})

ExploreScreen.propTypes ={
}

ExploreScreen.defaultProps ={
}

export default ExploreScreen;
