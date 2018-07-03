import React, { Component } from 'react';
import { View, ScrollView, StyleSheet, Linking, ImageBackground, TouchableHighlight, Text } from 'react-native';
import { Font, AppLoading } from 'expo';
import MaterialIcons from '../node_modules/@expo/vector-icons/fonts/MaterialIcons.ttf';
import { Card, ListItem, Icon, ButtonGroup, Button, CustomIcon } from 'react-native-elements';
import CityHeader from './CityHeader';
import NavigationBar from 'react-native-navbar';


export default class AddActivities extends Component {
  state = {
    items: [],
    activities: [],
    fontsAreLoaded: false,
    bookmark: false
  }

  componentDidMount = async () => {

    try {
      const { city } = this.props.navigation.state.params
      let { items } = await this.getPlaces(city)
      await Font.loadAsync({
        MaterialIcons,
        'Pacifico-Regular': require('../assets/fonts/Pacifico-Regular.ttf')
      });
      this.setState({ fontsAreLoaded: true, items })
    } catch (error) {
      console.log('error loading icon fonts', error);
    }
  }





  render() {
    if (!this.state.fontsAreLoaded) {

      return <AppLoading />
    }


    const { city } = this.props.navigation.state.params

    const component1 = () =>
      <Button
        buttonStyle={styles.button}
        icon={{
          name: 'call-split',
          size: 35,
          color: '#3a7daf'
        }}
        // title='Map'
        onPress={() => this.props.navigation.navigate('List', { activities: this.state.activities, deleteAttraction: this.deleteAttraction })}
      >
      </Button>
    const component2 = () =>
      <Button
        buttonStyle={styles.button}
        icon={{
          name: 'format-list-bulleted',
          size: 35,
          color: '#3a7daf'
        }}
        // title='List'
        onPress={() => this.props.navigation.navigate('List', { activities: this.state.activities, deleteAttraction: this.deleteAttraction, city: city })}
      >
      </Button>
    const component3 = () =>
      <Button
        buttonStyle={styles.button}
        icon={{
          name: 'flight-takeoff',
          size: 35,
          color: '#3a7daf'
        }}
        // title='Trip'
        onPress={() => this.props.navigation.navigate('TimeLines', { activities: this.state.activities, city: city })}
      >
      </Button>
   
    const buttons = [{ element: component1 }, { element: component2 }, { element: component3 }]
    
    
    const list = this.state.items    
    
    return (


      <View style={styles.container}>
        
        <CityHeader city={city}/>
        
        <ButtonGroup buttonStyle={styles.button} buttons={buttons}/>
        
        
        <ScrollView style={styles.container}>
          {list.map((activity, i) => {
            return (

              <Card
                key={i}
                title={activity.title}
                image={{ uri: activity.imageUrl }}>
                <Text style={{ fontSize: 12, marginBottom: 10 }}>
                  {activity.description}
                </Text>



                {activity.bookmark === false &&
                  <TouchableHighlight key={`add${i}`} onPress={() => { this.addActivity(activity) }}>
                    <Icon name='bookmark-border' color='#00BFFF' style={styles.addIcon} />
                  </TouchableHighlight>}

                {activity.bookmark === true &&
                  <TouchableHighlight key={`add${i}`} onPress={() => { this.deleteAttraction(activity) }}>
                    <Icon name='bookmark' color='#00BFFF' style={styles.addIcon} />
                  </TouchableHighlight>}

                <TouchableHighlight onPress={() => { Linking.openURL(`${activity.link}`) }}>
                  <Icon name='map' color='#00BFFF' />
                </TouchableHighlight>
              </Card>
            )
          })}
        </ScrollView>

      </View>
    );
  }



  addActivity = (activity) => {
    activity.bookmark = true
    const { activities } = this.state
    if (activities.length === 0) {
      this.setState({ activities: [activity] })
    }
    const newActivities = [...activities]
    this.setState({ activities: [...newActivities, activity] })

  }

  deleteAttraction = (activity) => {
    activity.bookmark = false
    const activities = [...this.state.activities]
    const index = activities.indexOf(activity)
    activities.splice(index, 1)
    this.setState({
      activities
    })

  }

  getPlaces = async (city) => {

    try {
      let response = await fetch(
        `https://be-travel-planning-app.herokuapp.com/api/cities/${city}/places`
      );
      let responseJson = await response.json();
      return responseJson;

    } catch (error) {
      console.error(error);
    }
  }


}

const styles = StyleSheet.create({

  container: {
    alignSelf: 'stretch',
    backgroundColor: '#3a7daf',
    borderBottomRightRadius: 200


  },
  image: {
    flex: 2,
    height: 150,
    borderBottomWidth: 1,
    borderBottomColor: 'yellow',
    flexDirection: 'row'

  },

  text: {
    textAlign: 'center',
    marginTop: 80,
    color: '#00BFFF',
    fontSize: 25,
  },

  popup: {
    justifyContent: 'center'
  },

  button: {
    backgroundColor: 'white',
    borderColor: 'yellow',
    borderRadius: 1,
    borderBottomRightRadius: 200,

  },
  buttongroup: {
    backgroundColor: 'white',
    borderColor: 'white',
  },

  addIcon: {
    marginRight: 0

  },
  IconContainer: {
    flexDirection: 'row',
    justifyContent: 'center',

  },

});
