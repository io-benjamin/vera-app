# Vera — Design System

## Brand Essence

**Feeling:** Warm, inviting, human. Like a friend nudging you to get out there.

**Not:** Cold, corporate, gamified, overwhelming.

---

## Colors

### Primary Palette

| Name | Hex | Usage |
|------|-----|-------|
| **Coral** | `#FF6B6B` | Primary buttons, accents, task cards |
| **Cream** | `#FFF8F0` | Background |
| **Forest** | `#2D5A4A` | Secondary actions, success states |
| **Charcoal** | `#2C2C2C` | Primary text |
| **Warm Gray** | `#8B8680` | Secondary text |
| **Soft White** | `#FFFFFF` | Cards, surfaces |

### Extended Palette

| Name | Hex | Usage |
|------|-----|-------|
| **Coral Light** | `#FFE5E5` | Coral tint for backgrounds |
| **Forest Light** | `#E8F0ED` | Success backgrounds |
| **Peach** | `#FFAB91` | Warm accent alternative |
| **Sky** | `#87CEEB` | Info states |

### Category Colors (for task types)

| Category | Color | Emoji |
|----------|-------|-------|
| Social | `#FF6B6B` Coral | ☕ |
| Creative | `#9B59B6` Purple | 🎨 |
| Kindness | `#FFD93D` Gold | 💛 |
| Adventure | `#6BCB77` Green | 🌍 |
| Vulnerable | `#4D96FF` Blue | 💬 |

---

## Typography

### Font Family

**Primary:** SF Pro Rounded (iOS) / Google Sans Rounded (Android)

Fallback: System rounded sans-serif

### Scale

| Style | Size | Weight | Usage |
|-------|------|--------|-------|
| **Hero** | 32px | Bold | Splash screen title |
| **H1** | 28px | Semibold | Screen titles |
| **H2** | 22px | Semibold | Section headers |
| **H3** | 18px | Medium | Card titles |
| **Body** | 16px | Regular | Primary text |
| **Body Small** | 14px | Regular | Secondary text |
| **Caption** | 12px | Regular | Labels, hints |
| **Button** | 16px | Semibold | Button text |

### Line Heights

- Headings: 1.2
- Body: 1.5
- Captions: 1.4

---

## Spacing

Base unit: 4px

| Token | Value | Usage |
|-------|-------|-------|
| `xs` | 4px | Tight spacing |
| `sm` | 8px | Between related elements |
| `md` | 16px | Standard spacing |
| `lg` | 24px | Section spacing |
| `xl` | 32px | Large gaps |
| `2xl` | 48px | Screen padding top |

### Screen Padding
- Horizontal: 24px
- Top: 48px (below safe area)
- Bottom: 24px (above safe area)

---

## Corners & Shapes

| Element | Radius |
|---------|--------|
| Buttons | 16px (pill-like) |
| Cards | 20px |
| Input fields | 12px |
| Small elements | 8px |
| Avatars | Full circle |

---

## Shadows

### Soft Shadow (Cards)
```css
box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
```

### Medium Shadow (Floating elements)
```css
box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
```

---

## Components

### Primary Button
- Background: Coral (`#FF6B6B`)
- Text: White
- Padding: 16px 32px
- Border radius: 16px
- Full width on mobile

### Secondary Button
- Background: Transparent
- Border: 2px Coral
- Text: Coral
- Same dimensions as primary

### Task Card
- Background: White
- Border radius: 20px
- Shadow: Soft
- Padding: 24px
- Category color strip on left (4px wide)

### Streak Badge
- Circle with number
- Background: Forest Green
- Text: White
- Size: 48px diameter

### Profile Avatar
- Circle
- Size: 80px (profile), 40px (small)
- Border: 3px white + shadow

---

## Iconography

Style: Rounded, friendly, outline style (2px stroke)

Source: Phosphor Icons (rounded) or custom

Key icons needed:
- ☕ Coffee cup
- 🎨 Paintbrush
- 💛 Heart
- 🌍 Globe/compass
- 💬 Chat bubble
- ✓ Checkmark
- 🔥 Flame (streak)
- ⚙️ Settings gear
- 👤 Profile
- 📤 Share

---

## Motion

### Principles
- Smooth, not snappy
- Purposeful, not decorative
- Quick (200-300ms)

### Animations
- Page transitions: Slide + fade (300ms)
- Button press: Scale down 0.97 (100ms)
- Task complete: Confetti burst + checkmark
- Streak update: Number tick up

### Easing
- Default: `ease-out`
- Bouncy (celebrations): `spring(1, 80, 10)`

---

## Sample UI Patterns

### Empty State
- Friendly illustration
- Single line of helpful text
- Optional action button
- Never just "Nothing here"

### Loading
- Subtle pulse animation on task card
- No spinners if possible
- Skeleton screens for content

### Success
- Green checkmark
- Brief confetti (not overwhelming)
- Positive copy ("You did it!")

### Error
- Warm, not alarming
- Helpful message
- Clear action to fix

---

## Voice & Tone

### Do
- "You did it! 🎉"
- "Today's task is ready"
- "Share with whoever you did this with"
- "One task. One person. One moment."

### Don't
- "Task incomplete. Complete now."
- "You haven't connected today."
- "Invite friends to earn rewards!"
- Corporate speak

### Principles
- Encouraging, not pushy
- Warm, like a friend
- Simple, no jargon
- Celebrate, don't guilt

---

## Accessibility

- Minimum touch target: 44x44px
- Color contrast: WCAG AA minimum
- Support Dynamic Type (iOS)
- VoiceOver labels on all interactive elements
- Reduce motion option respected
