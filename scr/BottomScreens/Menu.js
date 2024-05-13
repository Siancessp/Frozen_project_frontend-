import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Dimensions,
  FlatList,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import api from '../utills/api';

const MenuItems = ({item}) => {
  const navigation = useNavigation();
  return (
    <View style={{marginTop: 10, marginBottom: 10}}>
      <TouchableOpacity
        style={styles.b1}
        onPress={() =>
          navigation.navigate('ItemsPage', {
            name: item.name,
            categoryId: item.id,
          })
        }>
        <Image
          source={{uri: `http://20.163.175.115/${item.image}`}}
          style={styles.image}
        />
        <Text style={styles.name} numberOfLines={2}>
          {item.name}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const Menu = ({navigation}) => {
  const [getCategory, setGetCategory] = useState([]);

  useEffect(() => {
    getMenu();
  }, []);

  const getMenu = async () => {
    // Accept the token as a parameter
    try {
      const response = await api.get(`categories/`);
      // console.log('Response:', response.data);
      setGetCategory(response.data);
    } catch (error) {
      console.error('Error fetching menu:', error);
    }
  };

  return (
    <ScrollView
      style={{
        height: Dimensions.get('window').height,
        backgroundColor: 'white',
        paddingHorizontal:16
      }}>
      <View style={styles.box1}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name="left" size={22} color="black" />
        </TouchableOpacity>
        <Text style={styles.t1}>All Menu</Text>
        <MaterialIcons name="notifications-none" size={28} color={'#000'} onPress={()=>navigation.navigate("Notify")}/>
      </View>
      <FlatList
      showsVerticalScrollIndicator={false}
        data={getCategory}
        keyExtractor={(item, index) => index.toString()}
        numColumns={3}
        renderItem={({item}) => <MenuItems item={item} />}
      />
      <View style={{marginBottom:Dimensions.get("window").height*0.13}}/>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  box1: {
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  t1: {
    fontSize: 22,
    fontFamily: 'Poppins-SemiBold',
    color: 'black',
  },
  image: {
    width: '100%',
    height: Dimensions.get('window').height * 0.12,
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
  },
  name: {
    color: 'black',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    margin: 5,
  },
  b1: {
    marginTop: 10,
    width: Dimensions.get('window').width * 0.275,
    height: Dimensions.get('window').height * 0.19,
    elevation: 10,
    borderRadius: 8,
    backgroundColor: 'white',
    marginRight: 14,
  },
});

export default Menu;
