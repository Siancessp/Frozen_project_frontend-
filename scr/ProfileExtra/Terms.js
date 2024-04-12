import { View, Text } from 'react-native'
import React from 'react'
import WebView from 'react-native-webview'

const Terms = () => {
  return (
    <WebView source={{ uri: 'https://frozenwala.com/terms' }} style={{ flex: 1, height:'100%', width:'100%' }}/>

  )
}

export default Terms