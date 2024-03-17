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
import React, { useState } from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {SliderBox} from 'react-native-image-slider-box';
import {useNavigation} from '@react-navigation/native';
const Products = ({item,  onPressAdd}) => {
  const navigation = useNavigation();
  return (
    <View style={styles.b1}>
      <View style={styles.imgbox}>
        <Image source={item.image} style={styles.img} />
      </View>

      <Text style={styles.text} numberOfLines={1}>
        {item.name}
      </Text>
      <Text style={styles.text1}>{item.quantity}</Text>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View>
          <Text style={styles.t2}>₹{item.price}</Text>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.text2}>₹{item.mrp}</Text>
            <Text style={styles.text3}>{item.offer}% Off</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.add} onPress={onPressAdd}>
          <Text style={styles.text4}>+Add</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const list = [
  {
    id: 1,
    image: {
      uri: 'https://th.bing.com/th/id/OIP.dsi4VJp7QtiKZWH1xsCTAAHaE8?rs=1&pid=ImgDetMain',
    },
    name: 'CP Coated Wings',
    price: 79,
    mrp: 109,
    offer: 40,
    quantity: '1kg',
  },
  {
    id: 2,
    image: {
      uri: 'https://i.pinimg.com/736x/8a/7e/2f/8a7e2f62973d4a064b228644d2c8854f--chicken-fingers-crispy-chicken.jpg',
    },
    name: 'ITC CHI CHILLY GARLIC FINGER',
    price: 149,
    mrp: 199,
    offer: 40,
    quantity: '1kg',
  },
  {
    id: 3,
    image: {
        uri: 'https://i.pinimg.com/736x/8a/7e/2f/8a7e2f62973d4a064b228644d2c8854f--chicken-fingers-crispy-chicken.jpg',
      },
      name: 'ITC CHI CHILLY GARLIC FINGER',
      price: 99,
      mrp: 169,
      offer: 40,
      quantity: '1kg',
  },
  {
    id: 4,
    image: {
        uri: 'https://th.bing.com/th/id/OIP.dsi4VJp7QtiKZWH1xsCTAAHaE8?rs=1&pid=ImgDetMain',
      },
      name: 'ITC CHI CHILLY GARLIC FINGER',
      price: 199,
      mrp: 299,
      offer: 40,
      quantity: '1kg',
  },
  {
    id: 5,
    image: {
      uri: 'https://th.bing.com/th/id/OIP.dsi4VJp7QtiKZWH1xsCTAAHaE8?rs=1&pid=ImgDetMain',
    },
    name: 'CP Coated Wings',
    price: 399,
    mrp: 499,
    offer: 40,
    quantity: '1kg',
  },
  {
    id: 6,
    image: {
      uri: 'https://i.pinimg.com/736x/8a/7e/2f/8a7e2f62973d4a064b228644d2c8854f--chicken-fingers-crispy-chicken.jpg',
    },
    name: 'ITC CHI CHILLY GARLIC FINGER',
    price: 499,
    mrp: 299,
    offer: 40,
    quantity: '1kg',
  },
  {
    id: 7,
    image: {
        uri: 'https://i.pinimg.com/736x/8a/7e/2f/8a7e2f62973d4a064b228644d2c8854f--chicken-fingers-crispy-chicken.jpg',
      },
      name: 'ITC CHI CHILLY GARLIC FINGER',
      price: 199,
      mrp: 299,
      offer: 40,
      quantity: '1kg',
  },
  {
    id: 8,
    image: {
        uri: 'https://th.bing.com/th/id/OIP.dsi4VJp7QtiKZWH1xsCTAAHaE8?rs=1&pid=ImgDetMain',
      },
      name: 'ITC CHI CHILLY GARLIC FINGER',
      price: 99,
      mrp: 199,
      offer: 40,
      quantity: '1kg',
  },
];

const images = [
    'https://i.pinimg.com/originals/96/ec/33/96ec3353a3878e090d792ea850df8663.jpg',
    'https://th.bing.com/th/id/OIP.gcKRs0dyuc_dhQEKU3zhIQHaEW?rs=1&pid=ImgDetMain',
    'https://mir-s3-cdn-cf.behance.net/project_modules/fs/4bb228120705693.60b70f428bd19.jpg',
    'https://image.freepik.com/free-vector/new-collection-banner_190089-8.jpg',
    // require('./assets/images/girl.jpg'),
  ];


const ItemsList = ({navigation, route}) => {
  const {name} = route.params;
  const [isAdded, setIsAdded] = useState(false);

  const onPressAddToCart = () => {
    setIsAdded(true);
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
       
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
      <SliderBox
        images={images}
        sliderBoxHeight={200}
        onCurrentImagePressed={index => console.warn(`image ${index} pressed`)}
        dotColor="#FF4D00"
        inactiveDotColor="#cacaca"
        dotStyle={{
          width: 10,
          height: 10,
          borderRadius: 5,
          marginHorizontal: 0,
          padding: 0,
          marginTop: 0,
          top:40
        }}
        paginationBoxVerticalPadding={20}
        autoplay
        circleLoop
        ImageComponentStyle={{borderRadius: 12, width: '93%', marginTop: 5}}
      />

<Text style={styles.t1}>{name}</Text>


      <FlatList
        style={{alignSelf: 'center'}}
        data={list}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2}
        renderItem={({item}) => <Products item={item}   onPressAdd={() => onPressAddToCart(item.id)}/>}
      />
      </ScrollView>

{isAdded && (
        <View style={styles.cartButton} >
        <View>
        <Text style={styles.cartButtonText}>Your Order</Text>
          <Text style={styles.t3}>Total Price : ₹700</Text>
        </View>
        <TouchableOpacity style={{bottom:30, backgroundColor:"#342014", borderRadius:100, padding:5}} onPress={onCloseCart}>
        <AntDesign name="closecircleo" size={20} color={'#FFB400'} />
          </TouchableOpacity>
        <TouchableOpacity style={styles.button} 
        onPress={() => navigation.navigate("Cart")}
        >
        <Text style={styles.t4}>View Cart</Text>
        <AntDesign name="arrowright" size={20} color={'#FFB400'} />

        </TouchableOpacity>
         
         </View>
      )}
      
    </View>
  );
};

export default ItemsList;

const styles = StyleSheet.create({
  box1: {
    padding: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  t1: {
    color: 'black',
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    marginTop:40,
    marginHorizontal:16
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
    marginTop:3,
    marginRight:5
  },

  b1: {
    backgroundColor: 'white',
    width: Dimensions.get('window').width * 0.433,
    marginTop: 10,
    elevation: 10,
    borderRadius: 4,
    margin: 10,
    marginBottom:10
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
  t2: {
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

  add: {
    backgroundColor: '#FF4D00',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 6,
    marginLeft: 5,
  },
  cartButton:{
    backgroundColor:"#342014",
    width:Dimensions.get("window").width*1,
    alignSelf:"center",
   flexDirection:"row",
    justifyContent:"space-between",
    paddingVertical:5,
    paddingHorizontal:10,
    alignItems:"center"

  },
  cartButtonText:{
    color:"white",
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
  },
  button:{
    backgroundColor:"white",
    height: Dimensions.get('window').height * 0.05,
    width:Dimensions.get("window").width*0.33,
    alignItems:"center",
    borderRadius:20,
    flexDirection:"row",
    justifyContent:"center"
  }
});
