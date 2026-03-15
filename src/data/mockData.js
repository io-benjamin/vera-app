export const TASKS = [
  {
    id: '1',
    title: 'Buy a stranger a coffee',
    description:
      'Walk into a café and buy a coffee for the person behind you in line. No explanation needed — just a small act of unexpected kindness that might make their whole day.',
    category: 'kindness',
    difficulty: 'easy',
    prompt: 'Who did you share this moment with?',
    tips: [
      'Just say "I\'d like to pay for their order too"',
      'Smile and walk away — no need to chat',
      'Works with tea, pastries, or anything else',
    ],
  },
  {
    id: '2',
    title: 'Ask someone their story',
    description:
      'Find someone you see regularly but barely know — a barista, neighbor, or coworker. Ask them one genuine question about their life, then actually listen.',
    category: 'social',
    difficulty: 'medium',
    prompt: 'Who did you connect with?',
    tips: [
      'Try: "How long have you worked here?"',
      'Or: "What do you love about this neighborhood?"',
      'Let the conversation go wherever it goes',
    ],
  },
  {
    id: '3',
    title: 'Leave a kind note',
    description:
      'Write a handwritten note for someone — a colleague, neighbor, or even a stranger. Leave it somewhere they\'ll find it. It doesn\'t need to be long or poetic.',
    category: 'kindness',
    difficulty: 'easy',
    prompt: 'Who was the note for?',
    tips: [
      'Keep it simple and specific',
      '"Your laugh makes this office better" is perfect',
      'You can stay anonymous if you prefer',
    ],
  },
  {
    id: '4',
    title: 'Share a meal',
    description:
      'Invite someone for lunch, dinner, or even just a snack. The goal is the conversation, not the food. Phones go face down.',
    category: 'social',
    difficulty: 'medium',
    prompt: 'Who did you share the meal with?',
    tips: [
      'It can be as simple as a coffee break',
      'Leave phones face down on the table',
      'Ask: "What\'s been on your mind lately?"',
    ],
  },
  {
    id: '5',
    title: 'Take a photo together',
    description:
      'Ask someone to take a spontaneous photo with you today. It doesn\'t have to be posed or perfect — just a captured moment between two people.',
    category: 'creative',
    difficulty: 'easy',
    prompt: "Who's in the photo?",
    tips: [
      'It could be a selfie at a coffee shop',
      'Or a goofy photo with a coworker',
      'Send them the photo afterward',
    ],
  },
  {
    id: '6',
    title: 'Tell someone what you appreciate about them',
    description:
      'Find one person and tell them, out loud, one specific thing you genuinely appreciate about them. Say it directly. Watch what happens.',
    category: 'vulnerable',
    difficulty: 'medium',
    prompt: 'Who did you tell?',
    tips: [
      'Be specific: "I appreciate how you always..."',
      "It'll feel awkward — do it anyway",
      'Watch their face when you say it',
    ],
  },
  {
    id: '7',
    title: 'Start a conversation with a stranger',
    description:
      "Talk to someone you've never met before. It can be anywhere — on the bus, at a park, waiting in line. Three minutes is all you need.",
    category: 'adventure',
    difficulty: 'hard',
    prompt: 'Who did you talk to?',
    tips: [
      'Comment on something around you',
      '"Is this line always this long?" works great',
      'You only need 3 minutes to make a connection',
    ],
  },
  {
    id: '8',
    title: 'Help someone with something small',
    description:
      'Look for an opportunity to help someone today. Hold a door, carry something heavy, give directions to someone who looks lost.',
    category: 'kindness',
    difficulty: 'easy',
    prompt: 'Who did you help?',
    tips: [
      'Stay alert to people around you',
      'Small acts count just as much',
      "Don't overthink it — just act",
    ],
  },
  {
    id: '9',
    title: 'Reconnect with someone you miss',
    description:
      "Send a message to someone you haven't talked to in a while. Not just a like or a react — a real message. Tell them you've been thinking of them.",
    category: 'vulnerable',
    difficulty: 'medium',
    prompt: 'Who did you reach out to?',
    tips: [
      'Start with: "Hey, I was thinking about you"',
      'Reference a specific shared memory',
      "Don't wait for the perfect moment",
    ],
  },
  {
    id: '10',
    title: 'Cook for someone',
    description:
      'Make food for someone else today — a roommate, family member, neighbor, or friend. It can be simple. The act of nourishing someone is deeply connecting.',
    category: 'social',
    difficulty: 'medium',
    prompt: 'Who did you cook for?',
    tips: [
      'Even instant noodles count',
      'Add a small note with the food',
      'Ask about dietary preferences first',
    ],
  },
];

export const getTodayTask = () => {
  const start = new Date(2024, 0, 1);
  const today = new Date();
  const dayDiff = Math.floor((today - start) / (1000 * 60 * 60 * 24));
  return TASKS[dayDiff % TASKS.length];
};

export const MOCK_USER = {
  id: 'mock-user-1',
  name: 'Alex',
  email: 'alex@example.com',
  streak_count: 7,
  total_completions: 23,
  longest_streak: 12,
  created_at: '2024-11-01T00:00:00Z',
};

const buildMockCompletions = () => {
  const today = new Date();
  // Days ago that were completed (0 = today already done — leave out for prototype start state)
  const completedDaysAgo = [1, 2, 3, 4, 5, 6, 7, 9, 11, 14];
  const names = ['Maria', 'James', 'Sarah', 'Tom', 'Emma', 'Chris', 'Liu', 'David', 'Priya', 'Noah'];
  const notes = [
    'Had a great conversation at the café!',
    null,
    'Felt nervous at first but so worth it.',
    null,
    'She seemed genuinely touched.',
    null,
    'We ended up talking for 20 minutes.',
    null,
    'Smallest thing, huge impact.',
    null,
  ];

  return completedDaysAgo.map((daysAgo, i) => {
    const date = new Date(today);
    date.setDate(date.getDate() - daysAgo);
    const task = TASKS[i % TASKS.length];
    return {
      id: `completion-${i}`,
      user_id: 'mock-user-1',
      task_id: task.id,
      task,
      completed_at: date.toISOString(),
      note: notes[i],
      person_name: names[i],
      share_token: `vera${Math.random().toString(36).substr(2, 8)}`,
    };
  });
};

export const MOCK_COMPLETIONS = buildMockCompletions();
