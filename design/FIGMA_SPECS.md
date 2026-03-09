# Vera — Complete Figma Specification

## Overview

**App Name:** Vera
**Tagline:** Real connections, daily
**Platform:** iOS (primary), Android (secondary)
**Design Style:** Dark mode with warm coral accents, soft gradients, connection-focused imagery

---

## Design Tokens

### Colors

| Token | Hex | Usage |
|-------|-----|-------|
| `background-primary` | `#1A1A1A` | Main app background |
| `background-secondary` | `#2A2A2A` | Cards, elevated surfaces |
| `background-tertiary` | `#3A3A3A` | Input fields, subtle elements |
| `surface-cream` | `#FFF8F0` | Light mode surfaces (optional) |
| `coral-500` | `#FF6B6B` | Primary accent, CTAs |
| `coral-400` | `#FF8E8E` | Hover states, secondary accents |
| `coral-300` | `#FFB4B4` | Subtle highlights |
| `peach-500` | `#FFAB91` | Gradient end, warm accent |
| `forest-500` | `#2D5A4A` | Success states, nature category |
| `text-primary` | `#FFFFFF` | Main text on dark |
| `text-secondary` | `#A0A0A0` | Subdued text |
| `text-tertiary` | `#6B6B6B` | Hints, placeholders |

### Gradients

| Name | Value | Usage |
|------|-------|-------|
| `gradient-warm` | `linear(135deg, #FF6B6B → #FFAB91)` | People icons, CTAs |
| `gradient-glow` | `radial(#FF6B6B 0%, transparent 70%)` | Connection rings |
| `gradient-card` | `linear(180deg, #2A2A2A → #1A1A1A)` | Card backgrounds |

### Typography

| Style | Font | Size | Weight | Line Height |
|-------|------|------|--------|-------------|
| `heading-xl` | SF Pro Rounded | 32px | Bold (700) | 1.2 |
| `heading-lg` | SF Pro Rounded | 24px | Bold (700) | 1.3 |
| `heading-md` | SF Pro Rounded | 20px | Semibold (600) | 1.3 |
| `body-lg` | SF Pro | 17px | Regular (400) | 1.5 |
| `body-md` | SF Pro | 15px | Regular (400) | 1.5 |
| `body-sm` | SF Pro | 13px | Regular (400) | 1.4 |
| `caption` | SF Pro | 11px | Medium (500) | 1.3 |
| `label` | SF Pro | 12px | Semibold (600) | 1.2 |

### Spacing

| Token | Value |
|-------|-------|
| `spacing-xs` | 4px |
| `spacing-sm` | 8px |
| `spacing-md` | 16px |
| `spacing-lg` | 24px |
| `spacing-xl` | 32px |
| `spacing-2xl` | 48px |

### Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| `radius-sm` | 8px | Small buttons, tags |
| `radius-md` | 12px | Input fields |
| `radius-lg` | 16px | Cards |
| `radius-xl` | 24px | Large cards, modals |
| `radius-full` | 9999px | Pills, avatars |

### Shadows

| Token | Value | Usage |
|-------|-------|-------|
| `shadow-sm` | `0 2px 8px rgba(0,0,0,0.2)` | Subtle elevation |
| `shadow-md` | `0 4px 16px rgba(0,0,0,0.3)` | Cards |
| `shadow-lg` | `0 8px 32px rgba(0,0,0,0.4)` | Modals, popovers |
| `shadow-glow` | `0 0 40px rgba(255,107,107,0.3)` | Accent glow |

---

## Screen Inventory

### 1. Splash Screen
### 2. Onboarding (4 screens)
### 3. Sign Up / Login
### 4. Home (Today's Task)
### 5. Task Completion Flow
### 6. Share Link Screen
### 7. History / Past Connections
### 8. Profile
### 9. Settings
### 10. Notifications Permission
### 11. Empty States
### 12. Error States

---

## Screen Specifications

---

### 1. SPLASH SCREEN

**Purpose:** Brand moment, loading state

**Duration:** 2-3 seconds

**Elements:**
```
┌─────────────────────────────────┐
│                                 │
│                                 │
│                                 │
│         [Animated Logo]         │
│      Two people connecting      │
│       with ripple rings         │
│                                 │
│            "vera"               │
│    "Real connections, daily"    │
│                                 │
│                                 │
└─────────────────────────────────┘
```

**Animation Sequence:**
1. 0.0s - Single person appears (center)
2. 0.4s - More people fade in around
3. 1.0s - Connection lines draw between them
4. 1.5s - Secondary connections appear (friends of friends)
5. 2.0s - All converge to center
6. 2.3s - Logo emerges
7. 2.6s - Tagline fades in
8. 3.0s - Transition to next screen

**Assets Needed:**
- [ ] Animated logo (Lottie or After Effects)
- [ ] Static logo fallback
- [ ] Wordmark "vera"

---

### 2. ONBOARDING

**Purpose:** Explain the app, get buy-in

**Flow:** 4 swipeable screens → Sign up

---

#### 2A. ONBOARDING - SCREEN 1: THE PROBLEM

**Headline:** "We're more connected than ever..."
**Subhead:** "...but lonelier than ever before."

**Visual:** Phone with notification icons floating away, person looking at screen

```
┌─────────────────────────────────┐
│                                 │
│    [Illustration: Person on     │
│     phone, notifications        │
│     floating away]              │
│                                 │
│  "We're more connected than     │
│           ever..."              │
│                                 │
│   ...but lonelier than ever     │
│            before.              │
│                                 │
│         ● ○ ○ ○                 │
│                                 │
│        [Next →]                 │
└─────────────────────────────────┘
```

**Elements:**
- Illustration (280×280)
- Headline (heading-xl, text-primary)
- Subhead (body-lg, text-secondary)
- Progress dots (4 total)
- Next button (text button, coral)
- Skip button (top right, text-tertiary)

---

#### 2B. ONBOARDING - SCREEN 2: THE SOLUTION

**Headline:** "One real connection a day"
**Subhead:** "Vera gives you a simple daily task to connect with someone in person."

**Visual:** Two people having coffee, warm glow between them

```
┌─────────────────────────────────┐
│                           Skip  │
│                                 │
│    [Illustration: Two people    │
│     connecting, warm glow]      │
│                                 │
│    "One real connection         │
│          a day"                 │
│                                 │
│   Vera gives you a simple       │
│   daily task to connect with    │
│     someone in person.          │
│                                 │
│         ○ ● ○ ○                 │
│                                 │
│        [Next →]                 │
└─────────────────────────────────┘
```

---

#### 2C. ONBOARDING - SCREEN 3: HOW IT WORKS

**Headline:** "Complete it together"
**Subhead:** "Do the task with someone, then share your Vera link to mark it complete."

**Visual:** Task card → Two people → Checkmark animation

```
┌─────────────────────────────────┐
│                           Skip  │
│                                 │
│    [Illustration: Task card     │
│     transforming to checkmark   │
│     with two people]            │
│                                 │
│    "Complete it together"       │
│                                 │
│   Do the task with someone,     │
│   then share your Vera link     │
│      to mark it complete.       │
│                                 │
│         ○ ○ ● ○                 │
│                                 │
│        [Next →]                 │
└─────────────────────────────────┘
```

---

#### 2D. ONBOARDING - SCREEN 4: THE BENEFIT

**Headline:** "Build your streak"
**Subhead:** "Watch your connection streak grow as you build the habit of real human connection."

**Visual:** Calendar with streak, growing flame icon

```
┌─────────────────────────────────┐
│                                 │
│                                 │
│    [Illustration: Streak        │
│     calendar with fire icon     │
│     growing larger]             │
│                                 │
│    "Build your streak"          │
│                                 │
│   Watch your connection streak  │
│   grow as you build the habit   │
│   of real human connection.     │
│                                 │
│         ○ ○ ○ ●                 │
│                                 │
│      [Get Started]              │
│   (Primary button, full width)  │
└─────────────────────────────────┘
```

---

### 3. SIGN UP / LOGIN

**Purpose:** Account creation, authentication

---

#### 3A. AUTH - WELCOME

```
┌─────────────────────────────────┐
│                                 │
│                                 │
│          [Vera Logo]            │
│                                 │
│     "Real connections, daily"   │
│                                 │
│                                 │
│  ┌─────────────────────────┐    │
│  │  Continue with Apple    │    │
│  └─────────────────────────┘    │
│                                 │
│  ┌─────────────────────────┐    │
│  │  Continue with Google   │    │
│  └─────────────────────────┘    │
│                                 │
│  ┌─────────────────────────┐    │
│  │  Continue with Email    │    │
│  └─────────────────────────┘    │
│                                 │
│   Already have an account?      │
│          [Log in]               │
│                                 │
│   By continuing, you agree to   │
│   our Terms and Privacy Policy  │
└─────────────────────────────────┘
```

**Elements:**
- Logo (120×120)
- Tagline (body-md, text-secondary)
- Social buttons (full width, 52px height, radius-lg)
  - Apple: Black background, white text
  - Google: White background, dark text
  - Email: Outline style, coral border
- Login link (body-sm, coral)
- Terms text (caption, text-tertiary)

---

#### 3B. AUTH - EMAIL SIGN UP

```
┌─────────────────────────────────┐
│  ←                              │
│                                 │
│       "Create account"          │
│                                 │
│  Email                          │
│  ┌─────────────────────────┐    │
│  │ hello@example.com       │    │
│  └─────────────────────────┘    │
│                                 │
│  Password                       │
│  ┌─────────────────────────┐    │
│  │ ••••••••           👁   │    │
│  └─────────────────────────┘    │
│  At least 8 characters          │
│                                 │
│  Name                           │
│  ┌─────────────────────────┐    │
│  │ Your name               │    │
│  └─────────────────────────┘    │
│                                 │
│                                 │
│  ┌─────────────────────────┐    │
│  │     Create Account      │    │
│  └─────────────────────────┘    │
│                                 │
└─────────────────────────────────┘
```

**Input States:**
- Default: border `#3A3A3A`, bg `#2A2A2A`
- Focused: border `coral-500`, subtle glow
- Error: border `#FF4444`, error text below
- Filled: border `#3A3A3A`, white text

---

### 4. HOME (TODAY'S TASK)

**Purpose:** Show today's connection task, main app experience

---

#### 4A. HOME - TASK PENDING

```
┌─────────────────────────────────┐
│ 9:41                    📶 🔋   │
├─────────────────────────────────┤
│                                 │
│  Good morning               👤  │
│  Saturday, Mar 8                │
│                                 │
│  ┌─────────────────────────┐    │
│  │ 🔥 7 day streak!        │    │
│  └─────────────────────────┘    │
│                                 │
│  TODAY'S CONNECTION             │
│                                 │
│  ┌─────────────────────────┐    │
│  │                         │    │
│  │  💛 Kindness            │    │
│  │                         │    │
│  │  Give someone a         │    │
│  │  genuine compliment     │    │
│  │                         │    │
│  │  Tell someone something │    │
│  │  you appreciate about   │    │
│  │  them. Be specific and  │    │
│  │  sincere.               │    │
│  │                         │    │
│  │  ┌───────────────────┐  │    │
│  │  │   I did this →    │  │    │
│  │  └───────────────────┘  │    │
│  │                         │    │
│  └─────────────────────────┘    │
│                                 │
├─────────────────────────────────┤
│   🏠        📅        👤       │
│  Today    History   Profile     │
└─────────────────────────────────┘
```

**Elements:**

**Header:**
- Greeting: "Good morning/afternoon/evening" (body-md, text-secondary)
- Date: "Saturday, Mar 8" (heading-md, text-primary)
- Profile button: 40×40 circle, coral bg, person icon

**Streak Bar:**
- Background: `#2A2A2A`, radius-lg
- Fire emoji + "X day streak!" text
- Tap to see streak details

**Section Label:**
- "TODAY'S CONNECTION" (label, text-tertiary, uppercase, letter-spacing 1px)

**Task Card:**
- Background: `#2A2A2A`, radius-xl
- Padding: 24px
- Shadow: shadow-md

**Category Badge:**
- Pill shape (radius-full)
- Category-specific colors:
  - 💛 Kindness: `#FF6B6B` bg, white text
  - ☕ Social: `#3B82F6` bg, white text
  - 🎨 Creative: `#F59E0B` bg, white text
  - 🌍 Adventure: `#10B981` bg, white text
  - 💬 Vulnerable: `#8B5CF6` bg, white text

**Task Title:**
- heading-lg, text-primary
- Max 2 lines

**Task Description:**
- body-md, text-secondary
- Max 3 lines

**CTA Button:**
- Full width within card
- Height: 52px
- Background: gradient-warm
- Text: "I did this →" (body-lg, white, semibold)
- Radius: radius-lg
- Shadow: shadow-glow on hover

**Bottom Navigation:**
- Background: `#1A1A1A`
- Height: 83px (includes safe area)
- 3 items: Today, History, Profile
- Active: coral icon + text
- Inactive: text-tertiary icon + text
- Icon size: 24×24

---

#### 4B. HOME - TASK COMPLETED

```
┌─────────────────────────────────┐
│ 2:34                    📶 🔋   │
├─────────────────────────────────┤
│                                 │
│  Nice work! 🎉              👤  │
│  Saturday, Mar 8                │
│                                 │
│  ┌─────────────────────────┐    │
│  │ 🔥 8 day streak!        │    │
│  └─────────────────────────┘    │
│                                 │
│  COMPLETED ✓                    │
│                                 │
│  ┌─────────────────────────┐    │
│  │  [Success gradient bg]  │    │
│  │                         │    │
│  │      ✓ Complete         │    │
│  │                         │    │
│  │  Give someone a         │    │
│  │  genuine compliment     │    │
│  │                         │    │
│  │  Connected with Sarah   │    │
│  │  at 2:30 PM             │    │
│  │                         │    │
│  │  ┌───────────────────┐  │    │
│  │  │ Share your streak │  │    │
│  │  └───────────────────┘  │    │
│  │                         │    │
│  └─────────────────────────┘    │
│                                 │
│  RECENT CONNECTIONS             │
│  ┌─────────────────────────┐    │
│  │ 👩 Sarah    Today       │    │
│  │    Compliment           │    │
│  ├─────────────────────────┤    │
│  │ 👨 Mike     Yesterday   │    │
│  │    Coffee chat          │    │
│  └─────────────────────────┘    │
│                                 │
├─────────────────────────────────┤
│   🏠        📅        👤       │
└─────────────────────────────────┘
```

**Completed State Changes:**
- Greeting: "Nice work! 🎉"
- Streak incremented
- Card background: subtle green gradient (`#1A2F1A` → `#1A1A1A`)
- Badge: "✓ Complete" (forest-500 bg)
- CTA: "Share your streak" (optional sharing)
- Recent connections list appears below

**Connection List Item:**
- Avatar: 44×44 circle, emoji or initials
- Name: body-md, semibold
- Task type: body-sm, text-secondary
- Time: body-sm, text-tertiary, right-aligned

---

### 5. TASK COMPLETION FLOW

**Purpose:** Mark task as done, capture who you connected with

---

#### 5A. COMPLETION - WHO DID YOU CONNECT WITH?

```
┌─────────────────────────────────┐
│  ←                        ✕     │
│                                 │
│       "Who did you              │
│        connect with?"           │
│                                 │
│                                 │
│  ┌─────────────────────────┐    │
│  │ 🔍 Search or add name   │    │
│  └─────────────────────────┘    │
│                                 │
│  RECENT                         │
│                                 │
│  ┌─────────────────────────┐    │
│  │ 👩 Sarah                │    │
│  │ 👨 Mike                 │    │
│  │ 👩 Emma                 │    │
│  │ 👴 Dad                  │    │
│  └─────────────────────────┘    │
│                                 │
│  ┌─────────────────────────┐    │
│  │  + Add someone new      │    │
│  └─────────────────────────┘    │
│                                 │
│                                 │
│                                 │
└─────────────────────────────────┘
```

**Elements:**
- Back button (←) and close button (✕)
- Headline (heading-lg, center)
- Search input (icon + text field)
- Recent contacts list (tappable rows)
- Add new button (outline style)

---

#### 5B. COMPLETION - SHARE YOUR LINK

```
┌─────────────────────────────────┐
│                           ✕     │
│                                 │
│           🎉                    │
│                                 │
│     "Share with Sarah"          │
│                                 │
│   Send them your Vera link      │
│   to complete today's task      │
│                                 │
│  ┌─────────────────────────┐    │
│  │                         │    │
│  │   vera.link/io/abc123   │    │
│  │                         │    │
│  │      [Copy Link]        │    │
│  │                         │    │
│  └─────────────────────────┘    │
│                                 │
│  ┌─────────────────────────┐    │
│  │    Share via...         │    │
│  └─────────────────────────┘    │
│                                 │
│  ┌───┐ ┌───┐ ┌───┐ ┌───┐       │
│  │ 💬│ │ 📱│ │ ✉️│ │ ••│       │
│  │iMsg│ │WA │ │Mail│ │More│     │
│  └───┘ └───┘ └───┘ └───┘       │
│                                 │
│        [Skip for now]           │
│                                 │
└─────────────────────────────────┘
```

**Elements:**
- Celebration emoji (48px)
- Headline: "Share with [Name]"
- Subtext explanation
- Link card:
  - Background: `#2A2A2A`
  - Link text (monospace, selectable)
  - Copy button
- Share options:
  - Primary: "Share via..." (opens native share sheet)
  - Quick icons: iMessage, WhatsApp, Email, More
- Skip link (text-tertiary)

---

#### 5C. COMPLETION - SUCCESS

```
┌─────────────────────────────────┐
│                                 │
│                                 │
│                                 │
│                                 │
│            ✓                    │
│    [Animated checkmark]         │
│                                 │
│      "Connection made!"         │
│                                 │
│   You and Sarah are now         │
│   connected through Vera        │
│                                 │
│      🔥 8 day streak            │
│                                 │
│                                 │
│  ┌─────────────────────────┐    │
│  │       Continue          │    │
│  └─────────────────────────┘    │
│                                 │
│                                 │
│                                 │
└─────────────────────────────────┘
```

**Animation:**
- Checkmark draws in (Lottie)
- Confetti particles
- Streak counter animates up

---

### 6. HISTORY

**Purpose:** View past connections and completed tasks

```
┌─────────────────────────────────┐
│ 9:41                    📶 🔋   │
├─────────────────────────────────┤
│                                 │
│  History                        │
│                                 │
│  ┌─────────────────────────┐    │
│  │ 🔥 8    │ 👥 23   │ 📅 30│   │
│  │ streak  │ people  │ days │   │
│  └─────────────────────────┘    │
│                                 │
│  THIS WEEK                      │
│                                 │
│  ┌─────────────────────────┐    │
│  │ Sat, Mar 8              │    │
│  │ 💛 Compliment → Sarah    │   │
│  ├─────────────────────────┤    │
│  │ Fri, Mar 7              │    │
│  │ ☕ Coffee chat → Mike    │   │
│  ├─────────────────────────┤    │
│  │ Thu, Mar 6              │    │
│  │ 🎨 Draw together → Emma │    │
│  └─────────────────────────┘    │
│                                 │
│  LAST WEEK                      │
│                                 │
│  ┌─────────────────────────┐    │
│  │ Sun, Mar 2              │    │
│  │ 💬 Deep talk → Dad      │    │
│  ├─────────────────────────┤    │
│  │ Sat, Mar 1       ⚠️     │    │
│  │ Missed                  │    │
│  └─────────────────────────┘    │
│                                 │
├─────────────────────────────────┤
│   🏠        📅        👤       │
└─────────────────────────────────┘
```

**Stats Bar:**
- 3 equal columns
- Each: number (heading-md, coral) + label (caption, text-secondary)

**History List:**
- Grouped by week
- Section headers: "THIS WEEK", "LAST WEEK", etc.
- Each row: Date, category icon, task summary, person name
- Missed days: warning icon, muted styling

---

### 7. PROFILE

**Purpose:** View stats, manage account

```
┌─────────────────────────────────┐
│ 9:41                    📶 🔋   │
├─────────────────────────────────┤
│                                 │
│        [Avatar 80px]            │
│           Io                    │
│    Member since Feb 2026        │
│                                 │
│  ┌─────────────────────────┐    │
│  │                         │    │
│  │   🔥        👥       📅 │    │
│  │   8         23       30  │   │
│  │ streak   people    days  │   │
│  │                         │    │
│  └─────────────────────────┘    │
│                                 │
│  MY CONNECTIONS                 │
│                                 │
│  ┌─────────────────────────┐    │
│  │ 👩 Sarah         5x     │    │
│  │ 👨 Mike          4x     │    │
│  │ 👩 Emma          3x     │    │
│  │ 👴 Dad           2x     │    │
│  │        See all →        │    │
│  └─────────────────────────┘    │
│                                 │
│  ┌─────────────────────────┐    │
│  │ ⚙️ Settings              │   │
│  │ 🔔 Notifications         │   │
│  │ 📤 Share Vera            │   │
│  │ ❓ Help & Support        │   │
│  └─────────────────────────┘    │
│                                 │
├─────────────────────────────────┤
│   🏠        📅        👤       │
└─────────────────────────────────┘
```

**Avatar:**
- 80×80 circle
- Gradient background if no photo
- Edit button overlay (camera icon)

**Stats Card:**
- Same as History stats bar
- Tappable to see details

**Connections List:**
- Top people by frequency
- Count badge (e.g., "5x")
- "See all" link

**Menu Items:**
- List with icons
- Chevron right (→) for navigation items

---

### 8. SETTINGS

```
┌─────────────────────────────────┐
│  ←        Settings              │
├─────────────────────────────────┤
│                                 │
│  ACCOUNT                        │
│  ┌─────────────────────────┐    │
│  │ Edit Profile          → │    │
│  │ Email: io@email.com   → │    │
│  │ Change Password       → │    │
│  └─────────────────────────┘    │
│                                 │
│  PREFERENCES                    │
│  ┌─────────────────────────┐    │
│  │ Notifications         → │    │
│  │ Reminder Time   9:00 AM │    │
│  │ Task Categories       → │    │
│  └─────────────────────────┘    │
│                                 │
│  ABOUT                          │
│  ┌─────────────────────────┐    │
│  │ Privacy Policy        → │    │
│  │ Terms of Service      → │    │
│  │ Version          1.0.0  │    │
│  └─────────────────────────┘    │
│                                 │
│                                 │
│  ┌─────────────────────────┐    │
│  │       Log Out           │    │
│  └─────────────────────────┘    │
│                                 │
│  ┌─────────────────────────┐    │
│  │     Delete Account      │    │
│  └─────────────────────────┘    │
│                                 │
└─────────────────────────────────┘
```

---

### 9. NOTIFICATIONS PERMISSION

```
┌─────────────────────────────────┐
│                                 │
│                                 │
│                                 │
│         [Bell Icon]             │
│      with ripple effect         │
│                                 │
│    "Never miss a connection"    │
│                                 │
│   Get a gentle reminder each    │
│   day to complete your task     │
│   and keep your streak going.   │
│                                 │
│                                 │
│  ┌─────────────────────────┐    │
│  │   Enable Notifications  │    │
│  └─────────────────────────┘    │
│                                 │
│         [Maybe Later]           │
│                                 │
│                                 │
│                                 │
└─────────────────────────────────┘
```

---

### 10. EMPTY STATES

#### 10A. No Task Yet (First Day)

```
┌─────────────────────────────────┐
│                                 │
│    [Illustration: Sunrise]      │
│                                 │
│   "Your first task is coming"   │
│                                 │
│   Check back at 9 AM for your   │
│   daily connection task.        │
│                                 │
│  ┌─────────────────────────┐    │
│  │   Notify me when ready  │    │
│  └─────────────────────────┘    │
│                                 │
└─────────────────────────────────┘
```

#### 10B. No History Yet

```
┌─────────────────────────────────┐
│                                 │
│    [Illustration: Empty         │
│     calendar with sparkles]     │
│                                 │
│    "No connections yet"         │
│                                 │
│   Complete your first task      │
│   to start building your        │
│   connection history.           │
│                                 │
│  ┌─────────────────────────┐    │
│  │   Go to Today's Task    │    │
│  └─────────────────────────┘    │
│                                 │
└─────────────────────────────────┘
```

---

## Components Library

### Buttons

| Variant | Background | Text | Border | Usage |
|---------|------------|------|--------|-------|
| Primary | gradient-warm | white | none | Main CTAs |
| Secondary | transparent | coral | 2px coral | Secondary actions |
| Ghost | transparent | text-secondary | none | Tertiary actions |
| Destructive | #FF4444 | white | none | Delete, logout |

### Input Fields

| State | Border | Background | Text |
|-------|--------|------------|------|
| Default | #3A3A3A | #2A2A2A | text-tertiary |
| Focused | coral-500 | #2A2A2A | text-primary |
| Filled | #3A3A3A | #2A2A2A | text-primary |
| Error | #FF4444 | #2A2A2A | text-primary |
| Disabled | #2A2A2A | #1A1A1A | text-tertiary |

### Cards

| Variant | Background | Border | Shadow |
|---------|------------|--------|--------|
| Default | #2A2A2A | none | shadow-md |
| Elevated | #3A3A3A | none | shadow-lg |
| Success | green gradient | none | shadow-md |
| Interactive | #2A2A2A | none | shadow-md → shadow-lg on hover |

### Badges

| Category | Background | Text |
|----------|------------|------|
| Kindness | #FF6B6B | white |
| Social | #3B82F6 | white |
| Creative | #F59E0B | white |
| Adventure | #10B981 | white |
| Vulnerable | #8B5CF6 | white |
| Complete | #10B981 | white |

---

## Animation Specs

### Micro-interactions

| Element | Animation | Duration | Easing |
|---------|-----------|----------|--------|
| Button tap | Scale 0.97 | 100ms | ease-out |
| Button release | Scale 1.0 | 100ms | ease-out |
| Card tap | Scale 0.98 | 150ms | ease-out |
| Tab switch | Fade + slide | 200ms | ease-in-out |
| Streak update | Count up + bounce | 400ms | spring |

### Page Transitions

| Transition | Animation | Duration |
|------------|-----------|----------|
| Push (navigate forward) | Slide left + fade | 300ms |
| Pop (navigate back) | Slide right + fade | 300ms |
| Modal present | Slide up + fade | 300ms |
| Modal dismiss | Slide down + fade | 250ms |

---

## Figma File Structure

```
📁 Vera App
├── 📄 Cover
├── 📁 🎨 Design System
│   ├── Colors
│   ├── Typography
│   ├── Spacing & Grid
│   ├── Icons
│   └── Shadows & Effects
├── 📁 🧩 Components
│   ├── Buttons
│   ├── Inputs
│   ├── Cards
│   ├── Navigation
│   ├── Badges
│   ├── Lists
│   └── Modals
├── 📁 📱 Screens
│   ├── 1. Splash
│   ├── 2. Onboarding
│   ├── 3. Auth
│   ├── 4. Home
│   ├── 5. Completion Flow
│   ├── 6. History
│   ├── 7. Profile
│   ├── 8. Settings
│   └── 9. Empty States
├── 📁 🔄 Prototypes
│   ├── Onboarding Flow
│   ├── Task Completion Flow
│   └── Full App Flow
└── 📁 📦 Assets
    ├── Logo
    ├── Illustrations
    └── App Icon
```

---

## Iteration Checklist

### Phase 1: Foundation
- [ ] Set up color styles
- [ ] Set up text styles
- [ ] Create spacing system
- [ ] Import/create icons

### Phase 2: Components
- [ ] Buttons (all variants)
- [ ] Input fields (all states)
- [ ] Cards (all variants)
- [ ] Navigation bar
- [ ] Tab bar
- [ ] Badges
- [ ] List items
- [ ] Avatars

### Phase 3: Screens
- [ ] Splash screen
- [ ] Onboarding (4 screens)
- [ ] Auth screens
- [ ] Home (pending state)
- [ ] Home (completed state)
- [ ] Completion flow (3 screens)
- [ ] History
- [ ] Profile
- [ ] Settings
- [ ] Empty states

### Phase 4: Polish
- [ ] Prototype connections
- [ ] Micro-interactions
- [ ] Responsive variants (if needed)
- [ ] Dark/Light mode (if needed)
- [ ] Export assets

---

## Export Specs

### App Icon
- 1024×1024 (App Store)
- 180×180 (@3x)
- 120×120 (@2x)
- 60×60 (@1x)

### Illustrations
- SVG (preferred)
- PNG @3x as fallback

### Icons
- SVG
- 24×24 base size
- Stroke: 2px
- Export: outline, not filled

---

*Last updated: March 9, 2026*
