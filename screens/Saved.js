import React, {Component} from 'react';
import {
  AppRegistry,
  Text,
  View,
  StyleSheet,
  Platform,
  Animated,
  ScrollView,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

import {connect} from 'react-redux';
const HEADER_MIN_HEIGHT = 50;
const HEADER_MAX_HEIGHT = 200;
const {height, width} = Dimensions.get('window');
class Saved extends Component {
  constructor(props) {
    super(props);

    this.scrollYAnimatedValue = new Animated.Value(0);

    this.state = {
      id: this.props.user._id,
      contracts: [],
    };
  }

  async componentDidMount() {
    var id = this.state.id;

    try {
      let response = await fetch(
        'https://farmersdatabase1.herokuapp.com/getmyapprovedcontracts/' +
          `${id}`,
      );
      let data = await response.json();

      this.setState({
        contracts: data.user,
      });
    } catch (error) {
      alert(error, 'Please connect your device to the internet');
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
      outputRange: ['#3339FF', '#3339FF'],
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
          <View style={{paddingHorizontal: 20, marginTop: 40}}>
            {this.state.contracts.map((item, key) => (
              <TouchableOpacity
                key={key}
                onPress={() =>
                  this.props.navigation.navigate('ViewMyContracts', {
                    name: item.businessName,
                    image: item.image,
                    offer: item.offer,
                    about: item.about,
                    location: item.businessPhysicalAddress,
                    id: item._id,
                    promotionname: item.promotionName,
                    contactnumber: item.businessContactNumber,
                    terms: item.terms,
                  })
                }>
                <View
                  key={key}
                  style={{width: width - 40, height: 200, marginTop: 20}}>
                  <Image
                    key={key}
                    style={{
                      flex: 1,
                      height: null,
                      width: null,
                      resizeMode: 'cover',
                      borderRadius: 5,
                      borderWidth: 1,
                      borderColor: '#dddddd',
                    }}
                    source={{uri: item.image}}
                  />
                  <Text style={{fontSize: 15, fontWeight: 'bold'}}>
                    {item.businessName}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        <Animated.View
          style={[
            styles.animatedHeaderContainer,
            {height: headerHeight, backgroundColor: headerBackgroundColor},
          ]}>
          <Text style={styles.headerText}>My Orders </Text>
        </Animated.View>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}
export default connect(mapStateToProps)(Saved);

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
    justifyContent: 'center',
    alignItems: 'center',
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
