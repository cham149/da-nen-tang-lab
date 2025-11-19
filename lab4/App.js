import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  StatusBar,
  Vibration,
  Animated,
  Easing
} from 'react-native';
import * as Haptics from 'expo-haptics';

export default function App() {
  const [answer, setAnswer] = useState('Ask me anything');
  const [shaking, setShaking] = useState(false);
  const [scaleAnim] = useState(new Animated.Value(1));
  const [rotateAnim] = useState(new Animated.Value(0));

  const answers = [
    'It is certain',
    'It is decidedly so',
    'Without a doubt ',
    'Yes definitely ',
    'You may rely on it ',
    'As I see it, yes ',
    'Most likely ',
    'Outlook good ',
    'Yes ',
    'Signs point to yes ',
    'Reply hazy try again ',
    'Ask again later ',
    'Better not tell you now ',
    'Cannot predict now ',
    'Concentrate and ask again ',
    'Don\'t count on it ',
    'My reply is no ',
    'My sources say no ',
    'Outlook not so good ',
    'Very doubtful '
  ];

  const shakeBall = () => {
    if (shaking) return;
    
    setShaking(true);
    setAnswer('Thinking...');
    
    // Hiệu ứng rung và haptic
    Vibration.vibrate(500);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);

    // Hiệu ứng lắc
    Animated.sequence([
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 200,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      Animated.timing(rotateAnim, {
        toValue: -1,
        duration: 200,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 200,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      Animated.timing(rotateAnim, {
        toValue: -1,
        duration: 200,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      Animated.timing(rotateAnim, {
        toValue: 0,
        duration: 200,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ]).start();

    // Hiệu ứng scale
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.1,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();

    // Hiển thị kết quả sau 2 giây
    setTimeout(() => {
      const randomAnswer = answers[Math.floor(Math.random() * answers.length)];
      setAnswer(randomAnswer);
      setShaking(false);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }, 2000);
  };

  const rotateInterpolate = rotateAnim.interpolate({
    inputRange: [-1, 1],
    outputRange: ['-10deg', '10deg']
  });

  const animatedStyle = {
    transform: [
      { scale: scaleAnim },
      { rotate: rotateInterpolate }
    ]
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#1A1A2E" barStyle="light-content" />
      
      <Text style={styles.title}>Magic 8 Ball</Text>
      <Text style={styles.subtitle}>Ask a question and shake</Text>
      
      <Animated.View style={[styles.ball, animatedStyle]}>
        <View style={styles.innerCircle}>
          <Text style={styles.answer}>{answer}</Text>
        </View>
        <Text style={styles.number8}>8</Text>
      </Animated.View>

      <TouchableOpacity 
        style={[styles.button, shaking && styles.buttonDisabled]} 
        onPress={shakeBall}
        disabled={shaking}
      >
        <Text style={styles.buttonText}>
          {shaking ? 'Shaking...' : 'Shake Ball '}
        </Text>
      </TouchableOpacity>

      <Text style={styles.tip}>
        Think of a question and tap the ball!
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
    fontSize: 36,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#E6E6E6',
    marginBottom: 50,
  },
  ball: {
    width: 250,
    height: 250,
    borderRadius: 125,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 50,
    borderWidth: 8,
    borderColor: '#333',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 15,
    position: 'relative',
  },
  innerCircle: {
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: '#0D47A1',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  answer: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    lineHeight: 20,
  },
  number8: {
    position: 'absolute',
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
    bottom: 20,
  },
  button: {
    backgroundColor: '#E94560',
    paddingHorizontal: 40,
    paddingVertical: 18,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  buttonDisabled: {
    backgroundColor: '#666',
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  tip: {
    marginTop: 30,
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
    fontStyle: 'italic',
  },
});