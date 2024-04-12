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
  TextInput,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Address from '../MenuExtra/Address';
import Pickup from '../MenuExtra/Pickup';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../utills/api';
import ListSkeleton from '../utills/ListSkeleton';
import RazorpayCheckout from 'react-native-razorpay';

const CheckoutPick = ({navigation, route}) => {
  const [loading, setLoading] = useState(true);
  const [loadingPayment, setLoadingPayment] = useState(false);
  const [couponApplied, setCouponApplied] = useState(false);
  const [walletApplied, setWalletApplied] = useState(false);
  const {selectedAddress, selectedOption} = route.params;
  // console.log("lll",selectedAddress, selectedOption)

  const [uid, setUid] = useState('');

  useEffect(() => {
    getProducts();
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
  const [delivery_charge, setDeliveryCharge] = useState();
  const [discount_price, setDiscount] = useState();
  const [previous_price, setPreviousPrice] = useState();
  const [wallet_value, setWalletValue] = useState();
  const getTotalPrice = async () => {
    try {
      const response = await api.get(
        `get_total_price/?user_id=${uid}&&pick_up=1`,
      );
      // console.log(response.data)
      setTotalPrice(response.data.total_price);
      setDeliveryCharge(response.data.delivery_charge);
      setDiscount(response.data.discounted_price);
      setPreviousPrice(response.data.previous_price);
      setWalletValue(response.data.wallet_value);

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

  const addOne = async id => {
    try {
      const response = await api.post(`increase/`, {cart_id: id});
      ToastAndroid.show('Quantity increased', ToastAndroid.SHORT);
      getTotalPrice();
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

  let razorpayKeyId = 'rzp_test_enEwAJBwuY35MP';
  let razorpayKeySecret = 'GDMhskdQyL9mC1OohkGJAoKC';

  const handlePayment = async () => {
    setLoadingPayment(true);
    try {
      const bodyData = {
        user_id: uid,
        total_amount: total_price,
        delivery_time: selectedOption,
        coupon_code: coupon,
        delivery_price: delivery_charge,
        discounted_price: discount_price,
        previous_price: previous_price,
        pick_up: 1,
        walet_value: wallet_value,
      };
      console.log(bodyData);
      const response = await api.post(`create_order/`, bodyData);
      console.log(response.data);
      if (response.data.status === 'success') {
        const options = {
          currency: 'INR',
          key: razorpayKeyId,
          amount: total_price * 100,
          name: 'Cart',
          order_id: response.data.razorpay_order_id,
          theme: {color: '#F37254'},
        };

        console.log('you', options);

        RazorpayCheckout.open(options)
          .then(async data => {
            const bodyData = {
              razorpay_payment_id: data.razorpay_payment_id,
              razorpay_order_id: data.razorpay_order_id,
              razorpay_signature: data.razorpay_signature,
            };

            console.log('body', data);
            const response = await api.post(`verify_payment/`, bodyData);
            console.log('resss', response);

            navigation.navigate('Main', {screen: 'Home'});
            ToastAndroid.show('Order Placed Successfully', ToastAndroid.SHORT);
          })
          .catch(error => {
            console.error('Razorpay error:', JSON.stringify(error.response));
            alert(`Error: ${error.code} | ${error.description}`);
          });
      }
    } catch (error) {
      console.error('Payment error:', JSON.stringify(error.response));
      ToastAndroid.show('Payment failed', ToastAndroid.SHORT);
    }
    setLoadingPayment(false);
  };

  const [coupon, setCoupon] = useState();

  const applyCoupon = async () => {
    try {
      if (uid && coupon) {
        const response = await api.post(`send_coupon/`, {
          coupon: coupon,
          user_id: uid,
        });
        // console.log('Coupon applied');
        getTotalPrice();
        ToastAndroid.show(
          'Coupon Code applied Sucessfully',
          ToastAndroid.SHORT,
        );
      } else {
        ToastAndroid.show('Wrong Coupon Code', ToastAndroid.SHORT);
      }
    } catch (error) {
      console.log('Error applying code:', JSON.stringify(error.response));
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

  const applyWallet = async () => {
    try {
      const uid = await AsyncStorage.getItem('id');
      const response = await api.post(`save_wallet_transaction/`, {
        user_id: uid,
      });
      ToastAndroid.show('Wallet Applied Successfully', ToastAndroid.SHORT);
      setWalletApplied(true);
      getTotalPrice();
    } catch (error) {
      console.log('Error wallet post:', error);
    }
  };

  return (
    <View>
      <ScrollView
        style={{backgroundColor: 'white'}}
        showsVerticalScrollIndicator={false}>
        <View style={styles.box1}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={{}}
            onPress={() => navigation.goBack()}>
            <AntDesign name="left" size={26} color={'#000'} />
          </TouchableOpacity>
          <Text style={styles.t1}>Checkout</Text>
          <Text> </Text>
        </View>
        <View style={{padding: 16}}>
          <Text
            style={{
              fontSize: 16,
              fontFamily: 'Poppins-SemiBold',
              color: 'black',
            }}>
            Pickup Store
          </Text>

          <View
            style={{
              backgroundColor: 'white',
              elevation: 10,
              padding: 10,
              width: Dimensions.get('window').width * 0.91,
              borderRadius: 6,
            }}>
            <Text style={styles.t5}>{selectedAddress.newname}</Text>
            <Text
              style={{
                ...styles.t3,
                width: Dimensions.get('window').width * 0.75,
              }}>
              {selectedAddress.address}, {selectedAddress.city}
            </Text>
            <Text style={styles.t3}>
              {selectedAddress.state}, {selectedAddress.zip_code}
            </Text>
          </View>

          <Text style={{...styles.t5, marginTop: 20}}>Items</Text>

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
                    style={{width: 120, height: 90, borderRadius: 10}}
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
                    marginTop: 5,
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
                    <Text style={styles.t3}>QTY({items.quantity})</Text>
                    <TouchableOpacity onPress={() => addOne(items.id)}>
                      <Feather name="plus-circle" size={22} color={'#FF4D00'} />
                    </TouchableOpacity>
                  </View>

                  <TouchableOpacity>
                    <Text style={styles.bold}>₹{items.price}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))
          )}

          <View style={styles.coupon}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <MaterialCommunityIcons
                name={'ticket-percent-outline'}
                size={20}
                color={'black'}
                style={{marginRight: 10}}
              />
              <TextInput
                placeholder="Apply Coupon"
                placeholderTextColor={'#666666'}
                style={{
                  width: Dimensions.get('window').width * 0.6,
                  height: 40,
                  borderBottomWidth: 0.5,
                  color: 'black',
                }}
                value={coupon}
                onChangeText={text => setCoupon(text)}
                editable={!couponApplied}
              />
            </View>
            <TouchableOpacity onPress={applyCoupon} disabled={couponApplied}>
              <Text style={styles.bold}>Apply</Text>
            </TouchableOpacity>
          </View>
          <View
            style={{borderWidth: 1, borderColor: '#cacaca', marginTop: 20}}
          />
          <View style={styles.coupon}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <MaterialCommunityIcons
                name={'ticket-percent-outline'}
                size={20}
                color={'black'}
                style={{marginRight: 10}}
              />
              <Text style={styles.bold}>Wallet Balance : ₹{walletBalance}</Text>
            </View>
            <TouchableOpacity onPress={applyWallet} disabled={walletApplied}>
              <Text style={styles.bold}>
                {walletApplied ? 'Applied' : 'Apply'}
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{borderWidth: 1, borderColor: '#cacaca', marginTop: 20}}
          />

          <Text style={{...styles.t6, marginTop: 20}}>
            Order Payment Details
          </Text>
          {loading ? ( // Render skeleton loading if data is still loading
            <View>
              <ListSkeleton />
              <ListSkeleton />
            </View>
          ) : (
            <View>
              <View style={styles.row}>
                <Text style={styles.t4}>Price</Text>
                <Text style={styles.t6}>{previous_price}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.t4}>Coupon Discount</Text>
                <Text style={styles.t6}>{discount_price}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.t4}>Wallet Discount</Text>
                <Text style={styles.t6}>{wallet_value}</Text>
              </View>
              {/* <View style={styles.row}>
                  <Text style={styles.t4}>Delivery Charges</Text>
                  <View style={{alignItems: 'flex-end'}}>
                    <Text style={styles.bold}>{delivery_charge}</Text>
                  </View>
                </View> */}
              <View
                style={{borderWidth: 1, borderColor: '#cacaca', marginTop: 20}}
              />

              <View style={styles.row}>
                <Text style={styles.t5}>Order Total</Text>
                <Text style={styles.t6}>₹{total_price}</Text>
              </View>
            </View>
          )}
        </View>
        <Text style={{marginVertical: 50}}></Text>
      </ScrollView>
      <TouchableOpacity style={styles.button} onPress={handlePayment}>
        {loadingPayment ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text style={styles.buttonText}>PROCEED</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default CheckoutPick;

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
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    fontFamily: 'Poppins-Regular',

    color: 'black',
    marginHorizontal: 5,
  },
  t4: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
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
  },
  name: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: 'black',
    width: Dimensions.get('window').width * 0.5,
  },
  name: {
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
