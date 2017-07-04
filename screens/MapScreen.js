import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { MapView } from 'expo';

const mapDelta = 0.022;
const ANCHOR = { x: 0.5, y: 0.5 };
const watchID = null;
export default class MapScreen extends React.Component {

  static navigationOptions = {
    title: 'Map',
  };
  constructor(props) {
    super(props);
    this.state = {
      path: '',
      origin: '13.0011824, 80.2564907',
      destination : '13.0211824, 80.2264907',
      initialLatitude: 13.0011824,
      initialLongitute: 80.2564907,
      initialPosition: 'unknown',
      lastPosition: 'unknown'
    };
  }
  decode(t,e){
    for(var n,o,u=0,l=0,r=0,d= [],h=0,i=0,a=null,c=Math.pow(10,e||5);u<t.length;){
      a=null,h=0,i=0;do a=t.charCodeAt(u++)-63,i|=(31&a)<<h,h+=5;while(a>=32);n=1&i?~(i>>1):i>>1,h=i=0;do a=t.charCodeAt(u++)-63,i|=(31&a)<<h,h+=5;while(a>=32);o=1&i?~(i>>1):i>>1,l+=n,r+=o,d.push([l/c,r/c])}
      return d=d.map(function(t){return{latitude:t[0],longitude:t[1]}})
  }
  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        var initialPosition = JSON.stringify(position);
        alert(position.coords.latitude);
        alert(position.coords.longitude);
        this.setState({"initialLatitude" : position.coords.latitude, "initialLongitute": position.coords.longitude});

        this.getDirections(position.coords.latitude + ', ' + position.coords.longitude, this.state.destination);
      },
      (error) => alert(error.message),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
    watchID = navigator.geolocation.watchPosition((position) => {
      var lastPosition = JSON.stringify(position);
      this.setState({lastPosition});
    });
    
  }
  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

  async getDirections(startLoc, destinationLoc) {
      return fetch('https://maps.googleapis.com/maps/api/directions/json?origin=' + startLoc + '&destination=' + destinationLoc + '&key=AIzaSyCZenRHBTQJHJEG84Llh2sr2HH1pc9xt8I')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({path : this.decode(responseJson.routes[0].overview_polyline.points)})
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    return (
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: this.state.initialLatitude,
          longitude: this.state.initialLongitute,
          latitudeDelta: mapDelta,
          longitudeDelta: mapDelta,
        }}
      >
        <MapView.Marker
          coordinate={{
            latitude: this.state.initialLatitude,
            longitude: this.state.initialLongitute
          }}
        />
        <MapView.Marker
          coordinate={{
            latitude: +this.state.destination.split(',')[0].trim(),
            longitude: +this.state.destination.split(',')[1].trim()
          }}
        />
        <MapView.Polyline
            coordinates={[...this.state.path]}
            strokeWidth={4}
        />
      </MapView>
    );
  }
}
