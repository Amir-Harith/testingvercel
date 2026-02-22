export interface User {
  id: string;
  name: string;
  age: number;
  location: string;
  interests: string[];
  bio: string;
  avatar: string;
  isConnected: boolean;
}

export interface JournalEntry {
  id: string;
  userId: string;
  date: Date;
  videoUrl?: string;
  thumbnail?: string;
  aiSummary: string;
  extractedTopics: string[];
  mood: 'happy' | 'neutral' | 'sad' | 'excited';
  duration: number; // in seconds
}

export interface Memory {
  id: string;
  journalId: string;
  date: Date;
  description: string;
  importance: 'high' | 'medium' | 'low';
  category: string;
  relatedPeople?: string[];
}

export interface HappyMoment {
  id: string;
  date: Date;
  description: string;
  conversationWith?: string;
  source: 'journal' | 'chat' | 'call';
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: Date;
  isHappyMoment?: boolean;
}

export interface CalendarEvent {
  id: string;
  title: string;
  description: string;
  date: Date;
  time: string;
  category: 'personal' | 'social' | 'medical' | 'activity' | 'family';
  reminder?: number; // minutes before event
  location?: string;
  participants?: string[];
}

export interface Community {
  id: string;
  name: string;
  description: string;
  category: string;
  memberCount: number;
  image: string;
  isJoined: boolean;
}

export interface Post {
  id: string;
  userId: string;
  content: string;
  timestamp: Date;
  likes: number;
  comments: number;
  communityId?: string;
}

export const currentUser: User = {
  id: "current-user",
  name: "Margaret Thompson",
  age: 72,
  location: "Portland, Oregon",
  interests: ["Gardening", "Knitting", "Bird Watching", "Cooking", "Reading"],
  bio: "Retired teacher who loves nature and staying connected with friends.",
  avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400",
  isConnected: false,
};

export const users: User[] = [
  {
    id: "user-1",
    name: "Robert Chen",
    age: 68,
    location: "Seattle, Washington",
    interests: ["Gardening", "Photography", "Cooking", "Hiking"],
    bio: "Former engineer, now enjoying retirement and exploring the outdoors.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
    isConnected: true,
  },
  {
    id: "user-2",
    name: "Dorothy Williams",
    age: 70,
    location: "Portland, Oregon",
    interests: ["Knitting", "Book Clubs", "Baking", "Volunteering"],
    bio: "Passionate about community service and sharing stories over tea.",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400",
    isConnected: true,
  },
  {
    id: "user-3",
    name: "James Patterson",
    age: 75,
    location: "Eugene, Oregon",
    interests: ["Bird Watching", "Fishing", "Woodworking", "Reading"],
    bio: "Nature enthusiast and retired carpenter who loves sharing wildlife stories.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400",
    isConnected: true,
  },
  {
    id: "user-4",
    name: "Linda Martinez",
    age: 66,
    location: "Salem, Oregon",
    interests: ["Yoga", "Gardening", "Painting", "Travel"],
    bio: "Artist and wellness advocate. Love connecting with creative souls.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400",
    isConnected: false,
  },
  {
    id: "user-5",
    name: "William Harris",
    age: 73,
    location: "Bend, Oregon",
    interests: ["Golf", "Reading", "History", "Chess"],
    bio: "Retired history professor. Always up for a good conversation.",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400",
    isConnected: false,
  },
];

export const journalEntries: JournalEntry[] = [
  {
    id: "journal-1",
    userId: "current-user",
    date: new Date(2026, 1, 20),
    thumbnail: "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=400",
    aiSummary: "Spent a wonderful morning in the garden planting spring bulbs. Mentioned how the tulips remind you of your mother's garden. Also discussed plans to meet Dorothy for tea on Friday.",
    extractedTopics: ["Gardening", "Family Memories", "Social Plans"],
    mood: "happy",
    duration: 180,
  },
  {
    id: "journal-2",
    userId: "current-user",
    date: new Date(2026, 1, 18),
    thumbnail: "https://images.unsplash.com/photo-1516641051054-9df6a1aad654?w=400",
    aiSummary: "Discussed a lovely video call with your grandson Tommy. He shared his college acceptance news. Feeling proud and excited for his future.",
    extractedTopics: ["Family", "Grandchildren", "Education"],
    mood: "excited",
    duration: 240,
  },
  {
    id: "journal-3",
    userId: "current-user",
    date: new Date(2026, 1, 15),
    thumbnail: "https://images.unsplash.com/photo-1476445704028-a36e0c798192?w=400",
    aiSummary: "Talked about the book club meeting. Read 'The Midnight Library' and had interesting discussions with the group. Mentioned feeling inspired by the story.",
    extractedTopics: ["Reading", "Book Club", "Social Activities"],
    mood: "happy",
    duration: 210,
  },
];

export const memories: Memory[] = [
  {
    id: "memory-1",
    journalId: "journal-1",
    date: new Date(2026, 1, 20),
    description: "Tulips in the garden remind you of your mother's garden from childhood",
    importance: "high",
    category: "Family Memory",
    relatedPeople: ["Mother"],
  },
  {
    id: "memory-2",
    journalId: "journal-1",
    date: new Date(2026, 1, 20),
    description: "Tea with Dorothy scheduled for Friday afternoon",
    importance: "medium",
    category: "Social Plans",
    relatedPeople: ["Dorothy Williams"],
  },
  {
    id: "memory-3",
    journalId: "journal-2",
    date: new Date(2026, 1, 18),
    description: "Grandson Tommy got accepted to college - feeling very proud",
    importance: "high",
    category: "Family Milestone",
    relatedPeople: ["Tommy (Grandson)"],
  },
  {
    id: "memory-4",
    journalId: "journal-3",
    date: new Date(2026, 1, 15),
    description: "Currently reading 'The Midnight Library' for book club",
    importance: "medium",
    category: "Current Activity",
  },
];

export const happyMoments: HappyMoment[] = [
  {
    id: "happy-1",
    date: new Date(2026, 1, 20),
    description: "Expressed joy about spring flowers blooming in the garden",
    source: "journal",
  },
  {
    id: "happy-2",
    date: new Date(2026, 1, 18),
    description: "Laughed together about a funny bird story during video call",
    conversationWith: "Robert Chen",
    source: "call",
  },
  {
    id: "happy-3",
    date: new Date(2026, 1, 17),
    description: "Shared excitement about grandson's college acceptance",
    conversationWith: "Dorothy Williams",
    source: "chat",
  },
];

export const messages: { [userId: string]: Message[] } = {
  "user-2": [
    {
      id: "msg-1",
      senderId: "user-2",
      receiverId: "current-user",
      content: "Hi Margaret! How are you doing today? 😊",
      timestamp: new Date(2026, 1, 21, 10, 30),
    },
    {
      id: "msg-2",
      senderId: "current-user",
      receiverId: "user-2",
      content: "Hello Dorothy! I'm doing well, thank you. Just finished my morning walk.",
      timestamp: new Date(2026, 1, 21, 10, 35),
    },
    {
      id: "msg-3",
      senderId: "user-2",
      receiverId: "current-user",
      content: "That's wonderful! Are we still on for tea on Friday?",
      timestamp: new Date(2026, 1, 21, 10, 37),
    },
    {
      id: "msg-4",
      senderId: "current-user",
      receiverId: "user-2",
      content: "Yes, absolutely! I'm looking forward to it. I'll bring some of those cookies you love.",
      timestamp: new Date(2026, 1, 21, 10, 40),
      isHappyMoment: true,
    },
  ],
  "user-1": [
    {
      id: "msg-5",
      senderId: "user-1",
      receiverId: "current-user",
      content: "Margaret, I saw the most beautiful hawk today during my walk. Reminded me of our bird watching trip!",
      timestamp: new Date(2026, 1, 20, 14, 20),
    },
    {
      id: "msg-6",
      senderId: "current-user",
      receiverId: "user-1",
      content: "Oh how wonderful, Robert! I would have loved to see it. We should plan another outing soon.",
      timestamp: new Date(2026, 1, 20, 14, 25),
    },
  ],
};

export const calendarEvents: CalendarEvent[] = [
  {
    id: "event-1",
    title: "Tea with Dorothy",
    description: "Weekly tea meeting with Dorothy Williams",
    date: new Date(2026, 1, 26),
    time: "14:00",
    category: "social",
    reminder: 30,
    location: "Dorothy's House",
    participants: ["Dorothy Williams"],
  },
  {
    id: "event-2",
    title: "Bird Watching Trip",
    description: "Bird watching trip with Robert Chen",
    date: new Date(2026, 1, 28),
    time: "09:00",
    category: "activity",
    reminder: 60,
    location: "Forest Park",
    participants: ["Robert Chen"],
  },
];

export const communities: Community[] = [
  {
    id: "community-1",
    name: "Portland Book Club",
    description: "Monthly book club meetings in Portland",
    category: "social",
    memberCount: 50,
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400",
    isJoined: true,
  },
  {
    id: "community-2",
    name: "Gardeners of Oregon",
    description: "Community for gardening enthusiasts in Oregon",
    category: "activity",
    memberCount: 100,
    image: "https://images.unsplash.com/photo-1506748686192-080f1ec882b5?w=400",
    isJoined: false,
  },
];

export const posts: Post[] = [
  {
    id: "post-1",
    userId: "current-user",
    content: "Just finished reading 'The Midnight Library' and loved it! Highly recommend it to anyone who enjoys a good story.",
    timestamp: new Date(2026, 1, 15),
    likes: 15,
    comments: 5,
    communityId: "community-1",
  },
  {
    id: "post-2",
    userId: "user-1",
    content: "Beautiful day out in the garden today. Saw a hawk and a pair of robins. Nature is amazing!",
    timestamp: new Date(2026, 1, 20),
    likes: 20,
    comments: 3,
    communityId: "community-2",
  },
];