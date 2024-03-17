import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import Nav from './scr/Navigations/Nav'

const App = () => {
  return (
    <NavigationContainer>
    <Nav />
  </NavigationContainer>
  )
}

export default App

const styles = StyleSheet.create({})