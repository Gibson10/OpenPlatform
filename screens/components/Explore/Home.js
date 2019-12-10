/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import StarRating from 'react-native-star-rating';

class Home extends Component {
  render() {
    return (
      <View
        style={{
          width: this.props.width / 2 - 30,
          height: this.props.width / 2 - 50,
        }}>
        <View style={{flex: 1}}>
          <Image
            style={{flex: 1, width: null, height: null, resizeMode: 'cover'}}
            source={{uri: this.props.imageUri}}
          />
        </View>
        <View
          style={{
            flex: 1,
            alignItems: 'flex-start',
            justifyContent: 'space-evenly',
            paddingLeft: 5,
            marginBottom: 10,
            marginTop: 5,
          }}>
          <Text style={{fontSize: 10, color: '#b63838'}}>
            {this.props.type}
          </Text>
          <Text style={{fontSize: 12, fontWeight: 'bold'}}>
            {this.props.name}
          </Text>
          <Text style={{fontSize: 10}}>{this.props.price}</Text>
          <StarRating
            disabled={true}
            maxStars={5}
            rating={this.props.rating}
            starSize={10}
          />
        </View>
      </View>
    );
  }
}
export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
