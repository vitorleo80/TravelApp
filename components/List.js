import React, { Component } from 'react';
import { View, ScrollView, StyleSheet, ListView, ImageBackground, TouchableHighlight, Text } from 'react-native';
import { Font, AppLoading } from 'expo';
import MaterialIcons from '../node_modules/@expo/vector-icons/fonts/MaterialIcons.ttf';
import FontAwesome from '../node_modules/@expo/vector-icons/fonts/FontAwesome.ttf'
import { Button,  Rating } from 'react-native-elements';
import CityHeader from './CityHeader';
import Swipeout from 'react-native-swipeout'; 
import MultiSlider from '../node_modules/@ptomasroos/react-native-multi-slider/MultiSlider'



export default class List extends Component {
  
    state={
        activities:[],
        fontsAreLoaded: false,
        checked: false,
        fontsAreLoaded: false,
        sliderOneChanging: false,
        sliderOneValue: [3]
    }

    componentDidMount = async () => {
        try {
            const { activities } = this.props.navigation.state.params
            await Font.loadAsync({
                MaterialIcons,
                FontAwesome
            });
            this.setState({ activities, fontsAreLoaded: true })
        } catch (error) {
            console.log('error loading icon fonts', error);
        }
    }

    

    render() {

        if (!this.state.fontsAreLoaded) {

            return <AppLoading />
        } 


        const { activities } = this.state
        const { city } = this.props.navigation.state.params


        return (
            <View>
                <CityHeader city={city} />
              
                {/* slider */}
                <View style={styles.container}>
                    <View style={styles.sliders}>
                        <View style={styles.textBox}>
                        <Text>
                                <Text style={styles.textSlide}>How Many Activities per day? </Text>
                                {' '}{' '}
                                <Text style={[styles.textSlide, this.state.sliderOneChanging && { color: 'red' }]}>{this.state.sliderOneValue}</Text>
                         </Text>   
                        </View>
                        <MultiSlider
                            style={styles.slider}
                            values={this.state.sliderOneValue}
                            sliderLength={280}
                            onValuesChangeStart={this.sliderOneValuesChangeStart}
                            onValuesChange={this.sliderOneValuesChange}
                            onValuesChangeFinish={this.sliderOneValuesChangeFinish}
                        />
                    </View>
                    </View>

                {   
                    activities.length >= 1 &&
                    activities.map((item, i) => (
                        <Swipeout key={i} style={styles.swipeoutView} right={[
                            {
                                text: 'delete',
                                onPress: () => this.deleteAttraction(i, item),
                                className: 'custom-class-2',
                                backgroundColor: 'red',
                                



                            }
                        ]}>
                            <View key={`list${i}`} style={styles.swipeoutView}>
                                < Text style={styles.text} >
                                    {item.title}
                                </Text>
                            </View>
                        </Swipeout>
                    ))
                }

                 <Button
                        title='See TimeLine'
                    onPress={() => this.props.navigation.navigate('TimeLines', { activities: activities, city: city, sliderOneValue: this.state.sliderOneValue})}
                    >
                    </Button>
               
          

            </View>
        )
    }

    deleteAttraction = (i, item) => {
        const { deleteAttraction } = this.props.navigation.state.params
        deleteAttraction(item)
        const activities = [...this.state.activities]
        activities.splice(i, 1)
        this.setState({
            activities
        })

    }

    sliderOneValuesChangeStart = () => {
        this.setState({
            sliderOneChanging: true,
        });
    }

    sliderOneValuesChange = (values) => {
        let newValues = [0];
        newValues[0] = values[0];
        this.setState({
            sliderOneValue: newValues,
        });

    }

    sliderOneValuesChangeFinish = () => {
        this.setState({
            sliderOneChanging: false,
        });
    }

   
    
}



const styles = StyleSheet.create({

    container: {
        alignSelf: 'stretch',
        flexDirection: 'row',
        alignSelf: 'center',


    },
    text: {
        textAlign: 'center',
        color: 'white',
        fontSize: 12,
    },
    textSlide: {
        textAlign: 'center',
        color: 'black',
        fontSize: 12,
    },


    textBox: {
        backgroundColor: 'white',
        borderColor: 'yellow',
        borderRadius: 1,
    },
    slider1: {
        backgroundColor: 'black'
    },
    swipeoutView:{
        height: 30,
        backgroundColor: 'black',
        borderColor: 'yellow',
        borderRadius: 1,
    }
    




});