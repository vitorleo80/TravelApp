import React from 'react';
import Timeline from 'react-native-timeline-listview'
import { Text, TouchableOpacity, View, StyleSheet, Image } from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment'
import openMap from 'react-native-open-maps'



export default class SingleTimeLine extends React.Component {
    state = {
        isDateTimePickerVisible: false,
        selected: null,
        category: 3
    }



    componentWillMount() {
        this.setState({ isDateTimePickerVisible: false })

    }



    _showDateTimePicker = (rowData) => {
        this.setState({ isDateTimePickerVisible: true, selected: rowData })
    }

    _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

    _handleDatePicked = (date) => {
        console.log(date, 'param')
        const time = moment(date).format('HH:mm')
        console.log(time, '**format')


        const activities = this.props.timeline.map((activity) => {
            if (activity.id === this.state.selected.id) activity = { ...activity, time }
            return activity

        })

        this.props.ajustTime(activities)
        this._hideDateTimePicker();


    };




    render() {

        return (

            <View style={styles.container}>

                <Timeline
                    style={styles.list}
                    data={this.props.timeline.map((activity, i) => {

                        return ({
                            time: activity.time,
                            // title: activity.title,
                            id: activity.id,
                            description: activity.title,
                            imageUrl: activity.imageUrl

                        }
                        )
                    })}
                    renderTime={this.renderTime}
                    onEventPress={this.onEventPress}
                    renderDetail={this.renderDetail}
                    circleSize={20}
                    timeContainerStyle={{ minWidth: 72 }}
                    circleColor='#3a7daf'
                    lineColor='#3a7daf'
                    timeContainerStyle={{ minWidth: 52, marginTop: -5 }}
                    timeStyle={{ textAlign: 'center', backgroundColor: '#ff9797', color: 'white', padding: 5, borderRadius: 13 }}
                    options={{
                        style: { paddingTop: 5 }
                    }}
                />

                <DateTimePicker
                    isVisible={this.state.isDateTimePickerVisible}
                    onConfirm={this._handleDatePicked}
                    onCancel={this._hideDateTimePicker}
                    mode='time'
                    minuteInterval={30}
                    is24Hour={false}


                />


            </View>
        );
    }

    onEventPress(rowData) {

        openMap({ provider: 'google', query: `${rowData.description}` })
    }

    renderTime = (rowData, sectionID, rowID) => {

        let time = <Text >{rowData.time}</Text>
        return (
            <View >
                <TouchableOpacity onPress={() => this._showDateTimePicker(rowData)}>
                    {time}
                </TouchableOpacity>
            </View>

        )
    }

    renderDetail = (rowData, sectionID, rowID) => {
        let title = <Text style={[styles.title]}>{rowData.description}</Text>
        var desc = null
        if (rowData.description && rowData.imageUrl)
            desc = (
                <View style={styles.descriptionContainer}>
                    <Image source={{ uri: rowData.imageUrl }} style={styles.image} />
                    <Text style={[styles.textDescription]}>{rowData.description}</Text>
                </View>
            )

        return (
            <View style={{ flex: 1 }}>
                {title}
                {desc}
            </View>
        )
    }


}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        paddingTop: 10,
        backgroundColor: 'white'
    },
    list: {
        flex: 1,
        marginTop: 20,
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
        backgroundColor: '#3a7daf',
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
        fontSize: 16,
        color: 'white',
        fontWeight: 'bold'
    },

});












