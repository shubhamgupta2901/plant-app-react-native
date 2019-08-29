import React from 'react';
import {createAppContainer, createStackNavigator} from 'react-navigation';
import {Image} from 'react-native';

import WelcomeScreen from '../screens/WelcomeScreen';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import ExploreScreen from '../screens/ExploreScreen';
import BrowseScreen from '../screens/BrowseScreen';
import ProductsScreen from '../screens/ProductsScreen';
import SettingsScreen from '../screens/SettingsScreen';

import {theme} from '../constants';

const screens = createStackNavigator(
    {
        welcome: WelcomeScreen,
        login: LoginScreen,
        signup: SignupScreen,
        explore: ExploreScreen,
        browse: BrowseScreen,
        products: ProductsScreen,
        settings: SettingsScreen,
    },
    {
        initialRouteName: "welcome",
        defaultNavigationOptions: {
            headerStyle: {},
            headerBackImage: <Image/>,
            headerBackTitle: null,
            headerLeftContainerStyle: {},
            headerRightContainerStyle: {},
        }
    }
);

export default createAppContainer(screens);