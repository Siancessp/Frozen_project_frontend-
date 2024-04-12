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
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';

const Pickup = () => {
  const navigation = useNavigation();
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);

  const address = [
    {
      address_id: 1,
      newname: 'FrozenWala',
      phone: '8268888826',
      address: 'Ruby Tower Jogeshwari West',
      city: 'Mumbai',
      state: 'Maharastra',
      country: 'India',
      zip_code: '400102',
    },
  ];

  const handelAddress = () => {
    if (selectedAddress && selectedOption) {
    navigation.navigate('CheckoutPick', {selectedAddress, selectedOption});
    } else {
      console.log('Please select both address and an option');
    }

    // console.log(selectedAddress);
  };
  const handleSelectOption = option => {
    setSelectedOption(option);
  };
  return (
    <View style={{backgroundColor: 'white', height: '100%'}}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{padding: 16}}>
            <Text style={styles.t5}>Please select Pickup timing</Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: 16,
              marginTop:10
            }}>
            <TouchableOpacity
              style={[
                styles.optionButton,
                selectedOption === 'Within 1 Hour' && styles.selectedOption,
              ]}
              onPress={() => handleSelectOption('Within 1 Hour')}>
              <View
                style={[
                  styles.dot,
                  selectedOption === 'Within 1 Hour' && styles.selectedDot,
                ]}
              />
              <Text style={styles.optionText}>Within 1 Hour</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.optionButton,
                selectedOption === '1 to 3 Hours' && styles.selectedOption,
              ]}
              onPress={() => handleSelectOption('1 to 3 Hours')}>
              <View
                style={[
                  styles.dot,
                  selectedOption === '1 to 3 Hours' && styles.selectedDot,
                ]}
              />
              <Text style={styles.optionText}>1 to 3 Hours</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={{...styles.b1, marginTop:10}} activeOpacity={1}>
            <Text style={styles.t5}>Frozenwala store near you</Text>
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
                  <FontAwesome
                    name="dot-circle-o"
                    size={25}
                    color={
                      selectedAddress &&
                      selectedAddress.address_id === items.address_id
                        ? '#FF4D00' // Selected color
                        : '#666666'
                    }
                  />
                </TouchableOpacity>
                <View style={{marginLeft:5}}>
                  <Text style={styles.t2}>{items.newname}</Text>
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
        onPress={handelAddress}>
        <Text style={styles.buttonText}>PICKUP</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Pickup;

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

  head: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    justifyContent: 'space-between',
  },
  t1: {
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
        fontFamily: 'Poppins-SemiBold',

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
        fontFamily: 'Poppins-SemiBold',

    color: 'black',
  },
  t5: {
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
    color: '#0042E0',
    marginLeft: 10,
  },

  b1: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  b2: {
    justifyContent: 'center',
    borderRadius: 10,
    marginTop: 10,
  },

  button: {
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

  buttonText: {
    textAlign: 'center',
    color: '#FF4D00',
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
  },
});
