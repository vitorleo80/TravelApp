import React from 'react'
import AddActivities from '../components/AddActivities'
import TimeLines from '../components/TimeLines'
import { TabNavigator } from 'react-navigation'





export default TabNavigator(
  {
    AddActivities: {
      screen: AddActivities,
      navigationOptions: {
        tabBarLabel: 'Activities',
      }
    },
    // List: {
    //   screen: List,
    //   navigationOptions: {
    //     tabBarLabel: 'View List',
    //   }
    // },
    //   TimeLines: {
    //     screen: TimeLines,
    //     navigationOptions: {
    //       tabBarLabel: 'View TimeLine',
    //     }
    //   },
  },

  {
    navigationOptions: {
      header: null
    },
    tabBarPosition: 'bottom',
    // initialRouteName: 'AddActivities',
    animationEnabled: true,
    swipeEnabled: true,
    tabBarOptions: {
      style: {
        height: 35,
        backgroundColor: 'black'
      },
    }
  }
);