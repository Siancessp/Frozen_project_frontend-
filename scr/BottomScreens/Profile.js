import {
  Dimensions,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../utills/api';

const Profile = ({navigation}) => {
  const [photo, setPhoto] = useState();
  const [name, setName] = useState();
  const [phone, setPhone] = useState();

  const getProfile = async () => {
    try {
      const uid = await AsyncStorage.getItem('id');
      const response = await api.get(`profile/?user_id=${uid}`);
      // console.log(response.data);
      setPhoto(response.data.profile_photo);
      setPhone(response.data.phone_number);
      setName(response.data.name);
    } catch (error) {
      console.log('Error fetching profile:', error);
    }
  };
  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('id');
      navigation.navigate('Login');
    } catch (error) {
      console.error(error);
    }
  };

  const [walletBalance, setWalletBalance] = useState();

  const getWalletBalance = async () => {
    try {
      const uid = await AsyncStorage.getItem('id');
      const response = await api.get(`wallet/?user_id=${uid}`);
      // console.log(response.data);
      setWalletBalance(response.data.wallet_value);
    } catch (error) {
      console.log('Error fetching wallet balance:', error);
    }
  };
  useEffect(() => {
    getWalletBalance();
  }, []);

  useEffect(() => {
    getProfile();
  }, []);
  return (
    <ScrollView style={{backgroundColor: 'white'}} showsVerticalScrollIndicator={false}>
      <StatusBar backgroundColor={'#FF4D00'} />
      <View style={styles.box1}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={{flexDirection: 'row', alignItems: 'center'}}
          onPress={() => navigation.goBack()}>
          <AntDesign name="left" size={24} color={'#fff'} />
          <Text style={styles.t1}>My Profile</Text>
        </TouchableOpacity>
      </View>
      <View style={{padding: 20, bottom: 70}}>
      <View style={styles.proContainer}>
        <View style={styles.container}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View style={styles.imgBox}>
              <Image
                source={
                  photo
                    ? {uri: `http://20.163.175.115/${photo}`}
                    : require('../../assets/man.png')
                }
                style={{height: '100%', width: '100%', borderRadius: 100}}
              />
            </View>
            <View style={{marginLeft: 20}}>
              <Text style={styles.t2}>{name}</Text>
              <Text style={{color: 'gray'}}>{phone}</Text>
            </View>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('EditProfile')}>
            <Feather name="edit" size={18} color={'gray'} style={{}} />
          </TouchableOpacity>
        </View>
        <View style={{flexDirection:"row", width:Dimensions.get("window").width*0.8, justifyContent:"flex-end", alignItems:"center"}}>
              <Text style={styles.t7}> Wallet Balance : </Text>
              <Text style={{...styles.t2, color:"#FF4D00"}}>{walletBalance}</Text>
              </View>
      </View>
        <Text style={styles.t4}>Personal Details</Text>
        <TouchableOpacity
          style={styles.box2}
          onPress={() => navigation.navigate('OrderHistory')}>
          <View style={styles.v1}>
            <MaterialCommunityIcons
              name="text-box-outline"
              size={24}
              color="#FF4D00"
              style={styles.icon}
            />
            <Text style={styles.t5}>Order History</Text>
          </View>
          <AntDesign name="right" size={24} color={'#FF4D00'} />
        </TouchableOpacity>

        {/* <TouchableOpacity style={styles.box2}>
          <View style={styles.v1}>
            <AntDesign
              name="gift"
              size={24}
              color={'#FF4D00'}
              style={styles.icon}
            />

            <Text style={styles.t5}>Promo Code</Text>
          </View>
          <AntDesign name="right" size={24} color={'#FF4D00'} />
        </TouchableOpacity> */}
        {/* <Text style={styles.t4}>Account Setting</Text>
        <TouchableOpacity style={styles.box2}>
          <View style={styles.v1}>
            <Ionicons
              name="location-outline"
              size={24}
              color="#FF4D00"
              style={styles.icon}
            />
            <Text style={styles.t5}>Saved Addresses</Text>
          </View>
          <AntDesign name="right" size={24} color={'#FF4D00'} />
        </TouchableOpacity> */}
        {/* <TouchableOpacity style={styles.box2}>
          <View style={styles.v1}>
            <Octicons
              name="credit-card"
              size={24}
              color={'#FF4D00'}
              style={styles.icon}
            />

            <Text style={styles.t5}>Saved Cards</Text>
          </View>
          <AntDesign name="right" size={24} color={'#FF4D00'} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.box2}>
          <View style={styles.v1}>
            <MaterialCommunityIcons
              name="google-translate"
              size={24}
              color={'#FF4D00'}
              style={styles.icon}
            />

            <Text style={styles.t5}>Select Language</Text>
          </View>
          <AntDesign name="right" size={24} color={'#FF4D00'} />
        </TouchableOpacity> */}

        <Text style={styles.t4}>Feedback & Info</Text>
        <TouchableOpacity
          style={styles.box2}
          onPress={() => navigation.navigate('ContactUs')}>
          <View style={styles.v1}>
            <MaterialCommunityIcons
              name="headset"
              size={24}
              color="#FF4D00"
              style={styles.icon}
            />
            <Text style={styles.t5}>Help Center</Text>
          </View>
          <AntDesign name="right" size={24} color={'#FF4D00'} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.box2}
          onPress={() => navigation.navigate('Terms')}>
          <View style={styles.v1}>
            <MaterialCommunityIcons
              name="file-document-multiple-outline"
              size={24}
              color={'#FF4D00'}
              style={styles.icon}
            />

            <Text style={styles.t5}>Terms & Conditions</Text>
          </View>
          <AntDesign name="right" size={24} color={'#FF4D00'} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.box2}
          onPress={() => navigation.navigate('Privacy')}>
          <View style={styles.v1}>
            <MaterialCommunityIcons
              name="security"
              size={24}
              color={'#FF4D00'}
              style={styles.icon}
            />

            <Text style={styles.t5}>Privacy Policy</Text>
          </View>
          <AntDesign name="right" size={24} color={'#FF4D00'} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.box2}
          onPress={() => navigation.navigate('Returns')}>
          <View style={styles.v1}>
            <MaterialCommunityIcons
              name="cash-refund"
              size={24}
              color={'#FF4D00'}
              style={styles.icon}
            />

            <Text style={styles.t5}>Refund Policy</Text>
          </View>
          <AntDesign name="right" size={24} color={'#FF4D00'} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={handleLogout}>
          <Text style={styles.t6}>Sign Out</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  box1: {
    backgroundColor: '#FF4D00',
    height: Dimensions.get('window').height * 0.15,
    padding: 10,
    elevation: 10,
  },
  btn: {
    alignSelf: 'center',
    marginVertical: 50,
    borderWidth: 1,
    borderColor: '#FF4D00',
    width: Dimensions.get('window').width * 0.7,
    alignItems: 'center',
    justifyContent: 'center',
    height: 45,
    borderRadius: 30,
  },
  t1: {
    color: 'white',
    fontSize: 22,
    fontFamily: 'Poppins-SemiBold',

    marginLeft: 20,
  },
  container: {
    flexDirection: 'row',
    justifyContent:"space-between"
  },
  proContainer: {
    backgroundColor: 'white',
    borderRadius: 8,
    elevation: 10,
    padding: 15,
  },
  imgBox: {
    width: Dimensions.get('window').width * 0.18,
    aspectRatio: 1,
  },
  t2: {
    color: 'black',
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
  },
  t3: {
    color: '#4B564D',
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
  },
  t4: {
    color: 'black',
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',

    marginTop: 20,
  },
 
  box2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 20,
    borderBottomWidth: 0.5,
    borderStyle: 'dotted',
  },
  v1: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  t5: {
    color: 'black',
    fontSize: 16,
    marginLeft: 10,
  },
  t6: {
    color: '#FF4D00',
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
  },
  t7: {
    color: '#FF4D00',
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
  },
  icon: {
    width: 30,
  },
});
