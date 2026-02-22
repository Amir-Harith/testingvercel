import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Video, Users, Brain, TrendingUp, Calendar, Heart, Bot } from "lucide-react";
import { Link } from "react-router";
import { journalEntries, memories, users, happyMoments } from "../data/mockData";
import { UpcomingReminders } from "../components/UpcomingReminders";

export function Dashboard() {
  const recentJournals = journalEntries.slice(0, 2);
  const recentMemories = memories.slice(0, 3);
  const connectedUsers = users.filter(u => u.isConnected);
  const recentHappyMoments = happyMoments.slice(0, 2);

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl mb-2">Welcome back, Margaret!</h1>
        <p className="text-xl text-gray-600">Here's what's happening in your Golden Years</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm">Journal Entries</CardTitle>
            <Video className="w-4 h-4 text-amber-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl">{journalEntries.length}</div>
            <p className="text-xs text-gray-600 mt-1">This month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm">Connections</CardTitle>
            <Users className="w-4 h-4 text-amber-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl">{connectedUsers.length}</div>
            <p className="text-xs text-gray-600 mt-1">Active friends</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm">Memories Saved</CardTitle>
            <Brain className="w-4 h-4 text-amber-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl">{memories.length}</div>
            <p className="text-xs text-gray-600 mt-1">Important moments</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm">Happy Moments</CardTitle>
            <Heart className="w-4 h-4 text-amber-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl">{happyMoments.length}</div>
            <p className="text-xs text-gray-600 mt-1">This week</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Journal Entries */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Journal Entries</CardTitle>
            <Link to="/journal">
              <Button variant="ghost" size="sm">View All</Button>
            </Link>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentJournals.map((journal) => (
              <div key={journal.id} className="flex gap-4 p-4 bg-gray-50 rounded-lg">
                <img
                  src={journal.thumbnail}
                  alt="Journal thumbnail"
                  className="w-24 h-24 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-600">
                      {journal.date.toLocaleDateString()}
                    </span>
                    <span className={`ml-auto px-2 py-1 rounded-full text-xs ${
                      journal.mood === 'happy' ? 'bg-green-100 text-green-700' :
                      journal.mood === 'excited' ? 'bg-blue-100 text-blue-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {journal.mood}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700">{journal.aiSummary}</p>
                </div>
              </div>
            ))}
            <Link to="/journal">
              <Button className="w-full bg-amber-600 hover:bg-amber-700">
                <Video className="w-4 h-4 mr-2" />
                Create New Journal Entry
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Important Memories */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Important Memories</CardTitle>
            <Link to="/memories">
              <Button variant="ghost" size="sm">View All</Button>
            </Link>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentMemories.map((memory) => (
              <div key={memory.id} className="p-4 border border-amber-200 bg-amber-50 rounded-lg">
                <div className="flex items-start justify-between mb-2">
                  <span className="text-xs px-2 py-1 bg-amber-200 text-amber-800 rounded">
                    {memory.category}
                  </span>
                  <span className="text-xs text-gray-600">
                    {memory.date.toLocaleDateString()}
                  </span>
                </div>
                <p className="text-sm">{memory.description}</p>
                {memory.relatedPeople && (
                  <p className="text-xs text-gray-600 mt-2">
                    Related: {memory.relatedPeople.join(", ")}
                  </p>
                )}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Connected Friends */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Your Connections</CardTitle>
            <Link to="/connections">
              <Button variant="ghost" size="sm">View All</Button>
            </Link>
          </CardHeader>
          <CardContent className="space-y-3">
            {connectedUsers.slice(0, 3).map((user) => (
              <div key={user.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="flex-1">
                  <p className="font-medium">{user.name}</p>
                  <p className="text-sm text-gray-600">{user.location}</p>
                </div>
                <Link to={`/chat/${user.id}`}>
                  <Button size="sm" variant="outline">Message</Button>
                </Link>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Happy Moments */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-rose-500" />
              Recent Happy Moments
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentHappyMoments.map((moment) => (
              <div key={moment.id} className="p-4 border border-rose-200 bg-rose-50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs px-2 py-1 bg-rose-200 text-rose-800 rounded">
                    {moment.source}
                  </span>
                  <span className="text-xs text-gray-600">
                    {moment.date.toLocaleDateString()}
                  </span>
                </div>
                <p className="text-sm">{moment.description}</p>
                {moment.conversationWith && (
                  <p className="text-xs text-gray-600 mt-2">
                    With: {moment.conversationWith}
                  </p>
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* AI Companion Quick Access */}
      <Card className="mt-8 bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                <Bot className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-xl mb-1">Talk to Your AI Companion</h3>
                <p className="text-gray-600">
                  Have a voice conversation with AI that knows all about your journals and memories
                </p>
              </div>
            </div>
            <Link to="/ai-companion">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                <Bot className="w-5 h-5 mr-2" />
                Start Conversation
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Upcoming Reminders */}
      <Card className="mt-8">
        <CardContent>
          <UpcomingReminders />
        </CardContent>
      </Card>
    </div>
  );
}