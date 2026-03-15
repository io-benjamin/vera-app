import { useState, useRef, useEffect } from 'react';
import { View, Animated, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import { useApp } from '../context/AppContext';
import { COLORS } from '../constants';

// Screens
import SplashAnimationScreen from '../screens/SplashAnimationScreen';
import OnboardingScreen from '../screens/OnboardingScreen';
import AuthScreen from '../screens/AuthScreen';
import HomeScreen from '../screens/HomeScreen';
import TaskDetailScreen from '../screens/TaskDetailScreen';
import ShareLinkScreen from '../screens/ShareLinkScreen';
import HistoryScreen from '../screens/HistoryScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// ─── Home stack (Home → TaskDetail → ShareLink) ───────────────────────────────
function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="TaskDetail" component={TaskDetailScreen} />
      <Stack.Screen
        name="ShareLink"
        component={ShareLinkScreen}
        options={{ presentation: 'modal' }}
      />
    </Stack.Navigator>
  );
}

// ─── Main bottom tab navigator ────────────────────────────────────────────────
function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: COLORS.coral,
        tabBarInactiveTintColor: COLORS.textMuted,
        tabBarStyle: {
          backgroundColor: COLORS.white,
          borderTopColor: COLORS.border,
          borderTopWidth: 1,
          paddingTop: 8,
          paddingBottom: 4,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '500',
          marginTop: 2,
        },
        tabBarIcon: ({ focused, color }) => {
          const icons = {
            HomeTab: focused ? 'home' : 'home-outline',
            HistoryTab: focused ? 'calendar' : 'calendar-outline',
            ProfileTab: focused ? 'person' : 'person-outline',
          };
          return <Ionicons name={icons[route.name]} size={22} color={color} />;
        },
      })}
    >
      <Tab.Screen name="HomeTab" component={HomeStack} options={{ tabBarLabel: 'Today' }} />
      <Tab.Screen name="HistoryTab" component={HistoryScreen} options={{ tabBarLabel: 'History' }} />
      <Tab.Screen name="ProfileTab" component={ProfileScreen} options={{ tabBarLabel: 'Profile' }} />
    </Tab.Navigator>
  );
}

// ─── App screens (renders behind the splash overlay) ─────────────────────────
function AppScreens() {
  const { loaded, hasOnboarded, user } = useApp();

  // AsyncStorage still loading — hold on cream to avoid a flash
  if (!loaded) {
    return <View style={{ flex: 1, backgroundColor: COLORS.cream }} />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!hasOnboarded ? (
          <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        ) : !user ? (
          <Stack.Screen name="Auth" component={AuthScreen} />
        ) : (
          <Stack.Screen name="Main" component={MainTabs} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// ─── Root navigator ───────────────────────────────────────────────────────────
export default function AppNavigator() {
  const { loaded, hasOnboarded, user } = useApp();
  // null = undecided (waiting for AsyncStorage); true/false = decided once
  const [splashVisible, setSplashVisible] = useState(null);
  const splashOpacity = useRef(new Animated.Value(1)).current;
  const splashScale   = useRef(new Animated.Value(1)).current;

  // Decide once, after AsyncStorage has loaded, whether to show the splash.
  // Splash is only for returning users who are already signed in.
  // New users go straight to Onboarding → Auth → app.
  useEffect(() => {
    if (!loaded) return;
    setSplashVisible(hasOnboarded === true && !!user);
  }, [loaded]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSplashComplete = () => {
    // Gently fade + scale up the splash overlay, revealing the app beneath
    Animated.parallel([
      Animated.timing(splashOpacity, {
        toValue: 0,
        duration: 700,
        useNativeDriver: true,
      }),
      Animated.timing(splashScale, {
        toValue: 1.06,
        duration: 700,
        useNativeDriver: true,
      }),
    ]).start(() => setSplashVisible(false));
  };

  // Still waiting for AsyncStorage — hold on cream
  if (splashVisible === null) {
    return <View style={{ flex: 1, backgroundColor: COLORS.cream }} />;
  }

  return (
    <View style={StyleSheet.absoluteFill}>
      {/* App always renders beneath — new users see onboarding/auth immediately */}
      <AppScreens />

      {/* Splash overlay — only for returning signed-in users */}
      {splashVisible && (
        <Animated.View
          style={[
            StyleSheet.absoluteFill,
            { opacity: splashOpacity, transform: [{ scale: splashScale }] },
          ]}
        >
          <SplashAnimationScreen onComplete={handleSplashComplete} />
        </Animated.View>
      )}
    </View>
  );
}
