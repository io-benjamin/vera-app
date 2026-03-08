# Vera — Product Requirements Document

## Vision

**Vera** is a daily connection app that gives you one simple task: do something real with another human. In a world of AI and isolation, Vera brings people back together—one task at a time.

**Tagline:** Real connections, daily.

**Name origin:** From Spanish "verdad" (truth) — authentic human connection.

---

## The Problem

- People are lonelier than ever
- Screen time is up, real interaction is down
- Social apps encourage scrolling, not connecting
- Making friends as an adult is hard
- AI is replacing human conversation

---

## The Solution

A dead-simple app:

1. Wake up → get a task
2. Do the task with a real person
3. Share your Vera link with them
4. Task complete
5. Repeat tomorrow

**The magic:** You can't complete a task alone. You need another human.

---

## Core Loop

```
┌─────────────────────────────────────────┐
│           MORNING NOTIFICATION          │
│   "Today's task: Have coffee with       │
│    someone you've never met ☕"   │
└─────────────────────────┬───────────────┘
                          │
                          ▼
┌─────────────────────────────────────────┐
│              DO THE TASK                │
│         (IRL, with a real human)        │
└─────────────────────────┬───────────────┘
                          │
                          ▼
┌─────────────────────────────────────────┐
│            SHARE YOUR LINK              │
│   Send to the person you did it with    │
└─────────────────────────┬───────────────┘
                          │
                          ▼
┌─────────────────────────────────────────┐
│           ✅ TASK COMPLETE              │
│      (They might sign up → bonus)       │
└─────────────────────────────────────────┘
```

---

## Task Categories

| Category | Examples |
|----------|----------|
| **☕ Social** | Have coffee with someone, call an old friend, eat lunch with a coworker |
| **🎨 Creative** | Draw something with a friend, take a photo together, make something |
| **💛 Kindness** | Compliment someone, help a stranger, write a thank you note |
| **🌍 Adventure** | Explore somewhere new with someone, try a new restaurant together |
| **💬 Vulnerable** | Share something real with a friend, ask someone how they're really doing |

---

## MVP Features

### 1. Daily Task
- One task per day
- Delivered via push notification (morning)
- Simple, actionable, requires another person
- Randomized from task bank

### 2. Task Completion
- User taps "I did it"
- Prompted to share unique link (SMS, WhatsApp, etc.)
- Once link is shared → task complete
- No verification required (honor system + link send)

### 3. Share Link
- Unique link per user per task
- Opens to: "X completed a Vera task with you! Join?"
- Recipient can sign up (optional)
- Tracks referral for growth analytics

### 4. Streak
- Complete daily → streak increases
- Miss a day → streak resets (or grace period?)
- Streaks displayed on profile
- Simple, not aggressive

### 5. Profile
- Name + photo
- Current streak
- Total tasks completed
- Friends made through Vera (people who signed up from your links)

---

## Screens (MVP)

### 1. Onboarding
- Splash: "Vera — Real connections, daily"
- Sign up (email or Apple)
- Notification permission (important!)
- Brief explanation (3 slides max)

### 2. Home (Today's Task)
- Big, clear task card
- "☕ Have coffee with someone"
- [Mark Complete] button
- Current streak shown

### 3. Complete Task Flow
- "Who did you do this with?"
- Share link via native share sheet
- Confirmation: "Task complete! 🎉"
- Optional: add a note/photo (future)

### 4. Profile
- Your stats
- Streak calendar
- Friends (people who joined from your links)

### 5. Settings
- Notification time
- Account stuff
- Share app

---

## Tech Stack (Recommendation)

### Option A: React Native + Expo (Faster)
- Cross-platform (iOS + Android)
- Faster development
- Good enough for MVP
- Can eject later if needed

### Option B: Swift/SwiftUI (Native iOS)
- Better UX/performance
- iOS only (fine for MVP)
- Longer development time
- Better for App Store approval

**Recommendation:** Start with **Expo/React Native** for speed. Polish later.

### Backend
- **Supabase** (auth, database, real-time)
- Simple schema: users, tasks, completions, referrals
- Push notifications via Expo or OneSignal

---

## Database Schema

```sql
-- Users
CREATE TABLE users (
  id UUID PRIMARY KEY,
  email TEXT UNIQUE,
  name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  referred_by UUID REFERENCES users(id)
);

-- Daily tasks (template bank)
CREATE TABLE tasks (
  id UUID PRIMARY KEY,
  category TEXT, -- social, creative, kindness, adventure, vulnerable
  text TEXT,
  emoji TEXT,
  active BOOLEAN DEFAULT true
);

-- User's daily assigned task
CREATE TABLE daily_tasks (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  task_id UUID REFERENCES tasks(id),
  date DATE,
  completed BOOLEAN DEFAULT false,
  completed_at TIMESTAMPTZ,
  share_link TEXT UNIQUE,
  UNIQUE(user_id, date)
);

-- Referrals / connections
CREATE TABLE connections (
  id UUID PRIMARY KEY,
  inviter_id UUID REFERENCES users(id),
  invitee_id UUID REFERENCES users(id),
  task_id UUID REFERENCES daily_tasks(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

## Growth Loop

```
User A gets task
      │
      ▼
User A does task with Person B (IRL)
      │
      ▼
User A shares Vera link with Person B
      │
      ├──→ Person B ignores (still counted as complete)
      │
      └──→ Person B signs up
                │
                ▼
          Person B gets task next day
                │
                ▼
          Person B shares with Person C
                │
                ▼
              ... viral loop
```

**Every active user = potential new user every day.**

---

## Success Metrics

| Metric | Target (Month 1) |
|--------|------------------|
| Daily Active Users | 500 |
| Task Completion Rate | 40% |
| Link Share Rate | 80% of completions |
| Signup Conversion (from links) | 15% |
| 7-day Retention | 30% |

---

## Risks & Mitigations

| Risk | Mitigation |
|------|------------|
| People don't complete tasks | Make tasks easy, fun, varied |
| No one signs up from links | That's okay — completion doesn't require it |
| Feels like a chore | Keep it light, no guilt, celebrate completion |
| Gets boring | Rotate tasks, add seasonal/special tasks |
| Privacy concerns | Minimal data, no location tracking |

---

## Launch Plan

### Week 1-2: Build MVP
- Expo app
- Core loop (task → complete → share)
- Supabase backend
- Basic UI

### Week 3: Polish
- Design pass
- Onboarding flow
- Push notifications
- TestFlight

### Week 4: Soft Launch
- Friends & family
- Iterate on feedback
- Fix bugs

### Week 5+: App Store
- Submit to App Store
- Landing page at tryvera.dev
- Social content

---

## Brand

### Colors
- **Primary:** Warm coral/orange (#FF6B6B or similar)
- **Background:** Cream/off-white (#FFF8F0)
- **Accent:** Deep forest green (#2D5A4A)
- **Text:** Warm dark (#2C2C2C)

### Typography
- Friendly, rounded sans-serif
- Not corporate, not childish
- Warm and approachable

### Tone
- Encouraging, not pushy
- Warm, not cold
- Simple, not complicated
- Human, not techy

### Sample Copy
- "One task. One person. One real moment."
- "Today's task is waiting ☕"
- "You did it! Who'd you share it with?"
- "Real connection, daily."
