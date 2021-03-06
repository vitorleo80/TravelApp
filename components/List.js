import React, { Component } from 'react'
import { Text, View, StyleSheet, ScrollView } from 'react-native'
import Swipeout from 'react-native-swipeout';
import MultiSlider from '../node_modules/@ptomasroos/react-native-multi-slider/MultiSlider'
import CityHeader from './CityHeader';
import CustomMarker from './CustomMarker';
import MaterialIcons from '../node_modules/@expo/vector-icons/fonts/MaterialIcons.ttf';
import { Font, AppLoading } from 'expo';
import { Button, Divider } from 'react-native-elements';


export default class List extends Component {

    state = {
        activities: [],
        sliderOneChanging: false,
        sliderOneValue: [3],
        fontsAreLoaded: false
    }

    componentDidMount = async () => {

        try {
            await Font.loadAsync({
                MaterialIcons
            });
            const { activities } = this.props.navigation.state.params
            this.setState({ fontsAreLoaded: true, activities })
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
        const { hotel } = this.props.navigation.state.params

        return (
            <View style={styles.general}>
                <CityHeader city={city} />

                <Button
                    buttonStyle={styles.buttonTimeline}
                    icon={{
                        name: 'flight-takeoff',
                        size: 35,
                        color: '#3a7daf'
                    }}
                    // title='Trip'
                    onPress={() => this.props.navigation.navigate('TimeLines', { activities: activities, city: city, sliderOneValue: this.state.sliderOneValue , hotel: hotel})}                >
                </Button>

                {/* slider */}
                <View style={styles.container}>

                    <View style={styles.sliders}>

                        <View style={styles.textBox}>
                            <Text>
                                <Text style={styles.textSlide}>HOW MANY ACTIVITIES PER DAY? </Text>
                                {' '}{' '}
                                <Text style={[styles.textSlide, this.state.sliderOneChanging && { fontSize: 25, color: '#3a7daf' }]}>{this.state.sliderOneValue}</Text>
                            </Text>
                        </View>

                        <MultiSlider
                            style={styles.slider}
                            values={this.state.sliderOneValue}
                            sliderLength={280}
                            min={1}
                            max={5}
                            customMarker={CustomMarker}
                            trackStyle={{
                                height: 2,
                                backgroundColor: '#3a7daf',
                            }}

                            onValuesChangeStart={this.sliderOneValuesChangeStart}
                            onValuesChange={this.sliderOneValuesChange}
                            onValuesChangeFinish={this.sliderOneValuesChangeFinish}
                        />

                    </View>

                </View>

                <ScrollView>
                    {
                        activities.length >= 1 &&

                        activities.map((item, i) => (
                            <Swipeout key={i} style={styles.swipeoutView} right={[
                                {
                                    text: 'delete',
                                    onPress: () => this.deleteAttraction(i, item),
                                    className: 'custom-class-2',
                                    backgroundColor: 'red'
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

                </ScrollView>

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

    general: {
        backgroundColor: '#3a7daf'
    },

    container: {
        padding: 10,
        marginTop: 3,
        marginBottom: 0,
        marginLeft: 10,
        marginRight: 10,
        backgroundColor: 'white',
        alignItems: 'center',
        borderBottomWidth: 2,
        borderColor: '#3a7daf',

    },

    text: {
        color: 'black',
        fontSize: 20,
        textAlign: 'center',
        textAlignVertical: 'auto',
        marginTop: 20
    },

    swipeoutView: {
        height: 80,
        backgroundColor: 'white',
        borderBottomWidth: .3,
        borderColor: '#3a7daf',
        margin: 10
    },

    button: {
        backgroundColor: 'white',
        borderColor: '#3a7daf',
    },

    buttongroup: {
        backgroundColor: 'white',
        borderColor: 'white',
    },

    buttonTimeline: {
        backgroundColor: 'white',
        borderBottomRightRadius: 50,
        margin: 10

    },

    textSlide: {
        fontWeight: 'bold',
        color: '#3a7daf'
    }
})







