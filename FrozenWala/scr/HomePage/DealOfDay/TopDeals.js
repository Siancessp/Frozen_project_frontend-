import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';

const TopDeals = ({ onPressAddToCart }) => {
  const navigation = useNavigation();
  const view = [
    {
      id: 1,
      image: {
        uri: 'https://th.bing.com/th/id/OIP.dsi4VJp7QtiKZWH1xsCTAAHaE8?rs=1&pid=ImgDetMain',
      },
      name: 'CP Coated Wings',
      price: 7999,
      mrp: 10999,
      offer: 40,
      quantity: '1kg',
    },
    {
      id: 2,
      image: {
        uri: 'https://i.pinimg.com/736x/8a/7e/2f/8a7e2f62973d4a064b228644d2c8854f--chicken-fingers-crispy-chicken.jpg',
      },
      name: 'ITC CHI CHILLY GARLIC FINGER',
      price: 7999,
      mrp: 10999,
      offer: 40,
      quantity: '1kg',
    },
    {
      id: 3,
      image: {
        uri: 'https://www.ceat.com/content/dam/ceat/product-images/scooter/zoom-d/sku_60.png',
      },
      name: 'Tyre',
      price: 7999,
      mrp: 10999,
      offer: 40,
      quantity: '1kg',
    },
    {
      id: 4,
      image: {
        uri: 'https://www.ceat.com/content/dam/ceat/product-images/scooter/zoom-d/sku_60.png',
      },
      name: 'Tyre',
      price: 7999,
      mrp: 10999,
      offer: 40,
      quantity: '1kg',
    },
  ];
  return (
    <ScrollView
      horizontal
      style={{marginTop: 10}}
      showsHorizontalScrollIndicator={false}>
      {view.map(items => (
        <View
          style={styles.b1}
          >
          <View style={styles.imgbox}>
            <Image source={items.image} style={styles.img} />
          </View>

          <Text style={styles.text} numberOfLines={1}>
            {items.name}
          </Text>
          <Text style={styles.text1}>{items.quantity}</Text>
          <View style={{flexDirection:"row", alignItems:"center"}}>
          <View>
            <Text style={styles.t1}>₹{items.price}</Text>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.text2}>₹{items.mrp}</Text>
              <Text style={styles.text3}>{items.offer}% Off</Text>
            </View>
            </View>
            <TouchableOpacity style={styles.add}
        onPress={() => onPressAddToCart(items)}
            >
              <Text style={styles.text4}>+Add</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};
export default TopDeals;

const styles = StyleSheet.create({
  b1: {
    backgroundColor: 'white',
    width: Dimensions.get('window').width * 0.433,
    marginTop: 10,
    elevation: 10,
    borderRadius: 4,
    margin: 10,
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
    margin: 5,
    width: Dimensions.get('window').width * 0.4,
  },
  t1: {
    color: 'black',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    margin: 5,
  },
  text1: {
    color: '#7E7E7E',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    marginHorizontal: 5,
  },
  text2: {
    color: 'gray',
    fontWeight: '400',
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    marginHorizontal: 5,
    textDecorationLine: 'line-through',
  },
  text3: {
    color: 'red',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 12,
  },
  text4: {
    color: 'white',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
  },
  
  add:{
    backgroundColor:"#FF4D00",
    paddingHorizontal:10,
    paddingVertical:8,
    borderRadius:6,
    marginLeft:5,
  }
});
