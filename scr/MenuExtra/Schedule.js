import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import DropDownPicker from 'react-native-dropdown-picker';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

const Schedule = ({ route}) => {
  const navigation = useNavigation()

  const {name, selectedAddress} = route.params

    const items = [
        {label: 'ASAP', value: 'ASAP'},
        {label: 'Within 3 Hours', value: 'Within 3 Hours'},
        {label: 'Within 6 Hours', value: 'Within 6 Hours'},
        {label: 'Within 9 Hours', value: 'Within 9 Hours'},
    
      ];
      const [isOpen, setIsOpen] = useState(false);
      const [currentValue, setCurrentValue] = useState();

      const handelDeliver = () =>{
        navigation.navigate("Checkout",{selectedAddress, currentValue})
      }
    
      
  return (
    <View style={{backgroundColor: 'white', flex: 1}}>
      <View style={styles.box1}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={{}}
          onPress={() => navigation.navigate("Bottom",{screen: "Cart"})}>
          <AntDesign name="left" size={26} color={'#000'} />
        </TouchableOpacity>
        <Text style={styles.t1}>{name} Schedule</Text>
        <Text></Text>
      </View>
      <View style={{marginHorizontal: 16}}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text
              style={{
                fontSize: 14,
                fontFamily: 'Poppins-SemiBold',
                color: '#004CFF',
              }}>
              Address
            </Text>
          {/* <TouchableOpacity >
            <Text
              style={{
                fontSize: 14,
                fontFamily: 'Poppins-SemiBold',
                color: '#004CFF',
              }}>
              Change
            </Text>
          </TouchableOpacity> */}
        </View>
        <View style={{}}>
          <Text style={styles.t5}>{selectedAddress.newname}</Text>
          <Text
            style={{
              ...styles.t3,
              width: Dimensions.get('window').width * 0.75,
            }}>
            {selectedAddress.address}, {selectedAddress.city}
          </Text>
          <Text style={styles.t3}>{selectedAddress.zip_code}, {selectedAddress.state}</Text>
        </View>

        <Text style={{...styles.t5, marginTop:20}}>Schedule</Text>
        <Text style={styles.t4}>Today</Text>

        <DropDownPicker
            items={items}
            open={isOpen}
            setOpen={setIsOpen}
            value={currentValue}
            setValue={setCurrentValue}
            placeholder="Hours"
            maxHeight={200}
            containerStyle={{height: 50,marginTop:40}}
            textStyle={styles.t6}
            style={{borderRadius:30, paddingLeft:15}}
          />

      </View>
      <TouchableOpacity
          style={styles.button}
          onPress={onPress=handelDeliver}
          >
          <Text style={styles.buttonText}>DELIVER HERE</Text>
        </TouchableOpacity>
    </View>
  );
};

export default Schedule;

const styles = StyleSheet.create({
  box1: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  box: {
    borderWidth: 1,
    backgroundColor: 'white',
    borderRadius: 30,
    padding: 10,
    paddingHorizontal: 30,
    width: '100%',
    height: 45,
    marginTop: 10,
  },
  t1: {
    fontSize: 22,
    fontFamily: 'Poppins-SemiBold',
        fontFamily: 'Poppins-SemiBold',

    color: 'black',
  },
  t2: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
        fontFamily: 'Poppins-Regular',

    color: 'black',
    marginHorizontal: 5,
  },
  t3: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
        fontFamily: 'Poppins-Regular',

    color: 'black',
    marginHorizontal: 5,
  },
  t4: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
        fontFamily: 'Poppins-Regular',

    color: 'black',
    marginHorizontal: 5,
    borderWidth:1,
    height: 45,
    borderRadius:30,
    textAlignVertical:"center",
    paddingLeft:20,
    marginTop:30
  },
  t5: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    marginHorizontal: 5,
    color: 'black',
  },
  t6: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
        fontFamily: 'Poppins-Regular',

    color: 'black',
    marginHorizontal: 5,
     
  },
  button: {
    backgroundColor:"white",
    borderRadius: 50,
    width: Dimensions.get('window').width * 0.7,
    alignSelf: 'center',
    elevation: 10,
    position: 'absolute',
    bottom: 30,
    height: 52,
    justifyContent: 'center',
    borderWidth:1,
    borderColor:"#FF4D00"
  },

  buttonText: {
    textAlign: 'center',
    color: '#FF4D00',
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
  },
});
