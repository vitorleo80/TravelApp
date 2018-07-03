import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ButtonGroup } from 'react-native-elements';
import SingleTimeLine from './SingleTimeLine';
import hotels from '../utils/hotels.json';
import axios from 'axios';

export default class TimeLines extends React.Component {
    state = {
        activities: {},
        timeline: [],
        buttons: [],
        selectedIndex: 0
    }

    componentDidMount() {
        const dayParams = this.props.navigation.state.params.sliderOneValue
        const noPerDay = Array.isArray(dayParams) ? dayParams[0] : 3
        const {city, activities} = this.props.navigation.state.params;
        const hotel = hotels[city];
        const postBody = {
            startPoint: hotel,
            activities: activities, 
            noPerDay: noPerDay
        };
        return axios.post('https://be-travel-planning-app.herokuapp.com/api/itinerary', postBody)
            .then(({ data }) => this.setState({ activities: data, buttons: data.buttons }))
            .catch(err => console.log(err));
    }


    render() {

        const { buttons } = this.state

        return (
            <View style={styles.container}>



                {this.state.timeline.length >= 1 &&
                    <SingleTimeLine timeline={this.state.timeline} generateTimeLine={this.state.generateTimeLine} />
                }



                {this.state.buttons.length >= 1 &&
                    <ButtonGroup
                        onPress={this.generateTimeLine}
                        selectedIndex={this.state.selectedIndex}
                        buttons={buttons}
                        containerStyle={{ height: 50 }}
                        buttonStyle={{ backgroundColor: '#3a7daf' }}
                        textStyle={{ fontWeight: 'bold', color: 'white', }}
                    />}

            </View>
        );
    }
    generateTimeLine = (selectedIndex) => {
        this.setState({ selectedIndex })
        const timeline = [...this.state.activities[`Day${selectedIndex + 1}`]]
        this.setState({ timeline })
    }


}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    list: {
        flex: 1,
        // marginTop: 20,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    descriptionContainer: {
        flexDirection: 'row',
        paddingRight: 50,
        marginRight: 10,
        marginLeft: 40,
        marginTop: 10,
        paddingTop: 20,
        paddingBottom: 20,
        backgroundColor: '#e6f5ff',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#D3D3D3'
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 25
    },
    textDescription: {
        marginLeft: 10,
        color: 'gray'
    }
});



