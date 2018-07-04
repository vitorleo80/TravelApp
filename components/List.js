import React, { Component } from 'react'
import { Text, View, StyleSheet, Button } from 'react-native'
import Swipeout from 'react-native-swipeout'; 
import MultiSlider from '../node_modules/@ptomasroos/react-native-multi-slider/MultiSlider'
import CityHeader from './CityHeader';


export default class List extends Component {
  
    state = {
        activities: [],
        sliderOneChanging: false,
        sliderOneValue: [3]
    }

    componentDidMount(){
        const { activities } = this.props.navigation.state.params
        this.setState({activities})
    }
    

    render() {
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
                                backgroundColor: '#EA0000'
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
                        title='TimeLines'
                    onPress={() => this.props.navigation.navigate('TimeLines', { activities: activities, city: city, })}
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
        padding: 10,
        marginTop: 3,
        backgroundColor: '#d9f9b1',
        alignItems: 'center',
    },
    text: {
        color: '#FFFFFF'
    },
    swipeoutView: {
        height: 80,
        backgroundColor: '#232221'
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
    }
})







