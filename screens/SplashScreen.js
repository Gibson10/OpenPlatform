import React, {Component} from 'react';
import {Text, StyleSheet, View, Image, ImageBackground} from 'react-native';

import bgImage from '../assets/shopping1.jpg';
import logo from '../assets/shopping.png';
export default class SplashScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.checkAuth = () => {
      setTimeout(() => {
        this.props.navigation.navigate('Auth');
      }, 4000);
    };
  }

  componentDidMount() {
    this.checkAuth();
  }
  render() {
    return (
      <ImageBackground source={bgImage} style={styles.container}>
        <View style={styles.logoContainer}>
          <Image source={logo} style={styles.logo} />
        </View>
      </ImageBackground>
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
    resizeMode: 'cover',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 50,
  },
  logo: {
    width: 200,
    height: 150,
  },
  LogoText: {
    color: 'white',
    fontSize: 20,
    fontWeight: '500',
    marginTop: 10,
    opacity: 0.5,
  },
});
