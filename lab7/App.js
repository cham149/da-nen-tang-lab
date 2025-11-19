import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  StatusBar,
  ImageBackground,
  Animated,
  Easing
} from 'react-native';

export default function App() {
  const [storyIndex, setStoryIndex] = useState(0);
  const [fadeAnim] = useState(new Animated.Value(1));

  const storyData = [
    {
      text: 'Xe của bạn bị nổ lốp trên con đường quanh co giữa vùng hoang vu không có sóng điện thoại. Bạn quyết định xin đi nhờ. Một chiếc xe tải cũ kỹ dừng lại bên cạnh. Một người đàn ông đội mũ vành rộng với đôi mắt vô hồn mở cửa cho bạn và hỏi: "Cần đi nhờ không, cậu trai?"',
      choices: [
        { text: 'Tôi sẽ lên xe. Cảm ơn sự giúp đỡ!', next: 1 },
        { text: 'Tốt hơn nên hỏi anh ta có phải là kẻ giết người không.', next: 2 },
      ],
      background: 'https://images.unsplash.com/photo-1540224871915-bc8ffb782bdf?w=800',
    },
    {
      text: 'Khi bạn bắt đầu lái xe, người lạ bắt đầu nói về mối quan hệ với mẹ của anh ta. Anh ta trở nên tức giận hơn từng phút. Anh ta yêu cầu bạn mở hộp đựng găng tay. Bên trong bạn tìm thấy một con dao đầy máu, hai ngón tay bị cắt đứt và một băng cassette của Elton John. Anh ta với tay về phía hộp đựng găng tay.',
      choices: [
        { text: 'Tôi yêu Elton John! Đưa cho anh ta băng cassette.', next: 3 },
        { text: 'Hoặc là anh ta hoặc tôi! Bạn lấy con dao và đâm anh ta.', next: 4 },
      ],
      background: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800',
    },
    {
      text: 'Anh ta gật đầu chậm rãi, không bị ảnh hưởng bởi câu hỏi.',
      choices: [
        { text: 'Ít nhất anh ta trung thực. Tôi sẽ lên xe.', next: 1 },
        { text: 'Chờ đã, tôi biết cách thay lốp.', next: 5 },
      ],
      background: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800',
    },
    {
      text: 'Bạn kết nối với kẻ giết người trong khi hát những câu hát của "Can you feel the love tonight". Anh ta thả bạn xuống thị trấn tiếp theo. Trước khi bạn đi, anh ta hỏi bạn có biết nơi nào tốt để vứt xác không. Bạn trả lời: "Hãy thử bến tàu".',
      choices: [
        { text: 'Bắt đầu lại', next: 0 },
      ],
      background: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=800',
    },
    {
      text: 'Khi bạn đâm xuyên qua lan can và lao về phía những tảng đá lởm chởm bên dưới, bạn suy ngẫm về sự khôn ngoan đáng ngờ của việc đâm ai đó khi họ đang lái chiếc xe mà bạn đang ngồi.',
      choices: [
        { text: 'Bắt đầu lại', next: 0 },
      ],
      background: 'https://images.unsplash.com/photo-1558618666-fcd25856cd65?w=800',
    },
    {
      text: 'Bạn biết không? Tôi sẽ tự thay lốp. Người lạ trở lại xe của anh ta và lái đi. Bạn thay lốp và lái đến thị trấn gần nhất. Bạn sống để kể lại câu chuyện!',
      choices: [
        { text: 'Bắt đầu lại', next: 0 },
      ],
      background: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800',
    },
  ];

  const handleChoice = (nextIndex) => {
    // Hiệu ứng fade out
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 500,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start(() => {
      setStoryIndex(nextIndex);
      // Hiệu ứng fade in
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        easing: Easing.ease,
        useNativeDriver: true,
      }).start();
    });
  };

  return (
    <ImageBackground 
      source={{ uri: storyData[storyIndex].background }}
      style={styles.container}
      blurRadius={3}
    >
      <StatusBar backgroundColor="transparent" translucent />
      
      <View style={styles.overlay}>
        <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
          <Text style={styles.title}>Destini 📖</Text>
          
          <View style={styles.storyContainer}>
            <Text style={styles.storyText}>
              {storyData[storyIndex].text}
            </Text>
          </View>

          <View style={styles.choicesContainer}>
            {storyData[storyIndex].choices.map((choice, index) => (
              <TouchableOpacity
                key={index}
                style={styles.choiceButton}
                onPress={() => handleChoice(choice.next)}
              >
                <Text style={styles.choiceText}>{choice.text}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.pageIndicator}>
            Trang {storyIndex + 1}/{storyData.length}
          </Text>
        </Animated.View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    padding: 20,
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    paddingTop: 50,
    paddingBottom: 30,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 30,
    textShadowColor: 'rgba(0,0,0,0.8)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
  },
  storyContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(26, 26, 46, 0.9)',
    padding: 25,
    borderRadius: 15,
    marginBottom: 30,
    borderWidth: 2,
    borderColor: '#4ECDC4',
  },
  storyText: {
    fontSize: 18,
    color: 'white',
    lineHeight: 28,
    textAlign: 'center',
    fontWeight: '500',
  },
  choicesContainer: {
    marginBottom: 20,
  },
  choiceButton: {
    backgroundColor: 'rgba(79, 205, 196, 0.9)',
    padding: 18,
    borderRadius: 12,
    marginBottom: 15,
    borderWidth: 2,
    borderColor: '#4ECDC4',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  choiceText: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    fontWeight: '600',
  },
  pageIndicator: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
    fontStyle: 'italic',
  },
});