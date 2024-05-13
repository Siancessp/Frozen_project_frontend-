import {
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {SliderBox} from 'react-native-image-slider-box';
import {useNavigation} from '@react-navigation/native';
import api from '../utills/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import QuantityButton from '../Button/QuantityButton';

const Products = ({item, onPressAddToCart, getTotalPrice}) => {
  const [stock, setStock] = useState();
  const getStock = async () => {
    try {
      const response = await api.get(`stock/?product_id=${item.id}`);
      // console.log("dsfedsf", response.data[0].openingstock);
      setStock(response.data[0].openingstock);
    } catch (error) {
      console.log('p', error);
    }
  };
  useEffect(() => {
    getStock();
  }, []);

  const isOutOfStock = stock === 0;

  const navigation = useNavigation();
  return (
    <View style={[styles.b1, isOutOfStock && styles.outOfStock]}>
      <View style={styles.imgbox}>
        {isOutOfStock ? (
          <Image
            source={{
              uri: `https://png.pngtree.com/png-clipart/20190401/ourlarge/pngtree-sold-out-png-image_859393.jpg`,
            }}
            style={styles.img}
          />
        ) : (
          <Image
            source={{uri: `http://20.163.175.115/${item.item_photo}`}}
            style={styles.img}
          />
        )}
      </View>

      <Text style={styles.text} numberOfLines={1}>
        {item.title}
      </Text>
        

      <View>
        <Text style={styles.t2}>₹{item.item_new_price}</Text>
        <View style={{flexDirection: 'row', alignItems:"center"}}>
          <Text style={styles.text2}>₹{item.item_old_price}</Text>
          <Text style={styles.text3}>{item.discount}% Off</Text>
        </View>
      </View>
      {!isOutOfStock && (
        <QuantityButton
          product={item}
          onPressAddToCart={onPressAddToCart}
          getTotalPrice={getTotalPrice}
        />
      )}
    </View>
  );
};

const TodaysDeal = ({navigation, route}) => {
  const {name} = route.params;
  const [getProduct, setGetProduct] = useState('');
  const getTodaysDeal = async () => {
    try {
      const response = await api.get(`deal-of-the-day/`);
      // console.log("res",response.data);
      setGetProduct(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTodaysDeal();
  }, []);

  const [uid, setUid] = useState('');
  useEffect(() => {
    getUid(), getPrice();
    checkCart();
  }, []);

  const getUid = async () => {
    try {
      const value = await AsyncStorage.getItem('id');
      if (value !== null) {
        // console.log(value);
        setUid(value);
      }
    } catch (e) {
      // error reading value
    }
  };
  const [price, setPrice] = useState();
  const [isAdded, setIsAdded] = useState(false);
  const getPrice = async () => {
    try {
      const response = await api.get(`get_total_price/?user_id=${uid}`);
      // console.log("price",response.data);
      setPrice(response.data.previous_price);
    } catch (error) {
      console.log('rrr', error);
    }
  };
  const checkCart = async () => {
    try {
      const response = await api.get(`get_cart/?user_id=${uid}`);
      // console.log("new",response.data);
      if (response.data && response.data.length > 0) {
        setIsAdded(true);
      }
    } catch (error) {
      console.log('Error checking cart:', error);
    }
  };
  useEffect(() => {
    checkCart();
    getPrice();
  }, [uid]);

  const onPressAddToCart = async productId => {
    setIsAdded(true);
    try {
      const response = await api.post(`add_to_cart/`, {
        product_id: productId,
        u_id: uid,
      });
      // console.log('Product added to cart:', response.data);
      setIsAdded(true);
      getPrice();
    } catch (error) {
      console.log('Error adding product to cart:', error);
    }
  };
  const onCloseCart = () => {
    setIsAdded(false);
  };

  return (
    <View style={{backgroundColor: 'white', flex: 1}}>
      <View style={styles.box1}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={{flexDirection: 'row', alignItems: 'center'}}
          onPress={() => navigation.goBack()}>
          <AntDesign name="left" size={24} color={'#000'} />
        </TouchableOpacity>
        <Text style={styles.t1}>{name}</Text>
        <Text></Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} style={{marginTop: 20}}>
        <FlatList
          style={{alignSelf: 'center'}}
          data={getProduct}
          keyExtractor={(item, index) => index.toString()}
          numColumns={2}
          renderItem={({item}) => (
            <Products
              item={item}
              onPressAddToCart={() => onPressAddToCart(item.id)}
              getTotalPrice={getPrice}
            />
          )}
        />
      </ScrollView>

      {isAdded && (
        <View style={styles.cartButton}>
          <View>
            <Text style={styles.cartButtonText}>Your Order</Text>
            <Text style={styles.t3}>Total Price : ₹{price}</Text>
          </View>
          <TouchableOpacity
            style={{
              bottom: 30,
              backgroundColor: '#342014',
              borderRadius: 100,
              padding: 5,
            }}
            onPress={onCloseCart}>
            <AntDesign name="closecircleo" size={20} color={'#FFB400'} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.replace('Bottom',{screen:'Cart'})}>
            <Text style={styles.t4}>View Cart</Text>
            <AntDesign name="arrowright" size={20} color={'#FFB400'} />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default TodaysDeal;

const styles = StyleSheet.create({
  box1: {
    padding: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  outOfStock: {
    backgroundColor: '#CCCCCC',
  },
  t1: {
    color: 'black',
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    marginHorizontal: 16,
  },
  t3: {
    color: 'white',
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
  },
  t4: {
    color: '#FFB400',
    fontSize: 15,
    fontFamily: 'Poppins-SemiBold',
    marginTop: 3,
    marginRight: 5,
  },

  b1: {
    backgroundColor: 'white',
    width: Dimensions.get('window').width * 0.433,
    height: Dimensions.get('window').height * 0.33,
    marginTop: 10,
    elevation: 10,
    borderRadius: 13,
    margin: 10,
    marginBottom: 35,
    paddingHorizontal:5
  },
  img: {
    width: '100%',
    height: '100%',
    borderRadius: 100,
  },
  imgbox: {
    width: Dimensions.get('window').width * 0.36,
    aspectRatio: 1,
    alignSelf: 'center',
    marginTop: 6,
    marginHorizontal: 8,
  },
  text: {
    color: 'black',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    marginTop: 5,
    width: Dimensions.get('window').width * 0.4,
  },
  t2: {
    color: 'black',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
  },
  text1: {
    color: '#7E7E7E',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    marginHorizontal: 5,
  },
  text2: {
    color: 'gray',
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    marginRight: 5,
    textDecorationLine: 'line-through',
  },
  text3: {
    color: 'red',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
  },
  text4: {
    color: 'white',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
  },

  add: {
    backgroundColor: '#FF4D00',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 6,
    marginLeft: 5,
  },
  cartButton: {
    backgroundColor: '#342014',
    width: Dimensions.get('window').width * 1,
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  cartButtonText: {
    color: 'white',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
  },
  button: {
    backgroundColor: 'white',
    height: Dimensions.get('window').height * 0.05,
    width: Dimensions.get('window').width * 0.33,
    alignItems: 'center',
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
