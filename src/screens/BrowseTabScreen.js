import * as React from 'react';
import { View, TouchableOpacity,Dimensions,StyleSheet, Image,ScrollView} from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import Animated from 'react-native-reanimated';
import PropTypes from 'prop-types';
import { Block, Text, Button, Card, Badge} from '../elements';
import {theme, mocks} from '../constants';
import {ProductsTab, ArticlesTab, GalleryTab} from './browsetabs';

const { width } = Dimensions.get('window');


export default class BrowseTabScreen extends React.Component {
  state = {
    index: 0,
    routes: [
      { key: 'products', title: 'Products' },
      { key: 'inspirations', title: 'Inspirations' },
      { key: 'shop', title: 'Shop' },
    ],
  };

  _handleIndexChange = index => this.setState({ index });

  _renderTabBar = props => {
    const inputRange = props.navigationState.routes.map((x, i) => i);

    return (
      <View style={styles.tabBar}>
        {props.navigationState.routes.map((route, i) => {
          const color = Animated.color(
            Animated.round(
              Animated.interpolate(props.position, {
                inputRange,
                outputRange: inputRange.map(inputIndex =>
                  inputIndex === i ? 255 : 0
                ),
              })
            ),
            0,
            0
          );

          return (
            <TouchableOpacity
              style={styles.tabItem}
              onPress={() => this.setState({ index: i })}>
              <Animated.Text style={{ color }}>{route.title}</Animated.Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  _renderScene = SceneMap({
    products: ProductsTab,
    inspirations: ArticlesTab,
    shop: GalleryTab,
  });

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

  render() {
    return (
    <Block>
        {this.renderHeader()}
        <TabView
            navigationState={this.state}
            renderScene={this._renderScene}
            renderTabBar={this._renderTabBar}
            onIndexChange={this._handleIndexChange}
        />
    </Block>
      
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabBar: {
    flexDirection: 'row',
    paddingTop: 0,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
  },
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
});

BrowseTabScreen.propTypes = {
    profile: PropTypes.object,
    categories: PropTypes.arrayOf(PropTypes.object),
    tabs: PropTypes.arrayOf(PropTypes.string),
}
  
BrowseTabScreen.defaultProps = {
    profile: mocks.profile,
    categories: mocks.categories,
    tabs: ['Products', 'Inspirations', 'Shop'],
}
