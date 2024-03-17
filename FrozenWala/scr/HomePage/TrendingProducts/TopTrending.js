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
  
  const TopTrending = () => {
    const view = [
      {
        id: 1,
        image: {
          uri: 'https://product-demo.studiowombat.com/wp-content/uploads/2020/07/shirt-white-1.jpg',
        },
        name: 'Tshirt',
        description: 'Neque porro quisquam est qui dolorem ipsum quia',
        price: 7999,
        mrp: 10999,
        offer: 40,
        rating: 666,
      },
      {
        id: 2,
        image: {
          uri: 'https://www.ceat.com/content/dam/ceat/product-images/scooter/zoom-d/sku_60.png',
        },
        name: 'Tyre',
        description: 'Neque porro quisquam est qui dolorem ipsum quia',
        price: 7999,
        mrp: 10999,
        offer: 40,
        rating: 666,
      },
      {
        id: 3,
        image: {
          uri: 'https://www.ceat.com/content/dam/ceat/product-images/scooter/zoom-d/sku_60.png',
        },
        name: 'Tyre',
        description: 'Neque porro quisquam est qui dolorem ipsum quia',
        price: 7999,
        mrp: 10999,
        offer: 40,
        rating: 666,
      },
      {
        id: 4,
        image: {
          uri: 'https://www.ceat.com/content/dam/ceat/product-images/scooter/zoom-d/sku_60.png',
        },
        name: 'Tyre',
        description: 'Neque porro quisquam est qui dolorem ipsum quia',
        price: 7999,
        mrp: 10999,
        offer: 40,
        rating: 666,
      },
    ];
    return (
      <ScrollView
        horizontal
        style={{marginTop: 10}}
        showsHorizontalScrollIndicator={false}>
        {view.map(items => (
          <TouchableOpacity style={styles.b1}>
            <Image source={items.image} style={styles.img} />
  
            <Text style={styles.text}>{items.name}</Text>
            <Text style={styles.text4}>₹{items.price}</Text>
            <View style={{flexDirection:"row"}}>
            <Text style={styles.text2}>₹{items.mrp}</Text>
            <Text style={styles.text3}>{items.offer}% Off</Text>
            </View>
            
          </TouchableOpacity>
        ))}
      </ScrollView>
    );
  };
  export default TopTrending;
  
  const styles = StyleSheet.create({
    b1: {
      backgroundColor: 'white',
      width:142,
      marginTop: 10,
      elevation: 5,
      borderRadius: 4,
      margin: 10,
    },
    img: {
     width:142,
     height:100,
     
      borderTopRightRadius: 4,
      borderTopLeftRadius: 4,
    },
    text: {
      color: 'black',
      fontWeight: '400',
      fontSize: 16,
      margin: 5,
    },
    text1: {
      color: 'black',
      fontWeight: '400',
      fontSize: 12,
      marginHorizontal: 5,
    },
    text2: {
      color: 'gray',
      fontWeight: '400',
      fontSize: 15,
      marginHorizontal: 5,
      textDecorationLine:"line-through"
  
    },
    text3: {
      color: 'red',
      fontWeight: '400',
      fontSize: 15,
      marginHorizontal: 5,
  
    },
    text4: {
      color: 'black',
      fontWeight: '600',
      fontSize: 15,
      marginHorizontal: 5,
  
    },
  });
  