import {
    Dimensions,
    ScrollView,
    StyleSheet,
    Text,
    ToastAndroid,
    TouchableOpacity,
    View,
  } from 'react-native';
  import React, {useEffect, useState} from 'react';
  import AntDesign from 'react-native-vector-icons/AntDesign';
  import FontAwesome from 'react-native-vector-icons/FontAwesome';
  import Feather from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
  
  const Address = () => {
    const navigation = useNavigation()
    const [selectedAddress, setSelectedAddress] = useState(null);
  
    const address = [
      {
        address_id: 1,
        full_name: 'Ritesh Kumar',
        phone_number: '9123234198',
        address: 'near Hanuman Mandir',
        city: 'Khesmi, Gomoh',
        state: 'Jharkhand',
        country: 'India',
        zip_code: '828401',
      },
    ];
  
    const handelAddress = () => {
      navigation.navigate('PaymentPage', {selectedAddress});
  
      // console.log(selectedAddress);
    };
  
    return (
      <View style={{backgroundColor: 'white', height: '100%'}}>
        
        <ScrollView>
          <View style={{padding:16}}>
            
            <TouchableOpacity
              style={styles.b1}
                onPress={() => navigation.navigate('NewAddress')}
            >
              <Feather name="plus-circle" size={24} color="#0042E0" />
              <Text style={styles.t5}>Add New Address</Text>
            </TouchableOpacity>
            {address.map(items => (
              <TouchableOpacity
                style={[
                  styles.b2,
                  selectedAddress?.address_id === items.address_id
                    ? {backgroundColor: '#fff'}
                    : {},
                ]}
                key={items.address_id}
                onPress={() => {
                  if (
                    selectedAddress &&
                    selectedAddress.address_id === items.address_id
                  ) {
                    // If the clicked address is already selected, deselect it
                    setSelectedAddress(null);
                  } else {
                    // Otherwise, select the clicked address
                    setSelectedAddress(items);
                  }
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: Dimensions.get('window').width * 0.75,
                  }}>
                  <TouchableOpacity>
                    <FontAwesome name="dot-circle-o" size={25} color={selectedAddress && selectedAddress.address_id === items.address_id
                        ? '#FF4D00'  // Selected color
                        : '#666666'} />
                  </TouchableOpacity>
                  <View>
                  <Text style={styles.t2}>{items.full_name}</Text>
                  <Text style={styles.t2}>{items.phone_number}</Text>
                <View style={{flexDirection: 'row'}}>
                  <Text style={styles.t3}>{items.address}</Text>
                  <Text style={styles.t3}>, {items.city}</Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <Text style={styles.t3}>{items.state}</Text>
                  <Text style={styles.t3}>, {items.country}</Text>
                  <Text style={styles.t3}>, {items.zip_code}</Text>
                </View>
                </View>
                </View>
              
              </TouchableOpacity>
            ))}
          </View>
  
          <Text style={{margin: 50}}></Text>
        </ScrollView>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.replace('Schedule' ,{name:"Delivery"})}
          >
          <Text style={styles.buttonText}>DELIVER HERE</Text>
        </TouchableOpacity>
      </View>
    );
  };
  
  export default Address;
  
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
      fontWeight: 'bold',
      color: 'black',
    },
    t2: {fontSize: 16, fontFamily: 'Poppins-Regular', color: 'black'},
    t3: {
      fontFamily: 'Poppins-Regular',
      fontSize: 13,
      color: '#666666',
    },
  
    t4: {
      fontSize: 20,
      fontFamily: 'Poppins-SemiBold',
      fontWeight: 'bold',
      color: 'black',
    },
    t5: {fontSize: 14, fontFamily: 'Poppins-SemiBold', color: '#0042E0', marginLeft:10},
  
    b1: {
      flexDirection: 'row',
      alignItems: 'center',
      
    },
    b2: {
      justifyContent: 'center',
      borderRadius: 10,
      marginTop: 20,
    },
   
    button: {
      backgroundColor:"white",
      borderRadius: 50,
      width: Dimensions.get('window').width * 0.7,
      alignSelf: 'center',
      elevation: 10,
      position: 'absolute',
      bottom: 10,
      height: 52,
      justifyContent: 'center',
      borderWidth:1,
      borderColor:"#C620E3"
    },
  
    buttonText: {
      textAlign: 'center',
      color: '#C620E3',
      fontSize: 18,
      fontFamily: 'Poppins-SemiBold',
    },
  });
  