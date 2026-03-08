# Vera — Splash Animation Spec

## Style: Geometric

Clean outline icons, minimal strokes, modern feel.

---

## Icon Design

```svg
    ╭────╮
    │    │   ← Circle head (stroke, not fill)
    ╰────╯
   ╱      ╲  
  │        │ ← Curved body/shoulders (stroke)
```

**Specs:**
- Stroke width: 2px
- Stroke color (you): Charcoal `#2C2C2C`
- Stroke color (others): Coral `#FF6B6B`
- Line cap: Round
- No fill

---

## Animation Sequence

### Frame 1: You (0.0s)
```
┌─────────────────────────────────┐
│                                 │
│                                 │
│                                 │
│             [you]               │
│               ●                 │
│                                 │
│                                 │
│                                 │
└─────────────────────────────────┘
```
- Single person icon, center
- Charcoal stroke
- Fade in + slight scale up

### Frame 2: First Connection (0.4s)
```
┌─────────────────────────────────┐
│                                 │
│          [1]                    │
│             ╲                   │
│              [you]              │
│                                 │
│                                 │
│                                 │
│                                 │
└─────────────────────────────────┘
```
- Second person fades in (top-left)
- Coral stroke
- Dashed line connects to center
- Line animates (draws in)

### Frame 3: Growing Circle (0.8s)
```
┌─────────────────────────────────┐
│                                 │
│          [1]      [2]           │
│             ╲    ╱              │
│              [you]              │
│             ╱                   │
│          [3]                    │
│                                 │
│                                 │
└─────────────────────────────────┘
```
- More people fade in
- Each connected by dashed line
- Staggered timing (0.2s apart)

### Frame 4: Full Circle (1.4s)
```
┌─────────────────────────────────┐
│                                 │
│       [1]    [2]    [3]         │
│          ╲    │    ╱            │
│     [4]── [you] ──[5]           │
│          ╱    │    ╲            │
│       [6]    [7]    [8]         │
│                                 │
│                                 │
└─────────────────────────────────┘
```
- 7-8 people surrounding center
- All connected
- Forms a constellation/network

### Frame 5: Converge (1.8s)
```
┌─────────────────────────────────┐
│                                 │
│                                 │
│         ╲  │  ╱                 │
│          ╲ │ ╱                  │
│           ─●─                   │
│          ╱ │ ╲                  │
│         ╱  │  ╲                 │
│                                 │
│                                 │
└─────────────────────────────────┘
```
- All people move toward center
- Merge into single point
- Lines collapse inward

### Frame 6: Logo Reveal (2.2s)
```
┌─────────────────────────────────┐
│                                 │
│                                 │
│                                 │
│             vera                │
│                                 │
│    Real connection, daily       │
│                                 │
│                                 │
│                                 │
└─────────────────────────────────┘
```
- Center point morphs into "vera" wordmark
- Coral color
- Tagline fades in below
- Subtle pulse/glow

---

## Timing Summary

| Time | Event |
|------|-------|
| 0.0s | You appear (center) |
| 0.4s | First person + line |
| 0.6s | Second person |
| 0.8s | Third person |
| 1.0s | Fourth + Fifth |
| 1.2s | Sixth + Seventh |
| 1.4s | All present, pause |
| 1.8s | Converge animation |
| 2.2s | Logo reveal |
| 2.6s | Tagline fade in |
| 3.0s | Complete, transition to app |

**Total duration:** 3 seconds

---

## Motion Specs

### Person Icons
- Entrance: Fade in + scale (0.8 → 1.0)
- Duration: 200ms
- Easing: ease-out

### Connection Lines
- Style: Dashed (4px dash, 4px gap)
- Opacity: 30%
- Draw animation: stroke-dashoffset
- Duration: 300ms

### Converge
- All icons move to center
- Scale down (1.0 → 0.2 → 0)
- Duration: 400ms
- Easing: ease-in-out

### Logo Reveal
- Scale up from 0.5 → 1.0
- Fade in
- Duration: 300ms
- Easing: spring (slight bounce)

---

## Colors Used

| Element | Color | Hex |
|---------|-------|-----|
| You (center) | Charcoal | `#2C2C2C` |
| Others | Coral | `#FF6B6B` |
| Connection lines | Coral 30% | `rgba(255,107,107,0.3)` |
| Background | Cream | `#FFF8F0` |
| Logo | Coral | `#FF6B6B` |
| Tagline | Warm Gray | `#8B8680` |

---

## Implementation Notes

### React Native / Expo
- Use `react-native-reanimated` for smooth animations
- Or `lottie-react-native` for After Effects export

### Lottie Approach
1. Design in After Effects / Lottie Creator
2. Export as .json
3. Play with `<LottieView>`
4. Seamless, performant

### Code Approach
1. SVG icons as components
2. Animated values for position, opacity, scale
3. Sequence with `Animated.sequence()` or `reanimated`

---

## Alternative: Simplified Version

If full animation is too complex for MVP:

```
Frame 1: Empty
Frame 2: vera logo fades in
Frame 3: Tagline fades in
```

Simple, clean, ships fast. Can add fancy animation later.
