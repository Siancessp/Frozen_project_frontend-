import React, {useEffect, useState} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  ToastAndroid,
  Dimensions,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import api from '../utills/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

const QuantityButton = ({product, onPressAddToCart, getTotalPrice}) => {
  const [quantity, setQuantity] = useState(0);
  const [stock, setStock] = useState();

  const getQuantity = async () => {
    try {
      const uid = await AsyncStorage.getItem('id');
      const response = await api.get(
        `get_cart/main/?user_id=${uid}&&product_id=${product.id}`,
      );
      // console.log("dsfedsf", response.data);
      setQuantity(response.data.quantity);
    } catch (error) {
      console.log('Errorwefdewfd', error);
    }
  };
  const getStock = async () => {
    try {
      const response = await api.get(`stock/?product_id=${product.id}`);
      // console.log("dsfedsf", response.data[0].openingstock);
      setStock(response.data[0].openingstock);
    } catch (error) {
      console.log('p', error);
    }
  };

  useEffect(() => {
    getStock();
    getQuantity();
  }, []);

  const handlePress = () => {
    if (quantity === 0) {
      getTotalPrice();
      onPressAddToCart(product);
      setQuantity(1);
    }
  };

  const addOne = async id => {
    try {
      const uid = await AsyncStorage.getItem('id');
      if (stock > quantity) {
        const response = await api.post(`increase/main/`, {
          product_id: id,
          user_id: uid,
        });
        ToastAndroid.show('Quantity increased', ToastAndroid.SHORT);
        getQuantity();
        getTotalPrice();
      } else if (stock === quantity) {
        ToastAndroid.show(
          `Only ${stock} avilable.\n You can not add more`,
          ToastAndroid.SHORT,
        );
      }
    } catch (error) {
      console.log('Error adding :', error);
    }
  };

  const subOne = async id => {
    try {
      const uid = await AsyncStorage.getItem('id');
      if (quantity > 1) {
        const response = await api.post(`decrease/main/`, {
          product_id: id,
          user_id: uid,
        });
        getQuantity();
        getTotalPrice();
        ToastAndroid.show('Quantity decreased', ToastAndroid.SHORT);
      } else if (quantity === 1) {
        const response = await api.post(`decrease/main/`, {
          product_id: id,
          user_id: uid,
        });
        setQuantity(0);
        getTotalPrice();
        ToastAndroid.show('Quantity decreased', ToastAndroid.SHORT);
      }
    } catch (error) {
      console.log('Error decreasing:', error);
      if (error.response) {
        console.log('Response data:', error.response.data);
        console.log('Response status:', error.response.status);
        console.log('Response headers:', error.response.headers);
      }
      ToastAndroid.show('Failed to decrease quantity', ToastAndroid.SHORT);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        position: 'absolute',
        alignSelf: 'center',
        top: Dimensions.get('window').height * 0.305,
      }}>
      {quantity > 0 ? (
        <View
          style={{
            ...styles.add,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: 5,
          }}>
          <TouchableOpacity onPress={() => subOne(product.id)}>
            <Feather name="minus-circle" size={22} color={'white'} />
          </TouchableOpacity>
          <Text style={styles.t3}>{quantity}</Text>
          <TouchableOpacity onPress={() => addOne(product.id)}>
            <Feather name="plus-circle" size={22} color={'white'} />
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity style={styles.add} onPress={handlePress}>
          <Text style={styles.text4}>+Add</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default QuantityButton;

const styles = StyleSheet.create({
  t3: {
    fontSize: 15,
    fontFamily: 'Poppins-SemiBold',
    color: 'white',
    marginHorizontal: 3,
  },
  text4: {
    color: 'white',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
  },
  add: {
    backgroundColor: '#FF4D00',
    width: Dimensions.get('window').width * 0.28,
    paddingVertical: 10,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
