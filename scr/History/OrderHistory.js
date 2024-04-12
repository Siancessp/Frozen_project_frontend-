import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../utills/api';

const OrderHistory = () => {
  const navigation = useNavigation();
  const [history, setHistory] = useState([]);

  const getHistory = async () => {
    try {
      const uid = await AsyncStorage.getItem('id');
      const response = await api.get(`orders/?user_id=${uid}`);
      setHistory(response.data);
    } catch (error) {
      console.log('Error fetching history:', error);
    }
  };

  useEffect(() => {
    getHistory();
  }, []);

  const handleButton = items => {
    if (items.status) {;
      navigation.navigate('OrderDetails',{order_id:items.order_id, timeat:items.created_at} );
    } else if (items.type === 'Picked') {
      navigation.navigate('PickupDetails');
    }
  };

  return (
    <View style={{backgroundColor: 'white', flex: 1}}>
      <View style={styles.box1}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.goBack()}>
          <AntDesign name="left" size={26} color={'#000'} />
        </TouchableOpacity>
        <Text style={styles.t1}>Order History</Text>
        <Text></Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        {history.map(items => {
          let statusText, color, icon;

          if (items.status == 1) {
            statusText = 'Pending';
            color = '#FF9800';
            icon = 'clockcircleo'; 
          } else if (items.status == 2) {
            statusText = 'Confirm';
            color = '#03A9F4'; 
            icon = 'checkcircleo'; 
          } else if (items.status == 3) {
            statusText = 'Picked Up';
            color = '#4CAF50'; 
            icon = 'rocket1'; 
          } else if (items.status == 4) {
            statusText = 'Delivered';
            color = '#8BC34A'; 
            icon = 'checkcircle'; 
          } else if (items.status == 5) {
            statusText = 'Cancel';
            color = '#F44336';
            icon = 'closecircleo'; 
          } else if (items.status == 6) {
            statusText = 'Return Request';
            color = '#9E9E9E'; 
            icon = 'retweet'; 
          } else {
            statusText = 'Accepted';
            color = '#9C27B0';
            icon = 'check';
          }

          return (
            <TouchableOpacity
              key={items.id}
              style={{
                margin: 10,
                elevation: 10,
                backgroundColor: 'white',
                flexDirection: 'row',
                borderRadius: 10,
                alignItems:"center"
              }}
              onPress={() => handleButton(items)}>
              <View
                style={{
                  alignItems: 'center',
                  marginRight: 5,
                  width:Dimensions.get("window").width*0.26,
                  aspectRatio:1,
                  orderTopLeftRadius: 9,
                    borderBottomLeftRadius: 9,
                }}>
                <Image
                  source={{uri:'https://frozenwala.com/frontend/public/images/logo.jpg'}}
                  style={{
                    width: "100%",
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
                  <Text style={styles.text3}>{items.order_id}</Text>
                  <AntDesign name="right" size={20} color={'#000'} />
                </View>
                <Text style={styles.text4}>{items.created_at}</Text>

                <Text style={{...styles.text3, color: '#80869A'}}>
                  {items.total_price}
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
                        color: color,
                        fontFamily: 'Poppins-Regular',
                        fontSize: 12,
                        marginLeft: 5,
                      }}>
                      {statusText}
                    </Text>
                    <AntDesign name={icon} size={16} color={color} style={{marginLeft:5}} />
                  </View>
                  {/* <TouchableOpacity style={styles.box}>
                    <AntDesign name="reload1" size={12} color={'#fff'} />
                    <Text style={styles.t2}>Re-order</Text>
                  </TouchableOpacity> */}
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
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
        fontFamily: 'Poppins-SemiBold',

    color: 'black',
  },
  text2: {
    fontSize: 22,
        fontFamily: 'Poppins-SemiBold',

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
