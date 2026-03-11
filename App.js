import React, { useState, useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  FlatList,
  TouchableOpacity,
  Image,
  Animated,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');

// Vera brand colors
const colors = {
  background: '#FFFFFF',
  coral: '#E8735A',
  forest: '#2D5A47',
  cream: '#FFF8F0',
  text: '#1A1A1A',
  textLight: '#666666',
};

// Onboarding slides data
const slides = [
  {
    id: '1',
    title: 'Connect with real people',
    description: 'Get a simple daily task that brings you closer to the humans around you.',
    // image: require('./assets/onboarding/slide-1.png'),
  },
  {
    id: '2',
    title: 'Share your moment',
    description: 'Complete your task and share your Vera link with the person you connected with.',
    // image: require('./assets/onboarding/slide-2.png'),
  },
  {
    id: '3',
    title: 'Start your journey',
    description: 'One task a day. Real connection, daily.',
    // image: require('./assets/onboarding/slide-3.png'),
  },
];

const OnboardingSlide = ({ item }) => {
  return (
    <View style={styles.slide}>
      <View style={styles.imageContainer}>
        {/* Placeholder for illustration - replace with actual images */}
        <View style={styles.imagePlaceholder}>
          <Text style={styles.placeholderText}>Illustration {item.id}</Text>
        </View>
        {/* Uncomment when you have actual images:
        <Image source={item.image} style={styles.image} resizeMode="contain" />
        */}
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    </View>
  );
};

const Pagination = ({ data, scrollX }) => {
  return (
    <View style={styles.paginationContainer}>
      {data.map((_, index) => {
        const inputRange = [
          (index - 1) * width,
          index * width,
          (index + 1) * width,
        ];

        const dotWidth = scrollX.interpolate({
          inputRange,
          outputRange: [8, 24, 8],
          extrapolate: 'clamp',
        });

        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0.3, 1, 0.3],
          extrapolate: 'clamp',
        });

        return (
          <Animated.View
            key={index.toString()}
            style={[
              styles.dot,
              { width: dotWidth, opacity },
            ]}
          />
        );
      })}
    </View>
  );
};

export default function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef(null);

  const viewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  }).current;

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      flatListRef.current?.scrollToIndex({ index: currentIndex + 1 });
    } else {
      // Navigate to main app / sign up
      console.log('Onboarding complete!');
    }
  };

  const handleSkip = () => {
    // Navigate to main app / sign up
    console.log('Skipped onboarding');
  };

  const isLastSlide = currentIndex === slides.length - 1;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      
      {/* Skip button */}
      <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
        <Text style={styles.skipText}>Skip</Text>
      </TouchableOpacity>

      {/* Slides */}
      <FlatList
        ref={flatListRef}
        data={slides}
        renderItem={({ item }) => <OnboardingSlide item={item} />}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        bounces={false}
        keyExtractor={(item) => item.id}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        onViewableItemsChanged={viewableItemsChanged}
        viewabilityConfig={viewConfig}
        scrollEventThrottle={32}
      />

      {/* Bottom section */}
      <View style={styles.bottomContainer}>
        <Pagination data={slides} scrollX={scrollX} />
        
        <TouchableOpacity
          style={[
            styles.button,
            isLastSlide && styles.buttonPrimary,
          ]}
          onPress={handleNext}
        >
          <Text style={[
            styles.buttonText,
            isLastSlide && styles.buttonTextPrimary,
          ]}>
            {isLastSlide ? 'Get Started' : 'Next'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  skipButton: {
    position: 'absolute',
    top: 60,
    right: 24,
    zIndex: 10,
  },
  skipText: {
    fontSize: 16,
    color: colors.textLight,
    fontWeight: '500',
  },
  slide: {
    width,
    flex: 1,
    alignItems: 'center',
    paddingTop: 100,
  },
  imageContainer: {
    flex: 0.6,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  imagePlaceholder: {
    width: width * 0.8,
    height: width * 0.8,
    backgroundColor: colors.cream,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.coral,
    borderStyle: 'dashed',
  },
  placeholderText: {
    color: colors.coral,
    fontSize: 18,
    fontWeight: '600',
  },
  image: {
    width: width * 0.85,
    height: width * 0.85,
  },
  textContainer: {
    flex: 0.3,
    paddingHorizontal: 40,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.text,
    textAlign: 'center',
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    color: colors.textLight,
    textAlign: 'center',
    lineHeight: 24,
  },
  bottomContainer: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
  },
  dot: {
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.coral,
    marginHorizontal: 4,
  },
  button: {
    backgroundColor: colors.cream,
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.coral,
  },
  buttonPrimary: {
    backgroundColor: colors.coral,
    borderColor: colors.coral,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.coral,
  },
  buttonTextPrimary: {
    color: colors.background,
  },
});
