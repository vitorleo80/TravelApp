import React from 'react'
import { View, Button, Image, StyleSheet, TouchableHighlight, Text } from 'react-native';





export default class Home extends React.Component {

  render() {
    return (

      <View>
        <TouchableHighlight style={styles.logoContainer} onPress={() => this.props.navigation.navigate('CityList')} >
          <Image style={styles.logo} source={require('../public/logo.jpeg')} />
        </TouchableHighlight>
        {/* <Text style={styles.text}>Tripster</Text> */}
        {/* <Image source={require('../public/skyline.png')} style={styles.skyline} /> */}
      </View >

    )
  }
}

const styles = StyleSheet.create({
  logoContainer: {


  },
  logo: {
    height: 570,
    width: 380
  },
  text: {
    alignSelf: 'center',
    color: '#29a8c8',
    fontSize: 50
  },
  skyline: {
    alignSelf: 'center',
    marginBottom: 0,
    height: 300,
    width: 370
  }

})