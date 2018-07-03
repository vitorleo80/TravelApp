import React, { Component } from 'react';
import { View, ScrollView, ImageBackground, TouchableHighlight, StyleSheet, Text, Alert } from 'react-native';
import cityImg from '../utils/cityImg.json';


export default class CityList extends Component {
    
    render() {
        
        const cities = Object.keys(cityImg)
        
        return (

            <View>
                <ScrollView>
                    {cities.map((city, i) => {
                        
                        return (
                            <TouchableHighlight key={`touch${i}`} onPress={() => this._onPressButton(`${city}`)} underlayColor="white">
                                <ImageBackground
                                    key={i}
                                    style={styles.image}
                                    source={{ uri: cityImg[city].url }}
                                >
                                    <Text key={`text${i}`} style={styles.headline}>{city[0].toUpperCase() + city.slice(1)}</Text>
                                </ImageBackground>
                            </TouchableHighlight>
                        );
                    })}
                </ScrollView>
            </View>

        );
    }
    _onPressButton = (name) => {
        this.props.navigation.navigate('AddActivities', { city: name })
    }
}

const styles = StyleSheet.create({
    image: {
        flex: 1,
        alignSelf: 'stretch',
        width: '100%',
        height: 150,
    },
    headline: {
        fontSize: 20,
        textAlign: 'center',
        backgroundColor: 'rgba(0,0,0,0)',
        color: 'white',
        marginTop: 70,
        fontWeight: 'bold'

    }
});