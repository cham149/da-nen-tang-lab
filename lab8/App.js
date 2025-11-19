import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  StatusBar,
  ScrollView,
  Alert,
  Animated,
  Easing
} from 'react-native';
import * as Haptics from 'expo-haptics';

export default function App() {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [bmi, setBmi] = useState(null);
  const [category, setCategory] = useState('');
  const [scaleAnim] = useState(new Animated.Value(1));

  const calculateBMI = async () => {
    if (!weight || !height) {
      Alert.alert('Lỗi', 'Vui lòng nhập cả cân nặng và chiều cao!');
      return;
    }

    const weightNum = parseFloat(weight);
    const heightNum = parseFloat(height);

    if (weightNum <= 0 || heightNum <= 0) {
      Alert.alert('Lỗi', 'Cân nặng và chiều cao phải lớn hơn 0!');
      return;
    }

    if (heightNum > 300) {
      Alert.alert('Lỗi', 'Chiều cao không hợp lệ! Vui lòng nhập chiều cao theo cm.');
      return;
    }

    // Hiệu ứng
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.1,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();

    const heightInMeters = heightNum / 100;
    const bmiValue = weightNum / (heightInMeters * heightInMeters);
    const roundedBmi = bmiValue.toFixed(1);

    setBmi(roundedBmi);

    // Phân loại BMI
    let bmiCategory = '';
    let bmiColor = '';
    let advice = '';

    if (bmiValue < 18.5) {
      bmiCategory = 'THIẾU CÂN';
      bmiColor = '#3498DB';
      advice = 'Bạn nên ăn uống đầy đủ chất dinh dưỡng và tăng cường tập luyện.';
    } else if (bmiValue < 23) {
      bmiCategory = 'BÌNH THƯỜNG';
      bmiColor = '#27AE60';
      advice = 'Chúc mừng! Bạn có cân nặng lý tưởng. Hãy duy trì nhé!';
    } else if (bmiValue < 25) {
      bmiCategory = 'THỪA CÂN';
      bmiColor = '#F39C12';
      advice = 'Bạn nên chú ý đến chế độ ăn uống và tập thể dục thường xuyên.';
    } else if (bmiValue < 30) {
      bmiCategory = 'TIỀN BÉO PHÌ';
      bmiColor = '#E67E22';
      advice = 'Cần có kế hoạch giảm cân khoa học và tập luyện nghiêm túc.';
    } else {
      bmiCategory = 'BÉO PHÌ';
      bmiColor = '#E74C3C';
      advice = 'Nên tham khảo ý kiến bác sĩ về chế độ ăn uống và tập luyện.';
    }

    setCategory(bmiCategory);
  };

  const resetCalculator = () => {
    setWeight('');
    setHeight('');
    setBmi(null);
    setCategory('');
  };

  const getBMIColor = () => {
    if (!bmi) return '#4ECDC4';
    const bmiValue = parseFloat(bmi);
    if (bmiValue < 18.5) return '#3498DB';
    if (bmiValue < 23) return '#27AE60';
    if (bmiValue < 25) return '#F39C12';
    if (bmiValue < 30) return '#E67E22';
    return '#E74C3C';
  };

  return (
    <ScrollView style={styles.container}>
      <StatusBar backgroundColor="#1A1A2E" barStyle="light-content" />
      
      <Text style={styles.title}>BMI Calculator </Text>
      <Text style={styles.subtitle}>Chỉ số khối cơ thể</Text>

      {/* Input Section */}
      <View style={styles.inputSection}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Cân nặng (kg)</Text>
          <TextInput
            style={styles.input}
            value={weight}
            onChangeText={setWeight}
            keyboardType="numeric"
            placeholder="Nhập cân nặng..."
            placeholderTextColor="#888"
            maxLength={3}
          />
          <Text style={styles.unit}>kg</Text>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Chiều cao (cm)</Text>
          <TextInput
            style={styles.input}
            value={height}
            onChangeText={setHeight}
            keyboardType="numeric"
            placeholder="Nhập chiều cao..."
            placeholderTextColor="#888"
            maxLength={3}
          />
          <Text style={styles.unit}>cm</Text>
        </View>
      </View>

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.calculateButton} onPress={calculateBMI}>
          <Text style={styles.calculateButtonText}>Tính BMI</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.resetButton} onPress={resetCalculator}>
          <Text style={styles.resetButtonText}>Reset</Text>
        </TouchableOpacity>
      </View>

      {/* Results */}
      {bmi && (
        <Animated.View style={[styles.resultContainer, { transform: [{ scale: scaleAnim }] }]}>
          <Text style={styles.resultTitle}>KẾT QUẢ</Text>
          
          <View style={[styles.bmiCircle, { borderColor: getBMIColor() }]}>
            <Text style={styles.bmiValue}>{bmi}</Text>
            <Text style={styles.bmiLabel}>BMI</Text>
          </View>

          <View style={[styles.categoryBadge, { backgroundColor: getBMIColor() }]}>
            <Text style={styles.categoryText}>{category}</Text>
          </View>

          <View style={styles.adviceContainer}>
            <Text style={styles.adviceTitle}>Lời khuyên:</Text>
            <Text style={styles.adviceText}>
              {category === 'THIẾU CÂN' && 'Ăn uống đầy đủ chất dinh dưỡng\n Tập thể dục tăng cường cơ bắp\nUống đủ nước mỗi ngày'}
              {category === 'BÌNH THƯỜNG' && 'Duy trì chế độ ăn uống lành mạnh\n Tập thể dục đều đặn\nGiữ tinh thần thoải mái'}
              {category === 'THỪA CÂN' && 'Ăn nhiều rau xanh và chất xơ\n Đi bộ 30 phút mỗi ngày\n Hạn chế đồ ngọt và dầu mỡ'}
              {category === 'TIỀN BÉO PHÌ' && 'Lập kế hoạch giảm cân khoa học\nTập cardio thường xuyên\n Theo dõi cân nặng hàng tuần'}
              {category === 'BÉO PHÌ' && 'Tham khảo ý kiến bác sĩ\n Chế độ ăn kiêng nghiêm ngặt\nTập luyện cường độ cao'}
            </Text>
          </View>
        </Animated.View>
      )}

      {/* BMI Chart */}
      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Bảng phân loại BMI</Text>
        <View style={styles.chart}>
          <View style={[styles.chartItem, { backgroundColor: '#3498DB' }]}>
            <Text style={styles.chartText}>Thiếu cân</Text>
            <Text style={styles.chartRange}>&lt; 18.5</Text>
          </View>
          <View style={[styles.chartItem, { backgroundColor: '#27AE60' }]}>
            <Text style={styles.chartText}>Bình thường</Text>
            <Text style={styles.chartRange}>18.5 - 22.9</Text>
          </View>
          <View style={[styles.chartItem, { backgroundColor: '#F39C12' }]}>
            <Text style={styles.chartText}>Thừa cân</Text>
            <Text style={styles.chartRange}>23 - 24.9</Text>
          </View>
          <View style={[styles.chartItem, { backgroundColor: '#E67E22' }]}>
            <Text style={styles.chartText}>Tiền béo phì</Text>
            <Text style={styles.chartRange}>25 - 29.9</Text>
          </View>
          <View style={[styles.chartItem, { backgroundColor: '#E74C3C' }]}>
            <Text style={styles.chartText}>Béo phì</Text>
            <Text style={styles.chartRange}>≥ 30</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1A2E',
    padding: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginTop: 50,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#4ECDC4',
    textAlign: 'center',
    marginBottom: 40,
  },
  inputSection: {
    marginBottom: 30,
  },
  inputContainer: {
    marginBottom: 20,
    position: 'relative',
  },
  label: {
    fontSize: 16,
    color: 'white',
    marginBottom: 10,
    fontWeight: '600',
  },
  input: {
    backgroundColor: '#16213E',
    borderWidth: 2,
    borderColor: '#4ECDC4',
    borderRadius: 12,
    padding: 15,
    color: 'white',
    fontSize: 18,
    paddingRight: 60,
  },
  unit: {
    position: 'absolute',
    right: 15,
    top: 50,
    fontSize: 16,
    color: '#888',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  calculateButton: {
    backgroundColor: '#4ECDC4',
    paddingHorizontal: 40,
    paddingVertical: 18,
    borderRadius: 12,
    flex: 1,
    marginRight: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  calculateButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  resetButton: {
    backgroundColor: '#E94560',
    paddingHorizontal: 30,
    paddingVertical: 18,
    borderRadius: 12,
    flex: 0.5,
    marginLeft: 10,
  },
  resetButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  resultContainer: {
    backgroundColor: '#16213E',
    padding: 25,
    borderRadius: 15,
    marginBottom: 30,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#4ECDC4',
  },
  resultTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
  },
  bmiCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  bmiValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
  },
  bmiLabel: {
    fontSize: 14,
    color: '#888',
    marginTop: 5,
  },
  categoryBadge: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginBottom: 20,
  },
  categoryText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  adviceContainer: {
    width: '100%',
  },
  adviceTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4ECDC4',
    marginBottom: 10,
  },
  adviceText: {
    fontSize: 14,
    color: 'white',
    lineHeight: 20,
  },
  chartContainer: {
    marginBottom: 30,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 15,
    textAlign: 'center',
  },
  chart: {
    borderRadius: 10,
    overflow: 'hidden',
  },
  chartItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#34495E',
  },
  chartText: {
    fontSize: 14,
    color: 'white',
    fontWeight: '600',
  },
  chartRange: {
    fontSize: 14,
    color: 'white',
    fontWeight: 'bold',
  },
});