import React, { useState, useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Animated,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '../context/AppContext';
import { COLORS, SPACING, RADIUS, CATEGORY_META } from '../constants';

export default function TaskDetailScreen({ navigation }) {
  const { todayTask, completeToday, todayCompletion } = useApp();
  const task = todayTask;
  const meta = CATEGORY_META[task.category] || CATEGORY_META.social;

  const [showConfirm, setShowConfirm] = useState(false);
  const [personName, setPersonName] = useState('');
  const [note, setNote] = useState('');
  const confirmAnim = useRef(new Animated.Value(0)).current;

  const openConfirm = () => {
    setShowConfirm(true);
    Animated.spring(confirmAnim, {
      toValue: 1,
      useNativeDriver: true,
      tension: 60,
      friction: 10,
    }).start();
  };

  const handleComplete = () => {
    const completion = completeToday({
      note: note.trim() || null,
      personName: personName.trim() || null,
      photo_url: null,
    });
    navigation.navigate('ShareLink', { completion });
  };

  const alreadyDone = !!todayCompletion;

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar style="dark" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.scroll}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Nav */}
          <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={22} color={COLORS.charcoal} />
          </TouchableOpacity>

          {/* Hero */}
          <View style={[styles.hero, { backgroundColor: meta.color + '15' }]}>
            <View style={[styles.heroIcon, { backgroundColor: meta.color + '25' }]}>
              <Ionicons name={meta.icon} size={48} color={meta.color} />
            </View>
            <View style={[styles.categoryBadge, { backgroundColor: meta.color + '20' }]}>
              <Text style={[styles.categoryText, { color: meta.color }]}>{meta.label}</Text>
            </View>
          </View>

          {/* Content */}
          <View style={styles.content}>
            <Text style={styles.difficultyLabel}>{task.difficulty} · today's task</Text>
            <Text style={styles.title}>{task.title}</Text>
            <Text style={styles.description}>{task.description}</Text>

            {/* Tips */}
            <View style={styles.tipsCard}>
              <View style={styles.tipsHeader}>
                <Ionicons name="bulb-outline" size={16} color={COLORS.coral} />
                <Text style={styles.tipsTitle}>Tips to get started</Text>
              </View>
              {task.tips?.map((tip, i) => (
                <View key={i} style={styles.tipRow}>
                  <View style={styles.tipBullet} />
                  <Text style={styles.tipText}>{tip}</Text>
                </View>
              ))}
            </View>

            {/* Already done state */}
            {alreadyDone ? (
              <View style={styles.doneBanner}>
                <Ionicons name="checkmark-circle" size={22} color={COLORS.forest} />
                <Text style={styles.doneText}>Completed today!</Text>
                <TouchableOpacity onPress={() => navigation.navigate('ShareLink', { completion: todayCompletion })}>
                  <Text style={styles.doneShareLink}>Share again</Text>
                </TouchableOpacity>
              </View>
            ) : !showConfirm ? (
              <TouchableOpacity
                style={styles.didItBtn}
                onPress={openConfirm}
                activeOpacity={0.85}
              >
                <Ionicons name="checkmark-circle-outline" size={22} color={COLORS.white} />
                <Text style={styles.didItText}>I Did It!</Text>
              </TouchableOpacity>
            ) : (
              <Animated.View
                style={[
                  styles.confirmBox,
                  {
                    opacity: confirmAnim,
                    transform: [{ scale: confirmAnim.interpolate({ inputRange: [0, 1], outputRange: [0.95, 1] }) }],
                  },
                ]}
              >
                <Text style={styles.confirmTitle}>Nice work! 🎉</Text>
                <Text style={styles.confirmSubtitle}>
                  {task.prompt ?? 'Who did you connect with?'}
                </Text>

                <View style={styles.inputWrap}>
                  <Ionicons name="person-outline" size={18} color={COLORS.textMuted} style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="Their name (optional)"
                    placeholderTextColor={COLORS.textMuted}
                    value={personName}
                    onChangeText={setPersonName}
                    autoCapitalize="words"
                  />
                </View>

                <View style={[styles.inputWrap, styles.noteWrap]}>
                  <TextInput
                    style={[styles.input, styles.noteInput]}
                    placeholder="Add a quick note (optional)"
                    placeholderTextColor={COLORS.textMuted}
                    value={note}
                    onChangeText={setNote}
                    multiline
                    numberOfLines={3}
                    textAlignVertical="top"
                  />
                </View>

                <TouchableOpacity
                  style={styles.confirmBtn}
                  onPress={handleComplete}
                  activeOpacity={0.85}
                >
                  <Ionicons name="share-social-outline" size={18} color={COLORS.white} />
                  <Text style={styles.confirmBtnText}>Generate my share link</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.skipConfirmBtn} onPress={handleComplete}>
                  <Text style={styles.skipConfirmText}>Skip, just complete it</Text>
                </TouchableOpacity>
              </Animated.View>
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.cream },
  scroll: { paddingBottom: SPACING.xxl },

  backBtn: {
    position: 'absolute',
    top: SPACING.md,
    left: SPACING.lg,
    zIndex: 10,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },

  hero: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  heroIcon: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryBadge: {
    paddingHorizontal: 14,
    paddingVertical: 5,
    borderRadius: RADIUS.round,
  },
  categoryText: { fontSize: 13, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 0.5 },

  content: { paddingHorizontal: SPACING.lg, paddingTop: SPACING.lg },
  difficultyLabel: { fontSize: 12, color: COLORS.textMuted, textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 6 },
  title: { fontSize: 26, fontWeight: '800', color: COLORS.charcoal, lineHeight: 32, marginBottom: SPACING.sm },
  description: { fontSize: 16, color: COLORS.textLight, lineHeight: 25, marginBottom: SPACING.lg },

  tipsCard: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    marginBottom: SPACING.xl,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  tipsHeader: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: SPACING.sm },
  tipsTitle: { fontSize: 14, fontWeight: '700', color: COLORS.charcoal },
  tipRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 8, marginBottom: 6 },
  tipBullet: { width: 6, height: 6, borderRadius: 3, backgroundColor: COLORS.coral, marginTop: 7 },
  tipText: { fontSize: 14, color: COLORS.textLight, flex: 1, lineHeight: 21 },

  didItBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.coral,
    borderRadius: RADIUS.lg,
    paddingVertical: 18,
    gap: 8,
    shadowColor: COLORS.coral,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 4,
  },
  didItText: { fontSize: 18, fontWeight: '800', color: COLORS.white },

  confirmBox: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.xl,
    padding: SPACING.lg,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 4,
  },
  confirmTitle: { fontSize: 22, fontWeight: '800', color: COLORS.charcoal, marginBottom: 4 },
  confirmSubtitle: { fontSize: 15, color: COLORS.textLight, marginBottom: SPACING.md },
  inputWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.cream,
    borderRadius: RADIUS.md,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    paddingHorizontal: SPACING.md,
    height: 50,
    marginBottom: SPACING.sm,
  },
  noteWrap: { height: 80, alignItems: 'flex-start', paddingVertical: SPACING.sm },
  inputIcon: { marginRight: 8 },
  input: { flex: 1, fontSize: 15, color: COLORS.charcoal },
  noteInput: { paddingTop: 4 },
  confirmBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.coral,
    borderRadius: RADIUS.lg,
    paddingVertical: 16,
    gap: 8,
    marginTop: SPACING.sm,
  },
  confirmBtnText: { fontSize: 16, fontWeight: '700', color: COLORS.white },
  skipConfirmBtn: { alignItems: 'center', paddingTop: SPACING.md },
  skipConfirmText: { fontSize: 14, color: COLORS.textLight },

  doneBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F7F4',
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    gap: 8,
  },
  doneText: { flex: 1, fontSize: 15, fontWeight: '600', color: COLORS.forest },
  doneShareLink: { fontSize: 14, fontWeight: '600', color: COLORS.coral },
});
