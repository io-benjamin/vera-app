import { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  Modal,
  Linking,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '../context/AppContext';
import { COLORS, SPACING, RADIUS } from '../constants';

const PRIVACY_URL = 'https://tryvera.app/privacy';
const FEEDBACK_EMAIL = 'hello@tryvera.app';

// ─── About modal ─────────────────────────────────────────────────────────────

function AboutModal({ visible, onClose }) {
  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <SafeAreaView style={aboutStyles.container}>
        <View style={aboutStyles.header}>
          <Text style={aboutStyles.headerTitle}>About Vera</Text>
          <TouchableOpacity onPress={onClose} style={aboutStyles.closeBtn}>
            <Ionicons name="close" size={20} color={COLORS.charcoal} />
          </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={aboutStyles.scroll} showsVerticalScrollIndicator={false}>
          {/* Logo */}
          <View style={aboutStyles.logoWrap}>
            <View style={aboutStyles.logoCircle}>
              <Ionicons name="leaf-outline" size={36} color={COLORS.coral} />
            </View>
            <Text style={aboutStyles.logoText}>vera</Text>
            <Text style={aboutStyles.tagline}>Real connection, daily.</Text>
          </View>

          {/* Mission */}
          <View style={aboutStyles.section}>
            <Text style={aboutStyles.sectionTitle}>Our mission</Text>
            <Text style={aboutStyles.body}>
              Loneliness is one of the defining challenges of our time. Vera exists to fight it — not with feeds, followers, or algorithms, but with one small human moment per day.
            </Text>
            <Text style={[aboutStyles.body, { marginTop: SPACING.sm }]}>
              Every task is designed to get you off your phone and into the world, connecting with real people around you. The share link isn't about social proof — it's a gentle nudge to close the loop with someone you actually spent time with.
            </Text>
          </View>

          {/* How it works */}
          <View style={aboutStyles.section}>
            <Text style={aboutStyles.sectionTitle}>How it works</Text>
            {[
              { icon: 'sunny-outline', text: 'Get one task each morning — chosen for you.' },
              { icon: 'people-outline', text: 'Do it with a real person in your life.' },
              { icon: 'link-outline', text: 'Share your Vera link with them as a record of the moment.' },
              { icon: 'flame-outline', text: 'Build a streak of consecutive days.' },
            ].map((item, i) => (
              <View key={i} style={aboutStyles.howRow}>
                <View style={aboutStyles.howIcon}>
                  <Ionicons name={item.icon} size={18} color={COLORS.coral} />
                </View>
                <Text style={aboutStyles.howText}>{item.text}</Text>
              </View>
            ))}
          </View>

          {/* Version */}
          <View style={aboutStyles.versionWrap}>
            <Text style={aboutStyles.versionText}>Vera v0.1.0 · prototype</Text>
            <Text style={aboutStyles.versionSub}>Built with care in 2025.</Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
}

// ─── Reusable row ─────────────────────────────────────────────────────────────

function SettingsRow({ icon, label, value, onPress, destructive }) {
  return (
    <TouchableOpacity
      style={styles.settingsRow}
      onPress={onPress}
      activeOpacity={0.7}
      disabled={!onPress}
    >
      <View style={[styles.settingsIcon, destructive && styles.settingsIconDestructive]}>
        <Ionicons name={icon} size={18} color={destructive ? '#E74C3C' : COLORS.charcoal} />
      </View>
      <Text style={[styles.settingsLabel, destructive && styles.settingsLabelDestructive]}>
        {label}
      </Text>
      {value ? (
        <Text style={styles.settingsValue}>{value}</Text>
      ) : onPress ? (
        <Ionicons name="chevron-forward" size={16} color={COLORS.textMuted} />
      ) : null}
    </TouchableOpacity>
  );
}

// ─── Screen ───────────────────────────────────────────────────────────────────

export default function ProfileScreen({ navigation }) {
  const { user, signOut, completions } = useApp();
  const [aboutVisible, setAboutVisible] = useState(false);

  const userName = user?.name ?? 'Guest';
  const userEmail = user?.email ?? '';
  const streak = user?.streak_count ?? 0;
  const total = user?.total_completions ?? completions.length;
  const longest = user?.longest_streak ?? streak;
  const memberSince = user?.created_at
    ? new Date(user.created_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
    : 'Recently';

  const handleSignOut = () => {
    Alert.alert('Sign out', 'Are you sure you want to sign out?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Sign out',
        style: 'destructive',
        onPress: async () => {
          await signOut();
          navigation.replace('Auth');
        },
      },
    ]);
  };

  const handleFeedback = () => {
    const url = `mailto:${FEEDBACK_EMAIL}?subject=${encodeURIComponent('Vera feedback')}`;
    Linking.canOpenURL(url).then((supported) => {
      if (supported) {
        Linking.openURL(url);
      } else {
        Alert.alert('Send feedback', `Email us at ${FEEDBACK_EMAIL}`);
      }
    });
  };

  const handlePrivacy = () => {
    Linking.openURL(PRIVACY_URL).catch(() =>
      Alert.alert('Privacy policy', `Visit ${PRIVACY_URL}`)
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <AboutModal visible={aboutVisible} onClose={() => setAboutVisible(false)} />

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Profile header */}
        <View style={styles.profileHeader}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {userName.split(' ').map((w) => w[0]).slice(0, 2).join('').toUpperCase() || '?'}
            </Text>
          </View>
          <Text style={styles.profileName}>{userName}</Text>
          <Text style={styles.profileEmail}>{userEmail}</Text>
          <Text style={styles.memberSince}>Member since {memberSince}</Text>
        </View>

        {/* Stats */}
        <View style={styles.statsGrid}>
          <View style={styles.statItem}>
            <Ionicons name="flame" size={22} color={COLORS.coral} />
            <Text style={styles.statNum}>{streak}</Text>
            <Text style={styles.statLbl}>Day streak</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Ionicons name="people-outline" size={22} color="#4A90D9" />
            <Text style={styles.statNum}>{total}</Text>
            <Text style={styles.statLbl}>Total connections</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Ionicons name="trophy-outline" size={22} color={COLORS.forest} />
            <Text style={styles.statNum}>{longest}</Text>
            <Text style={styles.statLbl}>Best streak</Text>
          </View>
        </View>

        {/* Account */}
        <Text style={styles.sectionLabel}>Account</Text>
        <View style={styles.settingsCard}>
          <SettingsRow icon="person-outline" label="Edit profile" onPress={() => {}} />
          <SettingsRow icon="mail-outline" label="Email" value={userEmail} />
          <SettingsRow icon="lock-closed-outline" label="Change password" onPress={() => {}} />
        </View>

        {/* Preferences */}
        <Text style={styles.sectionLabel}>Preferences</Text>
        <View style={styles.settingsCard}>
          <SettingsRow icon="notifications-outline" label="Daily reminders" value="Off" onPress={() => {}} />
          <SettingsRow icon="globe-outline" label="Share link visibility" value="Public" onPress={() => {}} />
        </View>

        {/* About */}
        <Text style={styles.sectionLabel}>About</Text>
        <View style={styles.settingsCard}>
          <SettingsRow
            icon="information-circle-outline"
            label="About Vera"
            onPress={() => setAboutVisible(true)}
          />
          <SettingsRow
            icon="chatbubble-outline"
            label="Send feedback"
            onPress={handleFeedback}
          />
          <SettingsRow
            icon="document-text-outline"
            label="Privacy policy"
            onPress={handlePrivacy}
          />
        </View>

        {/* Sign out */}
        <View style={[styles.settingsCard, { marginBottom: SPACING.xxl }]}>
          <SettingsRow icon="log-out-outline" label="Sign out" onPress={handleSignOut} destructive />
        </View>

        <Text style={styles.tagline}>Real connection, daily.</Text>
        <Text style={styles.version}>Vera v0.1.0 · prototype</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.cream },
  scroll: { paddingHorizontal: SPACING.lg, paddingBottom: SPACING.xl },

  profileHeader: { alignItems: 'center', paddingVertical: SPACING.xl },
  avatar: {
    width: 80, height: 80, borderRadius: 40,
    backgroundColor: COLORS.coral,
    justifyContent: 'center', alignItems: 'center',
    marginBottom: SPACING.md,
    shadowColor: COLORS.coral,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3, shadowRadius: 10, elevation: 4,
  },
  avatarText: { fontSize: 28, fontWeight: '800', color: COLORS.white },
  profileName: { fontSize: 22, fontWeight: '800', color: COLORS.charcoal, marginBottom: 2 },
  profileEmail: { fontSize: 14, color: COLORS.textLight, marginBottom: 4 },
  memberSince: { fontSize: 12, color: COLORS.textMuted },

  statsGrid: {
    flexDirection: 'row', backgroundColor: COLORS.white,
    borderRadius: RADIUS.xl, padding: SPACING.md, marginBottom: SPACING.lg,
    shadowColor: '#000', shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05, shadowRadius: 6, elevation: 2,
  },
  statItem: { flex: 1, alignItems: 'center', gap: 4 },
  statDivider: { width: 1, backgroundColor: COLORS.border, marginVertical: 4 },
  statNum: { fontSize: 22, fontWeight: '800', color: COLORS.charcoal },
  statLbl: { fontSize: 11, color: COLORS.textLight, textAlign: 'center' },

  sectionLabel: {
    fontSize: 13, fontWeight: '700', color: COLORS.textLight,
    textTransform: 'uppercase', letterSpacing: 0.8,
    marginBottom: SPACING.sm, marginTop: SPACING.xs,
  },
  settingsCard: {
    backgroundColor: COLORS.white, borderRadius: RADIUS.xl,
    marginBottom: SPACING.lg, overflow: 'hidden',
    shadowColor: '#000', shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05, shadowRadius: 6, elevation: 2,
  },
  settingsRow: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: SPACING.md, paddingVertical: 14,
    borderBottomWidth: 1, borderBottomColor: COLORS.border, gap: SPACING.sm,
  },
  settingsIcon: {
    width: 32, height: 32, borderRadius: 8,
    backgroundColor: COLORS.cream, justifyContent: 'center', alignItems: 'center',
  },
  settingsIconDestructive: { backgroundColor: '#FDE8E4' },
  settingsLabel: { flex: 1, fontSize: 15, color: COLORS.charcoal, fontWeight: '500' },
  settingsLabelDestructive: { color: '#E74C3C' },
  settingsValue: { fontSize: 14, color: COLORS.textMuted },

  tagline: { textAlign: 'center', fontSize: 14, color: COLORS.textLight, fontWeight: '600' },
  version: { textAlign: 'center', fontSize: 12, color: COLORS.textMuted, marginTop: 4 },
});

const aboutStyles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.cream },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: SPACING.lg, paddingVertical: SPACING.md,
    borderBottomWidth: 1, borderBottomColor: COLORS.border,
    backgroundColor: COLORS.white,
  },
  headerTitle: { fontSize: 17, fontWeight: '700', color: COLORS.charcoal },
  closeBtn: {
    width: 32, height: 32, borderRadius: 16,
    backgroundColor: COLORS.cream, justifyContent: 'center', alignItems: 'center',
  },
  scroll: { paddingHorizontal: SPACING.lg, paddingBottom: SPACING.xxl },

  logoWrap: { alignItems: 'center', paddingVertical: SPACING.xl },
  logoCircle: {
    width: 72, height: 72, borderRadius: 36,
    backgroundColor: COLORS.coralLight,
    justifyContent: 'center', alignItems: 'center', marginBottom: SPACING.sm,
  },
  logoText: { fontSize: 32, fontWeight: '800', color: COLORS.charcoal, letterSpacing: -1 },
  tagline: { fontSize: 14, color: COLORS.textLight, marginTop: 4 },

  section: {
    backgroundColor: COLORS.white, borderRadius: RADIUS.xl,
    padding: SPACING.lg, marginBottom: SPACING.lg,
    shadowColor: '#000', shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05, shadowRadius: 6, elevation: 2,
  },
  sectionTitle: {
    fontSize: 16, fontWeight: '700', color: COLORS.charcoal, marginBottom: SPACING.sm,
  },
  body: { fontSize: 15, color: COLORS.textLight, lineHeight: 23 },

  howRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 12, marginBottom: SPACING.sm },
  howIcon: {
    width: 32, height: 32, borderRadius: 8,
    backgroundColor: COLORS.coralLight, justifyContent: 'center', alignItems: 'center',
    flexShrink: 0, marginTop: 1,
  },
  howText: { flex: 1, fontSize: 15, color: COLORS.textLight, lineHeight: 22 },

  versionWrap: { alignItems: 'center', paddingVertical: SPACING.lg },
  versionText: { fontSize: 13, color: COLORS.textMuted },
  versionSub: { fontSize: 12, color: COLORS.textMuted, marginTop: 2 },
});
