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
  Button,
  BackHandler,
  Alert,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {List, ListItem} from 'react-native-elements';
import {connect} from 'react-redux';
import Modal from 'react-native-modal';
import MyDatePicker from './components/Date/Datepicker';

import CalendarPicker from 'react-native-calendar-picker';
import Appointment from './Cart';

const {width: WIDTH} = Dimensions.get('window');
const {height, width} = Dimensions.get('window');
class ViewProduct extends Component {
  constructor() {
    super();
    this.state = {
      modalVisible: false,
      quantity: '',
      StartDate: '',
      EndDate: '',
      selectedStartDate: null,
    };

    this.onDateChange = this.onDateChange.bind(this);
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
      this.handleBackButtonClick(),
    );
  }

  UNSAFE_componentWillUnmount() {
    BackHandler.removeEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick(),
    );
  }

  onDateChange(date) {
    this.setState({
      selectedStartDate: date,
    });
  }
  //   onDateChange(date) {
  //     this.setState({
  //       selectedStartDate: date,
  //     });

  handleBackButtonClick() {
    this.props.navigation.navigate('Bottom');
    return true;
  }

  //   async submitContract() {
  //     var contract = {
  //       username: this.props.user.username,
  //       image: this.props.user.image,
  //       quantity: this.state.quantity,
  //       email: this.props.user.email,
  //       farmsize: this.props.user.farmsize,
  //       StartDate: this.state.StartDate,
  //       EndDate: this.state.EndDate,
  //       location: {
  //         latitude: this.props.user.location.latitude,
  //         longitude: this.props.user.location.latitude,
  //       },
  //     };
  //     var id = this.props.navigation.state.params.id;

  //     try {
  //       const response = await fetch(
  //         'https://cmssystem1.herokuapp.com/updatecontract/' + `${id}`,
  //         {
  //           method: 'POST',
  //           headers: {
  //             'Content-Type': 'application/json',
  //           },
  //           body: JSON.stringify(contract),
  //         },
  //       );

  //       const data1 = await response.json();
  //       if (data1.response == 'TRUE') {
  //         alert('Thank you for submitting request to enrol on the contract');

  //         this.addAsMyContract();
  //       } else {
  //         alert(
  //           'An errror occured, please attempt to enrol on the contract again',
  //         );
  //       }
  //     } catch (error) {
  //       alert(error);
  //     }
  //   }

  //   async addAsMyContract() {
  //     var id = this.props.user._id;

  //     var MyContract = {
  //       businessName: this.props.navigation.state.params.name,
  //       businessPhysicalAddress: this.props.navigation.state.params.location,
  //       businessuser: this.props.navigation.state.params.id,
  //       businessContactNumber: this.props.navigation.state.params.contactnumber,
  //       promotionName: this.props.navigation.state.params.promotionname,
  //       offer: this.props.navigation.state.params.offer,
  //       image: this.props.navigation.state.params.image,
  //       about: this.props.navigation.state.params.about,
  //       // terms: this.props.navigation.state.params.terms
  //     };

  //     try {
  //       const response = await fetch(
  //         'https://farmersdatabase1.herokuapp.com/mycontracts/' + `${id}`,
  //         {
  //           method: 'POST',
  //           headers: {
  //             'Content-Type': 'application/json',
  //           },
  //           body: JSON.stringify(MyContract),
  //         },
  //       );

  //       const data1 = await response.json();
  //       if (data1.response == 'TRUE') {
  //         alert('the contract has been added to your contracts');
  //       } else {
  //         alert('The contract couldnt be added as one of your contracts');
  //       }
  //     } catch (error) {
  //       alert(error);
  //     }
  //   }

  render() {
    const {selectedStartDate} = this.state;
    const startDate = selectedStartDate ? selectedStartDate.toString() : '';
    return (
      <ScrollView scrollEventThrottle={16}>
        <View style={{paddingHorizontal: 20, marginTop: 40}}>
        <Text style={{fontSize: 24, fontWeight: '700'}}>
            Review the Contract{' '}
          </Text>
          <Text style={{fontWeight: '100', marginTop: 10}}>
            Below are the conditions for the contract
          </Text>

          <View style={{width: width - 40, height: 200, marginTop: 20}}>
            <Image
              // eslint-disable-next-line react-native/no-inline-styles
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
            {this.props.navigation.state.params.offer}
          </Text>
          <Text style={{fontWeight: '100', marginTop: 10}}>
            {this.props.navigation.state.params.about}
          </Text>


          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              this.setModalVisible(true);
            }}>
            <Text style={styles.buttonText}>Schedule an Appointment</Text>
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
export default connect(mapStateToProps)(ViewProduct);

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
