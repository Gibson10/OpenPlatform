import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  Dimensions,
  ScrollView,
  Button,
  Platform,
  Alert,
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import AsyncStorage from '@react-native-community/async-storage';

import {connect} from 'react-redux';


const {width: WIDTH} = Dimensions.get('window');
class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: this.props.user.username,
      email: this.props.user.email,
      photo: this.props.user.image,
      location: '',
      longitude: '',
      phone: '',
    };

    // this.findCoordinates();

  }

  createFormData(photo, body) {
    const data = new FormData();

    data.append('photo', {
      name: photo.fileName,
      type: photo.type,
      uri:
        Platform.OS === 'android'
          ? photo.uri
          : photo.uri.replace('file://', ''),
    });

    Object.keys(body).forEach(key => {
      data.append(key, body[key]);
    });

    return data;
  }

  handleChoosePhoto() {
    const options = {
      noData: true,
    };

    ImagePicker.launchImageLibrary(options, response => {
      if (response.uri) {
        this.setState({photo: response.uri});
      }
    });
  }

  async handleChange() {
    var data = {
      username: this.state.username,
      password: this.state.password,
      email: this.state.email,
    };
    var result = this.createFormData(this.state.photo, data);

    try {
      const response = await fetch(
        'https://afyaconnect.herokuapp.com/updateprofile/',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          body: result,
        },
      );

      const data1 = await response.json();

      alert(data1.user);
    } catch (error) {
      alert(error);
    }
  }

  // findCoordinates() {
  //   navigator.geolocation.getCurrentPosition(
  //     position => {
  //       const location = JSON.stringify(position);

  //       this.setState({
  //         location: location,
  //         latitude: location.mocked,
  //         longitude: location.logitude,
  //       });
  //       // alert(location);
  //     },
  //     error => alert(error.message),
  //     {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
  //   );
  // }

  render() {
    const {photo} = this.state;
    return (
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.header} />

          {photo && <Image style={styles.avatar} source={{uri: photo}} />}

          <Button
            style={{marginTop: 10}}
            title="Choose Photo"
            onPress={() => this.handleChoosePhoto()}
          />

          <View style={styles.body}>
            <View style={styles.bodyContent}>
              <Text style={styles.name}>{this.state.username}</Text>
            </View>
            <View>
              <Text>{this.state.location.mocked}</Text>
            </View>

            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                value={this.state.username}
                onChangeText={text => this.setState({username: text})}
                placeholder={'username'}
                underLineColorAndroid="transparent"
              />
            </View>

            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                value={this.state.email}
                onChangeText={text => this.setState({email: text})}
                placeholder={'email'}
                underLineColorAndroid="transparent"
              />
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                value={this.state.phone}
                onChangeText={text => this.setState({farmsize: text})}
                placeholder={'phone number'}
                underLineColorAndroid="transparent"
              />
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                value={this.state.location}
                onChangeText={text => this.setState({location: text})}
                placeholder={'location'}
                underLineColorAndroid="transparent"
              />
            </View>

            <View />

            <View style={styles.bodyContent}>
              <TouchableOpacity
                style={styles.buttonContainer}
                onPress={() => this.handleChange()}>
                <Text>Update</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}
export default connect(mapStateToProps)(Profile);

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#3339FF',
    height: 200,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: 'white',
    marginBottom: 15,
    alignSelf: 'center',
    position: 'absolute',
    marginTop: 70,
  },
  name: {
    fontSize: 22,
    color: '#000000',
    fontWeight: '600',
  },
  body: {
    marginTop: 20,
  },
  bodyContent: {
    flex: 1,
    alignItems: 'center',
    padding: 30,
  },
  info: {
    fontSize: 16,
    color: '#00BFFF',
    marginTop: 10,
  },
  description: {
    fontSize: 16,
    color: '#696969',
    marginTop: 10,
    textAlign: 'center',
  },
  buttonContainer: {
    marginTop: 10,
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
    backgroundColor: '#3339FF',
  },
  input: {
    width: WIDTH - 55,
    height: 40,
    borderRadius: 45,
    fontSize: 16,
    paddingLeft: 45,
    backgroundColor: '#FFF',
    color: '#000000',
    marginHorizontal: 25,
  },
  inputContainer: {
    marginTop: 10,
  },
  select: {
    width: WIDTH - 55,
    marginHorizontal: 25,
    marginTop: 10,
  },
});
