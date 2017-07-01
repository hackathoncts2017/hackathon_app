import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { Components } from 'expo';


export default class MapScreen extends React.Component {
  static navigationOptions = {
    title: 'Map',
  };

  render() {
    return (
      <Components.MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: 13.0011824,
          longitude: 80.2564907,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
      <Components.MapView.Marker
        coordinate={{
          latitude: 13.0011824,
          longitude: 80.2564907
        }}
        image={require('../assets/images/flag-blue.png')}
      />
      <Components.MapView.Marker
        coordinate={{
          latitude: 13.0211824,
          longitude: 80.2264907
        }}
        image={require('../assets/images/flag-pink.png')}
      />
      </Components.MapView>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});