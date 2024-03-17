import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {SliderBox} from 'react-native-image-slider-box';
import TopDeals from '../HomePage/DealOfDay/TopDeals';
import RecentlyViewed from '../HomePage/Cat';
import {useNavigation} from '@react-navigation/native';

const Home = () => {
  const navigation = useNavigation();

  

  const images = [
    'https://i.pinimg.com/originals/96/ec/33/96ec3353a3878e090d792ea850df8663.jpg',
    'https://th.bing.com/th/id/OIP.gcKRs0dyuc_dhQEKU3zhIQHaEW?rs=1&pid=ImgDetMain',
    'https://mir-s3-cdn-cf.behance.net/project_modules/fs/4bb228120705693.60b70f428bd19.jpg',
    'https://image.freepik.com/free-vector/new-collection-banner_190089-8.jpg',
    // require('./assets/images/girl.jpg'),
  ];

  const [isAdded, setIsAdded] = useState(false);

  const onPressAddToCart = () => {
    setIsAdded(true);
  };
  const onCloseCart = () => {
    setIsAdded(false);
  };

  return (
    <View>
    <ScrollView style={{backgroundColor: 'white'}}>
      <View style={styles.top}>
        <Text style={styles.t1}>Are you Hungry?</Text>
        <AntDesign name="bells" size={24} color={'#000'} />
      </View>

      <View style={styles.search}>
        <TextInput
          placeholder="Search"
          placeholderTextColor={'gray'}
          style={{color: 'black', width: Dimensions.get('window').width * 0.8}}
        />
        <AntDesign name="search1" size={24} color={'black'} />
      </View>

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
              navigation.navigate('ItemsPage', {name: 'Most Popular'})
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
        <TopDeals onPressAddToCart={onPressAddToCart}/>

       
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
              <MaterialCommunityIcons name="alarm" size={24} color={'white'} />
              <Text style={styles.t3}>22h 02m 06s remaining</Text>
            </View>
          </View>
          <Image
            source={{
              uri: 'https://th.bing.com/th/id/R.ca9797c8141840a3c74661f84122428d?rik=jlRijYjlV%2fPXyw&riu=http%3a%2f%2fclipart-library.com%2fimage_gallery%2f175828.png&ehk=AySPEuwBJQxinH80SN3TiHXUMiuGTspsJy7xeKkMEn4%3d&risl=&pid=ImgRaw&r=0',
            }}
            style={{height: 55, width: 50}}
          />
          <TouchableOpacity
            style={styles.btn}
            onPress={() =>
              navigation.navigate('ItemsPage', {name: 'Deal Of The Day'})
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

        <View style={styles.b2}>
          <Text style={styles.t2}>Recommanded</Text>
          <TouchableOpacity
            style={styles.btn}
            onPress={() =>
              navigation.navigate('ItemsPage', {name: 'Recommanded'})
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
        <TopDeals onPressAddToCart={onPressAddToCart}/>
      
      </View>

      <View style={{marginHorizontal: 16, marginVertical: 20}}>
        <View style={styles.imgBox}>
          <Image source={require('../../assets/cute.jpg')} style={styles.img} />
        </View>
      </View>

      <Text style={{marginVertical: 50}}></Text>


    </ScrollView>
    {isAdded && (
        <View style={styles.cartButton} >
        <View>
        <Text style={styles.cartButtonText}>Your Order</Text>
          <Text style={styles.t5}>Total Price : ₹700</Text>
        </View>
        <TouchableOpacity style={{bottom:30, backgroundColor:"#342014", borderRadius:100, padding:5}} onPress={onCloseCart}>
        <AntDesign name="closecircleo" size={20} color={'#FFB400'} />
          </TouchableOpacity>
        <TouchableOpacity style={styles.button} 
        onPress={() => navigation.navigate("Cart")}
        >
        <Text style={styles.t6}>View Cart</Text>
        <AntDesign name="arrowright" size={20} color={'#FFB400'} />

        </TouchableOpacity>
         
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
    fontWeight: '600',
    color: '#FF4D00',
  },
  t2: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    fontWeight: '600',
    color: '#000',
    marginLeft: 5,
  },
  t3: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    fontWeight: '400',
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
    marginTop:3,
    marginRight:5
  },
  b1: {
    backgroundColor: '#FFB400',
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
    alignItems: 'center',
    borderRadius: 8,
  },
  b2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  btn: {
    borderWidth: 1,
    borderColor: 'white',
    paddingHorizontal: 6,
    paddingVertical: 6,
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
  cartButton:{
    backgroundColor:"#342014",
    width:Dimensions.get("window").width*1,
    top:Dimensions.get('window').height * 0.821,
    alignSelf:"center",
   flexDirection:"row",
    justifyContent:"space-between",
    paddingVertical:5,
    paddingHorizontal:10,
    alignItems:"center",
    position:"absolute"

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
