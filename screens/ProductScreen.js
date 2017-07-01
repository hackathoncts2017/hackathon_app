import React from 'react';
import { ScrollView, StyleSheet,Text } from 'react-native';

export default class ProductScreen extends React.Component {
  static navigationOptions = {
    title: 'Product',
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <Text>Product</Text>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
