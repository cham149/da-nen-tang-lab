import React from 'react';
import { View, Text, StyleSheet, Image, Linking, TouchableOpacity } from 'react-native';

export default function App() {
  const openURL = (url) => {
    Linking.openURL(url);
  };

  return (
    <View style={styles.container}>
      <Image 
        source={{uri: 'https://i.pinimg.com/474x/cd/8b/be/cd8bbe5ac710221e3487ca37f6df4b43.jpg'}}
        style={styles.avatar}
      />
      
      <Text style={styles.name}>cham cham</Text>
      <Text style={styles.title}>Mobile Developer</Text>
      
      <View style={styles.infoSection}>
        <TouchableOpacity 
          style={styles.contactItem}
          onPress={() => openURL('tel:+84123456789')}
        >
          <Text style={styles.contactText}>+84 123 456 789</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.contactItem}
          onPress={() => openURL('mailto:cham@example.com')}
        >
          <Text style={styles.contactText}>cham@example.com</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.contactItem}
          onPress={() => openURL('https://github.com')}
        >
          <Text style={styles.contactText}>github.com/cham</Text>
        </TouchableOpacity>
        
        <View style={styles.contactItem}>
          <Text style={styles.contactText}>Công ty Tech Solutions</Text>
        </View>
      </View>

      {/* Kỹ năng */}
      <View style={styles.skillsSection}>
        <Text style={styles.sectionTitle}>Kỹ Năng</Text>
        <View style={styles.skillsContainer}>
          <Text style={styles.skill}>React Native</Text>
          <Text style={styles.skill}>JavaScript</Text>
          <Text style={styles.skill}>TypeScript</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2C3E50',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 30,
    borderWidth: 4,
    borderColor: '#3498DB',
  },
  name: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    color: '#3498DB',
    marginBottom: 40,
    fontWeight: '600',
  },
  infoSection: {
    width: '100%',
    backgroundColor: '#34495E',
    padding: 20,
    borderRadius: 15,
    marginBottom: 30,
  },
  contactItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#4A6572',
  },
  contactText: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
  },
  skillsSection: {
    width: '100%',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#3498DB',
    marginBottom: 15,
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  skill: {
    backgroundColor: '#3498DB',
    color: 'white',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    margin: 5,
    fontSize: 14,
    fontWeight: '600',
  },
});