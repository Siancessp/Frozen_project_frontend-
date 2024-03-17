import { Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';

const RecentlyViewed = () => {
    const navigation =useNavigation()
    const view =[
        {
            id :1,
            image: {
                uri: 'https://trendinnepal.com/wp-content/uploads/2022/07/Momos-with-achar.jpg',
              },
            name:"Momo (Steam & Fried)"
        },
        {
            id :2,
            image: {
                uri: 'https://www.ceat.com/content/dam/ceat/product-images/scooter/zoom-d/sku_60.png',
              },
            name:"Tyre"
        },
        {
            id :3,
            image: {
                uri: 'https://www.ceat.com/content/dam/ceat/product-images/scooter/zoom-d/sku_60.png',
              },
            name:"Tyre"
        },
        {
            id :4,
            image: {
                uri: 'https://www.ceat.com/content/dam/ceat/product-images/scooter/zoom-d/sku_60.png',
              },
            name:"Tyre"
        }
    ]
  return (
    <ScrollView horizontal style={{marginTop:10 }} showsHorizontalScrollIndicator={false}>
        {view.map(items => (
            <TouchableOpacity style={styles.box} onPress={()=> navigation.navigate("ItemsPage",{name:items.name})}>
            <View style={styles.b1}>
            <Image source={items.image} style={styles.img}/>
            
            </View> 
            <Text style={styles.text} numberOfLines={2}>{items.name}</Text>
            </TouchableOpacity>
        ))}
        <TouchableOpacity style={{...styles.box, justifyContent:"center"}}>
            <Text style={styles.text} numberOfLines={2}>View All</Text>
            <AntDesign
              name="arrowright"
              size={20}
              color={'white'}
              style={{marginLeft: 5}}
            />
            </TouchableOpacity>
    </ScrollView>
  )
}

export default RecentlyViewed

const styles = StyleSheet.create({
    box:{
        flexDirection:"row",
        elevation:10,
        backgroundColor:"#FF8100",
        marginHorizontal:8,
        alignItems:"center",
        padding:5,
        // width:Dimensions.get("window").width*0.34,
        width:130,
        height:52,
        borderRadius:100, 
        marginVertical:10
        
    },
    b1:{
        width:Dimensions.get("window").width*0.12,
        aspectRatio:1,
        backgroundColor:"white",
        padding:3,
        borderRadius:100,
        alignItems:"center",
        justifyContent:"center"
    },
    img:{
        width:"100%",
        aspectRatio:1,
        borderRadius:100,
        
    },
    text:{
        fontSize:12,
        color:"white",
        fontFamily: 'Poppins-SemiBold',
        paddingHorizontal:5,
        width:Dimensions.get("window").width*0.18,

    }
})