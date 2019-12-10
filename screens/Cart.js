import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Platform,
  Animated,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';

import {List, ListItem} from 'react-native-elements';

const HEADER_MIN_HEIGHT = 50;
const HEADER_MAX_HEIGHT = 200;

export default class Cart extends Component {
  constructor() {
    super();

    this.scrollYAnimatedValue = new Animated.Value(0);

    this.array = [];
    this.state = {
      cart: [],
    };
  }

  // componentWillMount() {
  //   for (var i = 1; i <= 75; i++) {
  //     this.array.push(i);
  //   }
  // }

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
          {/* {this.state.countries.map((item, key) => (
            <TouchableOpacity>
              <View key={key} style={styles.item}>
                <View style={{justifyContent: 'flex-end'}}>
                  <Image
                    source={{
                      uri:
                        'https://res.cloudinary.com/drare428p/image/upload/v1574545284/dzsvpqbhifdcqfxgbzjk.jpg',
                    }}
                  />
                </View>
                <Text style={styles.itemText}>Doctor No : {item.name}</Text>
              </View>
            </TouchableOpacity>
          ))} */}
          <FlatList
            ItemSeparatorComponent={() => (
              <View
                style={{height: 1, width: '100%', backgroundColor: 'lightgray'}}
              />
            )}
            data={this.state.countries}
            keyExtractor={item => item.name}
            renderItem={({item}) => (
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate('ViewScheduledAppointment', {
                    name: item.name,
                    email: item.email,
                    image: item.imageSrc,
                  })
                }>
                <ListItem
                  roundAvatar
                  title={`${item.name}`}
                  subtitle={item.email}
                  leftAvatar={{source: {uri: item.imageSrc}}}
                  containerStyle={{borderBottomWidth: 0}}
                />
                {/* <Text style={{padding: 10}}>{item.name}</Text>
                <Image source={{uri: item.imageSrc}} /> */}
              </TouchableOpacity>
            )}
          />
        </ScrollView>

        <Animated.View
          style={[
            styles.animatedHeaderContainer,
            {height: headerHeight, backgroundColor: headerBackgroundColor},
          ]}>
          <Text style={styles.headerText}>My Cart</Text>
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    color: 'white',
    fontSize: 22,
  },
  item: {
    backgroundColor: '#e91e63',
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
