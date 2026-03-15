import { createClient } from '@supabase/supabase-js';
import * as SecureStore from 'expo-secure-store';


const SUPABASE_URL = process.env.EXPO_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

const ExpoSecureStoreAdapter = {
  getItem: (key) => SecureStore.getItemAsync(key),
  setItem: (key, value) => SecureStore.setItemAsync(key, value),
  removeItem: (key) => SecureStore.deleteItemAsync(key),
};

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    storage: ExpoSecureStoreAdapter,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

// ─── Auth helpers ────────────────────────────────────────────────────────────

export async function signUpWithEmail(email, password, name) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { name } },
  });
  return { data, error };
}

export async function signInWithEmail(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  return { data, error };
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  return { error };
}

// ─── Task helpers ─────────────────────────────────────────────────────────────

export async function getTodayTaskFromDB() {
  const today = new Date().toISOString().split('T')[0];
  const dayOfYear = Math.floor(
    (new Date() - new Date(new Date().getFullYear(), 0, 0)) / 86400000
  );

  const { data, error } = await supabase
    .from('tasks')
    .select('*')
    .order('id')
    .range(dayOfYear % 10, dayOfYear % 10);

  return { data: data?.[0], error };
}

// ─── Completion helpers ───────────────────────────────────────────────────────

export async function saveCompletion({ userId, taskId, note, personName }) {
  const shareToken = Math.random().toString(36).substr(2, 10);

  const { data, error } = await supabase
    .from('completions')
    .insert({
      user_id: userId,
      task_id: taskId,
      note,
      person_name: personName,
      share_token: shareToken,
      completed_at: new Date().toISOString(),
    })
    .select()
    .single();

  return { data, error };
}

export async function getCompletions(userId) {
  const { data, error } = await supabase
    .from('completions')
    .select('*, task:tasks(*)')
    .eq('user_id', userId)
    .order('completed_at', { ascending: false })
    .limit(30);

  return { data, error };
}

// ─── Streak helpers ───────────────────────────────────────────────────────────

export async function updateStreak(userId) {
  const { data: user } = await supabase
    .from('users')
    .select('streak_count, last_completed')
    .eq('id', userId)
    .single();

  if (!user) return;

  const lastDate = user.last_completed ? new Date(user.last_completed) : null;
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  const isConsecutive =
    lastDate &&
    lastDate.toDateString() === yesterday.toDateString();

  const newStreak = isConsecutive ? user.streak_count + 1 : 1;

  await supabase
    .from('users')
    .update({ streak_count: newStreak, last_completed: today.toISOString() })
    .eq('id', userId);

  return newStreak;
}
