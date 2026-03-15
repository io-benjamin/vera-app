import { useState, useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  FlatList,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '../context/AppContext';
import { COLORS, SPACING, RADIUS } from '../constants';

const { width } = Dimensions.get('window');

const slides = [
  {
    id: '1',
    icon: 'people-outline',
    iconColor: COLORS.coral,
    badge: 'Daily Task',
    title: 'Connect with\nreal people',
    description:
      'Every day, get a simple task that brings you closer to the humans around you.',
    bg: COLORS.cream,
  },
  {
    id: '2',
    icon: 'share-social-outline',
    iconColor: COLORS.forest,
    badge: 'Share Proof',
    title: 'Share your\nmoment',
    description:
      "Complete your task and send your Vera link to the person you connected with.",
    bg: COLORS.cream,
  },
  {
    id: '3',
    icon: 'flame-outline',
    iconColor: COLORS.coral,
    badge: 'Build a Habit',
    title: 'One task.\nReal connection.',
    description:
      'Build a streak of real human moments. Daily.',
    bg: COLORS.cream,
  },
];

function Slide({ item }) {
  return (
    <View style={[styles.slide, { width, backgroundColor: item.bg }]}>
      {/* Illustration area */}
      <View style={styles.illustrationWrap}>
        <View style={[styles.iconCircle, { backgroundColor: COLORS.white }]}>
          <Ionicons name={item.icon} size={80} color={item.iconColor} />
        </View>
      </View>

      {/* Text */}
      <View style={styles.textWrap}>
        <View style={[styles.badge, { backgroundColor: item.iconColor + '20' }]}>
          <Text style={[styles.badgeText, { color: item.iconColor }]}>{item.badge}</Text>
        </View>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    </View>
  );
}

function Dots({ data, scrollX }) {
  return (
    <View style={styles.dotsRow}>
      {data.map((_, i) => {
        const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
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
          <Animated.View key={i} style={[styles.dot, { width: dotWidth, opacity }]} />
        );
      })}
    </View>
  );
}

export default function OnboardingScreen({ navigation }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef(null);
  const { completeOnboarding } = useApp();

  const viewabilityConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;
  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) setCurrentIndex(viewableItems[0].index);
  }).current;

  const isLast = currentIndex === slides.length - 1;

  const handleNext = () => {
    if (!isLast) {
      flatListRef.current?.scrollToIndex({ index: currentIndex + 1 });
    } else {
      handleGetStarted();
    }
  };

  const handleGetStarted = async () => {
    await completeOnboarding();
    navigation.replace('Auth');
  };

  const handleSkip = async () => {
    await completeOnboarding();
    navigation.replace('Auth');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />

      <TouchableOpacity style={styles.skipBtn} onPress={handleSkip}>
        <Text style={styles.skipText}>Skip</Text>
      </TouchableOpacity>

      <FlatList
        ref={flatListRef}
        data={slides}
        renderItem={({ item }) => <Slide item={item} />}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        bounces={false}
        keyExtractor={(item) => item.id}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        scrollEventThrottle={16}
      />

      <View style={styles.footer}>
        <Dots data={slides} scrollX={scrollX} />
        <TouchableOpacity
          style={[styles.btn, isLast && styles.btnPrimary]}
          onPress={handleNext}
          activeOpacity={0.8}
        >
          <Text style={[styles.btnText, isLast && styles.btnTextPrimary]}>
            {isLast ? 'Get Started' : 'Next'}
          </Text>
          {isLast && (
            <Ionicons name="arrow-forward" size={18} color={COLORS.white} style={{ marginLeft: 6 }} />
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.cream },
  skipBtn: {
    position: 'absolute',
    top: 56,
    right: SPACING.lg,
    zIndex: 10,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  skipText: {
    fontSize: 15,
    color: COLORS.textLight,
    fontWeight: '500',
  },
  slide: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 80,
  },
  illustrationWrap: {
    flex: 0.55,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconCircle: {
    width: 200,
    height: 200,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 4,
  },
  textWrap: {
    flex: 0.4,
    paddingHorizontal: SPACING.xl,
    alignItems: 'center',
  },
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: RADIUS.round,
    marginBottom: SPACING.md,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: COLORS.charcoal,
    textAlign: 'center',
    lineHeight: 40,
    marginBottom: SPACING.md,
  },
  description: {
    fontSize: 16,
    color: COLORS.textLight,
    textAlign: 'center',
    lineHeight: 24,
  },
  footer: {
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.xl,
  },
  dotsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  dot: {
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.coral,
    marginHorizontal: 4,
  },
  btn: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 18,
    borderRadius: RADIUS.lg,
    borderWidth: 2,
    borderColor: COLORS.coral,
    backgroundColor: COLORS.white,
  },
  btnPrimary: {
    backgroundColor: COLORS.coral,
  },
  btnText: {
    fontSize: 17,
    fontWeight: '700',
    color: COLORS.coral,
  },
  btnTextPrimary: {
    color: COLORS.white,
  },
});
