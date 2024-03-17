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
} from 'react-native';
import React, { useState } from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ImageCropPicker from 'react-native-image-crop-picker';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { BlurView } from '@react-native-community/blur';

const Edit = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const pickImage = async () => {
    try {
      const pickedImage = await ImageCropPicker.openPicker({
        width: 300,
        height: 400,
        cropping: true,
      });

      setProfileImage(pickedImage.path);
    } catch (error) {
      console.log('Error picking image:', error);
    }
  };

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const handleOptionPress = (option) => {
    if (option === 'delete') {
      // Perform deletion logic here
      Alert.alert(
        'Account Deleted',
        'Your account has been deleted successfully.'
      );
      // After deletion, navigate to the login screen or any other appropriate screen
      navigation.navigate('Login');
    }
    setModalVisible(false);
  };

  useFocusEffect(
    React.useCallback(() => {
      setModalVisible(false); // Reset modalVisible when the screen gains focus
      return () => {
        setModalVisible(false);
      };
    }, [])
  );

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{ backgroundColor: 'white' }}
    >
      <View style={styles.top}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name="left" size={22} color="black" />
        </TouchableOpacity>
        <Text
          style={{
            marginLeft: 20,
            fontSize: 22,
            fontWeight: '600',
            color: 'black',
          }}
        >
          Edit Profile
        </Text>
        <Text></Text>
      </View>
      <View style={styles.b1}>
        <TouchableOpacity
          style={{ alignItems: 'center' }}
          onPress={pickImage}
        >
          {profileImage ? (
            <Image
              source={{ uri: profileImage }}
              style={{ width: 100, aspectRatio: 1, borderRadius: 100 }}
            />
          ) : (
            <Image
              source={{
                uri: 'https://images.unsplash.com/photo-1610973374471-e667335f1b39?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
              }}
              style={{ width: 100, aspectRatio: 1, borderRadius: 100 }}
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

      <View style={{ padding: 20 }}>
        <Text style={styles.t2}>Name</Text>

        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={(text) => setName(text)}
        />
        <Text style={styles.t2}>Email</Text>

        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />

        <Text
          style={{
            ...styles.t2,
            width: Dimensions.get('window').width * 0.25,
          }}
        >
          Phone Number
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />

        <Text
          style={{
            ...styles.t2,
            width: Dimensions.get('window').width * 0.15,
          }}
        >
          Location
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
      </View>
      <TouchableOpacity style={styles.btn}>
        <Text style={styles.buttonText}>Submit</Text>
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
        }}
      >
        <TouchableWithoutFeedback onPress={toggleModal}>
          <View style={styles.modalBackground}>
            <BlurView
              style={styles.blurView}
              blurType="light"
              blurAmount={5}
            />
          </View>
        </TouchableWithoutFeedback>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
          <View style={{backgroundColor:"white", borderRadius:100,padding:15, bottom:40,elevation:10}}>
          <View style={{backgroundColor:"#bfbfbf ", borderRadius:100,padding:15}}>
          <View style={{backgroundColor:"#C620E3", borderRadius:100, width:20, aspectRatio:1, justifyContent:"center", alignItems:"center"}}>
          <Text style={{color:"white"}}>!</Text>
          </View>
          </View>
          </View>
            <Text style={styles.modalText}>
              Are you sure you want to delete your account?
            </Text>
            <Text style={styles.modalText2}>
              Once deleted your data will not retrive!
            </Text>
            <View style={styles.modalButtons}>
            <TouchableOpacity
                style={{ ...styles.button, backgroundColor: '#EBA723',
                  marginRight: 10, }}
                onPress={() => handleOptionPress('cancel')}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  ...styles.button,
                  backgroundColor: '#C620E3',
                }}
                onPress={() => handleOptionPress('delete')}
              >
                <Text style={styles.buttonText}>Delete</Text>
              </TouchableOpacity>
              
            </View>
          </View>
        </View>
      </Modal>

      <Text style={{ marginVertical: 50 }}></Text>
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
    backgroundColor: '#C620E3',
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
    width: Dimensions.get('window').width * 0.1,
    zIndex: 99,
  },
  forgotPassword: {
    textAlign: 'center',
    marginTop: 20,
    color: '#C620E3',
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
    alignSelf:"center",
    position:"absolute",
    zIndex:99999
  },
  modalView: {
    mtop:0,
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    paddingTop:0,
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
    fontWeight:"bold",
    color:"black",
    fontSize:18
  },
  modalText2: {
    marginBottom: 15,
    textAlign: 'center',
    color:"black"

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
  button:{
    height: Dimensions.get('window').height*0.05,
    width: Dimensions.get('window').width * 0.3,
    justifyContent:"center",
    borderRadius:8


  }
});
