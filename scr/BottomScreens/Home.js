import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  RefreshControl,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {SliderBox} from 'react-native-image-slider-box';
import RecentlyViewed from '../HomePage/Cat';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import FiveMostPopular from '../HomePage/FiveMostPopular';
import FiveRecommanded from '../HomePage/FiveRecommanded';
import axios from 'axios';
import api from '../utills/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Home = () => {
  const navigation = useNavigation();
  const [bannerImages, setBannerImages] = useState([]);
  const [images, setImages] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
     getBanner();
     getAds();
     getPrice();
     checkCart();
    setRefreshing(false);
  };
  

  const getBanner = async () => {
    try {
      const response = await api.get(`banners/`);
      // console.log(response.data);
      const addPhotoUrls = response.data.map(
        img => `http://20.163.175.115/${img.add_photo}`,
      );
      // console.log('ddd', addPhotoUrls);
      setBannerImages(addPhotoUrls);
    } catch (error) {
      console.log(error);
    }
  };
  const getAds = async () => {
    try {
      const response = await api.get(`adds/`);
      // console.log("lol",response.data);
      setImages(response.data[0].add_photo)
    } catch (error) {
      console.log(error);
    }
  };

  const [uid, setUid] = useState('');
  useEffect(() => {
    getUid(), getPrice();
    checkCart();
    getBanner();
    getAds()
  }, []);

  const getUid = async () => {
    try {
      const value = await AsyncStorage.getItem('id');
      if (value !== null) {
        // console.log(value);
        setUid(value);
      }
    } catch (e) {
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
        product_id: productId.id,
        u_id: uid,
      });
      console.log('Product added to cart');
      setIsAdded(true);
      getPrice();
    } catch (error) {
      console.log('Error adding product to cart:', error);
    }
  };
  const onCloseCart = () => {
    setIsAdded(false);
  };

  useFocusEffect(
    useCallback(() => {
      getUid();
      getBanner();
      getAds();
      getPrice();
      checkCart();
    }, [])
  );

  return (
    <View style={{backgroundColor:"white", height:"100%"}}> 
      <ScrollView showsVerticalScrollIndicator={false}
      style={{backgroundColor: 'white'}}
       refreshControl={
    <RefreshControl
      refreshing={refreshing}
      onRefresh={onRefresh}
      colors={['#FF4D00']}
      tintColor={'#FF4D00'}
      progressBackgroundColor={'#fff'}
    />
  }
      >
        <View style={styles.top}>
          <Text style={styles.t1}>Are you Hungry?</Text>
          <MaterialIcons name="notifications-none" size={28} color={'#000'} onPress={()=>navigation.navigate("Notify")}/>
        </View>

        {/* <View style={styles.search}>
          <TextInput
            placeholder="Search"
            placeholderTextColor={'gray'}
            style={{
              color: 'black',
              width: Dimensions.get('window').width * 0.8,
            }}
          />
          <AntDesign name="search1" size={24} color={'black'}  style={{marginRight:20}}/>
        </View> */}

        <SliderBox
          images={bannerImages}
          sliderBoxHeight={200}
          onCurrentImagePressed={index =>
            console.warn(`image ${index} pressed`)
          }
          dotColor="#FF4D00"
          inactiveDotColor="#cacaca"
          dotStyle={{
            width: 10,
            height: 10,
            borderRadius: 5,
            marginHorizontal: 0,
            padding: 0,
            marginTop: 0,
            top: 40,
          }}
          paginationBoxVerticalPadding={20}
          autoplay
          circleLoop
          ImageComponentStyle={{borderRadius: 12, width: '93%', marginTop: 5}}
        />
        <View style={{marginHorizontal: 16, marginTop: 30}}>
          <RecentlyViewed />

          <View style={styles.b2}>
            <Text style={styles.t2}>Most Popular</Text>
            <TouchableOpacity
              style={styles.btn}
              onPress={() =>
                navigation.navigate('MostPopular', {name: 'Most Popular'})
              }>
              <Text style={styles.t4}>View all</Text>
              <AntDesign
                name="arrowright"
                size={20}
                color={'#FF4D00'}
                style={{marginLeft: 10}}
              />
            </TouchableOpacity>
          </View>
          <FiveMostPopular onPressAddToCart={onPressAddToCart} getTotalPrice={getPrice}/>
          

          <View style={styles.b1}>
            <View>
              <Text
                style={{
                  fontFamily: 'Poppins-Regular',
                  fontSize: 16,
                  color: 'white',
                }}>
                Deal of the day
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 10,
                }}>
                <MaterialCommunityIcons
                  name="alarm"
                  size={24}
                  color={'white'}
                />
                <Text style={styles.t3}>Order Before 07:00 PM</Text>
              </View>
            </View>
            <Image
              source={{
                uri: 'https://th.bing.com/th/id/R.ca9797c8141840a3c74661f84122428d?rik=jlRijYjlV%2fPXyw&riu=http%3a%2f%2fclipart-library.com%2fimage_gallery%2f175828.png&ehk=AySPEuwBJQxinH80SN3TiHXUMiuGTspsJy7xeKkMEn4%3d&risl=&pid=ImgRaw&r=0',
              }}
              style={{height:Dimensions.get("window").height*0.07, width:Dimensions.get("window").width*0.1}}
            />
            <TouchableOpacity
              style={styles.btn}
              onPress={() =>
                navigation.navigate('TodaysDeal', {name: 'Deal Of The Day'})
              }>
              <Text style={styles.t3}>View all</Text>
              <AntDesign
                name="arrowright"
                size={20}
                color={'white'}
                style={{marginLeft: 10}}
              />
            </TouchableOpacity>
          </View>

          <View style={{...styles.b2, marginTop:26}}>
            <Text style={styles.t2}>Recommanded</Text>
            <TouchableOpacity
              style={styles.btn}
              onPress={() =>
                navigation.navigate('Recommanded', {name: 'Recommanded'})
              }>
              <Text style={styles.t4}>View all</Text>
              <AntDesign
                name="arrowright"
                size={20}
                color={'#FF4D00'}
                style={{marginLeft: 10}}
              />
            </TouchableOpacity>
          </View>
          <FiveRecommanded onPressAddToCart={onPressAddToCart} getTotalPrice={getPrice}/>
        </View>

        <View style={{marginHorizontal: 16, marginVertical: 20}}>
          <View style={styles.imgBox}>
            <Image
              source={{uri:`http://20.163.175.115/`+ images}}
              style={styles.img}
            />
          </View>
        </View>

        <Text style={{marginVertical: 50}}></Text>
      </ScrollView>
      {isAdded && (
        <View style={styles.cartButton}>
          <View style={{width:Dimensions.get("window").width*0.4,}}>
            <Text style={styles.cartButtonText}>Your Order</Text>
            <Text ellipsizeMode='tail' numberOfLines={1} style={styles.t5}>Total Price : ₹{price}</Text>
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
          <View style={{width:Dimensions.get("window").width*0.4, alignItems:"flex-end"}}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.replace('Bottom',{screen:'Cart'})}>
            <Text style={styles.t6}>View Cart</Text>
            <AntDesign name="arrowright" size={20} color={'#FFB400'} />
          </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  top: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    padding: 16,
  },
  search: {
    backgroundColor: 'white',
    marginHorizontal: 16,
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 6,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#D7D6D6',
    justifyContent: 'space-between',
    marginTop: 10,
    marginBottom: 20,
  },
  t1: {
    fontSize: 28,
    fontFamily: 'Poppins-SemiBold',
        fontFamily: 'Poppins-SemiBold',

    color: '#FF4D00',
  },
  t2: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
        fontFamily: 'Poppins-SemiBold',

    color: '#000',
  },
  t3: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
        fontFamily: 'Poppins-Regular',

    color: '#fff',
    marginLeft: 5,
  },
  t4: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#FF4D00',
  },
  t5: {
    color: 'white',
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
  },
  t6: {
    color: '#FFB400',
    fontSize: 15,
    fontFamily: 'Poppins-SemiBold',
    marginTop: 3,
    marginRight: 5,
  },
  b1: {
    backgroundColor: '#FFB400',
    marginTop: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
    alignItems: 'center',
    borderRadius: 8,
    width:Dimensions.get("window").width*0.92,
  },
  b2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
    marginHorizontal:5
  },
  btn: {
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  imgBox: {
    width: Dimensions.get('window').width * 0.9,
    aspectRatio: 1,
    borderRadius: 12,
    marginTop: 10,
  },
  img: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
  },
  cartButton: {
    backgroundColor: '#342014',
    width: Dimensions.get('window').width * 1,
    bottom:Dimensions.get("window").height*0.07,
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
    paddingHorizontal: 10,
    alignItems: 'center',
    position: 'absolute',
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
