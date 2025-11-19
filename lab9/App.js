import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  StatusBar,
  ScrollView,
  ActivityIndicator,
  Alert,
  ImageBackground,
  Dimensions
} from 'react-native';
import * as Location from 'expo-location';

const { width } = Dimensions.get('window');

export default function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [city, setCity] = useState('');
  const [error, setError] = useState('');
  const [locationPermission, setLocationPermission] = useState(false);

  // Dữ liệu thời tiết mẫu cho các thành phố
  const mockWeatherData = {
    'hanoi': {
      name: 'Hà Nội',
      main: { temp: 28, feels_like: 30, humidity: 75, pressure: 1013 },
      weather: [{ main: 'Clouds', description: 'mây cụm', icon: '02d' }],
      wind: { speed: 3.6 },
      sys: { country: 'VN' }
    },
    'ho chi minh': {
      name: 'TP. Hồ Chí Minh',
      main: { temp: 32, feels_like: 35, humidity: 80, pressure: 1010 },
      weather: [{ main: 'Rain', description: 'mưa nhẹ', icon: '10d' }],
      wind: { speed: 2.5 },
      sys: { country: 'VN' }
    },
    'da nang': {
      name: 'Đà Nẵng',
      main: { temp: 30, feels_like: 33, humidity: 70, pressure: 1012 },
      weather: [{ main: 'Clear', description: 'trời quang', icon: '01d' }],
      wind: { speed: 4.2 },
      sys: { country: 'VN' }
    },
    'london': {
      name: 'London',
      main: { temp: 15, feels_like: 14, humidity: 65, pressure: 1015 },
      weather: [{ main: 'Rain', description: 'mưa phùn', icon: '09d' }],
      wind: { speed: 5.8 },
      sys: { country: 'UK' }
    },
    'tokyo': {
      name: 'Tokyo',
      main: { temp: 22, feels_like: 23, humidity: 60, pressure: 1016 },
      weather: [{ main: 'Clear', description: 'trời quang', icon: '01d' }],
      wind: { speed: 2.1 },
      sys: { country: 'JP' }
    },
    'new york': {
      name: 'New York',
      main: { temp: 18, feels_like: 17, humidity: 55, pressure: 1014 },
      weather: [{ main: 'Clouds', description: 'nhiều mây', icon: '03d' }],
      wind: { speed: 6.2 },
      sys: { country: 'US' }
    },
    'paris': {
      name: 'Paris',
      main: { temp: 16, feels_like: 15, humidity: 70, pressure: 1013 },
      weather: [{ main: 'Drizzle', description: 'mưa phùn nhẹ', icon: '09d' }],
      wind: { speed: 3.1 },
      sys: { country: 'FR' }
    },
    'sydney': {
      name: 'Sydney',
      main: { temp: 25, feels_like: 26, humidity: 65, pressure: 1015 },
      weather: [{ main: 'Clear', description: 'trời nắng', icon: '01d' }],
      wind: { speed: 4.5 },
      sys: { country: 'AU' }
    }
  };

  useEffect(() => {
    requestLocationPermission();
  }, []);

  const requestLocationPermission = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        setLocationPermission(true);
        // Tự động lấy thời tiết Hà Nội khi khởi động
        setWeatherData(mockWeatherData['hanoi']);
      } else {
        setLocationPermission(false);
        setWeatherData(mockWeatherData['hanoi']); // Vẫn hiển thị dữ liệu mẫu
      }
    } catch (err) {
      console.log('Lỗi quyền truy cập:', err);
      setWeatherData(mockWeatherData['hanoi']); // Vẫn hiển thị dữ liệu mẫu
    }
  };

  const getCurrentLocationWeather = async () => {
    try {
      setLoading(true);
      setError('');
      
      // Giả lập lấy vị trí hiện tại (trong thực tế sẽ dùng Location.getCurrentPositionAsync)
      // Ở đây chúng ta sẽ random một thành phố để demo
      const cities = ['hanoi', 'ho chi minh', 'da nang', 'london', 'tokyo'];
      const randomCity = cities[Math.floor(Math.random() * cities.length)];
      
      setTimeout(() => {
        setWeatherData(mockWeatherData[randomCity]);
        setLoading(false);
      }, 1500);
      
    } catch (err) {
      console.log('Lỗi lấy vị trí:', err);
      setError('Không thể lấy vị trí hiện tại');
      setLoading(false);
    }
  };

  const fetchWeatherByCity = async () => {
    if (!city.trim()) {
      Alert.alert('Lỗi', 'Vui lòng nhập tên thành phố!');
      return;
    }

    try {
      setLoading(true);
      setError('');
      
      const cityLower = city.toLowerCase().trim();
      let foundCity = null;

      // Tìm thành phố phù hợp
      for (const [key, data] of Object.entries(mockWeatherData)) {
        if (data.name.toLowerCase().includes(cityLower) || key.includes(cityLower)) {
          foundCity = data;
          break;
        }
      }

      setTimeout(() => {
        if (foundCity) {
          setWeatherData(foundCity);
          setCity('');
        } else {
          setError('Không tìm thấy thông tin thời tiết cho thành phố này');
          // Hiển thị Hà Nội như mặc định
          setWeatherData(mockWeatherData['hanoi']);
        }
        setLoading(false);
      }, 1500);
      
    } catch (err) {
      console.log('Lỗi tìm kiếm:', err);
      setError('Lỗi khi tìm kiếm thời tiết');
      setLoading(false);
    }
  };

  const getWeatherIcon = (iconCode) => {
    const icons = {
      '01d': '☀️',
      '01n': '🌙',
      '02d': '⛅',
      '02n': '☁️',
      '03d': '☁️',
      '03n': '☁️',
      '04d': '☁️',
      '04n': '☁️',
      '09d': '🌧️',
      '09n': '🌧️',
      '10d': '🌦️',
      '10n': '🌦️',
      '11d': '⛈️',
      '11n': '⛈️',
      '13d': '❄️',
      '13n': '❄️',
      '50d': '🌫️',
      '50n': '🌫️'
    };
    return icons[iconCode] || '🌈';
  };

  const getBackgroundImage = (weatherMain) => {
    const backgrounds = {
      'Clear': 'https://images.unsplash.com/photo-1504608524841-42fe6f032b25?w=800',
      'Clouds': 'https://images.unsplash.com/photo-1534088568595-a066f410bcda?w=800',
      'Rain': 'https://images.unsplash.com/photo-1519692933481-e162a57d6721?w=800',
      'Snow': 'https://images.unsplash.com/photo-1548777123-e216912df7d8?w=800',
      'Thunderstorm': 'https://images.unsplash.com/photo-1605727216801-e27ce1d0cc28?w=800',
      'Drizzle': 'https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?w=800',
      'Mist': 'https://images.unsplash.com/photo-1504253164589-618ec7d1e40e?w=800'
    };
    return backgrounds[weatherMain] || 'https://images.unsplash.com/photo-1504608524841-42fe6f032b25?w=800';
  };

  const getWeatherBackgroundColor = (weatherMain) => {
    const colors = {
      'Clear': ['#4DA0FF', '#6BB9FF'],
      'Clouds': ['#636363', '#8E8E8E'],
      'Rain': ['#3A6186', '#4A7BA6'],
      'Snow': ['#83A4D4', '#B6FBFF'],
      'Thunderstorm': ['#232526', '#414345'],
      'Drizzle': ['#5C6BC0', '#7986CB'],
      'Mist': ['#757F9A', '#D7DDE8']
    };
    return colors[weatherMain] || ['#4DA0FF', '#6BB9FF'];
  };

  const getWeatherAdvice = (weatherMain, temp) => {
    if (weatherMain === 'Rain' || weatherMain === 'Drizzle') {
      return '🌂 Mang theo ô khi ra ngoài';
    } else if (weatherMain === 'Thunderstorm') {
      return '⚡ Tránh ra ngoài khi có sấm sét';
    } else if (weatherMain === 'Snow') {
      return '🧤 Mặc ấm và mang giày chống trượt';
    } else if (temp > 30) {
      return '🥤 Uống nhiều nước, tránh nắng gắt';
    } else if (temp < 15) {
      return '🧥 Mặc ấm, giữ nhiệt cơ thể';
    } else {
      return '😊 Thời tiết đẹp, thích hợp cho hoạt động ngoài trời';
    }
  };

  return (
    <ImageBackground 
      source={{ uri: weatherData ? getBackgroundImage(weatherData.weather[0].main) : 'https://images.unsplash.com/photo-1504608524841-42fe6f032b25?w=800' }}
      style={styles.container}
      blurRadius={3}
    >
      <StatusBar backgroundColor="transparent" translucent />
      
      <View style={styles.overlay}>
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Clima 🌤️</Text>
            <Text style={styles.subtitle}>Dự báo thời tiết chính xác</Text>
          </View>

          {/* Search Section */}
          <View style={styles.searchSection}>
            <TextInput
              style={styles.searchInput}
              value={city}
              onChangeText={setCity}
              placeholder="Tìm thành phố..."
              placeholderTextColor="#888"
              onSubmitEditing={fetchWeatherByCity}
              returnKeyType="search"
            />
            <TouchableOpacity style={styles.searchButton} onPress={fetchWeatherByCity}>
              <Text style={styles.searchButtonText}>🔍</Text>
            </TouchableOpacity>
          </View>

          {/* Location Button */}
          <TouchableOpacity 
            style={styles.locationButton} 
            onPress={getCurrentLocationWeather}
          >
            <Text style={styles.locationButtonText}>
              📍 Vị trí hiện tại
            </Text>
          </TouchableOpacity>

          {/* Error Message */}
          {error ? (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{error}</Text>
            </View>
          ) : null}

          {/* Loading */}
          {loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#4ECDC4" />
              <Text style={styles.loadingText}>Đang tải dữ liệu thời tiết...</Text>
            </View>
          ) : weatherData ? (
            /* Weather Display */
            <View style={styles.weatherContainer}>
              {/* Location and Date */}
              <View style={styles.locationSection}>
                <Text style={styles.location}>
                  {weatherData.name}, {weatherData.sys.country}
                </Text>
                <Text style={styles.date}>
                  {new Date().toLocaleDateString('vi-VN', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </Text>
              </View>

              {/* Temperature */}
              <View style={styles.temperatureSection}>
                <Text style={styles.temperature}>
                  {weatherData.main.temp}°
                </Text>
                <View style={styles.weatherIconContainer}>
                  <Text style={styles.weatherIcon}>
                    {getWeatherIcon(weatherData.weather[0].icon)}
                  </Text>
                  <Text style={styles.weatherDescription}>
                    {weatherData.weather[0].description}
                  </Text>
                </View>
              </View>

              {/* Weather Advice */}
              <View style={styles.adviceContainer}>
                <Text style={styles.adviceText}>
                  {getWeatherAdvice(weatherData.weather[0].main, weatherData.main.temp)}
                </Text>
              </View>

              {/* Weather Details */}
              <View style={styles.detailsGrid}>
                <View style={styles.detailCard}>
                  <Text style={styles.detailIcon}>🌡️</Text>
                  <Text style={styles.detailLabel}>Cảm giác như</Text>
                  <Text style={styles.detailValue}>
                    {weatherData.main.feels_like}°
                  </Text>
                </View>

                <View style={styles.detailCard}>
                  <Text style={styles.detailIcon}>💧</Text>
                  <Text style={styles.detailLabel}>Độ ẩm</Text>
                  <Text style={styles.detailValue}>
                    {weatherData.main.humidity}%
                  </Text>
                </View>

                <View style={styles.detailCard}>
                  <Text style={styles.detailIcon}>💨</Text>
                  <Text style={styles.detailLabel}>Gió</Text>
                  <Text style={styles.detailValue}>
                    {weatherData.wind.speed} m/s
                  </Text>
                </View>

                <View style={styles.detailCard}>
                  <Text style={styles.detailIcon}>📊</Text>
                  <Text style={styles.detailLabel}>Áp suất</Text>
                  <Text style={styles.detailValue}>
                    {weatherData.main.pressure} hPa
                  </Text>
                </View>
              </View>

              {/* Popular Cities */}
              <View style={styles.citiesSection}>
                <Text style={styles.citiesTitle}>Thành phố phổ biến</Text>
                <ScrollView 
                  horizontal 
                  showsHorizontalScrollIndicator={false}
                  style={styles.citiesScroll}
                >
                  {Object.entries(mockWeatherData).map(([key, data]) => (
                    <TouchableOpacity
                      key={key}
                      style={styles.cityChip}
                      onPress={() => {
                        setWeatherData(data);
                      }}
                    >
                      <Text style={styles.cityChipText}>{data.name}</Text>
                      <Text style={styles.cityChipTemp}>{data.main.temp}°</Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            </View>
          ) : null}
        </ScrollView>
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
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
    paddingTop: 60,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 42,
    fontWeight: 'bold',
    color: 'white',
    textShadowColor: 'rgba(0,0,0,0.8)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 10,
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.8)',
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
  },
  searchSection: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  searchInput: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 12,
    padding: 15,
    fontSize: 16,
    marginRight: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  searchButton: {
    backgroundColor: '#4ECDC4',
    width: 50,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 4,
  },
  searchButtonText: {
    fontSize: 20,
  },
  locationButton: {
    backgroundColor: 'rgba(79, 205, 196, 0.9)',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 4,
  },
  locationButtonText: {
    fontSize: 16,
    color: 'white',
    fontWeight: '600',
  },
  errorContainer: {
    backgroundColor: 'rgba(231, 76, 60, 0.9)',
    padding: 15,
    borderRadius: 12,
    marginBottom: 20,
  },
  errorText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: '500',
  },
  loadingContainer: {
    alignItems: 'center',
    padding: 40,
  },
  loadingText: {
    color: 'white',
    marginTop: 15,
    fontSize: 16,
  },
  weatherContainer: {
    backgroundColor: 'rgba(26, 26, 46, 0.8)',
    borderRadius: 20,
    padding: 25,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 10,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  locationSection: {
    alignItems: 'center',
    marginBottom: 25,
  },
  location: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 5,
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
  },
  date: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.8)',
    textAlign: 'center',
  },
  temperatureSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 25,
  },
  temperature: {
    fontSize: 72,
    fontWeight: 'bold',
    color: 'white',
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 10,
  },
  weatherIconContainer: {
    alignItems: 'center',
  },
  weatherIcon: {
    fontSize: 50,
    marginBottom: 5,
  },
  weatherDescription: {
    fontSize: 16,
    color: 'white',
    textTransform: 'capitalize',
    textAlign: 'center',
    fontWeight: '500',
  },
  adviceContainer: {
    backgroundColor: 'rgba(79, 205, 196, 0.9)',
    padding: 15,
    borderRadius: 12,
    marginBottom: 25,
  },
  adviceText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '500',
  },
  detailsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 25,
  },
  detailCard: {
    width: (width - 100) / 2,
    backgroundColor: 'rgba(255,255,255,0.1)',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 15,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  detailIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  detailLabel: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.8)',
    marginBottom: 5,
    textAlign: 'center',
  },
  detailValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  citiesSection: {
    marginTop: 10,
  },
  citiesTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 15,
    textAlign: 'center',
  },
  citiesScroll: {
    marginHorizontal: -5,
  },
  cityChip: {
    backgroundColor: 'rgba(79, 205, 196, 0.9)',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 20,
    marginHorizontal: 5,
    alignItems: 'center',
    minWidth: 100,
  },
  cityChipText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
    marginBottom: 2,
  },
  cityChipTemp: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});