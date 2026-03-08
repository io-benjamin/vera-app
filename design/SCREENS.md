# Vera — Screen Designs

## Screen Flow

```
Splash → Onboarding (3) → Sign Up → Home
                                      │
                    ┌─────────────────┼─────────────────┐
                    │                 │                 │
                 Profile           Home              Settings
                    │                │
                    │         [Complete Task]
                    │                │
                    │          Share Flow
                    │                │
                    │           Success!
                    │                │
                    └────────────────┘
```

---

## 1. Splash Screen

**Purpose:** First impression, brand moment

**Layout:**
```
┌─────────────────────────────────┐
│                                 │
│                                 │
│                                 │
│            [VERA LOGO]          │
│                                 │
│      "Real connection, daily"   │
│                                 │
│                                 │
│                                 │
│                                 │
└─────────────────────────────────┘
```

**Details:**
- Background: Cream (`#FFF8F0`)
- Logo: "vera" in lowercase, rounded friendly font, Coral color
- Tagline: Warm Gray, Body Small
- Simple fade in animation
- Auto-advances after 2 seconds

---

## 2. Onboarding — Slide 1

**Purpose:** Explain the concept

**Layout:**
```
┌─────────────────────────────────┐
│                                 │
│        [ILLUSTRATION]           │
│     Person having coffee        │
│        with a friend            │
│                                 │
│   ─────────────────────────     │
│                                 │
│     "One task, every day"       │
│                                 │
│   We'll give you a simple       │
│   task to do with another       │
│   human. That's it.             │
│                                 │
│          ● ○ ○                  │
│                                 │
│        [NEXT →]                 │
│                                 │
└─────────────────────────────────┘
```

**Details:**
- Illustration: Warm, minimal, two people connecting
- Title: H1, Charcoal
- Body: Body, Warm Gray
- Dots: Progress indicator
- Button: Primary button, bottom

---

## 2. Onboarding — Slide 2

**Purpose:** Explain completion mechanic

**Layout:**
```
┌─────────────────────────────────┐
│                                 │
│        [ILLUSTRATION]           │
│     Phone sharing a link        │
│                                 │
│   ─────────────────────────     │
│                                 │
│    "Share it to complete"       │
│                                 │
│   Did the task? Share your      │
│   link with whoever you did     │
│   it with. That's how we know   │
│   it was real.                  │
│                                 │
│          ○ ● ○                  │
│                                 │
│        [NEXT →]                 │
│                                 │
└─────────────────────────────────┘
```

---

## 2. Onboarding — Slide 3

**Purpose:** Set expectation, get permission

**Layout:**
```
┌─────────────────────────────────┐
│                                 │
│        [ILLUSTRATION]           │
│     Notification bell           │
│     with morning sun            │
│                                 │
│   ─────────────────────────     │
│                                 │
│   "We'll nudge you each day"    │
│                                 │
│   One notification in the       │
│   morning with your task.       │
│   No spam. Promise.             │
│                                 │
│          ○ ○ ●                  │
│                                 │
│      [LET'S GO →]               │
│                                 │
└─────────────────────────────────┘
```

**Details:**
- Final slide triggers notification permission
- Button: More excited copy "Let's go"

---

## 3. Sign Up

**Purpose:** Create account (minimal friction)

**Layout:**
```
┌─────────────────────────────────┐
│                                 │
│          vera                   │
│                                 │
│   ─────────────────────────     │
│                                 │
│     "Let's get you started"     │
│                                 │
│   ┌─────────────────────────┐   │
│   │ 🍎 Continue with Apple  │   │
│   └─────────────────────────┘   │
│                                 │
│   ┌─────────────────────────┐   │
│   │ ✉️  Continue with Email │   │
│   └─────────────────────────┘   │
│                                 │
│                                 │
│   By continuing, you agree to   │
│   our Terms and Privacy Policy  │
│                                 │
└─────────────────────────────────┘
```

**Details:**
- Apple Sign In: Primary option (one tap)
- Email: Secondary option (leads to email input)
- Minimal fields — just get them in
- No password initially (magic link or Apple ID)

---

## 4. Home — Today's Task

**Purpose:** Core screen, show today's task

**Layout:**
```
┌─────────────────────────────────┐
│  vera                    [👤]   │
│                                 │
│   Good morning, Alex ☀️         │
│                                 │
│   ─────────────────────────     │
│                                 │
│   TODAY'S TASK                  │
│                                 │
│   ┌─────────────────────────┐   │
│   │ ☕                       │   │
│   │                         │   │
│   │  Have coffee with       │   │
│   │  someone you haven't    │   │
│   │  seen in a while        │   │
│   │                         │   │
│   │         ─────           │   │
│   │                         │   │
│   │   [ I DID IT ✓ ]        │   │
│   │                         │   │
│   └─────────────────────────┘   │
│                                 │
│   🔥 4 day streak               │
│                                 │
└─────────────────────────────────┘
```

**Details:**
- Header: Small logo left, profile avatar right
- Greeting: Time-aware ("Good morning/afternoon/evening")
- Task card: 
  - White background
  - Category emoji large (48px)
  - Task text: H2, Charcoal
  - Coral strip on left edge (category indicator)
  - Primary button inside card
- Streak: Below card, small, Forest Green flame icon

---

## 5. Home — Task Already Complete

**Purpose:** Show completed state

**Layout:**
```
┌─────────────────────────────────┐
│  vera                    [👤]   │
│                                 │
│   Nice work today! 🎉           │
│                                 │
│   ─────────────────────────     │
│                                 │
│   TODAY'S TASK                  │
│                                 │
│   ┌─────────────────────────┐   │
│   │ ☕                   ✓  │   │
│   │                         │   │
│   │  Have coffee with       │   │
│   │  someone you haven't    │   │
│   │  seen in a while        │   │
│   │                         │   │
│   │      COMPLETED          │   │
│   │                         │   │
│   └─────────────────────────┘   │
│                                 │
│   🔥 5 day streak               │
│                                 │
│   See you tomorrow ☀️           │
│                                 │
└─────────────────────────────────┘
```

**Details:**
- Card has subtle green tint
- Checkmark badge in top right
- "COMPLETED" label instead of button
- Encouraging message below
- Streak updated

---

## 6. Complete Flow — Step 1

**Purpose:** Confirm completion, prepare to share

**Layout:**
```
┌─────────────────────────────────┐
│  [←]                            │
│                                 │
│         🎉                      │
│                                 │
│    "Awesome! You did it."       │
│                                 │
│   ─────────────────────────     │
│                                 │
│   Now share your Vera link      │
│   with whoever you did this     │
│   with. They might join too!    │
│                                 │
│                                 │
│                                 │
│                                 │
│                                 │
│     [ SHARE MY LINK 📤 ]        │
│                                 │
│       Skip for now              │
│                                 │
└─────────────────────────────────┘
```

**Details:**
- Back button (can cancel)
- Celebration emoji
- Primary action: Share
- Secondary: Skip (still marks complete, but we encourage sharing)

---

## 7. Complete Flow — Share Sheet

**Purpose:** Native share

**Layout:**
```
┌─────────────────────────────────┐
│                                 │
│   [Native iOS Share Sheet]      │
│                                 │
│   ┌─────────────────────────┐   │
│   │                         │   │
│   │  "I just completed a    │   │
│   │   Vera task with you!   │   │
│   │                         │   │
│   │   Join me:              │   │
│   │   tryvera.dev/j/abc123" │   │
│   │                         │   │
│   └─────────────────────────┘   │
│                                 │
│   [Messages] [WhatsApp] [Copy]  │
│   [Mail] [More...]              │
│                                 │
└─────────────────────────────────┘
```

**Details:**
- Native share sheet
- Pre-filled message with personal link
- Link is short and trackable

---

## 8. Complete Flow — Success

**Purpose:** Celebrate, confirm done

**Layout:**
```
┌─────────────────────────────────┐
│                                 │
│                                 │
│                                 │
│           ✓                     │
│        (big, green,             │
│         animated)               │
│                                 │
│    "Task complete!"             │
│                                 │
│    Your streak is now 5 🔥      │
│                                 │
│                                 │
│                                 │
│                                 │
│        [ DONE ]                 │
│                                 │
│                                 │
└─────────────────────────────────┘
```

**Details:**
- Big animated checkmark
- Confetti burst (subtle)
- Streak update highlighted
- Returns to Home

---

## 9. Profile

**Purpose:** User stats, connections

**Layout:**
```
┌─────────────────────────────────┐
│  [←]                   [⚙️]     │
│                                 │
│          [AVATAR]               │
│           Alex                  │
│                                 │
│   ─────────────────────────     │
│                                 │
│   ┌───────┐  ┌───────┐         │
│   │  5 🔥 │  │  23   │         │
│   │ Streak│  │ Tasks │         │
│   └───────┘  └───────┘         │
│                                 │
│   ─────────────────────────     │
│                                 │
│   FRIENDS ON VERA (3)           │
│                                 │
│   [👤] Jordan — joined Mar 2    │
│   [👤] Sam — joined Feb 28      │
│   [👤] Riley — joined Feb 25    │
│                                 │
│   ─────────────────────────     │
│                                 │
│   Streak Calendar               │
│   [Feb/Mar calendar view]       │
│                                 │
└─────────────────────────────────┘
```

**Details:**
- Avatar: Large, circular
- Stats: Two boxes side by side
- Friends: People who signed up from your links
- Calendar: GitHub-style contribution grid

---

## 10. Settings

**Purpose:** Account & preferences

**Layout:**
```
┌─────────────────────────────────┐
│  [←]         Settings           │
│                                 │
│   ─────────────────────────     │
│                                 │
│   NOTIFICATIONS                 │
│                                 │
│   Daily reminder         [●]    │
│   Reminder time      [9:00 AM]  │
│                                 │
│   ─────────────────────────     │
│                                 │
│   ACCOUNT                       │
│                                 │
│   Email            alex@me.com  │
│   Edit profile              →   │
│                                 │
│   ─────────────────────────     │
│                                 │
│   ABOUT                         │
│                                 │
│   Share Vera                →   │
│   Rate on App Store         →   │
│   Privacy Policy            →   │
│   Terms of Service          →   │
│                                 │
│   ─────────────────────────     │
│                                 │
│   [Log Out]                     │
│                                 │
│   Version 1.0.0                 │
│                                 │
└─────────────────────────────────┘
```

---

## Notification

**Purpose:** Daily task push

**Content:**
```
┌─────────────────────────────────┐
│ vera                      now   │
│                                 │
│ ☕ Today's task is ready        │
│ Have coffee with someone you    │
│ haven't seen in a while         │
└─────────────────────────────────┘
```

**Details:**
- Category emoji
- Task preview
- Tap opens app to Home

---

## Link Landing Page (Web)

**Purpose:** When someone clicks a shared link

**URL:** `tryvera.dev/j/abc123`

**Layout:**
```
┌─────────────────────────────────┐
│                                 │
│           vera                  │
│                                 │
│   ─────────────────────────     │
│                                 │
│   Alex just completed a         │
│   Vera task with you!           │
│                                 │
│   ☕ Had coffee together        │
│                                 │
│   ─────────────────────────     │
│                                 │
│   Vera gives you one simple     │
│   task every day: connect       │
│   with a real human.            │
│                                 │
│   [ GET THE APP ]               │
│                                 │
│   🍎 App Store                  │
│                                 │
└─────────────────────────────────┘
```
