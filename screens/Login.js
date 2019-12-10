/* eslint-disable no-alert */
/* eslint-disable quotes */
/* eslint-disable prettier/prettier */
import React,{Component } from 'react';
import {TouchableOpacity,ImageBackground,Text,Image,TextInput,Dimensions,StyleSheet,View,Button} from 'react-native';
import store from '../screens/redux/store';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import bgImage from '../assets/shopping1.jpg';
import logo from '../assets/shopping.png';
// import { addUser } from './redux/actions/addUser';
const { width: WIDTH } = Dimensions.get('window');


class LoginScreen extends Component{
  constructor(props) {
      super(props)
      this.state={
        username:'',
        password:'',
    };     
}

signup() {
this.props.navigation.navigate('Signup');
}


async handleChange() {
var data = {
  username: this.state.username,
  password: this.state.password
 };

 try{
 let response = await fetch(
 "https://farmersdatabase1.herokuapp.com/login",
 {
 method: "POST",
 headers: {
 "Content-Type": "application/json"
 },
 body: JSON.stringify(data)
 }
 );
 const data1 = await response.json(); 

//  alert(JSON.stringify(data1.response));

if(data1.response=="TRUE"){

  this.props.addUser(data1.user); 
  this.props.navigation.navigate('Bottom');
}else{
  alert(data1.message);
}

 }catch(error){
  alert(error,"Please connect your device to the internet");

 }

}

render() {
  return (
  <ImageBackground source={bgImage} style={styles.container}>
      
 <View style={styles.logoContainer}>
       <Image source={logo} style={styles.logo}></Image>
       <Text style={styles.LogoText}> {this.state.username}</Text>
      </View>
      
 <View style={styles.inputContainer}>
     <TextInput style={styles.input} value={this.state.username} onChangeText={(text) => this.setState({username: text})} placeholder={'Username'} placeholderTextColor={'rgba(255,255,255,0.7)'}
  underLineColorAndroid='transparent'>
  </TextInput>
 </View>

 <View style={styles.inputContainer}>
     <TextInput style={styles.input} value={this.state.password} onChangeText={(text) => this.setState({password: text})} placeholder={'Password'} 
     secureTextEntry={true}
     placeholderTextColor={'rgba(255,255,255,0.7)'}
  underLineColorAndroid='transparent'>
     </TextInput>
  </View>
      
 <TouchableOpacity style={styles.button} onPress={()=>this.handleChange()}>
        <Text style={styles.buttonText}>Login</Text>
  </TouchableOpacity>

 <View style={styles.signupTextCont}>
        <Text style={styles.signupText}>Do not have an account yet?</Text>
        <TouchableOpacity onPress={()=>this.signup()}><Text style={styles.signupButton}> Signup</Text></TouchableOpacity>
  </View>

  

</ImageBackground>
     
  );
}
}


function mapDispatchToProps(dispatch,name) {
return {
  addUser: (user) => dispatch({ type: 'ADD_USER', payload: user } )
}

}

export default connect(null,mapDispatchToProps) (LoginScreen)
const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    width:null,
    height:null,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer:{
      alignItems:'center',
      marginBottom:50,
  },
  logo:{
      width:250,
      height:170,
  
  },
  LogoText:{
    color:'white',
    fontSize:20,  
    fontWeight:'500',
    marginTop:10,
    opacity:0.5
  },
  input:{
    width: WIDTH -55,
    height:40,
    borderRadius:45,
    fontSize: 16,
    paddingLeft:45,
    backgroundColor: 'rgba(0,0,0,0.35)',
    color:'rgba(255, 255, 255, 0.7)',
    marginHorizontal:25
  },
  inputContainer:{
    marginTop:10,
  },
  InputIcon:{
      position:'absolute',
      top:8,
      left:37
  },
  signupTextCont : {
    flexGrow: 1,
    alignItems:'flex-end',
    color:'#ffffff',
    justifyContent :'center',
    paddingVertical:16,
    flexDirection:'row'
  },
  signupButton: {
    color:'#ffffff',
    fontSize:16,
    fontWeight:'500'
  },
  signupText: {
    color:'rgba(255,255,255,0.6)',
    fontSize:16
  },
  button: {
    width:300,
    backgroundColor:'#1c313a',
    borderRadius: 25,
    marginVertical: 10,
    paddingVertical: 13
  },
  buttonText: {
    fontSize:16,
    fontWeight:'500',
    color:'#ffffff',
    textAlign:'center'
  }

});
