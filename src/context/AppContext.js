import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getTodayTask, MOCK_USER, MOCK_COMPLETIONS } from '../data/mockData';

const AppContext = createContext(null);

const ONBOARDING_KEY = '@vera_onboarded';
const USER_KEY = '@vera_user';

export function AppProvider({ children }) {
  const [hasOnboarded, setHasOnboarded] = useState(null); // null = still loading
  const [user, setUser] = useState(null);
  const [loaded, setLoaded] = useState(false); // true once AsyncStorage is read
  const [todayTask] = useState(getTodayTask());
  const [completions, setCompletions] = useState(MOCK_COMPLETIONS);
  const [todayCompletion, setTodayCompletion] = useState(null);

  // Bootstrap: read persisted state, then mark loaded
  useEffect(() => {
    (async () => {
      try {
        const [onboarded, savedUser] = await Promise.all([
          AsyncStorage.getItem(ONBOARDING_KEY),
          AsyncStorage.getItem(USER_KEY),
        ]);
        setHasOnboarded(onboarded === 'true');
        if (savedUser) setUser(JSON.parse(savedUser));
      } catch {
        setHasOnboarded(false);
      } finally {
        setLoaded(true);
      }
    })();
  }, []);

  const completeOnboarding = async () => {
    await AsyncStorage.setItem(ONBOARDING_KEY, 'true');
    setHasOnboarded(true);
  };

  // Mock sign-in — replace with real Supabase auth
  const signIn = async (email, name) => {
    const mockUser = { ...MOCK_USER, email, name: name || MOCK_USER.name };
    await AsyncStorage.setItem(USER_KEY, JSON.stringify(mockUser));
    setUser(mockUser);
  };

  const signOut = async () => {
    await AsyncStorage.removeItem(USER_KEY);
    setUser(null);
  };

  // Called when user taps "I Did It"
  const completeToday = ({ note, personName, photo_url }) => {
    const shareToken = `vera${Math.random().toString(36).substr(2, 8)}`;
    const completion = {
      id: `completion-today`,
      user_id: user?.id ?? 'mock-user',
      task_id: todayTask.id,
      task: todayTask,
      completed_at: new Date().toISOString(),
      note,
      person_name: personName,
      photo_url,
      share_token: shareToken,
    };
    setTodayCompletion(completion);
    setCompletions((prev) => [completion, ...prev]);
    // TODO: call saveCompletion() + updateStreak() from supabase.js when wired up
    return completion;
  };

  const value = {
    hasOnboarded,
    loaded,
    user,
    todayTask,
    completions,
    todayCompletion,
    completeOnboarding,
    signIn,
    signOut,
    completeToday,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used inside AppProvider');
  return ctx;
}
