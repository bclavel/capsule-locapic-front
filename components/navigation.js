import React from 'react';
import {StyleSheet, Text, View, Platform} from 'react-native';

import {Ionicons, MatterialCommunityIcons} from '@expo/vector-icons';

import HomeScreen from './home';
import PageA from './pageA';
import PageB from './pageB';

// Imports of my nav components
import {createBottomTabNavigator, createAppContainer, createStackNavigator} from 'react-navigation';

// Creation of my Bottom Navigation (the navigation with a visible tab bar)
const MainNavigator = createBottomTabNavigator({
  PageA : PageA,
  PageB : PageB,
}, {
  // The lastest version of react navigation requires us to use defaultNavigationOptions instead of navigationOptions
  defaultNavigationOptions: ({navigation}) => ({
    tabBarIcon: ({focused, horizontal, tintColor}) => {
      var iconName;
      var outline = (focused)
        ? ''
        // : '-outline'; // this -outline is actually leading to a visual error. Another icon library could solve the problem.
        : '';
      if (navigation.state.routeName == 'PageA') {
        Platform.OS === 'ios'
          ? iconName = 'ios-information-circle'
          : iconName = 'md-information-circle'
      } else if (navigation.state.routeName == 'PageB') {
        Platform.OS === 'ios'
          ? iconName = 'ios-search'
          : iconName = 'md-search'
      }
      return <Ionicons name={iconName + outline} size={25} color={tintColor}/>;
    }
  }),
  // This part is to handle the style of the bottom tab bar
  tabBarOptions: {
    activeTintColor: 'tomato',
    inactiveTintColor: 'gray'
  }
});

// Here, I can create the global navigation which both contains my three first page (without the bottom tab) as well as the whole MainNavigator component
var StackNavigator = createStackNavigator({
  // pages de ma navigation sans bottom
  Home: HomeScreen,

  // MainNavigator must my put inside the stack navigator
  MainNavigator: MainNavigator
}, {headerMode: 'none'})

// Finally, we just need to export StackNavigator (which contains all our screens) into the createAppContainer given function
export default Navigation = createAppContainer(StackNavigator);
