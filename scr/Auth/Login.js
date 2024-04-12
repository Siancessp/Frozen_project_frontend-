import {
  ActivityIndicator,
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
import React, {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';

const Login = () => {
  const navigation = useNavigation();
  const [phone_number, setPhonenumber] = useState('');

  const handleLogin = () => {
    if (!phone_number.trim()) {
      ToastAndroid.show('Enter all the fields', ToastAndroid.SHORT);
    } else if (
      phone_number.trim().length !== 10 ||
      !/^\d+$/.test(phone_number.trim())
    ) {
      ToastAndroid.show(
        'Please enter a valid 10-digit phone number',
        ToastAndroid.SHORT,
      );
    } else {
      navigation.navigate('OTP', {phone_number});
    }
  };

  return (
    <ScrollView style={{flex: 1, backgroundColor: 'white'}}>
      <StatusBar backgroundColor={'#FF4D00'} />
      <Image
        source={require('../../assets/bg.png')}
        style={{width: '100%', height: Dimensions.get('window').height * 0.4}}
      />
      <Text style={styles.t1}>Log in</Text>

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

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>GENERATE OTP</Text>
      </TouchableOpacity>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          marginTop: 20,
          alignItems: 'center',
        }}>
        <Text>Don't you have any account?</Text>
        <TouchableOpacity
          style={styles.button2}
          onPress={() => navigation.navigate('Signup')}>
          <Text style={styles.buttonText2}>SIGNUP</Text>
        </TouchableOpacity>
      </View>

      <Text style={{marginVertical: 30}} />
    </ScrollView>
  );
};

export default Login;

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
    marginTop: Dimensions.get('window').height * 0.08,
  },
  button2: {
    backgroundColor: '#FF4D00',
    borderRadius: 50,
    width: Dimensions.get('window').width * 0.15,
    alignSelf: 'center',
    height: 25,
    justifyContent: 'center',
    marginLeft: 5,
  },

  buttonText: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
  },
  buttonText2: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 10,
    fontFamily: 'Poppins-SemiBold',
  },
  loader: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 999,
  },
});
