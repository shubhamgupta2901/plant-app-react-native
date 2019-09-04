import React from 'react';
import {Dimensions,StyleSheet, Image, TouchableOpacity,ScrollView} from 'react-native';
import PropTypes from 'prop-types';
import { Block, Text, Button, Card, Badge} from '../elements';
import {theme, mocks} from '../constants';

const { width } = Dimensions.get('window');

class BrowseScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      active: this.props.tabs[0],
      categories:[],
    }
  }

  componentDidMount(){
    this.setState({categories: this.getCategoriesForActiveTab(this.state.active)})
  }

  getCategoriesForActiveTab = (tab) => {
    const filteredCategories = this.props.categories.filter( category => {
      if(category.tags.includes(tab.toLowerCase()))
        return true;
      return false;
    })
    return filteredCategories;
  }

  onTabClicked = (tab) => {
    if(tab === this.state.active)
      return;
    this.setState({
      active: tab,
      categories: this.getCategoriesForActiveTab(tab),
    });
  }
  
  onAvatarClicked = () => {
    this.props.navigation.navigate('settings');
  }

  onCategoryClicked = (categoryName) => {
    this.props.navigation.navigate('explore',{category: categoryName})
  }

  renderHeader = () => {
    return (
        <Block flex={false} center row space="between" style= {styles.header}>
          <Text h1 bold>Browse</Text>
          <Button onPress = {this.onAvatarClicked}>
            <Image
              source={this.props.profile.avatar}
              style={styles.avatar}
            />
          </Button>
        </Block>
    );
  }
  renderTabs = () => {
    return (
      <Block  flex={false} row center space="between" style = {styles.tabs}>
        {this.props.tabs.map(tab =>this.renderTab(tab))}
      </Block>
    );
    
  }

  renderTab = (tab) => {
    const isActive  = tab === this.state.active;
    return (
      <TouchableOpacity
        key = {`tab-${this.props.tabs.indexOf(tab)}`}
        onPress = {()=> this.onTabClicked(tab)}
        style = {[styles.tab, isActive ? styles.activeTab : null]}
      >
        <Text size = {16} medium gray = {!isActive} secondary = {isActive}>{tab}</Text>
      </TouchableOpacity>
    )
  }

  renderCategories = () =>{
    return (
      <ScrollView 
        showsVerticalScrollIndicator = {false}
        style = {{paddingVertical: theme.sizes.base *2}}
      >
        <Block row space="between" style={styles.categories}>
          {this.state.categories.map(category => this.renderCategory(category))}
        </Block>
      </ScrollView>
    );
  }

  renderCategory = (category) => {
    return(
      <TouchableOpacity 
        key={category.id}
        onPress={()=>this.onCategoryClicked(category.name)}
      >
        <Card center middle shadow style ={styles.category} >
          <Badge margin = {[0,0,15,0]} size = {theme.sizes.base*3} color = {theme.colors.badgeTint}>
            <Image source={category.image}/> 
          </Badge>
          <Text medium height={20}>{category.name}</Text>
          <Text gray caption>{`${category.count} Products`}</Text>
        </Card>
      </TouchableOpacity>
    );
  }
  render(){
    return (
      <Block>   
        {this.renderHeader()}
        {this.renderTabs()}
        {this.renderCategories()}
      </Block>
    );
  }
}

const styles = StyleSheet.create({
    header: {
      paddingHorizontal: theme.sizes.base*2,
    },
    avatar:{
      height:theme.sizes.base * 2.4,
      width: theme.sizes.base * 2.4,
      borderRadius: theme.sizes.base * 1.2,
    },
    tabs: {
      borderBottomColor: theme.colors.gray2,
      borderBottomWidth: StyleSheet.hairlineWidth,
      marginTop:theme.sizes.base,
      marginHorizontal: theme.sizes.base *2 ,
    }, 
    tab:{
      marginRight:theme.sizes.base * 0.5,
      paddingBottom: theme.sizes.base,
    },
    activeTab:{
      borderBottomColor: theme.colors.secondary,
      borderBottomWidth: 3,
    },
    categories:{
      flexWrap: 'wrap',
      paddingHorizontal: theme.sizes.base *2,
      marginBottom: theme.sizes.base* 3.5,
    },
    category:{
      minWidth: (width - (theme.sizes.padding * 2.4) - theme.sizes.base) / 2,
      maxWidth: (width - (theme.sizes.padding * 2.4) - theme.sizes.base) / 2,
      maxHeight: (width - (theme.sizes.padding * 2.4) - theme.sizes.base) / 2,
    },
})

BrowseScreen.propTypes ={
  profile: PropTypes.object,
  categories: PropTypes.arrayOf(PropTypes.object),
  tabs: PropTypes.arrayOf(PropTypes.string),
}

BrowseScreen.defaultProps ={
  profile: mocks.profile,
  categories: mocks.categories,
  tabs: ['Products', 'Inspirations', 'Shop'],
}

export default BrowseScreen;
