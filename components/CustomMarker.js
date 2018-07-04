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
        source={this.props.pressed ? require('../public/logo.png') : require('../public/logo.png')}
        resizeMode='contain'
      />
    );
  }
}

const styles = StyleSheet.create({
  image: {
    height: 80,
    width: 80
  }
});