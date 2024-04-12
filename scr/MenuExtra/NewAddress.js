import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  ToastAndroid,
  Dimensions,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../utills/api';

const NewAddress = ({navigation, route}) => {
  const [name, setName] = useState('');
  const [phone_number, setPhonenumber] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [zip, setZip] = useState('');

  const saveAddress = async () => {
    try {
      const uid = await AsyncStorage.getItem('id');
      if (
        name &&
        address &&
        city &&
        state &&
        country &&
        zip &&
        zip.length === 6 &&
        /^\d+$/.test(zip) &&
        phone_number &&
        phone_number.length === 10 &&  // Check if phone number is 10 digits
        /^\d+$/.test(phone_number) && // Check if phone number contains only digits
        uid
      ) {
        const response = await api.post(`addresses/`, {
          user_id: uid,
          newname: name,
          address: address,
          city: city,
          state: state,
          country: country,
          zip_code: zip,
          phone: phone_number,
        });
        ToastAndroid.show('Address saved successfully', ToastAndroid.SHORT);
        navigation.goBack();
      } else {
        if (!phone_number || phone_number.length !== 10 || !/^\d+$/.test(phone_number)) {
          ToastAndroid.show('Please enter a valid 10-digit phone number', ToastAndroid.SHORT);
        } else if (!zip || zip.length !== 16 || !/^\d+$/.test(zip)) {
          ToastAndroid.show('Please enter a valid 6-digit zip-code', ToastAndroid.SHORT);
        }
        else {
          ToastAndroid.show('Some fields are missing', ToastAndroid.SHORT);
        }
      }
    } catch (error) {
      console.log('Error saving Address', error.response);
    }
  };
  

  return (
    <View style={{backgroundColor: 'white', height: '100%'}}>
      <View style={styles.head}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name="left" size={22} color="black" />
        </TouchableOpacity>
        <Text style={styles.t1}>Add New Address</Text>
        <Text style={styles.t1}></Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <TextInput
            style={styles.input}
            placeholderTextColor={'#4B564D'}
            placeholder="Full name"
            onChangeText={text => setName(text)}
          />

          <TextInput
            style={styles.input}
            placeholderTextColor={'#4B564D'}
            placeholder="Phone Number"
            keyboardType="numeric"
            onChangeText={text => setPhonenumber(text)}
          />

          <TextInput
            style={styles.input}
            placeholderTextColor={'#4B564D'}
            placeholder="Address"
            onChangeText={text => setAddress(text)}
          />
          <TextInput
            style={styles.input}
            placeholderTextColor={'#4B564D'}
            placeholder="City"
            onChangeText={text => setCity(text)}
          />

          <TextInput
            style={styles.input}
            placeholderTextColor={'#4B564D'}
            placeholder="State/Province/Region"
            onChangeText={text => setState(text)}
          />

          <TextInput
            style={styles.input}
            placeholderTextColor={'#4B564D'}
            placeholder="Country"
            onChangeText={text => setCountry(text)}
          />

          <TextInput
            style={styles.input}
            placeholderTextColor={'#4B564D'}
            placeholder="Zip-Code"
            onChangeText={text => setZip(text)}
          />
          <Text style={{marginVertical:50}}/>
        </View>
      </ScrollView>
      <TouchableOpacity style={styles.button} onPress={saveAddress}>
        <Text style={styles.buttonText}>SAVE ADDRESS</Text>
      </TouchableOpacity>
    </View>
  );
};

export default NewAddress;

const styles = StyleSheet.create({
  head: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    justifyContent: 'space-between',
  },
  t1: {
    fontSize: 20,
        fontFamily: 'Poppins-SemiBold',

    color: 'black',
  },
  container: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: 'black',
  },
  input: {
    borderWidth: 1,
    borderColor: '#D7D6D6',
    padding: 8,
    paddingHorizontal: 15,
    marginBottom: 20,
    borderRadius: 30,
    color: 'black',
    fontFamily: 'Poppins-Regular',
  },
  button: {
    backgroundColor: 'white',
    borderRadius: 50,
    width: Dimensions.get('window').width * 0.7,
    alignSelf: 'center',
    elevation: 10,
    position: 'absolute',
    bottom: 10,
    height: 52,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#FF4D00',
  },

  buttonText: {
    textAlign: 'center',
    color: '#FF4D00',
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
  },
});
