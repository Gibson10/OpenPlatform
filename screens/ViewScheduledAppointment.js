/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Platform,
  StatusBar,
  Image,
  ScrollView,
  BackHandler,
  Alert,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';
import Modal from 'react-native-modal';
import MyDatePicker from './components/Date/Datepicker';
import Appointment from './Cart';

const {width: WIDTH} = Dimensions.get('window');
const {height, width} = Dimensions.get('window');
class ViewScheduledAppointment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      username: this.props.user.username,
      email: this.props.user.email,
      photo: this.props.user.image,
      phone: this.props.user.image,
      quantity: '',
      Location: this.props.user.location,
    };

    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  UNSAFE_componentWillMount() {
    var startHeaderHeight = 80;
    if (Platform.OS == 'android') {
      startHeaderHeight = 100 + StatusBar.currentHeight;
    }
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

  handleBackButtonClick() {
    this.props.navigation.navigate('Bottom');
    return true;
  }


  async submitContract() {
    var product = {
      username: this.state.username,
      email: this.state.email,
      photo: this.props.navigation.state.params.image,
      phone: this.state.phone,
      quantity: this.state.quantity,
      location: this.state.location,
    };
    console.log(product);
    var id = this.props.navigation.state.params.id;

    try {
      const response = await fetch(
        'https://openplatformback.herokuapp.com/updateorder/' + `${id}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(product),
        },
      );

      const data1 = await response.json();
      if (data1.response == 'TRUE') {
        alert('Thank you for submitting your order');
      } else {
        alert(
          'An errror occured, please attempt to purchase the product again',
        );
      }
    } catch (error) {
      alert(error);
    }
  }
  render() {
    return (
      <ScrollView scrollEventThrottle={16}>
        <View style={{paddingHorizontal: 20, marginTop: 40}}>
          <Text style={{fontSize: 24, fontWeight: '700'}}>
            View the Product{' '}
          </Text>
          <Text style={{fontWeight: '100', marginTop: 10}}>
            Please review the product
          </Text>

          <View style={{width: width - 40, height: 200, marginTop: 20}}>
            <Image
              style={{
                flex: 1,
                height: null,
                width: null,
                resizeMode: 'cover',
                borderRadius: 5,
                borderWidth: 1,
                borderColor: '#dddddd',
              }}
              source={{uri: this.props.navigation.state.params.image}}
            />
          </View>
          <Text style={{fontWeight: '100', marginTop: 10}}>
            {this.props.navigation.state.params.promotionname}
          </Text>
          <Text style={{fontWeight: '100', marginTop: 10}}>
            {this.props.navigation.state.params.about}
          </Text>

          {/* <Button  onPress={() => {this.setModalVisible(true);}}title = "Enroll on this Contract"/> */}
          <ScrollView scrollEventThrottle={16}>
            <Modal
              animationType="slide"
              transparent={false}
              visible={this.state.modalVisible}
              onRequestClose={() => {
                Alert.alert('Modal has been closed.');
              }}>
              <View style={{marginTop: 22}}>
                <View>
                  <Text
                    style={{
                      fontSize: 24,
                      fontWeight: '700',
                      paddingHorizontal: 20,
                    }}>
                    Please fill in these details
                  </Text>
                  <View style={styles.inputContainer}>
                    <TextInput
                      style={styles.input}
                      value={this.props.user.username}
                      placeholderTextColor={'rgba(255,255,255,0.7)'}
                      onChangeText={text => this.setState({username: text})}
                      underLineColorAndroid="transparent"
                    />
                  </View>

                  {/* <View style={styles.inputContainer}>
                    <TextInput
                      style={styles.input}
                      value={this.props.user.farmsize}
                      placeholder={'Farm Size'}
                      placeholderTextColor={'rgba(255,255,255,0.7)'}
                      underLineColorAndroid="transparent"
                    />
                  </View> */}

                  <View style={styles.inputContainer}>
                    <TextInput
                      style={styles.input}
                      value={this.props.user.email}
                      placeholder={'Email'}
                      onChangeText={text => this.setState({email: text})}
                      placeholderTextColor={'rgba(255,255,255,0.7)'}
                      underLineColorAndroid="transparent"
                    />
                  </View>
                  <View style={styles.inputContainer}>
                    <TextInput
                      style={styles.input}
                      value={this.props.user.phone}
                      onChangeText={text => this.setState({phone: text})}
                      placeholder={'Phone number'}
                      placeholderTextColor={'rgba(255,255,255,0.7)'}
                      underLineColorAndroid="transparent"
                    />
                  </View>
                  <Text
                    style={{
                      marginTop: 4,
                      fontSize: 16,
                      color: '#011f3f',
                      marginLeft: 60,
                    }}>
                    Quantity you want to Buy
                  </Text>

                  <View style={styles.inputContainer}>
                    <TextInput
                      style={styles.input}
                      value={this.state.quantity}
                      onChangeText={text => this.setState({quantity: text})}
                      placeholder={'Example (100 pounds)'}
                      placeholderTextColor={'rgba(255,255,255,0.7)'}
                      underLineColorAndroid="transparent"
                    />
                  </View>

                  <View style={styles.inputContainer}>
                    <TextInput
                      style={styles.input}
                      value={this.state.location}
                      onChangeText={text => this.setState({location: text})}
                      placeholder={'Location'}
                      placeholderTextColor={'rgba(255,255,255,0.7)'}
                      underLineColorAndroid="transparent"
                    />
                  </View>
                  {/* <Text
                    style={{
                      marginTop: 4,
                      fontSize: 16,
                      color: '#011f3f',
                      marginLeft: 60,
                    }}>
                    Date of you can start delivering
                  </Text> */}
                  {/* <MyDatePicker
                    minDate="2016-05-01"
                    maxDate="2090-06-01"
                    date={this.state.StartDate}
                    onDateChange={date => {
                      this.setState({StartDate: date});
                    }}
                  /> */}
                  {/* <Text
                    style={{
                      marginTop: 4,
                      fontSize: 16,
                      color: '#011f3f',
                      marginLeft: 60,
                    }}>
                    Last date you can deliver
                  </Text> */}
                  {/* <MyDatePicker
                    minDate="2016-05-01"
                    maxDate="2090-06-01"
                    date={this.state.EndDate}
                    onDateChange={date => {
                      this.setState({EndDate: date});
                    }}
                  /> */}

                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => this.submitContract()}>
                    <Text style={styles.buttonText}> Send Order</Text>
                  </TouchableOpacity>

                  <View style={styles.signupTextCont}>
                    <TouchableOpacity
                      onPress={() => {
                        this.setModalVisible(!this.state.modalVisible);
                      }}>
                      <Text style={styles.signupButton}>
                        {' '}
                        Click to Hide Modal
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Modal>
          </ScrollView>

          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              this.setModalVisible(true);
            }}>
            <Text style={styles.buttonText}>
              Buy the {this.props.navigation.state.params.promotionname}
            </Text>
          </TouchableOpacity>
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
export default connect(mapStateToProps)(ViewScheduledAppointment);

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    width: null,
    height: null,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  animatedHeaderContainer: {
    position: 'absolute',
    top: Platform.OS == 'ios' ? 20 : 0,
    left: 0,
    right: 0,
  },
  input: {
    width: WIDTH - 55,
    height: 40,
    borderRadius: 45,
    fontSize: 16,
    paddingLeft: 45,
    backgroundColor: 'rgba(0,0,0,0.35)',
    color: 'rgba(255, 255, 255, 0.7)',
    marginHorizontal: 20,
  },
  inputContainer: {
    marginTop: 10,
  },
  button: {
    width: WIDTH - 55,
    backgroundColor: '#1c313a',
    borderRadius: 25,
    marginHorizontal: 20,
    marginVertical: 10,
    paddingVertical: 13,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#ffffff',
    textAlign: 'center',
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
    color: '#1c313a',
    fontSize: 16,
    fontWeight: '500',
  },
  signupText: {
    color: '#1c313a',
    fontSize: 16,
  },
});
