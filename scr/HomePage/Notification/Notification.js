import { ImageBackground, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Notification = () => {
  return (
    <View>
      <ImageBackground source={require("../../../assets/Notification.png")} style={{height:"100%"}}/>
    </View>
  )
}

export default Notification

const styles = StyleSheet.create({})