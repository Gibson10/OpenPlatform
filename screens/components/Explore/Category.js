/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';

class Category extends Component {
  render() {
    return (
      <View
        style={{
          height: 130,
          width: 130,
          marginLeft: 20,
          borderWidth: 0.5,
          borderColor: '#dddddd',
        }}>
        <View style={{flex: 1}}>
          <Image
            source={{uri: this.props.imageUri}}
            style={{flex: 1, width: 130, height: 300, resizeMode: 'cover'}}
          />
        </View>

        <Text style={{flex: 1, paddingLeft: 10, paddingTop: 20}}>
          {this.props.name}
        </Text>
        {/* <Text style={{flex:1,paddingLeft:10}}>
                {this.props.address}
            </Text> */}
      </View>
    );
  }
}
export default Category;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
