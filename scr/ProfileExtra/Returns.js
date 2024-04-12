import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import WebView from 'react-native-webview'

const Returns = () => {
  return (
    <WebView source={{ uri: 'https://frozenwala.com/refund' }} style={{ flex: 1, height:'100%', width:'100%' }}/>

  )
}

export default Returns

const styles = StyleSheet.create({})