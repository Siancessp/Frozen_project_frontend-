import { View, Text } from 'react-native'
import React from 'react'
import WebView from 'react-native-webview'

const PrivacyPolicy = () => {
  return (
    <WebView source={{ uri: 'https://frozenwala.com/privacy_policy' }} style={{ flex: 1, height:'100%', width:'100%' }}/>
  )
}

export default PrivacyPolicy
