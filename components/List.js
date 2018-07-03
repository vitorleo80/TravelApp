import React, { Component } from 'react'
import { Text, View, StyleSheet, Button } from 'react-native'
import Swipeout from 'react-native-swipeout'; 




export default class List extends Component {
  
    state={
        activities:[]
    }

    componentDidMount(){
        const { activities } = this.props.navigation.state.params
        this.setState({activities})
    }
    

    render() {
        const { activities } = this.state
        const { city } = this.props.navigation.state.params

        const component1 = () =>
            <Button
                buttonStyle={styles.button}
                icon={{
                    name: 'call-split',
                    size: 35,
                    color: '#3a7daf'
                }}
                // title='Map'
                onPress={() => this.props.navigation.navigate('List', { activities: this.state.activities, deleteAttraction: this.deleteAttraction })}
            >
            </Button>
        const component2 = () =>
            <Button
                buttonStyle={styles.button}
                icon={{
                    name: 'format-list-bulleted',
                    size: 35,
                    color: '#3a7daf'
                }}
                // title='List'
                onPress={() => this.props.navigation.navigate('List', { activities: this.state.activities, deleteAttraction: this.deleteAttraction })}
            >
            </Button>
        const component3 = () =>
            <Button
                buttonStyle={styles.button}
                icon={{
                    name: 'flight-takeoff',
                    size: 35,
                    color: '#3a7daf'
                }}
                // title='Trip'
                onPress={() => this.props.navigation.navigate('TimeLines')}
            >
            </Button>

        const buttons = [{ element: component1 }, { element: component2 }, { element: component3 }]


        return (
            <View>
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
                    onPress={() => this.props.navigation.navigate('TimeLines', { activities: activities, city: city})}
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







