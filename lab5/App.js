import React from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  StatusBar,
  Vibration 
} from 'react-native';
import { Audio } from 'expo-av';

// 📌 Mapping file local
const soundFiles = {
  C: require('./assets/censor-beep-01.mp3'),
  D: require('./assets/censor-beep-2.mp3'),
  E: require('./assets/censor-beep-3.mp3'),
  F: require('./assets/censor-beep-4.mp3'),
};

export default function App() {

  const playSound = async (note) => {
    try {
      Vibration.vibrate(50);

      const soundObject = new Audio.Sound();

      // 📌 Load file local từ require()
      await soundObject.loadAsync(soundFiles[note]);
      await soundObject.playAsync();

      // unload sau khi phát
      setTimeout(() => {
        soundObject.unloadAsync();
      }, 800);

    } catch (error) {
      console.log('Error playing sound:', error);
    }
  };

  const notes = [
    { note: 'C', color: '#792828ff', sound: 'do', width: 320 },
    { note: 'D', color: '#FF8E6B', sound: 're', width: 300 },
    { note: 'E', color: '#FFB16B', sound: 'mi', width: 280 },
    { note: 'F', color: '#4ECDC4', sound: 'fa', width: 260 },
  ];

  const playScale = () => {
    notes.forEach((item, i) => {
      setTimeout(() => playSound(item.note), i * 300);
    });
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#1A1A2E" barStyle="light-content" />

      <Text style={styles.title}>Xylophone 🎵</Text>
      <Text style={styles.subtitle}>Tap the keys to play music</Text>

      <View style={styles.xylophone}>
        {notes.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.key,
              { 
                backgroundColor: item.color,
                width: item.width,
                height: 300 - (index * 30)
              }
            ]}
            onPress={() => playSound(item.note)}
            activeOpacity={0.7}
          >
            <Text style={styles.noteText}>{item.note}</Text>
            <Text style={styles.noteLabel}>{item.sound}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.playButton} onPress={playScale}>
        <Text style={styles.playButtonText}>Play Scale 🎶</Text>
      </TouchableOpacity>

      <Text style={styles.instruction}>
        👆 Tap individual keys or play the entire scale
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
    paddingVertical: 20,
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
    marginBottom: 30,
  },
  xylophone: {
    alignItems: 'center',
    marginBottom: 30,
  },
  key: {
    marginVertical: 4,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  noteText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  noteLabel: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    fontStyle: 'italic',
  },
  playButton: {
    backgroundColor: '#E94560',
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 25,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  playButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  instruction: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
    fontStyle: 'italic',
  },
});
