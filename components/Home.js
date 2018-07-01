import React from 'react'
import { View, Button, Image, StyleSheet, TouchableHighlight, Text } from 'react-native';



export default class Home extends React.Component {

  render() {
    return (

      <View>
        <TouchableHighlight style={styles.logoContainer} onPress={() => this.props.navigation.navigate('CityList')} >
          <Image style={styles.logo} source={require('../public/logo.png')} />
        </TouchableHighlight>
        <Text style={styles.text}>Triptoon</Text>

        {/* <Button
            title='CityList'
            onPress={() => this.props.navigation.navigate('CityList')}
          >
          </Button> */}
      </View >

    )
  }
}

const styles = StyleSheet.create({
  logoContainer: {

  },
  logo: {

    marginTop: 50,
    alignSelf: 'stretch',
    width: 350,
    height: 300
  },
  text: {
    alignSelf: 'center',
    color: '#29a8c8'
  }

})
