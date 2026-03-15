import React, { useRef, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Share,
  Animated,
  ScrollView,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import * as Clipboard from 'expo-clipboard';
import { COLORS, SPACING, RADIUS, CATEGORY_META } from '../constants';

const BASE_URL = 'https://tryvera.app/proof';

export default function ShareLinkScreen({ route, navigation }) {
  const { completion } = route.params ?? {};
  const shareToken = completion?.share_token ?? 'abc123xyz';
  const shareUrl = `${BASE_URL}/${shareToken}`;
  const task = completion?.task;
  const personName = completion?.person_name;
  const meta = CATEGORY_META[task?.category] || CATEGORY_META.social;

  const scaleAnim = useRef(new Animated.Value(0.5)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 8,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleShare = async () => {
    try {
      await Share.share({
        message: personName
          ? `Hey ${personName}! I just completed a Vera task with you: "${task?.title}". Check it out: ${shareUrl}`
          : `I just completed a Vera task: "${task?.title}". Check it out: ${shareUrl}`,
        url: shareUrl,
      });
    } catch (_) {}
  };

  const handleCopy = async () => {
    await Clipboard.setStringAsync(shareUrl);
  };

  const handleDone = () => {
    // Pop back to Home tab root
    navigation.navigate('HomeTab', { screen: 'Home' });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {/* Close button */}
        <TouchableOpacity style={styles.closeBtn} onPress={handleDone}>
          <Ionicons name="close" size={22} color={COLORS.charcoal} />
        </TouchableOpacity>

        {/* Celebration */}
        <Animated.View
          style={[
            styles.celebrationWrap,
            { opacity: opacityAnim, transform: [{ scale: scaleAnim }] },
          ]}
        >
          <View style={styles.checkCircle}>
            <Ionicons name="checkmark" size={48} color={COLORS.white} />
          </View>
        </Animated.View>

        <Animated.View style={{ opacity: opacityAnim }}>
          <Text style={styles.headline}>Connection made! 🎉</Text>
          <Text style={styles.subheadline}>
            {personName
              ? `You connected with ${personName} today.`
              : "You showed up today. That's what matters."}
          </Text>

          {/* Task recap */}
          {task && (
            <View style={[styles.recapCard, { borderLeftColor: meta.color }]}>
              <View style={styles.recapHeader}>
                <Ionicons name={meta.icon} size={16} color={meta.color} />
                <Text style={[styles.recapCategory, { color: meta.color }]}>{meta.label}</Text>
              </View>
              <Text style={styles.recapTitle}>{task.title}</Text>
              {completion?.note && (
                <Text style={styles.recapNote}>"{completion.note}"</Text>
              )}
            </View>
          )}

          {/* Link section */}
          <Text style={styles.sectionLabel}>Your shareable link</Text>
          <Text style={styles.linkHint}>
            Send this to {personName ?? 'the person you connected with'} — it's proof you made it real.
          </Text>

          <View style={styles.linkBox}>
            <Ionicons name="link-outline" size={18} color={COLORS.coral} style={styles.linkIcon} />
            <Text style={styles.linkText} numberOfLines={1}>{shareUrl}</Text>
            <TouchableOpacity style={styles.copyBtn} onPress={handleCopy}>
              <Ionicons name="copy-outline" size={18} color={COLORS.forest} />
            </TouchableOpacity>
          </View>

          {/* Primary share button */}
          <TouchableOpacity
            style={styles.shareBtn}
            onPress={handleShare}
            activeOpacity={0.85}
          >
            <Ionicons name="share-social-outline" size={20} color={COLORS.white} />
            <Text style={styles.shareBtnText}>Share with {personName ?? 'them'}</Text>
          </TouchableOpacity>

          {/* Secondary done button */}
          <TouchableOpacity style={styles.doneBtn} onPress={handleDone}>
            <Text style={styles.doneBtnText}>Done for today</Text>
          </TouchableOpacity>

          {/* Streak callout */}
          <View style={styles.streakCallout}>
            <Ionicons name="flame" size={20} color={COLORS.coral} />
            <Text style={styles.streakCalloutText}>
              Your streak is growing. Come back tomorrow!
            </Text>
          </View>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.cream },
  scroll: {
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.xl,
    paddingBottom: SPACING.xxl,
    alignItems: 'center',
  },
  closeBtn: {
    alignSelf: 'flex-end',
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.lg,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 6,
    elevation: 2,
  },
  celebrationWrap: {
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  checkCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: COLORS.coral,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: COLORS.coral,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 16,
    elevation: 8,
  },
  headline: {
    fontSize: 26,
    fontWeight: '800',
    color: COLORS.charcoal,
    textAlign: 'center',
    marginBottom: 8,
  },
  subheadline: {
    fontSize: 16,
    color: COLORS.textLight,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: SPACING.lg,
  },
  recapCard: {
    width: '100%',
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    borderLeftWidth: 4,
    marginBottom: SPACING.lg,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  recapHeader: { flexDirection: 'row', alignItems: 'center', gap: 4, marginBottom: 4 },
  recapCategory: { fontSize: 12, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 0.5 },
  recapTitle: { fontSize: 16, fontWeight: '700', color: COLORS.charcoal, marginBottom: 4 },
  recapNote: { fontSize: 14, color: COLORS.textLight, fontStyle: 'italic', lineHeight: 20 },

  sectionLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.textLight,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    alignSelf: 'flex-start',
    marginBottom: 4,
  },
  linkHint: {
    fontSize: 14,
    color: COLORS.textLight,
    alignSelf: 'flex-start',
    marginBottom: SPACING.sm,
    lineHeight: 20,
  },
  linkBox: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    borderWidth: 1.5,
    borderColor: COLORS.coralLight,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    marginBottom: SPACING.lg,
    gap: 8,
  },
  linkIcon: { flexShrink: 0 },
  linkText: { flex: 1, fontSize: 14, color: COLORS.coral, fontWeight: '500' },
  copyBtn: {
    padding: 6,
    backgroundColor: '#F0F7F4',
    borderRadius: RADIUS.md,
  },

  shareBtn: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.coral,
    borderRadius: RADIUS.lg,
    paddingVertical: 18,
    gap: 8,
    marginBottom: SPACING.md,
    shadowColor: COLORS.coral,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 4,
  },
  shareBtnText: { fontSize: 17, fontWeight: '700', color: COLORS.white },

  doneBtn: {
    width: '100%',
    paddingVertical: 14,
    alignItems: 'center',
    borderRadius: RADIUS.lg,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    marginBottom: SPACING.lg,
    backgroundColor: COLORS.white,
  },
  doneBtnText: { fontSize: 16, fontWeight: '600', color: COLORS.textLight },

  streakCallout: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: COLORS.coralLight,
    padding: SPACING.md,
    borderRadius: RADIUS.lg,
    width: '100%',
  },
  streakCalloutText: { fontSize: 14, color: COLORS.coralDark, fontWeight: '500', flex: 1 },
});
