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
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
import api from '../utills/api';

const RecentlyViewed = () => {
  const navigation = useNavigation();
  const [getCategory, setGetCategory] = useState([]);

  useEffect(() => {
    getMenu();
  }, []);

  const getMenu = async () => {
    try {
      const response = await api.get(`five/categories/`);
      setGetCategory(response.data);
    } catch (error) {
      console.error('Error fetching menu:', error);
    }
  };
  return (
    <ScrollView
      horizontal
      style={{marginTop: 10}}
      showsHorizontalScrollIndicator={false}>
      {getCategory.map(catItem => (
        <TouchableOpacity
          style={styles.box}
          onPress={() =>
            navigation.navigate('ItemsPage', {
              name: catItem.name,
              categoryId: catItem.id,
            })
          }>
          <View style={styles.b1}>
            <Image
              source={{uri: `http://20.163.175.115/${catItem.image}`}}
              style={styles.img}
            />
          </View>
          <Text style={styles.text} numberOfLines={2}>
            {catItem.name}
          </Text>
        </TouchableOpacity>
      ))}
      <TouchableOpacity style={{...styles.box, justifyContent: 'center'}} onPress={()=>navigation.navigate("Bottom",{screen:"Menu"})}>
        <Text style={styles.text} numberOfLines={2}>
          View All
        </Text>
        <AntDesign
          name="arrowright"
          size={20}
          color={'white'}
          style={{marginLeft: 5}}
        />
      </TouchableOpacity>
    </ScrollView>
  );
};

export default RecentlyViewed;

const styles = StyleSheet.create({
  box: {
    flexDirection: 'row',
    backgroundColor: '#FF8100',
    marginHorizontal: 8,
    alignItems: 'center',
    padding: 5,
    // width:Dimensions.get("window").width*0.34,
    width: 130,
    height: 55,
    borderRadius: 100,
    marginVertical: 10,
  },
  b1: {
    width: Dimensions.get('window').width * 0.12,
    aspectRatio: 1,
    backgroundColor: 'white',
    padding: 3,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  img: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 100,
  },
  text: {
    fontSize: 12,
    color: 'white',
    fontFamily: 'Poppins-SemiBold',
    paddingHorizontal: 5,
    width: Dimensions.get('window').width * 0.18,
  },
});
