import React, { Component } from 'react'
import MaterialIcons from '../node_modules/@expo/vector-icons/fonts/MaterialIcons.ttf';
import { Font, AppLoading } from 'expo';
import { Button, SearchBar, Card, ListItem } from 'react-native-elements';
import { StyleSheet, View, ScrollView, TouchableHighlight } from 'react-native';


export default class Search extends Component {

    state = {
     
        items: [],
        text: '',
        input: '',
        fontsAreLoaded: false
    }

    componentDidMount = async () => {
        
        try {
            await Font.loadAsync({
                MaterialIcons,
                'Pacifico-Regular': require('../assets/fonts/Pacifico-Regular.ttf')
            });
            this.setState({ fontsAreLoaded: true })
        } catch (error) {
            console.log('error loading icon fonts', error);
        }
    }



    render() {

        if (!this.state.fontsAreLoaded) {

            return <AppLoading />
        }

        const list = this.state.items

        return (
            <View style={styles.general}>
                <SearchBar
                    lightTheme
                    onChangeText={(text) => this.setState({ text })}
                    value={this.state.text}
                    placeholder='Type Here...' />

                <Button
                    buttonStyle={styles.button}
                    icon={{
                        name: 'flight-takeoff',
                        size: 35,
                        color: '#3a7daf'
                    }}

                    onPress={this.onClick}
                >
                </Button>
                
                <ScrollView>
                <Card containerStyle={{ padding: 0 }} >
                    {
                        list.length >= 1 &&
                        list.map((hotel, i) => {
                            return (
                                <TouchableHighlight key={`touch${i}`} onPress={() => this.addHotelObj(hotel)}>
                                <ListItem
                                    key={i}
                                    roundAvatar
                                    title={hotel.title}
                                    
                                />
                                </TouchableHighlight>
                            );
                        })
                    }
                </Card>
                </ScrollView>

            </View>
        )
    }

    getHotels = async (input) => {

        const { city } = this.props
        try {
            let response = await fetch(
                `http://be-travel-planning-app.herokuapp.com/api/cities/${city}/hotels?search=${input}`
            );
            let { items } = await response.json();
            this.setState({ items })
           
        } catch (error) {
            console.error(error);
        }
    }

    addHotelObj = (hotel) => {
        this.props.addHotel(hotel)
        this.setState({text: '', items: []})
    }


    onClick = () => {
        const text = this.state.text
        this.getHotels(text)
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


