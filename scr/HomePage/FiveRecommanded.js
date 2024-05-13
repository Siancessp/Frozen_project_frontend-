import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import api from '../utills/api';
import QuantityButton from '../Button/QuantityButton';

const FiveRecommanded = ({onPressAddToCart, getTotalPrice}) => {

  const navigation = useNavigation();
  const [getProduct, setGetProduct] = useState([]);
  const getRecommended = async () => {
    try {
      const response = await api.get(`recommended_five/`);
      setGetProduct(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getRecommended();
  }, []);

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
    getStock()
  }, [])
  
  const isOutOfStock = stock === 0;

  return (
    <ScrollView
      horizontal
      style={{marginTop: 10}}
      showsHorizontalScrollIndicator={false}>
      {getProduct.map(item => (
        <View style={[styles.b1, isOutOfStock && styles.outOfStock]}>
      <View style={styles.imgbox}>
      {isOutOfStock ? (
          <Image source={{uri: `https://png.pngtree.com/png-clipart/20190401/ourlarge/pngtree-sold-out-png-image_859393.jpg`}} style={styles.img} />
        ) : (
          <Image source={{ uri: `http://20.163.175.115/${item.item_photo}` }} style={styles.img} />
        )}
      </View>

      <Text style={styles.text} numberOfLines={1}>
        {item.title}
      </Text>
        
        <View>
          <Text style={styles.t1}>₹{item.item_new_price}</Text>
          <View style={{flexDirection: 'row', alignItems:"center"}}>
            <Text style={styles.text2}>₹{item.item_old_price}</Text>
            <Text style={styles.text3}>{item.discount}% Off</Text>
          </View>
        </View>
        {!isOutOfStock && (
        <QuantityButton product={item} onPressAddToCart={onPressAddToCart} getTotalPrice={getTotalPrice}/>
      )}
       
    </View>
      ))}
    </ScrollView>
  );
};
export default FiveRecommanded;

const styles = StyleSheet.create({
  b1: {
    backgroundColor: 'white',
    width: Dimensions.get('window').width * 0.433,
    marginTop: 2,
    elevation: 10,
    shadowRadius:13,
    borderRadius: 13,
    marginRight:20, marginBottom:35,
    marginLeft:3,
    height: Dimensions.get('window').height * 0.33,
    paddingHorizontal:8
    
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
    width: Dimensions.get('window').width * 0.4,
    marginTop:5
  },
  t1: {
    color: 'black',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
  },
  text1: {
    color: '#7E7E7E',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
  },
  text2: {
    color: 'gray',
    fontWeight: '400',
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    textDecorationLine: 'line-through',
  },
  text3: {
    color: 'red',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    marginLeft:5
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
    marginBottom: 5,
  },
});
