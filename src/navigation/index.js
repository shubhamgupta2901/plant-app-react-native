import React from 'react';
import {createAppContainer, createStackNavigator} from 'react-navigation';
import {Platform, Image} from 'react-native';


import WelcomeScreen from '../screens/WelcomeScreen';
import LoginScreen from '../screens/LoginScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import SignupScreen from '../screens/SignupScreen';
import ExploreScreen from '../screens/ExploreScreen';
import BrowseScreen from '../screens/BrowseScreen';
import ProductsScreen from '../screens/ProductsScreen';
import SettingsScreen from '../screens/SettingsScreen';
import BrowseTabScreen from '../screens/BrowseTabScreen';

import {theme} from '../constants';


const screens = createStackNavigator(
    {
        welcome: WelcomeScreen,
        login: LoginScreen,
        forgot_password: ForgotPasswordScreen,
        signup: SignupScreen,
        browse: BrowseTabScreen,
        explore: ExploreScreen, 
        products: ProductsScreen,
        settings: SettingsScreen,
    },
    {
        initialRouteName:'browse',
        defaultNavigationOptions: {
            headerStyle: {
                height: theme.sizes.base*4,
                backgroundColor: theme.colors.white,
                borderBottomColor: "transparent",
                elevation: 0 //for android devices. Disabling the elevation of header
            },
            headerBackImage: <Image source={require('../../assets/icons/back.png')}/>,
            headerBackTitle: null,
            headerLeftContainerStyle: {
                alignItems: 'center',
                marginLeft: Platform.OS === 'ios' ? theme.sizes.base : 0,
                padding: theme.sizes.base,
            },
            headerRightContainerStyle: {
                alignItems: 'center',
                marginLeft: Platform.OS === 'ios' ? theme.sizes.base : 0,
                padding: theme.sizes.base,
            },
        }
    }
);

export default createAppContainer(screens);