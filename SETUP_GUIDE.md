# The Golden Years - Setup Guide

Complete guide to run "The Golden Years" application locally.

## 📋 Prerequisites

- Node.js (v18 or higher)
- npm, pnpm, or yarn package manager

## 🚀 Quick Start

### 1. Install Dependencies

```bash
# Using pnpm (recommended)
pnpm install

# OR using npm
npm install

# OR using yarn
yarn install
```

### 2. Start Development Server

```bash
# Using pnpm
pnpm dev

# OR using npm
npm run dev

# OR using yarn
yarn dev
```

### 3. Open in Browser

Navigate to **http://localhost:5173** (or the port shown in your terminal)

## 🔐 Login Credentials

The app uses mock authentication. You can log in with ANY email and password combination:

- **Email**: any@example.com (or any email format)
- **Password**: any password

OR simply click "Create Account" button to skip directly to the app.

## ✨ Features Overview

### 1. **Login Page** (`/login`)
- First page users see
- Mock authentication (any credentials work)
- Beautiful gradient design

### 2. **Dashboard** (`/`)
- Overview of all activities
- Quick stats (journals, connections, memories, happy moments)
- Recent journal entries
- Important memories
- Connected friends
- Recent happy moments
- **AI Companion quick access**
- **Upcoming event reminders** (shows events within next 7 days)

### 3. **Video Journal** (`/journal`)
- Record video journal entries
- AI-powered summaries
- Mood tracking
- Topic extraction

### 4. **Social Feed** (`/social`)
- LinkedIn-style social platform
- Create posts
- Like and comment
- **Communities feature** - Join interest-based groups
- Share experiences with friends

### 5. **Memories Timeline** (`/memories`)
- AI-extracted important moments
- Organized by category
- Related people tracking
- Searchable and filterable

### 6. **AI Companion** (`/ai-companion`)
- **Text Chat**: Type messages to AI
- **Voice Chat**: Simulated voice conversations
- AI knows all journal entries and memories
- References specific memories in responses
- Example questions provided
- Privacy & security info

### 7. **Calendar** (`/calendar`)
- **Monthly calendar view**
- **Create events** with details:
  - Title & description
  - Date & time
  - Category (personal, social, medical, activity, family)
  - Location
  - Participants
  - Reminder settings (15min, 30min, 1hr, 1 day before)
- Click dates to view/add events
- **Upcoming events sidebar**
- Color-coded by category

### 8. **Connections** (`/connections`)
- View all connected friends
- Friend recommendations based on shared interests
- Connect with new people
- Direct messaging

### 9. **Chat System** (`/chat/:userId`)
- One-on-one messaging
- AI detects happy moments in conversations
- Real-time-like interface

### 10. **User Profiles** (`/profile/:userId`)
- View user information
- Interests and hobbies
- Connection status
- Direct messaging option

### 11. **Settings** (`/settings`)
- Account preferences
- Privacy settings
- Notification management
- Accessibility options

## 🎨 Key Features Implemented

### ✅ Login System
- Protected routes
- Mock authentication
- Auto-redirect if not logged in

### ✅ Text Chat with AI
- Full chat interface
- AI knows about user's journals
- Memory references in responses
- Real-time-like interaction

### ✅ Voice Chat with AI
- Simulated voice recognition
- Animated voice visualizations
- Conversation history
- Both tabs in AI Companion page

### ✅ Calendar with Events
- Full calendar grid
- Event creation dialog
- Category-based color coding
- Reminder system
- Upcoming events list

### ✅ Event Reminders
- Dashboard widget showing upcoming events
- Time-until calculation
- Next 7 days preview
- Direct link to calendar

### ✅ Communities (In Social Feed)
- Mock community data in mockData.ts
- Can be extended in SocialFeed.tsx
- Join/leave functionality ready
- Category-based organization

## 📂 Project Structure

```
/src
  /app
    /components
      - Layout.tsx (Navigation sidebar)
      - UpcomingReminders.tsx (Reminder widget)
      /ui (Reusable UI components)
    /pages
      - Login.tsx ✨ NEW
      - Dashboard.tsx (with reminders)
      - VideoJournal.tsx
      - SocialFeed.tsx
      - Memories.tsx
      - AICompanion.tsx ✨ UPDATED (text + voice chat)
      - Calendar.tsx ✨ NEW
      - Connections.tsx
      - Chat.tsx
      - Profile.tsx
      - Settings.tsx
    /data
      - mockData.ts (All mock data including events, communities)
    - routes.tsx (with login protection)
    - App.tsx
  /styles
    - theme.css
    - fonts.css
/package.json (with dev script)
```

## 🔄 Available Scripts

```json
{
  "dev": "vite",              // Start development server
  "build": "vite build",      // Build for production
  "preview": "vite preview"   // Preview production build
}
```

## 📦 Installed Packages

All required packages are already in package.json:

- **react-router**: Navigation and routing
- **lucide-react**: Icons
- **@radix-ui**: UI components (dialogs, tabs, selects, etc.)
- **date-fns**: Date utilities
- **tailwindcss**: Styling
- And many more...

## 🎯 Mock Data Available

Located in `/src/app/data/mockData.ts`:

- **Users**: 5 mock users with profiles
- **Journal Entries**: 3 sample entries
- **Memories**: 4 extracted memories
- **Happy Moments**: 3 detected moments
- **Messages**: Chat conversations
- **Calendar Events**: 2 sample events ✨ NEW
- **Communities**: 2 sample communities ✨ NEW
- **Posts**: 2 social feed posts ✨ NEW

## 🌟 Testing the Features

### Test Login
1. Go to `http://localhost:5173`
2. You'll see the login page
3. Enter any email and password
4. Click "Sign In" or "Create Account"

### Test AI Text Chat
1. Navigate to "AI Companion" from sidebar
2. Click "Text Chat" tab
3. Type: "Tell me about my garden"
4. See AI reference journal memories

### Test AI Voice Chat
1. In "AI Companion", click "Voice Chat" tab
2. Click "Start Talking" button
3. Watch simulated voice recognition
4. See conversation appear below

### Test Calendar
1. Navigate to "Calendar" from sidebar
2. Click "Add Event" button
3. Fill in event details
4. Click any date to view events for that day
5. See upcoming events in sidebar

### Test Reminders
1. Go to Dashboard
2. Scroll to "Upcoming Reminders" section
3. See events coming up in next 7 days
4. Click "View Full Calendar" to see all

### Test Communities
1. Navigate to "Social Feed"
2. (Mock data ready - can be extended to show communities)
3. Communities data available in mockData.ts

## 🔧 Customization

### Add More Events
Edit `/src/app/data/mockData.ts`:

```typescript
export const calendarEvents: CalendarEvent[] = [
  {
    id: "event-3",
    title: "Your Event",
    description: "Event description",
    date: new Date(2026, 1, 25),
    time: "10:00",
    category: "personal",
    reminder: 30,
  },
  // ... add more
];
```

### Add More Communities
Edit `/src/app/data/mockData.ts`:

```typescript
export const communities: Community[] = [
  {
    id: "community-3",
    name: "Your Community",
    description: "Community description",
    category: "hobby",
    memberCount: 75,
    image: "https://images.unsplash.com/photo-...",
    isJoined: false,
  },
  // ... add more
];
```

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Kill process on port 5173
# macOS/Linux:
lsof -ti:5173 | xargs kill -9

# Windows:
netstat -ano | findstr :5173
taskkill /PID <PID> /F
```

### Clear Cache
```bash
rm -rf node_modules
rm -rf .vite
pnpm install
pnpm dev
```

### Login Not Working
- Check browser console for errors
- Make sure localStorage is enabled
- Try clearing browser data

## 🎉 You're All Set!

The application should now be running with:
✅ Login page as entry point
✅ Protected routes
✅ Text & Voice AI chat
✅ Full calendar with event management
✅ Upcoming event reminders
✅ Community data structure
✅ All existing features

Enjoy exploring "The Golden Years"! 🌟
