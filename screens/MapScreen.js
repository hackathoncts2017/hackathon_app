import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { Components } from 'expo';

const mapDelta = 0.022;
const ANCHOR = { x: 0.5, y: 0.5 };
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
      initialLongitute: 80.2564907
    };
  }
  decode(t,e){
    for(var n,o,u=0,l=0,r=0,d= [],h=0,i=0,a=null,c=Math.pow(10,e||5);u<t.length;){
      a=null,h=0,i=0;do a=t.charCodeAt(u++)-63,i|=(31&a)<<h,h+=5;while(a>=32);n=1&i?~(i>>1):i>>1,h=i=0;do a=t.charCodeAt(u++)-63,i|=(31&a)<<h,h+=5;while(a>=32);o=1&i?~(i>>1):i>>1,l+=n,r+=o,d.push([l/c,r/c])}
      return d=d.map(function(t){return{latitude:t[0],longitude:t[1]}})
  }
  componentDidMount() {
    this.getDirections(this.state.origin, this.state.destination);
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
      <Components.MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: this.state.initialLatitude,
          longitude: this.state.initialLongitute,
          latitudeDelta: mapDelta,
          longitudeDelta: mapDelta,
        }}
      >
      <Components.MapView.Marker
        coordinate={{
          latitude: this.state.initialLatitude,
          longitude: this.state.initialLongitute
        }}
      />
      <Components.MapView.Marker
        coordinate={{
          latitude: +this.state.destination.split(',')[0].trim(),
          longitude: +this.state.destination.split(',')[1].trim()
        }}
      />
      <Components.MapView.Polyline
          coordinates={[...this.state.path]}
          strokeWidth={4}
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
