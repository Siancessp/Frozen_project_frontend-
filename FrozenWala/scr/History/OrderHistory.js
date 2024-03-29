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

const OrderHistory = () => {
  const navigation = useNavigation();

  const list = [
    {
      id: 1,
      name: 'Momo fried',
      price: '₹600',
      date: '12-01-2024',
      image: {
        uri: 'https://th.bing.com/th/id/OIP.RBlq5631XVOWICiVusxpUQHaEy?w=308&h=198&c=7&r=0&o=5&dpr=1.3&pid=1.7',
      },
      date: 'July 14,2024',
      time: '11:00 AM',
      type:"Delivered"
    },
    {
      id: 2,
      name: 'Momo fried',
      price: '₹300',
      date: '10-02-2024',
      image: {
        uri: 'https://th.bing.com/th/id/OIP.RBlq5631XVOWICiVusxpUQHaEy?w=308&h=198&c=7&r=0&o=5&dpr=1.3&pid=1.7',
      },
      date: 'July 14,2024',
      time: '11:00 AM',
      type:"Picked"
    },
  ];

  const handelButton = (items) => {
    if(items.type == "Delivered"){
      navigation.navigate('OrderDetails')
    }else if (items.type == "Picked"){
      navigation.navigate('PickupDetails')
    }
  }
  return (
    <View
      style={{
        backgroundColor: 'white',
        flex: 1,
      }}>
      <View style={styles.box1}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={{}}
          onPress={() => navigation.goBack()}>
          <AntDesign name="left" size={26} color={'#000'} />
        </TouchableOpacity>
        <Text style={styles.t1}>Order History</Text>
        <Text></Text>
      </View>
      <ScrollView>
        {list.map(items => (
          <TouchableOpacity
            key={items.id}
            style={{
              margin: 10,
              elevation: 10,
              backgroundColor: 'white',
              flexDirection: 'row',
              borderRadius: 10,
              alignItems: 'center',
            }}
            onPress={()=> handelButton(items)}>
            <View
              style={{
                alignItems: 'center',
                marginRight: 5,
              }}>
              <Image
                source={items.image}
                style={{
                  width: 110,
                  aspectRatio: 1,
                  borderTopLeftRadius: 9,
                  borderBottomLeftRadius: 9,
                }}
              />
            </View>

            <View style={{marginLeft: 5}}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'flex-start',
                  justifyContent: 'space-between',
                }}>
                <Text style={styles.text3}>{items.name}</Text>
                <AntDesign name="right" size={26} color={'#000'} />
              </View>
              <View style={{flexDirection: 'row'}}>
                <Text style={styles.text4}>{items.date}-</Text>
                <Text style={styles.text4}>{items.time}</Text>
              </View>
              <Text style={{...styles.text3, color: '#80869A'}}>
                {items.price}
              </Text>

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'flex-end',
                  justifyContent: 'space-between',
                  width: Dimensions.get('window').width * 0.6,
                  marginTop: 0,
                }}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text
                    style={{
                      color: '#35B82A',
                      fontFamily: 'Poppins-Regular',
                      fontSize: 12,
                    }}>
                    {items.type}
                  </Text>
                  <AntDesign
                    name="check"
                    size={16}
                    color={'#35B82A'}
                    style={{marginLeft: 10}}
                  />
                </View>
                <TouchableOpacity style={styles.box}>
                  <AntDesign name="reload1" size={12} color={'#fff'} />
                  <Text style={styles.t2}>Re-order</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default OrderHistory;

const styles = StyleSheet.create({
  box1: {
    padding: 16,
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
    color: 'white',
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    marginHorizontal: 5,
  },
  text1: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  text2: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'black',
  },
  text3: {
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
    color: 'black',
  },
  text4: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    color: '#80869A',
  },

  food: {
    backgroundColor: '#ff80a8',
    borderRadius: 10,
    elevation: 10,
    marginLeft: 20,
    padding: 10,
    marginBottom: 20,
    shadowColor: '#ff0055',
  },
  cat2: {},
  img1: {
    height: 60,
    width: 60,
  },

  cat: {
    backgroundColor: '#ff3374',
    padding: 10,
    borderRadius: 10,
    elevation: 10,
    // flexDirection:"row",
    alignItems: 'center',
    height: Dimensions.get('window').height * 0.2,
    width: Dimensions.get('window').width * 0.4,
    justifyContent: 'center',
  },
  img2: {
    height: '100%',
    width: '100%',
    borderRadius: 100,
    padding: 5,
  },
  box: {
    padding: 5,
    backgroundColor: '#FF4D00',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  line: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
