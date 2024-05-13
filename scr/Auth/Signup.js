import {
  Dimensions,
  Image,
  ImageBackground,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';

const Signup = ({navigation}) => {
  const [phone_number, setPhonenumber] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = () => {
    if (!name.trim() || !phone_number.trim()) {
      ToastAndroid.show('Enter all the fields', ToastAndroid.SHORT);
    } else if (phone_number.trim().length !== 10 || !/^\d+$/.test(phone_number.trim())) {
      ToastAndroid.show('Please enter a valid 10-digit phone number', ToastAndroid.SHORT);
    } else {
      navigation.navigate("OTPUp", { name, phone_number });
    }
  }
  
  return (
    <ScrollView style={{flex: 1, backgroundColor: 'white'}}>
      <StatusBar backgroundColor={'#FF4D00'} />
      <Image
        source={require('../../assets/bg.png')}
        style={{width: '100%', height: Dimensions.get('window').height * 0.4}}
      />
      <Text style={styles.t1}> Sign up</Text>
      <View style={styles.box}>
        <TextInput
          placeholder="Enter name"
          value={name}
          onChangeText={text => setName(text)}
          placeholderTextColor={'#D7D6D6'}
          style={styles.t3}
        />
      </View>
      <View style={styles.box}>
        <Text style={styles.t2}>+91</Text>
        <TextInput
          placeholder="Enter your phone number"
          keyboardType="number-pad"
          value={phone_number}
          onChangeText={text => setPhonenumber(text)}
          placeholderTextColor={'#D7D6D6'}
          style={styles.t3}
        />
      </View>
     
    
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>SIGN UP</Text>
      </TouchableOpacity>
      
      <View style={{flexDirection:"row", justifyContent:"center", marginTop:20, alignItems:"center"}}>
      <Text>Already have an account?</Text>
      <TouchableOpacity style={styles.button2} onPress={()=> navigation.goBack()}>
        <Text style={styles.buttonText2}>SIGN IN</Text>
      </TouchableOpacity>
</View>
      
      <Text style={{marginVertical: 30}} />
    </ScrollView>
  );
};

export default Signup;

const styles = StyleSheet.create({
  t1: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
        fontFamily: 'Poppins-SemiBold',

    color: '#000',
    textAlign: 'center',
    marginTop: 60,
  },
  t2: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#000',
    marginLeft: 10,
  },
  t3: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#000',
    marginLeft: 10,
    width: Dimensions.get('window').width * 0.7,
  },
  box: {
    marginHorizontal: 16,
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 30,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#D7D6D6',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#FF4D00',
    borderRadius: 50,
    width: Dimensions.get('window').width * 0.7,
    alignSelf: 'center',
    elevation: 10,
    height: 52,
    justifyContent: 'center',
    marginTop: Dimensions.get("window").height*0.08,

  },

  buttonText: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
  },
  button2: {
    backgroundColor: '#FF4D00',
    borderRadius: 50,
    width: Dimensions.get('window').width * 0.15,
    alignSelf: 'center',
    height: 25,
    justifyContent: 'center',
    marginLeft:5
  },
 buttonText2: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 10,
    fontFamily: 'Poppins-SemiBold',
  },
});
