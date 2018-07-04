import React, { Component } from 'react';
import { View, ScrollView, Image, Dimensions, StyleSheet, ImageBackground, TouchableHighlight, Alert, Text, Header, Icon } from 'react-native';
import cityImg from '../utils/cityImg.json';



export default class CityHeader extends Component {
  
  

  render() {

    const {city} = this.props 
    let header = {
      name: city[0].toUpperCase() + city.slice(1),
      avatar_url: cityImg[city].url
    }
    
    return (
 
      <View>
      <Image style={styles.city} source={{ uri: header.avatar_url }} />
        <Text style={styles.text}>{header.name}</Text>
      </View>
    );
  }
}


const styles = StyleSheet.create({

  city: {

    // borderBottomWidth: 3,
    borderColor: 'white',
    marginTop: 5,
    height: 100,
    borderWidth: 5
  },
  text: {
    position: 'absolute', 
    top: 40, 
    left: 140, 
    right: 0, 
    bottom: 0, 
    justifyContent: 'center', 
    alignItems: 'center',
    color: 'white',
    fontSize: 20,
    backgroundColor: 'rgba(0,0,0,0)',
    fontWeight: 'bold'
  }

})

  // < Text style = { styles.text } > { header.name }</Text>