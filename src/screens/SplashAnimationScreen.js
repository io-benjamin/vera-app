import { useEffect, useRef, useState } from 'react';
import { View, Text, Animated, StyleSheet, Dimensions } from 'react-native';
import Svg, { Line, Circle, Path } from 'react-native-svg';
import { COLORS } from '../constants';

const { width: SW } = Dimensions.get('window');
const STAGE = Math.min(SW - 60, 280);
const S = STAGE / 240; // scale 240×240 design space → actual size

// ─── Node positions (top-left corner in 240×240 space) ───────────────────────

const CENTER = { left: 103, top: 103, size: 34 };

const PRIMARY = [
  { left: 106, top: 30, size: 28 },   // p1 – top
  { left: 175, top: 60, size: 28 },   // p2 – top-right
  { left: 175, top: 150, size: 28 },  // p3 – bottom-right
  { left: 106, top: 180, size: 28 },  // p4 – bottom
  { left: 37, top: 150, size: 28 },   // p5 – bottom-left
  { left: 37, top: 60, size: 28 },    // p6 – top-left
];

const SECONDARY = [
  { left: 70, top: 5, size: 20 },    // s1a
  { left: 150, top: 5, size: 20 },   // s1b
  { left: 205, top: 25, size: 20 },  // s2a
  { left: 215, top: 85, size: 20 },  // s2b
  { left: 215, top: 145, size: 20 }, // s3a
  { left: 205, top: 185, size: 20 }, // s3b
  { left: 150, top: 210, size: 20 }, // s4a
  { left: 70, top: 210, size: 20 },  // s4b
  { left: 10, top: 185, size: 20 },  // s5a
  { left: 5, top: 145, size: 20 },   // s5b
  { left: 5, top: 85, size: 20 },    // s6a
  { left: 10, top: 25, size: 20 },   // s6b
];

// ─── Connection lines (240×240 SVG coordinate space) ─────────────────────────

const PRIMARY_LINES = [
  { x1: 120, y1: 100, x2: 120, y2: 55 },
  { x1: 135, y1: 105, x2: 185, y2: 75 },
  { x1: 135, y1: 135, x2: 185, y2: 165 },
  { x1: 120, y1: 140, x2: 120, y2: 185 },
  { x1: 105, y1: 135, x2: 55, y2: 165 },
  { x1: 105, y1: 105, x2: 55, y2: 75 },
];

const SECONDARY_LINES = [
  { x1: 115, y1: 45, x2: 85, y2: 18 },
  { x1: 125, y1: 45, x2: 160, y2: 18 },
  { x1: 195, y1: 70, x2: 218, y2: 40 },
  { x1: 200, y1: 82, x2: 225, y2: 98 },
  { x1: 200, y1: 162, x2: 225, y2: 155 },
  { x1: 195, y1: 172, x2: 218, y2: 198 },
  { x1: 125, y1: 195, x2: 160, y2: 220 },
  { x1: 115, y1: 195, x2: 85, y2: 220 },
  { x1: 45, y1: 172, x2: 22, y2: 198 },
  { x1: 42, y1: 162, x2: 18, y2: 155 },
  { x1: 42, y1: 82, x2: 18, y2: 98 },
  { x1: 45, y1: 70, x2: 22, y2: 40 },
];

// ─── Person icon ──────────────────────────────────────────────────────────────

function PersonIcon({ size, color }) {
  return (
    <Svg viewBox="0 0 40 40" width={size} height={size}>
      <Circle
        cx="20" cy="11" r="7"
        fill="none"
        stroke={color} strokeWidth="2.5"
        strokeLinecap="round" strokeLinejoin="round"
      />
      <Path
        d="M7 35 C7 25, 13 19, 20 19 C27 19, 33 25, 33 35"
        fill="none"
        stroke={color} strokeWidth="2.5"
        strokeLinecap="round" strokeLinejoin="round"
      />
    </Svg>
  );
}

// ─── Main screen ──────────────────────────────────────────────────────────────

export default function SplashAnimationScreen({ onComplete }) {
  // Defer all SVG rendering until after the first paint to prevent
  // react-native-svg flashing its native placeholder on the new architecture
  const [svgReady, setSvgReady] = useState(false);

  // All animations use native driver — Animated.View opacity/transform only
  const centerOpacity   = useRef(new Animated.Value(0)).current;
  const centerScale     = useRef(new Animated.Value(0.7)).current;
  const primaryOpacities = useRef(PRIMARY.map(() => new Animated.Value(0))).current;
  const primaryScales   = useRef(PRIMARY.map(() => new Animated.Value(0.7))).current;
  const secondaryOpacities = useRef(SECONDARY.map(() => new Animated.Value(0))).current;
  // Line groups are wrapped in Animated.View → native driver safe
  const primaryLinesAnim   = useRef(new Animated.Value(0)).current;
  const secondaryLinesAnim = useRef(new Animated.Value(0)).current;
  // Logo
  const logoOpacity    = useRef(new Animated.Value(0)).current;
  const logoScale      = useRef(new Animated.Value(0.6)).current;
  const taglineOpacity = useRef(new Animated.Value(0)).current;

  // Mark SVGs ready after first paint — prevents react-native-svg from
  // flashing its native placeholder rectangle on the new architecture
  useEffect(() => {
    const id = requestAnimationFrame(() => setSvgReady(true));
    return () => cancelAnimationFrame(id);
  }, []);

  useEffect(() => {
    if (!svgReady) return;
    // ── Phase 1 (0 ms): center person + primary network ──────────────────────
    Animated.parallel([
      Animated.timing(centerOpacity, { toValue: 1, duration: 300, useNativeDriver: true }),
      Animated.timing(centerScale,   { toValue: 1, duration: 300, useNativeDriver: true }),
      ...primaryOpacities.map((a, i) =>
        Animated.timing(a, { toValue: 1, duration: 250, delay: 300 + i * 100, useNativeDriver: true })
      ),
      ...primaryScales.map((a, i) =>
        Animated.timing(a, { toValue: 1, duration: 250, delay: 300 + i * 100, useNativeDriver: true })
      ),
      Animated.timing(primaryLinesAnim, { toValue: 0.5, duration: 500, delay: 350, useNativeDriver: true }),
    ]).start();

    // ── Phase 2 (1200 ms): secondary network ─────────────────────────────────
    const t2 = setTimeout(() => {
      Animated.parallel([
        ...secondaryOpacities.map((a, i) =>
          Animated.timing(a, { toValue: 0.7, duration: 200, delay: i * 50, useNativeDriver: true })
        ),
        Animated.timing(secondaryLinesAnim, { toValue: 0.3, duration: 600, useNativeDriver: true }),
      ]).start();
    }, 1200);

    // ── Phase 3 (2200 ms): fade everything out ────────────────────────────────
    const t3 = setTimeout(() => {
      Animated.parallel([
        Animated.timing(centerOpacity,       { toValue: 0, duration: 400, useNativeDriver: true }),
        Animated.timing(primaryLinesAnim,    { toValue: 0, duration: 400, useNativeDriver: true }),
        Animated.timing(secondaryLinesAnim,  { toValue: 0, duration: 400, useNativeDriver: true }),
        ...primaryOpacities.map(a =>
          Animated.timing(a, { toValue: 0, duration: 400, useNativeDriver: true })
        ),
        ...secondaryOpacities.map(a =>
          Animated.timing(a, { toValue: 0, duration: 400, useNativeDriver: true })
        ),
      ]).start();
    }, 2200);

    // ── Phase 4 (2650 ms): logo springs in ────────────────────────────────────
    const t4 = setTimeout(() => {
      Animated.parallel([
        Animated.timing(logoOpacity, { toValue: 1, duration: 400, useNativeDriver: true }),
        Animated.spring(logoScale,   { toValue: 1, tension: 40, friction: 7, useNativeDriver: true }),
      ]).start();
    }, 2650);

    // Tagline fades in 300 ms after logo
    const t4b = setTimeout(() => {
      Animated.timing(taglineOpacity, { toValue: 1, duration: 400, useNativeDriver: true }).start();
    }, 2950);

    // Hold the logo for 1.8 s, then hand off
    const tDone = setTimeout(onComplete, 4800);

    return () => [t2, t3, t4, t4b, tDone].forEach(clearTimeout);
  }, [svgReady]);

  // Scaled absolute-position style for a node
  const nodeStyle = ({ left, top, size }) => ({
    position: 'absolute',
    left: left * S,
    top: top * S,
    width: size * S,
    height: size * S,
  });

  return (
    <View style={styles.container}>
      <View style={{ width: STAGE, height: STAGE }}>

        {svgReady && (
          <>
            {/* ── Primary connection lines ───────────────────────────────── */}
            <Animated.View style={[StyleSheet.absoluteFill, { opacity: primaryLinesAnim }]}>
              <Svg width={STAGE} height={STAGE} viewBox="0 0 240 240">
                {PRIMARY_LINES.map((l, i) => (
                  <Line key={i} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2}
                    stroke={COLORS.coral} strokeWidth="1.5" strokeDasharray="6 4" />
                ))}
              </Svg>
            </Animated.View>

            {/* ── Secondary connection lines ─────────────────────────────── */}
            <Animated.View style={[StyleSheet.absoluteFill, { opacity: secondaryLinesAnim }]}>
              <Svg width={STAGE} height={STAGE} viewBox="0 0 240 240">
                {SECONDARY_LINES.map((l, i) => (
                  <Line key={i} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2}
                    stroke={COLORS.coral} strokeWidth="1" strokeDasharray="4 3" />
                ))}
              </Svg>
            </Animated.View>

            {/* ── Center person (you) ───────────────────────────────────── */}
            <Animated.View style={[
              nodeStyle(CENTER),
              { opacity: centerOpacity, transform: [{ scale: centerScale }] },
            ]}>
              <PersonIcon size={CENTER.size * S} color={COLORS.charcoal} />
            </Animated.View>

            {/* ── Primary network (6 people) ────────────────────────────── */}
            {PRIMARY.map((pos, i) => (
              <Animated.View key={`p${i}`} style={[
                nodeStyle(pos),
                { opacity: primaryOpacities[i], transform: [{ scale: primaryScales[i] }] },
              ]}>
                <PersonIcon size={pos.size * S} color={COLORS.coral} />
              </Animated.View>
            ))}

            {/* ── Secondary network (friends-of-friends) ────────────────── */}
            {SECONDARY.map((pos, i) => (
              <Animated.View key={`s${i}`} style={[nodeStyle(pos), { opacity: secondaryOpacities[i] }]}>
                <PersonIcon size={pos.size * S} color="#FF8E8E" />
              </Animated.View>
            ))}
          </>
        )}

        {/* ── Logo (phase 4) — pure text, no SVG, always rendered ────────── */}
        <Animated.View style={[
          StyleSheet.absoluteFill,
          styles.logoWrap,
          { opacity: logoOpacity, transform: [{ scale: logoScale }] },
        ]}>
          <Text style={styles.logoText}>vera</Text>
          <Animated.Text style={[styles.tagline, { opacity: taglineOpacity }]}>
            Real connection, daily.
          </Animated.Text>
        </Animated.View>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.cream,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoWrap: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    fontSize: 52,
    fontWeight: '800',
    color: COLORS.coral,
    letterSpacing: -2,
  },
  tagline: {
    fontSize: 16,
    color: COLORS.textLight,
    marginTop: 10,
    letterSpacing: 0.3,
  },
});
