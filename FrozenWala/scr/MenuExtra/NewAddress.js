import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    ScrollView,
    Alert,
    ToastAndroid,
    Dimensions,
  } from 'react-native';
  import React, {useEffect, useState} from 'react';
  import AntDesign from 'react-native-vector-icons/AntDesign';
  
  const NewAddress = ({navigation, route}) => {
  
  
   
    return (
      <View style={{backgroundColor: 'white', height: '100%'}}>
        <View style={styles.head}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <AntDesign name="left" size={22} color="black" />
          </TouchableOpacity>
          <Text style={styles.t1}>Add New Address</Text>
          <Text style={styles.t1}></Text>
        </View>
        <ScrollView>
          <View style={styles.container}>
            <TextInput
              style={styles.input} placeholderTextColor={"#4B564D"} placeholder='Full name'
              
            />
           
            <TextInput
              style={styles.input} placeholderTextColor={"#4B564D"} placeholder='Phone Number'
              keyboardType="numeric"
              
            />
  
            <TextInput
              style={styles.input} placeholderTextColor={"#4B564D"} placeholder='Address'
             
            />
            <TextInput style={styles.input} placeholderTextColor={"#4B564D"} placeholder='City'  />
  
            <TextInput
              style={styles.input} placeholderTextColor={"#4B564D"} placeholder='tate/Province/Region'
             
            />
  
            <TextInput
              style={styles.input} placeholderTextColor={"#4B564D"} placeholder='Country'
             
            />
  
            <TextInput
              style={styles.input} placeholderTextColor={"#4B564D"} placeholder='Zip-Code'
            />
  
            
          </View>
        </ScrollView>
        <TouchableOpacity style={styles.button} >
              <Text style={styles.buttonText}>SAVE ADDRESS</Text>
            </TouchableOpacity>
      </View>
    );
  };
  
  export default NewAddress;
  
  const styles = StyleSheet.create({
    head: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 10,
      justifyContent: 'space-between',
    },
    t1: {
      fontSize: 20,
      fontWeight: 'bold',
      color:"black"
    },
    container: {
      padding: 20,
    },
    label: {
      fontSize: 16,
      marginBottom: 5,
      color:"black"
    },
    input: {
      borderWidth: 1,
      borderColor: '#D7D6D6',
      padding: 8,
      paddingHorizontal:15,
      marginBottom: 20,
      borderRadius: 30,
      color:"black",
   fontFamily: 'Poppins-Regular'

    },
    button: {
        backgroundColor:"white",
        borderRadius: 50,
        width: Dimensions.get('window').width * 0.7,
        alignSelf: 'center',
        elevation: 10,
        position: 'absolute',
        bottom: 10,
        height: 52,
        justifyContent: 'center',
        borderWidth:1,
        borderColor:"#C620E3"
      },
    
      buttonText: {
        textAlign: 'center',
        color: '#C620E3',
        fontSize: 18,
        fontFamily: 'Poppins-SemiBold',
      },
  });
  