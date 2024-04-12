import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  Modal,
  TouchableOpacity,
  View,
  Alert,
  TouchableWithoutFeedback,
  ToastAndroid,
  ActivityIndicator,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import ImageCropPicker from 'react-native-image-crop-picker';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {BlurView} from '@react-native-community/blur';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../utills/api';

const Edit = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [loadingDel, setLoadingDel] = useState(false);

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [photo, setPhoto] = useState();
  const [location, setLocation] = useState();
  const [profileImage, setProfileImage] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const getProfile = async () => {
    try {
      const uid = await AsyncStorage.getItem('id');
      const response = await api.get(`profile/?user_id=${uid}`);
      // console.log(response.data);
      setPhoto(response.data.profile_photo);
      setEmail(response.data.email);
      setName(response.data.name);
      setPhone(response.data.phone_number);
      setLocation(response.data.bio);
    } catch (error) {
      console.log('Error fetching profile:', error);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  const pickImage = async () => {
    try {
      const pickedImage = await ImageCropPicker.openPicker({
        width: 400,
        height: 400,
        cropping: true,
      });

      setProfileImage(pickedImage.path);
    } catch (error) {
      console.log('Error picking image:', error);
    }
  };

  const updateProfile = async () => {
    setLoading(true);
    try {
      const uid = await AsyncStorage.getItem('id');
      console.log(uid);
  
      const formData = new FormData();
      if (profileImage) {
        formData.append('profile_photo', {
          uri: profileImage,
          type: 'image/jpg',
          name: 'profile_photo.jpg',
        });
      }
      if (email) {
        formData.append('email', email);
      }
      if (name) {
        formData.append('name', name);
      }
      if (location) {
        formData.append('bio', location);
      }
      formData.append('user_id', uid);
  
      const response = await api.postFormdata('profile/', formData);
      getProfile();
      navigation.replace('Bottom', {screen: 'Profile'});
      // console.log('Profile updated successfully:', response.data);
    } catch (error) {
      console.log('Error updating profile:', error);
    }
    setLoading(false);
  };
  

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const handleOptionPress = async option => {
    setLoadingDel(true);
    try {
      if (option === 'delete') {
        // Perform deletion logic here
        const uid = await AsyncStorage.getItem('id');
        const response = await api.remove(`delete_account/?user_id=${uid}`);
        ToastAndroid.show('Account deleted Successful', ToastAndroid.SHORT);
        await AsyncStorage.removeItem('id');
        navigation.navigate('Login');
      }
      setModalVisible(false);
    } catch (error) {
      console.log(error);
      await AsyncStorage.removeItem('id');
      navigation.navigate('Login');
    }
    setLoadingDel(false);
  };

  useFocusEffect(
    React.useCallback(() => {
      setModalVisible(false);
      return () => {
        setModalVisible(false);
      };
    }, []),
  );

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{backgroundColor: 'white'}}>
      <View style={styles.top}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name="left" size={22} color="black" />
        </TouchableOpacity>
        <Text
          style={{
            marginLeft: 20,
            fontSize: 22,
            fontFamily: 'Poppins-SemiBold',

            color: 'black',
          }}>
          Edit Profile
        </Text>
        <Text>       </Text>
      </View>
      <View style={styles.b1}>
        <TouchableOpacity style={{alignItems: 'center'}} onPress={pickImage}>
          {profileImage ? (
            <Image
              source={{uri: profileImage}}
              style={{width: 100, aspectRatio: 1, borderRadius: 100}}
            />
          ) : (
            <Image
              source={{
                uri:
                  'http://20.163.175.115/' +
                  (photo ||
                    'https://frozenwala.com/frontend/public/images/logo.jpg'),
              }}
              style={{width: 100, aspectRatio: 1, borderRadius: 100}}
            />
          )}
          <Feather
            name="edit-2"
            size={16}
            color="black"
            style={{
              bottom: 30,
              left: 35,
              backgroundColor: 'gray',
              borderRadius: 100,
              padding: 5,
            }}
          />
        </TouchableOpacity>
      </View>

      <View style={{padding: 20}}>
        <TextInput
          style={styles.input}
          placeholder={name}
          value={name}
          onChangeText={text => setName(text)}
        />

        <TextInput
          style={styles.input}
          placeholder={email ? email : 'Enter Email'}
          value={email}
          onChangeText={text => setEmail(text)}
        />

        <TextInput
          style={styles.input}
          placeholder={phone}
          value={phone}
          onChangeText={text => setPhone(text)}
        />

        <TextInput
          style={styles.input}
          placeholder={location ? location : 'Enter Location'}
          value={location}
          onChangeText={text => setLocation(text)}
        />
      </View>
      <TouchableOpacity style={styles.btn} onPress={updateProfile}>
        {loading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text style={styles.buttonText}>Submit</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity onPress={toggleModal}>
        <Text style={styles.forgotPassword}>Delete Account?</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <TouchableWithoutFeedback onPress={toggleModal}>
          <View style={styles.modalBackground}>
            <BlurView style={styles.blurView} blurType="light" blurAmount={5} />
          </View>
        </TouchableWithoutFeedback>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View
              style={{
                backgroundColor: 'white',
                borderRadius: 100,
                padding: 15,
                bottom: 40,
                elevation: 10,
              }}>
              <View
                style={{
                  backgroundColor: '#bfbfbf ',
                  borderRadius: 100,
                  padding: 15,
                }}>
                <View
                  style={{
                    backgroundColor: '#FF4D00',
                    borderRadius: 100,
                    width: 20,
                    aspectRatio: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text style={{color: 'white'}}>!</Text>
                </View>
              </View>
            </View>
            <Text style={styles.modalText}>
              Are you sure you want to delete your account?
            </Text>
            <Text style={styles.modalText2}>
              Once deleted your data will not retrieve!
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={{
                  ...styles.button,
                  backgroundColor: '#EBA723',
                  marginRight: 10,
                }}
                onPress={() => handleOptionPress('cancel')}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  ...styles.button,
                  backgroundColor: '#FF4D00',
                }}
                onPress={() => handleOptionPress('delete')}>
                {loadingDel ? (
                  <ActivityIndicator color="white" />
                ) : (
                  <Text style={styles.buttonText}>Delete</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Text style={{marginVertical: 50}}></Text>
    </ScrollView>
  );
};

export default Edit;

const styles = StyleSheet.create({
  top: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
    justifyContent: 'space-between',
  },
  b1: {
    alignSelf: 'center',
    marginTop: 20,
    alignItems: 'center',
  },
  t1: {
    color: 'black',
    fontSize: 16,
  },
  in: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  input: {
    height: 45,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    borderRadius: 30,
    paddingHorizontal: 15,
    padding: 5,
    color: 'black',
  },
  btn: {
    backgroundColor: '#FF4D00',
    paddingVertical: 10,
    borderRadius: 50,
    width: Dimensions.get('window').width * 0.7,
    alignSelf: 'center',
    elevation: 10,
  },

  buttonText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 18,
  },
  t2: {
    color: '#333333',
    top: 8,
    left: 15,
    backgroundColor: 'white',
    width: Dimensions.get('window').width * 0.12,
    zIndex: 99,
  },
  forgotPassword: {
    textAlign: 'center',
    marginTop: 20,
    color: '#FF4D00',
  },
  line: {
    borderWidth: 1,
    width: Dimensions.get('window').height * 0.25,
    marginVertical: 15,
  },
  centeredView: {
    height: Dimensions.get('window').height,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    position: 'absolute',
    zIndex: 99999,
  },
  modalView: {
    mtop: 0,
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    paddingTop: 0,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontFamily: 'Poppins-SemiBold',

    color: 'black',
    fontSize: 18,
  },
  modalText2: {
    marginBottom: 15,
    textAlign: 'center',
    color: 'black',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  blurView: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  button: {
    height: Dimensions.get('window').height * 0.05,
    width: Dimensions.get('window').width * 0.3,
    justifyContent: 'center',
    borderRadius: 8,
  },
});
