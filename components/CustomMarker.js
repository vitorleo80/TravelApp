import React from 'react';
import {
  StyleSheet,
  Image
} from 'react-native';

export default class CustomMarker extends React.Component {
  render() {
    return (
      <Image
        style={styles.image}
        source={this.props.pressed ? require('../public/marker.png') : require('../public/marker.png')}
        resizeMode='contain'
      />
    );
  }
}

const styles = StyleSheet.create({
  image: {
    height: 40,
    width: 40
  }
});