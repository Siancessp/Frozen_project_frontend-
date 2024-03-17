import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Dimensions,
  ImageBackground,
} from 'react-native';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';

const MenuItems = ({item}) => {
  const navigation = useNavigation();
  return (
    <View style={{marginTop:10}}>
      <TouchableOpacity
        style={styles.b1}
        onPress={() => navigation.navigate('ItemsPage', {name: item.name})}>
        <Image
          source={item.image}
          style={styles.image}
          />
        <Text style={styles.name} numberOfLines={2}>{item.name}</Text>
      </TouchableOpacity>
    </View>
  );
};

const Menu = ({navigation}) => {
  const list = [
    {
      id: 1,
      image: {
        uri: 'https://trendinnepal.com/wp-content/uploads/2022/07/Momos-with-achar.jpg',
      },
      name: 'Momo (Steam & Fried)',
    },
    {
      id: 2,
      image: {
        uri: 'https://frozenwala.com/wp-content/uploads/2022/04/1.1.jpg',
      },
      name: 'Thinglish (NonVeg)',
    },
    {
      id: 3,
      image: {
        uri:'https://th.bing.com/th/id/OIP.oolhud_aVv4sDyZXHn-dQwHaGC?rs=1&pid=ImgDetMain'
        
    },
      name: 'CP Food (NonVeg)33',
    },
    {
      id: 4,
      image: {
        uri: 'https://media1.thehungryjpeg.com/thumbs2/ori_111291_19d3edc4397c3a56f83dd4466a5d37a34233bf1f_guitar-mockup.jpg',
      },
      name: 'Music',
    },
    {
      id: 5,
      image: {
        uri: 'https://th.bing.com/th/id/OIP.KtOgqfMAYRU9V1zuEz_RoAHaE8?rs=1&pid=ImgDetMain',
      },
      name: 'Beauty Grooming',
    },
    {
      id: 6,
      image: {
        uri: 'https://th.bing.com/th/id/OIP.WXx5dlWGz429uIEd-jJG7QHaFu?rs=1&pid=ImgDetMain',
      },
      name: 'Watches',
    },
    {
      id: 7,
      image: {
        uri: 'https://i.pinimg.com/736x/8d/ce/6c/8dce6c38de5cb1e175db397692df24f5.jpg',
      },
      name: 'Phones',
    },
    {
      id: 8,
      image: {
        uri: 'https://www.templateupdates.com/sites/default/files/inline-images/Downloadable%20Shoe%20Box%20Mock-up.jpg',
      },
      name: 'Shoes',
    },
  ];

  return (
    <View
      style={{
        height: Dimensions.get('window').height,
        backgroundColor: 'white',
      }}>
      <View style={styles.box1}>
      <Text></Text>
        <Text style={styles.t1}>All Menu</Text>
    <AntDesign name="bells" size={24} color={'#000'} />

      </View>
      <ScrollView contentContainerStyle={{alignItems: 'center'}}>
        <FlatList
          data={list}
          keyExtractor={(item, index) => index.toString()}
          numColumns={3}
          renderItem={({item}) => <MenuItems item={item} />}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  box1: {
    padding: 10,
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:"center"
  },
  t1: {
    fontSize: 22,
    fontFamily: 'Poppins-SemiBold',
    color: 'black',
  },

  image: {
    width: '100%',
    height: Dimensions.get('window').height* 0.17,
    // height: 130,
    borderRadius:4
  },

  name: {
    color: 'black',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    margin: 5,
  },

  b1: {
    marginTop: 10,
    width: Dimensions.get('window').width * 0.27,
    elevation: 10,
    borderRadius: 6,
    marginHorizontal: 10,
    backgroundColor:"white",
    alignItems:"center",
  },
});

export default Menu;
