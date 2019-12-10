/* eslint-disable no-alert */
/* eslint-disable react/no-did-mount-set-state */
/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  TouchableOpacity,
  Dimensions,
  Text,
  View,
  StyleSheet,
  Platform,
  Animated,
  ScrollView,
  StatusBar,
} from 'react-native';

import Home from './components/Explore/Home';
import SearchBar from './components/Explore/SearchBar';
const HEADER_MIN_HEIGHT = 50;
const HEADER_MAX_HEIGHT = 200;
const {height, width} = Dimensions.get('window');
export default class Explore extends Component {
  constructor() {
    super();

    this.scrollYAnimatedValue = new Animated.Value(0);
    this.state = {
      contracts: [],
    };
  }

  async componentDidMount() {
    try {
      let response = await fetch(
        'https://openplatformback.herokuapp.com/elimoinfo',
      );
      let data = await response.json();
      // console.log(data);

      this.setState({
        contracts: data,
      });
    } catch (error) {
      alert(error, 'Please connect your device to the internet');
    }
  }

  UNSAFE_componentWillMount() {
    var startHeaderHeight = 80;
    if (Platform.OS == 'android') {
      startHeaderHeight = 100 + StatusBar.currentHeight;
    }
  }

  render() {
    const headerHeight = this.scrollYAnimatedValue.interpolate({
      inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
      outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
      extrapolate: 'clamp',
    });

    const headerBackgroundColor = this.scrollYAnimatedValue.interpolate({
      inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
      outputRange: ['#3339FF', '#1DA1F2'],
      extrapolate: 'clamp',
    });

    return (
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={{paddingTop: HEADER_MAX_HEIGHT}}
          scrollEventThrottle={16}
          onScroll={Animated.event([
            {nativeEvent: {contentOffset: {y: this.scrollYAnimatedValue}}},
          ])}>
          <View style={{flex: 1, backgroundColor: 'white', paddingTop: 20}}>
            <Text
              style={{fontSize: 24, fontWeight: '700', paddingHorizontal: 20}}>
              Find the best products in market!
            </Text>
          </View>

          <View style={{marginTop: 20, paddingHorizontal: 5}}>
            <View
              style={{
                paddingHorizontal: 20,
                marginTop: 5,
                borderColor: '#dddddd',
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
              }}>
              {this.state.contracts.map((item, key) => (
                <TouchableOpacity
                  key={key}
                  onPress={() =>
                    this.props.navigation.navigate('ViewScheduledAppointment', {
                      name: item.businessName,
                      image: item.image,
                      offer: item.offer,
                      about: item.about,
                      location: item.businessPhysicalAddress,
                      id: item.businessuser,
                      promotionname: item.promotionName,
                      contactnumber: item.businessContactNumber,
                      terms: item.terms,
                    })
                  }>
                  <Home
                    key={key}
                    width={width}
                    name={item.businessName}
                    imageUri={item.image}
                    rating={4}
                  />
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </ScrollView>

        <Animated.View
          style={[
            styles.animatedHeaderContainer,
            {height: headerHeight, backgroundColor: headerBackgroundColor},
          ]}>
          <SearchBar
            iconName={'location-arrow'}
            placeholder={'Try "Products"'}
          />
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  animatedHeaderContainer: {
    position: 'absolute',
    top: Platform.OS == 'ios' ? 20 : 0,
    left: 0,
    right: 0,
  },
  headerText: {
    color: 'white',
    fontSize: 22,
  },
  item: {
    backgroundColor: '#ff9e80',
    margin: 8,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemText: {
    color: 'black',
    fontSize: 16,
  },
});
