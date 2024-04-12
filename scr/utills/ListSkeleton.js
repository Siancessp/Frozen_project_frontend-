import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, Animated } from 'react-native';

const ListSkeleton = () => {
  const translateX = useRef(new Animated.Value(-Dimensions.get('window').width)).current;

  useEffect(() => {
    const shimmerAnimation = Animated.loop(
      Animated.timing(translateX, {
        toValue: Dimensions.get('window').width,
        duration: 1000,
        useNativeDriver: true,
      })
    );
    shimmerAnimation.start();

    return () => {
      shimmerAnimation.stop();
    };
  }, [translateX]);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.skeletonBlock, { transform: [{ translateX }] }]} />
      <Animated.View style={[styles.skeletonBlock, { transform: [{ translateX }] }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  skeletonBlock: {
    height: 60,
    width: '45%',
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
    marginBottom: 5,
  },
});

export default ListSkeleton;
