import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';

import {createBottomTabNavigator, createAppContainer, createStackNavigator} from 'react-navigation';
import {Ionicons, MatterialCommunityIcons} from '@expo/vector-icons';

import userData from './reducers/user.reducer';

import Navigation from './components/navigation';

import {createStore, combineReducers}  from 'redux';
const store = createStore(combineReducers({userData}));

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Navigation />
      </Provider>
    );
  }
}

export default App
