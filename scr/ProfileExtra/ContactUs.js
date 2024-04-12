import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import { WebView } from 'react-native-webview';

const ContactUs = () => {
  return (
    <WebView
      source={{uri: 'https://frozenwala.com/aboutus'}}
      style={{flex: 1, height: '100%', width: '100%'}}
    />
  );
};

export default ContactUs;

const styles = StyleSheet.create({});
