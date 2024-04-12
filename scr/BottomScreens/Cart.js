import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  TouchableWithoutFeedback,
  ToastAndroid,
  ImageBackground,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Address from '../MenuExtra/Address';
import Pickup from '../MenuExtra/Pickup';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../utills/api';
import ListSkeleton from '../utills/ListSkeleton';
import {useNavigation, useFocusEffect} from '@react-navigation/native';

const Cart = () => {
  const navigation = useNavigation();

  const [isDeliverySelected, setIsDeliverySelected] = useState(false);
  const [isPickupSelected, setIsPickupSelected] = useState(false);
  const [deliveryModalVisible, setDeliveryModalVisible] = useState(false);
  const [pickupModalVisible, setPickupModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleDeliveryPress = () => {
    setIsDeliverySelected(true);
    setIsPickupSelected(false);
    setDeliveryModalVisible(true);
  };

  const handlePickupPress = () => {
    setIsPickupSelected(true);
    setIsDeliverySelected(false);
    setPickupModalVisible(true);
  };

  const closeModal = () => {
    setDeliveryModalVisible(false);
    setPickupModalVisible(false);
  };

  const [uid, setUid] = useState('');
  const [stock, setStock] = useState();

  const getStock = async () => {
    try {
      const response = await api.get(`stock/?product_id=${product.id}`);
      console.log('dsfedsf', response.data[0].openingstock);
      setStock(response.data[0].openingstock);
    } catch (error) {
      console.log('p', error);
    }
  };

  useEffect(() => {
    getProducts();
    getStock();
    getUid();
    getTotalPrice();
  }, []);

  const getUid = async () => {
    try {
      const value = await AsyncStorage.getItem('id');
      if (value !== null) {
        // console.log(value);
        setUid(value);
      }
    } catch (e) {}
  };

  const [getProduct, setGetProduct] = useState([]);
  const getProducts = async () => {
    try {
      const response = await api.get(`get_cart/?user_id=${uid}`);
      // console.log(response.data);
      setGetProduct(response.data);
      setLoading(false);
    } catch (error) {
      console.log('lu', error);
    }
  };

  const removeItemFromCart = async itemId => {
    try {
      const response = await api.remove(`remove-cart-item/?cart_id=${itemId}`);
      ToastAndroid.show('Item removed successfully', ToastAndroid.SHORT);
      getProducts();
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };

  const [total_price, setTotalPrice] = useState();
  const getTotalPrice = async () => {
    try {
      const response = await api.get(`get_total_price/?user_id=${uid}`);
      setTotalPrice(response.data.previous_price);
      setLoading(false);
    } catch (error) {
      console.log('rrr', error);
    }
  };
  useEffect(() => {
    getProducts();
    getTotalPrice();
  }, [uid]);

  useEffect(() => {
    getProducts();
    getTotalPrice();
  }, [getProduct]);
  useEffect(() => {}, [getProduct]);

  const addOne = async (id, quantity, product_id) => {
    try {
      const response = await api.get(`stock/?product_id=${product_id}`);
      console.log('dsfedsf', response.data[0].openingstock);
      setStock(response.data[0].openingstock);

      if (stock > quantity) {
        const response = await api.post(`increase/`, {cart_id: id});
        ToastAndroid.show('Quantity increased', ToastAndroid.SHORT);
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
      const response = await api.post(`decrease/`, {cart_id: id});
      ToastAndroid.show('Quantity decreased', ToastAndroid.SHORT);
      getTotalPrice();
    } catch (error) {
      console.log('Error decreasing :', error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getTotalPrice();
      getProducts();
    }, []),
  );

  return (
    <View>
      <ScrollView style={{backgroundColor: 'white', height: '100%'}} showsVerticalScrollIndicator={false}>
        <View style={styles.box1}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={{}}
            onPress={() => navigation.goBack()}>
            <AntDesign name="left" size={26} color={'#000'} />
          </TouchableOpacity>
          <Text style={styles.t1}>Cart</Text>
          <Text style={{marginRight:30}}></Text>
        </View>
        {getProduct.length === 0 ? ( // Check if cart is empty
          <View style={{height:Dimensions.get("window").height}}>
          <ImageBackground source={require("../../assets/Cart.png")} style={{height:"100%"}}/>

          </View>
        ) : (
          <View style={{padding: 16}}>
            {loading ? ( // Render skeleton loading if data is still loading
              <View>
                <ListSkeleton />
                <ListSkeleton />
              </View>
            ) : (
              getProduct.map(items => (
                <View style={styles.box2}>
                  <View style={styles.box3}>
                    <Image
                      source={{
                        uri: `http://20.163.175.115/` + items.product_image,
                      }}
                      style={{width: 120, height: 100, borderRadius: 10}}
                    />
                    <View style={{marginLeft: 20}}>
                      <Text style={styles.name}>{items.product_name}</Text>

                      <Text style={{...styles.t2, marginTop: 2}}>
                        {items.quantity}
                      </Text>
                      <TouchableOpacity
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          backgroundColor: '#D7D6D6',
                          justifyContent: 'center',
                          width: Dimensions.get('window').width * 0.25,
                          borderRadius: 5,
                        }}
                        onPress={() => removeItemFromCart(items.id)}>
                        <MaterialCommunityIcons
                          name="delete-outline"
                          size={16}
                          color={'#FF4D00'}
                        />
                        <Text
                          style={{
                            color: '#FF4D00',
                            fontSize: 14,
                            fontFamily: 'Poppins-Regular',
                            marginTop: 2,
                          }}>
                          Remove
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View
                    style={{
                      borderWidth: 0.5,
                      marginHorizontal: 20,
                      borderColor: '#bbbbbb',
                      marginTop: 8,
                    }}
                  />
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginTop: 5,
                      justifyContent: 'space-between',
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}>
                      <TouchableOpacity onPress={() => subOne(items.id)}>
                        <Feather
                          name="minus-circle"
                          size={22}
                          color={'#FF4D00'}
                        />
                      </TouchableOpacity>
                      <Text style={styles.t3}>{items.quantity}</Text>
                      <TouchableOpacity
                        onPress={() =>
                          addOne(items.id, items.quantity, items.product_id)
                        }>
                        <Feather
                          name="plus-circle"
                          size={22}
                          color={'#FF4D00'}
                        />
                      </TouchableOpacity>
                    </View>

                    <TouchableOpacity>
                      <Text style={styles.pp}>₹{items.price}</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))
            )}

            <View
              style={{
                flexDirection: 'row',
                marginTop: 30,
                justifyContent: 'space-between',
              }}>
              <TouchableOpacity
                style={[styles.btn, isDeliverySelected && styles.selectedBtn]}
                onPress={handleDeliveryPress}>
                <Text
                  style={[
                    styles.btnText,
                    isDeliverySelected && styles.selectedBtnText,
                  ]}>
                  Delivery
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.btn, isPickupSelected && styles.selectedBtn]}
                onPress={handlePickupPress}>
                <Text
                  style={[
                    styles.btnText,
                    isPickupSelected && styles.selectedBtnText,
                  ]}>
                  Pickup
                </Text>
              </TouchableOpacity>
            </View>
            <Modal
              animationType="slide"
              transparent={true}
              visible={deliveryModalVisible || pickupModalVisible}
              onRequestClose={closeModal}>
              <TouchableWithoutFeedback onPress={closeModal}>
                <View style={styles.modalOverlay}>
                  <View style={styles.modal}>
                    {isDeliverySelected && <Address />}
                    {isPickupSelected && <Pickup />}
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </Modal>

            {loading ? ( // Render skeleton loading if data is still loading
              <View>
                <ListSkeleton />
                <ListSkeleton />
              </View>
            ) : (
              <View>
                <View
                  style={{
                    borderWidth: 1,
                    borderColor: '#cacaca',
                    marginTop: 20,
                  }}
                />

                <View style={styles.row}>
                  <Text style={styles.t5}>Order Total</Text>
                  <Text style={styles.t6}>₹{total_price}</Text>
                </View>
              </View>
            )}
          </View>
        )}
        <Text style={{marginVertical: 50}}></Text>
      </ScrollView>
    </View>
  );
};

export default Cart;

const styles = StyleSheet.create({
  box1: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  t1: {
    fontSize: 22,
    fontFamily: 'Poppins-SemiBold',
    fontFamily: 'Poppins-SemiBold',

    color: 'black',
  },
  t2: {
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
    color: 'black',
  },
  t3: {
    fontSize: 15,
    fontFamily: 'Poppins-SemiBold',
    color: 'black',
    marginHorizontal: 5,
  },
  t4: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',

    color: 'black',
    width: Dimensions.get('window').width * 0.45,
  },
  t5: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: 'black',
    width: Dimensions.get('window').width * 0.45,
  },
  t6: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: 'black',
  },
  btnText: {
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
    color: '#FF4D00',
  },
  selectedBtnText: {
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
    color: 'white',
  },

  price: {
    fontSize: 16,

    fontFamily: 'Poppins-SemiBold',
    color: 'black',
    borderWidth: 0.5,
    borderColor: '#cacaca',
    paddingHorizontal: 10,
    padding: 5,
    marginRight: 10,
  },
  box2: {
    backgroundColor: 'white',
    marginTop: 10,
    elevation: 10,
    borderRadius: 8,
    padding: 5,
    paddingHorizontal: 10,
  },
  box3: {
    flexDirection: 'row',
    paddingTop: 5,
  },
  name: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    width: Dimensions.get('window').width * 0.5,
    color: 'black',
  },
  pp: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: 'black',
  },
  offer: {
    color: 'red',
    fontSize: 11,
    fontFamily: 'Poppins-SemiBold',
  },
  mrp: {
    color: 'gray',
    textDecorationLine: 'line-through',
    fontSize: 13,
    fontFamily: 'Poppins-Regular',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    marginHorizontal: 5,
  },
  button: {
    backgroundColor: '#FF4D00',
    borderRadius: 50,
    width: Dimensions.get('window').width * 0.7,
    alignSelf: 'center',
    elevation: 10,
    position: 'absolute',
    bottom: 10,
    height: 52,
    justifyContent: 'center',
  },

  buttonText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
  },
  coupon: {
    backgroundColor: '#F7C71B',
    padding: 10,
    marginTop: 20,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  btn: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#FF4D00',
    width: Dimensions.get('window').width * 0.44,
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    borderRadius: 5,
  },
  selectedBtn: {
    backgroundColor: '#FF4D00',
    borderWidth: 1,
    borderColor: '#FF4D00',
    width: Dimensions.get('window').width * 0.44,
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    borderRadius: 5,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    backgroundColor: 'white',
    padding: 5,
    borderRadius: 10,
    width: '90%',
    height: Dimensions.get('window').height * 0.8,
  },
});
