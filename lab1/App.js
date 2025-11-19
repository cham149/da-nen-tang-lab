import React from 'react';
import { View, Text, StyleSheet, Image, StatusBar } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#000" barStyle="light-content" />
      
      {/* Tiêu đề chính */}
      <Text style={styles.title}>I Am Rich</Text>
      <Text style={styles.diamond}>💎</Text>
      
      <Image 
        source={{uri: 'https://i.pinimg.com/1200x/36/93/a5/3693a5ab5a51f57506a459eec22c92a4.jpg'}}
        style={styles.image}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 20,
    textAlign: 'center',
    textShadowColor: 'rgba(255, 215, 0, 0.5)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 10,
  },
  diamond: {
    fontSize: 100,
    marginBottom: 30,
  },
  image: {
    width: 200,
    height: 300,
    marginBottom: 30,
    borderRadius: 20,
    borderWidth: 3,
    borderColor: '#FFD700',
  },
});