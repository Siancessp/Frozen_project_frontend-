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
import axios from 'axios';
import RNFetchBlob from 'rn-fetch-blob';
import api from '../utills/api';
const OrderDetails = ({route}) => {
  const {order_id, timeat} = route.params

  const navigation = useNavigation();

  const [name, setName] = useState();
  const [address, setAddress] = useState();
  const [city, setCity] = useState();
  const [state, setState] = useState();
  const [zip, setZip] = useState();
  const [previous_price, setPreviousPrice] = useState();
  const [total_price, setTotalPrice] = useState();
  const [discount, setDiscount] = useState();
  const [delivery, setDelivery] = useState();
  const [statustext, setStatusText] = useState();
  const [orderId, setOrderId] = useState();
  const [products, setProducts] = useState([]);

  const getHistory = async () => {
    try {
      const uid = await AsyncStorage.getItem('id');
      const response = await api.get(`invoice/?order_id=${order_id}`);
      console.log("order", response.data.order_details[0]);
      setAddress(response.data.order_details[0].address)
      setCity(response.data.order_details[0].city)
      setName(response.data.order_details[0].newname)
      setDiscount(response.data.order_details[0].discounted_price)
      setDelivery(response.data.order_details[0].delivery_price)
      setState(response.data.order_details[0].state)
      setZip(response.data.order_details[0].zip_code)
      setPreviousPrice(response.data.order_details[0].previous_price)
      setStatusText(response.data.order_details[0].status)
      setTotalPrice(response.data.order_details[0].total_price)
      setOrderId(response.data.order_details[0].order_id)
      // console.log("pd", response.data.products);
      setProducts(response.data.products)
    } catch (error) {
      console.log('Error fetching :', error);
    }
  };

  useEffect(() => {
    getHistory();
  }, []);


  const [pdf, setPdf] = useState();

  const generatePDF = async () => {
    try {
      const uid = await AsyncStorage.getItem('id');
      const { dirs } = RNFetchBlob.fs;
      const config = {
        fileCache: true,
        addAndroidDownloads: {
          useDownloadManager: true,
          notification: true,
          mime: 'application/pdf',
          description: 'File downloaded by download manager.',
          path: `${dirs.DownloadDir}/invoice_${orderId}.pdf`,
        },
      };
      RNFetchBlob.config(config)
        .fetch('GET', `http://20.163.175.115/api/generate_invoice/?order_id=${orderId}`)
        .then((res) => {
          console.log('The file saved to ', res.path());
        })
        .catch((e) => {
          console.log(e);
        });
    } catch (error) {
      console.log('Error fetching pdf:', error);
    }
  };
  
  
  let statusText, color, icon;

          if (statustext == 1) {
            statusText = 'Pending';
            color = '#FF9800';
            icon = 'clockcircleo'; 
          } else if (statustext == 2) {
            statusText = 'Confirm';
            color = '#03A9F4'; 
            icon = 'checkcircleo'; 
          } else if (statustext == 3) {
            statusText = 'Picked Up';
            color = '#4CAF50'; 
            icon = 'rocket1'; 
          } else if (statustext == 4) {
            statusText = 'Delivered';
            color = '#8BC34A'; 
            icon = 'checkcircle'; 
          } else if (statustext == 5) {
            statusText = 'Cancel';
            color = '#F44336';
            icon = 'closecircleo'; 
          } else if (statustext == 6) {
            statusText = 'Return Request';
            color = '#9E9E9E'; 
            icon = 'retweet'; 
          } else {
            statusText = 'Accepted';
            color = '#9C27B0';
            icon = 'check';
          }

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
          <Text style={styles.t2}>This Order Was <Text style={{color:{color}}}>{statusText}</Text></Text>
          <AntDesign
            name={icon}
            size={16}
            color={color}
            style={{marginLeft: 10}}
          />
        </View>
        <Text style={styles.t3}>{timeat}</Text>
        <View style={styles.bdr} />

        <Text style={styles.t4}>From</Text>
        <Text style={styles.t2}>Frozenwala</Text>
        <Text style={styles.t3}>B/5 Any road, Any area, Mumbai</Text>

        <Text style={{...styles.t4, marginTop: 30}}>To</Text>
        <Text style={styles.t2}>{name}</Text>
        <Text style={styles.t3}>{address}, {city}, {state}, {zip}</Text>

        <View style={styles.bdr} />

        <Text style={styles.t3}>Bill Details</Text>
        {products.map(item => (
          <View style={styles.box2}>
            <Text style={styles.t2}>
              {item.name} X {item.item_quantity}
            </Text>
            <Text style={styles.t2}>₹{item.item_new_price}</Text>
          </View>
        ))}

        <View style={{...styles.bdr, borderStyle: 'dashed', borderWidth: 1}} />
        <View style={styles.box3}>
          <Text style={styles.t2}>Total Items Price</Text>
          <Text style={styles.t2}>₹{previous_price}</Text>
        </View>
        <View style={styles.box3}>
          <Text style={styles.t2}>Delivery Partner Fee</Text>
          <Text style={styles.t2}>₹{delivery}</Text>
        </View>
        <View style={styles.box3}>
          <Text style={styles.t2}>Discount applied</Text>
          <Text style={styles.t2}>- ₹{discount}</Text>
        </View>
        {/* <View style={styles.box3}>
          <Text style={styles.t2}>G.S.T</Text>
          <Text style={styles.t2}>₹10</Text>
        </View> */}

        <View style={styles.bdr} />
        <View style={styles.box3}>
          <Text style={styles.t5}>Payable Amount</Text>
          <Text style={styles.t5}>₹{total_price}</Text>
        </View>

       
      <View style={{marginVertical:10}}/>
       
      </ScrollView>
      <TouchableOpacity style={styles.button} onPress={generatePDF}>
        <Text style={styles.buttonText}>Generate Invoice</Text>
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
