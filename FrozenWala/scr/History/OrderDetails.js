import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
const OrderDetails = () => {
  const navigation = useNavigation();

  const items = [
    {
      id: 1,
      name: 'Momo fried',
      quantity: 1,
      price: 250,
    },
    {
      id: 2,
      name: 'Momo steamed',
      quantity: 1,
      price: 200,
    },
    {
      id: 3,
      name: 'Chocolate Momo',
      quantity: 1,
      price: 400,
    },
  ];
  return (
    <View
      style={{
        backgroundColor: 'white',
        flex: 1,
        paddingHorizontal: 16,
      }}>
      <View style={styles.box1}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={{}}
          onPress={() => navigation.goBack()}>
          <AntDesign name="left" size={26} color={'#000'} />
        </TouchableOpacity>
        <Text style={styles.t1}>Order Summary</Text>
        <Text></Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} style={{marginTop: 20}}>
        <View style={styles.line}>
          <Text style={styles.t2}>This Order Was Delivered</Text>
          <AntDesign
            name="check"
            size={16}
            color={'#35B82A'}
            style={{marginLeft: 10}}
          />
        </View>
        <Text style={styles.t3}>On 5th March, 11:30 AM by Samir Puny</Text>
        <View style={styles.bdr} />

        <Text style={styles.t4}>From</Text>
        <Text style={styles.t2}>Frozenwala</Text>
        <Text style={styles.t3}>B/5 Any road, Any area, Mumbai</Text>

        <Text style={{...styles.t4, marginTop: 30}}>To</Text>
        <Text style={styles.t2}>Other</Text>
        <Text style={styles.t3}>B/5 Any road, Any area, Mumbai</Text>

        <View style={styles.bdr} />

        <Text style={styles.t3}>Bill Details</Text>
        {items.map(item => (
          <View style={styles.box2}>
            <Text style={styles.t2}>
              {item.name} X {item.quantity}
            </Text>
            <Text style={styles.t2}>₹{item.price}</Text>
          </View>
        ))}

        <View style={{...styles.bdr, borderStyle: 'dashed', borderWidth: 1}} />
        <View style={styles.box3}>
          <Text style={styles.t2}>Total Items Price</Text>
          <Text style={styles.t2}>₹850</Text>
        </View>
        <View style={styles.box3}>
          <Text style={styles.t2}>Delivery Partner Fee</Text>
          <Text style={styles.t2}>₹50</Text>
        </View>
        <View style={styles.box3}>
          <Text style={styles.t2}>Discount applied</Text>
          <Text style={styles.t2}>- ₹50</Text>
        </View>
        <View style={styles.box3}>
          <Text style={styles.t2}>G.S.T</Text>
          <Text style={styles.t2}>₹10</Text>
        </View>

        <View style={styles.bdr} />
        <View style={styles.box3}>
          <Text style={styles.t5}>Payable Amount</Text>
          <Text style={styles.t5}>₹850</Text>
        </View>

       
      <View style={{marginVertical:10}}/>
       
      </ScrollView>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>REPEAT ORDER</Text>
      </TouchableOpacity>
    </View>
  );
};

export default OrderDetails;

const styles = StyleSheet.create({
  box1: {
    paddingTop: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  box2: {
    marginTop: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  box3: {
    marginTop: 5,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  t1: {
    color: 'black',
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
    marginHorizontal: 16,
  },
  t2: {
    color: 'black',
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
  },
  t3: {
    color: '#7E7E7E',
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
  },
  t4: {
    color: '#FF4D00',
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    marginTop: 10,
  },
  t5: {
    color: 'black',
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
  },
  line: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bdr: {
    borderWidth: 0.5,
    marginVertical: 10,
    borderColor: '#D7D6D6',
  },
  button: {
    backgroundColor:"white",
    borderRadius: 50,
    width: Dimensions.get('window').width * 0.7,
    alignSelf: 'center',
    height: 52,
    justifyContent: 'center',
    marginTop: 30,
    borderWidth:1,
    borderColor:"#FF4D00",
    position:"absolute",
    bottom:40
  },

  buttonText: {
    textAlign: 'center',
    color: '#FF4D00',
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
  },
});
