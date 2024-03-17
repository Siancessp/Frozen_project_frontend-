import {
  Dimensions,
  Image,
  ImageBackground,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';

const Login = ({navigation}) => {
  return (
    <ScrollView style={{flex: 1, backgroundColor: 'white'}}>
      <StatusBar backgroundColor={'#FF4D00'} />
      <Image
        source={require('../../assets/bg.png')}
        style={{width: '100%', height: Dimensions.get('window').height * 0.4}}
      />
      <Text style={styles.t1}>Log in or Sign up</Text>

      <View style={styles.box}>
        <Text style={styles.t2}>+91</Text>
        <TextInput
          placeholder="Enter your phone number"
          keyboardType="number-pad"
          placeholderTextColor={'#D7D6D6'}
          style={styles.t3}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={()=> navigation.navigate("OTP")}>
        <Text style={styles.buttonText}>CONTINUE</Text>
      </TouchableOpacity>
      <Text style={{marginVertical: 30}} />
    </ScrollView>
  );
};

export default Login;

const styles = StyleSheet.create({
  t1: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    fontWeight: '600',
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
    marginTop: 30,
  },

  buttonText: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
  },
});
