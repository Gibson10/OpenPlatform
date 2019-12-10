import {createStackNavigator} from 'react-navigation-stack';
import React, {Component} from 'react';
import {createSwitchNavigator, createAppContainer} from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';
import Explore from './Explore';
import Saved from './Saved';
import Profile from './Profile';
import LoginScreen from './Login';
import Cart from './Cart';
import Signup from './Signup';

import ViewScheduledAppointment from './ViewScheduledAppointment';
import ViewProduct from './ViewProduct';

const MainNavigator = createStackNavigator({
  Profile: {screen: Profile},
  Signup: {screen: Signup},
  Explore: {screen: Explore},
  Cart: {screen: Cart},
  Login: {screen: LoginScreen},
  ViewProduct: {screen: ViewProduct},
  ViewScheduledAppointment: {screen: ViewScheduledAppointment},
});

const BottomNavigator = createMaterialBottomTabNavigator({
  Explore: {
    screen: Explore,
    navigationOptions: {
      tabBarLabel: 'Explore',
      tabBarIcon: ({tintColor}) => (
        <Icon name="ios-analytics" color={tintColor} size={24} />
      ),
      header: ({goBack}) => ({
        left: (
          <Icon
            name={'chevron-left'}
            onPress={() => {
              goBack();
            }}
          />
        ),
      }),
    },
  },

  Cart: {
    screen: Cart,
    navigationOptions: {
      tabBarLabel: 'Wishlist',
      tabBarIcon: ({tintColor}) => (
        <Icon name="ios-cart" color={tintColor} size={24} />
      ),
      header: ({goBack}) => ({
        left: (
          <Icon
            name={'chevron-left'}
            onPress={() => {
              goBack();
            }}
          />
        ),
      }),
    },
  },
  Saved: {
    screen: Saved,
    navigationOptions: {
      tabBarLabel: 'Cart',
      tabBarIcon: ({tintColor}) => (
        <Icon name="ios-heart" color={tintColor} size={24} />
      ),
      header: ({goBack}) => ({
        left: (
          <Icon
            name={'chevron-left'}
            onPress={() => {
              goBack();
            }}
          />
        ),
      }),
    },
  },
  Profile: {
    screen: Profile,
    navigationOptions: {
      tabBarLabel: 'Profile',
      tabBarIcon: ({tintColor}) => (
        <Icon name="ios-person" color={tintColor} size={24} />
      ),
      header: ({goBack}) => ({
        left: (
          <Icon
            name={'chevron-left'}
            onPress={() => {
              goBack();
            }}
          />
        ),
      }),
    },
  },
});
const AuthNavigator = createStackNavigator({
  Login: {
    getScreen: () => require('./Login').default,
  },
});

const AppNavigator = createSwitchNavigator(
  {
    Splash: {
      getScreen: () => require('./SplashScreen').default,
    },
    Auth: AuthNavigator,
    Main: MainNavigator,
    Bottom: BottomNavigator,
  },
  {
    initialRouteName: 'Splash',
  },
);

const AppNavigate = createAppContainer(AppNavigator);

class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <AppNavigate />;
  }
}

export default Navigation;
