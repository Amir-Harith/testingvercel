import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { MessageCircle, Phone, Video, UserPlus, Search, Sparkles } from "lucide-react";
import { users, currentUser } from "../data/mockData";
import { Badge } from "../components/ui/badge";
import { Link } from "react-router";

export function Connections() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState<"connections" | "suggestions">("connections");

  const connectedUsers = users.filter(u => u.isConnected);
  const suggestedUsers = users.filter(u => !u.isConnected);

  const filteredUsers = (activeTab === "connections" ? connectedUsers : suggestedUsers).filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.interests.some(interest => interest.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const getMatchingInterests = (user: typeof users[0]) => {
    return user.interests.filter(interest => currentUser.interests.includes(interest));
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl mb-2">Connections</h1>
        <p className="text-xl text-gray-600">Connect with friends who share your interests</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Connections</p>
                <p className="text-3xl mt-1">{connectedUsers.length}</p>
              </div>
              <MessageCircle className="w-10 h-10 text-amber-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Suggested Matches</p>
                <p className="text-3xl mt-1">{suggestedUsers.length}</p>
              </div>
              <Sparkles className="w-10 h-10 text-amber-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Shared Interests</p>
                <p className="text-3xl mt-1">{currentUser.interests.length}</p>
              </div>
              <UserPlus className="w-10 h-10 text-amber-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Tabs */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex gap-2 w-full md:w-auto">
              <Button
                variant={activeTab === "connections" ? "default" : "outline"}
                className={activeTab === "connections" ? "bg-amber-600 hover:bg-amber-700" : ""}
                onClick={() => setActiveTab("connections")}
              >
                My Connections ({connectedUsers.length})
              </Button>
              <Button
                variant={activeTab === "suggestions" ? "default" : "outline"}
                className={activeTab === "suggestions" ? "bg-amber-600 hover:bg-amber-700" : ""}
                onClick={() => setActiveTab("suggestions")}
              >
                Suggestions ({suggestedUsers.length})
              </Button>
            </div>
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search by name or interests..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Users Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredUsers.map((user) => {
          const matchingInterests = getMatchingInterests(user);
          return (
            <Card key={user.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="flex gap-4">
                  <Link to={`/profile/${user.id}`}>
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-20 h-20 rounded-full object-cover cursor-pointer hover:opacity-80 transition-opacity"
                    />
                  </Link>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <Link to={`/profile/${user.id}`}>
                          <h3 className="text-xl font-medium hover:text-amber-600 cursor-pointer">
                            {user.name}
                          </h3>
                        </Link>
                        <p className="text-sm text-gray-600">{user.age} years • {user.location}</p>
                      </div>
                      {activeTab === "suggestions" && matchingInterests.length > 0 && (
                        <Badge className="bg-green-100 text-green-700">
                          {matchingInterests.length} matches
                        </Badge>
                      )}
                    </div>

                    <p className="text-sm text-gray-700 mb-3">{user.bio}</p>

                    <div className="mb-4">
                      <p className="text-xs text-gray-600 mb-2">Interests:</p>
                      <div className="flex flex-wrap gap-1">
                        {user.interests.map((interest) => {
                          const isMatching = currentUser.interests.includes(interest);
                          return (
                            <Badge
                              key={interest}
                              variant={isMatching ? "default" : "secondary"}
                              className={isMatching ? "bg-amber-600" : ""}
                            >
                              {interest}
                            </Badge>
                          );
                        })}
                      </div>
                    </div>

                    {activeTab === "connections" ? (
                      <div className="flex gap-2">
                        <Link to={`/chat/${user.id}`} className="flex-1">
                          <Button variant="outline" className="w-full">
                            <MessageCircle className="w-4 h-4 mr-2" />
                            Message
                          </Button>
                        </Link>
                        <Button variant="outline" size="icon">
                          <Phone className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="icon">
                          <Video className="w-4 h-4" />
                        </Button>
                      </div>
                    ) : (
                      <div className="flex gap-2">
                        <Button className="flex-1 bg-amber-600 hover:bg-amber-700">
                          <UserPlus className="w-4 h-4 mr-2" />
                          Connect
                        </Button>
                        <Link to={`/profile/${user.id}`}>
                          <Button variant="outline">View Profile</Button>
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredUsers.length === 0 && (
        <Card>
          <CardContent className="pt-6 text-center py-12">
            <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-lg text-gray-600">No {activeTab === "connections" ? "connections" : "suggestions"} found</p>
            <p className="text-sm text-gray-500 mt-2">
              {searchTerm ? "Try adjusting your search terms" : "Check back later for new suggestions"}
            </p>
          </CardContent>
        </Card>
      )}

      {/* Why AI Suggests These Connections */}
      {activeTab === "suggestions" && filteredUsers.length > 0 && (
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-600" />
              How AI Makes Suggestions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-sm">
              <div className="flex gap-3">
                <div className="w-2 h-2 bg-amber-600 rounded-full mt-1.5 flex-shrink-0" />
                <div>
                  <p className="font-medium mb-1">Shared Interests</p>
                  <p className="text-gray-600">
                    AI analyzes your journal entries to identify your hobbies and interests, then matches you with others who share them.
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-2 h-2 bg-amber-600 rounded-full mt-1.5 flex-shrink-0" />
                <div>
                  <p className="font-medium mb-1">Geographic Proximity</p>
                  <p className="text-gray-600">
                    Connects you with people in your area for easier in-person meetups.
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-2 h-2 bg-amber-600 rounded-full mt-1.5 flex-shrink-0" />
                <div>
                  <p className="font-medium mb-1">Activity Patterns</p>
                  <p className="text-gray-600">
                    Suggests connections with similar daily routines and activity levels.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
