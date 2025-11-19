import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  StatusBar,
  Vibration 
} from 'react-native';
import * as Haptics from 'expo-haptics';

export default function App() {
  const [leftDice, setLeftDice] = useState(1);
  const [rightDice, setRightDice] = useState(1);
  const [rolling, setRolling] = useState(false);

  const rollDice = () => {
    if (rolling) return;
    
    setRolling(true);
    
    // Hiệu ứng rung và haptic feedback
    Vibration.vibrate(100);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

    // Tạo hiệu ứng xúc xắc lăn
    let rolls = 0;
    const rollInterval = setInterval(() => {
      setLeftDice(Math.floor(Math.random() * 6) + 1);
      setRightDice(Math.floor(Math.random() * 6) + 1);
      rolls++;
      
      if (rolls > 10) {
        clearInterval(rollInterval);
        setRolling(false);
        
        // Kết quả cuối cùng
        const finalLeft = Math.floor(Math.random() * 6) + 1;
        const finalRight = Math.floor(Math.random() * 6) + 1;
        setLeftDice(finalLeft);
        setRightDice(finalRight);
        
        // Haptic feedback khi dừng
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      }
    }, 100);
  };

  const getDiceEmoji = (number) => {
    const diceEmojis = ['⚀', '⚁', '⚂', '⚃', '⚄', '⚅'];
    return diceEmojis[number - 1];
  };

  const getDiceColor = (number) => {
    const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD'];
    return colors[number - 1];
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#1A1A2E" barStyle="light-content" />
      
      <Text style={styles.title}>Dicee 🎲</Text>
      <Text style={styles.subtitle}>Tap to roll the dice!</Text>
      
      <View style={styles.diceContainer}>
        <View style={[styles.dice, { backgroundColor: getDiceColor(leftDice) }]}>
          <Text style={styles.diceText}>{getDiceEmoji(leftDice)}</Text>
        </View>
        <View style={[styles.dice, { backgroundColor: getDiceColor(rightDice) }]}>
          <Text style={styles.diceText}>{getDiceEmoji(rightDice)}</Text>
        </View>
      </View>

      <Text style={styles.total}>
        Total: {leftDice + rightDice}
      </Text>

      <TouchableOpacity 
        style={[styles.button, rolling && styles.buttonDisabled]} 
        onPress={rollDice}
        disabled={rolling}
      >
        <Text style={styles.buttonText}>
          {rolling ? 'Rolling...' : 'Roll Dice 🎲'}
        </Text>
      </TouchableOpacity>

      <Text style={styles.history}>
        {leftDice} + {rightDice} = {leftDice + rightDice}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1A2E',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#E6E6E6',
    marginBottom: 50,
  },
  diceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 280,
    marginBottom: 40,
  },
  dice: {
    width: 120,
    height: 120,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  diceText: {
    fontSize: 60,
  },
  total: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#4ECDC4',
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#FF6B6B',
    paddingHorizontal: 50,
    paddingVertical: 18,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  buttonDisabled: {
    backgroundColor: '#CCCCCC',
  },
  buttonText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
  },
  history: {
    marginTop: 30,
    fontSize: 16,
    color: '#888',
    fontStyle: 'italic',
  },
});