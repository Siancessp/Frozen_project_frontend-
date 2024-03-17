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
import React from 'react';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Profile = ({navigation}) => {
  return (
    <ScrollView style={{backgroundColor: 'white'}}>
      <StatusBar backgroundColor={'#C620E3'} />
      <View style={styles.box1}>
        <TouchableOpacity activeOpacity={0.8} style={{flexDirection:"row", alignItems:"center"}} onPress={()=> navigation.goBack()}>
          <AntDesign name="left" size={24} color={'#fff'} />
        <Text style={styles.t1}>My Profile</Text>
        </TouchableOpacity>
      </View>
      <View style={{padding: 20, bottom: 70}}>
        <View style={styles.proContainer}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View style={styles.imgBox}>
              <Image
                source={{
                  uri: 'https://media.licdn.com/dms/image/D4D03AQEO1CN20ci5xg/profile-displayphoto-shrink_800_800/0/1683999967934?e=1714608000&v=beta&t=1lU4iMGQJn-iIUvzq32CKtvU9eYbY1i0Lkq3ze3DU8k',
                }}
                style={{height: '100%', width: '100%', borderRadius: 100}}
              />
            </View>
            <View style={{marginLeft: 20}}>
              <Text style={styles.t2}>Ritesh</Text>
              <Text>Ritesh@gmail.com</Text>
            </View>
          </View>
          <TouchableOpacity onPress={()=> navigation.navigate("EditProfile")}>
          <Feather name="edit" size={18} color={'#C620E3'} style={{}} />
          </TouchableOpacity>
        </View>
        <Text style={styles.t4}>Personal Details</Text>
        <TouchableOpacity style={styles.box2} onPress={()=> navigation.navigate("OrderHistory")}>
          <View style={styles.v1}>
            <MaterialCommunityIcons
              name="text-box-outline"
              size={24}
              color="#C620E3"
              style={styles.icon}
            />
            <Text style={styles.t5}>Order History</Text>
          </View>
          <AntDesign name="right" size={24} color={'#C620E3'} />
        </TouchableOpacity>
       
        <TouchableOpacity style={styles.box2}>
          <View style={styles.v1}>
            <AntDesign
              name="gift"
              size={24}
              color={'#C620E3'}
              style={styles.icon}
            />

            <Text style={styles.t5}>Promo Code</Text>
          </View>
          <AntDesign name="right" size={24} color={'#C620E3'} />
        </TouchableOpacity>
        <Text style={styles.t4}>Account Setting</Text>
        <TouchableOpacity style={styles.box2}>
          <View style={styles.v1}>
            <Ionicons
              name="location-outline"
              size={24}
              color="#C620E3"
              style={styles.icon}
            />
            <Text style={styles.t5}>Saved Addresses</Text>
          </View>
          <AntDesign name="right" size={24} color={'#C620E3'} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.box2}>
          <View style={styles.v1}>
            <Octicons
              name="credit-card"
              size={24}
              color={'#C620E3'}
              style={styles.icon}
            />

            <Text style={styles.t5}>Saved Cards</Text>
          </View>
          <AntDesign name="right" size={24} color={'#C620E3'} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.box2}>
          <View style={styles.v1}>
            <MaterialCommunityIcons
              name="google-translate"
              size={24}
              color={'#C620E3'}
              style={styles.icon}
            />

            <Text style={styles.t5}>Select Language</Text>
          </View>
          <AntDesign name="right" size={24} color={'#C620E3'} />
        </TouchableOpacity>

        <Text style={styles.t4}>Feedback & Info</Text>
        <TouchableOpacity style={styles.box2}>
          <View style={styles.v1}>
            <MaterialCommunityIcons
              name="headset"
              size={24}
              color="#C620E3"
              style={styles.icon}
            />
            <Text style={styles.t5}>Help Center</Text>
          </View>
          <AntDesign name="right" size={24} color={'#C620E3'} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.box2}>
          <View style={styles.v1}>
            <MaterialCommunityIcons
              name="file-document-multiple-outline"
              size={24}
              color={'#C620E3'}
              style={styles.icon}
            />

            <Text style={styles.t5}>Terms & Conditions</Text>
          </View>
          <AntDesign name="right" size={24} color={'#C620E3'} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.box2}>
          <View style={styles.v1}>
            <MaterialCommunityIcons
              name="security"
              size={24}
              color={'#C620E3'}
              style={styles.icon}
            />

            <Text style={styles.t5}>Privacy Policy</Text>
          </View>
          <AntDesign name="right" size={24} color={'#C620E3'} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn}>
          <Text style={styles.t6}>Sign Out</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  box1: {
    backgroundColor: '#C620E3',
    height: Dimensions.get('window').height * 0.15,
    padding: 10,
    elevation: 10,
  },
  btn:{
    alignSelf:"center",
    marginVertical:50,
    borderWidth:1,
    borderColor:"#C620E3",
    width:Dimensions.get("window").width*0.7,
    alignItems:"center",
    justifyContent:"center",
    height:45,
    borderRadius:30
  },
  t1: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
    marginLeft:20
  },
  proContainer: {
    backgroundColor: 'white',
    borderRadius: 8,
    flexDirection: 'row',
    elevation: 10,
    padding: 15,
    justifyContent: 'space-between',
  },
  imgBox: {
    width: Dimensions.get('window').width * 0.18,
    aspectRatio: 1,
  },
  t2: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
  t3: {
    color: '#4B564D',
    fontSize: 16,
    fontWeight: 'bold',
  },
  t4: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
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
    color: '#C620E3',
    fontSize: 16,
    fontWeight:"bold"
  },
  icon: {
    width: 30,
  },
});
