import React from 'react';
import { StackNavigator } from 'react-navigation';
import TabNavigator from './TabNavigator.js';
import CityList from '../components/CityList'
import List from '../components/List'
import AddActivities from '../components/AddActivities'
import TimeLines from '../components/TimeLines'
import Home from '../components/Home'





const RootStackNavigator = StackNavigator(
  {
    // Main: {
    //   screen: TabNavigator,
    // },
    Home: {
      screen: Home,
      navigationOptions: {
        swipeEnabled: false
      }
    },

    CityList: {
      screen: CityList,
      navigationOptions: {
        swipeEnabled: false
      }
    },
    List: {
      screen: List,
      navigationOptions: {
        swipeEnabled: false
      }
    },
    TimeLines: {
      screen: TimeLines,
      navigationOptions: {
        swipeEnabled: false
      }
    },
    AddActivities: {
      screen: AddActivities,
      navigationOptions: {
        swipeEnabled: false
      }
    },

  }
);

export default class RootNavigator extends React.Component {
  render() {
    return <RootStackNavigator />;
  }
}