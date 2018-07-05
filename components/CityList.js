import React, { Component } from 'react';
import { View, ScrollView, ImageBackground, TouchableHighlight, StyleSheet, Text, Alert, Image } from 'react-native';
import cityImg from '../utils/cityImg.json';


export default class CityList extends Component {

    render() {

        const cities = Object.keys(cityImg)

        return (

            <View>
                <View>

                    <ImageBackground source={require('../public/header.png')} style={styles.header}>
                        <Image source={require('../public/logo.png')} style={styles.logo} />
                    </ImageBackground>
                </View>
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
        borderWidth: 1,
        borderBottomColor: '#3a7daf'
    },
    headline: {
        fontSize: 20,
        textAlign: 'center',
        backgroundColor: 'rgba(0,0,0,0)',
        color: 'white',
        marginTop: 70,
        fontWeight: 'bold'
    },
    header: {
        height: 30,

    },
    logo: {
        alignSelf: 'center',
        height: 25,
        width: 25
    }
});