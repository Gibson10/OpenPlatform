import React, {Component} from 'react';
import {StyleSheet, View, Alert, Platform} from 'react-native';
import Navigation from './screens/navigation';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import store from './screens/redux/store';

// const initialState = {
//   user: {},
// };
// const reducer = (state = initialState, action) => {
//   switch (action.type) {
//     case 'ADD_USER':
//       return {user: action.payload};
//   }

//   return state;
// };

// const store = createStore(reducer);

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
    };
  }

  render() {
    return (
      <Provider store={store}>
        <Navigation />
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    width: null,
    height: null,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
