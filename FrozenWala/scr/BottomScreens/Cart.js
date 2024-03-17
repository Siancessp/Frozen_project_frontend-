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
} from 'react-native';
import React, {useState} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Address from '../MenuExtra/Address';
import Pickup from '../MenuExtra/Pickup';

const Cart = ({navigation}) => {
  const [isDeliverySelected, setIsDeliverySelected] = useState(false);
  const [isPickupSelected, setIsPickupSelected] = useState(false);
  const [deliveryModalVisible, setDeliveryModalVisible] = useState(false);
  const [pickupModalVisible, setPickupModalVisible] = useState(false);

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

  const cartItems = [
    {
      id: 1,
      image: {
        uri: 'https://www.holidify.com/images/cmsuploads/compressed/8341992509_906d197b80_k_20190912175503.jpg',
      },
      name: 'Steam Momo',
      quantity: 1,
      price: 600,
      kilo: '1kg',
    },
    {
      id: 2,
      image: {
        uri: 'https://th.bing.com/th/id/OIP.Md_ryoA499ODG1A51_AQWwHaHa?rs=1&pid=ImgDetMain',
      },
      name: 'Tyre',
      quantity: 1,
      price: 600,
      kilo: '1kg',
    },
    {
      id: 3,
      image: {
        uri: 'https://th.bing.com/th/id/OIP.Md_ryoA499ODG1A51_AQWwHaHa?rs=1&pid=ImgDetMain',
      },
      name: 'Tyre',
      price: 600,
      quantity: 1,
      kilo: '1kg',
    },
  ];
  return (
    <View>
      <ScrollView style={{backgroundColor: 'white'}}>
        <View style={styles.box1}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={{}}
            onPress={() => navigation.goBack()}>
            <AntDesign name="left" size={26} color={'#000'} />
          </TouchableOpacity>
          <Text style={styles.t1}>Cart</Text>
          <Text></Text>
        </View>
        <View style={{padding: 16}}>
          {cartItems.map(items => (
            <View style={styles.box2}>
              <View style={styles.box3}>
                <Image
                  source={items.image}
                  style={{width: 120, height: 90, borderRadius: 10}}
                />
                <View style={{marginLeft: 20}}>
                  <Text style={styles.name}>{items.name}</Text>

                  <Text style={{...styles.t2, marginTop: 2}}>{items.kilo}</Text>
                  <TouchableOpacity
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      backgroundColor: '#D7D6D6',
                      justifyContent: 'center',
                    }}>
                    <MaterialCommunityIcons
                      name="delete-outline"
                      size={18}
                      color={'#FF4D00'}
                    />
                    <Text
                      style={{
                        color: '#FF4D00',
                        fontSize: 14,
                        fontFamily: 'Poppins-Regular',
                        fontWeight: '400',
                        marginTop:2
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
                  <TouchableOpacity>
                    <Feather name="minus-circle" size={22} color={'#FF4D00'} />
                  </TouchableOpacity>
                  <Text style={styles.t3}>QTY({items.quantity})</Text>
                  <TouchableOpacity>
                    <Feather name="plus-circle" size={22} color={'#FF4D00'} />
                  </TouchableOpacity>
                </View>

                <TouchableOpacity>
                  <Text style={styles.name}>₹{items.price}</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}

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
          <View style={styles.coupon}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <MaterialCommunityIcons
                name={'ticket-percent-outline'}
                size={20}
                color={'black'}
                style={{marginRight: 10}}
              />
              <Text style={styles.t4}>Apply Coupon</Text>
            </View>
            <TouchableOpacity>
              <Text style={styles.name}>Select</Text>
            </TouchableOpacity>
          </View>
          <View
            style={{borderWidth: 1, borderColor: '#cacaca', marginTop: 20}}
          />

          <Text style={{...styles.t6, marginTop: 20}}>
            Order Payment Details
          </Text>

          <View style={styles.row}>
            <Text style={styles.t4}>Price</Text>
            <Text style={styles.t6}>₹250</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.t4}>Discount</Text>
            <Text style={styles.t6}>-₹20</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.t4}>Delivery Charges</Text>
            <View style={{alignItems: 'flex-end'}}>
              <Text style={styles.name}>₹00</Text>
              <Text style={{...styles.name, color: '#24B118'}}>
                Free Delivery
              </Text>
            </View>
          </View>
          <View
            style={{borderWidth: 1, borderColor: '#cacaca', marginTop: 20}}
          />

          <View style={styles.row}>
            <Text style={styles.t5}>Order Total</Text>
            <Text style={styles.t6}>₹230</Text>
          </View>
        </View>
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
    fontWeight: '600',
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
    fontWeight: '400',
    color: 'black',
    marginHorizontal: 5,
  },
  t4: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    fontWeight: '400',
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
    fontWeight: '600',
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
    fontWeight: '600',
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
    backgroundColor: '#C620E3',
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
