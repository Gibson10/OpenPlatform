/* eslint-disable no-alert */
import React, {Component} from 'react';
// import{Box,} from "react-native-design-utility"
import {
  TouchableOpacity,
  ImageBackground,
  Text,
  Image,
  TextInput,
  Dimensions,
  StyleSheet,
  View,
  Button,
  Alert,
  BackHandler,
} from 'react-native';

import bgImage from '../assets/shopping1.jpg';
import logo from '../assets/shopping.png';
import {connect} from 'react-redux';

const {width: WIDTH} = Dimensions.get('window');
class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      email: '',
    };

    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }

  componentDidMount() {
    BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
  }

  UNSAFE_componentWillUnmount() {
    BackHandler.removeEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
  }

  signup() {
    this.props.navigation.navigate('Signup');
  }

  async handleChange() {
    var data = {
      username: this.state.username,
      password: this.state.password,
      email: this.state.email,
    };

    try {
      const response = await fetch(
        'https://afyaconnect.herokuapp.com/register/',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        },
      );

      const data1 = await response.json();

      alert(data1.response);

      if (data1.response == 'TRUE') {
        this.props.addUser(data1.user);
        this.props.navigation.navigate('Bottom');
      } else {
        alert(
          'The user is already registered, please use other account details',
        );
      }
    } catch (error) {
      alert(error);
    }
  }

  handleBackButtonClick() {
    this.props.navigation.navigate('Login');
    return true;
  }

  render() {
    return (
      <ImageBackground source={bgImage} style={styles.container}>
        <View style={styles.logoContainer}>
          <Image source={logo} style={styles.logo} />
          <Text style={styles.LogoText}> {this.state.username}</Text>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={this.state.username}
            onChangeText={text => this.setState({username: text})}
            placeholder={'Username'}
            placeholderTextColor={'rgba(255,255,255,0.7)'}
            underLineColorAndroid="transparent"
          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={this.state.password}
            onChangeText={text => this.setState({password: text})}
            placeholder={'Password'}
            secureTextEntry={true}
            placeholderTextColor={'rgba(255,255,255,0.7)'}
            underLineColorAndroid="transparent"
          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={this.state.email}
            onChangeText={text => this.setState({email: text})}
            placeholder={'Email'}
            placeholderTextColor={'rgba(255,255,255,0.7)'}
            underLineColorAndroid="transparent"
          />
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={() => this.handleChange()}>
          <Text style={styles.buttonText}>Signup</Text>
        </TouchableOpacity>
      </ImageBackground>
    );
  }
}

function mapDispatchToProps(dispatch, name) {
  return {
    addUser: user => dispatch({type: 'ADD_USER', payload: user}),
  };
}
export default connect(
  null,
  mapDispatchToProps,
)(Signup);

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    width: null,
    height: null,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
  input: {
    width: WIDTH - 55,
    height: 40,
    borderRadius: 45,
    fontSize: 16,
    paddingLeft: 45,
    backgroundColor: 'rgba(0,0,0,0.35)',
    color: 'rgba(255, 255, 255, 0.7)',
    marginHorizontal: 25,
  },
  inputContainer: {
    marginTop: 10,
  },
  InputIcon: {
    position: 'absolute',
    top: 8,
    left: 37,
  },
  signupTextCont: {
    flexGrow: 1,
    alignItems: 'flex-end',
    color: '#ffffff',
    justifyContent: 'center',
    paddingVertical: 16,
    flexDirection: 'row',
  },
  signupButton: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '500',
  },
  signupText: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 16,
  },
  button: {
    width: 300,
    backgroundColor: '#1c313a',
    borderRadius: 25,
    marginVertical: 10,
    paddingVertical: 13,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#ffffff',
    textAlign: 'center',
  },
});
