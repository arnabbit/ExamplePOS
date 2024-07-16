import React, { Component } from 'react';
import { View, Image, StyleSheet } from 'react-native';

export default class Header extends Component {
  render() {
    console.log("Rendering Header Screen");
    return (
      <View style={styles.header}>
        <Image
          source={require('../logo192.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    height: 80,
    justifyContent: 'center',
    alignItems: 'flex-start', // Align logo to the left
    backgroundColor: '#007bff', // Blue header
    paddingHorizontal: 20,
  },
  logo: {
    width: 150,
    height: 40,
  },
});