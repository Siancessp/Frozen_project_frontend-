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
import React, {useEffect, useRef, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const OTP = ({navigation, route}) => {
  const {phone_number} = route.params;
  const [loading, setLoading] = useState(60);

  const et1 = useRef();
  const et2 = useRef();
  const et3 = useRef();
  const et4 = useRef();
  const et5 = useRef();
  const et6 = useRef();
  const et7 = useRef();
  const et8 = useRef();

  const [f1, setF1] = useState('');
  const [f2, setF2] = useState('');
  const [f3, setF3] = useState('');
  const [f4, setF4] = useState('');
  const [f5, setF5] = useState('');
  const [f6, setF6] = useState('');
  const [f7, setF7] = useState('');
  const [f8, setF8] = useState('');

  const [count, setCount] = useState(60);
  useEffect(() => {
    const interval = setInterval(() => {
      if (count == 0) {
        clearInterval(interval);
      } else {
        setCount(count - 1);
      }
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [count]);

  const otpValidation = async () => {
    if (!phone_number.trim()) {
      ToastAndroid.show('Please enter phone number ', ToastAndroid.SHORT);
      return;
    }

    let enteredOTP = f1 + f2 + f3 + f4 + f5 + f6 + f7 + f8;
    setLoading(true);
    try {
      const response = await axios.post('http://20.163.175.115/login/', {
        phone_number: phone_number,
        password: enteredOTP,
      });

      // console.log('ddddd', response.data);
      if (response.data.status === 'success') {
        // Check if user_id and access are present and not null/undefined
        if (response.data.user_id && response.data.access) {
          await AsyncStorage.setItem(
            'id',
            JSON.stringify(response.data.user_id),
          );
          await AsyncStorage.setItem('access', response.data.access);
          ToastAndroid.show('Login successfully', ToastAndroid.SHORT);
          navigation.navigate('Main'); // Redirect to the home screen or any other screen
        } else {
          // Handle the case when user_id or access is missing
          ToastAndroid.show('Invalid response from server', ToastAndroid.SHORT);
        }
      } else {
        ToastAndroid.show(
          'Invalid phone number or password ',
          ToastAndroid.SHORT,
        );
      }
    } catch (error) {
      console.error(error);
      ToastAndroid.show('Phone number doesnot exist', ToastAndroid.SHORT);
    } finally {
      // Set loading to false regardless of success or failure
      setLoading(false);
    }
  };

  return (
    <ScrollView style={{flex: 1, backgroundColor: 'white'}}>
      <StatusBar backgroundColor={'#FF4D00'} />
      <Image
        source={require('../../assets/bg.png')}
        style={{width: '100%', height: Dimensions.get('window').height * 0.4}}
      />
      <Text style={styles.t1}>Enter your OTP here </Text>

      <View
        style={{
          flexDirection: 'row',
          alignSelf: 'center',
          marginTop:20
        }}>
        <TextInput
          placeholder="-"
          keyboardType="number-pad"
          placeholderTextColor={'#D7D6D6'}
          style={[
            styles.t3,
            {backgroundColor: f1.length >= 1 ? '#E2E2E2' : '#F1F1F1'},
          ]}
          ref={et1}
          maxLength={1}
          value={f1}
          onChangeText={txt => {
            setF1(txt);
            if (txt.length >= 1) {
              et2.current.focus();
            }
          }}
        />
        <TextInput
          placeholder="-"
          keyboardType="number-pad"
          placeholderTextColor={'#D7D6D6'}
          style={[
            styles.t3,
            {backgroundColor: f2.length >= 1 ? '#E2E2E2' : '#F1F1F1'},
          ]}
          ref={et2}
          maxLength={1}
          value={f2}
          onChangeText={txt => {
            setF2(txt);

            if (txt.length >= 1) {
              et3.current.focus();
            } else if (txt.length < 1) {
              et1.current.focus();
            }
          }}
        />
        <TextInput
          placeholder="-"
          keyboardType="number-pad"
          placeholderTextColor={'#D7D6D6'}
          style={[
            styles.t3,
            {backgroundColor: f3.length >= 1 ? '#E2E2E2' : '#F1F1F1'},
          ]}
          ref={et3}
          maxLength={1}
          value={f3}
          onChangeText={txt => {
            setF3(txt);
            if (txt.length >= 1) {
              et4.current.focus();
            } else if (txt.length < 1) {
              et2.current.focus();
            }
          }}
        />
        <TextInput
          placeholder="-"
          keyboardType="number-pad"
          placeholderTextColor={'#D7D6D6'}
          style={[
            styles.t3,
            {backgroundColor: f4.length >= 1 ? '#E2E2E2' : '#F1F1F1'},
          ]}
          ref={et4}
          maxLength={1}
          value={f4}
          onChangeText={txt => {
            setF4(txt);
            if (txt.length >= 1) {
              et5.current.focus();
            } else if (txt.length < 1) {
              et3.current.focus();
            }
          }}
        />
        <TextInput
          placeholder="-"
          keyboardType="number-pad"
          placeholderTextColor={'#D7D6D6'}
          style={[
            styles.t3,
            {backgroundColor: f5.length >= 1 ? '#E2E2E2' : '#F1F1F1'},
          ]}
          ref={et5}
          maxLength={1}
          value={f5}
          onChangeText={txt => {
            setF5(txt);
            if (txt.length >= 1) {
              et6.current.focus();
            } else if (txt.length < 1) {
              et4.current.focus();
            }
          }}
        />
        <TextInput
          placeholder="-"
          keyboardType="number-pad"
          placeholderTextColor={'#D7D6D6'}
          style={[
            styles.t3,
            {backgroundColor: f6.length >= 1 ? '#E2E2E2' : '#F1F1F1'},
          ]}
          ref={et6}
          maxLength={1}
          value={f6}
          onChangeText={txt => {
            setF6(txt);
            if (txt.length >= 1) {
              et7.current.focus();
            } else if (txt.length < 1) {
              et5.current.focus();
            }
          }}
        />
        <TextInput
          placeholder="-"
          keyboardType="number-pad"
          placeholderTextColor={'#D7D6D6'}
          style={[
            styles.t3,
            {backgroundColor: f7.length >= 1 ? '#E2E2E2' : '#F1F1F1'},
          ]}
          ref={et7}
          maxLength={1}
          value={f7}
          onChangeText={txt => {
            setF7(txt);
            if (txt.length >= 1) {
              et8.current.focus();
            } else if (txt.length < 1) {
              et6.current.focus();
            }
          }}
        />
        <TextInput
          placeholder="-"
          keyboardType="number-pad"
          placeholderTextColor={'#D7D6D6'}
          style={[
            styles.t3,
            {backgroundColor: f8.length >= 1 ? '#E2E2E2' : '#F1F1F1'},
          ]}
          ref={et8}
          maxLength={1}
          value={f8}
          onChangeText={txt => {
            setF8(txt);
            if (txt.length >= 1) {
              et8.current.focus();
            } else if (txt.length < 1) {
              et7.current.focus();
            }
          }}
        />
      </View>

      <View style={styles.resend}>
        <Text
          style={{
            fontSize: 16,
            fontFamily: 'Poppins-SemiBold',
            color: count == 0 ? '#FF4D00' : '#E2E2E2',
          }}
          onPress={() => {
            setCount(60);
          }}>
          Resend
        </Text>
        {count !== 0 && (
          <Text
            style={{
              marginLeft: 10,
              fontSize: 16,
              fontFamily: 'Poppins-Regular',
            }}>
            {count + ' seconds'}
          </Text>
        )}
      </View>

      <TouchableOpacity
        style={[
          styles.button,
          {
            backgroundColor:
              f1 !== '' &&
              f2 !== '' &&
              f3 !== '' &&
              f4 !== '' &&
              f5 !== '' &&
              f6 !== '' &&
              f7 !== '' &&
              f8 !== ''
                ? '#FF4D00'
                : '#E2E2E2',
          },
        ]}
        disabled={
          f1 !== '' &&
          f2 !== '' &&
          f3 !== '' &&
          f4 !== '' &&
          f5 !== '' &&
          f6 !== '' &&
          f7 !== '' &&
          f8 !== ''
            ? false
            : true
        }
        onPress={otpValidation}>
        <Text style={styles.buttonText}>Verify</Text>
      </TouchableOpacity>
      <Text style={{marginVertical: 30}} />
      {loading && (
        <ActivityIndicator style={styles.loader} size="large" color="#FFFFFF" />
      )}
    </ScrollView>
  );
};

export default OTP;

const styles = StyleSheet.create({
  t1: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
        fontFamily: 'Poppins-SemiBold',

    color: '#80869A',
    textAlign: 'center',
    marginTop: 40,
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
    width: Dimensions.get('window').width * 0.1,
    padding: 2,
    aspectRatio: 1,
    backgroundColor: '#F1F1F1',
    borderRadius: 100,
    textAlign: 'center',
    textAlignVertical: 'center',
    marginHorizontal: 3,
  },

  button: {
    backgroundColor: '#FF4D00',
    borderRadius: 50,
    width: Dimensions.get('window').width * 0.7,
    alignSelf: 'center',
    elevation: 10,
    height: 52,
    justifyContent: 'center',
    marginTop: 20,
  },

  buttonText: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
  },
  resend: {
    flexDirection: 'row',
    justifyContent:"center",
    marginTop: Dimensions.get("window").height*0.08,
    width: Dimensions.get('window').width,
    
  },
});
