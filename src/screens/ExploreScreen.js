import React from 'react';
import {Dimensions,   StyleSheet, Image} from 'react-native'
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/Ionicons';
import {Block, Text, Input} from '../elements';
import {theme, mocks} from '../constants';
const {width} = Dimensions.get('window');

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
  render(){
    const {params} = this.props.navigation.state;
    return (
       <Block >
         {this.renderHeader()}
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
})

ExploreScreen.propTypes ={
}

ExploreScreen.defaultProps ={
}

export default ExploreScreen;
