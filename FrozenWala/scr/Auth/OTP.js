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
import React, {useEffect, useRef, useState} from 'react';

const OTP = ({navigation}) => {
  const et1 = useRef();
  const et2 = useRef();
  const et3 = useRef();
  const et4 = useRef();
  const et5 = useRef();
  const et6 = useRef();

  const [f1, setF1] = useState('');
  const [f2, setF2] = useState('');
  const [f3, setF3] = useState('');
  const [f4, setF4] = useState('');
  const [f5, setF5] = useState('');
  const [f6, setF6] = useState('');

  const [count, setCount] = useState(60);
  useEffect(() => {
    const interval = setInterval(() => {
      if (count == 0) {
        clearInterval(interval);
      } else {
        setCount(count - 1);
      }
    }, 1000);
    return()=> {
      clearInterval(interval);
    }
  }, [count]);

  const otpValidation = () => {
    let otp='123456'
    let enteredOTP = f1+f2+f3+f4+f5+f6
    if(enteredOTP==otp){
      ToastAndroid.show('OTP Verified successfully', ToastAndroid.SHORT);
      navigation.navigate("Bottom")

    }else{
      ToastAndroid.show('Worng OTP', ToastAndroid.SHORT);

    }
  }

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
              et6.current.focus();
            } else if (txt.length < 1) {
              et5.current.focus();
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
          onPress={()=> {setCount(60)}}>
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
      )

      }
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
              f6 !== ''
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
          f6 !== ''
            ? false
            : true
        }
        onPress={otpValidation}
      >
        <Text style={styles.buttonText}>Verify</Text>
      </TouchableOpacity>
      <Text style={{marginVertical: 30}} />
    </ScrollView>
  );
};

export default OTP;

const styles = StyleSheet.create({
  t1: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    fontWeight: '600',
    color: '#80869A',
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
    width: Dimensions.get('window').width * 0.12,
    aspectRatio: 1,
    backgroundColor: '#F1F1F1',
    borderRadius: 100,
    textAlign: 'center',
    marginHorizontal: 10,
  },

  button: {
    backgroundColor: '#FF4D00',
    borderRadius: 50,
    width: Dimensions.get('window').width * 0.7,
    alignSelf: 'center',
    elevation: 10,
    height: 52,
    justifyContent: 'center',
    marginTop: 30,
  },

  buttonText: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
  },
  resend: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 20,
  },
});
