import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '../context/AppContext';
import { COLORS, SPACING, RADIUS, CATEGORY_META } from '../constants';

// Last 28 days calendar grid
function MonthGrid({ completions }) {
  const today = new Date();
  const completedDates = new Set(
    completions.map((c) => new Date(c.completed_at).toDateString())
  );

  // Build 4 weeks × 7 days
  const weeks = [];
  for (let w = 3; w >= 0; w--) {
    const week = [];
    for (let d = 6; d >= 0; d--) {
      const date = new Date(today);
      date.setDate(today.getDate() - (w * 7 + d));
      week.unshift({
        date,
        done: completedDates.has(date.toDateString()),
        isToday: date.toDateString() === today.toDateString(),
        isFuture: date > today,
      });
    }
    weeks.unshift(week);
  }

  const dayLabels = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  return (
    <View style={styles.gridContainer}>
      <View style={styles.gridDayRow}>
        {dayLabels.map((d, i) => (
          <Text key={i} style={styles.gridDayLabel}>{d}</Text>
        ))}
      </View>
      {weeks.map((week, wi) => (
        <View key={wi} style={styles.gridWeekRow}>
          {week.map((day, di) => (
            <View
              key={di}
              style={[
                styles.gridCell,
                day.done && styles.gridCellDone,
                day.isToday && !day.done && styles.gridCellToday,
                day.isFuture && styles.gridCellFuture,
              ]}
            >
              {day.done && <Ionicons name="checkmark" size={11} color={COLORS.white} />}
              {day.isToday && !day.done && (
                <View style={styles.gridCellTodayDot} />
              )}
            </View>
          ))}
        </View>
      ))}
    </View>
  );
}

function CompletionRow({ completion }) {
  const meta = CATEGORY_META[completion.task?.category] || CATEGORY_META.social;
  const date = new Date(completion.completed_at);
  const isToday = date.toDateString() === new Date().toDateString();
  const isYesterday = (() => {
    const y = new Date();
    y.setDate(y.getDate() - 1);
    return date.toDateString() === y.toDateString();
  })();

  const dateLabel = isToday
    ? 'Today'
    : isYesterday
    ? 'Yesterday'
    : date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

  return (
    <View style={styles.completionRow}>
      <View style={[styles.completionIcon, { backgroundColor: meta.color + '20' }]}>
        <Ionicons name={meta.icon} size={20} color={meta.color} />
      </View>
      <View style={styles.completionBody}>
        <View style={styles.completionTopRow}>
          <Text style={styles.completionTitle} numberOfLines={1}>
            {completion.task?.title}
          </Text>
          <Text style={styles.completionDate}>{dateLabel}</Text>
        </View>
        {completion.person_name && (
          <Text style={styles.completionWith}>with {completion.person_name}</Text>
        )}
        {completion.note && (
          <Text style={styles.completionNote} numberOfLines={2}>
            "{completion.note}"
          </Text>
        )}
      </View>
    </View>
  );
}

export default function HistoryScreen() {
  const { completions, user } = useApp();
  const streak = user?.streak_count ?? 0;
  const longest = user?.longest_streak ?? streak;
  const total = user?.total_completions ?? completions.length;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.pageTitle}>Your Journey</Text>

        {/* Stats row */}
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Ionicons name="flame" size={24} color={COLORS.coral} />
            <Text style={styles.statNumber}>{streak}</Text>
            <Text style={styles.statLabel}>Current streak</Text>
          </View>
          <View style={styles.statCard}>
            <Ionicons name="trophy-outline" size={24} color={COLORS.forest} />
            <Text style={styles.statNumber}>{longest}</Text>
            <Text style={styles.statLabel}>Best streak</Text>
          </View>
          <View style={styles.statCard}>
            <Ionicons name="people-outline" size={24} color="#4A90D9" />
            <Text style={styles.statNumber}>{total}</Text>
            <Text style={styles.statLabel}>Connections</Text>
          </View>
        </View>

        {/* Calendar grid */}
        <Text style={styles.sectionLabel}>Last 28 days</Text>
        <View style={styles.card}>
          <MonthGrid completions={completions} />
          <View style={styles.gridLegend}>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: COLORS.coral }]} />
              <Text style={styles.legendText}>Completed</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: COLORS.border }]} />
              <Text style={styles.legendText}>Missed</Text>
            </View>
          </View>
        </View>

        {/* Completions list */}
        <Text style={styles.sectionLabel}>All connections</Text>

        {completions.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="leaf-outline" size={40} color={COLORS.textMuted} />
            <Text style={styles.emptyTitle}>No connections yet</Text>
            <Text style={styles.emptySubtitle}>Complete your first task to see your history here.</Text>
          </View>
        ) : (
          <View style={styles.completionsList}>
            {completions.map((c) => (
              <CompletionRow key={c.id} completion={c} />
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.cream },
  scroll: { paddingHorizontal: SPACING.lg, paddingBottom: SPACING.xxl },

  pageTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: COLORS.charcoal,
    paddingTop: SPACING.md,
    marginBottom: SPACING.lg,
  },

  statsRow: {
    flexDirection: 'row',
    gap: SPACING.sm,
    marginBottom: SPACING.lg,
  },
  statCard: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    alignItems: 'center',
    gap: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  statNumber: { fontSize: 22, fontWeight: '800', color: COLORS.charcoal },
  statLabel: { fontSize: 11, color: COLORS.textLight, textAlign: 'center' },

  sectionLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.textLight,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: SPACING.sm,
  },

  card: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.xl,
    padding: SPACING.md,
    marginBottom: SPACING.lg,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },

  gridContainer: { gap: 4 },
  gridDayRow: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 4 },
  gridDayLabel: { width: 32, textAlign: 'center', fontSize: 11, color: COLORS.textMuted, fontWeight: '600' },
  gridWeekRow: { flexDirection: 'row', justifyContent: 'space-around' },
  gridCell: {
    width: 32,
    height: 32,
    borderRadius: RADIUS.sm,
    backgroundColor: COLORS.border,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 2,
  },
  gridCellDone: { backgroundColor: COLORS.coral },
  gridCellToday: { borderWidth: 2, borderColor: COLORS.coral, backgroundColor: COLORS.white },
  gridCellFuture: { backgroundColor: 'transparent' },
  gridCellTodayDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.coral,
  },
  gridLegend: {
    flexDirection: 'row',
    gap: SPACING.md,
    marginTop: SPACING.md,
    justifyContent: 'flex-end',
  },
  legendItem: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  legendDot: { width: 10, height: 10, borderRadius: 5 },
  legendText: { fontSize: 12, color: COLORS.textLight },

  completionsList: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.xl,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  completionRow: {
    flexDirection: 'row',
    padding: SPACING.md,
    gap: SPACING.sm,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    alignItems: 'flex-start',
  },
  completionIcon: {
    width: 42,
    height: 42,
    borderRadius: 21,
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
  },
  completionBody: { flex: 1 },
  completionTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 2,
    gap: SPACING.sm,
  },
  completionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.charcoal,
    flex: 1,
  },
  completionDate: { fontSize: 12, color: COLORS.textMuted, flexShrink: 0 },
  completionWith: { fontSize: 13, color: COLORS.textLight, marginBottom: 2 },
  completionNote: { fontSize: 13, color: COLORS.textLight, fontStyle: 'italic', lineHeight: 19 },

  emptyState: {
    alignItems: 'center',
    paddingVertical: SPACING.xxl,
    gap: SPACING.sm,
  },
  emptyTitle: { fontSize: 18, fontWeight: '700', color: COLORS.textLight },
  emptySubtitle: { fontSize: 14, color: COLORS.textMuted, textAlign: 'center', maxWidth: 260 },
});
