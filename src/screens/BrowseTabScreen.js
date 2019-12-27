import * as React from 'react';
import { View, TouchableOpacity, StyleSheet,Dimensions, Image,ScrollView } from 'react-native';
import PropTypes from 'prop-types';
import { TabView, SceneMap } from 'react-native-tab-view';
import {GalleryTab, ArticlesTab, CategoriesTab} from './browsetabs';
import { Block, Text, Button, Card, Badge} from '../elements';
import {theme, mocks} from '../constants';

export default class BrowseTabScreen extends React.Component {
  state = {
    index: 0,
    routes: [
      { key: 'inspirations', title: 'Inspirations' },
      { key: 'shop', title: 'Articles' },
      { key: 'products', title: 'Products' },

    ],
    categories: [],
  };

  handleTabChange = index => this.setState({ index });

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

  renderTabs = (props) => {
    return (
      <View style = {styles.tabs}>
        {props.navigationState.routes.map((route, index)=> this.renderTab(route.title, index))}
      </View>
    );
  }

  renderTab = (routeTitle, routeIndex) => {
    const isActive = routeIndex === this.state.index;
    return (
      <TouchableOpacity
        key = {`tab-${routeTitle}`}
        onPress={() => this.setState({ index: routeIndex })}
        style = {[styles.tab, isActive ? styles.activeTab : null]}
      >
        <Text size = {16} medium gray = {!isActive} secondary = {isActive}>{routeTitle}</Text>
      </TouchableOpacity>
    )
  }

  renderScene = SceneMap({
    products: CategoriesTab,
    inspirations: GalleryTab,
    shop: ArticlesTab,
  });

  render() {
    return (
      <Block>
        {this.renderHeader()}
        <TabView
          navigationState={this.state}
          renderScene={this.renderScene}
          renderTabBar={this.renderTabs}
          onIndexChange={this.handleTabChange}
        />
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
    flexDirection: 'row',
    borderBottomColor: theme.colors.gray2,
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginTop:theme.sizes.base,
    marginHorizontal: theme.sizes.base *2 ,
  }, 
  tab:{
    flex: 1,
    alignItems: 'center',
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
});

BrowseTabScreen.propTypes ={
  profile: PropTypes.object,
  categories: PropTypes.arrayOf(PropTypes.object),
  tabs: PropTypes.arrayOf(PropTypes.string),
}

BrowseTabScreen.defaultProps ={
  profile: mocks.profile,
  categories: mocks.categories,
  tabs: ['Products', 'Inspirations', 'Articles'],
}