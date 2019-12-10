import React, {Component} from 'react';
import DatePicker from 'react-native-datepicker';
import {Dimensions} from 'react-native';
const {width: WIDTH} = Dimensions.get('window');
export default class MyDatePicker extends Component {
  render() {
    return (
      < DatePicker
        style={{
          marginTop: 10,
          width: WIDTH - 55,
          height: 40,
          borderRadius: 45,

          paddingLeft: 45,
          backgroundColor: 'rgba(0,0,0,0.35)',
          marginHorizontal: 25,
        }}
        date={this.props.date}
        mode="date"
        placeholder="select date"
        format="YYYY-MM-DD"
        minDate={this.props.minDate}
        maxDate={this.props.maxDate}
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        customStyles={
          {
            // dateIcon: {
            //   position: 'absolute',
            //   left: 0,
            //   top: 4,
            //   marginLeft: 0
            // },
            // dateInput: {
            //   marginLeft: 20
            // }
            // ... You can check the source to find the other keys.
          }
        }
        onDateChange={this.props.onDateChange}
      />
    );
  }
}
