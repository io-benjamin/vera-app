import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '../context/AppContext';
import { COLORS, SPACING, RADIUS, CATEGORY_META } from '../constants';

function greeting() {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning';
  if (h < 17) return 'Good afternoon';
  return 'Good evening';
}

function formatDate() {
  return new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });
}

// Last 7 days streak dots
function WeekDots({ completions }) {
  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    return d;
  });

  const completedDates = new Set(
    completions.map((c) => new Date(c.completed_at).toDateString())
  );

  return (
    <View style={styles.weekRow}>
      {days.map((d, i) => {
        const isToday = d.toDateString() === new Date().toDateString();
        const done = completedDates.has(d.toDateString());
        const dayLabel = d.toLocaleDateString('en-US', { weekday: 'narrow' });
        return (
          <View key={i} style={styles.weekItem}>
            <Text style={[styles.weekLabel, isToday && styles.weekLabelToday]}>
              {dayLabel}
            </Text>
            <View
              style={[
                styles.weekDot,
                done && styles.weekDotDone,
                isToday && !done && styles.weekDotToday,
              ]}
            >
              {done && <Ionicons name="checkmark" size={10} color={COLORS.white} />}
            </View>
          </View>
        );
      })}
    </View>
  );
}

function TaskCard({ task, onPress }) {
  const meta = CATEGORY_META[task.category] || CATEGORY_META.social;
  return (
    <TouchableOpacity style={styles.taskCard} onPress={onPress} activeOpacity={0.85}>
      <View style={styles.taskCardHeader}>
        <View style={[styles.categoryBadge, { backgroundColor: meta.color + '20' }]}>
          <Ionicons name={meta.icon} size={14} color={meta.color} />
          <Text style={[styles.categoryText, { color: meta.color }]}>{meta.label}</Text>
        </View>
        <Text style={styles.difficultyText}>{task.difficulty}</Text>
      </View>
      <Text style={styles.taskTitle}>{task.title}</Text>
      <Text style={styles.taskDescription} numberOfLines={2}>
        {task.description}
      </Text>
      <View style={styles.taskCardFooter}>
        <Text style={styles.viewTaskText}>View task</Text>
        <Ionicons name="arrow-forward" size={16} color={COLORS.coral} />
      </View>
    </TouchableOpacity>
  );
}

function CompletedCard({ completion, onSharePress }) {
  return (
    <View style={styles.completedCard}>
      <View style={styles.completedIcon}>
        <Ionicons name="checkmark-circle" size={36} color={COLORS.forest} />
      </View>
      <Text style={styles.completedTitle}>You did it today!</Text>
      {completion.person_name ? (
        <Text style={styles.completedSubtitle}>
          You connected with <Text style={{ fontWeight: '700' }}>{completion.person_name}</Text>
        </Text>
      ) : (
        <Text style={styles.completedSubtitle}>Great job showing up today.</Text>
      )}
      <TouchableOpacity style={styles.shareAgainBtn} onPress={onSharePress} activeOpacity={0.85}>
        <Ionicons name="share-outline" size={16} color={COLORS.forest} />
        <Text style={styles.shareAgainText}>Share your link</Text>
      </TouchableOpacity>
    </View>
  );
}

export default function HomeScreen({ navigation }) {
  const { user, todayTask, completions, todayCompletion } = useApp();
  const streak = user?.streak_count ?? 0;
  const userName = user?.name ?? 'there';

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>{greeting()}, {userName} 👋</Text>
            <Text style={styles.dateText}>{formatDate()}</Text>
          </View>
        </View>

        {/* Streak card */}
        <View style={styles.streakCard}>
          <View style={styles.streakLeft}>
            <Ionicons name="flame" size={28} color={COLORS.coral} />
            <View style={{ marginLeft: 10 }}>
              <Text style={styles.streakCount}>{streak} day streak</Text>
              <Text style={styles.streakSub}>Keep the momentum going</Text>
            </View>
          </View>
          <WeekDots completions={completions} />
        </View>

        {/* Section label */}
        <Text style={styles.sectionLabel}>Today's task</Text>

        {/* Task or completed state */}
        {todayCompletion ? (
          <CompletedCard
            completion={todayCompletion}
            onSharePress={() =>
              navigation.navigate('ShareLink', { completion: todayCompletion })
            }
          />
        ) : (
          <TaskCard
            task={todayTask}
            onPress={() => navigation.navigate('TaskDetail')}
          />
        )}

        {/* Recent connections */}
        {completions.length > 0 && (
          <>
            <Text style={styles.sectionLabel}>Recent connections</Text>
            <View style={styles.recentList}>
              {completions.slice(0, 3).map((c) => {
                const meta = CATEGORY_META[c.task?.category] || CATEGORY_META.social;
                const daysAgo = Math.round(
                  (Date.now() - new Date(c.completed_at)) / 86400000
                );
                return (
                  <View key={c.id} style={styles.recentItem}>
                    <View style={[styles.recentDot, { backgroundColor: meta.color + '25' }]}>
                      <Ionicons name={meta.icon} size={16} color={meta.color} />
                    </View>
                    <View style={styles.recentText}>
                      <Text style={styles.recentTitle} numberOfLines={1}>
                        {c.task?.title}
                      </Text>
                      {c.person_name && (
                        <Text style={styles.recentSub}>with {c.person_name}</Text>
                      )}
                    </View>
                    <Text style={styles.recentDate}>
                      {daysAgo === 0 ? 'Today' : daysAgo === 1 ? 'Yesterday' : `${daysAgo}d ago`}
                    </Text>
                  </View>
                );
              })}
            </View>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.cream },
  scroll: { paddingHorizontal: SPACING.lg, paddingBottom: SPACING.xxl },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingTop: SPACING.md,
    marginBottom: SPACING.lg,
  },
  greeting: { fontSize: 22, fontWeight: '700', color: COLORS.charcoal },
  dateText: { fontSize: 14, color: COLORS.textLight, marginTop: 2 },

  streakCard: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.xl,
    padding: SPACING.md,
    marginBottom: SPACING.lg,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  streakLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  streakCount: { fontSize: 17, fontWeight: '700', color: COLORS.charcoal },
  streakSub: { fontSize: 12, color: COLORS.textLight, marginTop: 2 },

  weekRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  weekItem: { alignItems: 'center', gap: 4 },
  weekLabel: { fontSize: 11, color: COLORS.textMuted, fontWeight: '500' },
  weekLabelToday: { color: COLORS.coral, fontWeight: '700' },
  weekDot: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: COLORS.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  weekDotDone: { backgroundColor: COLORS.coral },
  weekDotToday: { borderWidth: 2, borderColor: COLORS.coral },

  sectionLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.textLight,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: SPACING.sm,
    marginTop: SPACING.xs,
  },

  taskCard: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.xl,
    padding: SPACING.lg,
    marginBottom: SPACING.lg,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 10,
    elevation: 3,
  },
  taskCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  categoryBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: RADIUS.round,
    gap: 4,
  },
  categoryText: { fontSize: 12, fontWeight: '600' },
  difficultyText: {
    fontSize: 12,
    color: COLORS.textMuted,
    textTransform: 'capitalize',
  },
  taskTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: COLORS.charcoal,
    marginBottom: SPACING.sm,
    lineHeight: 28,
  },
  taskDescription: {
    fontSize: 15,
    color: COLORS.textLight,
    lineHeight: 22,
    marginBottom: SPACING.md,
  },
  taskCardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  viewTaskText: { fontSize: 14, fontWeight: '600', color: COLORS.coral },

  completedCard: {
    backgroundColor: '#F0F7F4',
    borderRadius: RADIUS.xl,
    padding: SPACING.lg,
    alignItems: 'center',
    marginBottom: SPACING.lg,
    borderWidth: 1.5,
    borderColor: COLORS.forestLight + '40',
  },
  completedIcon: { marginBottom: SPACING.sm },
  completedTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.forest,
    marginBottom: 4,
  },
  completedSubtitle: {
    fontSize: 15,
    color: COLORS.forestLight,
    textAlign: 'center',
    marginBottom: SPACING.md,
  },
  shareAgainBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 10,
    paddingHorizontal: SPACING.md,
    borderRadius: RADIUS.round,
    borderWidth: 1.5,
    borderColor: COLORS.forest,
  },
  shareAgainText: { fontSize: 14, fontWeight: '600', color: COLORS.forest },

  recentList: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.xl,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  recentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    gap: 12,
  },
  recentDot: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  recentText: { flex: 1 },
  recentTitle: { fontSize: 14, fontWeight: '600', color: COLORS.charcoal },
  recentSub: { fontSize: 12, color: COLORS.textLight, marginTop: 1 },
  recentDate: { fontSize: 12, color: COLORS.textMuted },
});
