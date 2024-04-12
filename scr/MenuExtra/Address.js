import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import api from '../utills/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ListSkeleton from '../utills/ListSkeleton';

const Address = () => {
  const navigation = useNavigation();
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [loading, setLoading] = useState(true);

  const [address, setAddress] = useState([]);
  const getAddress = async () => {
    try {
      const uid = await AsyncStorage.getItem('id');
      const response = await api.get(`addresses/?user_id=${uid}`);
      console.log(response.data);
      setAddress(response.data);
      setLoading(false);
    } catch (error) {
      console.log('Error fetching addresses:', error);
    }
  };

  useEffect(() => {
    getAddress();
  }, []);

  const handleSelectAddress = (items) => {
    if (selectedAddress && selectedAddress.id === items.id) {
      setSelectedAddress(null);
    } else {
      setSelectedAddress(items);
    }
  };

  const handleSelectOption = (option) => {
    setSelectedOption(option);
  };

  const handleAddressDelivery = () => {
    if (selectedAddress && selectedOption) {
      navigation.replace('Checkout', { name: 'Delivery', selectedAddress, selectedOption });
    } else {
      console.log('Please select both address and an option');
    }
  };

  return (
    <View style={{ backgroundColor: 'white', height: '100%' }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ padding: 16 }}>
            <Text style={styles.addText}>Please select Delivery timing</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16, marginTop:10 }}>
            <TouchableOpacity
              style={[styles.optionButton, selectedOption === 'Within 1 Hour' && styles.selectedOption]}
              onPress={() => handleSelectOption('Within 1 Hour')}>
              <View style={[styles.dot, selectedOption === 'Within 1 Hour' && styles.selectedDot]} />
              <Text style={styles.optionText}>Within 1 Hour</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.optionButton, selectedOption === '1 to 3 Hours' && styles.selectedOption]}
              onPress={() => handleSelectOption('1 to 3 Hours')}>
              <View style={[styles.dot, selectedOption === '1 to 3 Hours' && styles.selectedDot]} />
              <Text style={styles.optionText}>1 to 3 Hours</Text>
            </TouchableOpacity>
           
          </View>
          
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => navigation.navigate('NewAddress')}>
            <Feather name="plus-circle" size={24} color="#0042E0" />
            <Text style={styles.addText}>Add New Address</Text>
          </TouchableOpacity>

          {loading ? (
            <View>
              <ListSkeleton />
              <ListSkeleton />
            </View>
          ) : (
            address.map((items) => (
              <TouchableOpacity
                style={[
                  styles.addressButton,
                  selectedAddress?.id === items.id ? { backgroundColor: '#fff' } : {},
                ]}
                key={items.id}
                onPress={() => handleSelectAddress(items)}>
                <View
                style={{
                  flexDirection: 'row',
                  width: Dimensions.get('window').width * 0.75,
                }}>
                <TouchableOpacity>
                  <FontAwesome
                    name="dot-circle-o"
                    size={25}
                    color={
                      selectedAddress && selectedAddress.id === items.id
                        ? '#FF4D00' // Selected color
                        : '#666666'
                    }
                  />
                </TouchableOpacity>
                <View style={{ marginLeft: 10 }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      width: Dimensions.get('window').width * 0.7,
                    }}>
                    <Text style={styles.t2}>{items.newname}</Text>
                    <Text style={styles.t2}>{items.phone}</Text>
                  </View>
                  <Text style={styles.t3}>
                    {items.address}, {items.city}
                  </Text>

                  <Text style={styles.t3}>
                    {items.state}, {items.country}, {items.zip_code}
                  </Text>
                </View>
              </View>
              </TouchableOpacity>
            ))
          )}
        </View>
      </ScrollView>
      
      <TouchableOpacity style={styles.deliverButton} onPress={handleAddressDelivery}>
        <Text style={styles.deliverText}>DELIVER HERE</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Address;

const styles = StyleSheet.create({
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  selectedOption: {
    // backgroundColor: '#0042E0',
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#666666',
    marginRight: 8,
  },
  selectedDot: {
    backgroundColor: '#FF4D00',
  },
  optionText: {
    color: 'black',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
  },
  addText: {
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
    color: '#0042E0',
    marginLeft: 10,
  },
  addressButton: {
    justifyContent: 'center',
    borderRadius: 10,
    marginTop: 20,
  },
  deliverButton: {
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
  deliverText: {
    textAlign: 'center',
    color: '#FF4D00',
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
  },
  t2: {
    color: 'black',
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
  },
  t3: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
        fontFamily: 'Poppins-Regular',

    color: 'black',
  },
});
